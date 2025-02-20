import { useEffect, useState } from 'react';
import { getShuffledCardsDec } from './card-info';

export function useMemoryGame(size: 3 | 6) {
  const [gridSize, setGridSize] = useState<number>(size);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [dec, setDec] = useState<number[][]>(() => getShuffledCardsDec(size));
  const [movesCount, setMovesCount] = useState<number>(0);

  const isMatching = (flippedCards: string[], dec: number[][]): boolean => {
    if (flippedCards.length !== 3) return false;

    const [firstItemRow, firstItemCol] = flippedCards[0].split('-').map((v) => parseInt(v));
    const [secondItemRow, secondItemCol] = flippedCards[1].split('-').map((v) => parseInt(v));
    const [thirdItemRow, thirdItemCol] = flippedCards[2].split('-').map((v) => parseInt(v));

    const firstItem = dec[firstItemRow][firstItemCol];
    const secondItem = dec[secondItemRow][secondItemCol];
    const thirdItem = dec[thirdItemRow][thirdItemCol];

    return firstItem === secondItem && secondItem === thirdItem;
  };

  useEffect(() => {
    if (flippedCards.length === 3) {
      if (isMatching(flippedCards, dec)) {
        setMatchedCards((prev) => [...prev, flippedCards[0], flippedCards[1], flippedCards[2]]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
      setMovesCount((prev) => prev + 1);
    }
  }, [flippedCards, dec]);

  function reset(size?: 3 | 6) {
    const newSize = size || gridSize;
    setDec(getShuffledCardsDec(newSize));
    setFlippedCards([]);
    setMatchedCards([]);
    setMovesCount(0);
  }

  function setSize(size: 3 | 6) {
    setGridSize(size);
    reset(size);
  }
  return [
    setFlippedCards,
    flippedCards,
    setSize,
    reset,
    matchedCards,
    gridSize,
    dec,
    movesCount
  ] as const;
}
