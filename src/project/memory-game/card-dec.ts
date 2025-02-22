export const getShuffledCardsDec = (decSize: number, matchingCardsSize: 2 | 3): number[][] => {
  // This is the number of unique cards in the grid.
  const divisionSize = Math.floor((decSize * decSize) / matchingCardsSize);

  // This line gives the number from 1 to divisionSize.
  const subArray = [...new Array(divisionSize).keys()].map((key) => key + 1);

  // Now this is creates an array which is the size of the grid.
  // which contains the subArray twice. so we have only 2 numbers repeating
  const decArray: number[] = [];
  [...new Array(matchingCardsSize).keys()].forEach((key) => {
    decArray.push(...subArray);
  });

  // This is now shuffling the array.
  decArray.sort(() => Math.random() - 0.5);

  // Now converting the 1D array into a 2D array. of size decSize x decSize.
  const final = [...new Array(decSize).keys()].map((key) => {
    const lastValue = (key + 1) * decSize;
    return decArray.slice(lastValue - decSize, lastValue);
  });

  return final;
};
