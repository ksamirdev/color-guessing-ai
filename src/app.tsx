import { useEffect, useRef, useState } from "preact/hooks";
import ws, { chooseColor, getColor, guessColor } from "./utils/ws";

import { type ColorT } from "./types";

export function App() {
  const colorDivRef = useRef<HTMLDivElement | null>(null);
  const guessTextRef = useRef<HTMLDivElement | null>(null);
  const [color, setColor] = useState<ColorT>();

  useEffect(() => {
    ws.onopen = () => {
      getColor();

      ws.onmessage = (event) => {
        event.preventDefault();
        const parsed = JSON.parse(event.data);

        if (parsed.type === "color") {
          setColor(parsed.color);
        } else if (parsed.type === "train") {
          getColor();
        } else if (parsed.type === "guessed") {
          if (guessTextRef.current) {
            const colorD = parsed.data[0];
            guessTextRef.current.style.color = colorD > 0.5 ? "#FFF" : "#000";
          }
        }
      };
    };
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (color && colorDivRef.current) {
      guessColor(color);
      colorDivRef.current.style.backgroundColor = `rgba(${color.r * 255}, ${
        color.g * 255
      }, ${color.b * 255})`;
    }
  }, [color, colorDivRef.current]);

  return (
    <div className="h-screen w-screen bg-neutral-900 text-white flex flex-col items-center justify-center gap-y-5">
      <div class="border-2 border-neutral-600 rounded-2xl min-w-[40vw] min-h-[40vh] p-5">
        <div
          class="flex flex-col text-2xl justify-center items-center h-full rounded-xl gap-5 "
          ref={colorDivRef}
        >
          <span class="font-bold tracking-wider uppercase">White Color</span>
          <span class="text-black font-bold tracking-wider uppercase">
            Black Color
          </span>
          <span ref={guessTextRef} class="tracking-wider font-bold">
            My Guessed Color
          </span>
        </div>
      </div>

      <div class="space-x-5">
        <button
          class="px-3 py-2 bg-neutral-700 font-bold tracking-wide text-xl rounded-lg"
          onClick={() => chooseColor(0)}
        >
          Black
        </button>
        <button
          class="px-3 py-2 bg-neutral-300 font-bold tracking-wide text-xl text-neutral-900 rounded-lg"
          onClick={() => chooseColor(1)}
        >
          White
        </button>
      </div>
    </div>
  );
}
