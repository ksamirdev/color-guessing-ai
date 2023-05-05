import { NeuralNetwork } from "brain.js";
import type { INeuralNetworkData } from "brain.js/dist/neural-network";
import type { TrainingData, RGBColor } from "./types";

const initialTraining: TrainingData[] = [
  {
    input: {
      r: 0,
      g: 0,
      b: 0,
    },
    output: [1],
  },
  {
    input: {
      r: 1,
      g: 1,
      b: 1,
    },
    output: [0],
  },
];

export class Network {
  private net: NeuralNetwork<INeuralNetworkData, INeuralNetworkData>;
  public color: RGBColor | null;

  constructor() {
    this.net = new NeuralNetwork();
    this.color = null;
    this.net.train([...initialTraining]);
  }

  train(data: TrainingData[]) {
    this.net.train([...initialTraining, ...data]);
  }

  run(data: Partial<RGBColor>): INeuralNetworkData | undefined {
    return this.net.run(data);
  }

  getRandomColor() {
    this.color = {
      r: Math.random(),
      g: Math.random(),
      b: Math.random(),
    };

    return this.color;
  }
}
