import cluster from "cluster";
import os from "os";
import { workerData } from "worker_threads";

import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import authRouter from "./route/authRoute";

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  console.log(`Forking for ${cpus}`);

  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    if (code !== 0 && !workerData.exitedAfterDisconnect) {
      console.log(`worker ${worker.id} crashed`);
      console.log(`Starting new worker`);
      cluster.fork();
    }
  });
} else {
  const app: Express = express();
  const port = process.env.PORT || 3000;

  app.get("/", (req: Request, res: Response) => {
    console.log("Recordry user microservice");
    res.send("Recordry user microservice");
  });
  app.use("/auth", authRouter);

  app.listen(port, () =>
    console.log(`${cluster.worker?.id} Hello, server running`)
  );
}
