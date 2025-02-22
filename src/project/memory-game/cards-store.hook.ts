import { useState } from 'react';

/**
 * This function is uses as a storage of cards.
 * This is able to add cards and reset the cards.
 * @param initCards - initial cards (optional) type: string[]
 * @returns cards, addCard, reset
 */
export function useCardsStore(initCards: string[] = []) {
  const [cards, setCards] = useState(initCards);

  const addCard = (card: string | string[]) => {
    if (!card.length) return;
    const tempCard = Array.isArray(card) ? card : [card];
    setCards((prev) => [...prev, ...tempCard]);
  };

  const reset = () => {
    setCards([]);
  };

  return [cards, addCard, reset] as const;
}
