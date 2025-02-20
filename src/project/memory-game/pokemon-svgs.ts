// Import all Pokemon SVGs
import pokemon1 from './pokemon-svgs/pokemon1.svg';
import pokemon2 from './pokemon-svgs/pokemon2.svg';
import pokemon3 from './pokemon-svgs/pokemon3.svg';
import pokemon4 from './pokemon-svgs/pokemon4.svg';
import pokemon5 from './pokemon-svgs/pokemon5.svg';
import pokemon6 from './pokemon-svgs/pokemon6.svg';
import pokemon7 from './pokemon-svgs/pokemon7.svg';
import pokemon8 from './pokemon-svgs/pokemon8.svg';
import pokemon9 from './pokemon-svgs/pokemon9.svg';
import pokemon10 from './pokemon-svgs/pokemon10.svg';
import pokemon11 from './pokemon-svgs/pokemon11.svg';
import pokemon12 from './pokemon-svgs/pokemon12.svg';
import pokemon13 from './pokemon-svgs/pokemon13.svg';
import pokeballSvg from './pokemon-svgs/pokeball.svg';

// Export array of Pokemon SVGs
export const pokemonSvgs = [
  pokemon1,
  pokemon2,
  pokemon3,
  pokemon4,
  pokemon5,
  pokemon6,
  pokemon7,
  pokemon8,
  pokemon9,
  pokemon10,
  pokemon11,
  pokemon12,
  pokemon13
].map((svg) => svg as string);

export const pokeball = pokeballSvg as string;
