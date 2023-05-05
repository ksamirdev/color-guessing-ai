console.clear();

import express from "express";
import { QuickDB } from "quick.db";
import { Server } from "ws";
import { createServer } from "http";
import { Network } from "./brain";
import { TrainingData } from "./types";

const db = new QuickDB();

const app = express();
const server = createServer(app);

const wsServer = new Server({ server });
const net = new Network();

app.use(express.json());

server.listen(5000, () => {
  console.log("Live running at port: 5000!");
});

wsServer.on("connection", (socket) => {
  console.log("Got connection baby!");

  socket.on("message", async (msg) => {
    const parsedData = JSON.parse(msg.toString());

    switch (parsedData.type) {
      case "getColor":
        const randColor = net.getRandomColor();
        const sendData = {
          type: "color",
          color: randColor,
        };
        socket.send(JSON.stringify(sendData));
        break;
      case "train":
        const data = parsedData.text;
        const color = net.color;

        if (!color) return;

        const dbData = (await db.push("data", {
          input: color,
          output: [data],
        })) as TrainingData[];

        net.train(dbData);
        socket.send(JSON.stringify({ type: "train" }));
        break;

      case "guess":
        const text = parsedData.text;
        const guessed = net.run(text);
        socket.send(JSON.stringify({ type: "guessed", data: guessed }));
      default:
        socket.send("Error: Unknown Type");
        break;
    }
  });

  socket.on("close", () => {
    console.log("connection lost");
  });
});
