// WebLLM inference runs in this worker so the page and the blackboard stay smooth (js/local-tutor.js).
import { WebWorkerMLCEngineHandler } from './web-llm.js?v=0.2.88';
const handler = new WebWorkerMLCEngineHandler();
self.onmessage = msg => handler.onmessage(msg);
