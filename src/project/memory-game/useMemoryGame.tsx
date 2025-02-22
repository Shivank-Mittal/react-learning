import { useEffect, useState } from 'react';
import { getShuffledCardsDec } from './card-dec';
import { useCardsStore } from './cards-store.hook';
import { matchCards } from './matcher/card-matcher';

export function useMemoryGame(size: 2 | 3 | 4 | 6) {
  const [gridSize, setGridSize] = useState<number>(size);
  const [flippedCards, addFlippedCards, resetFlippedCards] = useCardsStore();
  const [matchedCards, addMatchedCards, resetMatchedCards] = useCardsStore();
  const [movesCount, setMovesCount] = useState<number>(0);
  const resetCounter = () => setMovesCount(0);
  const matchCardsSize = (size: 2 | 3 | 4 | 6) => {
    if (size === 2 || size === 4) {
      return 2;
    }
    return 3;
  };
  const [dec, setDec] = useState<number[][]>(() => getShuffledCardsDec(size, matchCardsSize()));

  useEffect(() => {
    const handleMatchedCards = () => {
      addMatchedCards(flippedCards);
      resetFlippedCards();
    };

    const handleUnmatchedCards = () => {
      setTimeout(() => {
        resetFlippedCards();
      }, 1000);
    };

    const processFlippedCards = () => {
      try {
        if (flippedCards.length !== matchCardsSize(size)) return;

        if (matchCards(flippedCards, dec)) {
          handleMatchedCards();
        } else {
          handleUnmatchedCards();
        }

        setMovesCount((prev) => prev + 1);
      } catch (error) {
        console.error('Error processing cards:', error);
        resetFlippedCards();
      }
    };

    processFlippedCards();
  }, [flippedCards, dec]);

  function reset(size?: 2 | 3 | 4 | 6) {
    const newSize = size || (gridSize as 2 | 3 | 4 | 6);
    setDec(getShuffledCardsDec(newSize, matchCardsSize(newSize)));
    resetFlippedCards();
    resetMatchedCards();
    resetCounter();
  }

  function setSize(size: 2 | 3 | 4 | 6) {
    setGridSize(size);
    reset(size);
  }

  return [
    addFlippedCards,
    flippedCards,
    setSize,
    reset,
    matchedCards,
    dec,
    movesCount,
    gridSize
  ] as const;
}
