import cluster from "cluster";
import os from "os";
import { workerData } from "worker_threads";

import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
dotenv.config();

import authRouter from "./route/authRoute";
import mongoose from "mongoose";

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  console.log(`Forking for ${cpus}`);

  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(` worker ${worker.process.pid} died`);
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`worker ${worker.id} crashed`);
      console.log(`Starting new worker`);
      cluster.fork();
    }
  });
} else {
  const app: Express = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());

  app.get("/", (req: Request, res: Response) => {
    console.log("Recordry user microservice");
    res.send("Recordry user microservice");
  });
  app.use("/auth", authRouter);

  mongoose
    .connect(process.env.mongo_uri)
    .then(() => console.log("connected to the database"))
    .catch((err) => console.log(err));

  app.listen(port, () =>
    console.log(`${cluster.worker?.id} Hello, server running`)
  );
}
