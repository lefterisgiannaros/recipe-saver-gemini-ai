/*! For license information please see bundle.js.LICENSE.txt */
(()=>{"use strict";var t,e,n;!function(t){t.STRING="string",t.NUMBER="number",t.INTEGER="integer",t.BOOLEAN="boolean",t.ARRAY="array",t.OBJECT="object"}(t||(t={})),function(t){t.LANGUAGE_UNSPECIFIED="language_unspecified",t.PYTHON="python"}(e||(e={})),function(t){t.OUTCOME_UNSPECIFIED="outcome_unspecified",t.OUTCOME_OK="outcome_ok",t.OUTCOME_FAILED="outcome_failed",t.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"}(n||(n={}));const s=["user","model","function","system"];var o,i,a,r,c,l,d,u,h;!function(t){t.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",t.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",t.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",t.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",t.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT"}(o||(o={})),function(t){t.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",t.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",t.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",t.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",t.BLOCK_NONE="BLOCK_NONE"}(i||(i={})),function(t){t.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",t.NEGLIGIBLE="NEGLIGIBLE",t.LOW="LOW",t.MEDIUM="MEDIUM",t.HIGH="HIGH"}(a||(a={})),function(t){t.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",t.SAFETY="SAFETY",t.OTHER="OTHER"}(r||(r={})),function(t){t.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",t.STOP="STOP",t.MAX_TOKENS="MAX_TOKENS",t.SAFETY="SAFETY",t.RECITATION="RECITATION",t.LANGUAGE="LANGUAGE",t.OTHER="OTHER"}(c||(c={})),function(t){t.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",t.RETRIEVAL_QUERY="RETRIEVAL_QUERY",t.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",t.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",t.CLASSIFICATION="CLASSIFICATION",t.CLUSTERING="CLUSTERING"}(l||(l={})),function(t){t.MODE_UNSPECIFIED="MODE_UNSPECIFIED",t.AUTO="AUTO",t.ANY="ANY",t.NONE="NONE"}(d||(d={})),function(t){t.MODE_UNSPECIFIED="MODE_UNSPECIFIED",t.MODE_DYNAMIC="MODE_DYNAMIC"}(u||(u={}));class f extends Error{constructor(t){super(`[GoogleGenerativeAI Error]: ${t}`)}}class g extends f{constructor(t,e){super(t),this.response=e}}class p extends f{constructor(t,e,n,s){super(t),this.status=e,this.statusText=n,this.errorDetails=s}}class m extends f{}!function(t){t.GENERATE_CONTENT="generateContent",t.STREAM_GENERATE_CONTENT="streamGenerateContent",t.COUNT_TOKENS="countTokens",t.EMBED_CONTENT="embedContent",t.BATCH_EMBED_CONTENTS="batchEmbedContents"}(h||(h={}));class E{constructor(t,e,n,s,o){this.model=t,this.task=e,this.apiKey=n,this.stream=s,this.requestOptions=o}toString(){var t,e;const n=(null===(t=this.requestOptions)||void 0===t?void 0:t.apiVersion)||"v1beta";let s=`${(null===(e=this.requestOptions)||void 0===e?void 0:e.baseUrl)||"https://generativelanguage.googleapis.com"}/${n}/${this.model}:${this.task}`;return this.stream&&(s+="?alt=sse"),s}}async function y(t){var e;const n=new Headers;n.append("Content-Type","application/json"),n.append("x-goog-api-client",function(t){const e=[];return(null==t?void 0:t.apiClient)&&e.push(t.apiClient),e.push("genai-js/0.21.0"),e.join(" ")}(t.requestOptions)),n.append("x-goog-api-key",t.apiKey);let s=null===(e=t.requestOptions)||void 0===e?void 0:e.customHeaders;if(s){if(!(s instanceof Headers))try{s=new Headers(s)}catch(t){throw new m(`unable to convert customHeaders value ${JSON.stringify(s)} to Headers: ${t.message}`)}for(const[t,e]of s.entries()){if("x-goog-api-key"===t)throw new m(`Cannot set reserved header name ${t}`);if("x-goog-api-client"===t)throw new m(`Header name ${t} can only be set using the apiClient field`);n.append(t,e)}}return n}async function C(t,e,n,s,o,i={},a=fetch){const{url:r,fetchOptions:c}=await async function(t,e,n,s,o,i){const a=new E(t,e,n,s,i);return{url:a.toString(),fetchOptions:Object.assign(Object.assign({},O(i)),{method:"POST",headers:await y(a),body:o})}}(t,e,n,s,o,i);return async function(t,e,n=fetch){let s;try{s=await n(t,e)}catch(e){!function(t,e){let n=t;throw t instanceof p||t instanceof m||(n=new f(`Error fetching from ${e.toString()}: ${t.message}`),n.stack=t.stack),n}(e,t)}return s.ok||await async function(t,e){let n,s="";try{const e=await t.json();s=e.error.message,e.error.details&&(s+=` ${JSON.stringify(e.error.details)}`,n=e.error.details)}catch(t){}throw new p(`Error fetching from ${e.toString()}: [${t.status} ${t.statusText}] ${s}`,t.status,t.statusText,n)}(s,t),s}(r,c,a)}function O(t){const e={};if(void 0!==(null==t?void 0:t.signal)||(null==t?void 0:t.timeout)>=0){const n=new AbortController;(null==t?void 0:t.timeout)>=0&&setTimeout((()=>n.abort()),t.timeout),(null==t?void 0:t.signal)&&t.signal.addEventListener("abort",(()=>{n.abort()})),e.signal=n.signal}return e}function v(t){return t.text=()=>{if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&console.warn(`This response had ${t.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),w(t.candidates[0]))throw new g(`${T(t)}`,t);return function(t){var e,n,s,o;const i=[];if(null===(n=null===(e=t.candidates)||void 0===e?void 0:e[0].content)||void 0===n?void 0:n.parts)for(const e of null===(o=null===(s=t.candidates)||void 0===s?void 0:s[0].content)||void 0===o?void 0:o.parts)e.text&&i.push(e.text),e.executableCode&&i.push("\n```"+e.executableCode.language+"\n"+e.executableCode.code+"\n```\n"),e.codeExecutionResult&&i.push("\n```\n"+e.codeExecutionResult.output+"\n```\n");return i.length>0?i.join(""):""}(t)}if(t.promptFeedback)throw new g(`Text not available. ${T(t)}`,t);return""},t.functionCall=()=>{if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&console.warn(`This response had ${t.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),w(t.candidates[0]))throw new g(`${T(t)}`,t);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),_(t)[0]}if(t.promptFeedback)throw new g(`Function call not available. ${T(t)}`,t)},t.functionCalls=()=>{if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&console.warn(`This response had ${t.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),w(t.candidates[0]))throw new g(`${T(t)}`,t);return _(t)}if(t.promptFeedback)throw new g(`Function call not available. ${T(t)}`,t)},t}function _(t){var e,n,s,o;const i=[];if(null===(n=null===(e=t.candidates)||void 0===e?void 0:e[0].content)||void 0===n?void 0:n.parts)for(const e of null===(o=null===(s=t.candidates)||void 0===s?void 0:s[0].content)||void 0===o?void 0:o.parts)e.functionCall&&i.push(e.functionCall);return i.length>0?i:void 0}const I=[c.RECITATION,c.SAFETY,c.LANGUAGE];function w(t){return!!t.finishReason&&I.includes(t.finishReason)}function T(t){var e,n,s;let o="";if(t.candidates&&0!==t.candidates.length||!t.promptFeedback){if(null===(s=t.candidates)||void 0===s?void 0:s[0]){const e=t.candidates[0];w(e)&&(o+=`Candidate was blocked due to ${e.finishReason}`,e.finishMessage&&(o+=`: ${e.finishMessage}`))}}else o+="Response was blocked",(null===(e=t.promptFeedback)||void 0===e?void 0:e.blockReason)&&(o+=` due to ${t.promptFeedback.blockReason}`),(null===(n=t.promptFeedback)||void 0===n?void 0:n.blockReasonMessage)&&(o+=`: ${t.promptFeedback.blockReasonMessage}`);return o}function S(t){return this instanceof S?(this.v=t,this):new S(t)}"function"==typeof SuppressedError&&SuppressedError;const N=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function R(t){const e=[],n=t.getReader();for(;;){const{done:t,value:s}=await n.read();if(t)return v(b(e));e.push(s)}}function A(t){return function(t,e,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var s,o=n.apply(t,e||[]),i=[];return s={},a("next"),a("throw"),a("return"),s[Symbol.asyncIterator]=function(){return this},s;function a(t){o[t]&&(s[t]=function(e){return new Promise((function(n,s){i.push([t,e,n,s])>1||r(t,e)}))})}function r(t,e){try{(n=o[t](e)).value instanceof S?Promise.resolve(n.value.v).then(c,l):d(i[0][2],n)}catch(t){d(i[0][3],t)}var n}function c(t){r("next",t)}function l(t){r("throw",t)}function d(t,e){t(e),i.shift(),i.length&&r(i[0][0],i[0][1])}}(this,arguments,(function*(){const e=t.getReader();for(;;){const{value:t,done:n}=yield S(e.read());if(n)break;yield yield S(v(t))}}))}function b(t){const e=t[t.length-1],n={promptFeedback:null==e?void 0:e.promptFeedback};for(const e of t){if(e.candidates)for(const t of e.candidates){const e=t.index;if(n.candidates||(n.candidates=[]),n.candidates[e]||(n.candidates[e]={index:t.index}),n.candidates[e].citationMetadata=t.citationMetadata,n.candidates[e].groundingMetadata=t.groundingMetadata,n.candidates[e].finishReason=t.finishReason,n.candidates[e].finishMessage=t.finishMessage,n.candidates[e].safetyRatings=t.safetyRatings,t.content&&t.content.parts){n.candidates[e].content||(n.candidates[e].content={role:t.content.role||"user",parts:[]});const s={};for(const o of t.content.parts)o.text&&(s.text=o.text),o.functionCall&&(s.functionCall=o.functionCall),o.executableCode&&(s.executableCode=o.executableCode),o.codeExecutionResult&&(s.codeExecutionResult=o.codeExecutionResult),0===Object.keys(s).length&&(s.text=""),n.candidates[e].content.parts.push(s)}}e.usageMetadata&&(n.usageMetadata=e.usageMetadata)}return n}async function M(t,e,n,s){return function(t){const e=function(t){const e=t.getReader();return new ReadableStream({start(t){let n="";return function s(){return e.read().then((({value:e,done:o})=>{if(o)return n.trim()?void t.error(new f("Failed to parse stream")):void t.close();n+=e;let i,a=n.match(N);for(;a;){try{i=JSON.parse(a[1])}catch(e){return void t.error(new f(`Error parsing JSON response: "${a[1]}"`))}t.enqueue(i),n=n.substring(a[0].length),a=n.match(N)}return s()}))}()}})}(t.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0}))),[n,s]=e.tee();return{stream:A(n),response:R(s)}}(await C(e,h.STREAM_GENERATE_CONTENT,t,!0,JSON.stringify(n),s))}async function x(t,e,n,s){const o=await C(e,h.GENERATE_CONTENT,t,!1,JSON.stringify(n),s);return{response:v(await o.json())}}function L(t){if(null!=t)return"string"==typeof t?{role:"system",parts:[{text:t}]}:t.text?{role:"system",parts:[t]}:t.parts?t.role?t:{role:"system",parts:t.parts}:void 0}function D(t){let e=[];if("string"==typeof t)e=[{text:t}];else for(const n of t)"string"==typeof n?e.push({text:n}):e.push(n);return function(t){const e={role:"user",parts:[]},n={role:"function",parts:[]};let s=!1,o=!1;for(const i of t)"functionResponse"in i?(n.parts.push(i),o=!0):(e.parts.push(i),s=!0);if(s&&o)throw new f("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!s&&!o)throw new f("No content is provided for sending chat message.");return s?e:n}(e)}function $(t){let e;return e=t.contents?t:{contents:[D(t)]},t.systemInstruction&&(e.systemInstruction=L(t.systemInstruction)),e}const j=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],H={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]},U="SILENT_ERROR";class P{constructor(t,e,n,o={}){this.model=e,this.params=n,this._requestOptions=o,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=t,(null==n?void 0:n.history)&&(function(t){let e=!1;for(const n of t){const{role:t,parts:o}=n;if(!e&&"user"!==t)throw new f(`First content should be with role 'user', got ${t}`);if(!s.includes(t))throw new f(`Each item should include role field. Got ${t} but valid roles are: ${JSON.stringify(s)}`);if(!Array.isArray(o))throw new f("Content should have 'parts' property with an array of Parts");if(0===o.length)throw new f("Each Content should have at least one part");const i={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const t of o)for(const e of j)e in t&&(i[e]+=1);const a=H[t];for(const e of j)if(!a.includes(e)&&i[e]>0)throw new f(`Content with role '${t}' can't contain '${e}' part`);e=!0}}(n.history),this._history=n.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(t,e={}){var n,s,o,i,a,r;await this._sendPromise;const c=D(t),l={safetySettings:null===(n=this.params)||void 0===n?void 0:n.safetySettings,generationConfig:null===(s=this.params)||void 0===s?void 0:s.generationConfig,tools:null===(o=this.params)||void 0===o?void 0:o.tools,toolConfig:null===(i=this.params)||void 0===i?void 0:i.toolConfig,systemInstruction:null===(a=this.params)||void 0===a?void 0:a.systemInstruction,cachedContent:null===(r=this.params)||void 0===r?void 0:r.cachedContent,contents:[...this._history,c]},d=Object.assign(Object.assign({},this._requestOptions),e);let u;return this._sendPromise=this._sendPromise.then((()=>x(this._apiKey,this.model,l,d))).then((t=>{var e;if(t.response.candidates&&t.response.candidates.length>0){this._history.push(c);const n=Object.assign({parts:[],role:"model"},null===(e=t.response.candidates)||void 0===e?void 0:e[0].content);this._history.push(n)}else{const e=T(t.response);e&&console.warn(`sendMessage() was unsuccessful. ${e}. Inspect response object for details.`)}u=t})),await this._sendPromise,u}async sendMessageStream(t,e={}){var n,s,o,i,a,r;await this._sendPromise;const c=D(t),l={safetySettings:null===(n=this.params)||void 0===n?void 0:n.safetySettings,generationConfig:null===(s=this.params)||void 0===s?void 0:s.generationConfig,tools:null===(o=this.params)||void 0===o?void 0:o.tools,toolConfig:null===(i=this.params)||void 0===i?void 0:i.toolConfig,systemInstruction:null===(a=this.params)||void 0===a?void 0:a.systemInstruction,cachedContent:null===(r=this.params)||void 0===r?void 0:r.cachedContent,contents:[...this._history,c]},d=Object.assign(Object.assign({},this._requestOptions),e),u=M(this._apiKey,this.model,l,d);return this._sendPromise=this._sendPromise.then((()=>u)).catch((t=>{throw new Error(U)})).then((t=>t.response)).then((t=>{if(t.candidates&&t.candidates.length>0){this._history.push(c);const e=Object.assign({},t.candidates[0].content);e.role||(e.role="model"),this._history.push(e)}else{const e=T(t);e&&console.warn(`sendMessageStream() was unsuccessful. ${e}. Inspect response object for details.`)}})).catch((t=>{t.message!==U&&console.error(t)})),u}}class F{constructor(t,e,n={}){this.apiKey=t,this._requestOptions=n,e.model.includes("/")?this.model=e.model:this.model=`models/${e.model}`,this.generationConfig=e.generationConfig||{},this.safetySettings=e.safetySettings||[],this.tools=e.tools,this.toolConfig=e.toolConfig,this.systemInstruction=L(e.systemInstruction),this.cachedContent=e.cachedContent}async generateContent(t,e={}){var n;const s=$(t),o=Object.assign(Object.assign({},this._requestOptions),e);return x(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null===(n=this.cachedContent)||void 0===n?void 0:n.name},s),o)}async generateContentStream(t,e={}){var n;const s=$(t),o=Object.assign(Object.assign({},this._requestOptions),e);return M(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null===(n=this.cachedContent)||void 0===n?void 0:n.name},s),o)}startChat(t){var e;return new P(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null===(e=this.cachedContent)||void 0===e?void 0:e.name},t),this._requestOptions)}async countTokens(t,e={}){const n=function(t,e){var n;let s={model:null==e?void 0:e.model,generationConfig:null==e?void 0:e.generationConfig,safetySettings:null==e?void 0:e.safetySettings,tools:null==e?void 0:e.tools,toolConfig:null==e?void 0:e.toolConfig,systemInstruction:null==e?void 0:e.systemInstruction,cachedContent:null===(n=null==e?void 0:e.cachedContent)||void 0===n?void 0:n.name,contents:[]};const o=null!=t.generateContentRequest;if(t.contents){if(o)throw new m("CountTokensRequest must have one of contents or generateContentRequest, not both.");s.contents=t.contents}else if(o)s=Object.assign(Object.assign({},s),t.generateContentRequest);else{const e=D(t);s.contents=[e]}return{generateContentRequest:s}}(t,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),s=Object.assign(Object.assign({},this._requestOptions),e);return async function(t,e,n,s){return(await C(e,h.COUNT_TOKENS,t,!1,JSON.stringify(n),s)).json()}(this.apiKey,this.model,n,s)}async embedContent(t,e={}){const n="string"==typeof(o=t)||Array.isArray(o)?{content:D(o)}:o,s=Object.assign(Object.assign({},this._requestOptions),e);var o;return async function(t,e,n,s){return(await C(e,h.EMBED_CONTENT,t,!1,JSON.stringify(n),s)).json()}(this.apiKey,this.model,n,s)}async batchEmbedContents(t,e={}){const n=Object.assign(Object.assign({},this._requestOptions),e);return async function(t,e,n,s){const o=n.requests.map((t=>Object.assign(Object.assign({},t),{model:e})));return(await C(e,h.BATCH_EMBED_CONTENTS,t,!1,JSON.stringify({requests:o}),s)).json()}(this.apiKey,this.model,t,n)}}const k=new class{constructor(t){this.apiKey=t}getGenerativeModel(t,e){if(!t.model)throw new f("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new F(this.apiKey,t,e)}getGenerativeModelFromCachedContent(t,e,n){if(!t.name)throw new m("Cached content must contain a `name` field.");if(!t.model)throw new m("Cached content must contain a `model` field.");const s=["model","systemInstruction"];for(const n of s)if((null==e?void 0:e[n])&&t[n]&&(null==e?void 0:e[n])!==t[n]){if("model"===n&&(e.model.startsWith("models/")?e.model.replace("models/",""):e.model)===(t.model.startsWith("models/")?t.model.replace("models/",""):t.model))continue;throw new m(`Different value for "${n}" specified in modelParams (${e[n]}) and cachedContent (${t[n]})`)}const o=Object.assign(Object.assign({},e),{model:t.model,tools:t.tools,toolConfig:t.toolConfig,systemInstruction:t.systemInstruction,cachedContent:t});return new F(this.apiKey,o,n)}}("AIzaSyAN4Z82LgcsReNV2bXeLnruu9L2gwFDr70").getGenerativeModel({model:"gemini-1.5-flash"});function G(){return new Promise(((t,e)=>{chrome.storage.local.get(null,(n=>{if(chrome.runtime.lastError)return e(chrome.runtime.lastError);t(n)}))}))}function B(t){const e=document.getElementById("savedRecipesContainer");var n;n=t,e.innerHTML="",0!==Object.keys(n).length?Object.entries(n).forEach((([t,n])=>{const s=document.createElement("div");s.classList.add("accordion-item"),s.innerHTML=`\n        <div class="accordion-header">\n          <a href="${n.url}" target="_blank">${n.title}</a>\n        </div>\n        <div class="accordion-content" style="display: none;">\n          <h4>Ingredients:</h4>\n          <ul>\n            ${n.ingredients.map((t=>`<li>${t}</li>`)).join("")}\n          </ul>\n          <h4>Instructions:</h4>\n          <ul>\n            ${n.instructions.map((t=>`<li>${t}</li>`)).join("")}\n          </ul>\n        </div>\n        <button class="delete-btn" data-url="${t}">Delete</button>\n      `,e.appendChild(s);const o=s.querySelector(".accordion-header"),i=s.querySelector(".accordion-content");o.addEventListener("click",(()=>{i.style.display="none"===i.style.display?"block":"none"})),s.querySelector(".delete-btn").addEventListener("click",(async()=>{await function(t){return new Promise((e=>{chrome.storage.local.remove([t],(()=>{console.log(`Recipe for ${t} deleted from Chrome storage.`),e()}))}))}(t),G().then(B)}))})):e.innerHTML="<p>No recipes found.</p>"}document.getElementById("crawlBtn").addEventListener("click",(async()=>{const t=document.getElementById("message"),e=document.getElementById("error");document.getElementById("recipesList").style.display="none",t.style.display="block",t.textContent="",e.textContent="";try{const e=await async function(){try{const[t]=await chrome.tabs.query({active:!0,currentWindow:!0}),e=await chrome.scripting.executeScript({target:{tabId:t.id},function:()=>({title:document.querySelector("h1")?.innerText||"No title found",ingredients:Array.from(document.querySelectorAll(".single-list-item.grocery-list-item")).map((t=>t.innerText.trim())),instructions:Array.from(document.querySelectorAll(".instructions li")).map((t=>t.innerText.trim())),url:window.location.href})});if(e&&e[0]?.result)return e[0].result;throw new Error("No recipe content found on this page.")}catch(t){throw new Error(`Error scraping recipe: ${t.message}`)}}();t.textContent="Analyzing the recipe with Gemini AI...";const n=await async function(t){try{const e=`Here is a recipe:\n\nTitle: ${t.title}\n\nIngredients:\n${t.ingredients.join("\n")}\n\nInstructions:\n${t.instructions.join("\n")}`,n=await k.generateContent(e);return console.log(n),n.response&&n.response.text?n.response.text():"No response from AI"}catch(t){throw new Error(`Error analyzing recipe: ${t.message}`)}}(e);t.innerHTML=`<h3>Recipe Summary</h3><a href="${e.url}" target="_blank"><h4>${e.url}</h4></a><p>${n.replace(/\n/g,"<br>")}</p>`,function(t){const e={url:t,aiResponse:void 0,instructions:void 0,timestamp:(new Date).toISOString()};chrome.storage.local.set({[t]:e},(()=>{G().then((t=>{B(t)})),alert("Recipe saved!")}))}(e)}catch(t){e.textContent=`Error: ${t.message}`}})),document.getElementById("viewRecipesBtn").addEventListener("click",(async()=>{const t=document.getElementById("message");t.style.display="none",document.getElementById("recipesList").style.display="block";try{const e=await G();Object.keys(e).length>0?B(e):t.textContent="No saved recipes found."}catch(t){console.error("Error loading saved recipes:",t)}})),document.getElementById("exportBtn").addEventListener("click",(async()=>{const t=await G();if(Object.keys(t).length>0){const e=prompt("Export as JSON or Excel? (Enter 'json' or 'excel')").toLowerCase();"json"===e?function(t){const e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(e),n.download="recipes.json",n.click()}(t):"excel"===e?function(t){const e=XLSX.utils.book_new(),n=XLSX.utils.json_to_sheet(Object.values(t).map((t=>({URL:t.url,Response:t.response,Timestamp:t.timestamp}))));XLSX.utils.book_append_sheet(e,n,"Recipes"),XLSX.writeFile(e,"recipes.xlsx")}(t):alert("Invalid option! Please enter 'json' or 'excel'.")}else alert("No recipes to export.")}))})();