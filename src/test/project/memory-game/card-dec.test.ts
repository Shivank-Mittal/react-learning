import { describe, expect, it } from 'vitest';
import { getShuffledCardsDec } from '../../../project/memory-game/card-dec';

describe('Card Dec', () => {
  it('should return size * size array', () => {
    const size = 3;
    const partitionSize = 3;
    const dec = getShuffledCardsDec(size, partitionSize);
    expect(dec.length).toBe(3);
    expect(dec.flat()).length(9);
  });

  it(`should return array containing the numbers according to the partition size 3`, () => {
    const size = 3;
    const partitionSize = 3;
    const dec = getShuffledCardsDec(size, partitionSize as 2 | 3);
    expect(dec.length).toBe(size);

    const flatDec = dec.flat();
    [1, 2, 3].forEach((number) =>
      expect(flatDec.filter((n) => n === number).length).toBe(partitionSize)
    );
  });

  it(`should return array containing the numbers according to the partition size 2`, () => {
    const size = 4;
    const partitionSize = 2 as 2 | 3;
    const dec = getShuffledCardsDec(size, partitionSize);
    expect(dec.length).toBe(size);

    const flatDec = dec.flat();
    console.log(flatDec);
    [1, 2, 3, 4, 5, 6, 7, 8].forEach((number) =>
      expect(flatDec.filter((n) => n === number).length).toBe(partitionSize)
    );
  });
});
