import React, { useEffect, useRef } from 'react';
import { useMemoryGame } from './useMemoryGame';
import Card from './Card';
import { pokemonSvgs } from './pokemon-svgs';

let gameOver = false;

export default function Card_Box() {
  const [addFlippedCards, flippedCards, setSize, reset, matchedCards, dec, movesCount, gridSize] =
    useMemoryGame(4);

  const componentRef = useRef<HTMLDivElement>(null);
  const resetButtonRef = useRef<HTMLButtonElement>(null);

  // Check player won, show won message and then reset in 3s.
  if (matchedCards.length === gridSize * gridSize && !gameOver) {
    gameOver = true;
    resetButtonRef.current?.focus();
  }

  function resetGame() {
    gameOver = false;
    reset(gridSize);
  }

  //Determine how many cards will be matching.
  const matchingCardsSize = (localSize: 2 | 3 | 4 | 6) => {
    if (localSize === 2 || localSize === 4) {
      return 2;
    }
    return 3;
  };

  useEffect(() => {
    document.addEventListener('cardClick', handleCardClicked);

    return () => {
      // eslint-disable-next-line @eslint-react/web-api/no-leaked-event-listener
      document.removeEventListener('cardClick', handleCardClicked);
    };
  }, [flippedCards]);

  const handleCardClicked = (event: Event) => {
    document.removeEventListener('cardClick', handleCardClicked);
    const target = event.target as HTMLElement;
    if (!target.dataset.card) {
      return;
    }
    const row = target.dataset.row;
    const col = target.dataset.col;
    const clickedItemId = `${row}-${col}`;

    //test if a card is already flipped;
    if (
      matchedCards.includes(clickedItemId) ||
      flippedCards.includes(clickedItemId) ||
      flippedCards.length === matchingCardsSize(gridSize as 2 | 3 | 4 | 6)
    ) {
      document.addEventListener('cardClick', handleCardClicked);
      return;
    }

    addFlippedCards(clickedItemId);
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
        onChange={(e) => setSize(Number(e.target.value) as 2 | 3 | 4 | 6)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>6</option>
      </select>
    </div>
  );

  return (
    <div
      className="flex flex-col gap-5"
      style={{ backgroundImage: 'URL("../../assets/Background.png")' }}
      ref={componentRef}
    >
      {selectionBox()}

      <div className="text-center text-2xl text-green-500 font-bold">
        {' '}
        Match {matchingCardsSize(gridSize as 2 | 3 | 4 | 6)} cards, Moves: {movesCount}
      </div>
      <div
        className={`bg-white p-5 grid gap-4  bg-[url('assets/Background.png')]`}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          backgroundImage: 'URL("assets/Background.png")'
        }}
      >
        {dec.map((row: number[], rowIndex: number) =>
          row.map((col: number, colIndex: number) => (
            <Card
              key={`${rowIndex}-${colIndex}`}
              data-card
              data-row={rowIndex}
              data-col={colIndex}
              flip={
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
        <div>
          <button
            className="cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            ref={resetButtonRef}
            type="button"
            onClick={() => resetGame()}
          >
            {' '}
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}
