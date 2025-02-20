// Create an array with each Pokemon appearing exactly 3 times
const generateCards = () => {
  // Create array with 3 sets of numbers 0-5
  const cards = [
    [1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12],
    [1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12],
    [1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12]
  ];

  const flatCards = cards.flat();
  for (let i = flatCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flatCards[i], flatCards[j]] = [flatCards[j], flatCards[i]];
  }

  const grid: number[][] = [];
  for (let i = 0; i < 6; i++) {
    grid.push(flatCards.slice(i * 6, (i + 1) * 6));
  }

  return grid;
};

export const getShuffledCardsDec = (decSize: number): number[][] => {
  const divisionSize = Math.floor((decSize * decSize) / 3);

  const subArray = [...new Array(divisionSize).keys()].map((key) => key + 1);

  const decArray = [...subArray, ...subArray, ...subArray];
  decArray.sort(() => Math.random() - 0.5);

  const final = [...new Array(decSize).keys()].map((key) => {
    const lastValue = (key + 1) * decSize;
    return decArray.slice(lastValue - decSize, lastValue);
  });

  return final;
};

export const cardsInfo: number[][] = generateCards();

// 3

// arrray of size * size= [1, 2, 3, 1, 2, 3, 1, 2, 3];
// shuffle =              [1, 2, 2, 3, 1, 3, 2 , 3, 1]
// divde in size =
// [
//     [1, 2, 2],
//     [3, 1, 3],
//     [2 , 3, 1]
// ]
