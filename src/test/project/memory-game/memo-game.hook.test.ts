import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useMemoryGame } from '../../../project/memory-game/useMemoryGame';

describe('memo game hook', () => {
  const getCurrent = (result) => {
    const [addFlippedCards, flippedCards, setSize, reset, matchedCards, dec, movesCount, gridSize] =
      result.current;
    return {
      addFlippedCards,
      flippedCards,
      setSize,
      reset,
      matchedCards,
      dec,
      movesCount,
      gridSize
    };
  };

  it('set the grid size on the initialization', () => {
    const initialGridSize = 4;
    const { result } = renderHook(() => useMemoryGame(initialGridSize));

    const { gridSize } = getCurrent(result);

    expect(gridSize).toBe(initialGridSize);
  });

  it('keeps the record of the flipped cards', async () => {
    const initialGridSize = 6;
    const { result } = renderHook(() => useMemoryGame(initialGridSize));

    const { addFlippedCards } = getCurrent(result);

    addFlippedCards('a-b');
    addFlippedCards('b-c');

    await vi.waitFor(() => {
      const { flippedCards } = getCurrent(result);
      expect(flippedCards.length).toBe(2);
    });
  });
});
