import TestCrawler from "../crawler/main.js";
import { parentPort } from "worker_threads";

parentPort.on("message", async (value) => {
  const start = new Date();
  await TestCrawler(value);
  const end = new Date();
  console.log(`${value}\nTime used : ${(end - start) / 1000} seconds`);
});
