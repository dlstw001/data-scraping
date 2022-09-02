import { Worker, isMainThread } from "worker_threads";
import appRoot from "app-root-path";

const workerNum = 3;
const workList = [
  "https://www.smartone.com/tc/home/",
  "https://www.three.com.hk/tc/home.html",
  "https://www.hkcsl.com/",
  "https://eshop.hk.chinamobile.com/tc/",
];

export default async function master() {
  if (isMainThread) {
    const server = new Worker(appRoot.resolve("/src/server/app.js"));
    server.postMessage("4000");
    server.on("error", (msg) => console.log(msg));
    await new Promise((resolve, reject) => {
      for (let i = 0; i < workerNum; i++) {
        const worker = new Worker(appRoot.resolve("/src/worker/worker.js"));
        worker.postMessage(workList[i]);
        worker.on("error", (msg) => console.log(msg));
        worker.on("exit", (code) => {
          console.log(code);
          if (code != 0)
            reject(new Error(`Worker stopped with exit code ${code}`));
        });
      }
    });
  }
}
