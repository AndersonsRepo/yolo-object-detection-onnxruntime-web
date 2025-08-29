import "./assets/App.css";
import { useEffect, useRef, useState, useCallback } from "react";
import { model_loader } from "./utils/model_loader";
import { inference_pipeline } from "./utils/inference_pipeline";
import { draw_bounding_boxes } from "./utils/draw_bounding_boxes";
import classes from "./utils/yolo_classes.json";

// config
const input_shape = [1, 3, 640, 640];
const topk = 100;
const iou_threshold = 0.45;
const score_threshold = 0.45;

function App() {
  // setting Refs
  const deviceRef = useRef(null);
  const modelRef = useRef(null);
  const [customModels, setCustomModels] = useState([]);
  const [cameras, setCameras] = useState([]);
  const cameraSelectorRef = useRef(null);
  const [camera_stream, setCameraStream] = useState(null);
  const [sessionsConfig, setSessionsConfig] = useState(null);

  // content Refs
  const imgRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const overlayRef = useRef(null);
  const cameraRef = useRef(null);
  const inputCanvasRef = useRef(null);

  // model status Ref
  const [warnUpTime, setWarnUpTime] = useState(0);
  const [inferenceTime, setInferenceTime] = useState(0);
  const [frameCount, setFrameCount] = useState(0);
  const modelStatusRef = useRef(null);
  const [details, setDetails] = useState([]);

  // button Refs
  const openImageRef = useRef(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadModel();
    getCameras();
    
    // Cleanup function to dispose of sessions when component unmounts
    return () => {
      if (sessionsConfig) {
        try {
          if (sessionsConfig.yolo_model) {
            sessionsConfig.yolo_model.release();
          }
          if (sessionsConfig.nms) {
            sessionsConfig.nms.release();
          }
          // Dispose of tensors
          if (sessionsConfig.tensor_topk) {
            sessionsConfig.tensor_topk.dispose();
          }
          if (sessionsConfig.tensor_iou_threshold) {
            sessionsConfig.tensor_iou_threshold.dispose();
          }
          if (sessionsConfig.tensor_score_threshold) {
            sessionsConfig.tensor_score_threshold.dispose();
          }
        } catch (cleanupError) {
          console.warn("Error cleaning up sessions on unmount:", cleanupError);
        }
      }
    };
  }, []);

  const handleDeviceChange = useCallback(() => {
    if (isModelLoaded) {
      setIsModelLoaded(false);
      setSessionsConfig(null);
    }
  }, [isModelLoaded]);

  const handleModelChange = useCallback(() => {
    if (isModelLoaded) {
      setIsModelLoaded(false);
      setSessionsConfig(null);
    }
  }, [isModelLoaded]);

  const loadModel = useCallback(async () => {
    // Prevent multiple simultaneous loads
    if (isLoading) {
      console.log("Model loading already in progress, skipping...");
      return;
    }
    
    setIsLoading(true);
    const modelStatusEl = modelStatusRef.current;
    modelStatusEl.textContent = "Loading model...";
    modelStatusEl.style.color = "red";
    setIsModelLoaded(false);
    
    // Clean up previous sessions if they exist
    if (sessionsConfig) {
      try {
        if (sessionsConfig.yolo_model) {
          sessionsConfig.yolo_model.release();
        }
        if (sessionsConfig.nms) {
          sessionsConfig.nms.release();
        }
        // Dispose of tensors
        if (sessionsConfig.tensor_topk) {
          sessionsConfig.tensor_topk.dispose();
        }
        if (sessionsConfig.tensor_iou_threshold) {
          sessionsConfig.tensor_iou_threshold.dispose();
        }
        if (sessionsConfig.tensor_score_threshold) {
          sessionsConfig.tensor_score_threshold.dispose();
        }
      } catch (cleanupError) {
        console.warn("Error cleaning up previous sessions:", cleanupError);
      }
    }

    const device = deviceRef.current.value;
    const selectedModel = modelRef.current.value;
    const customModel = customModels.find(
      (model) => model.url === selectedModel
    ); // if selected custom model

    const model_path = customModel
      ? customModel.url
      : `${window.location.href}/models/${selectedModel}.onnx`;
    const nms_path = `${window.location.href}/yolo-decoder.onnx`;

    try {
      // load model and warm up
      const start = performance.now();
      const { yolo_model, nms, ort } = await model_loader(
        device,
        model_path,
        nms_path,
        input_shape
      );
      const end = performance.now();

      // Create config tensors with the loaded ort instance
      const config = {
        input_shape: input_shape,
        tensor_topk: new ort.Tensor("int32", new Int32Array([topk])),
        tensor_iou_threshold: new ort.Tensor(
          "float32",
          new Float32Array([iou_threshold])
        ),
        tensor_score_threshold: new ort.Tensor(
          "float32",
          new Float32Array([score_threshold])
        ),
      };

      setSessionsConfig({
        yolo_model: yolo_model,
        nms: nms,
        ort: ort,
        input_shape: input_shape,
        tensor_topk: config.tensor_topk,
        tensor_iou_threshold: config.tensor_iou_threshold,
        tensor_score_threshold: config.tensor_score_threshold,
      });

      modelStatusEl.textContent = "Model loaded";
      modelStatusEl.style.color = "green";
      setWarnUpTime((end - start).toFixed(2));
      setIsModelLoaded(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Model loading failed:", error);
      
      // If WebGPU failed, try WASM as fallback
      if (device === 'webgpu' && error.message.includes('no available backend found')) {
        console.log("WebGPU failed, trying WASM fallback...");
        modelStatusEl.textContent = "WebGPU failed, trying CPU...";
        
        try {
          // Update device selector to WASM
          deviceRef.current.value = 'wasm';
          
          // Retry with WASM
          const start = performance.now();
          const { yolo_model, nms, ort } = await model_loader(
            'wasm',
            model_path,
            nms_path,
            input_shape
          );
          const end = performance.now();

          // Create config tensors with the loaded ort instance
          const config = {
            input_shape: input_shape,
            tensor_topk: new ort.Tensor("int32", new Int32Array([topk])),
            tensor_iou_threshold: new ort.Tensor(
              "float32",
              new Float32Array([iou_threshold])
            ),
            tensor_score_threshold: new ort.Tensor(
              "float32",
              new Float32Array([score_threshold])
            ),
          };

          setSessionsConfig({
            yolo_model: yolo_model,
            nms: nms,
            ort: ort,
            input_shape: input_shape,
            tensor_topk: config.tensor_topk,
            tensor_iou_threshold: config.tensor_iou_threshold,
            tensor_score_threshold: config.tensor_score_threshold,
          });

          modelStatusEl.textContent = "Model loaded (CPU fallback)";
          modelStatusEl.style.color = "green";
          setWarnUpTime((end - start).toFixed(2));
          setIsModelLoaded(true);
          setIsLoading(false);
          return;
        } catch (fallbackError) {
          console.error("WASM fallback also failed:", fallbackError);
        }
      }
      
      modelStatusEl.textContent = "Model loading failed";
      modelStatusEl.style.color = "red";
      setIsLoading(false);
    }
  }, [customModels]);

  // handles
  const handle_AddModel = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name.replace(".onnx", "");
      setCustomModels((prevModels) => [
        ...prevModels,
        { name: fileName, url: URL.createObjectURL(file) },
      ]);
    }
  }, []);

  const handle_OpenImage = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      setImgSrc(URL.createObjectURL(file));
      openImageRef.current.disabled = true;
      event.target.value = null;
    }
  }, []);

  const handle_ImageLoad = useCallback(async () => {
    overlayRef.current.width = imgRef.current.width;
    overlayRef.current.height = imgRef.current.height;
    const [results, results_inferenceTime] = await inference_pipeline(
      imgRef.current,
      sessionsConfig
    );
    setDetails(results);
    setInferenceTime(results_inferenceTime);
    draw_bounding_boxes(results, overlayRef.current);
  }, [sessionsConfig]);

  const getCameras = useCallback(async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(
      (device) => device.kind === "videoinput"
    );
    setCameras(videoDevices);
  }, []);

  const handle_ToggleCamera = useCallback(async () => {
    if (camera_stream) {
      // stop camera
      console.log("Stopping camera...");
      camera_stream.getTracks().forEach((track) => track.stop());
      cameraRef.current.srcObject = null;
      setCameraStream(null);
      overlayRef.current.width = 0;
      overlayRef.current.height = 0;
      setDetails([]); // Clear previous detections
      setInferenceTime(0);
      setFrameCount(0); // Reset frame counter
    } else {
      // start camera
      try {
        console.log("Starting camera...");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: cameraSelectorRef.current.value,
            width: { ideal: 640 },
            height: { ideal: 480 },
            frameRate: { ideal: 30 }
          },
          audio: false,
        });
        setCameraStream(stream);
        cameraRef.current.srcObject = stream;
        
        // Wait for video to be ready before starting detection
        cameraRef.current.onloadeddata = () => {
          console.log("Camera video ready, starting detection...");
          handle_cameraLoad();
        };
      } catch (error) {
        console.error("Failed to start camera:", error);
        alert("Failed to start camera. Please check permissions.");
      }
    }
  }, [camera_stream]);

  const handle_cameraLoad = useCallback(() => {
    if (!cameraRef.current || !camera_stream || !sessionsConfig) {
      console.log("Camera not ready for detection");
      return;
    }
    
    console.log("Setting up camera detection...");
    const inputCanvasCtx = inputCanvasRef.current.getContext("2d", {
      willReadFrequently: true,
    });
    
    // Set canvas dimensions
    inputCanvasCtx.canvas.width = cameraRef.current.videoWidth;
    inputCanvasCtx.canvas.height = cameraRef.current.videoHeight;
    overlayRef.current.width = cameraRef.current.videoWidth;
    overlayRef.current.height = cameraRef.current.videoHeight;
    
    console.log(`Camera dimensions: ${cameraRef.current.videoWidth}x${cameraRef.current.videoHeight}`);
    console.log("Starting continuous detection...");
    
    // Start the continuous detection loop
    handle_frame_continuous(inputCanvasCtx);
  }, [sessionsConfig, camera_stream]);

  const handle_frame_continuous = useCallback(
    async (ctx) => {
      // Check if camera is still active
      if (!cameraRef.current || !cameraRef.current.srcObject || !camera_stream) {
        console.log("Camera stopped, ending continuous detection");
        return;
      }
      
      try {
        // Check if video is ready
        if (cameraRef.current.readyState < 2) {
          // Video not ready yet, try again
          requestAnimationFrame(() => handle_frame_continuous(ctx));
          return;
        }
        
        // Draw frame to input canvas
        ctx.drawImage(
          cameraRef.current,
          0,
          0,
          cameraRef.current.videoWidth,
          cameraRef.current.videoHeight
        );
        
        // Run inference if model is loaded
        if (sessionsConfig && sessionsConfig.yolo_model) {
          const [results, results_inferenceTime] = await inference_pipeline(
            inputCanvasRef.current,
            sessionsConfig
          );
          setDetails(results);
          setInferenceTime(results_inferenceTime);
          setFrameCount(prev => prev + 1);
          draw_bounding_boxes(results, overlayRef.current);
        }
        
        // Continue the loop with controlled frame rate (aim for ~15 FPS for detection)
        setTimeout(() => {
          if (camera_stream) { // Double-check camera is still active
            requestAnimationFrame(() => handle_frame_continuous(ctx));
          }
        }, 66); // ~15 FPS (1000ms / 15 = 66.67ms)
      } catch (error) {
        console.error("Error in continuous detection:", error);
        // Continue the loop even if there's an error, but with delay
        setTimeout(() => {
          if (camera_stream) {
            requestAnimationFrame(() => handle_frame_continuous(ctx));
          }
        }, 100);
      }
    },
    [sessionsConfig, camera_stream]
  );

  return (
    <>
      {/* ===== ROBOVISION HEADER ===== */}
      <div className="text-center py-8 mb-8">
        <h1 className="robovision-title text-6xl mb-4">
          ROBOVISION AI
        </h1>
        <p className="robovision-subtitle text-xl mb-2">
          Neural Object Detection System
        </p>
        <div className="flex justify-center items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full pulse-glow"></div>
            <span>System Online</span>
          </div>
          <div className="w-px h-4 bg-gray-600"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>AI Ready</span>
          </div>
        </div>
      </div>

      {/* ===== CONTROL PANEL ===== */}
      <div
        id="setting-container"
        className="holographic-panel text-lg flex justify-evenly gap-10 items-center"
      >
        <div id="device-selector-container" className="flex flex-col items-center gap-2">
          <label htmlFor="device-selector" className="text-sm font-medium text-gray-300">
            Backend Engine
          </label>
          <select name="device-selector" ref={deviceRef} onChange={handleDeviceChange} className="min-w-[140px]">
            <option value="webgpu">⚡ WebGPU</option>
            <option value="wasm">🖥️ WASM (CPU)</option>
          </select>
        </div>
        
        <div className="w-px h-8 bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
        
        <div id="model-selector-container" className="flex flex-col items-center gap-2">
          <label htmlFor="model-selector" className="text-sm font-medium text-gray-300">
            Neural Model
          </label>
          <select name="model-selector" ref={modelRef} onChange={handleModelChange} className="min-w-[160px]">
            <option value="yolo11n-simplify-dynamic">🧠 YOLO11-N (2.6M)</option>
            <option value="yolo11s-simplify-dynamic">🧠 YOLO11-S (9.4M)</option>
            <option value="yolo11m-simplify-dynamic">🧠 YOLO11-M (20.1M)</option>
            {customModels.map((model, index) => (
              <option key={index} value={model.url}>
                🧠 {model.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="w-px h-8 bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
        
        <div id="camera-selector-container" className="flex flex-col items-center gap-2">
          <label htmlFor="camera-selector" className="text-sm font-medium text-gray-300">
            Visual Input
          </label>
          <select ref={cameraSelectorRef} className="min-w-[140px]">
            {cameras.map((camera, index) => (
              <option key={index} value={camera.deviceId}>
                📹 {camera.label || `Camera ${index + 1}`}
              </option>
            ))}
          </select>
        </div>
        
        <div className="w-px h-8 bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
        
        <div id="reload-container" className="flex flex-col items-center gap-2">
          <button
            onClick={loadModel}
            disabled={isLoading}
            className="btn glow-cyan hover:glow-accent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="mr-2">
              {isLoading ? "🔄" : "⚡"}
            </span>
            {isLoading ? "Loading..." : "Reload Model"}
          </button>
        </div>
      </div>

      {/* ===== HOLOGRAPHIC DISPLAY AREA ===== */}
      <div className="holographic-panel relative min-w-[640px] min-h-[320px] flex justify-center items-center overflow-hidden">
        {/* Scanning Line Animation */}
        <div className="scanning-line"></div>
        
        {/* Hidden Canvas for Processing */}
        <canvas ref={inputCanvasRef} hidden></canvas>
        
        {/* Video Feed */}
        <video
          className="block max-w-[720px] max-h-[640px] rounded-lg border-2 border-transparent hover:border-cyan-500 transition-all duration-300"
          ref={cameraRef}
          onLoadedData={handle_cameraLoad}
          hidden={!camera_stream}
          autoPlay
        />
        
        {/* Image Display */}
        <img
          id="img"
          ref={imgRef}
          src={imgSrc}
          onLoad={handle_ImageLoad}
          className="block inset-0 max-w-[720px] max-h-[640px] rounded-lg border-2 border-transparent hover:border-cyan-500 transition-all duration-300"
        />
        
        {/* Detection Overlay Canvas */}
        <canvas ref={overlayRef} className="absolute pointer-events-none" />
        
        {/* Status Overlay */}
        {!camera_stream && !imgSrc && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="text-6xl mb-4">📷</div>
              <p className="text-lg mb-2">Visual Input Required</p>
              <p className="text-sm">Upload an image or activate camera feed</p>
            </div>
          </div>
        )}
        
        {/* Processing Indicator */}
        {isModelLoaded && (camera_stream || imgSrc) && (
          <div className="absolute top-4 right-4">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-cyan-500/50">
              <div className="flex items-center gap-2 text-cyan-400 text-sm">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span>{camera_stream ? "Live Detection Active" : "AI Processing"}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Live Detection Status */}
        {camera_stream && (
          <div className="absolute bottom-4 left-4">
            <div className="bg-green-500/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-green-500/50">
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live Detection: {inferenceTime > 0 ? `${inferenceTime}ms` : "Initializing..."} | Frames: {frameCount}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== ACTION CONTROL PANEL ===== */}
      <div id="btn-container" className="holographic-panel flex justify-around items-center py-6">
        <button
          className="btn glow-cyan hover:glow-accent"
          disabled={camera_stream || !isModelLoaded}
          onClick={() => {
            if (!imgSrc) {
              openImageRef.current.click();
            } else {
              setImgSrc("");
              openImageRef.current.disabled = false;
              overlayRef.current.width = 0;
              overlayRef.current.height = 0;
            }
          }}
        >
          <span className="mr-2">
            {imgSrc ? "🖼️" : "📁"}
          </span>
          {imgSrc ? "Close Image" : "Open Image"}
          <input
            type="file"
            accept="image/*"
            hidden
            ref={openImageRef}
            onChange={handle_OpenImage}
          />
        </button>

        <button
          className="btn glow-blue hover:glow-accent"
          onClick={handle_ToggleCamera}
          disabled={cameras.length === 0 || imgSrc || !isModelLoaded}
        >
          <span className="mr-2">
            {camera_stream ? "📷" : "🎥"}
          </span>
          {camera_stream ? "Close Camera" : "Open Camera"}
        </button>

        <label className="btn glow-purple hover:glow-accent cursor-pointer">
          <span className="mr-2">🧠</span>
          <span>Add Model</span>
          <input
            type="file"
            accept=".onnx"
            onChange={handle_AddModel}
            hidden
          />
        </label>
      </div>

      {/* ===== SYSTEM STATUS DISPLAY ===== */}
      <div id="model-status-container" className="holographic-panel text-center py-6">
        <div
          id="inferenct-time-container"
          className="flex justify-evenly text-xl mb-6"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-400 mb-1">Warm Up</span>
            <span className="text-2xl font-mono text-cyan-400 glow-cyan">
              {warnUpTime}ms
            </span>
          </div>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-400 mb-1">Inference</span>
            <span className="text-2xl font-mono text-blue-400 glow-blue">
              {inferenceTime}ms
            </span>
          </div>
        </div>
        <div className="relative">
          <p
            className={`text-xl font-mono ${
              isModelLoaded 
                ? "text-green-400 glow-accent" 
                : isLoading
                ? "text-yellow-400 animate-text-loading"
                : "text-orange-400"
            }`}
            ref={modelStatusRef}
          >
            {isModelLoaded 
              ? "✅ AI System Ready" 
              : isLoading 
              ? "🔄 Initializing Neural Network..." 
              : "⚠️ Configuration Changed - Reload Required"
            }
          </p>
          {isModelLoaded ? (
            <div className="mt-2 text-sm text-gray-400">
              <span className="mr-4">⚡ Performance: Optimal</span>
              <span>🔒 Security: Active</span>
            </div>
          ) : !isLoading && (
            <div className="mt-2 text-sm text-orange-400">
              <span>Click "Reload Model" to apply new settings</span>
            </div>
          )}
        </div>
      </div>

      {/* ===== DETECTION RESULTS DISPLAY ===== */}
      <details className="holographic-panel text-gray-200 group" open>
        <summary className="my-6 hover:text-cyan-400 cursor-pointer transition-colors duration-300 flex items-center justify-center">
          <span className="text-xl font-mono mr-2">🔍</span>
          <span className="text-lg font-semibold">Neural Detection Results</span>
          <span className="text-xl font-mono ml-2">🧠</span>
        </summary>
        <div
          className="transition-all duration-300 ease-in-out transform origin-top
                  group-open:animate-details-show"
        >
          {details.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="text-left w-full border-collapse table-auto text-sm">
                <thead>
                  <tr className="border-b border-cyan-500/30">
                    <th className="p-4 text-cyan-400 font-mono text-sm uppercase tracking-wider">
                      #
                    </th>
                    <th className="p-4 text-cyan-400 font-mono text-sm uppercase tracking-wider">
                      Object Class
                    </th>
                    <th className="p-4 text-cyan-400 font-mono text-sm uppercase tracking-wider">
                      Confidence
                    </th>
                    <th className="p-4 text-cyan-400 font-mono text-sm uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {details.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-700/50 hover:bg-cyan-500/10 transition-all duration-200 text-gray-300"
                    >
                      <td className="p-4 font-mono text-cyan-300">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="p-4 font-medium">
                        <span className="inline-flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                          {classes.class[item.class_idx]}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${(item.score * 100)}%` }}
                            ></div>
                          </div>
                          <span className="font-mono text-cyan-300 min-w-[3rem]">
                            {(item.score * 100).toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          item.score > 0.8 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                            : item.score > 0.6 
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                            : 'bg-red-500/20 text-red-400 border border-red-500/50'
                        }`}>
                          {item.score > 0.8 ? 'High' : item.score > 0.6 ? 'Medium' : 'Low'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <div className="text-4xl mb-2">🔍</div>
              <p className="text-lg">No objects detected</p>
              <p className="text-sm">Upload an image or activate camera to begin detection</p>
            </div>
          )}
        </div>
      </details>
    </>
  );
}

export default App;
