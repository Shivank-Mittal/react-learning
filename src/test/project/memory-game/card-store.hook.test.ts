import { renderHook } from '@testing-library/react';
import { describe, expect, it, test, vi } from 'vitest';
import { useCardsStore } from '../../../project/memory-game/cards-store.hook';

describe('card store', () => {
  it('should be able to set card store with initial value', () => {
    const card = 'a-b';
    const { result } = renderHook(() => useCardsStore([card]));

    const [cards] = result.current;

    expect(cards.length).toBe(1);
    expect(cards[0]).toBe(card);
  });

  test('should be able to add the cards in the dec', async () => {
    const card = 'a-b';
    const { result } = renderHook(() => useCardsStore());

    const [cards, addCard] = result.current;

    addCard(card);

    await vi.waitFor(() => {
      expect(result.current[0].length).toBe(1);
      expect(result.current[0][0]).toBe(card);
    });
  });

  test('should be able to persist the old card when the new card is added', async () => {
    const cardOne = 'a-b';
    const cardTwo = 'b-c';
    const { result } = renderHook(() => useCardsStore());

    const [cards, addCard] = result.current;

    addCard(cardOne);

    await vi.waitFor(() => {
      const cards = result.current[0];
      expect(result.current[0].length).toBe(1);
      expect(cards[0]).toBe(cardOne);
    });

    addCard(cardTwo);
    await vi.waitFor(() => {
      const cards = result.current[0];
      expect(result.current[0].length).toBe(2);
      expect(cards[0]).toBe(cardOne);
      expect(cards[1]).toBe(cardTwo);
    });
  });

  it('should be able to reset the store', async () => {
    const cardOne = 'a-b';
    const { result } = renderHook(() => useCardsStore());

    const [cards, addCard, reset] = result.current;

    addCard(cardOne);
    await vi.waitFor(() => {
      expect(result.current[0].length).toBe(1);
      expect(result.current[0][0]).toBe(cardOne);
    });

    reset();
    await vi.waitFor(() => {
      expect(cards.length).toBe(0);
    });
  });
});
