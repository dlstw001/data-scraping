import express from "express";
import http from "http";
import route from "../app/routes/index.js";

const app = express();
const server = http.Server(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
route(app);

export default server;
