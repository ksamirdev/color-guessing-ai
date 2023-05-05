import { type ColorT } from "../types";

const ws = new WebSocket("ws://localhost:5000");

export const chooseColor = (value: number) => {
  ws.send(
    JSON.stringify({
      type: "train",
      text: value,
    })
  );
};

export const getColor = () => {
  ws.send(
    JSON.stringify({
      type: "getColor",
    })
  );
};

export const guessColor = (color: ColorT) => {
  ws.send(
    JSON.stringify({
      type: "guess",
      text: color,
    })
  );
};

export default ws;
