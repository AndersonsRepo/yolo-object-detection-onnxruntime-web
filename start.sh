#!/bin/bash

echo "Setting up YOLO Object Detection Web Application..."

# Copy ONNX runtime WebAssembly files if they don't exist
if [ ! -f "public/ort-wasm-simd-threaded.wasm" ]; then
    echo "Copying WebAssembly files..."
    cp node_modules/onnxruntime-web/dist/*.wasm public/
    cp node_modules/onnxruntime-web/dist/*.mjs public/
    cp node_modules/onnxruntime-web/dist/*.js public/
    echo "WebAssembly files copied successfully!"
fi

# Start the development server
echo "Starting development server..."
npm run dev
