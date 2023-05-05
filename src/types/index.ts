import type {
  INeuralNetworkData,
  INeuralNetworkDatum,
} from "brain.js/dist/neural-network";

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface TrainingData
  extends INeuralNetworkDatum<
    Partial<INeuralNetworkData>,
    Partial<INeuralNetworkData>
  > {
  input: {
    [key: string]: number;
    r: number;
    g: number;
    b: number;
  };
}
