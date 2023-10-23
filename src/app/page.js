"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const POP_UP_TIME_MS = 1000;

  const IMAGE_HEIGHT = 200
  const IMAGE_WIDTH = 200

  const [score, setScore] = useState(0);
  const [mole, setMole] = useState([0, 0]);
  const [rows, setRows] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  rows[mole[0]][mole[1]] = 1;

  useEffect(() => {
    const newRows = JSON.parse(JSON.stringify(rows));
    newRows[mole[0]][mole[1]] = 0;

    const timer = setInterval(() => {
      const randomRow = getRandomInt(0, 3);
      const randomCol = getRandomInt(0, 3);

      setMole([randomRow, randomCol]);
      newRows[randomRow][randomCol] = 1;
      setRows(newRows);
    }, POP_UP_TIME_MS);

    return () => {
      clearInterval(timer);
    };
  }, [mole]);
  function wack() {
    setScore(score+1);
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  return (
    <div className="flex flex-col">
      <h1> Wack a mole!</h1>
      <h1> Score: {score} </h1>
      <div className="flex" id="gridContainer">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            id={`column-${rowIndex}`}
            className="column-class"
          >
            {row.map((item, itemIndex) => (
              <div
                key={itemIndex}
                id={`item-${rowIndex}-${itemIndex}`}
                className="item-class"
              >
                {item ? (
                  <Image onClick={wack} height={IMAGE_HEIGHT} width={IMAGE_WIDTH} src="/mole.png" alt="mole"/>
                ) : (
                  <Image height={IMAGE_HEIGHT} width={IMAGE_WIDTH} src="/hole.png" alt="hole"/>
                )}

              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
