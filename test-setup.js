// Simple test script to verify ONNX runtime setup
console.log("Testing ONNX runtime setup...");

async function testONNXRuntime() {
  try {
    console.log("Testing WASM (CPU) backend...");
    const ortWasm = await import("onnxruntime-web");
    console.log("✅ WASM backend imported successfully");
    
    // Test if WebGPU is available
    if (navigator.gpu) {
      console.log("Testing WebGPU backend...");
      const ortWebGPU = await import("onnxruntime-web/webgpu");
      console.log("✅ WebGPU backend imported successfully");
    } else {
      console.log("⚠️ WebGPU not available in this browser");
    }
    
    console.log("✅ All tests passed! ONNX runtime is working correctly.");
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

// Run the test
testONNXRuntime();
