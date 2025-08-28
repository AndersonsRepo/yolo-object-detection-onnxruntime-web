var em=Object.defineProperty;var tm=(e,t,r)=>t in e?em(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var ms=(e,t,r)=>tm(e,typeof t!="symbol"?t+"":t,r);/*!
 * ONNX Runtime Web v1.22.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var In=Object.defineProperty,rm=Object.getOwnPropertyDescriptor,im=Object.getOwnPropertyNames,nm=Object.prototype.hasOwnProperty,am=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),P=(e,t)=>()=>(e&&(t=e(e=0)),t),qt=(e,t)=>{for(var r in t)In(e,r,{get:t[r],enumerable:!0})},sm=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of im(t))!nm.call(e,a)&&a!==r&&In(e,a,{get:()=>t[a],enumerable:!(n=rm(t,a))||n.enumerable});return e},sr=e=>sm(In({},"__esModule",{value:!0}),e),Gt,ft,Mt,gs,Zl,Ql=P(()=>{Gt=new Map,ft=[],Mt=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let n=Gt.get(e);if(n===void 0)Gt.set(e,{backend:t,priority:r});else{if(n.priority>r)return;if(n.priority===r&&n.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let a=ft.indexOf(e);a!==-1&&ft.splice(a,1);for(let i=0;i<ft.length;i++)if(Gt.get(ft[i]).priority<=r){ft.splice(i,0,e);return}ft.push(e)}return}throw new TypeError("not a valid backend")},gs=async e=>{let t=Gt.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(n){return r||(t.error=`${n}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Zl=async e=>{let t=e.executionProviders||[],r=t.map(d=>typeof d=="string"?d:d.name),n=r.length===0?ft:r,a,i=[],s=new Set;for(let d of n){let l=await gs(d);typeof l=="string"?i.push({name:d,err:l}):(a||(a=l),a===l&&s.add(d))}if(!a)throw new Error(`no available backend found. ERR: ${i.map(d=>`[${d.name}] ${d.err}`).join(", ")}`);for(let{name:d,err:l}of i)r.includes(d)&&console.warn(`removing requested execution provider "${d}" from session options because it is not available: ${l}`);let u=t.filter(d=>s.has(typeof d=="string"?d:d.name));return[a,new Proxy(e,{get:(d,l)=>l==="executionProviders"?u:Reflect.get(d,l)})]}}),om=P(()=>{Ql()}),Xl,um=P(()=>{Xl="1.22.0"}),di,Pe,Yl=P(()=>{um(),di="warning",Pe={wasm:{},webgl:{},webgpu:{},versions:{common:Xl},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);di=e}},get logLevel(){return di}},Object.defineProperty(Pe,"logLevel",{enumerable:!0})}),_e,lm=P(()=>{Yl(),_e=Pe}),Jl,ed,dm=P(()=>{Jl=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let n=r.getContext("2d");if(n!=null){let a,i;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],i=e.dims[3]):(a=e.dims[3],i=e.dims[2]);let s=(t==null?void 0:t.format)!==void 0?t.format:"RGB",u=t==null?void 0:t.norm,d,l;u===void 0||u.mean===void 0?d=[255,255,255,255]:typeof u.mean=="number"?d=[u.mean,u.mean,u.mean,u.mean]:(d=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(d[3]=u.mean[3])),u===void 0||u.bias===void 0?l=[0,0,0,0]:typeof u.bias=="number"?l=[u.bias,u.bias,u.bias,u.bias]:(l=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(l[3]=u.bias[3]));let f=i*a,c=0,m=f,g=f*2,_=-1;s==="RGBA"?(c=0,m=f,g=f*2,_=f*3):s==="RGB"?(c=0,m=f,g=f*2):s==="RBG"&&(c=0,g=f,m=f*2);for(let b=0;b<i;b++)for(let x=0;x<a;x++){let $=(e.data[c++]-l[0])*d[0],w=(e.data[m++]-l[1])*d[1],S=(e.data[g++]-l[2])*d[2],k=_===-1?255:(e.data[_++]-l[3])*d[3];n.fillStyle="rgba("+$+","+w+","+S+","+k+")",n.fillRect(x,b,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},ed=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),n;if(r!=null){let a,i,s;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],i=e.dims[1],s=e.dims[3]):(a=e.dims[3],i=e.dims[2],s=e.dims[1]);let u=t!==void 0&&t.format!==void 0?t.format:"RGB",d=t==null?void 0:t.norm,l,f;d===void 0||d.mean===void 0?l=[255,255,255,255]:typeof d.mean=="number"?l=[d.mean,d.mean,d.mean,d.mean]:(l=[d.mean[0],d.mean[1],d.mean[2],255],d.mean[3]!==void 0&&(l[3]=d.mean[3])),d===void 0||d.bias===void 0?f=[0,0,0,0]:typeof d.bias=="number"?f=[d.bias,d.bias,d.bias,d.bias]:(f=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(f[3]=d.bias[3]));let c=i*a;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let m=4,g=0,_=1,b=2,x=3,$=0,w=c,S=c*2,k=-1;u==="RGBA"?($=0,w=c,S=c*2,k=c*3):u==="RGB"?($=0,w=c,S=c*2):u==="RBG"&&($=0,S=c,w=c*2),n=r.createImageData(a,i);for(let T=0;T<i*a;g+=m,_+=m,b+=m,x+=m,T++)n.data[g]=(e.data[$++]-f[0])*l[0],n.data[_]=(e.data[w++]-f[1])*l[1],n.data[b]=(e.data[S++]-f[2])*l[2],n.data[x]=k===-1?255:(e.data[k++]-f[3])*l[3]}else throw new Error("Can not access image data");return n}}),br,td,rd,id,nd,ad,pm=P(()=>{En(),br=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:n}=t,a=t.norm??{mean:255,bias:0},i,s;typeof a.mean=="number"?i=[a.mean,a.mean,a.mean,a.mean]:i=[a.mean[0],a.mean[1],a.mean[2],a.mean[3]??255],typeof a.bias=="number"?s=[a.bias,a.bias,a.bias,a.bias]:s=[a.bias[0],a.bias[1],a.bias[2],a.bias[3]??0];let u=t.format!==void 0?t.format:"RGBA",d=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",l=r*n,f=d==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),c=4,m=0,g=1,_=2,b=3,x=0,$=l,w=l*2,S=-1;u==="RGB"&&(c=3,m=0,g=1,_=2,b=-1),d==="RGBA"?S=l*3:d==="RBG"?(x=0,w=l,$=l*2):d==="BGR"&&(w=0,$=l,x=l*2);for(let k=0;k<l;k++,m+=c,_+=c,g+=c,b+=c)f[x++]=(e[m]+s[0])/i[0],f[$++]=(e[g]+s[1])/i[1],f[w++]=(e[_]+s[2])/i[2],S!==-1&&b!==-1&&(f[S++]=(e[b]+s[3])/i[3]);return d==="RGBA"?new Ne("float32",f,[1,4,r,n]):new Ne("float32",f,[1,3,r,n])},td=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,n=typeof ImageData<"u"&&e instanceof ImageData,a=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,i=typeof e=="string",s,u=t??{},d=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=f=>typeof HTMLCanvasElement<"u"&&f instanceof HTMLCanvasElement||f instanceof OffscreenCanvas?f.getContext("2d"):null;if(r){let f=d();f.width=e.width,f.height=e.height;let c=l(f);if(c!=null){let m=e.height,g=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(m=t.resizedHeight,g=t.resizedWidth),t!==void 0){if(u=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=m,u.width=g}else u.tensorFormat="RGBA",u.height=m,u.width=g;c.drawImage(e,0,0),s=c.getImageData(0,0,g,m).data}else throw new Error("Can not access image data")}else if(n){let f,c;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(f=t.resizedHeight,c=t.resizedWidth):(f=e.height,c=e.width),t!==void 0&&(u=t),u.format="RGBA",u.height=f,u.width=c,t!==void 0){let m=d();m.width=c,m.height=f;let g=l(m);if(g!=null)g.putImageData(e,0,0),s=g.getImageData(0,0,c,f).data;else throw new Error("Can not access image data")}else s=e.data}else if(a){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let f=d();f.width=e.width,f.height=e.height;let c=l(f);if(c!=null){let m=e.height,g=e.width;return c.drawImage(e,0,0,g,m),s=c.getImageData(0,0,g,m).data,u.height=m,u.width=g,br(s,u)}else throw new Error("Can not access image data")}else{if(i)return new Promise((f,c)=>{let m=d(),g=l(m);if(!e||!g)return c();let _=new Image;_.crossOrigin="Anonymous",_.src=e,_.onload=()=>{m.width=_.width,m.height=_.height,g.drawImage(_,0,0,m.width,m.height);let b=g.getImageData(0,0,m.width,m.height);u.height=m.height,u.width=m.width,f(br(b.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return br(s,u);throw new Error("Input data provided is not supported - aborted tensor creation")},rd=(e,t)=>{let{width:r,height:n,download:a,dispose:i}=t,s=[1,n,r,4];return new Ne({location:"texture",type:"float32",texture:e,dims:s,download:a,dispose:i})},id=(e,t)=>{let{dataType:r,dims:n,download:a,dispose:i}=t;return new Ne({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:n,download:a,dispose:i})},nd=(e,t)=>{let{dataType:r,dims:n,download:a,dispose:i}=t;return new Ne({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:n,download:a,dispose:i})},ad=(e,t,r)=>new Ne({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),kt,tr,pi,sd,fm=P(()=>{kt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),tr=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),pi=!1,sd=()=>{if(!pi){pi=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,n=typeof r<"u"&&r.from;e&&(kt.set("int64",BigInt64Array),tr.set(BigInt64Array,"int64")),t&&(kt.set("uint64",BigUint64Array),tr.set(BigUint64Array,"uint64")),n?(kt.set("float16",r),tr.set(r,"float16")):kt.set("float16",Uint16Array)}}}),od,ud,cm=P(()=>{En(),od=e=>{let t=1;for(let r=0;r<e.length;r++){let n=e[r];if(typeof n!="number"||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t},ud=(e,t)=>{switch(e.location){case"cpu":return new Ne(e.type,e.data,t);case"cpu-pinned":return new Ne({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Ne({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Ne({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Ne({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Ne,En=P(()=>{dm(),pm(),fm(),cm(),Ne=class{constructor(e,t,r){sd();let n,a;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,n=e.type,a=e.dims,e.location){case"cpu-pinned":{let s=kt.get(n);if(!s)throw new TypeError(`unsupported type "${n}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(n!=="float32")throw new TypeError(`unsupported type "${n}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(n!=="float32"&&n!=="float16"&&n!=="int32"&&n!=="int64"&&n!=="uint32"&&n!=="uint8"&&n!=="bool"&&n!=="uint4"&&n!=="int4")throw new TypeError(`unsupported type "${n}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(n!=="float32"&&n!=="float16"&&n!=="int32"&&n!=="int64"&&n!=="uint32"&&n!=="uint64"&&n!=="int8"&&n!=="uint8"&&n!=="bool"&&n!=="uint4"&&n!=="int4")throw new TypeError(`unsupported type "${n}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,u;if(typeof e=="string")if(n=e,u=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");s=t}else{let d=kt.get(e);if(d===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&d===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${d.name} as data.`);e==="uint64"||e==="int64"?s=d.from(t,BigInt):s=d.from(t)}else if(t instanceof d)s=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&d!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${n} tensor's data must be type of ${d}`)}else if(u=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let d=typeof e[0];if(d==="string")n="string",s=e;else if(d==="boolean")n="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${d}.`)}else if(e instanceof Uint8ClampedArray)n="uint8",s=Uint8Array.from(e);else{let d=tr.get(e.constructor);if(d===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);n=d,s=e}if(u===void 0)u=[s.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");a=u,this.cpuData=s,this.dataLocation="cpu"}let i=od(a);if(this.cpuData&&i!==this.cpuData.length&&!((n==="uint4"||n==="int4")&&Math.ceil(i/2)===this.cpuData.length))throw new Error(`Tensor's size(${i}) does not match data length(${this.cpuData.length}).`);this.type=n,this.dims=a,this.size=i}static async fromImage(e,t){return td(e,t)}static fromTexture(e,t){return rd(e,t)}static fromGpuBuffer(e,t){return id(e,t)}static fromMLTensor(e,t){return nd(e,t)}static fromPinnedBuffer(e,t,r){return ad(e,t,r)}toDataURL(e){return Jl(this,e)}toImageData(e){return ed(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return ud(this,e)}}}),Ye,ld=P(()=>{En(),Ye=Ne}),Rr,fi,Je,Fe,dd=P(()=>{Yl(),Rr=(e,t)=>{(typeof Pe.trace>"u"?!Pe.wasm.trace:!Pe.trace)||console.timeStamp(`${e}::ORT::${t}`)},fi=(e,t)=>{var a;let r=((a=new Error().stack)==null?void 0:a.split(/\r\n|\r|\n/g))||[],n=!1;for(let i=0;i<r.length;i++){if(n&&!r[i].includes("TRACE_FUNC")){let s=`FUNC_${e}::${r[i].trim().split(" ")[1]}`;t&&(s+=`::${t}`),Rr("CPU",s);return}r[i].includes("TRACE_FUNC")&&(n=!0)}},Je=e=>{(typeof Pe.trace>"u"?!Pe.wasm.trace:!Pe.trace)||fi("BEGIN",e)},Fe=e=>{(typeof Pe.trace>"u"?!Pe.wasm.trace:!Pe.trace)||fi("END",e)}}),pd,hm=P(()=>{Ql(),ld(),dd(),pd=class fd{constructor(t){this.handler=t}async run(t,r,n){Je();let a={},i={};if(typeof t!="object"||t===null||t instanceof Ye||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Ye)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let l of r){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);a[l]=null}if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,f=Object.getOwnPropertyNames(r);for(let c of this.outputNames)if(f.indexOf(c)!==-1){let m=r[c];(m===null||m instanceof Ye)&&(l=!0,s=!1,a[c]=m)}if(l){if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of this.inputNames)if(typeof t[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(s)for(let l of this.outputNames)a[l]=null;let u=await this.handler.run(t,a,i),d={};for(let l in u)if(Object.hasOwnProperty.call(u,l)){let f=u[l];f instanceof Ye?d[l]=f:d[l]=new Ye(f.type,f.data,f.dims)}return Fe(),d}async release(){return this.handler.dispose()}static async create(t,r,n,a){Je();let i,s={};if(typeof t=="string"){if(i=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(i=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let f=t,c=0,m=t.byteLength;if(typeof r=="object"&&r!==null)s=r;else if(typeof r=="number"){if(c=r,!Number.isSafeInteger(c))throw new RangeError("'byteOffset' must be an integer.");if(c<0||c>=f.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${f.byteLength}).`);if(m=t.byteLength-c,typeof n=="number"){if(m=n,!Number.isSafeInteger(m))throw new RangeError("'byteLength' must be an integer.");if(m<=0||c+m>f.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${f.byteLength-c}].`);if(typeof a=="object"&&a!==null)s=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else if(typeof n<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(f,c,m)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,d]=await Zl(s),l=await u.createInferenceSessionHandler(i,d);return Fe(),new fd(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),cd,mm=P(()=>{hm(),cd=pd}),gm=P(()=>{}),_m=P(()=>{}),ym=P(()=>{}),bm=P(()=>{}),hd={};qt(hd,{InferenceSession:()=>cd,TRACE:()=>Rr,TRACE_FUNC_BEGIN:()=>Je,TRACE_FUNC_END:()=>Fe,Tensor:()=>Ye,env:()=>_e,registerBackend:()=>Mt});var je=P(()=>{om(),lm(),mm(),ld(),gm(),_m(),dd(),ym(),bm()}),zn=P(()=>{}),md={};qt(md,{default:()=>gd});var ci,hi,gd,wm=P(()=>{var e;vc(),Ct(),Cn(),ci="ort-wasm-proxy-worker",hi=((e=globalThis.self)==null?void 0:e.name)===ci,hi&&(self.onmessage=t=>{let{type:r,in:n}=t.data;try{switch(r){case"init-wasm":On(n.wasm).then(()=>{Kn(n).then(()=>{postMessage({type:r})},a=>{postMessage({type:r,err:a})})},a=>{postMessage({type:r,err:a})});break;case"init-ep":{let{epName:a,env:i}=n;Zn(i,a).then(()=>{postMessage({type:r})},s=>{postMessage({type:r,err:s})});break}case"copy-from":{let{buffer:a}=n,i=Wr(a);postMessage({type:r,out:i});break}case"create":{let{model:a,options:i}=n;Qn(a,i).then(s=>{postMessage({type:r,out:s})},s=>{postMessage({type:r,err:s})});break}case"release":Xn(n),postMessage({type:r});break;case"run":{let{sessionId:a,inputIndices:i,inputs:s,outputIndices:u,options:d}=n;Yn(a,i,s,u,new Array(u.length).fill(null),d).then(l=>{l.some(f=>f[3]!=="cpu")?postMessage({type:r,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:r,out:l},ea([...s,...l]))},l=>{postMessage({type:r,err:l})});break}case"end-profiling":Jn(n),postMessage({type:r});break;default:}}catch(a){postMessage({type:r,err:a})}}),gd=hi?null:t=>new Worker(t??Re,{type:"module",name:ci})}),_d={};qt(_d,{default:()=>yd});var mi,gi,yd,_s,$m=P(()=>{var e,t;gi=(mi=import.meta.url,async function(r={}){var hs;var n,a,i=r,s=new Promise((o,p)=>{n=o,a=p}),u=typeof window=="object",d=typeof WorkerGlobalScope<"u",l=d&&((hs=self.name)==null?void 0:hs.startsWith("em-pthread"));i.mountExternalData=(o,p)=>{o.startsWith("./")&&(o=o.substring(2)),(i.Fb||(i.Fb=new Map)).set(o,p)},i.unmountExternalData=()=>{delete i.Fb};var f=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,qc:!0}).buffer.constructor;let c=o=>async(...p)=>{var h;try{if(i.Gb)throw Error("Session already started");let y=i.Gb={ec:p[0],errors:[]},v=await o(...p);if(i.Gb!==y)throw Error("Session mismatch");(h=i.Kb)==null||h.flush();let I=y.errors;if(0<I.length){let B=await Promise.all(I);if(B=B.filter(D=>D),0<B.length)throw Error(B.join(`
`))}return v}finally{i.Gb=null}};i.jsepInit=(o,p)=>{if(o==="webgpu"){[i.Kb,i.Vb,i.Zb,i.Lb,i.Yb,i.kb,i.$b,i.bc,i.Wb,i.Xb,i.ac]=p;let h=i.Kb;i.jsepRegisterBuffer=(y,v,I,B)=>h.registerBuffer(y,v,I,B),i.jsepGetBuffer=y=>h.getBuffer(y),i.jsepCreateDownloader=(y,v,I)=>h.createDownloader(y,v,I),i.jsepOnCreateSession=y=>{h.onCreateSession(y)},i.jsepOnReleaseSession=y=>{h.onReleaseSession(y)},i.jsepOnRunStart=y=>h.onRunStart(y),i.cc=(y,v)=>{h.upload(y,v)}}else if(o==="webnn"){let h=p[0];[i.oc,i.Ob,i.webnnEnsureTensor,i.Pb,i.webnnDownloadTensor]=p.slice(1),i.webnnReleaseTensorId=i.Ob,i.webnnUploadTensor=i.Pb,i.webnnOnRunStart=y=>h.onRunStart(y),i.webnnOnRunEnd=h.onRunEnd.bind(h),i.webnnRegisterMLContext=(y,v)=>{h.registerMLContext(y,v)},i.webnnOnReleaseSession=y=>{h.onReleaseSession(y)},i.webnnCreateMLTensorDownloader=(y,v)=>h.createMLTensorDownloader(y,v),i.webnnRegisterMLTensor=(y,v,I,B)=>h.registerMLTensor(y,v,I,B),i.webnnCreateMLContext=y=>h.createMLContext(y),i.webnnRegisterMLConstant=(y,v,I,B,D,W)=>h.registerMLConstant(y,v,I,B,D,i.Fb,W),i.webnnRegisterGraphInput=h.registerGraphInput.bind(h),i.webnnIsGraphInput=h.isGraphInput.bind(h),i.webnnRegisterGraphOutput=h.registerGraphOutput.bind(h),i.webnnIsGraphOutput=h.isGraphOutput.bind(h),i.webnnCreateTemporaryTensor=h.createTemporaryTensor.bind(h),i.webnnIsGraphInputOutputTypeSupported=h.isGraphInputOutputTypeSupported.bind(h)}};let m=()=>{let o=(p,h,y)=>(...v)=>{let I=Ze,B=h==null?void 0:h();v=p(...v);let D=h==null?void 0:h();return B!==D&&(p=D,y(B),h=y=null),Ze!=I?new Promise((W,K)=>{ri={resolve:W,reject:K}}):v};(()=>{for(let p of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])i[p]=o(i[p],()=>i[p],h=>i[p]=h)})(),c!==void 0&&(i._OrtRun=c(i._OrtRun),i._OrtRunWithBinding=c(i._OrtRunWithBinding)),m=void 0};i.asyncInit=()=>{m==null||m()};var g,_,b=Object.assign({},i),x=(o,p)=>{throw p},$="";(u||d)&&(d?$=self.location.href:typeof document<"u"&&document.currentScript&&($=document.currentScript.src),mi&&($=mi),$=$.startsWith("blob:")?"":$.slice(0,$.replace(/[?#].*/,"").lastIndexOf("/")+1),d&&(_=o=>{var p=new XMLHttpRequest;return p.open("GET",o,!1),p.responseType="arraybuffer",p.send(null),new Uint8Array(p.response)}),g=async o=>{if(N(o))return new Promise((h,y)=>{var v=new XMLHttpRequest;v.open("GET",o,!0),v.responseType="arraybuffer",v.onload=()=>{v.status==200||v.status==0&&v.response?h(v.response):y(v.status)},v.onerror=y,v.send(null)});var p=await fetch(o,{credentials:"same-origin"});if(p.ok)return p.arrayBuffer();throw Error(p.status+" : "+p.url)});var w=console.log.bind(console),S=console.error.bind(console),k=w,T=S;Object.assign(i,b),b=null;var E,z,C,A,q,X,G,Z,oe,re,L,ie,F,Y=i.wasmBinary,ye=!1,N=o=>o.startsWith("file://");function U(){return E.buffer!=A.buffer&&ce(),A}function V(){return E.buffer!=A.buffer&&ce(),q}function te(){return E.buffer!=A.buffer&&ce(),X}function Te(){return E.buffer!=A.buffer&&ce(),G}function M(){return E.buffer!=A.buffer&&ce(),Z}function fe(){return E.buffer!=A.buffer&&ce(),oe}function At(){return E.buffer!=A.buffer&&ce(),re}function ze(){return E.buffer!=A.buffer&&ce(),F}if(l){let o=function(p){try{var h=p.data,y=h.Cb;if(y==="load"){let v=[];self.onmessage=I=>v.push(I),self.startWorker=()=>{postMessage({Cb:"loaded"});for(let I of v)o(I);self.onmessage=o};for(let I of h.Sb)i[I]&&!i[I].proxy||(i[I]=(...B)=>{postMessage({Cb:"callHandler",Rb:I,args:B})},I=="print"&&(k=i[I]),I=="printErr"&&(T=i[I]));E=h.lc,ce(),Ue(h.mc)}else if(y==="run"){Mc(h.Bb),si(h.Bb,0,0,1,0,0),ua(),ei(h.Bb),et||(rs(),et=!0);try{Dc(h.hc,h.Ib)}catch(v){if(v!="unwind")throw v}}else h.target!=="setimmediate"&&(y==="checkMailbox"?et&&ur():y&&(T(`worker: received unknown command ${y}`),T(h)))}catch(v){throw is(),v}};var Ue,et=!1;T=function(...p){p=p.join(" "),console.error(p)},self.alert=function(...p){postMessage({Cb:"alert",text:p.join(" "),jc:gr()})},self.onunhandledrejection=p=>{throw p.reason||p},self.onmessage=o}function ce(){var o=E.buffer;i.HEAP8=A=new Int8Array(o),i.HEAP16=X=new Int16Array(o),i.HEAPU8=q=new Uint8Array(o),i.HEAPU16=G=new Uint16Array(o),i.HEAP32=Z=new Int32Array(o),i.HEAPU32=oe=new Uint32Array(o),i.HEAPF32=re=new Float32Array(o),i.HEAPF64=F=new Float64Array(o),i.HEAP64=L=new BigInt64Array(o),i.HEAPU64=ie=new BigUint64Array(o)}function we(){l?startWorker(i):J.Da()}l||(E=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),ce());var Be,_t=0,yt=null;function ta(){if(--_t==0&&yt){var o=yt;yt=null,o()}}function st(o){throw T(o="Aborted("+o+")"),ye=!0,o=new WebAssembly.RuntimeError(o+". Build with -sASSERTIONS for more info."),a(o),o}function ra(){return{a:{L:Nc,Aa:Rc,b:Uc,$:fa,A:ma,pa:ga,X:ya,Z:ba,qa:wa,na:$a,ga:va,ma:xa,J:ka,Y:Sa,V:Ta,oa:Ia,W:Ea,va:qc,E:Wc,Q:Vc,O:Gc,D:Fc,v:jc,r:Kc,P:Zc,z:rh,R:ih,ja:nh,T:ah,aa:sh,M:oh,F:uh,ia:ei,sa:lh,t:dh,Ca:ph,w:hh,o:mh,m:_h,c:Xr,Ba:yh,n:bh,j:vh,u:xh,p:kh,f:Sh,s:Th,l:Ih,e:Eh,k:zh,h:Ch,g:Oh,d:Ah,da:Bh,ea:Rh,fa:Nh,ba:Va,ca:La,N:Ga,xa:Dh,ua:Uh,i:qh,C:Wh,G:Vh,ta:Ph,x:Lh,ra:Gh,U:Hh,q:Mh,y:Fh,K:jh,S:Kh,za:Zh,ya:Qh,ka:Ka,la:Za,_:jr,B:Qa,I:Xa,ha:Ya,H:Ja,a:E,wa:Fr}}}var Lr={840156:(o,p,h,y,v)=>{if(i===void 0||!i.Fb)return 1;if((o=xe(Number(o>>>0))).startsWith("./")&&(o=o.substring(2)),!(o=i.Fb.get(o)))return 2;if(p=Number(p>>>0),h=Number(h>>>0),y=Number(y>>>0),p+h>o.byteLength)return 3;try{let I=o.subarray(p,p+h);switch(v){case 0:V().set(I,y>>>0);break;case 1:i.nc?i.nc(y,I):i.cc(y,I);break;default:return 4}return 0}catch{return 4}},840980:(o,p,h)=>{i.Pb(o,V().subarray(p>>>0,p+h>>>0))},841044:()=>i.oc(),841086:o=>{i.Ob(o)},841123:()=>{i.Wb()},841154:()=>{i.Xb()},841183:()=>{i.ac()},841208:o=>i.Vb(o),841241:o=>i.Zb(o),841273:(o,p,h)=>{i.Lb(Number(o),Number(p),Number(h),!0)},841336:(o,p,h)=>{i.Lb(Number(o),Number(p),Number(h))},841393:()=>typeof wasmOffsetConverter<"u",841450:o=>{i.kb("Abs",o,void 0)},841501:o=>{i.kb("Neg",o,void 0)},841552:o=>{i.kb("Floor",o,void 0)},841605:o=>{i.kb("Ceil",o,void 0)},841657:o=>{i.kb("Reciprocal",o,void 0)},841715:o=>{i.kb("Sqrt",o,void 0)},841767:o=>{i.kb("Exp",o,void 0)},841818:o=>{i.kb("Erf",o,void 0)},841869:o=>{i.kb("Sigmoid",o,void 0)},841924:(o,p,h)=>{i.kb("HardSigmoid",o,{alpha:p,beta:h})},842003:o=>{i.kb("Log",o,void 0)},842054:o=>{i.kb("Sin",o,void 0)},842105:o=>{i.kb("Cos",o,void 0)},842156:o=>{i.kb("Tan",o,void 0)},842207:o=>{i.kb("Asin",o,void 0)},842259:o=>{i.kb("Acos",o,void 0)},842311:o=>{i.kb("Atan",o,void 0)},842363:o=>{i.kb("Sinh",o,void 0)},842415:o=>{i.kb("Cosh",o,void 0)},842467:o=>{i.kb("Asinh",o,void 0)},842520:o=>{i.kb("Acosh",o,void 0)},842573:o=>{i.kb("Atanh",o,void 0)},842626:o=>{i.kb("Tanh",o,void 0)},842678:o=>{i.kb("Not",o,void 0)},842729:(o,p,h)=>{i.kb("Clip",o,{min:p,max:h})},842798:o=>{i.kb("Clip",o,void 0)},842850:(o,p)=>{i.kb("Elu",o,{alpha:p})},842908:o=>{i.kb("Gelu",o,void 0)},842960:o=>{i.kb("Relu",o,void 0)},843012:(o,p)=>{i.kb("LeakyRelu",o,{alpha:p})},843076:(o,p)=>{i.kb("ThresholdedRelu",o,{alpha:p})},843146:(o,p)=>{i.kb("Cast",o,{to:p})},843204:o=>{i.kb("Add",o,void 0)},843255:o=>{i.kb("Sub",o,void 0)},843306:o=>{i.kb("Mul",o,void 0)},843357:o=>{i.kb("Div",o,void 0)},843408:o=>{i.kb("Pow",o,void 0)},843459:o=>{i.kb("Equal",o,void 0)},843512:o=>{i.kb("Greater",o,void 0)},843567:o=>{i.kb("GreaterOrEqual",o,void 0)},843629:o=>{i.kb("Less",o,void 0)},843681:o=>{i.kb("LessOrEqual",o,void 0)},843740:(o,p,h,y,v)=>{i.kb("ReduceMean",o,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:y?Array.from(M().subarray(Number(y)>>>0,Number(v)>>>0)):[]})},843915:(o,p,h,y,v)=>{i.kb("ReduceMax",o,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:y?Array.from(M().subarray(Number(y)>>>0,Number(v)>>>0)):[]})},844089:(o,p,h,y,v)=>{i.kb("ReduceMin",o,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:y?Array.from(M().subarray(Number(y)>>>0,Number(v)>>>0)):[]})},844263:(o,p,h,y,v)=>{i.kb("ReduceProd",o,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:y?Array.from(M().subarray(Number(y)>>>0,Number(v)>>>0)):[]})},844438:(o,p,h,y,v)=>{i.kb("ReduceSum",o,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:y?Array.from(M().subarray(Number(y)>>>0,Number(v)>>>0)):[]})},844612:(o,p,h,y,v)=>{i.kb("ReduceL1",o,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:y?Array.from(M().subarray(Number(y)>>>0,Number(v)>>>0)):[]})},844785:(o,p,h,y,v)=>{i.kb("ReduceL2",o,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:y?Array.from(M().subarray(Number(y)>>>0,Number(v)>>>0)):[]})},844958:(o,p,h,y,v)=>{i.kb("ReduceLogSum",o,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:y?Array.from(M().subarray(Number(y)>>>0,Number(v)>>>0)):[]})},845135:(o,p,h,y,v)=>{i.kb("ReduceSumSquare",o,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:y?Array.from(M().subarray(Number(y)>>>0,Number(v)>>>0)):[]})},845315:(o,p,h,y,v)=>{i.kb("ReduceLogSumExp",o,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:y?Array.from(M().subarray(Number(y)>>>0,Number(v)>>>0)):[]})},845495:o=>{i.kb("Where",o,void 0)},845548:(o,p,h)=>{i.kb("Transpose",o,{perm:p?Array.from(M().subarray(Number(p)>>>0,Number(h)>>>0)):[]})},845672:(o,p,h,y)=>{i.kb("DepthToSpace",o,{blocksize:p,mode:xe(h),format:y?"NHWC":"NCHW"})},845805:(o,p,h,y)=>{i.kb("DepthToSpace",o,{blocksize:p,mode:xe(h),format:y?"NHWC":"NCHW"})},845938:(o,p,h,y,v,I,B,D,W,K,se,le,me,Ie,Rt)=>{i.kb("ConvTranspose",o,{format:W?"NHWC":"NCHW",autoPad:p,dilations:[h],group:y,kernelShape:[v],pads:[I,B],strides:[D],wIsConst:()=>!!U()[K>>>0],outputPadding:se?Array.from(M().subarray(Number(se)>>>0,Number(le)>>>0)):[],outputShape:me?Array.from(M().subarray(Number(me)>>>0,Number(Ie)>>>0)):[],activation:xe(Rt)})},846371:(o,p,h,y,v,I,B,D,W,K,se,le,me,Ie)=>{i.kb("ConvTranspose",o,{format:D?"NHWC":"NCHW",autoPad:p,dilations:Array.from(M().subarray(Number(h)>>>0,2+(Number(h)>>>0)>>>0)),group:y,kernelShape:Array.from(M().subarray(Number(v)>>>0,2+(Number(v)>>>0)>>>0)),pads:Array.from(M().subarray(Number(I)>>>0,4+(Number(I)>>>0)>>>0)),strides:Array.from(M().subarray(Number(B)>>>0,2+(Number(B)>>>0)>>>0)),wIsConst:()=>!!U()[W>>>0],outputPadding:K?Array.from(M().subarray(Number(K)>>>0,Number(se)>>>0)):[],outputShape:le?Array.from(M().subarray(Number(le)>>>0,Number(me)>>>0)):[],activation:xe(Ie)})},847032:(o,p,h,y,v,I,B,D,W,K,se,le,me,Ie,Rt)=>{i.kb("ConvTranspose",o,{format:W?"NHWC":"NCHW",autoPad:p,dilations:[h],group:y,kernelShape:[v],pads:[I,B],strides:[D],wIsConst:()=>!!U()[K>>>0],outputPadding:se?Array.from(M().subarray(Number(se)>>>0,Number(le)>>>0)):[],outputShape:me?Array.from(M().subarray(Number(me)>>>0,Number(Ie)>>>0)):[],activation:xe(Rt)})},847465:(o,p,h,y,v,I,B,D,W,K,se,le,me,Ie)=>{i.kb("ConvTranspose",o,{format:D?"NHWC":"NCHW",autoPad:p,dilations:Array.from(M().subarray(Number(h)>>>0,2+(Number(h)>>>0)>>>0)),group:y,kernelShape:Array.from(M().subarray(Number(v)>>>0,2+(Number(v)>>>0)>>>0)),pads:Array.from(M().subarray(Number(I)>>>0,4+(Number(I)>>>0)>>>0)),strides:Array.from(M().subarray(Number(B)>>>0,2+(Number(B)>>>0)>>>0)),wIsConst:()=>!!U()[W>>>0],outputPadding:K?Array.from(M().subarray(Number(K)>>>0,Number(se)>>>0)):[],outputShape:le?Array.from(M().subarray(Number(le)>>>0,Number(me)>>>0)):[],activation:xe(Ie)})},848126:(o,p)=>{i.kb("GlobalAveragePool",o,{format:p?"NHWC":"NCHW"})},848217:(o,p,h,y,v,I,B,D,W,K,se,le,me,Ie)=>{i.kb("AveragePool",o,{format:Ie?"NHWC":"NCHW",auto_pad:p,ceil_mode:h,count_include_pad:y,storage_order:v,dilations:I?Array.from(M().subarray(Number(I)>>>0,Number(B)>>>0)):[],kernel_shape:D?Array.from(M().subarray(Number(D)>>>0,Number(W)>>>0)):[],pads:K?Array.from(M().subarray(Number(K)>>>0,Number(se)>>>0)):[],strides:le?Array.from(M().subarray(Number(le)>>>0,Number(me)>>>0)):[]})},848696:(o,p)=>{i.kb("GlobalAveragePool",o,{format:p?"NHWC":"NCHW"})},848787:(o,p,h,y,v,I,B,D,W,K,se,le,me,Ie)=>{i.kb("AveragePool",o,{format:Ie?"NHWC":"NCHW",auto_pad:p,ceil_mode:h,count_include_pad:y,storage_order:v,dilations:I?Array.from(M().subarray(Number(I)>>>0,Number(B)>>>0)):[],kernel_shape:D?Array.from(M().subarray(Number(D)>>>0,Number(W)>>>0)):[],pads:K?Array.from(M().subarray(Number(K)>>>0,Number(se)>>>0)):[],strides:le?Array.from(M().subarray(Number(le)>>>0,Number(me)>>>0)):[]})},849266:(o,p)=>{i.kb("GlobalMaxPool",o,{format:p?"NHWC":"NCHW"})},849353:(o,p,h,y,v,I,B,D,W,K,se,le,me,Ie)=>{i.kb("MaxPool",o,{format:Ie?"NHWC":"NCHW",auto_pad:p,ceil_mode:h,count_include_pad:y,storage_order:v,dilations:I?Array.from(M().subarray(Number(I)>>>0,Number(B)>>>0)):[],kernel_shape:D?Array.from(M().subarray(Number(D)>>>0,Number(W)>>>0)):[],pads:K?Array.from(M().subarray(Number(K)>>>0,Number(se)>>>0)):[],strides:le?Array.from(M().subarray(Number(le)>>>0,Number(me)>>>0)):[]})},849828:(o,p)=>{i.kb("GlobalMaxPool",o,{format:p?"NHWC":"NCHW"})},849915:(o,p,h,y,v,I,B,D,W,K,se,le,me,Ie)=>{i.kb("MaxPool",o,{format:Ie?"NHWC":"NCHW",auto_pad:p,ceil_mode:h,count_include_pad:y,storage_order:v,dilations:I?Array.from(M().subarray(Number(I)>>>0,Number(B)>>>0)):[],kernel_shape:D?Array.from(M().subarray(Number(D)>>>0,Number(W)>>>0)):[],pads:K?Array.from(M().subarray(Number(K)>>>0,Number(se)>>>0)):[],strides:le?Array.from(M().subarray(Number(le)>>>0,Number(me)>>>0)):[]})},850390:(o,p,h,y,v)=>{i.kb("Gemm",o,{alpha:p,beta:h,transA:y,transB:v})},850494:o=>{i.kb("MatMul",o,void 0)},850548:(o,p,h,y)=>{i.kb("ArgMax",o,{keepDims:!!p,selectLastIndex:!!h,axis:y})},850656:(o,p,h,y)=>{i.kb("ArgMin",o,{keepDims:!!p,selectLastIndex:!!h,axis:y})},850764:(o,p)=>{i.kb("Softmax",o,{axis:p})},850827:(o,p)=>{i.kb("Concat",o,{axis:p})},850887:(o,p,h,y,v)=>{i.kb("Split",o,{axis:p,numOutputs:h,splitSizes:y?Array.from(M().subarray(Number(y)>>>0,Number(v)>>>0)):[]})},851043:o=>{i.kb("Expand",o,void 0)},851097:(o,p)=>{i.kb("Gather",o,{axis:Number(p)})},851168:(o,p)=>{i.kb("GatherElements",o,{axis:Number(p)})},851247:(o,p)=>{i.kb("GatherND",o,{batch_dims:Number(p)})},851326:(o,p,h,y,v,I,B,D,W,K,se)=>{i.kb("Resize",o,{antialias:p,axes:h?Array.from(M().subarray(Number(h)>>>0,Number(y)>>>0)):[],coordinateTransformMode:xe(v),cubicCoeffA:I,excludeOutside:B,extrapolationValue:D,keepAspectRatioPolicy:xe(W),mode:xe(K),nearestMode:xe(se)})},851688:(o,p,h,y,v,I,B)=>{i.kb("Slice",o,{starts:p?Array.from(M().subarray(Number(p)>>>0,Number(h)>>>0)):[],ends:y?Array.from(M().subarray(Number(y)>>>0,Number(v)>>>0)):[],axes:I?Array.from(M().subarray(Number(I)>>>0,Number(B)>>>0)):[]})},851952:o=>{i.kb("Tile",o,void 0)},852004:(o,p,h)=>{i.kb("InstanceNormalization",o,{epsilon:p,format:h?"NHWC":"NCHW"})},852118:(o,p,h)=>{i.kb("InstanceNormalization",o,{epsilon:p,format:h?"NHWC":"NCHW"})},852232:o=>{i.kb("Range",o,void 0)},852285:(o,p)=>{i.kb("Einsum",o,{equation:xe(p)})},852366:(o,p,h,y,v)=>{i.kb("Pad",o,{mode:p,value:h,pads:y?Array.from(M().subarray(Number(y)>>>0,Number(v)>>>0)):[]})},852509:(o,p,h,y,v,I)=>{i.kb("BatchNormalization",o,{epsilon:p,momentum:h,spatial:!!v,trainingMode:!!y,format:I?"NHWC":"NCHW"})},852678:(o,p,h,y,v,I)=>{i.kb("BatchNormalization",o,{epsilon:p,momentum:h,spatial:!!v,trainingMode:!!y,format:I?"NHWC":"NCHW"})},852847:(o,p,h)=>{i.kb("CumSum",o,{exclusive:Number(p),reverse:Number(h)})},852944:(o,p,h)=>{i.kb("DequantizeLinear",o,{axis:p,blockSize:h})},853034:(o,p,h,y,v)=>{i.kb("GridSample",o,{align_corners:p,mode:xe(h),padding_mode:xe(y),format:v?"NHWC":"NCHW"})},853204:(o,p,h,y,v)=>{i.kb("GridSample",o,{align_corners:p,mode:xe(h),padding_mode:xe(y),format:v?"NHWC":"NCHW"})},853374:(o,p)=>{i.kb("ScatterND",o,{reduction:xe(p)})},853459:(o,p,h,y,v,I,B,D,W)=>{i.kb("Attention",o,{numHeads:p,isUnidirectional:h,maskFilterValue:y,scale:v,doRotary:I,qkvHiddenSizes:B?Array.from(M().subarray(Number(D)>>>0,Number(D)+B>>>0)):[],pastPresentShareBuffer:!!W})},853731:o=>{i.kb("BiasAdd",o,void 0)},853786:o=>{i.kb("BiasSplitGelu",o,void 0)},853847:o=>{i.kb("FastGelu",o,void 0)},853903:(o,p,h,y,v,I,B,D,W,K,se,le,me,Ie,Rt,Jh)=>{i.kb("Conv",o,{format:le?"NHWC":"NCHW",auto_pad:p,dilations:h?Array.from(M().subarray(Number(h)>>>0,Number(y)>>>0)):[],group:v,kernel_shape:I?Array.from(M().subarray(Number(I)>>>0,Number(B)>>>0)):[],pads:D?Array.from(M().subarray(Number(D)>>>0,Number(W)>>>0)):[],strides:K?Array.from(M().subarray(Number(K)>>>0,Number(se)>>>0)):[],w_is_const:()=>!!U()[Number(me)>>>0],activation:xe(Ie),activation_params:Rt?Array.from(At().subarray(Number(Rt)>>>0,Number(Jh)>>>0)):[]})},854487:o=>{i.kb("Gelu",o,void 0)},854539:(o,p,h,y,v,I,B,D,W)=>{i.kb("GroupQueryAttention",o,{numHeads:p,kvNumHeads:h,scale:y,softcap:v,doRotary:I,rotaryInterleaved:B,smoothSoftmax:D,localWindowSize:W})},854756:(o,p,h,y)=>{i.kb("LayerNormalization",o,{axis:p,epsilon:h,simplified:!!y})},854867:(o,p,h,y)=>{i.kb("LayerNormalization",o,{axis:p,epsilon:h,simplified:!!y})},854978:(o,p,h,y,v,I)=>{i.kb("MatMulNBits",o,{k:p,n:h,accuracyLevel:y,bits:v,blockSize:I})},855105:(o,p,h,y,v,I)=>{i.kb("MultiHeadAttention",o,{numHeads:p,isUnidirectional:h,maskFilterValue:y,scale:v,doRotary:I})},855264:(o,p)=>{i.kb("QuickGelu",o,{alpha:p})},855328:(o,p,h,y,v)=>{i.kb("RotaryEmbedding",o,{interleaved:!!p,numHeads:h,rotaryEmbeddingDim:y,scale:v})},855467:(o,p,h)=>{i.kb("SkipLayerNormalization",o,{epsilon:p,simplified:!!h})},855569:(o,p,h)=>{i.kb("SkipLayerNormalization",o,{epsilon:p,simplified:!!h})},855671:(o,p,h,y)=>{i.kb("GatherBlockQuantized",o,{gatherAxis:p,quantizeAxis:h,blockSize:y})},855792:o=>{i.$b(o)},855826:(o,p)=>i.bc(Number(o),Number(p),i.Gb.ec,i.Gb.errors)};function Rc(o,p,h){return Ma(async()=>{await i.Yb(Number(o),Number(p),Number(h))})}function Nc(){return typeof wasmOffsetConverter<"u"}class Gr{constructor(p){ms(this,"name","ExitStatus");this.message=`Program terminated with exit(${p})`,this.status=p}}var ia=o=>{o.terminate(),o.onmessage=()=>{}},Hr=[],na=o=>{ut.length==0&&(da(),la(ut[0]));var p=ut.pop();if(!p)return 6;Wt.push(p),bt[o.Bb]=p,p.Bb=o.Bb;var h={Cb:"run",hc:o.fc,Ib:o.Ib,Bb:o.Bb};return p.postMessage(h,o.Nb),0},ot=0,be=(o,p,...h)=>{for(var y=2*h.length,v=li(),I=ui(8*y),B=I>>>3,D=0;D<h.length;D++){var W=h[D];typeof W=="bigint"?(L[B+2*D]=1n,L[B+2*D+1]=W):(L[B+2*D]=0n,ze()[B+2*D+1>>>0]=W)}return o=ns(o,0,y,I,p),yr(v),o};function Fr(o){if(l)return be(0,1,o);if(C=o,!(0<ot)){for(var p of Wt)ia(p);for(p of ut)ia(p);ut=[],Wt=[],bt={},ye=!0}x(0,new Gr(o))}function aa(o){if(l)return be(1,0,o);jr(o)}var jr=o=>{if(C=o,l)throw aa(o),"unwind";Fr(o)},ut=[],Wt=[],sa=[],bt={},oa=o=>{var p=o.Bb;delete bt[p],ut.push(o),Wt.splice(Wt.indexOf(o),1),o.Bb=0,as(p)};function ua(){sa.forEach(o=>o())}var la=o=>new Promise(p=>{o.onmessage=v=>{var I=(v=v.data).Cb;if(v.Hb&&v.Hb!=gr()){var B=bt[v.Hb];B?B.postMessage(v,v.Nb):T(`Internal error! Worker sent a message "${I}" to target pthread ${v.Hb}, but that thread no longer exists!`)}else I==="checkMailbox"?ur():I==="spawnThread"?na(v):I==="cleanupThread"?oa(bt[v.ic]):I==="loaded"?(o.loaded=!0,p(o)):I==="alert"?alert(`Thread ${v.jc}: ${v.text}`):v.target==="setimmediate"?o.postMessage(v):I==="callHandler"?i[v.Rb](...v.args):I&&T(`worker sent an unknown command ${I}`)},o.onerror=v=>{throw T(`worker sent an error! ${v.filename}:${v.lineno}: ${v.message}`),v};var h,y=[];for(h of[])i.propertyIsEnumerable(h)&&y.push(h);o.postMessage({Cb:"load",Sb:y,lc:E,mc:z})});function da(){var o=new Worker((()=>{let p=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new p("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});ut.push(o)}var Mc=o=>{ce();var p=fe()[o+52>>>2>>>0];o=fe()[o+56>>>2>>>0],us(p,p-o),yr(p)},Dc=(o,p)=>{ot=0,o=ls(o,p),0<ot?C=o:oi(o)};class Pc{constructor(p){this.Jb=p-24}}function Uc(o,p,h){var y=new Pc(o>>>=0);throw p>>>=0,h>>>=0,fe()[y.Jb+16>>>2>>>0]=0,fe()[y.Jb+4>>>2>>>0]=p,fe()[y.Jb+8>>>2>>>0]=h,o}function pa(o,p,h,y){return l?be(2,1,o,p,h,y):fa(o,p,h,y)}function fa(o,p,h,y){if(o>>>=0,h>>>=0,y>>>=0,f===void 0)return 6;var v=[];return l&&v.length===0?pa(o,p>>>=0,h,y):(o={fc:h,Bb:o,Ib:y,Nb:v},l?(o.Cb="spawnThread",postMessage(o,v),0):na(o))}var ca=typeof TextDecoder<"u"?new TextDecoder:void 0,ha=(o,p=0,h=NaN)=>{var y=(p>>>=0)+h;for(h=p;o[h]&&!(h>=y);)++h;if(16<h-p&&o.buffer&&ca)return ca.decode(o.buffer instanceof ArrayBuffer?o.subarray(p,h):o.slice(p,h));for(y="";p<h;){var v=o[p++];if(128&v){var I=63&o[p++];if((224&v)==192)y+=String.fromCharCode((31&v)<<6|I);else{var B=63&o[p++];65536>(v=(240&v)==224?(15&v)<<12|I<<6|B:(7&v)<<18|I<<12|B<<6|63&o[p++])?y+=String.fromCharCode(v):(v-=65536,y+=String.fromCharCode(55296|v>>10,56320|1023&v))}}else y+=String.fromCharCode(v)}return y},xe=(o,p)=>(o>>>=0)?ha(V(),o,p):"";function ma(o,p,h){return l?be(3,1,o,p,h):0}function ga(o,p){if(l)return be(4,1,o,p)}var _a=o=>{for(var p=0,h=0;h<o.length;++h){var y=o.charCodeAt(h);127>=y?p++:2047>=y?p+=2:55296<=y&&57343>=y?(p+=4,++h):p+=3}return p},Bt=(o,p,h)=>{var y=V();if(p>>>=0,0<h){var v=p;h=p+h-1;for(var I=0;I<o.length;++I){var B=o.charCodeAt(I);if(55296<=B&&57343>=B&&(B=65536+((1023&B)<<10)|1023&o.charCodeAt(++I)),127>=B){if(p>=h)break;y[p++>>>0]=B}else{if(2047>=B){if(p+1>=h)break;y[p++>>>0]=192|B>>6}else{if(65535>=B){if(p+2>=h)break;y[p++>>>0]=224|B>>12}else{if(p+3>=h)break;y[p++>>>0]=240|B>>18,y[p++>>>0]=128|B>>12&63}y[p++>>>0]=128|B>>6&63}y[p++>>>0]=128|63&B}}y[p>>>0]=0,o=p-v}else o=0;return o};function ya(o,p){if(l)return be(5,1,o,p)}function ba(o,p,h){if(l)return be(6,1,o,p,h)}function wa(o,p,h){return l?be(7,1,o,p,h):0}function $a(o,p){if(l)return be(8,1,o,p)}function va(o,p,h){if(l)return be(9,1,o,p,h)}function xa(o,p,h,y){if(l)return be(10,1,o,p,h,y)}function ka(o,p,h,y){if(l)return be(11,1,o,p,h,y)}function Sa(o,p,h,y){if(l)return be(12,1,o,p,h,y)}function Ta(o){if(l)return be(13,1,o)}function Ia(o,p){if(l)return be(14,1,o,p)}function Ea(o,p,h){if(l)return be(15,1,o,p,h)}var za,lt,qc=()=>st(""),Ke=o=>{for(var p="";V()[o>>>0];)p+=za[V()[o++>>>0]];return p},Kr={},Zr={};function tt(o,p,h={}){return function(y,v,I={}){var B=v.name;if(!y)throw new lt(`type "${B}" must have a positive integer typeid pointer`);if(Zr.hasOwnProperty(y)){if(I.Tb)return;throw new lt(`Cannot register type '${B}' twice`)}Zr[y]=v,Kr.hasOwnProperty(y)&&(v=Kr[y],delete Kr[y],v.forEach(D=>D()))}(o,p,h)}var Ca=(o,p,h)=>{switch(p){case 1:return h?y=>U()[y>>>0]:y=>V()[y>>>0];case 2:return h?y=>te()[y>>>1>>>0]:y=>Te()[y>>>1>>>0];case 4:return h?y=>M()[y>>>2>>>0]:y=>fe()[y>>>2>>>0];case 8:return h?y=>L[y>>>3]:y=>ie[y>>>3];default:throw new TypeError(`invalid integer width (${p}): ${o}`)}};function Wc(o,p,h){h>>>=0,tt(o>>>=0,{name:p=Ke(p>>>0),fromWireType:y=>y,toWireType:function(y,v){if(typeof v!="bigint"&&typeof v!="number")throw v=v===null?"null":(y=typeof v)=="object"||y==="array"||y==="function"?v.toString():""+v,new TypeError(`Cannot convert "${v}" to ${this.name}`);return typeof v=="number"&&(v=BigInt(v)),v},Db:dt,readValueFromPointer:Ca(p,h,p.indexOf("u")==-1),Eb:null})}var dt=8;function Vc(o,p,h,y){tt(o>>>=0,{name:p=Ke(p>>>0),fromWireType:function(v){return!!v},toWireType:function(v,I){return I?h:y},Db:dt,readValueFromPointer:function(v){return this.fromWireType(V()[v>>>0])},Eb:null})}var Qr=[],rt=[];function Xr(o){9<(o>>>=0)&&--rt[o+1]==0&&(rt[o]=void 0,Qr.push(o))}var Ce=o=>{if(!o)throw new lt("Cannot use deleted val. handle = "+o);return rt[o]},De=o=>{switch(o){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let p=Qr.pop()||rt.length;return rt[p]=o,rt[p+1]=1,p}};function Yr(o){return this.fromWireType(fe()[o>>>2>>>0])}var Lc={name:"emscripten::val",fromWireType:o=>{var p=Ce(o);return Xr(o),p},toWireType:(o,p)=>De(p),Db:dt,readValueFromPointer:Yr,Eb:null};function Gc(o){return tt(o>>>0,Lc)}var Hc=(o,p)=>{switch(p){case 4:return function(h){return this.fromWireType(At()[h>>>2>>>0])};case 8:return function(h){return this.fromWireType(ze()[h>>>3>>>0])};default:throw new TypeError(`invalid float width (${p}): ${o}`)}};function Fc(o,p,h){h>>>=0,tt(o>>>=0,{name:p=Ke(p>>>0),fromWireType:y=>y,toWireType:(y,v)=>v,Db:dt,readValueFromPointer:Hc(p,h),Eb:null})}function jc(o,p,h,y,v){if(o>>>=0,h>>>=0,p=Ke(p>>>0),v===-1&&(v=4294967295),v=D=>D,y===0){var I=32-8*h;v=D=>D<<I>>>I}var B=p.includes("unsigned")?function(D,W){return W>>>0}:function(D,W){return W};tt(o,{name:p,fromWireType:v,toWireType:B,Db:dt,readValueFromPointer:Ca(p,h,y!==0),Eb:null})}function Kc(o,p,h){function y(I){var B=fe()[I>>>2>>>0];return I=fe()[I+4>>>2>>>0],new v(U().buffer,I,B)}var v=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][p];tt(o>>>=0,{name:h=Ke(h>>>0),fromWireType:y,Db:dt,readValueFromPointer:y},{Tb:!0})}function Zc(o,p){tt(o>>>=0,{name:p=Ke(p>>>0),fromWireType:function(h){for(var y,v=fe()[h>>>2>>>0],I=h+4,B=I,D=0;D<=v;++D){var W=I+D;D!=v&&V()[W>>>0]!=0||(B=xe(B,W-B),y===void 0?y=B:(y+="\0",y+=B),B=W+1)}return Qe(h),y},toWireType:function(h,y){y instanceof ArrayBuffer&&(y=new Uint8Array(y));var v=typeof y=="string";if(!(v||y instanceof Uint8Array||y instanceof Uint8ClampedArray||y instanceof Int8Array))throw new lt("Cannot pass non-string to std::string");var I=v?_a(y):y.length,B=_r(4+I+1),D=B+4;if(fe()[B>>>2>>>0]=I,v)Bt(y,D,I+1);else if(v)for(v=0;v<I;++v){var W=y.charCodeAt(v);if(255<W)throw Qe(B),new lt("String has UTF-16 code units that do not fit in 8 bits");V()[D+v>>>0]=W}else for(v=0;v<I;++v)V()[D+v>>>0]=y[v];return h!==null&&h.push(Qe,B),B},Db:dt,readValueFromPointer:Yr,Eb(h){Qe(h)}})}var Oa=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Qc=(o,p)=>{for(var h=o>>1,y=h+p/2;!(h>=y)&&Te()[h>>>0];)++h;if(32<(h<<=1)-o&&Oa)return Oa.decode(V().slice(o,h));for(h="",y=0;!(y>=p/2);++y){var v=te()[o+2*y>>>1>>>0];if(v==0)break;h+=String.fromCharCode(v)}return h},Xc=(o,p,h)=>{if(h??(h=2147483647),2>h)return 0;var y=p;h=(h-=2)<2*o.length?h/2:o.length;for(var v=0;v<h;++v){var I=o.charCodeAt(v);te()[p>>>1>>>0]=I,p+=2}return te()[p>>>1>>>0]=0,p-y},Yc=o=>2*o.length,Jc=(o,p)=>{for(var h=0,y="";!(h>=p/4);){var v=M()[o+4*h>>>2>>>0];if(v==0)break;++h,65536<=v?(v-=65536,y+=String.fromCharCode(55296|v>>10,56320|1023&v)):y+=String.fromCharCode(v)}return y},eh=(o,p,h)=>{if(p>>>=0,h??(h=2147483647),4>h)return 0;var y=p;h=y+h-4;for(var v=0;v<o.length;++v){var I=o.charCodeAt(v);if(55296<=I&&57343>=I&&(I=65536+((1023&I)<<10)|1023&o.charCodeAt(++v)),M()[p>>>2>>>0]=I,(p+=4)+4>h)break}return M()[p>>>2>>>0]=0,p-y},th=o=>{for(var p=0,h=0;h<o.length;++h){var y=o.charCodeAt(h);55296<=y&&57343>=y&&++h,p+=4}return p};function rh(o,p,h){if(o>>>=0,p>>>=0,h=Ke(h>>>=0),p===2)var y=Qc,v=Xc,I=Yc,B=D=>Te()[D>>>1>>>0];else p===4&&(y=Jc,v=eh,I=th,B=D=>fe()[D>>>2>>>0]);tt(o,{name:h,fromWireType:D=>{for(var W,K=fe()[D>>>2>>>0],se=D+4,le=0;le<=K;++le){var me=D+4+le*p;le!=K&&B(me)!=0||(se=y(se,me-se),W===void 0?W=se:(W+="\0",W+=se),se=me+p)}return Qe(D),W},toWireType:(D,W)=>{if(typeof W!="string")throw new lt(`Cannot pass non-string to C++ string type ${h}`);var K=I(W),se=_r(4+K+p);return fe()[se>>>2>>>0]=K/p,v(W,se+4,K+p),D!==null&&D.push(Qe,se),se},Db:dt,readValueFromPointer:Yr,Eb(D){Qe(D)}})}function ih(o,p){tt(o>>>=0,{Ub:!0,name:p=Ke(p>>>0),Db:0,fromWireType:()=>{},toWireType:()=>{}})}function nh(o){si(o>>>0,!d,1,!u,131072,!1),ua()}var Jr=o=>{if(!ye)try{if(o(),!(0<ot))try{l?oi(C):jr(C)}catch(p){p instanceof Gr||p=="unwind"||x(0,p)}}catch(p){p instanceof Gr||p=="unwind"||x(0,p)}};function ei(o){o>>>=0,typeof Atomics.kc=="function"&&(Atomics.kc(M(),o>>>2,o).value.then(ur),o+=128,Atomics.store(M(),o>>>2,1))}var ur=()=>{var o=gr();o&&(ei(o),Jr(os))};function ah(o,p){(o>>>=0)==p>>>0?setTimeout(ur):l?postMessage({Hb:o,Cb:"checkMailbox"}):(o=bt[o])&&o.postMessage({Cb:"checkMailbox"})}var ti=[];function sh(o,p,h,y,v){for(p>>>=0,y/=2,ti.length=y,h=v>>>0>>>3,v=0;v<y;v++)ti[v]=L[h+2*v]?L[h+2*v+1]:ze()[h+2*v+1>>>0];return(p?Lr[p]:Yh[o])(...ti)}var oh=()=>{ot=0};function uh(o){o>>>=0,l?postMessage({Cb:"cleanupThread",ic:o}):oa(bt[o])}function lh(o){}var lr=(o,p)=>{var h=Zr[o];if(h===void 0)throw o=ts(o),h=Ke(o),Qe(o),new lt(`${p} has unknown type ${h}`);return h},Aa=(o,p,h)=>{var y=[];return o=o.toWireType(y,h),y.length&&(fe()[p>>>2>>>0]=De(y)),o};function dh(o,p,h){return p>>>=0,h>>>=0,o=Ce(o>>>0),p=lr(p,"emval::as"),Aa(p,h,o)}function ph(o,p){return p>>>=0,o=Ce(o>>>0),(p=lr(p,"emval::as")).toWireType(null,o)}var dr=o=>{try{o()}catch(p){st(p)}},pt=0,Ze=null,Ba=0,pr=[],Ra={},Na={},fh=0,ri=null,ch=[];function Ma(o){return function(p){if(!ye){if(pt===0){var h=!1,y=!1;p((v=0)=>{if(!ye&&(Ba=v,h=!0,y)){pt=2,dr(()=>fs(Ze)),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.resume(),v=!1;try{var I=function(){var W=M()[Ze+8>>>2>>>0];return W=J[Na[W]],--ot,W()}()}catch(W){I=W,v=!0}var B=!1;if(!Ze){var D=ri;D&&(ri=null,(v?D.reject:D.resolve)(I),B=!0)}if(v&&!B)throw I}}),y=!0,h||(pt=1,Ze=function(){var v=_r(65548),I=v+12;fe()[v>>>2>>>0]=I,fe()[v+4>>>2>>>0]=I+65536,I=pr[0];var B=Ra[I];return B===void 0&&(B=fh++,Ra[I]=B,Na[B]=I),I=B,M()[v+8>>>2>>>0]=I,v}(),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.pause(),dr(()=>ds(Ze)))}else pt===2?(pt=0,dr(cs),Qe(Ze),Ze=null,ch.forEach(Jr)):st(`invalid state: ${pt}`);return Ba}}(p=>{o().then(p)})}function hh(o){return o>>>=0,Ma(async()=>{var p=await Ce(o);return De(p)})}var fr=[];function mh(o,p,h,y){return h>>>=0,y>>>=0,(o=fr[o>>>0])(null,p=Ce(p>>>0),h,y)}var gh={},cr=o=>{var p=gh[o];return p===void 0?Ke(o):p};function _h(o,p,h,y,v){return h>>>=0,y>>>=0,v>>>=0,(o=fr[o>>>0])(p=Ce(p>>>0),p[h=cr(h)],y,v)}function yh(o,p){return p>>>=0,(o=Ce(o>>>0))==Ce(p)}var Da=()=>typeof globalThis=="object"?globalThis:Function("return this")();function bh(o){return(o>>>=0)==0?De(Da()):(o=cr(o),De(Da()[o]))}var wh=o=>{var p=fr.length;return fr.push(o),p},$h=(o,p)=>{for(var h=Array(o),y=0;y<o;++y)h[y]=lr(fe()[p+4*y>>>2>>>0],"parameter "+y);return h},Pa=(o,p)=>Object.defineProperty(p,"name",{value:o});function vh(o,p,h){var y=(p=$h(o,p>>>0)).shift();o--;var v=`return function (obj, func, destructorsRef, args) {
`,I=0,B=[];h===0&&B.push("obj");for(var D=["retType"],W=[y],K=0;K<o;++K)B.push("arg"+K),D.push("argType"+K),W.push(p[K]),v+=`  var arg${K} = argType${K}.readValueFromPointer(args${I?"+"+I:""});
`,I+=p[K].Db;return v+=`  var rv = ${h===1?"new func":"func.call"}(${B.join(", ")});
`,y.Ub||(D.push("emval_returnValue"),W.push(Aa),v+=`  return emval_returnValue(retType, destructorsRef, rv);
`),D.push(v+`};
`),o=function(se){var le=Function;if(!(le instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof le} which is not a function`);var me=Pa(le.name||"unknownFunctionName",function(){});return me.prototype=le.prototype,me=new me,(se=le.apply(me,se))instanceof Object?se:me}(D)(...W),h=`methodCaller<(${p.map(se=>se.name).join(", ")}) => ${y.name}>`,wh(Pa(h,o))}function xh(o){return o=cr(o>>>0),De(i[o])}function kh(o,p){return p>>>=0,o=Ce(o>>>0),p=Ce(p),De(o[p])}function Sh(o){9<(o>>>=0)&&(rt[o+1]+=1)}function Th(){return De([])}function Ih(o){o=Ce(o>>>0);for(var p=Array(o.length),h=0;h<o.length;h++)p[h]=o[h];return De(p)}function Eh(o){return De(cr(o>>>0))}function zh(){return De({})}function Ch(o){for(var p=Ce(o>>>=0);p.length;){var h=p.pop();p.pop()(h)}Xr(o)}function Oh(o,p,h){p>>>=0,h>>>=0,o=Ce(o>>>0),p=Ce(p),h=Ce(h),o[p]=h}function Ah(o,p){return p>>>=0,o=(o=lr(o>>>0,"_emval_take_value")).readValueFromPointer(p),De(o)}function Bh(o,p){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),p>>>=0,o=new Date(1e3*o),M()[p>>>2>>>0]=o.getUTCSeconds(),M()[p+4>>>2>>>0]=o.getUTCMinutes(),M()[p+8>>>2>>>0]=o.getUTCHours(),M()[p+12>>>2>>>0]=o.getUTCDate(),M()[p+16>>>2>>>0]=o.getUTCMonth(),M()[p+20>>>2>>>0]=o.getUTCFullYear()-1900,M()[p+24>>>2>>>0]=o.getUTCDay(),o=(o.getTime()-Date.UTC(o.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,M()[p+28>>>2>>>0]=o}var Ua=o=>o%4==0&&(o%100!=0||o%400==0),qa=[0,31,60,91,121,152,182,213,244,274,305,335],Wa=[0,31,59,90,120,151,181,212,243,273,304,334];function Rh(o,p){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),p>>>=0,o=new Date(1e3*o),M()[p>>>2>>>0]=o.getSeconds(),M()[p+4>>>2>>>0]=o.getMinutes(),M()[p+8>>>2>>>0]=o.getHours(),M()[p+12>>>2>>>0]=o.getDate(),M()[p+16>>>2>>>0]=o.getMonth(),M()[p+20>>>2>>>0]=o.getFullYear()-1900,M()[p+24>>>2>>>0]=o.getDay();var h=(Ua(o.getFullYear())?qa:Wa)[o.getMonth()]+o.getDate()-1|0;M()[p+28>>>2>>>0]=h,M()[p+36>>>2>>>0]=-60*o.getTimezoneOffset(),h=new Date(o.getFullYear(),6,1).getTimezoneOffset();var y=new Date(o.getFullYear(),0,1).getTimezoneOffset();o=0|(h!=y&&o.getTimezoneOffset()==Math.min(y,h)),M()[p+32>>>2>>>0]=o}function Nh(o){o>>>=0;var p=new Date(M()[o+20>>>2>>>0]+1900,M()[o+16>>>2>>>0],M()[o+12>>>2>>>0],M()[o+8>>>2>>>0],M()[o+4>>>2>>>0],M()[o>>>2>>>0],0),h=M()[o+32>>>2>>>0],y=p.getTimezoneOffset(),v=new Date(p.getFullYear(),6,1).getTimezoneOffset(),I=new Date(p.getFullYear(),0,1).getTimezoneOffset(),B=Math.min(I,v);return 0>h?M()[o+32>>>2>>>0]=+(v!=I&&B==y):0<h!=(B==y)&&(v=Math.max(I,v),p.setTime(p.getTime()+6e4*((0<h?B:v)-y))),M()[o+24>>>2>>>0]=p.getDay(),h=(Ua(p.getFullYear())?qa:Wa)[p.getMonth()]+p.getDate()-1|0,M()[o+28>>>2>>>0]=h,M()[o>>>2>>>0]=p.getSeconds(),M()[o+4>>>2>>>0]=p.getMinutes(),M()[o+8>>>2>>>0]=p.getHours(),M()[o+12>>>2>>>0]=p.getDate(),M()[o+16>>>2>>>0]=p.getMonth(),M()[o+20>>>2>>>0]=p.getYear(),o=p.getTime(),BigInt(isNaN(o)?-1:o/1e3)}function Va(o,p,h,y,v,I,B){return l?be(16,1,o,p,h,y,v,I,B):-52}function La(o,p,h,y,v,I){if(l)return be(17,1,o,p,h,y,v,I)}var Vt={},Mh=()=>performance.timeOrigin+performance.now();function Ga(o,p){if(l)return be(18,1,o,p);if(Vt[o]&&(clearTimeout(Vt[o].id),delete Vt[o]),!p)return 0;var h=setTimeout(()=>{delete Vt[o],Jr(()=>ss(o,performance.timeOrigin+performance.now()))},p);return Vt[o]={id:h,rc:p},0}function Dh(o,p,h,y){o>>>=0,p>>>=0,h>>>=0,y>>>=0;var v=new Date().getFullYear(),I=new Date(v,0,1).getTimezoneOffset();v=new Date(v,6,1).getTimezoneOffset();var B=Math.max(I,v);fe()[o>>>2>>>0]=60*B,M()[p>>>2>>>0]=+(I!=v),o=(p=D=>{var W=Math.abs(D);return`UTC${0<=D?"-":"+"}${String(Math.floor(W/60)).padStart(2,"0")}${String(W%60).padStart(2,"0")}`})(I),p=p(v),v<I?(Bt(o,h,17),Bt(p,y,17)):(Bt(o,y,17),Bt(p,h,17))}var Ph=()=>Date.now();function Uh(o,p,h){return 0<=o&&3>=o?(o===0?o=Date.now():o=performance.timeOrigin+performance.now(),L[h>>>0>>>3]=BigInt(Math.round(1e6*o)),0):28}var ii=[],Ha=(o,p)=>{ii.length=0;for(var h;h=V()[o++>>>0];){var y=h!=105;p+=(y&=h!=112)&&p%8?4:0,ii.push(h==112?fe()[p>>>2>>>0]:h==106?L[p>>>3]:h==105?M()[p>>>2>>>0]:ze()[p>>>3>>>0]),p+=y?8:4}return ii};function qh(o,p,h){return o>>>=0,p=Ha(p>>>0,h>>>0),Lr[o](...p)}function Wh(o,p,h){return o>>>=0,p=Ha(p>>>0,h>>>0),Lr[o](...p)}var Vh=()=>{};function Lh(o,p){return T(xe(o>>>0,p>>>0))}var Gh=()=>{throw ot+=1,"unwind"};function Hh(){return 4294901760}var Fh=()=>navigator.hardwareConcurrency;function jh(){return st("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function Kh(o){o>>>=0;var p=V().length;if(o<=p||4294901760<o)return!1;for(var h=1;4>=h;h*=2){var y=p*(1+.2/h);y=Math.min(y,o+100663296);e:{y=(Math.min(4294901760,65536*Math.ceil(Math.max(o,y)/65536))-E.buffer.byteLength+65535)/65536|0;try{E.grow(y),ce();var v=1;break e}catch{}v=void 0}if(v)return!0}return!1}var hr=()=>(st("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Lt={},Fa=o=>{o.forEach(p=>{hr()})};function Zh(){var o=Error().stack.toString().split(`
`);return o[0]=="Error"&&o.shift(),Fa(o),Lt.Mb=hr(),Lt.dc=o,Lt.Mb}function Qh(o,p,h){if(o>>>=0,p>>>=0,Lt.Mb==o)var y=Lt.dc;else(y=Error().stack.toString().split(`
`))[0]=="Error"&&y.shift(),Fa(y);for(var v=3;y[v]&&hr()!=o;)++v;for(o=0;o<h&&y[o+v];++o)M()[p+4*o>>>2>>>0]=hr();return o}var ni,ai={},ja=()=>{if(!ni){var o,p={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(o in ai)ai[o]===void 0?delete p[o]:p[o]=ai[o];var h=[];for(o in p)h.push(`${o}=${p[o]}`);ni=h}return ni};function Ka(o,p){if(l)return be(19,1,o,p);o>>>=0,p>>>=0;var h=0;return ja().forEach((y,v)=>{var I=p+h;for(v=fe()[o+4*v>>>2>>>0]=I,I=0;I<y.length;++I)U()[v++>>>0]=y.charCodeAt(I);U()[v>>>0]=0,h+=y.length+1}),0}function Za(o,p){if(l)return be(20,1,o,p);o>>>=0,p>>>=0;var h=ja();fe()[o>>>2>>>0]=h.length;var y=0;return h.forEach(v=>y+=v.length+1),fe()[p>>>2>>>0]=y,0}function Qa(o){return l?be(21,1,o):52}function Xa(o,p,h,y){return l?be(22,1,o,p,h,y):52}function Ya(o,p,h,y){return l?be(23,1,o,p,h,y):70}var Xh=[null,[],[]];function Ja(o,p,h,y){if(l)return be(24,1,o,p,h,y);p>>>=0,h>>>=0,y>>>=0;for(var v=0,I=0;I<h;I++){var B=fe()[p>>>2>>>0],D=fe()[p+4>>>2>>>0];p+=8;for(var W=0;W<D;W++){var K=V()[B+W>>>0],se=Xh[o];K===0||K===10?((o===1?k:T)(ha(se)),se.length=0):se.push(K)}v+=D}return fe()[y>>>2>>>0]=v,0}l||function(){for(var o=i.numThreads-1;o--;)da();Hr.unshift(()=>{_t++,function(p){l?p():Promise.all(ut.map(la)).then(p)}(()=>ta())})}();for(var es=Array(256),mr=0;256>mr;++mr)es[mr]=String.fromCharCode(mr);za=es,lt=i.BindingError=class extends Error{constructor(o){super(o),this.name="BindingError"}},i.InternalError=class extends Error{constructor(o){super(o),this.name="InternalError"}},rt.push(0,1,void 0,1,null,1,!0,1,!1,1),i.count_emval_handles=()=>rt.length/2-5-Qr.length;var J,Yh=[Fr,aa,pa,ma,ga,ya,ba,wa,$a,va,xa,ka,Sa,Ta,Ia,Ea,Va,La,Ga,Ka,Za,Qa,Xa,Ya,Ja];(async function(){function o(y,v){return J=y.exports,J=function(){var I=J,B={};for(let[D,W]of Object.entries(I))B[D]=typeof W=="function"?(...K)=>{pr.push(D);try{return W(...K)}finally{ye||(pr.pop(),Ze&&pt===1&&pr.length===0&&(pt=0,ot+=1,dr(ps),typeof Fibers<"u"&&Fibers.sc()))}}:W;return B}(),J=function(){var I=J,B=W=>K=>W(K)>>>0,D=W=>()=>W()>>>0;return(I=Object.assign({},I)).Ea=B(I.Ea),I.gb=D(I.gb),I.ib=B(I.ib),I.ub=B(I.ub),I.vb=D(I.vb),I.__cxa_get_exception_ptr=B(I.__cxa_get_exception_ptr),I}(),sa.push(J.jb),z=v,ta(),J}_t++;var p=ra();if(i.instantiateWasm)return new Promise(y=>{i.instantiateWasm(p,(v,I)=>{o(v,I),y(v.exports)})});if(l)return new Promise(y=>{Ue=v=>{var I=new WebAssembly.Instance(v,ra());y(o(I,v))}});Be??(Be=i.locateFile?i.locateFile?i.locateFile("ort-wasm-simd-threaded.jsep.wasm",$):$+"ort-wasm-simd-threaded.jsep.wasm":new URL("/yolo-object-detection-onnxruntime-web/assets/ort-wasm-simd-threaded.jsep-CLPRrI3A.wasm",import.meta.url).href);try{var h=await async function(y){var v=Be;if(!Y&&typeof WebAssembly.instantiateStreaming=="function"&&!N(v))try{var I=fetch(v,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(I,y)}catch(B){T(`wasm streaming compile failed: ${B}`),T("falling back to ArrayBuffer instantiation")}return async function(B,D){try{var W=await async function(K){if(!Y)try{var se=await g(K);return new Uint8Array(se)}catch{}if(K==Be&&Y)K=new Uint8Array(Y);else{if(!_)throw"both async and sync fetching of the wasm failed";K=_(K)}return K}(B);return await WebAssembly.instantiate(W,D)}catch(K){T(`failed to asynchronously prepare wasm: ${K}`),st(K)}}(v,y)}(p);return o(h.instance,h.module)}catch(y){return a(y),Promise.reject(y)}})();var ts=o=>(ts=J.Ea)(o),rs=()=>(rs=J.Fa)();i._OrtInit=(o,p)=>(i._OrtInit=J.Ga)(o,p),i._OrtGetLastError=(o,p)=>(i._OrtGetLastError=J.Ha)(o,p),i._OrtCreateSessionOptions=(o,p,h,y,v,I,B,D,W,K)=>(i._OrtCreateSessionOptions=J.Ia)(o,p,h,y,v,I,B,D,W,K),i._OrtAppendExecutionProvider=(o,p,h,y,v)=>(i._OrtAppendExecutionProvider=J.Ja)(o,p,h,y,v),i._OrtAddFreeDimensionOverride=(o,p,h)=>(i._OrtAddFreeDimensionOverride=J.Ka)(o,p,h),i._OrtAddSessionConfigEntry=(o,p,h)=>(i._OrtAddSessionConfigEntry=J.La)(o,p,h),i._OrtReleaseSessionOptions=o=>(i._OrtReleaseSessionOptions=J.Ma)(o),i._OrtCreateSession=(o,p,h)=>(i._OrtCreateSession=J.Na)(o,p,h),i._OrtReleaseSession=o=>(i._OrtReleaseSession=J.Oa)(o),i._OrtGetInputOutputCount=(o,p,h)=>(i._OrtGetInputOutputCount=J.Pa)(o,p,h),i._OrtGetInputOutputMetadata=(o,p,h,y)=>(i._OrtGetInputOutputMetadata=J.Qa)(o,p,h,y),i._OrtFree=o=>(i._OrtFree=J.Ra)(o),i._OrtCreateTensor=(o,p,h,y,v,I)=>(i._OrtCreateTensor=J.Sa)(o,p,h,y,v,I),i._OrtGetTensorData=(o,p,h,y,v)=>(i._OrtGetTensorData=J.Ta)(o,p,h,y,v),i._OrtReleaseTensor=o=>(i._OrtReleaseTensor=J.Ua)(o),i._OrtCreateRunOptions=(o,p,h,y)=>(i._OrtCreateRunOptions=J.Va)(o,p,h,y),i._OrtAddRunConfigEntry=(o,p,h)=>(i._OrtAddRunConfigEntry=J.Wa)(o,p,h),i._OrtReleaseRunOptions=o=>(i._OrtReleaseRunOptions=J.Xa)(o),i._OrtCreateBinding=o=>(i._OrtCreateBinding=J.Ya)(o),i._OrtBindInput=(o,p,h)=>(i._OrtBindInput=J.Za)(o,p,h),i._OrtBindOutput=(o,p,h,y)=>(i._OrtBindOutput=J._a)(o,p,h,y),i._OrtClearBoundOutputs=o=>(i._OrtClearBoundOutputs=J.$a)(o),i._OrtReleaseBinding=o=>(i._OrtReleaseBinding=J.ab)(o),i._OrtRunWithBinding=(o,p,h,y,v)=>(i._OrtRunWithBinding=J.bb)(o,p,h,y,v),i._OrtRun=(o,p,h,y,v,I,B,D)=>(i._OrtRun=J.cb)(o,p,h,y,v,I,B,D),i._OrtEndProfiling=o=>(i._OrtEndProfiling=J.db)(o),i._JsepOutput=(o,p,h)=>(i._JsepOutput=J.eb)(o,p,h),i._JsepGetNodeName=o=>(i._JsepGetNodeName=J.fb)(o);var gr=()=>(gr=J.gb)(),Qe=i._free=o=>(Qe=i._free=J.hb)(o),_r=i._malloc=o=>(_r=i._malloc=J.ib)(o),si=(o,p,h,y,v,I)=>(si=J.lb)(o,p,h,y,v,I),is=()=>(is=J.mb)(),ns=(o,p,h,y,v)=>(ns=J.nb)(o,p,h,y,v),as=o=>(as=J.ob)(o),oi=o=>(oi=J.pb)(o),ss=(o,p)=>(ss=J.qb)(o,p),os=()=>(os=J.rb)(),us=(o,p)=>(us=J.sb)(o,p),yr=o=>(yr=J.tb)(o),ui=o=>(ui=J.ub)(o),li=()=>(li=J.vb)(),ls=i.dynCall_ii=(o,p)=>(ls=i.dynCall_ii=J.wb)(o,p),ds=o=>(ds=J.xb)(o),ps=()=>(ps=J.yb)(),fs=o=>(fs=J.zb)(o),cs=()=>(cs=J.Ab)();return i.stackSave=()=>li(),i.stackRestore=o=>yr(o),i.stackAlloc=o=>ui(o),i.setValue=function(o,p,h="i8"){switch(h.endsWith("*")&&(h="*"),h){case"i1":case"i8":U()[o>>>0]=p;break;case"i16":te()[o>>>1>>>0]=p;break;case"i32":M()[o>>>2>>>0]=p;break;case"i64":L[o>>>3]=BigInt(p);break;case"float":At()[o>>>2>>>0]=p;break;case"double":ze()[o>>>3>>>0]=p;break;case"*":fe()[o>>>2>>>0]=p;break;default:st(`invalid type for setValue: ${h}`)}},i.getValue=function(o,p="i8"){switch(p.endsWith("*")&&(p="*"),p){case"i1":case"i8":return U()[o>>>0];case"i16":return te()[o>>>1>>>0];case"i32":return M()[o>>>2>>>0];case"i64":return L[o>>>3];case"float":return At()[o>>>2>>>0];case"double":return ze()[o>>>3>>>0];case"*":return fe()[o>>>2>>>0];default:st(`invalid type for getValue: ${p}`)}},i.UTF8ToString=xe,i.stringToUTF8=Bt,i.lengthBytesUTF8=_a,function o(){if(0<_t)yt=o;else if(l)n(i),we();else{for(;0<Hr.length;)Hr.shift()(i);0<_t?yt=o:(i.calledRun=!0,ye||(we(),n(i)))}}(),i.PTR_SIZE=4,s}),yd=gi,_s=(t=(e=globalThis.self)==null?void 0:e.name)==null?void 0:t.startsWith("em-pthread"),_s&&gi()}),_i,pn,ys,Re,bd,wr,bs,ws,yi,$s,bi,wd,wi,$d,Cn=P(()=>{zn(),_i=typeof location>"u"?void 0:location.origin,pn=import.meta.url>"file:"&&import.meta.url<"file;",ys=()=>{{if(pn){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,_i).href}return import.meta.url}},Re=ys(),bd=()=>{if(Re&&!Re.startsWith("blob:"))return Re.substring(0,Re.lastIndexOf("/")+1)},wr=(e,t)=>{try{let r=t??Re;return(r?new URL(e,r):new URL(e)).origin===_i}catch{return!1}},bs=(e,t)=>{let r=t??Re;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},ws=(e,t)=>`${t??"./"}${e}`,yi=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},$s=async e=>(await import(e)).default,bi=(wm(),sr(md)).default,wd=async()=>{if(!Re)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(wr(Re))return[void 0,bi()];let e=await yi(Re);return[e,bi(e)]},wi=($m(),sr(_d)).default,$d=async(e,t,r)=>{if(!e&&!t&&wi&&Re&&wr(Re))return[void 0,wi];{let n="ort-wasm-simd-threaded.jsep.mjs",a=e??bs(n,t),i=r&&a&&!wr(a,t),s=i?await yi(a):a??ws(n,t);return[i?s:void 0,await $s(s)]}}}),$i,$r,Ht,vi,vs,xs,ks,On,ge,Ct=P(()=>{Cn(),$r=!1,Ht=!1,vi=!1,vs=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},xs=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},ks=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},On=async e=>{if($r)return Promise.resolve();if(Ht)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(vi)throw new Error("previous call to 'initializeWebAssembly()' failed.");Ht=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!ks())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!xs())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let n=vs();r>1&&!n&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let a=e.wasmPaths,i=typeof a=="string"?a:void 0,s=a==null?void 0:a.mjs,u=(s==null?void 0:s.href)??s,d=a==null?void 0:a.wasm,l=(d==null?void 0:d.href)??d,f=e.wasmBinary,[c,m]=await $d(u,i,r>1),g=!1,_=[];if(t>0&&_.push(new Promise(b=>{setTimeout(()=>{g=!0,b()},t)})),_.push(new Promise((b,x)=>{let $={numThreads:r};if(f)$.wasmBinary=f;else if(l||i)$.locateFile=w=>l??i+w;else if(u&&u.indexOf("blob:")!==0)$.locateFile=w=>new URL(w,u).href;else if(c){let w=bd();w&&($.locateFile=S=>w+S)}m($).then(w=>{Ht=!1,$r=!0,$i=w,b(),c&&URL.revokeObjectURL(c)},w=>{Ht=!1,vi=!0,x(w)})})),await Promise.race(_),g)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},ge=()=>{if($r&&$i)return $i;throw new Error("WebAssembly is not initialized yet.")}}),He,Nr,he,An=P(()=>{Ct(),He=(e,t)=>{let r=ge(),n=r.lengthBytesUTF8(e)+1,a=r._malloc(n);return r.stringToUTF8(e,a,n),t.push(a),a},Nr=(e,t,r,n)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([a,i])=>{let s=t?t+a:a;if(typeof i=="object")Nr(i,s+".",r,n);else if(typeof i=="string"||typeof i=="number")n(s,i.toString());else if(typeof i=="boolean")n(s,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},he=e=>{let t=ge(),r=t.stackSave();try{let n=t.PTR_SIZE,a=t.stackAlloc(2*n);t._OrtGetLastError(a,a+n);let i=Number(t.getValue(a,n===4?"i32":"i64")),s=t.getValue(a+n,"*"),u=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${i}, ERROR_MESSAGE: ${u}`)}finally{t.stackRestore(r)}}}),vd,vm=P(()=>{Ct(),An(),vd=e=>{let t=ge(),r=0,n=[],a=e||{};try{if((e==null?void 0:e.logSeverityLevel)===void 0)a.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if((e==null?void 0:e.logVerbosityLevel)===void 0)a.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);(e==null?void 0:e.terminate)===void 0&&(a.terminate=!1);let i=0;return(e==null?void 0:e.tag)!==void 0&&(i=He(e.tag,n)),r=t._OrtCreateRunOptions(a.logSeverityLevel,a.logVerbosityLevel,!!a.terminate,i),r===0&&he("Can't create run options."),(e==null?void 0:e.extra)!==void 0&&Nr(e.extra,"",new WeakSet,(s,u)=>{let d=He(s,n),l=He(u,n);t._OrtAddRunConfigEntry(r,d,l)!==0&&he(`Can't set a run config entry: ${s} - ${u}.`)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseRunOptions(r),n.forEach(s=>t._free(s)),i}}}),Ss,Ts,Is,Ft,Es,xd,xm=P(()=>{Ct(),An(),Ss=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Ts=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Is=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},Ft=(e,t,r,n)=>{let a=He(t,n),i=He(r,n);ge()._OrtAddSessionConfigEntry(e,a,i)!==0&&he(`Can't set a session config entry: ${t} - ${r}.`)},Es=async(e,t,r)=>{for(let n of t){let a=typeof n=="string"?n:n.name,i=[];switch(a){case"webnn":if(a="WEBNN",typeof n!="string"){let f=n==null?void 0:n.deviceType;f&&Ft(e,"deviceType",f,r)}break;case"webgpu":if(a="JS",typeof n!="string"){let f=n;if(f!=null&&f.preferredLayout){if(f.preferredLayout!=="NCHW"&&f.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${f.preferredLayout}`);Ft(e,"preferredLayout",f.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${a}`)}let s=He(a,r),u=i.length,d=0,l=0;if(u>0){d=ge()._malloc(u*ge().PTR_SIZE),r.push(d),l=ge()._malloc(u*ge().PTR_SIZE),r.push(l);for(let f=0;f<u;f++)ge().setValue(d+f*ge().PTR_SIZE,i[f][0],"*"),ge().setValue(l+f*ge().PTR_SIZE,i[f][1],"*")}await ge()._OrtAppendExecutionProvider(e,s,d,l,u)!==0&&he(`Can't append execution provider: ${a}.`)}},xd=async e=>{let t=ge(),r=0,n=[],a=e||{};Is(a);try{let i=Ss(a.graphOptimizationLevel??"all"),s=Ts(a.executionMode??"sequential"),u=typeof a.logId=="string"?He(a.logId,n):0,d=a.logSeverityLevel??2;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log serverity level is not valid: ${d}`);let l=a.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let f=typeof a.optimizedModelFilePath=="string"?He(a.optimizedModelFilePath,n):0;if(r=t._OrtCreateSessionOptions(i,!!a.enableCpuMemArena,!!a.enableMemPattern,s,!!a.enableProfiling,0,u,d,l,f),r===0&&he("Can't create session options."),a.executionProviders&&await Es(r,a.executionProviders,n),a.enableGraphCapture!==void 0){if(typeof a.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${a.enableGraphCapture}`);Ft(r,"enableGraphCapture",a.enableGraphCapture.toString(),n)}if(a.freeDimensionOverrides)for(let[c,m]of Object.entries(a.freeDimensionOverrides)){if(typeof c!="string")throw new Error(`free dimension override name must be a string: ${c}`);if(typeof m!="number"||!Number.isInteger(m)||m<0)throw new Error(`free dimension override value must be a non-negative integer: ${m}`);let g=He(c,n);t._OrtAddFreeDimensionOverride(r,g,m)!==0&&he(`Can't set a free dimension override: ${c} - ${m}.`)}return a.extra!==void 0&&Nr(a.extra,"",new WeakSet,(c,m)=>{Ft(r,c,m,n)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&he("Can't release session options."),n.forEach(s=>t._free(s)),i}}}),St,nt,Tt,Vr,Mr,Bn,Rn,fn,ee=P(()=>{St=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},nt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Tt=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],n=typeof t=="number"?t:t.reduce((a,i)=>a*i,1);return r>0?Math.ceil(n*r):void 0},Vr=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Mr=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Bn=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Rn=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",fn=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),Nn,kd=P(()=>{zn(),Nn=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let a=t.body.getReader(),i;try{i=new ArrayBuffer(n)}catch(u){if(u instanceof RangeError){let d=Math.ceil(n/65536);i=new WebAssembly.Memory({initial:d,maximum:d}).buffer}else throw u}let s=0;for(;;){let{done:u,value:d}=await a.read();if(u)break;let l=d.byteLength;new Uint8Array(i,s,l).set(d),s+=l}return new Uint8Array(i,0,n)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),zs,Cs,Os,As,Mn,Bs,ue,at=P(()=>{ee(),zs=["V","I","W","E","F"],Cs=(e,t)=>{console.log(`[${zs[e]},${new Date().toISOString()}]${t}`)},Mn=(e,t)=>{Os=e,As=t},Bs=(e,t)=>{let r=Mr(e),n=Mr(Os);r>=n&&Cs(r,typeof t=="function"?t():t)},ue=(...e)=>{As&&Bs(...e)}}),Rs,Pt,O,Dr,Sd,Td,Id,ne=P(()=>{Rs=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Pt=class{static calcShape(e,t,r=!1){let n=e.length,a=t.length;if(n===0)return t;if(a===0)return e;let i=Math.max(e.length,t.length),s=new Array(i);if(r){if(n<2||a<2)return;let u=Rs.calcMatMulShape([e[n-2],e[n-1]],[t[a-2],t[a-1]]);if(u===void 0)return;[s[i-2],s[i-1]]=u}for(let u=r?3:1;u<=i;u++){let d=n-u<0?1:e[n-u],l=a-u<0?1:t[a-u];if(d!==l&&d>1&&l>1)return;let f=Math.max(d,l);if(d&&l)s[i-u]=Math.max(d,l);else{if(f>1)return;s[i-u]=0}}return s}static isValidBroadcast(e,t){let r=e.length,n=t.length;if(r>n)return!1;for(let a=1;a<=r;a++)if(e[r-a]!==1&&e[r-a]!==t[n-a])return!1;return!0}},O=class Ar{static size(t){return Ar.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let n=t.length;if(n===0)return[];let a=new Array(n),i=n-1;for(;i>=0;){if(t[i]%r===0){a[i]=t[i]/r;break}if(r%t[i]!==0)throw new Error("cannot convert shape");a[i]=1,r/=t[i],i--}for(i--;i>=0;i--)a[i]=t[i];return a}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Ar.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Ar.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,n){let a=1;for(let i=r;i<n;i++){if(t[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");a*=Number(t[i])}return a}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let n=new Array(r);n[r-1]=1,n[r-2]=t[r-1];for(let a=r-3;a>=0;--a)n[a]=n[a+1]*t[a+1];return n}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(n=>this.normalizeAxis(n,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(n=>t[n]):t.slice().reverse()}static padShape(t,r){let n=t.length;return t.map((a,i)=>a+r[i]+r[i+n])}static areEqual(t,r){return t.length!==r.length?!1:t.every((n,a)=>n===r[a])}},Dr=class rr{static adjustPoolAttributes(t,r,n,a,i,s){if(!t&&n.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let u=0;u<r.length-2;u++)u>=n.length?n.push(r[u+2]):n[u]=r[u+2];for(let u=0;u<n.length;u++)if(u<a.length){if(a[u]<0)throw new Error("strides should be greater than or equal to 1")}else a.push(1);for(let u=0;u<n.length;u++)if(u<i.length){if(i[u]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let u=0;u<n.length*2;u++)if(u<s.length){if(s[u]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let u=0;u<n.length;u++){if(n[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[u]>=n[u]||s[u+n.length]>=n[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,a,i,s,u){if(u){if(i.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(a.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let d=0;d<t.length-2;d++)rr.adjustPadAndReturnShape(t[d+(s?1:2)],r[d],n[d],a[d],i,d,d+t.length-2,u)}}static computePoolOutputShape(t,r,n,a,i,s,u){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let d=[r[0],r[1]];return rr.computeShapeHelper(t,r,d,n,a,i,s,u),d}static computeConvOutputShape(t,r,n,a,i,s,u){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let d=[t[0],r[0]];return rr.computeShapeHelper(!1,t,d,n,a,i,s,u),d}static computeShapeHelper(t,r,n,a,i,s,u,d){if(t)for(let l=0;l<r.length-2;l++)n.push(1);else for(let l=0;l<r.length-2;l++)n.push(rr.adjustPadAndReturnShape(r[l+2],a[l],i[l],s[l],u,l,l+r.length-2,d))}static adjustPadAndReturnShape(t,r,n,a,i,s,u,d){let l=n*(a-1)+1;if(d&&d!=="NOTSET")switch(d){case"VALID":return i[s]=0,i[u]=0,Math.floor((t-l)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(n!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let f=((t+r-1)/r-1)*r+a-t;return i[s]=Math.floor(d==="SAME_LOWER"?(f+1)/2:f/2),i[u]=f-i[s],Math.floor((t+f-a)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+i[s]+i[u]-l)/r+1)}},Sd=class{static getShapeOfGemmResult(e,t,r,n,a){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let i,s,u;t?(i=e[1],s=e[0]):(i=e[0],s=e[1]);let d=-1;if(n?(u=r[0],d=1):(u=r[1],d=0),r[d]!==s)throw new Error("dimension mismatch");if(i<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(a&&!Pt.isValidBroadcast(a,[i,u]))throw new Error("gemm: invalid bias shape for broadcast");return[i,u,s]}},Td=-34028234663852886e22,Id=34028234663852886e22}),Dn,Ed=P(()=>{ee(),Dn=(e,t)=>new(Vr(t))(e)}),xi,cn,ki,Ns,Si,Ms,Ti,Ii,Ei,Ds,zd,km=P(()=>{ee(),at(),xi=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),cn=(e,t)=>{if(t==="int32")return e;let r=xi.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let n=r/8;if(e.byteLength%n!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${n}.`);let a=e.byteLength/n,i=new(Vr(t))(e.buffer,e.byteOffset,a);switch(t){case"int64":case"uint64":{let s=new Int32Array(a);for(let u=0;u<a;u++){let d=i[u];if(d>2147483647n||d<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");s[u]=Number(d)}return new Uint8Array(s.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&i.some(u=>u>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let s=Int32Array.from(i,Number);return new Uint8Array(s.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},ki=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,n=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let a=BigInt64Array.from(n,BigInt);return new Uint8Array(a.buffer)}case"uint64":{if(n.some(i=>i<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let a=BigUint64Array.from(n,BigInt);return new Uint8Array(a.buffer)}case"int8":{if(n.some(i=>i<-128||i>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let a=Int8Array.from(n,Number);return new Uint8Array(a.buffer)}case"uint8":{if(n.some(a=>a<0||a>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(n,Number)}case"uint32":{if(n.some(i=>i<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let a=Uint32Array.from(n,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},Ns=1,Si=()=>Ns++,Ms=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),Ti=(e,t)=>{let r=xi.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((n,a)=>n*a)*r/8):0},Ii=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:n,dataType:a,shape:i,fallbackDataType:s}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=n,this.dataType=a,this.tensorShape=i,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Ti(this.dataType,this.tensorShape)}destroy(){ue("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),r=ki(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return r.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((n,a)=>n===r[a])}setIsDataConverted(e){this.isDataConverted=e}},Ei=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,n){let a=this.tensorManager.getMLContext(e),i;if(!a.opSupportLimits().input.dataTypes.includes(t)){if(i=Ms.get(t),!i||!a.opSupportLimits().input.dataTypes.includes(i))throw new Error(`WebNN backend does not support data type: ${t}`);ue("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${i}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(a,t,r))return this.wrapper.tensor;if(n){if(this.wrapper.byteLength!==Ti(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let s=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,s,!0,!0,i),n&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=cn(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else ue("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){var t,r;if(this.activeUpload){let n=(t=this.wrapper)!=null&&t.isDataConverted?ki(this.activeUpload,(r=this.wrapper)==null?void 0:r.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(n):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(n);return}else return n.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Ds=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}reserveTensorId(){let e=Si();return this.tensorTrackersById.set(e,new Ei(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,n,a){ue("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${n}, copyOld: ${a}}`);let i=this.tensorTrackersById.get(t);if(!i)throw new Error("Tensor not found.");return i.ensureTensor(e,r,n,a)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){ue("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t==null?void 0:t.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,n){let a=this.getMLContext(e),i=Si(),s=new Ii({sessionId:e,context:a,tensor:t,dataType:r,shape:n});return this.tensorTrackersById.set(i,new Ei(this,s)),this.externalTensors.add(s),i}async getCachedTensor(e,t,r,n,a,i,s){let u=this.getMLContext(e);for(let[l,f]of this.freeTensors.entries())if(f.canReuseTensor(u,t,r)){ue("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}`);let c=this.freeTensors.splice(l,1)[0];return c.sessionId=e,c}ue("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}}`);let d=await u.createTensor({dataType:s??t,shape:r,dimensions:r,usage:n,writable:a,readable:i});return new Ii({sessionId:e,context:u,tensor:d,dataType:t,shape:r,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},zd=(...e)=>new Ds(...e)}),jt,Ps,Cd,Sm=P(()=>{ee(),Ct(),Ed(),km(),at(),jt=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Ps=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),n=Object.keys(t).sort();return r.length===n.length&&r.every((a,i)=>a===n[i]&&e[a]===t[a])},Cd=class{constructor(e){this.tensorManager=zd(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,Mn(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){ue("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){ue("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)ue("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(n=>n.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let n=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:n}),n}}else if(e===void 0){let r=this.mlContextCache.findIndex(n=>n.options===void 0&&n.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let n=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:n}),n}}let t=this.mlContextCache.findIndex(r=>Ps(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let n=this.mlContextCache.findIndex(a=>a.mlContext===t);n!==-1&&this.mlContextCache.splice(n,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){ue("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,n,a){let i=jt.get(r);if(!i)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,i,n,a)}async createTemporaryTensor(e,t,r){ue("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let n=jt.get(t);if(!n)throw new Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,a,n,r,!1);let i=this.temporarySessionTensorIds.get(e);return i?i.push(a):this.temporarySessionTensorIds.set(e,[a]),a}uploadTensor(e,t){if(!ge().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");ue("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return Dn(r,t)}}registerMLTensor(e,t,r,n){let a=jt.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);let i=this.tensorManager.registerTensor(e,t,a,n);return ue("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${a}, dimensions: ${n}} -> {tensorId: ${i}}`),i}registerMLConstant(e,t,r,n,a,i,s=!1){if(!i)throw new Error("External mounted files are not available.");let u=e;e.startsWith("./")&&(u=e.substring(2));let d=i.get(u);if(!d)throw new Error(`File with name ${u} not found in preloaded files.`);if(t+r>d.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let l=d.slice(t,t+r).buffer,f;switch(a.dataType){case"float32":f=new Float32Array(l);break;case"float16":f=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(l):new Uint16Array(l);break;case"int32":f=new Int32Array(l);break;case"uint32":f=new Uint32Array(l);break;case"int64":if(s){let c=cn(new Uint8Array(l),"int64");f=new Int32Array(c.buffer),a.dataType="int32"}else f=new BigInt64Array(l);break;case"uint64":f=new BigUint64Array(l);break;case"int8":f=new Int8Array(l);break;case"int4":case"uint4":case"uint8":f=new Uint8Array(l);break;default:throw new Error(`Unsupported data type: ${a.dataType} in creating WebNN Constant from external data.`)}return ue("verbose",()=>`[WebNN] registerMLConstant {dataType: ${a.dataType}, shape: ${a.shape}}} ${s?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),n.constant(a,f)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let n=this.mlContextBySessionId.get(e),a=jt.get(St(t));return typeof a>"u"?!1:r?!!(n!=null&&n.opSupportLimits().input.dataTypes.includes(a)):!!(n!=null&&n.opSupportLimits().output.dataTypes.includes(a))}flush(){}}}),Pn=P(()=>{}),zi,vr,xr,Us,qs,Ci,hn,Ws,Od,Tm=P(()=>{at(),Pn(),zi=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),vr=[],xr=e=>Math.ceil(Number(e)/16)*16,Us=e=>{for(let t=0;t<vr.length;t++){let r=vr[t];if(e<=r)return r}return Math.ceil(e/16)*16},qs=1,Ci=()=>qs++,hn=async(e,t,r,n)=>{let a=xr(r),i=e.device.createBuffer({size:a,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,i,0,a),e.flush(),await i.mapAsync(GPUMapMode.READ);let u=i.getMappedRange();if(n){let d=n();return d.set(new Uint8Array(u,0,r)),d}else return new Uint8Array(u.slice(0,r))}finally{i.destroy()}},Ws=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of zi)vr.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,n=t.byteOffset,a=t.byteLength,i=xr(a),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==a)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${a}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:i,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),d=u.getMappedRange();new Uint8Array(d).set(new Uint8Array(r,n,a)),u.unmap();let l=this.backend.device.createCommandEncoder();l.copyBufferToBuffer(u,0,s.gpuData.buffer,0,i),this.backend.device.queue.submit([l.finish()]),u.destroy(),ue("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let n=this.storageCache.get(t);if(!n)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==n.originalSize)throw new Error("inconsistent source and destination gpu data size");let a=xr(r.originalSize),i=this.backend.getCommandEncoder();this.backend.endComputePass(),i.copyBufferToBuffer(r.gpuData.buffer,0,n.gpuData.buffer,0,a)}registerExternalBuffer(e,t,r){let n;if(r){if(n=r[0],e===r[1])return ue("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${n}, buffer is the same, skip.`),n;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else n=Ci();return this.storageCache.set(n,{gpuData:{id:n,type:0,buffer:e},originalSize:t}),ue("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${n}, registered.`),n}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),ue("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=Us(e),n,a=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,i=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(a||i){let u=(a?this.freeBuffers:this.freeUniformBuffers).get(r);u?u.length>0?n=u.pop():n=this.backend.device.createBuffer({size:r,usage:t}):n=this.backend.device.createBuffer({size:r,usage:t})}else n=this.backend.device.createBuffer({size:r,usage:t});let s={id:Ci(),type:0,buffer:n};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),ue("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){var t;return(t=this.storageCache.get(e))==null?void 0:t.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return ue("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await hn(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=zi.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(ue("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Od=(...e)=>new Ws(...e)}),Vs,pe,ve=P(()=>{Vs=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},pe=e=>new Vs(e)}),Ut,kr,ke,Ee,Q,$e,mn,Dt,mt,j,Kt,R,H,Ad,Un,Ls,Bd,ae=P(()=>{ee(),ne(),Ut=64,kr=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},ke=(e,t=1)=>{let r=kr(e,t);return typeof r=="string"?r:r[0]},Ee=(e,t=1)=>{let r=kr(e,t);return typeof r=="string"?r:r[1]},Q=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:O.computeStrides(r)})}),t},$e=e=>e%4===0?4:e%2===0?2:1,mn=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Dt=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,mt=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,j=(e,t,r,n)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?n==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:n==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,Kt=(e,t,r,n,a)=>{let i=typeof r=="number",s=i?r:r.length,u=[...new Array(s).keys()],d=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,l=kr(t,a),f=typeof l=="string"?l:l[1],c=typeof l=="string"?l:l[0],m={indices:d,value:f,storage:c,tensor:t},g=N=>typeof N=="string"?N:`${N}u`,_={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},b=i?"uniforms.":"",x=`${b}${e}_shape`,$=`${b}${e}_strides`,w="";for(let N=0;N<s-1;N++)w+=`
    let dim${N} = current / ${j($,N,s)};
    let rest${N} = current % ${j($,N,s)};
    indices[${N}] = dim${N};
    current = rest${N};
    `;w+=`indices[${s-1}] = current;`;let S=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${m.indices} {
    var indices: ${m.indices};
    var current = offset;
    ${w}
    return indices;
  }`,k=N=>(_.offsetToIndices=!0,s<2?N:`o2i_${e}(${N})`),T=[];if(s>=2)for(let N=s-1;N>=0;N--)T.push(`${j($,N,s)} * (indices[${N}])`);let E=s<2?"":`
  fn i2o_${e}(indices: ${m.indices}) -> u32 {
    return ${T.join("+")};
  }`,z=N=>(_.indicesToOffset=!0,s<2?N:`i2o_${e}(${N})`),C=(...N)=>s===0?"0u":`${m.indices}(${N.map(g).join(",")})`,A=(N,U)=>s<2?`${N}`:`${j(N,U,s)}`,q=(N,U,V)=>s<2?`${N}=${V};`:`${j(N,U,s)}=${V};`,X={},G=(N,U)=>{_.broadcastedIndicesToOffset=!0;let V=`${U.name}broadcastedIndicesTo${e}Offset`;if(V in X)return`${V}(${N})`;let te=[];for(let Te=s-1;Te>=0;Te--){let M=U.indicesGet("outputIndices",Te+U.rank-s);te.push(`${A($,Te)} * (${M} % ${A(x,Te)})`)}return X[V]=`fn ${V}(outputIndices: ${U.type.indices}) -> u32 {
             return ${te.length>0?te.join("+"):"0u"};
           }`,`${V}(${N})`},Z=(N,U)=>(()=>{if(m.storage===m.value)return`${e}[${N}]=${U};`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`${e}[${N}]=vec2<u32>(u32(${U}), select(0u, 0xFFFFFFFFu, ${U} < 0));`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`${e}[${N}]=vec2<u32>(u32(${U}), 0u);`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`${e}[${N}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${U}));`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),oe=N=>(()=>{if(m.storage===m.value)return`${e}[${N}]`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`i32(${e}[${N}].x)`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`u32(${e}[${N}].x)`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${N}] & 0xFFu), bool(${e}[${N}] & 0xFF00u), bool(${e}[${N}] & 0xFF0000u), bool(${e}[${N}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),re=s<2?"":`
  fn get_${e}ByIndices(indices: ${m.indices}) -> ${f} {
    return ${oe(`i2o_${e}(indices)`)};
  }`,L=s<2?"":(()=>{let N=u.map(V=>`d${V}: u32`).join(", "),U=u.map(V=>`d${V}`).join(", ");return`
  fn get_${e}(${N}) -> ${f} {
    return get_${e}ByIndices(${C(U)});
  }`})(),ie=(...N)=>{if(N.length!==s)throw new Error(`indices length must be ${s}`);let U=N.map(g).join(",");return s===0?oe("0u"):s===1?oe(U[0]):(_.get=!0,_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}(${U})`)},F=N=>s<2?oe(N):(_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}ByIndices(${N})`),Y=s<2?"":`
  fn set_${e}ByIndices(indices: ${m.indices}, value: ${f}) {
    ${Z(`i2o_${e}(indices)`,"value")}
  }`,ye=s<2?"":(()=>{let N=u.map(V=>`d${V}: u32`).join(", "),U=u.map(V=>`d${V}`).join(", ");return`
  fn set_${e}(${N}, value: ${f}) {
    set_${e}ByIndices(${C(U)}, value);
  }`})();return{impl:()=>{let N=[],U=!1;return _.offsetToIndices&&(N.push(S),U=!0),_.indicesToOffset&&(N.push(E),U=!0),_.broadcastedIndicesToOffset&&(Object.values(X).forEach(V=>N.push(V)),U=!0),_.set&&(N.push(ye),U=!0),_.setByIndices&&(N.push(Y),U=!0),_.get&&(N.push(L),U=!0),_.getByIndices&&(N.push(re),U=!0),!i&&U&&N.unshift(`const ${x} = ${m.indices}(${r.join(",")});`,`const ${$} = ${m.indices}(${O.computeStrides(r).join(",")});`),N.join(`
`)},type:m,offsetToIndices:k,indicesToOffset:z,broadcastedIndicesToOffset:G,indices:C,indicesGet:A,indicesSet:q,set:(...N)=>{if(N.length!==s+1)throw new Error(`indices length must be ${s}`);let U=N[s];if(typeof U!="string")throw new Error("value must be string");let V=N.slice(0,s).map(g).join(",");return s===0?Z("0u",U):s===1?Z(V[0],U):(_.set=!0,_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}(${V}, ${U})`)},setByOffset:Z,setByIndices:(N,U)=>s<2?Z(N,U):(_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}ByIndices(${N}, ${U});`),get:ie,getByOffset:oe,getByIndices:F,usage:n,name:e,strides:$,shape:x,rank:s}},R=(e,t,r,n=1)=>Kt(e,t,r,"input",n),H=(e,t,r,n=1)=>Kt(e,t,r,"output",n),Ad=(e,t,r)=>Kt(e,t,r,"atomicOutput",1),Un=(e,t,r,n=1)=>Kt(e,t,r,"internal",n),Ls=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Ut){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],n=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||n>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${n}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*n>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${n}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let a=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,i=a?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=a?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*n}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${n})
  fn main(${i}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",n=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${n}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:n}of this.uniforms)if(n&&n>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(n/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(n/4)}>`);else{let a=n==null||n===1?r:`vec${n}<${r}>`;e.push(`${t}:${a}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},Bd=(e,t)=>new Ls(e,t)}),Gs,Oi,Hs,Fs,js,Ks,Me,Rd,Nd,gt=P(()=>{ee(),ne(),ve(),ae(),Gs=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Oi=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Hs=(e,t)=>O.sortBasedOnPerm(e,Oi(e.length,t)),Fs=(e,t,r,n)=>{let a=`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let i=0;i<t;++i)a+=`a[${e[i]}]=i[${i}];`;return a+="return a;}"},js=(e,t)=>{let r=[],n=[];for(let a=0;a<e.length;++a)e[a]!==1&&r.push(e[a]),e[t[a]]!==1&&n.push(t[a]);return{newShape:r,newPerm:n}},Ks=(e,t)=>{let r=0;for(let n=0;n<e.length;++n)if(t[e[n]]!==1){if(e[n]<r)return!1;r=e[n]}return!0},Me=(e,t)=>{let r=e.dataType,n=e.dims.length,a=Oi(n,t),i=Hs(e.dims,a),s=e.dims,u=i,d=n<2||Ks(a,e.dims),l;if(d)return l=_=>{let b=R("input",r,s,4),x=H("output",r,u,4);return`
  ${_.registerUniform("output_size","u32").declareVariables(b,x)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=O.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64/4)},programUniforms:[{type:12,data:Math.ceil(_/4)}]}},getShaderSource:l};let{newShape:f,newPerm:c}=js(e.dims,a),m=O.areEqual(c,[2,3,1]),g=O.areEqual(c,[3,1,2]);if(f.length===2||m||g){s=m?[f[0],f[1]*f[2]]:g?[f[0]*f[1],f[2]]:f,u=[s[1],s[0]];let _=16;return l=b=>{let x=R("a",r,s.length),$=H("output",r,u.length);return`
  ${b.registerUniform("output_size","u32").declareVariables(x,$)}
  var<workgroup> tile : array<array<${$.type.value}, ${_+1}>, ${_}>;
  ${b.mainStart([_,_,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${_} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${_}u + local_id.x;
    let input_row = workgroup_id_x * ${_}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${x.getByIndices(`${x.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${_}u + local_id.x;
    let output_row = workgroup_id_y * ${_}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${$.setByIndices(`${$.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let b=O.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/_),y:Math.ceil(u[0]/_)},programUniforms:[{type:12,data:b},...Q(s,u)]}},getShaderSource:l}}return l=_=>{let b=R("a",r,s.length),x=H("output",r,u.length);return`
  ${_.registerUniform("output_size","u32").declareVariables(b,x)}

  ${Fs(a,n,b,x)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${x.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${x.setByOffset("global_idx",b.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let _=O.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...Q(s,u)]}},getShaderSource:l}},Rd=(e,t)=>{Gs(e.inputs,t.perm),e.compute(Me(e.inputs[0],t.perm))},Nd=e=>pe({perm:e.perm})}),Zs,Qs,Xs,Ys,Js,eo,to,ro,io,no,qe,Md,Dd,Pd,Ud,qd,Wd,Vd,Ld,Gd,Hd,Im=P(()=>{ee(),ne(),ae(),qn(),gt(),Zs={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Qs={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Xs={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Ys={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Js=(e,t)=>{let r=[];for(let n=t-e;n<t;++n)r.push(n);return r},eo=(e,t)=>{let r=[],n=e.length;for(let i=0;i<n;i++)t.indexOf(i)===-1&&r.push(e[i]);let a=t.map(i=>e[i]);return[r,a]},to=(e,t)=>{let r=e.length+t.length,n=[],a=0;for(let i=0;i<r;i++)t.indexOf(i)===-1?n.push(e[a++]):n.push(1);return n},ro=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},io=(e,t)=>{let r=[];if(!ro(e,t)){for(let n=0;n<t;++n)e.indexOf(n)===-1&&r.push(n);e.forEach(n=>r.push(n))}return r},no=(e,t,r,n,a,i,s)=>{let u=r[0].dims,d=O.size(i),l=O.size(s),f=R("_A",r[0].dataType,u),c=H("output",a,i),m=64;d===1&&(m=256);let g=`
          var<workgroup> aBestValues : array<f32, ${m}>;
       `,_=b=>`
        ${b.registerUniform("reduceSize","u32").declareVariables(f,c)}
        ${g}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${b.mainStart(m)}

          let outputIndex = global_idx / ${m};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Xs[n]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${m}) {
           let candidate = f32(${f.getByOffset("offset + k")});
           bestValue = ${Zs[n]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${m}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Qs[n]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${c.setByOffset("outputIndex",`${n==="mean"?`${c.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${c.type.storage}(${Ys[n]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${m}`,inputDependencies:["type"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:d},programUniforms:[{type:12,data:l}]})}},qe=(e,t,r,n)=>{let a=e.inputs.length===1?r:gn(e.inputs,r),i=a.axes;i.length===0&&!a.noopWithEmptyAxes&&(i=e.inputs[0].dims.map((g,_)=>_));let s=O.normalizeAxes(i,e.inputs[0].dims.length),u=s,d=e.inputs[0],l=io(u,e.inputs[0].dims.length);l.length>0&&(d=e.compute(Me(e.inputs[0],l),{inputs:[0],outputs:[-1]})[0],u=Js(u.length,d.dims.length));let[f,c]=eo(d.dims,u),m=f;a.keepDims&&(m=to(f,s)),e.compute(no(t,a.cacheKey,[d],n,e.inputs[0].dataType,m,c),{inputs:[d]})},Md=(e,t)=>{qe(e,"ReduceMeanShared",t,"mean")},Dd=(e,t)=>{qe(e,"ReduceL1Shared",t,"l1")},Pd=(e,t)=>{qe(e,"ReduceL2Shared",t,"l2")},Ud=(e,t)=>{qe(e,"ReduceLogSumExpShared",t,"logSumExp")},qd=(e,t)=>{qe(e,"ReduceMaxShared",t,"max")},Wd=(e,t)=>{qe(e,"ReduceMinShared",t,"min")},Vd=(e,t)=>{qe(e,"ReduceProdShared",t,"prod")},Ld=(e,t)=>{qe(e,"ReduceSumShared",t,"sum")},Gd=(e,t)=>{qe(e,"ReduceSumSquareShared",t,"sumSquare")},Hd=(e,t)=>{qe(e,"ReduceLogSumShared",t,"logSum")}}),We,ao,Pr,gn,Ve,so,oo,uo,lo,po,fo,co,ho,mo,go,Le,Fd,jd,Kd,Zd,Qd,Xd,Yd,Jd,ep,tp,qn=P(()=>{ee(),ne(),ve(),ae(),Im(),We=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},ao=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Pr=(e,t,r,n,a,i,s=!1,u=!1)=>{let d=[],l=r[0].dims,f=l.length,c=O.normalizeAxes(a,f),m=!u&&c.length===0;l.forEach((b,x)=>{m||c.indexOf(x)>=0?s&&d.push(1):d.push(b)});let g=d.length,_=O.size(d);return{name:e,shaderCache:t,getShaderSource:b=>{let x=[],$=R("_A",r[0].dataType,f),w=H("output",i,g),S=n($,w,c),k=S[2];for(let T=0,E=0;T<f;T++)m||c.indexOf(T)>=0?(s&&E++,k=`for(var j${T}: u32 = 0; j${T} < ${l[T]}; j${T}++) {
                  ${S[2].includes("last_index")?`let last_index = j${T};`:""}
                  ${$.indicesSet("input_indices",T,`j${T}`)}
                  ${k}
                }`):(x.push(`${$.indicesSet("input_indices",T,w.indicesGet("output_indices",E))};`),E++);return`

        ${b.registerUniform("output_size","u32").declareVariables($,w)}

        ${b.mainStart()}
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${$.type.indices};
          let output_indices = ${w.offsetToIndices("global_idx")};

          ${x.join(`
`)}
          ${S[0]}       // init ops for reduce max/min
          ${S[1]}
          ${k}
          ${S[3]}
          ${S.length===4?w.setByOffset("global_idx","value"):S.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:d,dataType:i}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...Q(l,d)]})}},gn=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),pe({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Ve=(e,t,r,n)=>{let a=e.inputs,i=a.length===1?r:gn(a,r);e.compute(Pr(t,{hint:i.cacheKey,inputDependencies:["rank"]},[a[0]],i.noopWithEmptyAxes&&i.axes.length===0?ao:n,i.axes,a[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},so=(e,t)=>{We(e.inputs),Ve(e,"ReduceLogSum",t,(r,n)=>[`var value = ${n.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},oo=(e,t)=>{We(e.inputs),Ve(e,"ReduceL1",t,(r,n)=>[`var value = ${n.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},uo=(e,t)=>{We(e.inputs),Ve(e,"ReduceL2",t,(r,n)=>[`var t = ${n.type.value}(0); var value = ${n.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},lo=(e,t)=>{We(e.inputs),Ve(e,"ReduceLogSumExp",t,(r,n)=>[`var value = ${n.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},po=(e,t)=>{We(e.inputs),Ve(e,"ReduceMax",t,(r,n,a)=>{let i=[];for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&i.push(r.indicesSet("input_indices",s,0));return[`${i.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},fo=(e,t)=>{We(e.inputs),Ve(e,"ReduceMean",t,(r,n,a)=>{let i=1;for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&(i*=e.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${n.type.value}(sum / ${i});`]})},co=(e,t)=>{We(e.inputs),Ve(e,"ReduceMin",t,(r,n,a)=>{let i=[];for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&i.push(`input_indices[${s}] = 0;`);return[`${i.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},ho=(e,t)=>{We(e.inputs),Ve(e,"ReduceProd",t,(r,n)=>[`var value = ${n.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},mo=(e,t)=>{We(e.inputs),Ve(e,"ReduceSum",t,(r,n)=>[`var value = ${n.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},go=(e,t)=>{We(e.inputs),Ve(e,"ReduceSumSquare",t,(r,n)=>[`var t = ${n.type.value}(0); var value = ${n.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},Le=(e,t,r)=>{if(t.length===0)return r;let n=1,a=1;for(let i=0;i<t.length;i++)t.indexOf(i)===-1?n*=e[i]:a*=e[i];return a<32&&n>1024},Fd=(e,t)=>{Le(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?fo(e,t):Md(e,t)},jd=(e,t)=>{Le(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?oo(e,t):Dd(e,t)},Kd=(e,t)=>{Le(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?uo(e,t):Pd(e,t)},Zd=(e,t)=>{Le(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?lo(e,t):Ud(e,t)},Qd=(e,t)=>{Le(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?po(e,t):qd(e,t)},Xd=(e,t)=>{Le(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?co(e,t):Wd(e,t)},Yd=(e,t)=>{Le(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ho(e,t):Vd(e,t)},Jd=(e,t)=>{Le(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?mo(e,t):Ld(e,t)},ep=(e,t)=>{Le(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?go(e,t):Gd(e,t)},tp=(e,t)=>{Le(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?so(e,t):Hd(e,t)}}),Ai,rp,ip,_n,Em=P(()=>{ee(),ve(),qn(),Ai=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},rp=(e,t)=>{Ai(e.inputs);let r=(n,a,i)=>{let s=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(Pr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},ip=(e,t)=>{Ai(e.inputs);let r=(n,a,i)=>{let s=[];for(let u=0;u<n.rank;u++)(i.indexOf(u)>=0||i.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(Pr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},_n=e=>pe(e)}),_o,Sr,yo,bo,wo,or,$o,np,Wn=P(()=>{ee(),ne(),Pn(),ae(),_o=(e,t)=>{let r=e[0],n=e[1],a=e[2],i=e[3],s=e[4],u=e[5];if(s&&u)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let d=r.dims[0],l=r.dims[1],f=r.dims[2];if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(n.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==f)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(a.dims[0]!==n.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let c=a.dims[0]/3,m=c,g=m;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let S of t.qkvHiddenSizes)if(S%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");c=t.qkvHiddenSizes[0],m=t.qkvHiddenSizes[1],g=t.qkvHiddenSizes[2]}let _=l;if(c!==m)throw new Error("qkv_hidden_sizes first element should be same as the second");if(a.dims[0]!==c+m+g)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let b=0;if(s){if(m!==g)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==d)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==m/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(b=s.dims[3])}let x=_+b,$=-1,w=0;if(i)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==d||u.dims[1]!==t.numHeads||u.dims[2]!==l||u.dims[3]!==x)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:d,sequenceLength:l,pastSequenceLength:b,kvSequenceLength:_,totalSequenceLength:x,maxSequenceLength:$,inputHiddenSize:f,hiddenSize:c,vHiddenSize:g,headSize:Math.floor(c/t.numHeads),vHeadSize:Math.floor(g/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Sr=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e==null?void 0:e.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,yo=(e,t,r,n,a,i,s,u)=>{let d=$e(s?1:i),l=64,f=i/d;f<l&&(l=32);let c=Math.ceil(i/d/l),m=[{type:12,data:t},{type:12,data:r},{type:12,data:n},{type:12,data:a},{type:12,data:f},{type:12,data:c}],g=ke(e.dataType,d),_=Ee(1,d),b=["type"];s&&b.push("type"),u&&b.push("type");let x=$=>{let w=H("x",e.dataType,e.dims,d),S=[w],k=s?R("seq_lens",s.dataType,s.dims):void 0;k&&S.push(k);let T=u?R("total_sequence_length_input",u.dataType,u.dims):void 0;T&&S.push(T);let E=Ee(e.dataType),z=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${l}>;
  var<workgroup> thread_sum: array<f32, ${l}>;
  ${$.registerUniforms(z).declareVariables(...S)}
  ${$.mainStart([l,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Sr(k,T,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${l}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${_}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${_}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(d){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${d}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${l}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${_}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${_}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(d){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${d}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${l}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${w.type.value}(${E}(1.0) / ${E}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${_}(x[offset + i]);
        x[offset + i] = ${w.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${w.type.value}(${E}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${l};${g};${d}`,inputDependencies:b},getShaderSource:x,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:a,z:t*r},programUniforms:m})}},bo=(e,t,r,n,a,i,s,u,d)=>{let l=s+i.kvSequenceLength,f=[i.batchSize,i.numHeads,i.sequenceLength,l],c=e>1&&n,m=i.kvNumHeads?i.kvNumHeads:i.numHeads,g=c?[i.batchSize,m,l,i.headSize]:void 0,_=i.nReps?i.nReps:1,b=i.scale===0?1/Math.sqrt(i.headSize):i.scale,x=$e(i.headSize),$=i.headSize/x,w=12,S={x:Math.ceil(l/w),y:Math.ceil(i.sequenceLength/w),z:i.batchSize*i.numHeads},k=[{type:12,data:i.sequenceLength},{type:12,data:$},{type:12,data:l},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:b},{type:12,data:s},{type:12,data:i.kvSequenceLength},{type:12,data:_}],T=c&&n&&O.size(n.dims)>0,E=["type","type"];T&&E.push("type"),a&&E.push("type"),u&&E.push("type"),d&&E.push("type");let z=[{dims:f,dataType:t.dataType,gpuDataType:0}];c&&z.push({dims:g,dataType:t.dataType,gpuDataType:0});let C=A=>{let q=R("q",t.dataType,t.dims,x),X=R("key",r.dataType,r.dims,x),G=[q,X];if(T){let Y=R("past_key",n.dataType,n.dims,x);G.push(Y)}a&&G.push(R("attention_bias",a.dataType,a.dims));let Z=u?R("seq_lens",u.dataType,u.dims):void 0;Z&&G.push(Z);let oe=d?R("total_sequence_length_input",d.dataType,d.dims):void 0;oe&&G.push(oe);let re=H("output",t.dataType,f),L=[re];c&&L.push(H("present_key",t.dataType,g,x));let ie=Ee(1,x),F=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;

  var<workgroup> tileQ: array<${q.type.storage}, ${w*w}>;
  var<workgroup> tileK: array<${q.type.storage}, ${w*w}>;
  ${A.registerUniforms(F).declareVariables(...G,...L)}
  ${A.mainStart([w,w,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${_===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${_===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Sr(Z,oe,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${T&&c?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${c?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${ie}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${T&&c?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${c?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${ie}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(x){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${x}`)}})()};
        output[outputIdx] = ${re.type.value} (sum * uniforms.alpha) + ${a?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${x};${a!==void 0};${n!==void 0};${e}`,inputDependencies:E},getRunData:()=>({outputs:z,dispatchGroup:S,programUniforms:k}),getShaderSource:C}},wo=(e,t,r,n,a,i,s=void 0,u=void 0)=>{let d=i+a.kvSequenceLength,l=a.nReps?a.nReps:1,f=a.vHiddenSize*l,c=e>1&&n,m=a.kvNumHeads?a.kvNumHeads:a.numHeads,g=c?[a.batchSize,m,d,a.headSize]:void 0,_=[a.batchSize,a.sequenceLength,f],b=12,x={x:Math.ceil(a.vHeadSize/b),y:Math.ceil(a.sequenceLength/b),z:a.batchSize*a.numHeads},$=[{type:12,data:a.sequenceLength},{type:12,data:d},{type:12,data:a.vHeadSize},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:12,data:f},{type:12,data:i},{type:12,data:a.kvSequenceLength},{type:12,data:l}],w=c&&n&&O.size(n.dims)>0,S=["type","type"];w&&S.push("type"),s&&S.push("type"),u&&S.push("type");let k=[{dims:_,dataType:t.dataType,gpuDataType:0}];c&&k.push({dims:g,dataType:t.dataType,gpuDataType:0});let T=E=>{let z=R("probs",t.dataType,t.dims),C=R("v",r.dataType,r.dims),A=[z,C];w&&A.push(R("past_value",n.dataType,n.dims));let q=s?R("seq_lens",s.dataType,s.dims):void 0;s&&A.push(q);let X=u?R("total_sequence_length_input",u.dataType,u.dims):void 0;u&&A.push(X);let G=[H("output",t.dataType,_)];c&&G.push(H("present_value",t.dataType,g));let Z=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${b}u;
  var<workgroup> tileQ: array<${z.type.value}, ${b*b}>;
  var<workgroup> tileV: array<${z.type.value}, ${b*b}>;
  ${E.registerUniforms(Z).declareVariables(...A,...G)}
  ${E.mainStart([b,b,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${l===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${l===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Sr(q,X,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${w&&c?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${c?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${z.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${w&&c?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${c?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${n!==void 0};${e}`,inputDependencies:S},getRunData:()=>({outputs:k,dispatchGroup:x,programUniforms:$}),getShaderSource:T}},or=(e,t,r,n,a,i,s,u,d,l,f=void 0,c=void 0)=>{let m=Math.min(e.outputCount,1+(s?1:0)+(u?1:0)),g=m>1?l.pastSequenceLength:0,_=g+l.kvSequenceLength,b=d&&O.size(d.dims)>0?d:void 0,x=[t,r];m>1&&s&&O.size(s.dims)>0&&x.push(s),b&&x.push(b),f&&x.push(f),c&&x.push(c);let $=e.compute(bo(m,t,r,s,b,l,g,f,c),{inputs:x,outputs:m>1?[-1,1]:[-1]})[0];e.compute(yo($,l.batchSize,l.numHeads,g,l.sequenceLength,_,f,c),{inputs:f&&c?[$,f,c]:[$],outputs:[]});let w=[$,n];m>1&&u&&O.size(u.dims)>0&&w.push(u),f&&w.push(f),c&&w.push(c),e.compute(wo(m,$,n,u,l,g,f,c),{inputs:w,outputs:m>1?[0,2]:[0]})},$o=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],n=t.sequenceLength,a=t.inputHiddenSize,i=t.headSize,s=12,u={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},d=[e.inputs[0],e.inputs[1],e.inputs[2]],l=[{type:12,data:n},{type:12,data:a},{type:12,data:i},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],f=c=>{let m=H("output_q",d[0].dataType,r),g=H("output_k",d[0].dataType,r),_=H("output_v",d[0].dataType,r),b=R("input",d[0].dataType,d[0].dims),x=R("weight",d[1].dataType,d[1].dims),$=R("bias",d[2].dataType,d[2].dims),w=b.type.storage,S=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${w}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${w}, ${s*s}>;
  var<workgroup> tileWeightK: array<${w}, ${s*s}>;
  var<workgroup> tileWeightV: array<${w}, ${s*s}>;
  ${c.registerUniforms(S).declareVariables(b,x,$,m,g,_)}
  ${c.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${w}(0);
    var valueK = ${w}(0);
    var valueV = ${w}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:l}),getShaderSource:f},{inputs:d,outputs:[-1,-1,-1]})},np=(e,t)=>{let r=_o(e.inputs,t),[n,a,i]=$o(e,r);return or(e,n,a,i,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),vo,xo,ko,ap,zm=P(()=>{je(),ee(),ne(),ve(),ae(),vo=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(n,a,i)=>{let s=a.length;if(s!==n.length)throw new Error(`${i}: num dimensions != ${s}`);a.forEach((u,d)=>{if(u!==n[d])throw new Error(`${i}: dim[${d}] do not match`)})};if(e[0].dims.length>1){let n=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,n,"Invalid input scale"),r(e[2].dims,n,"Invalid input B"),r(e[3].dims,n,"Invalid input mean"),r(e[4].dims,n,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},xo=(e,t)=>{let{epsilon:r,spatial:n,format:a}=t,i=e[0].dims,s=n?$e(i[i.length-1]):1,u=a==="NHWC"&&i.length>1?s:1,d=O.size(i)/s,l=n,f=l?i.length:i,c=R("x",e[0].dataType,e[0].dims,s),m=R("scale",e[1].dataType,e[1].dims,u),g=R("bias",e[2].dataType,e[2].dims,u),_=R("inputMean",e[3].dataType,e[3].dims,u),b=R("inputVar",e[4].dataType,e[4].dims,u),x=H("y",e[0].dataType,f,s),$=()=>{let S="";if(n)S=`let cOffset = ${i.length===1?"0u":a==="NHWC"?`outputIndices[${i.length-1}] / ${s}`:"outputIndices[1]"};`;else if(a==="NCHW")S=`
            ${x.indicesSet("outputIndices","0","0")}
            let cOffset = ${x.indicesToOffset("outputIndices")};`;else{S=`var cIndices = ${m.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let k=1;k<m.rank;k++)S+=`cIndices[${k}] = outputIndices[${k}];`;S+=`let cOffset = ${m.indicesToOffset("cIndices")};`}return S},w=S=>`
  const epsilon = ${r};
  ${S.registerUniform("outputSize","u32").declareVariables(c,m,g,_,b,x)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${x.offsetToIndices(`global_idx * ${s}`)};
    ${$()}
    let scale = ${m.getByOffset("cOffset")};
    let bias = ${g.getByOffset("cOffset")};
    let inputMean = ${_.getByOffset("cOffset")};
    let inputVar = ${b.getByOffset("cOffset")};
    let x = ${c.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${x.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${n}_${s}`,inputDependencies:l?["rank","type","type","type","type"]:void 0},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:l?[{type:12,data:d},...Q(i)]:[{type:12,data:d}]})}},ko=e=>pe(e),ap=(e,t)=>{let{inputs:r,outputCount:n}=e,a=ko({...t,outputCount:n});if(_e.webgpu.validateInputContent&&vo(r,a),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(xo(r,a))}}),So,To,sp,Cm=P(()=>{ne(),ae(),So=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},To=e=>{let t=e[0].dims,r=e[0].dims[2],n=O.size(t)/4,a=e[0].dataType,i=R("input",a,t,4),s=R("bias",a,[r],4),u=R("residual",a,t,4),d=H("output",a,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:l=>`
  const channels = ${r}u / 4;
  ${l.declareVariables(i,s,u,d)}

  ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${i.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${d.setByOffset("global_idx","value")}
  }`}},sp=e=>{So(e.inputs),e.compute(To(e.inputs))}}),Io,de,op,up,lp,dp,pp,fp,cp,hp,mp,Eo,gp,_p,yp,bp,ir,wp,Br,$p,vp,xp,kp,Sp,Tp,Ip,Ep,zp,Cp,Op,Ap,Bp,Rp,Np,Mp,Bi,Dp,yn,bn,Pp,Up,qp,zo,Co,Wp,Vn=P(()=>{ee(),ne(),ve(),ae(),Io=(e,t,r,n,a,i,s)=>{let u=Math.ceil(t/4),d="";typeof a=="string"?d=`${a}(a)`:d=a("a");let l=R("inputData",r,[u],4),f=H("outputData",n,[u],4),c=[{name:"vec_size",type:"u32"}];return s&&c.push(...s),`
      ${e.registerUniforms(c).declareVariables(l,f)}

  ${i??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${f.setByOffset("global_idx",d)}
  }`},de=(e,t,r,n,a,i=e.dataType,s,u)=>{let d=[{type:12,data:Math.ceil(O.size(e.dims)/4)}];return s&&d.push(...s),{name:t,shaderCache:{hint:a,inputDependencies:["type"]},getShaderSource:l=>Io(l,O.size(e.dims),e.dataType,i,r,n,u),getRunData:l=>({outputs:[{dims:e.dims,dataType:i}],dispatchGroup:{x:Math.ceil(O.size(l[0].dims)/64/4)},programUniforms:d})}},op=e=>{e.compute(de(e.inputs[0],"Abs","abs"))},up=e=>{e.compute(de(e.inputs[0],"Acos","acos"))},lp=e=>{e.compute(de(e.inputs[0],"Acosh","acosh"))},dp=e=>{e.compute(de(e.inputs[0],"Asin","asin"))},pp=e=>{e.compute(de(e.inputs[0],"Asinh","asinh"))},fp=e=>{e.compute(de(e.inputs[0],"Atan","atan"))},cp=e=>{e.compute(de(e.inputs[0],"Atanh","atanh"))},hp=e=>pe(e),mp=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(de(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Eo=e=>{let t,r,n=e.length>=2&&e[1].data!==0,a=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=n?e[1].getFloat32Array()[0]:-34028234663852886e22,r=a?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=n?e[1].getUint16Array()[0]:64511,r=a?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return pe({min:t,max:r})},gp=(e,t)=>{let r=t||Eo(e.inputs),n=Ee(e.inputs[0].dataType);e.compute(de(e.inputs[0],"Clip",a=>`clamp(${a}, vec4<${n}>(uniforms.min), vec4<${n}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:n},{name:"max",type:n}]),{inputs:[0]})},_p=e=>{e.compute(de(e.inputs[0],"Ceil","ceil"))},yp=e=>{e.compute(de(e.inputs[0],"Cos","cos"))},bp=e=>{e.compute(de(e.inputs[0],"Cosh","cosh"))},ir=e=>pe(e),wp=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(de(e.inputs[0],"Elu",n=>`elu_vf32(${n})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Br=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,$p=e=>{let t=Ee(e.inputs[0].dataType);e.compute(de(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Br(t)))},vp=e=>{e.compute(de(e.inputs[0],"Exp","exp"))},xp=e=>{e.compute(de(e.inputs[0],"Floor","floor"))},kp=e=>{let t=Ee(e.inputs[0].dataType);e.compute(de(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Br(t)))},Sp=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(de(e.inputs[0],"LeakyRelu",n=>`select(leaky_relu_alpha_ * ${n}, ${n}, ${n} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},Tp=e=>{e.compute(de(e.inputs[0],"Not",t=>`!${t}`))},Ip=e=>{e.compute(de(e.inputs[0],"Neg",t=>`-${t}`))},Ep=e=>{e.compute(de(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},zp=e=>{let t=Ee(e.inputs[0].dataType);e.compute(de(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},Cp=e=>{e.compute(de(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},Op=e=>pe(e),Ap=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(de(e.inputs[0],"HardSigmoid",n=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${n} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},Bp=e=>{e.compute(de(e.inputs[0],"Sin","sin"))},Rp=e=>{e.compute(de(e.inputs[0],"Sinh","sinh"))},Np=e=>{e.compute(de(e.inputs[0],"Sqrt","sqrt"))},Mp=e=>{e.compute(de(e.inputs[0],"Tan","tan"))},Bi=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Dp=e=>{e.compute(de(e.inputs[0],"Tanh",Bi))},yn=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Bi("v")};
}
`,bn=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,Pp=e=>{let t=Ee(e.inputs[0].dataType);e.compute(de(e.inputs[0],"FastGelu",bn,yn(t),void 0,e.inputs[0].dataType))},Up=(e,t)=>{let r=Ee(e.inputs[0].dataType);return e.compute(de(e.inputs[0],"ThresholdedRelu",n=>`select(vec4<${r}>(0.0), ${n}, ${n} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},qp=e=>{e.compute(de(e.inputs[0],"Log","log"))},zo=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Co=e=>`quick_gelu_impl(${e})`,Wp=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(de(e.inputs[0],"QuickGelu",Co,zo(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),Oo,Ao,Vp,Om=P(()=>{ne(),ae(),Vn(),Oo=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Ao=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=R("input",e[0].dataType,e[0].dims,4),n=R("bias",e[0].dataType,[e[0].dims[2]],4),a=H("output",e[0].dataType,t,4),i=O.size(t)/4,s=ke(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${u.declareVariables(r,n,a)}

  ${Br(s)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${a.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Vp=e=>{Oo(e.inputs),e.compute(Ao(e.inputs))}}),Bo,Ro,Ge,Lp,Gp,Hp,Fp,jp,Kp,Zp,Qp,Xp,Yp,Am=P(()=>{ee(),ne(),ae(),Bo=(e,t,r,n,a,i,s,u,d,l,f,c)=>{let m,g;typeof u=="string"?m=g=(w,S)=>`${u}((${w}),(${S}))`:typeof u=="function"?m=g=u:(m=u.scalar,g=u.vector);let _=H("outputData",f,n.length,4),b=R("aData",d,t.length,4),x=R("bData",l,r.length,4),$;if(a)if(i){let w=O.size(t)===1,S=O.size(r)===1,k=t.length>0&&t[t.length-1]%4===0,T=r.length>0&&r[r.length-1]%4===0;w||S?$=_.setByOffset("global_idx",g(w?`${b.type.value}(${b.getByOffset("0")}.x)`:b.getByOffset("global_idx"),S?`${x.type.value}(${x.getByOffset("0")}.x)`:x.getByOffset("global_idx"))):$=`
            let outputIndices = ${_.offsetToIndices("global_idx * 4u")};
            let offsetA = ${b.broadcastedIndicesToOffset("outputIndices",_)};
            let offsetB = ${x.broadcastedIndicesToOffset("outputIndices",_)};
            ${_.setByOffset("global_idx",g(s||k?b.getByOffset("offsetA / 4u"):`${b.type.value}(${b.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||T?x.getByOffset("offsetB / 4u"):`${x.type.value}(${x.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else $=_.setByOffset("global_idx",g(b.getByOffset("global_idx"),x.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let w=(S,k,T="")=>{let E=`aData[indexA${k}][componentA${k}]`,z=`bData[indexB${k}][componentB${k}]`;return`
            let outputIndices${k} = ${_.offsetToIndices(`global_idx * 4u + ${k}u`)};
            let offsetA${k} = ${b.broadcastedIndicesToOffset(`outputIndices${k}`,_)};
            let offsetB${k} = ${x.broadcastedIndicesToOffset(`outputIndices${k}`,_)};
            let indexA${k} = offsetA${k} / 4u;
            let indexB${k} = offsetB${k} / 4u;
            let componentA${k} = offsetA${k} % 4u;
            let componentB${k} = offsetB${k} % 4u;
            ${S}[${k}] = ${T}(${m(E,z)});
          `};f===9?$=`
            var data = vec4<u32>(0);
            ${w("data",0,"u32")}
            ${w("data",1,"u32")}
            ${w("data",2,"u32")}
            ${w("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:$=`
            ${w("outputData[global_idx]",0)}
            ${w("outputData[global_idx]",1)}
            ${w("outputData[global_idx]",2)}
            ${w("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(b,x,_)}

        ${c??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${$}
      }`},Ro=(e,t,r,n,a,i,s=r.dataType)=>{let u=r.dims.map(b=>Number(b)??1),d=n.dims.map(b=>Number(b)??1),l=!O.areEqual(u,d),f=u,c=O.size(u),m=!1,g=!1,_=[l];if(l){let b=Pt.calcShape(u,d,!1);if(!b)throw new Error("Can't perform binary op on the given tensors");f=b.slice(),c=O.size(f);let x=O.size(u)===1,$=O.size(d)===1,w=u.length>0&&u[u.length-1]%4===0,S=d.length>0&&d[d.length-1]%4===0;_.push(x),_.push($),_.push(w),_.push(S);let k=1;for(let T=1;T<f.length;T++){let E=u[u.length-T],z=d[d.length-T];if(E===z)k*=E;else break}k%4===0?(g=!0,m=!0):(x||$||w||S)&&(m=!0)}else m=!0;return _.push(m),{name:e,shaderCache:{hint:t+_.map(b=>b.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:b=>Bo(b,u,d,f,m,l,g,a,r.dataType,n.dataType,s,i),getRunData:()=>({outputs:[{dims:f,dataType:s}],dispatchGroup:{x:Math.ceil(c/64/4)},programUniforms:[{type:12,data:Math.ceil(O.size(f)/4)},...Q(u,d,f)]})}},Ge=(e,t,r,n,a,i)=>{e.compute(Ro(t,a??"",e.inputs[0],e.inputs[1],r,n,i))},Lp=e=>{Ge(e,"Add",(t,r)=>`${t}+${r}`)},Gp=e=>{Ge(e,"Div",(t,r)=>`${t}/${r}`)},Hp=e=>{Ge(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},Fp=e=>{Ge(e,"Mul",(t,r)=>`${t}*${r}`)},jp=e=>{let t=R("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Ge(e,"Pow",{scalar:(r,n)=>`pow_custom(${r},${n})`,vector:(r,n)=>`pow_vector_custom(${r},${n})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Kp=e=>{Ge(e,"Sub",(t,r)=>`${t}-${r}`)},Zp=e=>{Ge(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Qp=e=>{Ge(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Xp=e=>{Ge(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Yp=e=>{Ge(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),No,Mo,Do,Po,Jp,ef,Bm=P(()=>{ee(),ne(),ve(),ae(),No=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,n=e[r],a=n.dataType,i=n.dims.length;e.forEach((s,u)=>{if(u!==r){if(s.dataType!==a)throw new Error("input tensors should be one type");if(s.dims.length!==i)throw new Error("input tensors should have the same shape");s.dims.forEach((d,l)=>{if(l!==t&&d!==n.dims[l])throw new Error("non concat dimensions must match")})}})},Mo=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Do=(e,t)=>{let r=e.length,n=[];for(let a=0;a<r;++a){let i=t.setByOffset("global_idx",e[a].getByIndices("indices"));r===1?n.push(i):a===0?n.push(`if (inputIndex == ${a}u) { ${i} }`):a===r-1?n.push(`else { ${i} }`):n.push(`else if (inputIndex == ${a}) { ${i} }`)}return n.join(`
`)},Po=(e,t,r,n)=>{let a=O.size(r),i=new Array(e.length),s=new Array(e.length),u=0,d=[],l=[],f=[{type:12,data:a}];for(let b=0;b<e.length;++b)u+=e[b].dims[t],i[b]=u,l.push(e[b].dims.length),s[b]=R(`input${b}`,n,l[b]),d.push("rank"),f.push({type:12,data:i[b]});for(let b=0;b<e.length;++b)f.push(...Q(e[b].dims));f.push(...Q(r));let c=H("output",n,r.length),m=c.indicesGet("indices",t),g=Array.from(Array(i.length).keys()).map(b=>`uniforms.sizeInConcatAxis${b}`).join(","),_=b=>`

  ${(()=>{b.registerUniform("outputSize","u32");for(let x=0;x<e.length;x++)b.registerUniform(`sizeInConcatAxis${x}`,"u32");return b.declareVariables(...s,c)})()}

  ${Mo(i.length,g)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${c.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${m});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${g});
      ${m} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Do(s,c)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:f}),getShaderSource:_}},Jp=(e,t)=>{let r=e.inputs,n=r[0].dims,a=O.normalizeAxis(t.axis,n.length);No(r,a);let i=n.slice();i[a]=r.reduce((u,d)=>u+(d.dims.length>a?d.dims[a]:0),0);let s=r.filter(u=>O.size(u.dims)>0);e.compute(Po(s,a,i,r[0].dataType),{inputs:s})},ef=e=>pe({axis:e.axis})}),It,Et,zt,Ln,Ot=P(()=>{ee(),ne(),It=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Et=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},zt=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Ln=e=>{let t=(e==null?void 0:e.activation)||"";if(t==="HardSigmoid"){let[r,n]=(e==null?void 0:e.activation_params)||[.2,.5];return{activation:t,alpha:r,beta:n}}else if(t==="Clip"){let[r,n]=(e==null?void 0:e.activation_params)||[Td,Id];return{activation:t,clipMax:n,clipMin:r}}else if(t==="LeakyRelu"){let[r]=(e==null?void 0:e.activation_params)||[.01];return{activation:t,alpha:r}}return{activation:t}}}),Se,tf,Gn=P(()=>{Se=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},tf=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),rf,Rm=P(()=>{rf=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),ar,Hn,Fn=P(()=>{ee(),ne(),ae(),Ot(),ar=(e,t,r,n,a)=>{let i=n-r;return`
      ${Array.from({length:r}).map((s,u)=>`
      if (${j(t.shape,u,t.rank)} != 1) {
        ${t.indicesSet(e,u,j(a,u+i,n))}
      } else {
        ${t.indicesSet(e,u,0)}
      }`).join("")}
`},Hn=(e,t,r,n,a=!1,i)=>{let s=e[0].dims,u=e[1].dims,d=s[s.length-2],l=u[u.length-1],f=s[s.length-1],c=$e(l),m=$e(f),g=$e(d),_=O.size(r)/c/g,b=e.length>2,x=n?n.slice(0,-2):r.slice(0,-2),$=[O.size(x),d,l],w=[{type:12,data:_},{type:12,data:d},{type:12,data:l},{type:12,data:f}];Et(t,w),w.push(...Q(x,s,u)),b&&w.push(...Q(e[2].dims)),w.push(...Q($));let S=k=>{let T=Un("batch_dims",e[0].dataType,x.length),E=R("a",e[0].dataType,s.length,m),z=R("b",e[1].dataType,u.length,c),C=H("output",e[0].dataType,$.length,c),A=ke(C.type.tensor),q=It(t,C.type.value,A),X=[E,z],G="";if(b){let re=a?c:1;X.push(R("bias",e[2].dataType,e[2].dims.length,re)),G=`${a?`value += bias[col / ${re}];`:`value += ${C.type.value}(bias[row + i]);`}`}let Z=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];zt(t,Z);let oe=()=>{let re=`var a_data: ${E.type.value};`;for(let L=0;L<m;L++)re+=`
              let b_data${L} = b[(b_offset + (k + ${L}) * uniforms.N + col) / ${c}];`;for(let L=0;L<g;L++){re+=`a_data = a[(a_offset + (row + ${L}) * uniforms.K + k) / ${m}];`;for(let ie=0;ie<m;ie++)re+=`
            values[${L}] = fma(${z.type.value}(a_data${m===1?"":`[${ie}]`}), b_data${ie}, values[${L}]);
`}return re};return`
  ${k.registerUniforms(Z).registerInternalVariables(T).declareVariables(...X,C)}
  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${c})) * ${c};
    var index1 = global_idx / (uniforms.N / ${c});
    let stride1 = uniforms.M / ${g};
    let row = (index1 % stride1) * ${g};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${T.offsetToIndices("batch")};`}

    var a_indices: ${E.type.indices};
    ${ar("a_indices",E,E.rank-2,T.rank,"batch_indices")}
    ${E.indicesSet("a_indices",E.rank-2,0)}
    ${E.indicesSet("a_indices",E.rank-1,0)}
    let a_offset = ${E.indicesToOffset("a_indices")};

    var b_indices: ${z.type.indices};
    ${ar("b_indices",z,z.rank-2,T.rank,"batch_indices")}
    ${z.indicesSet("b_indices",z.rank-2,0)}
    ${z.indicesSet("b_indices",z.rank-1,0)}
    let b_offset = ${z.indicesToOffset("b_indices")};
    var values: array<${C.type.value}, ${g}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${m}) {
      ${oe()}
    }
    for (var i = 0u; i < ${g}u; i++) {
      var value = values[i];
      ${G}
      ${q}
      let cur_indices = ${C.type.indices}(batch, row + i, col);
      let offset = ${C.indicesToOffset("cur_indices")};
      ${C.setByOffset(`offset / ${c}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${c};${m};${g};${a}`,inputDependencies:b?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:w}),getShaderSource:S}}}),Uo,qo,wn,Ri,Wo,$n,Vo,Ur,jn=P(()=>{ee(),ne(),ae(),Ot(),Fn(),Gn(),Uo=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,qo=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,wn=(e,t,r="f32",n,a=!1,i=32,s=!1,u=32)=>{let d=t[1]*e[1],l=t[0]*e[0],f=a?d:i,c=a?i:d,m=f/t[0],g=i/t[1];if(!((a&&m===4&&e[1]===4||!a&&(m===3||m===4))&&f%t[0]===0&&i%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${a} is true, innerElementSize ${m} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${m} must be 3 or 4.
  tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${m}<${r}>, ${f/m}>, ${c}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${l/e[0]}>, ${i}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${m};
const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${d};

  let num_tiles = ${s?`${Math.ceil(u/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${g};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Uo(a,n)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${n?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${m===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${qo(a,m)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Ri=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Wo=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",$n=(e,t,r="f32",n,a=!1,i=32,s=!1,u=32,d=!1)=>{let l=e[1]*t[1],f=e[0]*t[0],c=a?l:i,m=a?i:l;if(!(m%t[1]===0&&c%t[0]===0&&i%t[1]===0))throw new Error(`tileAHight ${m} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}, tileInner ${i} must be divisible by workgroupSize[1]${t[1]}`);let g=m/t[1],_=c/t[0],b=i/t[1],x=d?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${f};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${m}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
          ${Ri(a,n)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${n?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${a?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${l};

let tileRowA = i32(localId.y) * ${g};
let tileColA = i32(localId.x) * ${_};
let tileRowB = i32(localId.y) * ${b};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${_}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Ri(a,n)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${n?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Wo(a)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${c}>, ${m}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${f}>, ${i}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(u/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${x}
  }
`},Vo=(e,t,r,n,a=!1)=>{let[i,s,u,d]=n,l=ke(n[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Se(e,l)} {
      var value = ${Se(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${ar("aIndices",s,s.rank-2,i.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Se(e,l)} {
      var value = ${Se(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${ar("bIndices",u,u.rank-2,i.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Se(e,l)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${a?"bias[colIn]":`${Se(e,l)}(bias[row])`};`:""}
        ${r}
        ${d.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Ur=(e,t,r,n,a=!1,i)=>{let s=e[0].dims,u=e[1].dims,d=s.slice(0,-2),l=u.slice(0,-2),f=n?n.slice(0,-2):r.slice(0,-2),c=O.size(f),m=s[s.length-2],g=s[s.length-1],_=u[u.length-1],b=g%4===0&&_%4===0,x=m<=8?[4,1,1]:[4,4,1],$=[8,8,1],w=[Math.ceil(_/$[0]/x[0]),Math.ceil(m/$[1]/x[1]),Math.ceil(c/$[2]/x[2])],S=b?4:1,k=[...d,m,g/S],T=k.length,E=[...l,g,_/S],z=E.length,C=[c,m,_/S],A=[{type:6,data:m},{type:6,data:_},{type:6,data:g}];Et(t,A),A.push(...Q(f,k,E));let q=["rank","rank"],X=e.length>2;X&&(A.push(...Q(e[2].dims)),q.push("rank")),A.push(...Q(C));let G=Z=>{let oe=f.length,re=Un("batchDims",e[0].dataType,oe,1),L=ke(e[0].dataType),ie=R("a",e[0].dataType,T,S),F=R("b",e[1].dataType,z,S),Y=H("result",e[0].dataType,C.length,S),ye=[ie,F];if(X){let Te=a?S:1;ye.push(R("bias",e[2].dataType,e[2].dims.length,Te))}let N=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];zt(t,N);let U=ke(Y.type.tensor),V=It(t,Y.type.value,U),te=Vo(S,X,V,[re,ie,F,Y],a);return`
  ${Z.registerUniforms(N).registerInternalVariables(re).declareVariables(...ye,Y)}
  ${te}
  ${b?wn(x,$,L,re):$n(x,$,L,re)}
                   `};return{name:"MatMul",shaderCache:{hint:`${x};${t.activation};${b};${a}`,inputDependencies:q},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:A}),getShaderSource:G}}}),Lo,nf,Nm=P(()=>{ee(),at(),ae(),Ot(),Gn(),Rm(),jn(),Lo=(e,t,r,n,a=!1,i,s=4,u=4,d=4,l="f32")=>{let f=A=>{switch(A){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${A} is not supported.`)}},c=A=>{switch(A){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${A} is not supported.`)}},m=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,g=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,_=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",b=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",x=e?"row":"col",$=e?"col":"row",w=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${x} / outWidth;
    let outCol = ${x} % outWidth;

    let WRow = ${$} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${$} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${$} % inChannels;
    var resData = ${Se(s,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${_} && xCol >= 0 && xCol < ${b}) {
      ${m}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${f(s)}
    }
    return resData;`,S=e?t&&n?`
    let col = colIn * ${s};
    ${w}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${w}
    }
    return ${Se(s,l)}(0.0);`:n&&r?`
    let col = colIn * ${s};
    ${w}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${w}
    }
    return ${Se(s,l)}(0.0);`,k=e?n&&r?c(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${c(u)}
    }
    return ${Se(u,l)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${c(u)}
    }
    return ${Se(u,l)}(0.0);`,T=Se(d,l),E=Se(e?s:u,l),z=Se(e?u:s,l),C=It(i,T,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${E} {
      ${e?S:k}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${z} {
      ${e?k:S}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${T}) {
      let col = colIn * ${d};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${g}
      ${tf(a)}
      ${C}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},nf=(e,t,r,n,a,i,s,u,d)=>{let l=t.format==="NHWC",f=l?e[0].dims[3]:e[0].dims[1],c=r[0],m=l?r[2]:r[3],g=l?r[1]:r[2],_=l?r[3]:r[1],b=l&&(f%4===0||f%3===0)&&_%4===0,x=l?_:m*g,$=l?m*g:_,w=[8,8,1],S=n<=8?[4,1,1]:[4,4,1],k=[Math.ceil(x/w[0]/S[0]),Math.ceil($/w[1]/S[1]),Math.ceil(c/w[2]/S[2])];ue("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${k}`);let T=b?l&&f%4!==0?3:4:1,E=w[1]*S[1],z=w[0]*S[0],C=Math.max(w[0]*T,w[1]),A=n%E===0,q=a%z===0,X=i%C===0,G=b?[T,4,4]:[1,1,1],Z=[{type:6,data:n},{type:6,data:a},{type:6,data:i},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Et(t,Z),Z.push(...Q(e[0].dims,e[1].dims));let oe=["rank","rank"];s&&(Z.push(...Q(e[2].dims)),oe.push("rank")),Z.push(...Q(r));let re=L=>{let ie=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];zt(t,ie);let F=b?4:1,Y=ke(e[0].dataType),ye=`
      fn setOutputAtIndex(flatIndex : i32, value : ${b?`vec4<${Y}>`:Y}) {
        result[flatIndex] = ${b?`vec4<${Y}>`:Y}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${b?`vec4<${Y}>`:Y}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${b?"/ 4":""}, value);
      }`,N=R("x",e[0].dataType,e[0].dims.length,T===3?1:T),U=R("w",e[1].dataType,e[1].dims.length,F),V=[N,U],te=H("result",e[0].dataType,r.length,F);if(s){let Te=R("bias",e[2].dataType,e[2].dims.length,F);V.push(Te),ye+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${b?`vec4<${Y}>`:Y} {
          return bias[coords.${l?"w":"y"}${b?"/ 4":""}];
        }`}return`
        ${rf("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${L.registerUniforms(ie).declareVariables(...V,te)}
        ${ye}
        ${Lo(l,A,q,X,s,t,G[0],G[1],G[2],Y)}
        ${b?wn(S,w,Y,void 0,!l,C):$n(S,w,Y,void 0,!l,C,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${T};${b};${A};${q};${X};${E};${z};${C}`,inputDependencies:oe},getRunData:()=>({outputs:[{dims:d?d(r):r,dataType:e[0].dataType}],dispatchGroup:{x:k[0],y:k[1],z:k[2]},programUniforms:Z}),getShaderSource:re}}}),Go,Ni,Zt,Ho,Mi,Fo,af,sf,Mm=P(()=>{ee(),at(),ne(),ae(),Ot(),Gn(),Go=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Ni=e=>typeof e=="number"?[e,e,e]:e,Zt=(e,t)=>t<=1?e:e+(e-1)*(t-1),Ho=(e,t,r,n=1)=>{let a=Zt(t,n);return Math.floor((e[0]*(r-1)-r+a)/2)},Mi=(e,t,r,n,a)=>{a==null&&(a=Ho(e,t[0],n[0]));let i=[0,0,0,r];for(let s=0;s<3;s++)e[s]+2*a>=t[s]&&(i[s]=Math.trunc((e[s]-t[s]+2*a)/n[s]+1));return i},Fo=(e,t,r,n,a,i,s,u,d,l)=>{let f,c,m,g;if(e==="VALID"&&(e=0),typeof e=="number"){f={top:e,bottom:e,left:e,right:e,front:e,back:e};let _=Mi([t,r,n,1],[u,d,l],1,[a,i,s],e);c=_[0],m=_[1],g=_[2]}else if(Array.isArray(e)){if(!e.every((b,x,$)=>b===$[0]))throw Error(`Unsupported padding parameter: ${e}`);f={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let _=Mi([t,r,n,1],[u,d,l],1,[a,i,s],e[0]);c=_[0],m=_[1],g=_[2]}else if(e==="SAME_UPPER"){c=Math.ceil(t/a),m=Math.ceil(r/i),g=Math.ceil(n/s);let _=(c-1)*a+u-t,b=(m-1)*i+d-r,x=(g-1)*s+l-n,$=Math.floor(_/2),w=_-$,S=Math.floor(b/2),k=b-S,T=Math.floor(x/2),E=x-T;f={top:S,bottom:k,left:T,right:E,front:$,back:w}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:f,outDepth:c,outHeight:m,outWidth:g}},af=(e,t,r,n,a,i=!1,s="channelsLast")=>{let u,d,l,f,c;if(s==="channelsLast")[u,d,l,f,c]=e;else if(s==="channelsFirst")[u,c,d,l,f]=e;else throw new Error(`Unknown dataFormat ${s}`);let[m,,g,_,b]=t,[x,$,w]=Ni(r),[S,k,T]=Ni(n),E=Zt(g,S),z=Zt(_,k),C=Zt(b,T),{padInfo:A,outDepth:q,outHeight:X,outWidth:G}=Fo(a,d,l,f,x,$,w,E,z,C),Z=i?m*c:m,oe=[0,0,0,0,0];return s==="channelsFirst"?oe=[u,Z,q,X,G]:s==="channelsLast"&&(oe=[u,q,X,G,Z]),{batchSize:u,dataFormat:s,inDepth:d,inHeight:l,inWidth:f,inChannels:c,outDepth:q,outHeight:X,outWidth:G,outChannels:Z,padInfo:A,strideDepth:x,strideHeight:$,strideWidth:w,filterDepth:g,filterHeight:_,filterWidth:b,effectiveFilterDepth:E,effectiveFilterHeight:z,effectiveFilterWidth:C,dilationDepth:S,dilationHeight:k,dilationWidth:T,inShape:e,outShape:oe,filterShape:t}},sf=(e,t,r,n,a,i)=>{let s=i==="channelsLast";s?e[0].dims[3]:e[0].dims[1];let u=[64,1,1],d={x:r.map((x,$)=>$)},l=[Math.ceil(Go(d.x.map(x=>r[x]))/u[0]),1,1];ue("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${l}`);let f=1,c=O.size(r),m=[{type:12,data:c},{type:12,data:n},{type:12,data:a},{type:12,data:t.strides},{type:12,data:t.dilations}];Et(t,m),m.push(...Q(e[0].dims,e[1].dims));let g=["rank","rank"],_=e.length===3;_&&(m.push(...Q(e[2].dims)),g.push("rank")),m.push(...Q(r));let b=x=>{let $=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:n.length},{name:"pads",type:"u32",length:a.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];zt(t,$);let w=1,S=ke(e[0].dataType),k=R("x",e[0].dataType,e[0].dims.length,f),T=R("W",e[1].dataType,e[1].dims.length,w),E=[k,T],z=H("result",e[0].dataType,r.length,w),C="";if(_){let X=R("bias",e[2].dataType,e[2].dims.length,w);E.push(X),C+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${S} {
          return bias[${s?j("coords",4,5):j("coords",1,5)}];
        }`}let A=Se(f,S),q=It(t,A,S);return`
            ${C}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${k.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${T.getByIndices("aIndices")};
            }
          ${x.registerUniforms($).declareVariables(...E,z)}
          ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${z.offsetToIndices("global_idx")};
              let batch = ${j("coords",0,k.rank)};
              let d2 = ${s?j("coords",k.rank-1,k.rank):j("coords",1,k.rank)};
              let xFRCCorner = vec3<u32>(${s?j("coords",1,k.rank):j("coords",2,k.rank)},
              ${s?j("coords",2,k.rank):j("coords",3,k.rank)},
              ${s?j("coords",3,k.rank):j("coords",4,k.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?j("uniforms.x_shape",1,k.rank):j("uniforms.x_shape",2,k.rank)};
              let xShapeZ = ${s?j("uniforms.x_shape",2,k.rank):j("uniforms.x_shape",3,k.rank)};
              let xShapeW = ${s?j("uniforms.x_shape",3,k.rank):j("uniforms.x_shape",4,k.rank)};
              let xShapeU = ${s?j("uniforms.x_shape",4,k.rank):j("uniforms.x_shape",1,k.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${_?"value = value + getBiasByOutputCoords(coords)":""};
              ${q}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${f};${_}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:l[0],y:l[1],z:l[2]},programUniforms:m}),getShaderSource:b}}}),of,uf,Dm=P(()=>{ee(),ne(),ae(),Ot(),of=(e,t,r,n)=>{let a=e.length>2,i=a?"value += b[output_channel];":"",s=e[0].dims,u=e[1].dims,d=t.format==="NHWC",l=d?r[3]:r[1],f=l/t.group,c=d&&f>=4?$e(l):1,m=O.size(r)/c,g=[{type:12,data:m},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:f}];Et(t,g),g.push(...Q(s,[u[0],u[1],u[2],u[3]/c]));let _=a?["rank","rank","rank"]:["rank","rank"];g.push(...Q([r[0],r[1],r[2],r[3]/c]));let b=x=>{let $=H("output",e[0].dataType,r.length,c),w=ke($.type.tensor),S=It(t,$.type.value,w),k=R("x",e[0].dataType,s.length),T=R("w",e[1].dataType,u.length,c),E=[k,T];a&&E.push(R("b",e[2].dataType,e[2].dims,c));let z=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];zt(t,z);let C=d?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${k.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${T.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${k.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${T.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${x.registerUniforms(z).declareVariables(...E,$)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${$.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${d?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${d?1:2}], outputIndices[${d?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${c} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${d?2:1}];

    var value: ${$.type.value} = ${$.type.value}(0);
    ${C}
    ${i}
    ${S}
    ${$.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${c}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:g}),getShaderSource:b}},uf=(e,t,r,n)=>{let a=e.length>2,i=$e(r[3]),s=$e(r[2]),u=O.size(r)/i/s,d=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/i],l=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/i],f=[r[0],r[1],r[2],r[3]/i],c=[{type:12,data:u},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Et(t,c),c.push(...Q(d,l,f));let m=(s-1)*t.strides[1]+l[1],g=_=>{let b=H("output",e[0].dataType,f.length,i),x=ke(b.type.tensor),$=It(t,b.type.value,x),w=R("x",e[0].dataType,d.length,i),S=R("w",e[1].dataType,l.length,i),k=[w,S];a&&k.push(R("b",e[2].dataType,e[2].dims,i));let T=a?"value += b[output_channel];":"",E=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return zt(t,E),`
  ${_.registerUniforms(E).declareVariables(...k,b)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${w.type.value}, ${m}>;
    var values: array<${b.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${m}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${w.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${w.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${l[1]}; w_width++) {
          let w_val = ${S.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${T}
      ${$}
      ${b.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${i};${s};${m};${l[0]};${l[1]}`,inputDependencies:a?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c}),getShaderSource:g}}}),jo,Tr,Ko,Ir,vn,Di,Zo,Qo,xn,Pm=P(()=>{ne(),Nm(),Mm(),jn(),Dm(),Ot(),Fn(),gt(),jo=(e,t,r,n,a,i)=>{let s=e[0],u=e.slice(i?1:2,i?3:4),d=u.length,l=t[0],f=t.slice(2).map((m,g)=>m+(m-1)*(r[g]-1)),c=u.map((m,g)=>m+n[g]+n[g+d]).map((m,g)=>Math.floor((m-f[g]+a[g])/a[g]));return c.splice(0,0,s),c.splice(i?3:1,0,l),c},Tr=[2,3,1,0],Ko=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[1]*t.group;if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Ir=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let i=2;i<t[1].dims.length;++i)r[i-2]===0&&(r[i-2]=t[1].dims[i]);let n=e.pads.slice();Dr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,e.format==="NHWC",e.autoPad);let a=Object.assign({},e);return Object.assign(a,{kernelShape:r,pads:n}),a},vn=e=>{let t=Ln(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],a=e.dilations,i=e.group,s=e.kernel_shape,u=e.pads,d=e.strides,l=e.w_is_const();return{autoPad:n,format:r,dilations:a,group:i,kernelShape:s,pads:u,strides:d,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},Di=(e,t,r,n)=>{let a=r.format==="NHWC",i=jo(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,a);if(r.group!==1){let E=[t[0]];if(a){let z=e.kernelCustomData.wT??e.compute(Me(t[1],Tr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=z),E.push(z)}else E.push(t[1]);t.length===3&&E.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&a&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(uf(E,r,i,n),{inputs:E}):e.compute(of(E,r,i,n),{inputs:E});return}let s=t.length===3,u=t[0].dims[a?1:2],d=t[0].dims[a?2:3],l=t[0].dims[a?3:1],f=t[1].dims[2],c=t[1].dims[3],m=i[a?1:2],g=i[a?2:3],_=i[a?3:1],b=a&&f===u&&c===d&&r.pads[0]===0&&r.pads[1]===0;if(b||f===1&&c===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let E=i[0],z,C,A,q=[];if(a){let Z=e.kernelCustomData.wT??e.compute(Me(t[1],Tr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=Z),b){let oe=u*d*l;z=t[0].reshape([1,E,oe]),C=Z.reshape([1,oe,_]),A=[1,E,_]}else z=t[0].reshape([E,u*d,l]),C=Z.reshape([1,l,_]),A=[E,m*g,_];q.push(z),q.push(C)}else z=t[0].reshape([E,l,u*d]),C=t[1].reshape([1,_,l]),A=[E,_,m*g],q.push(C),q.push(z);s&&q.push(t[2]);let X=A[2],G=q[0].dims[q[0].dims.length-1];X<8&&G<8?e.compute(Hn(q,r,i,A,a,n),{inputs:q}):e.compute(Ur(q,r,i,A,a,n),{inputs:q});return}let x=!0,$=e.kernelCustomData.wT??e.compute(Me(t[1],Tr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let w=[t[0],$];s&&w.push(t[2]);let S=a?m*g:_,k=a?_:m*g,T=f*c*l;e.compute(nf(w,r,i,S,k,T,s,x,n),{inputs:w})},Zo=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let a=[0,t.pads[0],0,t.pads[1]],i=[1].concat(t.strides),s=[1].concat(t.dilations),u=[1].concat(t.kernelShape),d=Ir({...t,pads:a,strides:i,dilations:s,kernelShape:u},n);Di(e,n,d,l=>r?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},Qo=(e,t,r)=>{let n=r.format==="NHWC"?"channelsLast":"channelsFirst",a=Ir(r,t),i=r.autoPad==="NOTSET"?r.pads:r.autoPad,s=af(t[0].dims,t[1].dims,r.strides,r.dilations,i,!1,n);e.compute(sf(t,a,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],n))},xn=(e,t)=>{if(Ko(e.inputs,t),e.inputs[0].dims.length===3)Zo(e,t);else if(e.inputs[0].dims.length===5)Qo(e,e.inputs,t);else{let r=Ir(t,e.inputs);Di(e,e.inputs,r)}}}),lf,Um=P(()=>{ee(),at(),ne(),ae(),lf=(e,t,r)=>{let n=e.length>2,a=t.outputShape,i=t.format==="NHWC",s=t.group,u=e[1].dims,d=u[2]/s,l=u[3],f=i?$e(d):1,c=i&&l===1&&d>=4,m=c?Math.floor(d/4)*4:Math.floor(d/f)*f,g=d-m,_=i?$e(l):1,b=i?l===1?f:_:1,x=O.size(a)/_,$=[Math.ceil(x/64),1,1];ue("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${$}`);let w=["rank","rank"],S=[t.strides[0],t.strides[1]],k=[t.kernelShape[i?1:2],t.kernelShape[i?2:3]],T=[t.dilations[0],t.dilations[1]],E=[k[0]+(t.dilations[0]<=1?0:(t.kernelShape[i?1:2]-1)*(t.dilations[0]-1)),k[1]+(t.dilations[1]<=1?0:(t.kernelShape[i?2:3]-1)*(t.dilations[1]-1))],z=[E[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),E[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],C=[{type:12,data:x},{type:12,data:S},{type:12,data:k},{type:12,data:T},{type:12,data:E},{type:6,data:z},{type:12,data:m},{type:12,data:d},{type:12,data:l},...Q(e[0].dims,e[1].dims)];n&&(C.push(...Q(e[2].dims)),w.push("rank")),C.push(...Q(a));let A=q=>{let X=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:S.length},{name:"filter_dims",type:"u32",length:k.length},{name:"dilations",type:"u32",length:k.length},{name:"effective_filter_dims",type:"u32",length:E.length},{name:"pads",type:"i32",length:z.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],G=ke(e[0].dataType),Z=i?1:2,oe=i?2:3,re=i?3:1,L=R("W",e[1].dataType,e[1].dims.length,b),ie=R("Dy",e[0].dataType,e[0].dims.length,f),F=[ie,L];n&&F.push(R("bias",e[2].dataType,[a[re]].length,_));let Y=H("result",e[0].dataType,a.length,_),ye=()=>{let V="";if(c)f===4?V+=`
        let xValue = ${ie.getByOffset("x_offset")};
        let wValue = ${L.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:f===2?V+=`
          dotProd = dotProd + dot(vec4<${G}>(${ie.getByOffset("x_offset")}, ${ie.getByOffset("x_offset + 1u")}), vec4<${G}>(${L.getByOffset("w_offset")}, ${L.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:f===1&&(V+=`
          dotProd = dotProd + dot(vec4<${G}>(${ie.getByOffset("x_offset")}, ${ie.getByOffset("x_offset + 1u")}, ${ie.getByOffset("x_offset + 2u")}, ${ie.getByOffset("x_offset + 3u")}), vec4<${G}>(${L.getByOffset("w_offset")}, ${L.getByOffset("w_offset + 1u")}, ${L.getByOffset("w_offset + 2u")}, ${L.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(V+=`
                  let xValue = ${i?ie.getByOffset(`${ie.indicesToOffset(`${ie.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f}`):ie.get("batch","inputChannel","idyR","idyC")};
        `,f===1)V+=`
          let w_offset = ${L.indicesToOffset(`${L.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${L.getByOffset(`w_offset / ${b}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let te=0;te<f;te++)V+=`
            let wValue${te} = ${L.getByOffset(`${L.indicesToOffset(`${L.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${te}, wOutChannel)`)} / ${b}`)};
            dotProd = dotProd + xValue[${te}] * wValue${te};`;return V},N=()=>{if(g===0)return"";if(!c)throw new Error(`packInputAs4 ${c} is not true.`);let V="";if(f===1){V+="dotProd = dotProd";for(let te=0;te<g;te++)V+=`
            + ${ie.getByOffset(`x_offset + ${te}`)} * ${L.getByOffset(`w_offset + ${te}`)}`;V+=";"}else if(f===2){if(g!==2)throw new Error(`Invalid inputChannelsRemainder ${g}.`);V+=`
          let xValue = ${ie.getByOffset("x_offset")};
          let wValue = ${L.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return V},U=`
            let outputIndices = ${Y.offsetToIndices(`global_idx * ${_}`)};
            let batch = ${Y.indicesGet("outputIndices",0)};
            let d1 = ${Y.indicesGet("outputIndices",re)};
            let r = ${Y.indicesGet("outputIndices",Z)};
            let c = ${Y.indicesGet("outputIndices",oe)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${Y.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${G}(dyRCorner) + ${G}(wR)) / ${G}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${G}(uniforms.Dy_shape[${Z}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${G}(dyCCorner) + ${G}(wC)) / ${G}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${G}(uniforms.Dy_shape[${oe}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${c?`
                var x_offset = ${ie.indicesToOffset(`${ie.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f};
                var w_offset = ${L.indicesToOffset(`${L.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${b};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${c?4:f}) {
                  ${ye()}
                  inputChannel = inputChannel + ${c?4:f};
                }
                ${N()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${n?` + bias[d1 / ${_}]`:""};
            ${Y.setByOffset("global_idx","value")};
          `;return`
    ${q.registerUniforms(X).declareVariables(...F,Y)}
      ${q.mainStart()}
      ${q.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${U}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${f}${b}${_}${c}${g}`,inputDependencies:w},getRunData:()=>({dispatchGroup:{x:$[0],y:$[1],z:$[2]},outputs:[{dims:r?r(a):a,dataType:e[0].dataType}],programUniforms:C}),getShaderSource:A}}}),Xo,Yo,Jo,Pi,df,eu,Ui,tu,pf,qm=P(()=>{Um(),Ot(),gt(),Xo=(e,t,r,n,a,i)=>(e-1)*t+r+(n-1)*a+1-i,Yo=(e,t,r,n,a)=>{let i=Math.floor(e/2);t==="SAME_UPPER"?(r[n]=i,r[a]=e-i):t==="SAME_LOWER"&&(r[n]=e-i,r[a]=i)},Jo=(e,t,r,n,a,i,s,u,d,l)=>{let f=e.length-2,c=l.length===0;d.length<f&&d.push(...Array(f-d.length).fill(0));let m=e[0],g=t[u?3:1]*a;for(let _=0,b=e.length-f-(u?1:0);_<f;++_,++b){let x=e[b],$=c?x*s[_]:l[_],w=Xo(x,s[_],i[_],t[b],r[_],$);Yo(w,n,i,_,_+f),c&&l.push(s[_]*(x-1)+d[_]+(t[b]-1)*r[_]+1-i[_]-i[_+f])}l.splice(0,0,m),l.splice(u?3:1,0,g)},Pi=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((c,m)=>c*m,1)===0){r.length=0;for(let c=2;c<t[1].dims.length;++c)r.push(t[1].dims[c])}let n=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(n?3:1,0,t[1].dims[1]);let a=e.pads.slice(),i=e.outputShape.slice(),s=e.outputPadding.slice(),u=t[0].dims,d=e.dilations.slice();if(d.reduce((c,m)=>c+m,0)===0){let c=t[0].dims.length-2;d=new Array(c).fill(1)}let l=e.strides.slice();if(l.reduce((c,m)=>c+m,0)===0){let c=t[0].dims.length-2;l=new Array(c).fill(1)}Jo(u,r,d,e.autoPad,e.group,a,l,n,s,i);let f=Object.assign({},e);return Object.assign(f,{kernelShape:r,pads:a,outputPadding:s,outputShape:i,dilations:d,strides:l}),f},df=e=>{let t=Ln(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],a=e.dilations,i=e.group,s=e.kernelShape,u=e.pads,d=e.strides,l=e.wIsConst(),f=e.outputPadding,c=e.outputShape;return{autoPad:n,format:r,dilations:a,group:i,kernelShape:s,outputPadding:f,outputShape:c,pads:u,strides:d,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},eu=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[0];if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let a=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==a))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.reduce((s,u)=>s+u,0)>0&&t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.reduce((s,u)=>s+u,0)>0&&t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.reduce((s,u)=>s+u,0)>0&&t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.outputPadding.length!==i&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(t.kernelShape.reduce((s,u)=>s+u,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Ui=(e,t,r,n)=>{let a=e.kernelCustomData.wT??e.compute(Me(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=a);let i=[t[0],a];t.length===3&&i.push(t[2]),e.compute(lf(i,r,n),{inputs:i})},tu=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let a=t.kernelShape;(a.length===0||a[0]===0)&&(a=[e.inputs[1].dims[2]]);let i=t.dilations;(i.length===0||i[0]===0)&&(i=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let u=t.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],s=[1].concat(s),i=[1].concat(i),a=[1].concat(a);let d=t.outputPadding;d=[0].concat(d);let l=Pi({...t,pads:u,strides:s,dilations:i,kernelShape:a,outputPadding:d},n);Ui(e,n,l,f=>r?[f[0],f[2],f[3]]:[f[0],f[1],f[3]])},pf=(e,t)=>{if(eu(e.inputs,t),e.inputs[0].dims.length===3)tu(e,t);else{let r=Pi(t,e.inputs);Ui(e,e.inputs,r)}}}),ru,ff,cf,Wm=P(()=>{ee(),ne(),ve(),ae(),ru=(e,t,r,n)=>{let a=O.size(t),i=t.length,s=R("input",e,i),u=H("output",e,i),d=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),l=O.normalizeAxis(d,i),f=c=>{let m=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,g=j("uniforms.input_shape","uniforms.axis",i),_=n.reverse?m+(n.exclusive?" + 1":""):"0",b=n.reverse?g:m+(n.exclusive?"":" + 1");return`
                ${c.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,u)}
                ${c.mainStart()}
                  ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${_};
                  let last : i32 = ${b};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},{type:12,data:l},...Q(t,t)]}),getShaderSource:f}},ff=(e,t)=>{let r=e.inputs[0].dims,n=e.inputs[0].dataType,a=e.inputs[1];e.compute(ru(n,r,a,t),{inputs:[0]})},cf=e=>{let t=e.exclusive===1,r=e.reverse===1;return pe({exclusive:t,reverse:r})}}),iu,nu,au,hf,mf,Vm=P(()=>{ee(),ne(),ve(),ae(),iu=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},nu=(e,t,r,n)=>{let a=[];a.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<t;++i)a.push(r.indicesSet("a",e[i],`i[${i}]`));return a.push("return a;}"),a.join(`
`)},au=(e,t)=>{let r,n,a,i,s,u,d=t.format==="NHWC",l=t.blocksize,f=t.mode==="DCR";d?([r,n,a,i]=e.dims,s=f?[r,n,a,l,l,i/l**2]:[r,n,a,i/l**2,l,l],u=f?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,n,a,i]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=f?[r,l,l,i/l**2,n,a]:[r,i/l**2,l,l,n,a],u=f?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let c=e.reshape(s),m=c.dims.length,g=e.dataType,_=R("a",g,m),b=H("output",g,m),x=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(_,b)}

  ${nu(u,m,_,b)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${b.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${b.setByOffset("global_idx",_.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:$=>{let w=d?[r,n*l,a*l,i/l**2]:[r,i/l**2,n*l,a*l],S=O.size(w),k=c.dims,T=O.sortBasedOnPerm(k,u);return{outputs:[{dims:w,dataType:$[0].dataType}],dispatchGroup:{x:Math.ceil(S/64)},programUniforms:[{type:12,data:S},...Q(k,T)]}},getShaderSource:x}},hf=(e,t)=>{iu(e.inputs),e.compute(au(e.inputs[0],t))},mf=e=>pe({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Er,Qt,qi,su,ou,uu,lu,Wi,du,gf,_f,Lm=P(()=>{ee(),ne(),ve(),ae(),Er="[a-zA-Z]|\\.\\.\\.",Qt="("+Er+")+",qi="^"+Qt+"$",su="("+Qt+",)*"+Qt,ou="^"+su+"$",uu=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},lu=class{constructor(e,t){var a;this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,n]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(ou)))throw new Error("Invalid LHS term");if(r.split(",").forEach((i,s)=>{let u=e[s].dims.slice();if(!i.match(RegExp(qi)))throw new Error("Invalid LHS term");let d=this.processTerm(i,!0,u,s);this.lhs.push(d)}),n==="")n+=[...this.symbolToInfo.entries()].filter(([i,s])=>s.count===1||i==="...").map(([i])=>i).join("");else if(!n.match(RegExp(Qt)))throw new Error("Invalid RHS");(a=n.match(RegExp(Er,"g")))==null||a.forEach(i=>{if(i==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let s=this.symbolToInfo.get(i);if(s===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(s.dimValue)}}),this.rhs=this.processTerm(n,!1,this.outputDims)}addSymbol(e,t,r){let n=this.symbolToInfo.get(e);if(n!==void 0){if(n.dimValue!==t&&n.count!==1)throw new Error("Dimension mismatch");n.count++,n.inputIndices.push(r)}else n={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,n)}processTerm(e,t,r,n=-1){let a=r.length,i=!1,s=[],u=0;if(!e.match(RegExp(qi))&&!t&&e!=="")throw new Error("Invalid LHS term");let d=e.match(RegExp(Er,"g")),l=new uu(n);return d==null||d.forEach((f,c)=>{if(f==="..."){if(i)throw new Error("Only one ellipsis is allowed per input term");i=!0;let m=a-d.length+1;if(m<0)throw new Error("Ellipsis out of bounds");if(s=r.slice(u,u+m),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let g=0;g<s.length;g++){let _=String.fromCharCode(48+g);l.addSymbol(_,c+g),this.addSymbol(_,r[u++],n)}}else l.addSymbol(f,c+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(f,r[u++],n)}),l}},Wi=e=>e+"_max",du=(e,t,r,n)=>{let a=e.map(l=>l.length).map((l,f)=>R(`input${f}`,t,l)),i=O.size(n),s=H("output",t,n.length),u=[...r.symbolToInfo.keys()].filter(l=>!r.rhs.symbolToIndices.has(l)),d=l=>{let f=[],c="var prod = 1.0;",m="var sum = 0.0;",g="sum += prod;",_=[],b=[],x=[],$=[],w=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((k,T)=>{var E;if(r.rhs.symbolToIndices.has(T)){let z=(E=r.rhs.symbolToIndices.get(T))==null?void 0:E[0];z!==void 0&&r.lhs.forEach((C,A)=>{if(k.inputIndices.includes(A)){let q=C.symbolToIndices.get(T);if(q===void 0)throw new Error("Invalid symbol error");q.forEach(X=>{f.push(`${a[A].indicesSet(`input${A}Indices`,X,s.indicesGet("outputIndices",z))}`)})}})}else r.lhs.forEach((z,C)=>{if(k.inputIndices.includes(C)){let A=z.symbolToIndices.get(T);if(A===void 0)throw new Error("Invalid symbol error");A.forEach(q=>{_.push(`${a[C].indicesSet(`input${C}Indices`,q,`${T}`)}`)}),$.push(`prod *= ${a[C].getByIndices(`input${C}Indices`)};`)}}),b.push(`for(var ${T}: u32 = 0; ${T} < uniforms.${Wi(T)}; ${T}++) {`),x.push("}")});let S=w?[...f,`let sum = ${a.map((k,T)=>k.getByIndices(`input${T}Indices`)).join(" * ")};`]:[...f,m,...b,..._,c,...$,g,...x];return`
            ${l.registerUniforms(u.map(k=>({name:`${Wi(k)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...a,s)}

            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${a.map((k,T)=>`var input${T}Indices: ${a[T].type.indices};`).join(`
`)}
            ${S.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let l=u.filter(c=>r.symbolToInfo.has(c)).map(c=>{var m;return{type:12,data:((m=r.symbolToInfo.get(c))==null?void 0:m.dimValue)||0}});l.push({type:12,data:i});let f=e.map((c,m)=>[...Q(c)]).reduce((c,m)=>c.concat(m),l);return f.push(...Q(n)),{outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:f}},getShaderSource:d}},gf=(e,t)=>{let r=new lu(e.inputs,t.equation),n=r.outputDims,a=e.inputs.map((i,s)=>i.dims);e.compute(du(a,e.inputs[0].dataType,r,n))},_f=e=>{let t=e.equation.replace(/\s+/g,"");return pe({equation:t})}}),pu,Vi,fu,cu,yf,Gm=P(()=>{ee(),ne(),ae(),pu=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=r.length<t.length?0:r.length-t.length,a=t.length<r.length?0:t.length-r.length;for(;n<r.length&&a<t.length;++n,++a)if(r[n]!==t[a]&&r[n]!==1&&t[a]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Vi=(e,t)=>{let r=e.length-t.length,n=[];for(let a=0;a<r;++a)n.push(e[a]);for(let a=0;a<t.length;++a)n.push(t[a]===1?e[a+r]:t[a]);return n},fu=(e,t)=>e.length>t.length?Vi(e,t):Vi(t,e),cu=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=fu(t,r),a=e[0].dataType,i=a===9||O.size(t)===1,s=a===9||t.length>0&&t[t.length-1]%4===0?4:1,u=i||n.length>0&&n[n.length-1]%4===0?4:1,d=Math.ceil(O.size(n)/u),l=c=>{let m=R("input",a,t.length,s),g=H("output",a,n.length,u),_;if(a===9){let b=(x,$,w="")=>`
          let outputIndices${$} = ${g.offsetToIndices(`outputOffset + ${$}u`)};
          let offset${$} = ${m.broadcastedIndicesToOffset(`outputIndices${$}`,g)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${x}[${$}] = ${w}(${m.getByOffset(`index${$}`)}[component${$}]);
        `;_=`
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${b("data",0,"u32")}
        ${b("data",1,"u32")}
        ${b("data",2,"u32")}
        ${b("data",3,"u32")}
        ${g.setByOffset("global_idx","data")}
      }`}else _=`
        let outputIndices = ${g.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${m.broadcastedIndicesToOffset("outputIndices",g)};
        let data = ${g.type.value}(${m.getByOffset(`inputOffset / ${s}`)});
        ${g.setByOffset("global_idx","data")}
      }`;return`
    ${c.registerUniform("vec_size","u32").declareVariables(m,g)}
    ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${_}`},f=[{type:12,data:d},...Q(t,n)];return{name:"Expand",shaderCache:{hint:`${n.length};${s}${u}`,inputDependencies:["rank"]},getShaderSource:l,getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:f})}},yf=e=>{pu(e.inputs),e.compute(cu(e.inputs),{inputs:[0]})}}),hu,bf,Hm=P(()=>{ee(),ne(),ae(),Vn(),hu=e=>{let t=e[0].dataType,r=O.size(e[0].dims),n=O.size(e[1].dims),a=n%4===0,i=s=>{let u=R("x",t,[1],4),d=R("bias",t,[1],4),l=H("y",t,[1],4),f=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],c=g=>`
      let bias${g}_offset: u32 = (global_idx * 4 + ${g}) % uniforms.bias_size;
      let bias${g} = ${d.getByOffset(`bias${g}_offset / 4`)}[bias${g}_offset % 4];`,m=a?`
      let bias = ${d.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${c(0)}${c(1)}${c(2)}${c(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(f).declareVariables(u,d,l)}

    ${yn(Ee(t))}

    ${s.mainStart(Ut)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${m}
      let x_in = x + bias;
      ${l.setByOffset("global_idx",bn("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${a}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(r/Ut/4)}})}},bf=e=>{e.inputs.length<2||O.size(e.inputs[1].dims)===0?Pp(e):e.compute(hu(e.inputs))}}),mu,gu,wf,$f,Fm=P(()=>{ee(),ne(),ve(),ae(),mu=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},gu=(e,t)=>{let r=e[0].dims,n=e[1].dims,a=r.length,i=O.normalizeAxis(t.axis,a),s=r.slice(0);s.splice(i,1,...n);let u=r[i],d=e[0].dataType===9?4:1,l=Math.ceil(O.size(s)/d),f=[{type:12,data:l},{type:6,data:u},{type:12,data:i},...Q(e[0].dims,e[1].dims,s)],c=m=>{let g=R("data",e[0].dataType,e[0].dims.length,d),_=R("inputIndices",e[1].dataType,e[1].dims.length),b=H("output",e[0].dataType,s.length,d),x=w=>{let S=n.length,k=`var indicesIndices${w}  = ${_.type.indices}(0);`;for(let T=0;T<S;T++)k+=`${S>1?`indicesIndices${w}[${T}]`:`indicesIndices${w}`} = ${s.length>1?`outputIndices${w}[uniforms.axis + ${T}]`:`outputIndices${w}`};`;k+=`
          var idx${w} = ${_.getByIndices(`indicesIndices${w}`)};
          if (idx${w} < 0) {
            idx${w} = idx${w} + uniforms.axisDimLimit;
          }
          var dataIndices${w} : ${g.type.indices};
        `;for(let T=0,E=0;T<a;T++)T===i?(k+=`${a>1?`dataIndices${w}[${T}]`:`dataIndices${w}`} = u32(idx${w});`,E+=S):(k+=`${a>1?`dataIndices${w}[${T}]`:`dataIndices${w}`} = ${s.length>1?`outputIndices${w}[${E}]`:`outputIndices${w}`};`,E++);return k},$;if(e[0].dataType===9){let w=(S,k,T="")=>`
          let outputIndices${k} = ${b.offsetToIndices(`outputOffset + ${k}u`)};
          ${x(k)};
          let offset${k} = ${g.indicesToOffset(`dataIndices${k}`)};
          let index${k} = offset${k} / 4u;
          let component${k} = offset${k} % 4u;
          ${S}[${k}] = ${T}(${g.getByOffset(`index${k}`)}[component${k}]);
        `;$=`
        let outputOffset = global_idx * ${d};
        var value = vec4<u32>(0);
        ${w("value",0,"u32")}
        ${w("value",1,"u32")}
        ${w("value",2,"u32")}
        ${w("value",3,"u32")}
        ${b.setByOffset("global_idx","value")}
      `}else $=`
      let outputIndices = ${b.offsetToIndices("global_idx")};
      ${x("")};
      let value = ${g.getByIndices("dataIndices")};
      ${b.setByOffset("global_idx","value")};
      `;return`
      ${m.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(g,_,b)}
      ${m.mainStart()}
        ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${$}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f}),getShaderSource:c}},wf=e=>pe({axis:e.axis}),$f=(e,t)=>{let r=e.inputs;mu(r),e.compute(gu(e.inputs,t))}}),_u,vf,xf,jm=P(()=>{ee(),ne(),ae(),_u=(e,t,r,n,a,i,s,u,d)=>{let l=[{type:12,data:i},{type:12,data:n},{type:12,data:a},{type:12,data:r},{type:12,data:s},{type:12,data:u},{type:12,data:d}],f=[i];l.push(...Q(t.dims,f));let c=m=>{let g=R("indices_data",t.dataType,t.dims.length),_=H("input_slice_offsets_data",12,1,1),b=[g,_],x=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:a.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${m.registerUniforms(x).declareVariables(...b)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${a.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${a.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:f,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:l}),getShaderSource:c},{inputs:[t],outputs:[-1]})[0]},vf=(e,t)=>{let r=e.inputs,n=r[0].dims,a=r[0].dataType,i=r[1].dims,s=i[i.length-1],u=O.sizeToDimension(i,i.length-1),d=O.sizeFromDimension(n,t.batchDims+s),l=O.sizeToDimension(n,t.batchDims),f=O.sizeFromDimension(n,t.batchDims),c=u/l,m=new Array(s),g=d;for(let k=0;k<s;++k)m[s-1-k]=g,g*=n[t.batchDims+s-1-k];let _=_u(e,r[1],m,t.batchDims,n,u,c,f,s),b=t.batchDims+s;if(b>n.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let x=i.slice(0,-1).concat(n.slice(b)),$=O.size(x),w=[{type:12,data:$},{type:12,data:d},...Q(r[0].dims,_.dims,x)],S=k=>{let T=R("data",r[0].dataType,r[0].dims.length),E=R("slice_offsets",12,_.dims.length),z=H("output",r[0].dataType,x.length);return`
          ${k.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(T,E,z)}
            ${k.mainStart()}
            ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:x,dataType:a}],dispatchGroup:{x:Math.ceil($/64)},programUniforms:w}),getShaderSource:S},{inputs:[r[0],_]})},xf=e=>({batchDims:e.batch_dims,cacheKey:""})}),yu,bu,kf,Sf,Km=P(()=>{ee(),ne(),ve(),ae(),yu=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=O.normalizeAxis(t.quantizeAxis,e[0].dims.length),n=t.blockSize,a=e[0],i=e[2],s=e.length===4?e[3]:void 0;if(i.dims.length!==a.dims.length||!a.dims.map((u,d)=>d===r?Math.ceil(u/n)===i.dims[d]:u===i.dims[d]).reduce((u,d)=>u&&d,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==a.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==i.dims.length||!s.dims.map((u,d)=>u===i.dims[d]).reduce((u,d)=>u&&d,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},bu=(e,t)=>{let r=e[0].dims,n=e[1].dims,a=r.length,i=O.normalizeAxis(t.gatherAxis,a),s=O.normalizeAxis(t.quantizeAxis,a),u=r.slice(0);u.splice(i,1,...n);let d=O.size(u),l=e[2].dataType,f=e[0].dataType===22,c=[{type:12,data:d},{type:12,data:s},{type:12,data:i},{type:12,data:t.blockSize},...Q(...e.map((g,_)=>g.dims),u)],m=g=>{let _=R("data",e[0].dataType,e[0].dims.length),b=R("inputIndices",e[1].dataType,e[1].dims.length),x=R("scales",e[2].dataType,e[2].dims.length),$=e.length>3?R("zeroPoint",e[3].dataType,e[3].dims.length):void 0,w=H("output",l,u.length),S=[_,b,x];$&&S.push($);let k=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${g.registerUniforms(k).declareVariables(...S,w)}
        ${g.mainStart()}
        let output_indices = ${w.offsetToIndices("global_idx")};
        var indices_indices = ${b.type.indices}(0);
        ${n.length>1?`
          for (var i: u32 = 0; i < ${n.length}; i++) {
            let index = ${w.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${b.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${w.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${_.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${w.indicesGet("output_indices","i")};
          ${_.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${b.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[i]};
        }
        ${_.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${w.indicesGet("output_indices",`i + ${n.length} - 1`)};
          ${_.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${_.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${_.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${x.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${x.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${x.getByIndices("scale_indices")};
        ${$?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${$.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${$.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Ee(l)}(quantized_data - zero_point) * scale;
        ${w.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((g,_)=>_!==1).map(g=>g.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(g,_)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:l}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:m}},kf=(e,t)=>{let r=e.inputs;yu(r,t),e.compute(bu(e.inputs,t))},Sf=e=>pe({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),wu,$u,Tf,If,Zm=P(()=>{ee(),ne(),ve(),ae(),wu=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},$u=(e,t)=>{let r=e[0].dims,n=e[0].dataType,a=r.length,i=e[1].dims,s=e[1].dataType,u=O.normalizeAxis(t.axis,a),d=r[u],l=i.slice(0),f=O.size(l),c=R("input",n,a),m=R("indicesInput",s,i.length),g=H("output",n,l.length),_=[{type:12,data:f},{type:6,data:d},{type:12,data:u}];return _.push(...Q(r,i,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:_}),getShaderSource:b=>`
      ${b.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(c,m,g)}
      ${b.mainStart()}
      ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${g.offsetToIndices("global_idx")};

      var idx = ${m.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${c.type.indices}(outputIndices);
      ${c.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${c.getByIndices("inputIndices")};

      ${g.setByOffset("global_idx","value")};
  }`}},Tf=e=>pe({axis:e.axis}),If=(e,t)=>{let r=e.inputs;wu(r),e.compute($u(e.inputs,t))}}),vu,xu,Ef,zf,Qm=P(()=>{ee(),ne(),ae(),vu=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},xu=(e,t)=>{let r=e[0].dims.slice(),n=e[1].dims.slice(),[a,i,s]=Sd.getShapeOfGemmResult(r,t.transA,n,t.transB,e.length===3?e[2].dims:void 0),u=[a,i];if(!u)throw new Error("Can't use gemm on the given tensors");let d=16,l=Math.ceil(i/d),f=Math.ceil(a/d),c=!0,m=O.size(u),g=[{type:12,data:c?l:m},{type:12,data:a},{type:12,data:i},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],_=["type","type"];e.length===3&&(g.push(...Q(e[2].dims)),_.push("rank")),g.push(...Q(u));let b=$=>{let w="";t.transA&&t.transB?w="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?w="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?w="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(w="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let S=t.alpha===1?"":"value *= uniforms.alpha;",k=R("a",e[0].dataType,e[0].dims),T=R("b",e[1].dataType,e[1].dims),E=k.type.value,z=null,C=[k,T];e.length===3&&(z=R("c",e[2].dataType,e[2].dims.length),C.push(z));let A=H("output",e[0].dataType,u.length);C.push(A);let q=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${$.registerUniforms(q).declareVariables(...C)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${E}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${w}
    }

    ${S}
    ${z!=null?`let cOffset = ${z.broadcastedIndicesToOffset("vec2(m, n)",A)}; value += ${E}(uniforms.beta) * ${z.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},x=$=>{let w=R("a",e[0].dataType,e[0].dims),S=R("b",e[1].dataType,e[1].dims),k=null,T=[w,S];e.length===3&&(k=R("c",e[2].dataType,e[2].dims.length),T.push(k));let E=H("output",e[0].dataType,u.length);T.push(E);let z=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],C="",A="";t.transA&&t.transB?(A=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,C="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(A=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,C="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(A=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,C="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(A=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,C="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let q=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${$.registerUniforms(z).declareVariables(...T)}
  var<workgroup> tile_a: array<array<${w.type.storage}, ${d}>, ${d}>;
  var<workgroup> tile_b: array<array<${S.type.storage}, ${d}>, ${d}>;
  ${$.mainStart([d,d,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${d};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${d};
    let num_tiles = (uniforms.K - 1) / ${d} + 1;
    var k_start = 0u;
    var value = ${E.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${A}
      k_start = k_start + ${d};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${d}; k++) {
        ${C}
      }
      workgroupBarrier();
    }

    ${q}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${k!=null?`let cOffset = ${k.broadcastedIndicesToOffset("vec2(m, n)",E)}; value += ${E.type.value}(uniforms.beta) * ${k.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return c?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:l*f},programUniforms:g}),getShaderSource:x}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:g}),getShaderSource:b}},Ef=e=>{let t=e.transA,r=e.transB,n=e.alpha,a=e.beta;return{transA:t,transB:r,alpha:n,beta:a,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},zf=(e,t)=>{vu(e.inputs),e.compute(xu(e.inputs,t))}}),Xe,it,wt,$t,ku,Su,Tu,Iu,Eu,zu,Cu,Ou,Cf,Of,Xm=P(()=>{ee(),ne(),ve(),ae(),[Xe,it,wt,$t]=[0,1,2,3],ku=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Su=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,Tu=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,Iu=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Eu=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,zu=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${Xe}] = batch;
     indices[${it}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${wt}] = u32(r);
            indices[${$t}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${wt}] = u32(clamp(r, 0, H - 1));
          indices[${$t}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${wt}] = gs_reflect(r, border[1], border[3]);
          indices[${$t}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Cu=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Xe}], indices[${it}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Xe}], indices[${it}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Xe}], indices[${it}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Xe}], indices[${it}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Xe}], indices[${it}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Xe}], indices[${it}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,Ou=(e,t)=>{let r=R("x",e[0].dataType,e[0].dims.length),n=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],a=R("grid",e[1].dataType,n.length,2),i=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(i=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[Xe,it,wt,$t]=[0,3,1,2]);let s=H("output",e[0].dataType,i.length),u=r.type.value,d=O.size(i),l=[{type:12,data:d},...Q(e[0].dims,n,i)],f=c=>`
  ${c.registerUniform("output_size","u32").declareVariables(r,a,s)}
  ${Su}
  ${Tu(u)}
  ${Iu(t)}
  ${Eu(t)}
  ${zu(r,u,t)}

  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${wt}]);
      let W_in = i32(uniforms.x_shape[${$t}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${Xe}], indices[${wt}], indices[${$t}]);
      let nxy = ${a.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Cu(s,u,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:c=>{let m=O.size(i);return{outputs:[{dims:i,dataType:c[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:l}},getShaderSource:f}},Cf=(e,t)=>{ku(e.inputs),e.compute(Ou(e.inputs,t))},Of=e=>pe({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Oe,Au,Af,Li,Bu,nr,Bf,Rf=P(()=>{ee(),ne(),ve(),Pn(),Wn(),ae(),gt(),Oe=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Au=(e,t)=>{let r=e[0],n=Oe(e,1),a=Oe(e,2),i=Oe(e,3),s=Oe(e,4),u=Oe(e,5),d=Oe(e,6),l=Oe(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let f=r.dims[0],c=r.dims[1],m=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],g=c,_=0,b=0,x=Math.floor(m/t.numHeads);if(d&&l&&O.size(d.dims)&&O.size(l.dims)){if(d.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(d.dims[0]!==f||d.dims[1]!==t.numHeads||d.dims[3]!==x)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[0]!==f||l.dims[1]!==t.numHeads||l.dims[3]!==x)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[2]!==l.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(l.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');_=d.dims[2],b=d.dims[2]}else if(d&&O.size(d.dims)||l&&O.size(l.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $;if(n&&O.size(n.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(n.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');$=2,g=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==x)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');$=5,g=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==x)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');$=0,g=n.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}if(i&&O.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(n&&n.dims.length===5&&n.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let w=_+g,S=0;if(s&&O.size(s.dims)>0){S=8;let z=s.dims;throw z.length===1?z[0]===f?S=1:z[0]===3*f+2&&(S=3):z.length===2&&z[0]===f&&z[1]===w&&(S=5),S===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let k=!1,T=m;if(a&&O.size(a.dims)>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(g!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');T=a.dims[2]}else{if(g!==a.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');T=a.dims[1]*a.dims[3],k=!0}}let E=!1;if(s&&O.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(u&&O.size(u.dims)>0){if(u.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==f||u.dims[1]!==t.numHeads||u.dims[2]!==c||u.dims[3]!==w)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:f,sequenceLength:c,pastSequenceLength:_,kvSequenceLength:g,totalSequenceLength:w,maxSequenceLength:b,inputHiddenSize:0,hiddenSize:m,vHiddenSize:T,headSize:x,vHeadSize:Math.floor(T/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:S,scale:t.scale,broadcastResPosBias:E,passPastInKv:k,qkvFormat:$}},Af=e=>pe({...e}),Li=pe({perm:[0,2,1,3]}),Bu=(e,t,r,n,a,i,s)=>{let u=[n,a,i],d=O.size(u),l=[{type:12,data:d},{type:12,data:s},{type:12,data:i}],f=c=>{let m=H("qkv_with_bias",t.dataType,u),g=R("qkv",t.dataType,u),_=R("bias",r.dataType,u),b=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${c.registerUniforms(b).declareVariables(g,_,m)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:l}),getShaderSource:f},{inputs:[t,r],outputs:[-1]})[0]},nr=(e,t,r,n,a,i,s,u)=>{let d=i;if(s&&O.size(s.dims)>0){if(n===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return d=Bu(e,i,s,t,n,r*a,u),d=d.reshape([t,n,r,a]),r===1||n===1?d:e.compute(Me(d,Li.perm),{inputs:[d],outputs:[-1]})[0]}else return i.dims.length===3&&(d=i.reshape([t,n,r,a])),r===1||n===1?d:e.compute(Me(d,Li.perm),{inputs:[d],outputs:[-1]})[0]},Bf=(e,t)=>{let r=Au(e.inputs,t),n=e.inputs[0],a=Oe(e.inputs,1),i=Oe(e.inputs,2),s=Oe(e.inputs,3),u=Oe(e.inputs,4),d=Oe(e.inputs,5),l=Oe(e.inputs,6),f=Oe(e.inputs,7);if(n.dims.length===5)throw new Error("Packed QKV is not implemented");if((a==null?void 0:a.dims.length)===5)throw new Error("Packed KV is not implemented");let c=a&&i&&a.dims.length===4&&i.dims.length===4,m=nr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,s,0);if(c)return or(e,m,a,i,u,void 0,l,f,d,r);if(!a||!i)throw new Error("key and value must be provided");let g=nr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,a,s,r.hiddenSize),_=nr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,s,2*r.hiddenSize);or(e,m,g,_,u,void 0,l,f,d,r)}}),Ru,Nu,Mu,Du,kn,Nf,Mf,Df=P(()=>{ee(),ne(),ve(),ae(),Ru=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Nu=(e,t)=>{let r=[],n=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(a=>r.push(Number(a))),n=r.length),pe({numOutputs:n,axis:t.axis,splitSizes:r})},Mu=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${j("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Du=e=>{let t=e.length,r=[];for(let n=0;n<t;++n){let a=e[n].setByIndices("indices","input[global_idx]");t===1?r.push(a):n===0?r.push(`if (output_number == ${n}u) { ${a} }`):n===t-1?r.push(`else { ${a} }`):r.push(`else if (output_number == ${n}) { ${a} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},kn=(e,t)=>{let r=e[0].dims,n=O.size(r),a=e[0].dataType,i=O.normalizeAxis(t.axis,r.length),s=new Array(t.numOutputs),u=R("input",a,r.length),d=new Array(t.numOutputs),l=[],f=[],c=0,m=[{type:12,data:n}];for(let _=0;_<t.numOutputs;_++){c+=t.splitSizes[_],d[_]=c;let b=r.slice();b[i]=t.splitSizes[_],f.push(b),s[_]=H(`output${_}`,a,b.length),l.push({dims:f[_],dataType:e[0].dataType})}m.push({type:12,data:d},...Q(r,...f));let g=_=>`
  ${_.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",d.length).declareVariables(u,...s)}
  ${Mu(d.length)}
  ${Du(s)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${j("uniforms.size_in_split_axis","output_number - 1u",d.length)};
      ${u.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:g,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:m})}},Nf=(e,t)=>{Ru(e.inputs);let r=e.inputs.length===1?t:Nu(e.inputs,t);e.compute(kn(e.inputs,r),{inputs:[0]})},Mf=e=>{let t=e.axis,r=e.splitSizes,n=e.numOutputs<0?r.length:e.numOutputs;if(n!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return pe({axis:t,numOutputs:n,splitSizes:r})}}),Pu,qr,Pf,Uf=P(()=>{ee(),ne(),ve(),ae(),Pu=(e,t)=>{let[r,n,a,i]=e,{numHeads:s,rotaryEmbeddingDim:u}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!O.areEqual(n.dims,[])&&!O.areEqual(n.dims,[1])&&n.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!O.areEqual(a.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let d=r.dims[0],l=r.dims[r.dims.length-2],f=a.dims[0],c=O.sizeFromDimension(r.dims,1)/l,m=u===0?a.dims[1]*2:c/s;if(u>m)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(n.dims.length===2){if(d!==n.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(l!==n.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(m/2!==a.dims[1]&&u/2!==a.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${a.dims[1]}`);if(l>f)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},qr=(e,t)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:a,scale:i}=t,s=e[0].dims[0],u=O.sizeFromDimension(e[0].dims,1),d=e[0].dims[e[0].dims.length-2],l=u/d,f=e[2].dims[1],c=a===0?f*2:l/n,m=new Array(s,d,l/c,c-f),g=O.computeStrides(m),_=[{type:1,data:i},{type:12,data:m},{type:12,data:g},...e[0].dims.length===3?new Array({type:12,data:[u,l,c,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[u,c,d*c,1]}):[],...Q(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],b=x=>{let $=R("input",e[0].dataType,e[0].dims.length),w=R("position_ids",e[1].dataType,e[1].dims.length),S=R("cos_cache",e[2].dataType,e[2].dims.length),k=R("sin_cache",e[3].dataType,e[3].dims.length),T=H("output",e[0].dataType,e[0].dims.length);return x.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:m.length},{name:"global_strides",type:"u32",length:g.length},{name:"input_output_strides",type:"u32",length:g.length}]),`
        ${x.declareVariables($,w,S,k,T)}

        ${x.mainStart(Ut)}
          let half_rotary_emb_dim = uniforms.${S.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${w.broadcastedIndicesToOffset("bsnh.xy",H("",w.type.tensor,2))};
            let position_id =
                u32(${w.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${$.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} -
                ${$.getByOffset("j")} * ${k.get("position_id","bsnh[3]")};
            ${T.setByOffset("i","re")}
            let im = ${$.getByOffset("i")} * ${k.get("position_id","bsnh[3]")} +
                ${$.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${T.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${T.setByOffset("k",$.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:pe({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(O.size(m)/Ut)},programUniforms:_})}},Pf=(e,t)=>{Pu(e.inputs,t),e.compute(qr(e.inputs,t))}}),Uu,qu,Gi,Wu,qf,Ym=P(()=>{ve(),ee(),Wn(),Rf(),Df(),gt(),Uf(),ae(),Uu=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],n=e[1],a=e[2],i=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,d=r.dims[0],l=r.dims[1],f=r.dims.length===3?u?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],c=l,m=0,g=!n||n.dims.length===0,_=Math.floor(g?f/(t.numHeads+2*t.kvNumHeads):f/t.numHeads);g&&(f=_*t.numHeads);let b=i&&i.dims.length!==0,x=s&&s.dims.length!==0;if(b&&i.dims.length===4&&i.dims[0]===d&&i.dims[1]!==t.kvNumHeads&&i.dims[2]===t.kvNumHeads&&i.dims[3]===_)throw new Error("BSNH pastKey/pastValue is not supported");if(b&&x){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=i.dims[2]}else if(b||x)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $=1;if(n&&n.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(r.dims[2]%n.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');c=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==_)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');c=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==_)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');c=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}let w=0,S=!1,k=t.kvNumHeads?_*t.kvNumHeads:f;if(a&&a.dims.length>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(c!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');k=a.dims[2]}else{if(c!==a.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');k=a.dims[1]*a.dims[3],S=!0}}let T=e.length>4?e[5]:void 0;if(T&&T.dims.length!==1&&T.dims[0]!==d)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:d,sequenceLength:l,pastSequenceLength:m,kvSequenceLength:c,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:f,vHiddenSize:k,headSize:_,vHeadSize:Math.floor(k/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:S,qkvFormat:$}},qu=pe({perm:[0,2,1,3]}),Gi=(e,t,r)=>{let n=t,a=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(n=t.reshape([r.batchSize,r.kvSequenceLength,a,r.headSize]),n=e.compute(Me(n,qu.perm),{inputs:[n],outputs:[-1]})[0]),n},Wu=(e,t,r,n)=>{let a=7,i=["type","type"],s=[e*t],u=e*t,d=[{type:12,data:u},{type:12,data:t},{type:12,data:e}],l=f=>{let c=R("seq_lens",r.dataType,r.dims),m=R("total_seq_lens",n.dataType,n.dims),g=H("pos_ids",a,s),_=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${f.registerUniforms(_).declareVariables(c,m,g)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${m.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${c.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${g.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${g.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${g.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:i},getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:l}},qf=(e,t)=>{var k;let r=Uu(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(((k=e.inputs[1])==null?void 0:k.dims.length)===5)throw new Error("Packed KV is not implemented");let n=e.inputs[0],a=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,i=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,u=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,d=e.inputs.length>4?e.inputs[5]:void 0,l=e.inputs.length>5?e.inputs[6]:void 0,f=r.kvNumHeads?r.kvNumHeads:r.numHeads,c=pe({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,f*r.headSize,f*r.headSize]}),[m,g,_]=!a&&!i?e.compute(kn([n],c),{inputs:[n],outputs:[-1,-1,-1]}):[n,a,i],b,x;if(t.doRotary){let T=e.compute(Wu(r.batchSize,r.sequenceLength,d,l),{inputs:[d,l],outputs:[-1]})[0],E=e.inputs[7],z=e.inputs[8],C=pe({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),A=[m,T,E,z],q=[-1];b=e.compute(qr(A,C),{inputs:A,outputs:q})[0],A.splice(0,1,g);let X=pe({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});x=e.compute(qr(A,X),{inputs:A,outputs:q})[0]}let $=nr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?b:m,void 0,0),w=Gi(e,t.doRotary?x:g,r),S=Gi(e,_,r);or(e,$,w,S,void 0,void 0,s,u,void 0,r,d,l)}}),Hi,Vu,Lu,Wf,Jm=P(()=>{ee(),ne(),gt(),ae(),Hi=(e,t,r,n,a,i,s,u)=>{let d=$e(i),l=d===1?"f32":`vec${d}f`,f=d===1?"vec2f":`mat2x${d}f`,c=a*s,m=64;c===1&&(m=256);let g=[a,s,i/d],_=[a,s,2],b=["rank","type","type"],x=[];x.push(...Q(g,_));let $=w=>{let S=R("x",t.dataType,3,d),k=R("scale",r.dataType,r.dims),T=R("bias",n.dataType,n.dims),E=H("output",1,3,2),z=[S,k,T,E];return`
  var<workgroup> workgroup_shared : array<${f}, ${m}>;
  const workgroup_size = ${m}u;
  ${w.declareVariables(...z)}
  ${w.mainStart(m)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${l}(0);
    var squared_sum = ${l}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${l}(${S.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${f}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${mt("workgroup_shared[0][0]",d)} / f32(hight * ${d});
      let squared_sum_final = ${mt("workgroup_shared[0][1]",d)} / f32(hight * ${d});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${d};${u};${m}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:_,dataType:1}],dispatchGroup:{x:c},programUniforms:x}),getShaderSource:$},{inputs:[t,r,n],outputs:[-1]})[0]},Vu=(e,t,r)=>{let n=t[0].dims,a=n,i=2,s=n[0],u=n[1],d=O.sizeFromDimension(n,i),l=$e(d),f=O.size(a)/l,c=Hi(e,t[0],t[1],t[2],s,d,u,r.epsilon),m=[s,u,d/l],g=[s,u],_=["type","none"],b=x=>{let $=R("x",t[0].dataType,m.length,l),w=R("scale_shift",1,g.length,2),S=H("output",t[0].dataType,m.length,l),k=[$,w,S];return`
  ${x.registerUniform("output_size","u32").declareVariables(...k)}
  ${x.mainStart()}
  ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${S.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${w.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${$.getByOffset("global_idx")} * ${S.type.value}(scale_shift.x) + ${S.type.value}(scale_shift.y);
      ${S.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...Q(m,g,m)]}),getShaderSource:b},{inputs:[t[0],c]})},Lu=(e,t,r)=>{let n=t[0].dims,a=n,i=n[0],s=n[n.length-1],u=O.sizeFromDimension(n,1)/s,d=$e(s),l=O.size(a)/d,f=[{type:12,data:u},{type:12,data:Math.floor(s/d)}],c=["type","type"],m=!1,g=[0,n.length-1];for(let $=0;$<n.length-2;$++)m=m||n[$+1]!==1,g.push($+1);m=m&&n[n.length-1]!==1;let _=m?e.compute(Me(e.inputs[0],g),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:n.length},($,w)=>n[g[w]])),b=Hi(e,_,t[1],t[2],i,u,s,r.epsilon),x=$=>{let w=ke(t[0].dataType),S=d===1?"vec2f":`mat${d}x2f`,k=z=>{let C=z===0?"x":"y",A=d===1?"f32":`vec${d}f`;switch(d){case 1:return`${w}(${A}(scale.${C}))`;case 2:return`vec2<${w}>(${A}(scale[0].${C}, scale[1].${C}))`;case 4:return`vec4<${w}>(${A}(scale[0].${C}, scale[1].${C}, scale[2].${C}, scale[3].${C}))`;default:throw new Error(`Not supported compoents ${d}`)}},T=R("input",t[0].dataType,t[0].dims,d),E=H("output",t[0].dataType,a,d);return`
  @group(0) @binding(0) var<storage, read> input : array<${T.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${S}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${E.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${$.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${k(0)}, ${k(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${d}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f}),getShaderSource:x},{inputs:[t[0],b]})},Wf=(e,t)=>{t.format==="NHWC"?Lu(e,e.inputs,t):Vu(e,e.inputs,t)}}),Gu,Hu,Vf,eg=P(()=>{ee(),ne(),ae(),Gu=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Hu=(e,t,r)=>{let n=t.simplified,a=e[0].dims,i=e[1],s=!n&&e[2],u=a,d=O.normalizeAxis(t.axis,a.length),l=O.sizeToDimension(a,d),f=O.sizeFromDimension(a,d),c=O.size(i.dims),m=s?O.size(s.dims):0;if(c!==f||s&&m!==f)throw new Error(`Size of X.shape()[axis:] == ${f}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${c} and bias size of ${m}`);let g=[];for(let T=0;T<a.length;++T)T<d?g.push(a[T]):g.push(1);let _=$e(f),b=["type","type"],x=[{type:12,data:l},{type:1,data:f},{type:12,data:Math.floor(f/_)},{type:1,data:t.epsilon}];s&&b.push("type");let $=r>1,w=r>2,S=T=>{let E=ke(e[0].dataType),z=[R("x",e[0].dataType,e[0].dims,_),R("scale",i.dataType,i.dims,_)];s&&z.push(R("bias",s.dataType,s.dims,_)),z.push(H("output",e[0].dataType,u,_)),$&&z.push(H("mean_data_output",1,g)),w&&z.push(H("inv_std_output",1,g));let C=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${T.registerUniforms(C).declareVariables(...z)}
  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${mn("f32",_)};
    var mean_square_vector = ${mn("f32",_)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Dt(E,_,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${mt("mean_vector",_)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${mt("mean_square_vector",_)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Dt(E,_,"x[j + offset]")};
      let f32scale = ${Dt(E,_,"scale[j]")};
      output[j + offset] = ${z[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${Dt(E,_,"bias[j]")}`:""}
      );
    }

    ${$?"mean_data_output[global_idx] = mean":""};
    ${w?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},k=[{dims:u,dataType:e[0].dataType}];return $&&k.push({dims:g,dataType:1}),w&&k.push({dims:g,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${_};${r};${n}`,inputDependencies:b},getRunData:()=>({outputs:k,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:x}),getShaderSource:S}},Vf=(e,t)=>{Gu(e.inputs),e.compute(Hu(e.inputs,t,e.outputCount))}}),Fu,Lf,tg=P(()=>{ne(),Fn(),jn(),Fu=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Lf=e=>{Fu(e.inputs);let t=Pt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],n=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&n<8)e.compute(Hn(e.inputs,{activation:""},t));else{let a=t[t.length-2],i=O.size(e.inputs[0].dims.slice(0,-2)),s=O.size(e.inputs[1].dims.slice(0,-2));if(i!==1&&a===1&&s===1){let u=e.inputs[0].reshape([1,i,n]),d=e.inputs[1].reshape([1,n,r]),l=[1,i,r],f=[u,d];e.compute(Ur(f,{activation:""},t,l),{inputs:f})}else e.compute(Ur(e.inputs,{activation:""},t))}}}),ju,Ku,Zu,Gf,Hf,rg=P(()=>{ee(),ne(),ve(),ae(),ju=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],n=r.dims.length;if(r.dims[n-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let a=Math.floor((t.k+t.blockSize-1)/t.blockSize),i=t.blockSize/8*t.bits,s=e[1];if(!O.areEqual(s.dims,[t.n,a,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(O.size(u)!==t.n*a)throw new Error("scales input size error.");if(e.length===4){let d=e[3].dims,l=t.bits>4?t.n*a:t.n*Math.floor((a+1)/2);if(O.size(d)!==l)throw new Error("zeroPoints input size error.")}},Ku=(e,t)=>{let r=e[0].dims,n=r.length,a=r[n-2],i=t.k,s=t.n,u=r.slice(0,n-2),d=O.size(u),l=e[1].dims[2]/4,f=e[0].dataType,c=$e(t.k),m=$e(l),g=$e(s),_=u.concat([a,s]),b=a>1&&s/g%2===0?2:1,x=O.size(_)/g/b,$=64,w=[],S=[d,a,i/c],k=O.convertShape(e[1].dims).slice();k.splice(-1,1,l/m),w.push(...Q(S)),w.push(...Q(k)),w.push(...Q(e[2].dims)),e.length===4&&w.push(...Q(O.convertShape(e[3].dims)));let T=[d,a,s/g];w.push(...Q(T));let E=z=>{let C=S.length,A=R("a",e[0].dataType,C,c),q=R("b",12,k.length,m),X=R("scales",e[2].dataType,e[2].dims.length),G=[A,q,X],Z=e.length===4?R("zero_points",12,e[3].dims.length):void 0;Z&&G.push(Z);let oe=T.length,re=H("output",e[0].dataType,oe,g),L=ke(e[0].dataType),ie=(()=>{switch(c){case 1:return`array<${L}, 8>`;case 2:return`mat4x2<${L}>`;case 4:return`mat2x4<${L}>`;default:throw new Error(`${c}-component is not supported.`)}})(),F=()=>{let N=`
          // reuse a data
            var input_offset = ${A.indicesToOffset(`${A.type.indices}(batch, row, word_offset)`)};
            var a_data: ${ie};
            for (var j: u32 = 0; j < ${8/c}; j++) {
              a_data[j] = ${A.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let U=0;U<g*b;U++)N+=`
            b_value = ${m===1?`b${U}_data`:`b${U}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${ie}(${Array.from({length:4},(V,te)=>`${L}(b_value_lower[${te}]), ${L}(b_value_upper[${te}])`).join(", ")});
            b_dequantized_values = ${c===1?`${ie}(${Array.from({length:8},(V,te)=>`(b_quantized_values[${te}] - ${Z?`zero_point${U}`:"zero_point"}) * scale${U}`).join(", ")});`:`(b_quantized_values - ${ie}(${Array(8).fill(`${Z?`zero_point${U}`:"zero_point"}`).join(",")})) * scale${U};`};
            workgroup_shared[local_id.x * ${b} + ${Math.floor(U/g)}]${g>1?`[${U%g}]`:""} += ${Array.from({length:8/c},(V,te)=>`${c===1?`a_data[${te}] * b_dequantized_values[${te}]`:`dot(a_data[${te}], b_dequantized_values[${te}])`}`).join(" + ")};
          `;return N},Y=()=>{let N=`
            var col_index = col * ${g};
            ${Z?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${L}(8);`}
            `;for(let U=0;U<g*b;U++)N+=`
            let scale${U} = ${X.getByOffset("col_index * nBlocksPerCol + block")};
            ${Z?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${Z.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${U} = ${L}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return N},ye=()=>{let N=`col_index = col * ${g};`;for(let U=0;U<g*b;U++)N+=`
            let b${U}_data = ${q.getByIndices(`${q.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return N+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${ie};
            var b_dequantized_values: ${ie};`,N};return`
        var<workgroup> workgroup_shared: array<${re.type.value}, ${b*$}>;
        ${z.declareVariables(...G,re)}
        ${z.mainStart([$,1,1])}
          let output_indices = ${re.offsetToIndices(`(global_idx / ${$}) * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${$}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/c};
            ${Y()}
            for (var word: u32 = 0; word < ${l}; word += ${m}) {
              ${ye()}
              for (var i: u32 = 0; i < ${m}; i++) {
                ${F()}
                word_offset += ${8/c};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${b}) {
            var output_value: ${re.type.value} = ${re.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${$}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${b};
            }
            ${re.setByIndices(`${re.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${c};${m};${g};${b};${$}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:f}],dispatchGroup:{x},programUniforms:w}),getShaderSource:E}},Zu=(e,t)=>{let r=e[0].dims,n=r.length,a=r[n-2],i=t.k,s=t.n,u=r.slice(0,n-2),d=O.size(u),l=e[1].dims[2]/4,f=e[0].dataType,c=$e(t.k),m=$e(l),g=u.concat([a,s]),_=128,b=s%8===0?8:s%4===0?4:1,x=_/b,$=x*m*8,w=$/c,S=$/t.blockSize,k=O.size(g)/b,T=[],E=[d,a,i/c],z=O.convertShape(e[1].dims).slice();z.splice(-1,1,l/m),T.push(...Q(E)),T.push(...Q(z)),T.push(...Q(e[2].dims)),e.length===4&&T.push(...Q(O.convertShape(e[3].dims)));let C=[d,a,s];T.push(...Q(C));let A=q=>{let X=E.length,G=R("a",e[0].dataType,X,c),Z=R("b",12,z.length,m),oe=R("scales",e[2].dataType,e[2].dims.length),re=[G,Z,oe],L=e.length===4?R("zero_points",12,e[3].dims.length):void 0;L&&re.push(L);let ie=C.length,F=H("output",e[0].dataType,ie),Y=ke(e[0].dataType),ye=()=>{switch(c){case 1:return`
          let a_data0 = vec4<${Y}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${Y}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${Y}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${Y}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${c}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${G.type.value}, ${w}>;
        var<workgroup> inter_results: array<array<${F.type.value}, ${x}>, ${b}>;
        ${q.declareVariables(...re,F)}
        ${q.mainStart([x,b,1])}
          let output_indices = ${F.offsetToIndices(`workgroup_index * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${S} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${w};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${w}; a_offset += ${_})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${G.getByIndices(`${G.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${G.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${S} + local_id.x;
            ${L?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${L.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${Y}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${Y}(8);`}
            let scale = ${oe.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${Z.getByIndices(`${Z.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/c};
            for (var i: u32 = 0; i < ${m}; i++) {
              ${ye()}
              let b_value = ${m===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${Y}>(${Array.from({length:4},(N,U)=>`${Y}(b_value_lower[${U}]), ${Y}(b_value_upper[${U}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${Y}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(N,U)=>`${`dot(a_data${U}, b_dequantized_values[${U}])`}`).join(" + ")};
              word_offset += ${8/c};
            }
            workgroupBarrier();
          }

          if (local_idx < ${b}) {
            var output_value: ${F.type.value} = ${F.type.value}(0);
            for (var b = 0u; b < ${x}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${F.setByIndices(`${F.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${c};${m};${x};${b}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:g,dataType:f}],dispatchGroup:{x:k},programUniforms:T}),getShaderSource:A}},Gf=(e,t)=>{ju(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Zu(e.inputs,t)):e.compute(Ku(e.inputs,t))},Hf=e=>pe(e)}),Qu,Xu,Yu,Ju,el,tl,rl,il,Ff,ig=P(()=>{ee(),ne(),ae(),Qu=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Xu=(e,t,r)=>{let n="";for(let a=t-1;a>=0;--a)n+=`
            k = i32(${e.indicesGet("indices",a)}) - ${j("uniforms.pads",a,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${j("uniforms.x_shape",a,t)})) {
              break;
            }
            offset += k * i32(${j("uniforms.x_strides",a,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${n}
            value = x[offset];
          }
      `},Yu=(e,t,r)=>{let n="";for(let a=t-1;a>=0;--a)n+=`
                k = i32(${e.indicesGet("indices",a)}) - ${j("uniforms.pads",a,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${j("uniforms.x_shape",a,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${j("uniforms.x_shape",a,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${j("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},Ju=(e,t,r)=>{let n="";for(let a=t-1;a>=0;--a)n+=`
                k = i32(${e.indicesGet("indices",a)}) - ${j("uniforms.pads",a,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${j("uniforms.x_shape",a,t)})) {
                  k = i32(${j("uniforms.x_shape",a,t)}) - 1;
                }
                offset += k * i32(${j("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},el=(e,t,r)=>{let n="";for(let a=t-1;a>=0;--a)n+=`
                k = i32(${e.indicesGet("indices",a)}) - ${j("uniforms.pads",a,r)};
                if (k < 0)  {
                  k += i32(${j("uniforms.x_shape",a,t)}]);
                }
                if (k >= i32(${j("uniforms.x_shape",a,t)})) {
                  k -= i32(${j("uniforms.x_shape",a,t)});
                }
                offset += k * i32(${j("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},tl=(e,t,r)=>{switch(r.mode){case 0:return Xu(e,t,r.pads.length);case 1:return Yu(e,t,r.pads.length);case 2:return Ju(e,t,r.pads.length);case 3:return el(e,t,r.pads.length);default:throw new Error("Invalid mode")}},rl=(e,t)=>{let r=O.padShape(e[0].dims.slice(),t.pads),n=e[0].dims,a=O.size(r),i=[{type:12,data:a},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&i.push({type:s?e[2].dataType:1,data:t.value}),i.push(...Q(e[0].dims,r));let u=["rank"],d=l=>{let f=H("output",e[0].dataType,r.length),c=R("x",e[0].dataType,n.length),m=c.type.value,g=tl(f,n.length,t),_=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&_.push({name:"constant_value",type:s?m:"f32"}),`
            ${l.registerUniforms(_).declareVariables(c,f)}
            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${f.offsetToIndices("global_idx")};

            var value = ${m}(0);
            ${g}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(O.size(r)/64)},programUniforms:i}),getShaderSource:d}},il=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),n=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,a=e[0].dims.length,i=new Int32Array(2*a).fill(0);if(e.length>=4){let u=e[3].getBigInt64Array();for(let d=0;d<u.length;d++)i[Number(u[d])]=Number(r[d]),i[Number(u[d])+a]=Number(r[d+u.length])}else r.forEach((u,d)=>i[Number(d)]=Number(u));let s=[];return i.forEach(u=>s.push(u)),{mode:t.mode,value:n,pads:s}}else return t},Ff=(e,t)=>{Qu(e.inputs);let r=il(e.inputs,t);e.compute(rl(e.inputs,r),{inputs:[0]})}}),Xt,Fi,ji,Ki,Zi,nl,al,Qi,Xi,jf,Kf,Yi,Zf,Qf,Ji,Xf,Yf,Jf,ec,ng=P(()=>{je(),ee(),ne(),ae(),Xt=e=>{if(_e.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Fi=(e,t,r)=>{let n=t.format==="NHWC",a=e.dims.slice();n&&a.splice(1,0,a.pop());let i=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),u=t.strides.slice(),d=i?t.dilations.slice():[],l=t.pads.slice();Dr.adjustPoolAttributes(r,a,s,u,d,l);let f=Dr.computePoolOutputShape(r,a,u,d,s,l,t.autoPad),c=Object.assign({},t);i?Object.assign(c,{kernelShape:s,strides:u,pads:l,dilations:d,cacheKey:t.cacheKey}):Object.assign(c,{kernelShape:s,strides:u,pads:l,cacheKey:t.cacheKey});let m=f.slice();return m.push(m.splice(1,1)[0]),[c,n?m:f]},ji=(e,t)=>{let r=t.format==="NHWC",n=O.size(e),a=O.size(t.kernelShape),i=[{type:12,data:n},{type:12,data:a}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let u=t.kernelShape[t.kernelShape.length-1],d=t.strides[t.strides.length-1],l=t.pads[t.pads.length/2-1],f=t.pads[t.pads.length-1],c=!!(l+f);i.push({type:12,data:u},{type:12,data:d},{type:12,data:l},{type:12,data:f}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let m=!1;if(t.kernelShape.length===2){let g=t.kernelShape[t.kernelShape.length-2],_=t.strides[t.strides.length-2],b=t.pads[t.pads.length/2-2],x=t.pads[t.pads.length-2];m=!!(b+x),i.push({type:12,data:g},{type:12,data:_},{type:12,data:b},{type:12,data:x}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,s,!0,c,m]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=O.computeStrides(t.kernelShape);i.push({type:12,data:u},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let d=t.pads.reduce((l,f)=>l+f);return[i,s,!!d,!1,!1]}},Ki=(e,t,r,n,a,i,s,u,d,l,f,c)=>{let m=a.format==="NHWC",g=t.type.value,_=H("output",t.type.tensor,n);if(a.kernelShape.length<=2){let b="",x="",$="",w=r-(m?2:1);if(f?b=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${w}] < 0 || xIndices[${w}]
                      >= uniforms.x_shape[${w}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`:b=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`,a.kernelShape.length===2){let S=r-(m?3:2);c?x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${S}] = indices[${S}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${S}] < 0 || xIndices[${S}] >= uniforms.x_shape[${S}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${S}] = indices[${S}] * uniforms.sh - uniforms.phStart + j;
                `,$=`
              }
            `}return`
            ${e.registerUniforms(d).declareVariables(t,_)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var value = ${g}(${u});
              var pad = 0;
              ${x}
              ${b}
              ${$}
              ${s}

              output[global_idx] = value;
            }`}else{if(m)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let b=a.kernelShape.length,x=a.pads.length,$="";return l?$=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${i}
              }`:$=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${e.registerUniforms(d).declareVariables(t,_)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var offsets: array<u32, ${b}>;

              var value = ${g}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${b-1}u; j++) {
                  offsets[j] = offset / ${j("uniforms.kernelStrides","j",b)};
                  offset -= offsets[j] * ${j("uniforms.kernelStrides","j",b)};
                }
                offsets[${b-1}] = offset;

                isPad = false;
                for (var j = ${r-b}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${j("uniforms.strides",`j - ${r-b}u`,b)}
                    + offsets[j - ${r-b}u] - ${j("uniforms.pads","j - 2u",x)};
                  ${$}
              }
              ${s}

              output[global_idx] = value;
            }`}},Zi=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,nl=e=>`${Zi(e)};${e.countIncludePad}`,al=e=>`${Zi(e)};${e.storageOrder};${e.dilations}`,Qi=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Xi=(e,t,r,n)=>{let[a,i]=Fi(t,n,r),s=R("x",t.dataType,t.dims.length),u=s.type.value,d="value += x_val;",l="";a.countIncludePad?l+=`value /= ${u}(uniforms.kernelSize);`:l+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[f,c,m,g,_]=ji(i,a);f.push(...Q(t.dims,i));let b=["rank"];return{name:e,shaderCache:{hint:`${n.cacheKey};${m};${g};${_}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(O.size(i)/64)},programUniforms:f}),getShaderSource:x=>Ki(x,s,t.dims.length,i.length,a,d,l,0,c,m,g,_)}},jf=e=>{let t=e.count_include_pad!==0,r=Qi(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:t,...r,cacheKey:""};return{...n,cacheKey:nl(n)}},Kf=(e,t)=>{Xt(e.inputs),e.compute(Xi("AveragePool",e.inputs[0],!1,t))},Yi={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Zf=e=>{let t=e.format;return{format:t,...Yi,cacheKey:t}},Qf=(e,t)=>{Xt(e.inputs),e.compute(Xi("GlobalAveragePool",e.inputs[0],!0,t))},Ji=(e,t,r,n)=>{let[a,i]=Fi(t,n,r),s=`
      value = max(x_val, value);
    `,u="",d=R("x",t.dataType,t.dims.length),l=["rank"],[f,c,m,g,_]=ji(i,a);return f.push(...Q(t.dims,i)),{name:e,shaderCache:{hint:`${n.cacheKey};${m};${g};${_}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(O.size(i)/64)},programUniforms:f}),getShaderSource:b=>Ki(b,d,t.dims.length,i.length,a,s,u,t.dataType===10?-65504:-1e5,c,m,g,_)}},Xf=(e,t)=>{Xt(e.inputs),e.compute(Ji("MaxPool",e.inputs[0],!1,t))},Yf=e=>{let t=e.storage_order,r=e.dilations,n=Qi(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let a={storageOrder:t,dilations:r,...n,cacheKey:""};return{...a,cacheKey:al(a)}},Jf=e=>{let t=e.format;return{format:t,...Yi,cacheKey:t}},ec=(e,t)=>{Xt(e.inputs),e.compute(Ji("GlobalMaxPool",e.inputs[0],!0,t))}}),sl,ol,tc,rc,ag=P(()=>{ee(),ne(),ve(),ae(),sl=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,n)=>r===e[2].dims[n]).reduce((r,n)=>r&&n,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((a,i)=>i===t.axis||a===e[0].dims[i]).reduce((a,i)=>a&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],n=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/n)||t.blockSize>Math.ceil(r/(n-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},ol=(e,t)=>{let r=O.normalizeAxis(t.axis,e[0].dims.length),n=e[0].dataType,a=n===3,i=e[0].dims,s=e[1].dataType,u=O.size(i),d=n===3||n===2,l=d?[Math.ceil(O.size(e[0].dims)/4)]:e[0].dims,f=e[1].dims,c=e.length>2?e[2]:void 0,m=c?d?[Math.ceil(O.size(c.dims)/4)]:c.dims:void 0,g=f.length===0||f.length===1&&f[0]===1,_=g===!1&&f.length===1,b=$e(u),x=g&&(!d||b===4),$=x?b:1,w=x&&!d?b:1,S=R("input",d?12:n,l.length,w),k=R("scale",s,f.length),T=c?R("zero_point",d?12:n,m.length):void 0,E=H("output",s,i.length,$),z=[S,k];T&&z.push(T);let C=[l,f];c&&C.push(m);let A=[{type:12,data:u/$},{type:12,data:r},{type:12,data:t.blockSize},...Q(...C,i)],q=X=>{let G=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${X.registerUniforms(G).declareVariables(...z,E)}
      ${X.mainStart()}
          ${X.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${E.offsetToIndices("global_idx")};

          // Set input x
          ${d?`
            let input = ${S.getByOffset("global_idx / 4")};
            let x_vec = ${a?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${$===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${S.getByOffset("global_idx")};`};

          // Set scale input
          ${g?`let scale_value= ${k.getByOffset("0")}`:_?`
            let scale_index = ${E.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${k.getByOffset("scale_index")};`:`
            var scale_indices: ${k.type.indices} = output_indices;
            let index = ${k.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${k.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${k.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${T?g?d?`
                let zero_point_input = ${T.getByOffset("0")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${T.getByOffset("0")}`:_?d?`
                let zero_point_index = ${E.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${T.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${E.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${T.getByOffset("zero_point_index")};`:d?`
                let zero_point_offset = ${k.indicesToOffset("scale_indices")};
                let zero_point_input = ${T.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${T.getByIndices("scale_indices")};`:`let zero_point_value = ${d?a?"i32":"u32":S.type.value}(0);`};
      // Compute and write output
      ${E.setByOffset("global_idx",`${E.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:T?["rank","rank","rank"]:["rank","rank"]},getShaderSource:q,getRunData:()=>({outputs:[{dims:i,dataType:s}],dispatchGroup:{x:Math.ceil(u/$/64),y:1,z:1},programUniforms:A})}},tc=(e,t)=>{sl(e.inputs,t),e.compute(ol(e.inputs,t))},rc=e=>pe({axis:e.axis,blockSize:e.blockSize})}),ul,ll,ic,sg=P(()=>{je(),ee(),ae(),ul=(e,t,r)=>{let n=e===t,a=e<t&&r<0,i=e>t&&r>0;if(n||a||i)throw new Error("Range these inputs' contents are invalid.")},ll=(e,t,r,n)=>{let a=Math.abs(Math.ceil((t-e)/r)),i=[a],s=a,u=[{type:12,data:s},{type:n,data:e},{type:n,data:r},...Q(i)],d=l=>{let f=H("output",n,i.length),c=f.type.value,m=[{name:"outputSize",type:"u32"},{name:"start",type:c},{name:"delta",type:c}];return`
        ${l.registerUniforms(m).declareVariables(f)}
        ${l.mainStart()}
        ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${c}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:d,getRunData:()=>({outputs:[{dims:i,dataType:n}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},ic=e=>{let t=0,r=0,n=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],n=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],n=e.inputs[2].getFloat32Array()[0]),_e.webgpu.validateInputContent&&ul(t,r,n),e.compute(ll(t,r,n,e.inputs[0].dataType),{inputs:[]})}}),dl,en,tn,pl,nc,ac,og=P(()=>{ee(),ne(),ve(),ae(),dl=(e,t,r,n)=>{if(e!=="none"&&n!=="i32"&&n!=="u32"&&n!=="f32")throw new Error(`Input ${n} is not supported with reduction ${e}.`);let a=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,i=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return n==="i32"||n==="u32"?`atomicAdd(&${t}, bitcast<${n}>(${r}));`:`
              ${a}bitcast<${n}>(oldValue) + (${r})${i}`;case"max":return n==="i32"||n==="u32"?`atomicMax(&${t}, bitcast<${n}>(${r}));`:`
                ${a}max(bitcast<f32>(oldValue), (${r}))${i}`;case"min":return n==="i32"||n==="u32"?`atomicMin(&${t}, bitcast<${n}>(${r}));`:`${a}min(bitcast<${n}>(oldValue), (${r}))${i}`;case"mul":return`${a}(bitcast<${n}>(oldValue) * (${r}))${i}`;default:throw new Error(`Reduction ${e} is not supported.`)}},en=(e,t)=>`${e===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[${t?"i - indices_start":"i"}];
    let dim_value = uniforms.output_shape[${t?"i - indices_start":"i"} + uniforms.last_index_dimension];`}
    
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));`,tn=(e,t,r)=>`for (var i = 0u; i < uniforms.num_updates_elements; i++) {
        let value = updates[uniforms.num_updates_elements * ${r?"global_idx":"idx"} + i];
        ${dl(e.reduction,"output[data_offset + i]","value",t)}
      }`,pl=(e,t)=>{let r=e[0].dims,n=e[1].dims,a=r,i=1,s=Math.ceil(O.size(n)/i),u=n[n.length-1],d=O.sizeFromDimension(r,u),l=O.sizeFromDimension(n,0)/u,f=[{type:12,data:s},{type:12,data:u},{type:12,data:d},...Q(e[1].dims,e[2].dims,a)],c=m=>{let g=R("indices",e[1].dataType,e[1].dims.length),_=R("updates",e[2].dataType,e[2].dims.length,i),b=t.reduction!=="none"&&t.reduction!==""?Ad("output",e[0].dataType,a.length):H("output",e[0].dataType,a.length,i);return`
      ${m.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(g,_,b)}
      ${m.mainStart()}
        ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var hasDuplicates = false;
  if (${t.reduction==="none"}) {
    for (var i = 0; i < ${l}; i = i + 1) {
      for (var j = i + 1; j < ${l}; j = j + 1) {
        var index_i = i32(indices[i].x);
        var index_j = i32(indices[j].x);
        if (index_i == index_j) {
          hasDuplicates = true;
          break;
        }
      }
      if (hasDuplicates) {
        break;
      }
    }
  }

  if (${t.reduction==="none"} && hasDuplicates) {
    if (global_idx != 0u) {
      return;
    }
    // Process each index-update pair individually when duplicates exist
    for (var idx = 0u; idx < ${l}u; idx++) {
      var data_offset = 0u;
      for (var i = 0u; i < uniforms.last_index_dimension; i++) {
        var index = i32(indices[idx * uniforms.last_index_dimension + i].x);
        ${en(r.length,!1)}
      }
      ${tn(t,b.type.value,!1)}
    }
    return;
  }

  var data_offset = 0u;
  var indices_start = uniforms.last_index_dimension * global_idx;
  var indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${en(r.length,!0)}
  }
  ${tn(t,b.type.value,!0)}
  }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:f}),getShaderSource:c}},nc=e=>pe({reduction:e.reduction}),ac=(e,t)=>{e.compute(pl(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),fl,cl,hl,rn,ml,gl,_l,yl,bl,wl,$l,vl,nn,xl,kl,Sl,Tl,Il,sc,oc,ug=P(()=>{ee(),ne(),ve(),ae(),fl=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},cl=(e,t,r)=>{t.every(a=>a>=0&&a<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let n=new Array(r).fill(1);return t.forEach((a,i)=>n[a]=e[i]),n},hl=(e,t,r,n,a,i)=>{let[s,u,d]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],l=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(f=>i.push(f));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0){if(e[u].getFloat32Array().forEach(f=>n.push(f)),n.length!==0&&n.length!==l&&r>=18&&n.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");fl(n,t),t.axes.length>0&&cl(n,t.axes,l).forEach((f,c)=>n[c]=f)}if(d>0&&e.length>d&&e[d].dims.length===1&&e[d].dims[0]>0&&(e[d].getBigInt64Array().forEach(f=>a.push(Number(f))),a.length!==0&&a.length!==l&&r>=18&&a.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(a.length!==0&&a.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof n<"u"&&typeof a<"u"&&n.length>0&&a.length>l)throw new Error("Resize requires only of scales or sizes to be specified")},rn=(e,t,r,n)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${n}(big / (${r}));
  let fract = ${n}(big % (${r})) / ${n}(${r});
  return whole + fract;
`,ml=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${rn("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${rn("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",gl=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",_l=(e,t,r)=>{let n=new Array(r).fill(0).concat(new Array(r).fill(1)),a=e.length===0?n:e.slice();return t.length>0?(t.forEach((i,s)=>{n[i]=a[s],n[s+r]=a[t.length+s]}),n):a},yl=(e,t,r,n)=>{let a=[];if(r.length>0)if(n.length>0){if(e.forEach(i=>a.push(i)),Math.max(...n)>e.length)throw new Error("axes is out of bound");n.forEach((i,s)=>a[i]=r[s])}else r.forEach(i=>a.push(i));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");a=e.map((i,s)=>Math.round(i*t[s]))}return a},bl=(e,t,r)=>{let n=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>t[i]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>t[i]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let a=e.slice();return r.axes.length>0?(r.axes.forEach(i=>t[i]=n),r.axes.forEach(i=>a[i]=Math.round(e[i]*t[i]))):(t.fill(n,0,t.length),a.forEach((i,s)=>a[s]=Math.round(i*t[s]))),a},wl=(e,t,r,n,a)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${j("uniforms.scales","i",n)};
        var roi_low = ${j("uniforms.roi","i",a)};
        var roi_hi = ${j("uniforms.roi",`i + ${t.length}`,a)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${j("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${j("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,$l=(e,t,r,n,a,i,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${j("uniforms.scales","i",a)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${j("uniforms.roi","i",i)};
          var roi_hi = ${j("uniforms.roi",`i + ${r.length}`,i)};
          var input_shape_i = ${j("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${j("uniforms.output_shape","i",n.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,vl=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${j("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,nn=(e,t,r,n)=>e.rank>n?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",xl=(e,t,r,n,a)=>{let[i,s,u,d]=r.length===2?[-1,0,1,-1]:[0,2,3,1],l=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${l} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${nn(e,d,i,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${l} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${l} = originalIndices[${s}];
      var col:${l} = originalIndices[${u}];
      ${n?`if (row < 0 || row > (${r[s]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${a};
      }`:""};
      row = max(0, min(row, ${r[s]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${i}])`:"0"};
      var x11: ${l} = getInputValue(batch, channel, row1, col1);
      var x12: ${l} = getInputValue(batch, channel, row1, col2);
      var x21: ${l} = getInputValue(batch, channel, row2, col1);
      var x22: ${l} = getInputValue(batch, channel, row2, col2);
      var dx1: ${l} = abs(row - ${l}(row1));
      var dx2: ${l} = abs(${l}(row2) - row);
      var dy1: ${l} = abs(col - ${l}(col1));
      var dy2: ${l} = abs(${l}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},kl=(e,t,r,n,a,i,s,u,d,l)=>{let f=r.length===2,[c,m]=f?[0,1]:[2,3],g=e.type.value,_=b=>{let x=b===c?"row":"col";return`
      fn ${x}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${g} {
        var output_index = ${t.indicesGet("output_indices",b)};
        var originalIdx: ${g} = getOriginalCoordinateFromResizedCoordinate(output_index, ${a[b]},
        ${n[b]}, ${r[b]}, ${i[b]}, ${i[b]} + ${r.length});
        var fractOriginalIdx: ${g} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${r[b]} - 1))) {
          return ${d};
        }
        var data: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${x}: ${g} = originalIdx + ${g}(i);
          if (${x} < 0 || ${x} >= ${r[b]}) {
            ${l?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${d};`:`${x} = max(0, min(${x}, ${r[b]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",b,`u32(${x})`)};
          data[i + 1] = ${b===c?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${_(c)};
    ${_(m)};
  fn getCubicInterpolationCoefs(s: ${g}) -> array<${g}, 4> {
    var absS = abs(s);
    var coeffs: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${g} = 1.0 - absS;
    var twoMinusAbsS: ${g} = 2.0 - absS;
    var onePlusAbsS: ${g} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${g}, 4>, coefs: array<${g}, 4>) -> ${g} {
    var coefsSum: ${g} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${g} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Sl=(e,t,r,n,a)=>{let[i,s,u,d,l]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],f=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${f} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(width, ${r[d]} - 1))`)};
      ${nn(e,l,i,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${f} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${f} = originalIndices[${s}];
      var height:${f} = originalIndices[${u}];
      var width:${f} = originalIndices[${d}];
      ${n?`if (depth < 0 || depth > (${r[s]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[d]} - 1)) {
      return ${a};
        }`:""};

    depth = max(0, min(depth, ${r[s]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[d]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${i}])`:"0"};

      var x111: ${f} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${f} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${f} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${f} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${f} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${f} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${f} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${f} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${f} = abs(depth - ${f}(depth1));
      var dx2: ${f} = abs(${f}(depth2) - depth);
      var dy1: ${f} = abs(height - ${f}(height1));
      var dy2: ${f} = abs(${f}(height2) - height);
      var dz1: ${f} = abs(width - ${f}(width1));
      var dz2: ${f} = abs(${f}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},Tl=(e,t,r,n,a,i)=>{let s=e.dims,u=_l(i,t.axes,s.length),d=yl(s,n,a,t.axes),l=n.slice();n.length===0&&(l=s.map((w,S)=>w===0?1:d[S]/w),t.keepAspectRatioPolicy!=="stretch"&&(d=bl(s,l,t)));let f=H("output",e.dataType,d.length),c=R("input",e.dataType,s.length),m=O.size(d),g=s.length===d.length&&s.every((w,S)=>w===d[S]),_=t.coordinateTransformMode==="tf_crop_and_resize",b=t.extrapolationValue,x=c.type.value,$=w=>`
      ${g?"":`
      ${ml(t.coordinateTransformMode,x)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${vl(c,s)};
              ${gl(t.nearestMode,r,x)};
              ${$l(c,f,s,d,l.length,u.length,_)};
              `;case"linear":return`
              ${wl(f,s,d,l.length,u.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${xl(c,f,s,_,b)}`;if(s.length===3||s.length===5)return`${Sl(c,f,s,_,b)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${kl(c,f,s,d,l,u,t.cubicCoeffA,_,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${w.registerUniform("output_size","u32").registerUniform("scales","f32",l.length).registerUniform("roi","f32",u.length).declareVariables(c,f)}
      ${w.mainStart()}
        ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${g?"output[global_idx] = input[global_idx];":`
        let output_indices = ${f.offsetToIndices("global_idx")};
        var input_indices: ${c.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${c.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${l.length>0?t.mode==="cubic"?l:l.length:""}|${a.length>0?a:""}|${u.length>0?u:""}|${g}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:d,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},{type:1,data:l},{type:1,data:u},...Q(s,d)]})}},Il=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},sc=(e,t)=>{let r=[],n=[],a=[],i=Il(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");hl(e.inputs,t,i,r,n,a),e.compute(Tl(e.inputs[0],t,i,r,n,a),{inputs:[0]})},oc=e=>{let t=e.antialias,r=e.axes,n=e.coordinateTransformMode,a=e.cubicCoeffA,i=e.excludeOutside!==0,s=e.extrapolationValue,u=e.keepAspectRatioPolicy,d=e.mode,l=e.nearestMode===""?"simple":e.nearestMode;return pe({antialias:t,axes:r,coordinateTransformMode:n,cubicCoeffA:a,excludeOutside:i,extrapolationValue:s,keepAspectRatioPolicy:u,mode:d,nearestMode:l})}}),El,zl,uc,lg=P(()=>{ee(),ne(),ae(),El=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dataType!==r.dataType||t.dataType!==n.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let a=t.dims[t.dims.length-1],i=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==a)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(n.dims.length!==1)throw new Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==a)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==a)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==a)throw new Error("Bias must have the same hidden size as input")}},zl=(e,t,r,n)=>{let a=t.simplified,i=e[0].dims,s=O.size(i),u=i,d=s,l=i.slice(-1)[0],f=n?i.slice(0,-1).concat(1):[],c=!a&&e.length>3,m=e.length>4,g=n&&r>1,_=n&&r>2,b=r>3,x=64,$=$e(l),w=[{type:12,data:d},{type:12,data:$},{type:12,data:l},{type:1,data:t.epsilon}],S=T=>{let E=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],z=[R("x",e[0].dataType,e[0].dims,$),R("skip",e[1].dataType,e[1].dims,$),R("gamma",e[2].dataType,e[2].dims,$)];c&&z.push(R("beta",e[3].dataType,e[3].dims,$)),m&&z.push(R("bias",e[4].dataType,e[4].dims,$)),z.push(H("output",e[0].dataType,u,$)),g&&z.push(H("mean_output",1,f)),_&&z.push(H("inv_std_output",1,f)),b&&z.push(H("input_skip_bias_sum",e[0].dataType,u,$));let C=ke(e[0].dataType),A=ke(1,$);return`

      ${T.registerUniforms(E).declareVariables(...z)}
      var<workgroup> sum_shared : array<${A}, ${x}>;
      var<workgroup> sum_squared_shared : array<${A}, ${x}>;

      ${T.mainStart([x,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${x};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${x};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${x-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${m?"bias[offset1d + i]":C+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${b?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Dt(C,$,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${x};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${mt("sum",$)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${mt("square_sum",$)} / f32(uniforms.hidden_size) ${a?"":"- mean * mean"} + uniforms.epsilon);
        ${g?"mean_output[global_idx] = mean;":""}
        ${_?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${a?"":`- ${C}(mean)`}) *
            ${C}(inv_std_dev) * gamma[offset1d + i]
            ${c?"+ beta[offset1d + i]":""};
        }
      }`},k=[{dims:u,dataType:e[0].dataType}];return r>1&&k.push({dims:f,dataType:1}),r>2&&k.push({dims:f,dataType:1}),r>3&&k.push({dims:i,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${$};${g};${_};${b}`,inputDependencies:e.map((T,E)=>"type")},getShaderSource:S,getRunData:()=>({outputs:k,dispatchGroup:{x:Math.ceil(d/l)},programUniforms:w})}},uc=(e,t)=>{El(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(zl(e.inputs,t,e.outputCount,!1),{outputs:r})}}),Cl,Yt,Ol,an,Al,Bl,lc,dc,dg=P(()=>{ee(),ne(),ve(),ae(),Cl=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,n)=>{if(e[n+1].dataType!==6&&e[n+1].dataType!==7)throw new Error(`Input ${n} must be an array of int32 or int64`)})},Yt=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(n=>r.push(Number(n)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(n=>r.push(Number(n)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},Ol=(e,t)=>{if(e.length>1){let r=Yt(e,1),n=Yt(e,2),a=Yt(e,3);return a.length===0&&(a=[...Array(e[0].dims.length).keys()]),pe({starts:r,ends:n,axes:a})}else return t},an=(e,t,r,n,a)=>{let i=e;return e<0&&(i+=r[n[t]]),a[t]<0?Math.max(0,Math.min(i,r[n[t]]-1)):Math.max(0,Math.min(i,r[n[t]]))},Al=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${j("uniforms.input_shape","i",r.length)};
            let steps_i = ${j("uniforms.steps","i",r.length)};
            let signs_i = ${j("uniforms.signs","i",r.length)};
            let starts_i = ${j("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Bl=(e,t)=>{let r=e[0].dims,n=O.size(r),a=t.axes.length>0?O.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],i=Yt(e,4);i.forEach($=>$!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(a.length).fill(1));let s=t.starts.map(($,w)=>an($,w,r,a,i)),u=t.ends.map(($,w)=>an($,w,r,a,i));if(a.length!==s.length||a.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(a.length!==r.length)for(let $=0;$<r.length;++$)a.includes($)||(s.splice($,0,0),u.splice($,0,r[$]),i.splice($,0,1));let d=i.map($=>Math.sign($));i.forEach(($,w,S)=>{if($<0){let k=(u[w]-s[w])/$,T=s[w],E=T+k*i[w];s[w]=E,u[w]=T,S[w]=-$}});let l=r.slice(0);a.forEach(($,w)=>{l[$]=Math.ceil((u[$]-s[$])/i[$])});let f={dims:l,dataType:e[0].dataType},c=H("output",e[0].dataType,l.length),m=R("input",e[0].dataType,e[0].dims.length),g=O.size(l),_=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:d.length},{name:"steps",type:"u32",length:i.length}],b=[{type:12,data:g},{type:12,data:s},{type:6,data:d},{type:12,data:i},...Q(e[0].dims,l)],x=$=>`
      ${$.registerUniforms(_).declareVariables(m,c)}
        ${Al(m,c,r)}
        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${c.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${c.setByOffset("global_idx",m.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${d.length}_${s.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:x,getRunData:()=>({outputs:[f],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:b})}},lc=(e,t)=>{Cl(e.inputs,t);let r=Ol(e.inputs,t);e.compute(Bl(e.inputs,r),{inputs:[0]})},dc=e=>{let t=e.starts,r=e.ends,n=e.axes;return pe({starts:t,ends:r,axes:n})}}),Rl,Nl,pc,fc,pg=P(()=>{ee(),ne(),ve(),gt(),ae(),Rl=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Nl=(e,t)=>{let r=e.inputs[0],n=r.dims,a=O.size(n),i=n.length,s=O.normalizeAxis(t.axis,i),u=s<n.length-1,d,l=[];u?(l=Array.from({length:i},(z,C)=>C),l[s]=i-1,l[i-1]=s,d=e.compute(Me(r,l),{inputs:[r],outputs:[-1]})[0]):d=r;let f=d.dims,c=f[i-1],m=a/c,g=$e(c),_=c/g,b=64;m===1&&(b=256);let x=(z,C)=>C===4?`max(max(${z}.x, ${z}.y), max(${z}.z, ${z}.w))`:C===2?`max(${z}.x, ${z}.y)`:C===3?`max(max(${z}.x, ${z}.y), ${z}.z)`:z,$=R("x",d.dataType,d.dims,g),w=H("result",d.dataType,d.dims,g),S=$.type.value,k=ke(d.dataType)==="f32"?`var threadMax = ${S}(-3.402823e+38f);`:`var threadMax = ${S}(-65504.0h);`,T=z=>`
      var<workgroup> rowMaxShared : ${S};
      var<workgroup> rowSumShared : ${S};
      var<workgroup> threadShared : array<${S}, ${b}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${S} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${S}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${z.registerUniform("packedCols","i32").declareVariables($,w)}
      ${z.mainStart(b)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${b};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${k}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${S}(${x("threadShared[0]",g)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${S}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${S}(${mt("threadShared[0]",g)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,E=e.compute({name:"Softmax",shaderCache:{hint:`${g};${b}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:f,dataType:d.dataType}],dispatchGroup:{x:m},programUniforms:[{type:6,data:_}]}),getShaderSource:T},{inputs:[d],outputs:[u?-1:0]})[0];u&&e.compute(Me(E,l),{inputs:[E]})},pc=(e,t)=>{Rl(e.inputs),Nl(e,t)},fc=e=>pe({axis:e.axis})}),sn,Ml,Dl,Pl,cc,fg=P(()=>{ee(),ne(),ae(),sn=e=>Array.from(e.getBigInt64Array(),Number),Ml=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(sn(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Dl=(e,t)=>{let r=[];for(let n=0;n<e.length;++n)r.push(e[n]*t[n]);return r},Pl=(e,t)=>{let r=e[0].dims,n=t??sn(e[1]),a=Dl(r,n),i=O.size(a),s=e[0].dataType,u=R("input",s,r.length),d=H("output",s,a.length),l=f=>`
      const inputShape = ${u.indices(...r)};
      ${f.registerUniform("output_size","u32").declareVariables(u,d)}
      ${f.mainStart()}
      ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${d.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${d.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${d.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...Q(e[0].dims,a)]}),getShaderSource:l}},cc=e=>{Ml(e.inputs),e.compute(Pl(e.inputs),{inputs:[0]})}}),Ul,ql,hc,cg=P(()=>{ee(),ne(),ae(),Ul=(e,t,r,n,a)=>{let i=H("output_data",a,r.length,4),s=R("a_data",t[1].dataType,t[1].dims.length,4),u=R("b_data",t[2].dataType,t[2].dims.length,4),d=R("c_data",t[0].dataType,t[0].dims.length,4),l,f=(c,m,g)=>`select(${m}, ${c}, ${g})`;if(!n)l=i.setByOffset("global_idx",f(s.getByOffset("global_idx"),u.getByOffset("global_idx"),d.getByOffset("global_idx")));else{let c=(m,g,_="")=>{let b=`a_data[index_a${g}][component_a${g}]`,x=`b_data[index_b${g}][component_b${g}]`,$=`bool(c_data[index_c${g}] & (0xffu << (component_c${g} * 8)))`;return`
            let output_indices${g} = ${i.offsetToIndices(`global_idx * 4u + ${g}u`)};
            let offset_a${g} = ${s.broadcastedIndicesToOffset(`output_indices${g}`,i)};
            let offset_b${g} = ${u.broadcastedIndicesToOffset(`output_indices${g}`,i)};
            let offset_c${g} = ${d.broadcastedIndicesToOffset(`output_indices${g}`,i)};
            let index_a${g} = offset_a${g} / 4u;
            let index_b${g} = offset_b${g} / 4u;
            let index_c${g} = offset_c${g} / 4u;
            let component_a${g} = offset_a${g} % 4u;
            let component_b${g} = offset_b${g} % 4u;
            let component_c${g} = offset_c${g} % 4u;
            ${m}[${g}] = ${_}(${f(b,x,$)});
          `};a===9?l=`
            var data = vec4<u32>(0);
            ${c("data",0,"u32")}
            ${c("data",1,"u32")}
            ${c("data",2,"u32")}
            ${c("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:l=`
            ${c("output_data[global_idx]",0)}
            ${c("output_data[global_idx]",1)}
            ${c("output_data[global_idx]",2)}
            ${c("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(d,s,u,i)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${l}
      }`},ql=e=>{let t=e[1].dims,r=e[2].dims,n=e[0].dims,a=e[1].dataType,i=!(O.areEqual(t,r)&&O.areEqual(r,n)),s=t,u=O.size(t);if(i){let l=Pt.calcShape(Pt.calcShape(t,r,!1),n,!1);if(!l)throw new Error("Can't perform where op on the given tensors");s=l,u=O.size(s)}let d=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:l=>Ul(l,e,s,i,a),getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:d},...Q(n,t,r,s)]})}},hc=e=>{e.compute(ql(e.inputs))}}),mc,hg=P(()=>{Em(),Wn(),zm(),Cm(),Om(),Am(),Bm(),Pm(),qm(),Wm(),Vm(),Lm(),Gm(),Hm(),Fm(),jm(),Km(),Zm(),Qm(),Xm(),Ym(),Jm(),eg(),tg(),rg(),Rf(),ig(),ng(),ag(),sg(),og(),qn(),ug(),Uf(),lg(),dg(),pg(),Df(),fg(),gt(),Vn(),cg(),mc=new Map([["Abs",[op]],["Acos",[up]],["Acosh",[lp]],["Add",[Lp]],["ArgMax",[ip,_n]],["ArgMin",[rp,_n]],["Asin",[dp]],["Asinh",[pp]],["Atan",[fp]],["Atanh",[cp]],["Attention",[np]],["AveragePool",[Kf,jf]],["BatchNormalization",[ap]],["BiasAdd",[sp]],["BiasSplitGelu",[Vp]],["Cast",[mp,hp]],["Ceil",[_p]],["Clip",[gp]],["Concat",[Jp,ef]],["Conv",[xn,vn]],["ConvTranspose",[pf,df]],["Cos",[yp]],["Cosh",[bp]],["CumSum",[ff,cf]],["DepthToSpace",[hf,mf]],["DequantizeLinear",[tc,rc]],["Div",[Gp]],["Einsum",[gf,_f]],["Elu",[wp,ir]],["Equal",[Hp]],["Erf",[$p]],["Exp",[vp]],["Expand",[yf]],["FastGelu",[bf]],["Floor",[xp]],["FusedConv",[xn,vn]],["Gather",[$f,wf]],["GatherElements",[If,Tf]],["GatherBlockQuantized",[kf,Sf]],["GatherND",[vf,xf]],["Gelu",[kp]],["Gemm",[zf,Ef]],["GlobalAveragePool",[Qf,Zf]],["GlobalMaxPool",[ec,Jf]],["Greater",[Zp]],["GreaterOrEqual",[Xp]],["GridSample",[Cf,Of]],["GroupQueryAttention",[qf]],["HardSigmoid",[Ap,Op]],["InstanceNormalization",[Wf]],["LayerNormalization",[Vf]],["LeakyRelu",[Sp,ir]],["Less",[Qp]],["LessOrEqual",[Yp]],["Log",[qp]],["MatMul",[Lf]],["MatMulNBits",[Gf,Hf]],["MaxPool",[Xf,Yf]],["Mul",[Fp]],["MultiHeadAttention",[Bf,Af]],["Neg",[Ip]],["Not",[Tp]],["Pad",[Ff]],["Pow",[jp]],["QuickGelu",[Wp,ir]],["Range",[ic]],["Reciprocal",[Ep]],["ReduceMin",[Xd]],["ReduceMean",[Fd]],["ReduceMax",[Qd]],["ReduceSum",[Jd]],["ReduceProd",[Yd]],["ReduceL1",[jd]],["ReduceL2",[Kd]],["ReduceLogSum",[tp]],["ReduceLogSumExp",[Zd]],["ReduceSumSquare",[ep]],["Relu",[zp]],["Resize",[sc,oc]],["RotaryEmbedding",[Pf]],["ScatterND",[ac,nc]],["Sigmoid",[Cp]],["Sin",[Bp]],["Sinh",[Rp]],["Slice",[lc,dc]],["SkipLayerNormalization",[uc]],["Split",[Nf,Mf]],["Sqrt",[Np]],["Softmax",[pc,fc]],["Sub",[Kp]],["Tan",[Mp]],["Tanh",[Dp]],["ThresholdedRelu",[Up,ir]],["Tile",[cc]],["Transpose",[Rd,Nd]],["Where",[hc]]])}),gc,mg=P(()=>{je(),at(),ae(),gc=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,n,a){Je(e.programInfo.name);let i=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let l of t)u.push({binding:u.length,resource:{buffer:l.buffer}});for(let l of r)u.push({binding:u.length,resource:{buffer:l.buffer}});a&&u.push({binding:u.length,resource:a});let d=i.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let l={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:d,dispatchGroup:n};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(l)}s.setPipeline(e.computePipeline),s.setBindGroup(0,d),s.dispatchWorkgroups(...n),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Fe(e.programInfo.name)}dispose(){}build(e,t){Je(e.name);let r=this.backend.device,n=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(l=>{r.features.has(l.feature)&&n.push(`enable ${l.extension};`)});let a=Bd(t,this.backend.device.limits),i=e.getShaderSource(a),s=`${n.join(`
`)}
${a.additionalImplementations}
${i}`,u=r.createShaderModule({code:s,label:e.name});ue("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let d=r.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:e.name});return Fe(e.name),{programInfo:e,computePipeline:d,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,n=typeof e=="number"?1:e.z||1,a=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=a&&r<=a&&n<=a)return[t,r,n];let i=t*r*n,s=Math.ceil(Math.sqrt(i));if(s>a){if(s=Math.ceil(Math.cbrt(i)),s>a)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}}),_c={};qt(_c,{WebGpuBackend:()=>yc});var Wl,Vl,Ll,yc,gg=P(()=>{je(),ee(),at(),Ed(),Tm(),hg(),mg(),Wl=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let n=0;n<e.length;++n){let a=e[n].dataType;switch(t[n]){case"none":{r.push("");break}case"type":{r.push(`${a}`);break}case"rank":{let i=e[n].dims.length;r.push(`${a};${i}`);break}case"dims":{let i=e[n].dims.join(",");r.push(`${a};${i}`);break}default:throw new Error(`unsupported input dependency: ${t[n]}`)}}return r.join("|")},Vl=(e,t,r)=>{var a,i;let n=e.name;return(a=e.shaderCache)!=null&&a.hint&&(n+="["+e.shaderCache.hint+"]"),n+=":"+r+`:${Wl(t,((i=e.shaderCache)==null?void 0:i.inputDependencies)??new Array(t.length).fill("dims"))}`,n},Ll=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},yc=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],n={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},a=i=>t.features.has(i)&&r.push(i)&&!0;a("chromium-experimental-timestamp-query-inside-passes")||a("timestamp-query"),a("shader-f16"),a("subgroups"),this.device=await t.requestDevice(n),this.adapterInfo=new Ll(t.info||await t.requestAdapterInfo()),this.gpuDataManager=Od(this),this.programManager=new gc(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Mn(e.logLevel,!!e.debug),this.device.onuncapturederror=i=>{i.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${i.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Je(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{var n;let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let a=0;a<t.length/2;a++){let i=r[a],s=i.kernelId,u=this.kernels.get(s),d=u.kernelType,l=u.kernelName,f=i.programName,c=i.inputTensorViews,m=i.outputTensorViews,g=t[a*2],_=t[a*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=g);let b=Number(g-this.queryTimeBase),x=Number(_-this.queryTimeBase);if(!Number.isSafeInteger(b)||!Number.isSafeInteger(x))throw new RangeError("incorrect timestamp range");if((n=this.env.webgpu.profiling)!=null&&n.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:c.map($=>({dims:$.dims,dataType:nt($.dataType)})),outputsMetadata:m.map($=>({dims:$.dims,dataType:nt($.dataType)})),kernelId:s,kernelType:d,kernelName:l,programName:f,startTime:b,endTime:x});else{let $="";c.forEach((S,k)=>{$+=`input[${k}]: [${S.dims}] | ${nt(S.dataType)}, `});let w="";m.forEach((S,k)=>{w+=`output[${k}]: [${S.dims}] | ${nt(S.dataType)}, `}),console.log(`[profiling] kernel "${s}|${d}|${l}|${f}" ${$}${w}execution time: ${x-b} ns`)}Rr("GPU",`${f}::${g}::${_}`)}e.unmap(),this.pendingQueries.delete(e)}),Fe()}run(e,t,r,n,a,i){Je(e.name);let s=[];for(let w=0;w<t.length;++w){let S=t[w].data;if(S===0)continue;let k=this.gpuDataManager.get(S);if(!k)throw new Error(`no GPU data for input: ${S}`);s.push(k)}let{outputs:u,dispatchGroup:d,programUniforms:l}=e.getRunData(t),f=r.length===0?u.map((w,S)=>S):r;if(f.length!==u.length)throw new Error(`Output size ${f.length} must be equal to ${u.length}.`);let c=[],m=[];for(let w=0;w<u.length;++w){if(!Number.isInteger(f[w])||f[w]<-3||f[w]>=i)throw new Error(`Invalid output index: ${f[w]}`);if(f[w]===-3)continue;let S=f[w]===-1,k=f[w]===-2,T=S||k?a(u[w].dataType,u[w].dims):n(f[w],u[w].dataType,u[w].dims);if(c.push(T),T.data===0)continue;let E=this.gpuDataManager.get(T.data);if(!E)throw new Error(`no GPU data for output: ${T.data}`);if(S&&this.temporaryData.push(E),k){let z=this.kernelPersistentData.get(this.currentKernelId);z||(z=[],this.kernelPersistentData.set(this.currentKernelId,z)),z.push(E)}m.push(E)}if(s.length!==t.length||m.length!==c.length){if(m.length===0)return Fe(e.name),c;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let g;if(l){let w=0,S=[];l.forEach(z=>{let C=typeof z.data=="number"?[z.data]:z.data;if(C.length===0)return;let A=z.type===10?2:4,q,X;z.type===10?(X=C.length>4?16:C.length>2?8:C.length*A,q=C.length>4?16:A*C.length):(X=C.length<=2?C.length*A:16,q=16),w=Math.ceil(w/X)*X,S.push(w);let G=z.type===10?8:4;w+=C.length>4?Math.ceil(C.length/G)*q:C.length*A});let k=16;w=Math.ceil(w/k)*k;let T=new ArrayBuffer(w);l.forEach((z,C)=>{let A=S[C],q=typeof z.data=="number"?[z.data]:z.data;if(z.type===6)new Int32Array(T,A,q.length).set(q);else if(z.type===12)new Uint32Array(T,A,q.length).set(q);else if(z.type===10)new Uint16Array(T,A,q.length).set(q);else if(z.type===1)new Float32Array(T,A,q.length).set(q);else throw new Error(`Unsupported uniform type: ${nt(z.type)}`)});let E=this.gpuDataManager.create(w,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(E.buffer,0,T,0,w),this.gpuDataManager.release(E.id),g={offset:0,size:w,buffer:E.buffer}}let _=this.programManager.normalizeDispatchGroupSize(d),b=_[1]===1&&_[2]===1,x=Vl(e,t,b),$=this.programManager.getArtifact(x);if($||($=this.programManager.build(e,_),this.programManager.setArtifact(x,$),ue("info",()=>`[artifact] key: ${x}, programName: ${e.name}`)),l&&$.uniformVariablesInfo){if(l.length!==$.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${$.uniformVariablesInfo.length}, got ${l.length} in program "${$.programInfo.name}".`);for(let w=0;w<l.length;w++){let S=l[w],k=S.type,T=typeof S.data=="number"?1:S.data.length,[E,z]=$.uniformVariablesInfo[w];if(k!==E||T!==z)throw new Error(`Uniform variable ${w} mismatch: expect type ${E} with size ${z}, got type ${k} with size ${T} in program "${$.programInfo.name}".`)}}if(ue("info",()=>`[ProgramManager] run "${e.name}" (key=${x}) with ${_[0]}x${_[1]}x${_[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let w={kernelId:this.currentKernelId,programName:$.programInfo.name,inputTensorViews:t,outputTensorViews:c};this.pendingKernels.push(w),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(w)}return this.programManager.run($,s,m,_,g),Fe(e.name),c}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,n){let a=mc.get(e);if(!a)throw new Error(`kernel not implemented: ${e}`);let i={kernelType:e,kernelName:n,kernelEntry:a[0],attributes:[a[1],r]};this.kernels.set(t,i)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let n=this.kernels.get(e);if(!n)throw new Error(`kernel not created: ${e}`);let a=n.kernelType,i=n.kernelName,s=n.kernelEntry,u=n.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${a}] ${i}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),ue("info",()=>`[WebGPU] Start to run kernel "[${a}] ${i}"...`);let d=this.env.debug;this.temporaryData=[];try{return d&&this.device.pushErrorScope("validation"),s(t,u[1]),0}catch(l){return r.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${i}" failed. ${l}`)),1}finally{d&&r.push(this.device.popErrorScope().then(l=>l?`GPU validation error for kernel "[${a}] ${i}": ${l.message}`:null));for(let l of this.temporaryData)this.gpuDataManager.release(l.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,n){let a=this.sessionExternalDataMapping.get(e);a||(a=new Map,this.sessionExternalDataMapping.set(e,a));let i=a.get(t),s=this.gpuDataManager.registerExternalBuffer(r,n,i);return a.set(t,[s,r]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let n=await hn(this,e,t);return Dn(n.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){var e;this.queryType="none",(((e=this.env.webgpu.profiling)==null?void 0:e.mode)==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ue("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ue("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ue("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let n=0;n<r;n++){let a=this.getComputePassEncoder(),i=e[n];this.writeTimestamp(this.pendingDispatchNumber*2),a.setPipeline(i.computePipeline),a.setBindGroup(0,i.bindGroup),a.dispatchWorkgroups(...i.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[n]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),bc={};qt(bc,{init:()=>wc});var zr,Gl,wc,_g=P(()=>{ee(),at(),ne(),Sm(),zr=class $c{constructor(t,r,n,a){this.module=t,this.dataType=r,this.data=n,this.dims=a}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(O.size(t)!==O.size(this.dims))throw new Error("Invalid new shape");return new $c(this.module,this.dataType,this.data,t)}},Gl=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let n=e.PTR_SIZE,a=r/e.PTR_SIZE,i=n===4?"i32":"i64";this.opKernelContext=Number(e.getValue(n*a++,i));let s=Number(e.getValue(n*a++,i));this.outputCount=Number(e.getValue(n*a++,i)),this.customDataOffset=Number(e.getValue(n*a++,"*")),this.customDataSize=Number(e.getValue(n*a++,i));let u=[];for(let d=0;d<s;d++){let l=Number(e.getValue(n*a++,i)),f=Number(e.getValue(n*a++,"*")),c=Number(e.getValue(n*a++,i)),m=[];for(let g=0;g<c;g++)m.push(Number(e.getValue(n*a++,i)));u.push(new zr(e,l,f,m))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){var s;let r=((s=t==null?void 0:t.inputs)==null?void 0:s.map(u=>typeof u=="number"?this.inputs[u]:u))??this.inputs,n=(t==null?void 0:t.outputs)??[],a=(u,d,l)=>new zr(this.module,d,this.output(u,l),l),i=(u,d)=>{let l=Tt(u,d);if(!l)throw new Error(`Unsupported data type: ${u}`);let f=l>0?this.backend.gpuDataManager.create(l).id:0;return new zr(this.module,u,f,d)};return this.backend.run(e,r,n,a,i,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let n=this.module.PTR_SIZE,a=n===4?"i32":"i64",i=this.module.stackAlloc((1+t.length)*n);this.module.setValue(i,t.length,a);for(let s=0;s<t.length;s++)this.module.setValue(i+n*(s+1),t[s],a);return this.module._JsepOutput(this.opKernelContext,e,i)}catch(n){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${n}`)}finally{this.module.stackRestore(r)}}},wc=async(e,t,r,n)=>{let a=t.jsepInit;if(!a)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let i=(gg(),sr(_c)).WebGpuBackend,s=new i;await s.initialize(r,n),a("webgpu",[s,u=>s.alloc(Number(u)),u=>s.free(u),(u,d,l,f=!1)=>{if(f)ue("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(u)}, dst=${Number(d)}, size=${Number(l)}`),s.memcpy(Number(u),Number(d));else{ue("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u)}, gpuDataId=${Number(d)}, size=${Number(l)}`);let c=t.HEAPU8.subarray(Number(u>>>0),Number(u>>>0)+Number(l));s.upload(Number(d),c)}},async(u,d,l)=>{ue("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u}, dataOffset=${d}, size=${l}`),await s.download(Number(u),()=>t.HEAPU8.subarray(Number(d)>>>0,Number(d+l)>>>0))},(u,d,l)=>s.createKernel(u,Number(d),l,t.UTF8ToString(t._JsepGetNodeName(Number(d)))),u=>s.releaseKernel(u),(u,d,l,f)=>{ue("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${l}, kernel=${u}, contextDataOffset=${d}`);let c=new Gl(t,s,Number(d));return s.computeKernel(Number(u),c,f)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let i=new Cd(r);a("webnn",[i,()=>i.reserveTensorId(),s=>i.releaseTensorId(s),async(s,u,d,l,f)=>i.ensureTensor(s,u,d,l,f),(s,u)=>{i.uploadTensor(s,u)},async(s,u)=>i.downloadTensor(s,u)])}}}),Hl,Kn,Zn,ct,Fl,on,Wr,Qn,Xn,un,Yn,Jn,ea,vc=P(()=>{vm(),xm(),ee(),Ct(),An(),kd(),Hl=(e,t)=>{ge()._OrtInit(e,t)!==0&&he("Can't initialize onnxruntime.")},Kn=async e=>{Hl(e.wasm.numThreads,Mr(e.logLevel))},Zn=async(e,t)=>{var r,n;(n=(r=ge()).asyncInit)==null||n.call(r);{let a=(_g(),sr(bc)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let i=e.webgpu.adapter;if(i){if(typeof i.limits!="object"||typeof i.features!="object"||typeof i.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let s=e.webgpu.powerPreference;if(s!==void 0&&s!=="low-power"&&s!=="high-performance")throw new Error(`Invalid powerPreference setting: "${s}"`);let u=e.webgpu.forceFallbackAdapter;if(u!==void 0&&typeof u!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${u}"`);if(i=await navigator.gpu.requestAdapter({powerPreference:s,forceFallbackAdapter:u}),!i)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await a("webgpu",ge(),e,i)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await a("webnn",ge(),e)}}},ct=new Map,Fl=e=>{let t=ge(),r=t.stackSave();try{let n=t.PTR_SIZE,a=t.stackAlloc(2*n);t._OrtGetInputOutputCount(e,a,a+n)!==0&&he("Can't get session input/output count.");let i=n===4?"i32":"i64";return[Number(t.getValue(a,i)),Number(t.getValue(a+n,i))]}finally{t.stackRestore(r)}},on=(e,t)=>{let r=ge(),n=r.stackSave(),a=0;try{let i=r.PTR_SIZE,s=r.stackAlloc(2*i);r._OrtGetInputOutputMetadata(e,t,s,s+i)!==0&&he("Can't get session input/output metadata.");let u=Number(r.getValue(s,"*"));a=Number(r.getValue(s+i,"*"));let d=r.HEAP32[a/4];if(d===0)return[u,0];let l=r.HEAPU32[a/4+1],f=[];for(let c=0;c<l;c++){let m=Number(r.getValue(a+8+c*i,"*"));f.push(m!==0?r.UTF8ToString(m):Number(r.getValue(a+8+(c+l)*i,"*")))}return[u,d,f]}finally{r.stackRestore(n),a!==0&&r._OrtFree(a)}},Wr=e=>{let t=ge(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},Qn=async(e,t)=>{var c,m,g,_;let r,n,a=ge();Array.isArray(e)?[r,n]=e:e.buffer===a.HEAPU8.buffer?[r,n]=[e.byteOffset,e.byteLength]:[r,n]=Wr(e);let i=0,s=0,u=0,d=[],l=[],f=[];try{if([s,d]=await xd(t),(t==null?void 0:t.externalData)&&a.mountExternalData){let C=[];for(let A of t.externalData){let q=typeof A=="string"?A:A.path;C.push(Nn(typeof A=="string"?A:A.data).then(X=>{a.mountExternalData(q,X)}))}await Promise.all(C)}for(let C of(t==null?void 0:t.executionProviders)??[])if((typeof C=="string"?C:C.name)==="webnn"){if(a.shouldTransferToMLTensor=!1,typeof C!="string"){let A=C,q=A==null?void 0:A.context,X=A==null?void 0:A.gpuDevice,G=A==null?void 0:A.deviceType,Z=A==null?void 0:A.powerPreference;q?a.currentContext=q:X?a.currentContext=await a.webnnCreateMLContext(X):a.currentContext=await a.webnnCreateMLContext({deviceType:G,powerPreference:Z})}else a.currentContext=await a.webnnCreateMLContext();break}i=await a._OrtCreateSession(r,n,s),(c=a.webgpuOnCreateSession)==null||c.call(a,i),i===0&&he("Can't create a session."),(m=a.jsepOnCreateSession)==null||m.call(a),a.currentContext&&(a.webnnRegisterMLContext(i,a.currentContext),a.currentContext=void 0,a.shouldTransferToMLTensor=!0);let[b,x]=Fl(i),$=!!(t!=null&&t.enableGraphCapture),w=[],S=[],k=[],T=[],E=[];for(let C=0;C<b;C++){let[A,q,X]=on(i,C);A===0&&he("Can't get an input name."),l.push(A);let G=a.UTF8ToString(A);w.push(G),k.push(q===0?{name:G,isTensor:!1}:{name:G,isTensor:!0,type:nt(q),shape:X})}for(let C=0;C<x;C++){let[A,q,X]=on(i,C+b);A===0&&he("Can't get an output name."),f.push(A);let G=a.UTF8ToString(A);S.push(G),T.push(q===0?{name:G,isTensor:!1}:{name:G,isTensor:!0,type:nt(q),shape:X});{if($&&(t==null?void 0:t.preferredOutputLocation)===void 0){E.push("gpu-buffer");continue}let Z=typeof(t==null?void 0:t.preferredOutputLocation)=="string"?t.preferredOutputLocation:((g=t==null?void 0:t.preferredOutputLocation)==null?void 0:g[G])??"cpu",oe=a.webnnIsGraphOutput;if(Z==="cpu"&&oe&&oe(i,G)){E.push("ml-tensor-cpu-output");continue}if(Z!=="cpu"&&Z!=="cpu-pinned"&&Z!=="gpu-buffer"&&Z!=="ml-tensor")throw new Error(`Not supported preferred output location: ${Z}.`);if($&&Z!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${Z}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);E.push(Z)}}let z=null;return E.some(C=>C==="gpu-buffer"||C==="ml-tensor"||C==="ml-tensor-cpu-output")&&(u=a._OrtCreateBinding(i),u===0&&he("Can't create IO binding."),z={handle:u,outputPreferredLocations:E,outputPreferredLocationsEncoded:E.map(C=>C==="ml-tensor-cpu-output"?"ml-tensor":C).map(C=>fn(C))}),ct.set(i,[i,l,f,z,$,!1]),[i,w,S,k,T]}catch(b){throw l.forEach(x=>a._OrtFree(x)),f.forEach(x=>a._OrtFree(x)),u!==0&&a._OrtReleaseBinding(u)!==0&&he("Can't release IO binding."),i!==0&&a._OrtReleaseSession(i)!==0&&he("Can't release session."),b}finally{a._free(r),s!==0&&a._OrtReleaseSessionOptions(s)!==0&&he("Can't release session options."),d.forEach(b=>a._free(b)),(_=a.unmountExternalData)==null||_.call(a)}},Xn=e=>{var d,l,f;let t=ge(),r=ct.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[n,a,i,s,u]=r;s&&(u&&t._OrtClearBoundOutputs(s.handle)!==0&&he("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&he("Can't release IO binding.")),(d=t.jsepOnReleaseSession)==null||d.call(t,e),(l=t.webnnOnReleaseSession)==null||l.call(t,e),(f=t.webgpuOnReleaseSession)==null||f.call(t,e),a.forEach(c=>t._OrtFree(c)),i.forEach(c=>t._OrtFree(c)),t._OrtReleaseSession(n)!==0&&he("Can't release session."),ct.delete(e)},un=async(e,t,r,n,a,i,s=!1)=>{if(!e){t.push(0);return}let u=ge(),d=u.PTR_SIZE,l=e[0],f=e[1],c=e[3],m=c,g,_;if(l==="string"&&(c==="gpu-buffer"||c==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&c!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${i} when enableGraphCapture is true.`);if(c==="gpu-buffer"){let $=e[2].gpuBuffer;_=Tt(St(l),f);{let w=u.jsepRegisterBuffer;if(!w)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');g=w(n,i,$,_)}}else if(c==="ml-tensor"){let $=e[2].mlTensor;_=Tt(St(l),f);let w=u.webnnRegisterMLTensor;if(!w)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');g=w(n,$,St(l),f)}else{let $=e[2];if(Array.isArray($)){_=d*$.length,g=u._malloc(_),r.push(g);for(let w=0;w<$.length;w++){if(typeof $[w]!="string")throw new TypeError(`tensor data at index ${w} is not a string`);u.setValue(g+w*d,He($[w],r),"*")}}else{let w=u.webnnIsGraphInput,S=u.webnnIsGraphOutput;if(l!=="string"&&w&&S){let k=u.UTF8ToString(a);if(w(n,k)||S(n,k)){let T=St(l);_=Tt(T,f),m="ml-tensor";let E=u.webnnCreateTemporaryTensor,z=u.webnnUploadTensor;if(!E||!z)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let C=await E(n,T,f);z(C,new Uint8Array($.buffer,$.byteOffset,$.byteLength)),g=C}else _=$.byteLength,g=u._malloc(_),r.push(g),u.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,_),g)}else _=$.byteLength,g=u._malloc(_),r.push(g),u.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,_),g)}}let b=u.stackSave(),x=u.stackAlloc(4*f.length);try{f.forEach((w,S)=>u.setValue(x+S*d,w,d===4?"i32":"i64"));let $=u._OrtCreateTensor(St(l),g,_,x,f.length,fn(m));$===0&&he(`Can't create tensor for input/output. session=${n}, index=${i}.`),t.push($)}finally{u.stackRestore(b)}},Yn=async(e,t,r,n,a,i)=>{var X,G,Z,oe;let s=ge(),u=s.PTR_SIZE,d=ct.get(e);if(!d)throw new Error(`cannot run inference. invalid session id: ${e}`);let l=d[0],f=d[1],c=d[2],m=d[3],g=d[4],_=d[5],b=t.length,x=n.length,$=0,w=[],S=[],k=[],T=[],E=s.stackSave(),z=s.stackAlloc(b*u),C=s.stackAlloc(b*u),A=s.stackAlloc(x*u),q=s.stackAlloc(x*u);try{[$,w]=vd(i);for(let F=0;F<b;F++)await un(r[F],S,T,e,f[t[F]],t[F],g);for(let F=0;F<x;F++)await un(a[F],k,T,e,c[n[F]],b+n[F],g);for(let F=0;F<b;F++)s.setValue(z+F*u,S[F],"*"),s.setValue(C+F*u,f[t[F]],"*");for(let F=0;F<x;F++)s.setValue(A+F*u,k[F],"*"),s.setValue(q+F*u,c[n[F]],"*");if(m&&!_){let{handle:F,outputPreferredLocations:Y,outputPreferredLocationsEncoded:ye}=m;if(f.length!==b)throw new Error(`input count from feeds (${b}) is expected to be always equal to model's input count (${f.length}).`);for(let N=0;N<b;N++){let U=t[N];await s._OrtBindInput(F,f[U],S[N])!==0&&he(`Can't bind input[${N}] for session=${e}.`)}for(let N=0;N<x;N++){let U=n[N];(X=a[N])!=null&&X[3]?s._OrtBindOutput(F,c[U],k[N],0)!==0&&he(`Can't bind pre-allocated output[${N}] for session=${e}.`):s._OrtBindOutput(F,c[U],0,ye[U])!==0&&he(`Can't bind output[${N}] to ${Y[N]} for session=${e}.`)}ct.set(e,[l,f,c,m,g,!0])}(G=s.jsepOnRunStart)==null||G.call(s,l),(Z=s.webnnOnRunStart)==null||Z.call(s,l);let re;m?re=await s._OrtRunWithBinding(l,m.handle,x,A,$):re=await s._OrtRun(l,C,z,b,q,x,A,$),re!==0&&he("failed to call OrtRun().");let L=[],ie=[];for(let F=0;F<x;F++){let Y=Number(s.getValue(A+F*u,"*"));if(Y===k[F]){L.push(a[F]);continue}let ye=s.stackSave(),N=s.stackAlloc(4*u),U=!1,V,te=0;try{s._OrtGetTensorData(Y,N,N+u,N+2*u,N+3*u)!==0&&he(`Can't access output tensor data on index ${F}.`);let Te=u===4?"i32":"i64",M=Number(s.getValue(N,Te));te=s.getValue(N+u,"*");let fe=s.getValue(N+u*2,"*"),At=Number(s.getValue(N+u*3,Te)),ze=[];for(let ce=0;ce<At;ce++)ze.push(Number(s.getValue(fe+ce*u,Te)));s._OrtFree(fe)!==0&&he("Can't free memory for tensor dims.");let Ue=ze.reduce((ce,we)=>ce*we,1);V=nt(M);let et=m==null?void 0:m.outputPreferredLocations[n[F]];if(V==="string"){if(et==="gpu-buffer"||et==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let ce=[];for(let we=0;we<Ue;we++){let Be=s.getValue(te+we*u,"*"),_t=s.getValue(te+(we+1)*u,"*"),yt=we===Ue-1?void 0:_t-Be;ce.push(s.UTF8ToString(Be,yt))}L.push([V,ze,ce,"cpu"])}else if(et==="gpu-buffer"&&Ue>0){let ce=s.jsepGetBuffer;if(!ce)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let we=ce(te),Be=Tt(M,Ue);if(Be===void 0||!Bn(V))throw new Error(`Unsupported data type: ${V}`);U=!0,L.push([V,ze,{gpuBuffer:we,download:s.jsepCreateDownloader(we,Be,V),dispose:()=>{s._OrtReleaseTensor(Y)!==0&&he("Can't release tensor.")}},"gpu-buffer"])}else if(et==="ml-tensor"&&Ue>0){let ce=s.webnnEnsureTensor,we=s.webnnIsGraphInputOutputTypeSupported;if(!ce||!we)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Tt(M,Ue)===void 0||!Rn(V))throw new Error(`Unsupported data type: ${V}`);if(!we(e,V,!1))throw new Error(`preferredLocation "ml-tensor" for ${V} output is not supported by current WebNN Context.`);let Be=await ce(e,te,M,ze,!1);U=!0,L.push([V,ze,{mlTensor:Be,download:s.webnnCreateMLTensorDownloader(te,V),dispose:()=>{s.webnnReleaseTensorId(te),s._OrtReleaseTensor(Y)}},"ml-tensor"])}else if(et==="ml-tensor-cpu-output"&&Ue>0){let ce=s.webnnCreateMLTensorDownloader(te,V)(),we=L.length;U=!0,ie.push((async()=>{let Be=[we,await ce];return s.webnnReleaseTensorId(te),s._OrtReleaseTensor(Y),Be})()),L.push([V,ze,[],"cpu"])}else{let ce=Vr(V),we=new ce(Ue);new Uint8Array(we.buffer,we.byteOffset,we.byteLength).set(s.HEAPU8.subarray(te,te+we.byteLength)),L.push([V,ze,we,"cpu"])}}finally{s.stackRestore(ye),V==="string"&&te&&s._free(te),U||s._OrtReleaseTensor(Y)}}m&&!g&&(s._OrtClearBoundOutputs(m.handle)!==0&&he("Can't clear bound outputs."),ct.set(e,[l,f,c,m,g,!1]));for(let[F,Y]of await Promise.all(ie))L[F][2]=Y;return L}finally{(oe=s.webnnOnRunEnd)==null||oe.call(s,l),s.stackRestore(E),S.forEach(re=>s._OrtReleaseTensor(re)),k.forEach(re=>s._OrtReleaseTensor(re)),T.forEach(re=>s._free(re)),$!==0&&s._OrtReleaseRunOptions($),w.forEach(re=>s._free(re))}},Jn=e=>{let t=ge(),r=ct.get(e);if(!r)throw new Error("invalid session id");let n=r[0],a=t._OrtEndProfiling(n);a===0&&he("Can't get an profile file name."),t._OrtFree(a)},ea=e=>{let t=[];for(let r of e){let n=r[2];!Array.isArray(n)&&"buffer"in n&&t.push(n.buffer)}return t}}),ht,Ae,Nt,Jt,er,Cr,ln,Or,vt,xt,jl,xc,kc,Sc,Tc,Ic,Ec,zc,Cc=P(()=>{je(),vc(),Ct(),Cn(),ht=()=>!!_e.wasm.proxy&&typeof document<"u",Nt=!1,Jt=!1,er=!1,Or=new Map,vt=(e,t)=>{let r=Or.get(e);r?r.push(t):Or.set(e,[t])},xt=()=>{if(Nt||!Jt||er||!Ae)throw new Error("worker not ready")},jl=e=>{switch(e.data.type){case"init-wasm":Nt=!1,e.data.err?(er=!0,ln[1](e.data.err)):(Jt=!0,ln[0]()),Cr&&(URL.revokeObjectURL(Cr),Cr=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Or.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},xc=async()=>{if(!Jt){if(Nt)throw new Error("multiple calls to 'initWasm()' detected.");if(er)throw new Error("previous call to 'initWasm()' failed.");if(Nt=!0,ht())return new Promise((e,t)=>{Ae==null||Ae.terminate(),wd().then(([r,n])=>{try{Ae=n,Ae.onerror=i=>t(i),Ae.onmessage=jl,ln=[e,t];let a={type:"init-wasm",in:_e};!a.in.wasm.wasmPaths&&(r||pn)&&(a.in.wasm.wasmPaths={wasm:new URL("/yolo-object-detection-onnxruntime-web/assets/ort-wasm-simd-threaded.jsep-CLPRrI3A.wasm",import.meta.url).href}),Ae.postMessage(a),Cr=r}catch(a){t(a)}},t)});try{await On(_e.wasm),await Kn(_e),Jt=!0}catch(e){throw er=!0,e}finally{Nt=!1}}},kc=async e=>{if(ht())return xt(),new Promise((t,r)=>{vt("init-ep",[t,r]);let n={type:"init-ep",in:{epName:e,env:_e}};Ae.postMessage(n)});await Zn(_e,e)},Sc=async e=>ht()?(xt(),new Promise((t,r)=>{vt("copy-from",[t,r]);let n={type:"copy-from",in:{buffer:e}};Ae.postMessage(n,[e.buffer])})):Wr(e),Tc=async(e,t)=>{if(ht()){if(t!=null&&t.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return xt(),new Promise((r,n)=>{vt("create",[r,n]);let a={type:"create",in:{model:e,options:{...t}}},i=[];e instanceof Uint8Array&&i.push(e.buffer),Ae.postMessage(a,i)})}else return Qn(e,t)},Ic=async e=>{if(ht())return xt(),new Promise((t,r)=>{vt("release",[t,r]);let n={type:"release",in:e};Ae.postMessage(n)});Xn(e)},Ec=async(e,t,r,n,a,i)=>{if(ht()){if(r.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(a.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return xt(),new Promise((s,u)=>{vt("run",[s,u]);let d=r,l={type:"run",in:{sessionId:e,inputIndices:t,inputs:d,outputIndices:n,options:i}};Ae.postMessage(l,ea(d))})}else return Yn(e,t,r,n,a,i)},zc=async e=>{if(ht())return xt(),new Promise((t,r)=>{vt("end-profiling",[t,r]);let n={type:"end-profiling",in:e};Ae.postMessage(n)});Jn(e)}}),dn,Kl,Oc,yg=P(()=>{je(),Cc(),ee(),zn(),kd(),dn=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Kl=e=>{switch(e[3]){case"cpu":return new Ye(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Bn(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:a}=e[2];return Ye.fromGpuBuffer(r,{dataType:t,dims:e[1],download:n,dispose:a})}case"ml-tensor":{let t=e[0];if(!Rn(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:n,dispose:a}=e[2];return Ye.fromMLTensor(r,{dataType:t,dims:e[1],download:n,dispose:a})}default:throw new Error(`invalid data location: ${e[3]}`)}},Oc=class{async fetchModelAndCopyToWasmMemory(e){return Sc(await Nn(e))}async loadModel(e,t){Je();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Tc(r,t),Fe()}async dispose(){return Ic(this.sessionId)}async run(e,t,r){Je();let n=[],a=[];Object.entries(e).forEach(c=>{let m=c[0],g=c[1],_=this.inputNames.indexOf(m);if(_===-1)throw new Error(`invalid input '${m}'`);n.push(g),a.push(_)});let i=[],s=[];Object.entries(t).forEach(c=>{let m=c[0],g=c[1],_=this.outputNames.indexOf(m);if(_===-1)throw new Error(`invalid output '${m}'`);i.push(g),s.push(_)});let u=n.map((c,m)=>dn(c,()=>`input "${this.inputNames[a[m]]}"`)),d=i.map((c,m)=>c?dn(c,()=>`output "${this.outputNames[s[m]]}"`):null),l=await Ec(this.sessionId,a,u,s,d,r),f={};for(let c=0;c<l.length;c++)f[this.outputNames[s[c]]]=i[c]??Kl(l[c]);return Fe(),f}startProfiling(){}endProfiling(){zc(this.sessionId)}}}),Ac={};qt(Ac,{OnnxruntimeWebAssemblyBackend:()=>Tn,initializeFlags:()=>Sn,wasmBackend:()=>Bc});var Sn,Tn,Bc,bg=P(()=>{je(),Cc(),yg(),Sn=()=>{(typeof _e.wasm.initTimeout!="number"||_e.wasm.initTimeout<0)&&(_e.wasm.initTimeout=0);let e=_e.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),_e.wasm.simd=!1),typeof _e.wasm.proxy!="boolean"&&(_e.wasm.proxy=!1),typeof _e.wasm.trace!="boolean"&&(_e.wasm.trace=!1),typeof _e.wasm.numThreads!="number"||!Number.isInteger(_e.wasm.numThreads)||_e.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)_e.wasm.numThreads=1;else{let t=typeof navigator>"u"?am("node:os").cpus().length:navigator.hardwareConcurrency;_e.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},Tn=class{async init(e){Sn(),await xc(),await kc(e)}async createInferenceSessionHandler(e,t){let r=new Oc;return await r.loadModel(e,t),r}},Bc=new Tn});je();je();je();var wg="1.22.0",vg=hd;{let e=(bg(),sr(Ac)).wasmBackend;Mt("webgpu",e,5),Mt("webnn",e,5),Mt("cpu",e,10),Mt("wasm",e,10)}Object.defineProperty(_e.versions,"web",{value:wg,enumerable:!0});/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*//**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */export{cd as InferenceSession,Rr as TRACE,Je as TRACE_FUNC_BEGIN,Fe as TRACE_FUNC_END,Ye as Tensor,vg as default,_e as env,Mt as registerBackend};
