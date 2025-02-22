export const matchCards = (flippedCards: string[], decWithCardNumbers: number[][]): boolean => {
  try {
    const numbersArray: number[] = [];

    for (let index = 0; index < flippedCards.length; index++) {
      const card = flippedCards[index];
      const [row, col] = card.split('-').map((v) => parseInt(v));
      const number = decWithCardNumbers[row][col];
      numbersArray.push(number);
    }

    return numbersArray.every((v) => v === numbersArray[0]);
  } catch (error) {
    console.error(error);
    throw new Error(
      'Invalid card type: Card must be string and have row and column in format row-column : ' +
        error
    );
  }
};
