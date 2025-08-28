export async function model_loader(device, model_path, nms_path, input_shape = [1, 3, 640, 640]) {
  let ort;
  
  try {
    if (device === 'webgpu') {
      // Try WebGPU first
      try {
        ort = await import("onnxruntime-web/webgpu");
        // Test if WebGPU is actually available
        if (!navigator.gpu) {
          throw new Error("WebGPU not supported in this browser");
        }
      } catch (webgpuError) {
        console.warn("WebGPU failed, falling back to WASM:", webgpuError);
        device = 'wasm';
        ort = await import("onnxruntime-web");
      }
    } else {
      // Use WASM (CPU) backend
      ort = await import("onnxruntime-web");
    }
  } catch (importError) {
    console.error("Failed to import ONNX runtime:", importError);
    throw new Error("Failed to initialize ONNX runtime");
  }

  ort.env.wasm.wasmPaths = `./`;

  // Set execution providers based on device
  const executionProviders = device === 'webgpu' ? ['webgpu'] : ['wasm'];

  try {
    // load model
    const yolo_model = await ort.InferenceSession.create(model_path, {
      executionProviders: executionProviders,
    });
    const nms = await ort.InferenceSession.create(nms_path, {
      executionProviders: executionProviders,
    });

    // warm up
    const dummy_input_tensor = new ort.Tensor(
      "float32",
      new Float32Array(input_shape.reduce((a, b) => a * b)),
      input_shape
    );
    
    const { output0 } = await yolo_model.run({ images: dummy_input_tensor });
    const { output_selected } = await nms.run({
      input: output0,
      topk: new ort.Tensor("int32", new Int32Array([100])),
      iou_threshold: new ort.Tensor("float32", new Float32Array([0.45])),
      score_threshold: new ort.Tensor("float32", new Float32Array([0.45])),
    });
    
    output0.dispose();
    output_selected.dispose();
    
    return { yolo_model, nms, ort };
  } catch (sessionError) {
    console.error("Session creation or warmup failed:", sessionError);
    throw new Error(`Model loading failed: ${sessionError.message}`);
  }
}
