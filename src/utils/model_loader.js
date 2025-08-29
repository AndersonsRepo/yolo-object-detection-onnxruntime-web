export async function model_loader(device, model_path, nms_path, input_shape = [1, 3, 640, 640]) {
  let ort;
  
  // Set wasmPaths first, before any imports
  const wasmPaths = `${window.location.origin}${window.location.pathname}assets/`;
  
  try {
    if (device === 'webgpu') {
      // Try WebGPU first
      try {
        // Import the base ONNX runtime first to set up WASM
        const baseOrt = await import("onnxruntime-web");
        baseOrt.env.wasm.wasmPaths = wasmPaths;
        
        // Now try WebGPU
        ort = await import("onnxruntime-web/webgpu");
        ort.env.wasm.wasmPaths = wasmPaths;
        
        // Test if WebGPU is actually available
        if (!navigator.gpu) {
          throw new Error("WebGPU not supported in this browser");
        }
        
        console.log("✅ WebGPU backend initialized successfully");
      } catch (webgpuError) {
        console.warn("WebGPU failed, falling back to WASM:", webgpuError);
        device = 'wasm';
        ort = await import("onnxruntime-web");
        ort.env.wasm.wasmPaths = wasmPaths;
        console.log("✅ WASM (CPU) backend initialized successfully");
      }
    } else {
      // Use WASM (CPU) backend
      ort = await import("onnxruntime-web");
      ort.env.wasm.wasmPaths = wasmPaths;
      console.log("✅ WASM (CPU) backend initialized successfully");
    }
  } catch (importError) {
    console.error("Failed to import ONNX runtime:", importError);
    throw new Error("Failed to initialize ONNX runtime");
  }

  // Set execution providers based on device
  const executionProviders = device === 'webgpu' ? ['webgpu'] : ['wasm'];
  console.log(`Using execution providers: ${executionProviders.join(', ')}`);

  try {
    // load model
    console.log("Loading YOLO model...");
    const yolo_model = await ort.InferenceSession.create(model_path, {
      executionProviders: executionProviders,
    });
    console.log("✅ YOLO model loaded successfully");
    
    console.log("Loading NMS decoder...");
    const nms = await ort.InferenceSession.create(nms_path, {
      executionProviders: executionProviders,
    });
    console.log("✅ NMS decoder loaded successfully");

    // warm up
    console.log("Running warm-up inference...");
    const dummy_input_tensor = new ort.Tensor(
      "float32",
      new Float32Array(input_shape.reduce((a, b) => a * b)),
      input_shape
    );
    
    try {
      const { output0 } = await yolo_model.run({ images: dummy_input_tensor });
      const { output_selected } = await nms.run({
        input: output0,
        topk: new ort.Tensor("int32", new Int32Array([100])),
        iou_threshold: new ort.Tensor("float32", new Float32Array([0.45])),
        score_threshold: new ort.Tensor("float32", new Float32Array([0.45])),
      });
      
      // Clean up warm-up tensors
      output0.dispose();
      output_selected.dispose();
      dummy_input_tensor.dispose();
      
      console.log("✅ Warm-up inference completed successfully");
      return { yolo_model, nms, ort };
    } catch (warmupError) {
      // Clean up on error
      dummy_input_tensor.dispose();
      throw warmupError;
    }
  } catch (sessionError) {
    console.error("Session creation or warmup failed:", sessionError);
    throw new Error(`Model loading failed: ${sessionError.message}`);
  }
}
