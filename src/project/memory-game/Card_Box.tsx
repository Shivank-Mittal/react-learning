import React, { useEffect, useState } from 'react';
import { useMemoryGame } from './useMemoryGame';
import Card from './Card';
import { pokemonSvgs } from './pokemon-svgs';

let gameOver = false;

export default function Card_Box() {
  const [setFlippedCards, flippedCards, setSize, reset, matchedCards, gridSize, dec, movesCount] =
    useMemoryGame(3);

  if (matchedCards.length === gridSize * gridSize && !gameOver) {
    gameOver = true;
    setTimeout(() => {
      reset();
      gameOver = false;
    }, 3000);
  }

  const handleCardClicked = (event: React.MouseEvent<HTMLHeadElement>) => {
    const target = event.target as HTMLElement;
    if (!target.dataset.card || flippedCards.length > 2) {
      return;
    }

    const row = target.dataset.row;
    const col = target.dataset.col;
    const clickedItemId = `${row}-${col}`;

    //test if a card is already flipped;
    if (matchedCards.includes(clickedItemId) || flippedCards.includes(clickedItemId)) {
      return;
    }

    setFlippedCards((prv) => [...prv, clickedItemId]);
  };

  const selectionBox = () => (
    <div>
      <label
        htmlFor="countries"
        className="text-black block mb-2 text-sm font-medium dark:text-white"
      >
        Choose Grid size
      </label>
      <select
        id="countries"
        value={gridSize}
        onChange={(e) => setSize(Number(e.target.value) as 3 | 6)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option>3</option>
        <option>6</option>
      </select>
    </div>
  );

  return (
    <div className="flex flex-col gap-5">
      {selectionBox()}

      <div className="text-center text-2xl text-green-500 font-bold">Moves: {movesCount}</div>
      <div
        className={`bg-white p-5 grid grid-rows-${gridSize} grid-cols-${gridSize} gap-4`}
        onClick={(event) => handleCardClicked(event)}
      >
        {dec.map((row: number[], rowIndex: number) =>
          row.map((col: number, colIndex: number) => (
            <Card
              key={`${rowIndex}-${colIndex}`}
              data-card
              data-row={rowIndex}
              data-col={colIndex}
              show={
                flippedCards.includes(`${rowIndex}-${colIndex}`) ||
                matchedCards.includes(`${rowIndex}-${colIndex}`)
              }
            >
              <img src={pokemonSvgs[dec[rowIndex][colIndex]]} alt="pokemon" />
            </Card>
          ))
        )}
      </div>
      <div
        className={`text-center text-2xl text-green-500 font-bold ${gameOver ? 'block' : 'hidden'}`}
      >
        YOU WON
      </div>
    </div>
  );
}
