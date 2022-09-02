import { parentPort } from "worker_threads";
import server from "./config/server.js";

parentPort.on("message", async (value) => {
  const PORT = value;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

/* const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); */
