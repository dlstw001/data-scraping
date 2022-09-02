import {
  PuppeteerCrawler,
  RequestQueue,
  RequestList,
  KeyValueStore,
} from "crawlee";
import requestHandler from "./config.js";
import { parseDomain, fromUrl } from "parse-domain";
/* import http from "../app/helper/http.js"; */

async function TestCrawler(reqUrl) {
  let startUrls = [];
  /* if (!reqUrl) {
    try {
      const res = await http.get("/oauth/getUrlList");
      startUrls = await res.data.map((item) => item.website);
    } catch (err) {
      console.log("Get Urls Error");
    }
  } else {
    await requestQueue.addRequests([{ url: reqUrl }]);
  } */
  const { domain, topLevelDomains } = parseDomain(fromUrl(reqUrl));
  const pageDomain = (domain + "." + topLevelDomains.join(".")).toString();

  const requestList = await RequestList.open("start", startUrls);
  const requestQueue = await RequestQueue.open(pageDomain);
  await requestQueue.addRequests([{ url: reqUrl }]);

  const minimal_args = [
    "--autoplay-policy=user-gesture-required",
    "--disable-background-networking",
    "--disable-background-timer-throttling",
    "--disable-backgrounding-occluded-windows",
    "--disable-breakpad",
    "--disable-client-side-phishing-detection",
    "--disable-component-update",
    "--disable-default-apps",
    "--disable-dev-shm-usage",
    "--disable-domain-reliability",
    "--disable-extensions",
    "--disable-features=AudioServiceOutOfProcess",
    "--disable-hang-monitor",
    "--disable-ipc-flooding-protection",
    "--disable-notifications",
    "--disable-offer-store-unmasked-wallet-cards",
    "--disable-popup-blocking",
    "--disable-print-preview",
    "--disable-prompt-on-repost",
    "--disable-renderer-backgrounding",
    "--disable-setuid-sandbox",
    "--disable-speech-api",
    "--disable-sync",
    "--hide-scrollbars",
    "--ignore-gpu-blacklist",
    "--metrics-recording-only",
    "--mute-audio",
    "--no-default-browser-check",
    "--no-first-run",
    "--no-pings",
    "--no-sandbox",
    "--no-zygote",
    "--password-store=basic",
    "--use-gl=swiftshader",
    "--use-mock-keychain",
  ];

  const crawler = new PuppeteerCrawler({
    launchContext: {
      launchOptions: {
        headless: true,
        args: minimal_args,
        userDataDir: "./cache",
      },
    },
    maxConcurrency: 8,
    requestList,
    requestQueue,
    requestHandler,
  });

  // Run the crawler and wait for it to finish.
  await crawler.run();
  const keyValueStore = await KeyValueStore.open();
  await keyValueStore.drop();
  await requestQueue.drop(pageDomain);
}

export default TestCrawler;

