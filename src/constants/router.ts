import { PROJECT, MAIN } from './menu';
import { BLOG_FULL_ROUTE, MAIN_ROUTE, PROJECT_ROUTE } from './menu_routes';

type MenuItem = { name: string } & (
  | { type: 'link'; url: string }
  | { type: 'dropdown'; dropdownItems: { name: PROJECT; url: string }[] }
);

export type Menu = Record<MAIN, MenuItem>;

export const menu: Menu = {
  [MAIN.BACKGROUND_UPDATER]: {
    name: 'Update background',
    type: 'link',
    url: MAIN_ROUTE.BACKGROUND_UPDATER
  },
  [MAIN.BLOG]: {
    name: 'Blog',
    type: 'link',
    url: BLOG_FULL_ROUTE.All
  },
  [MAIN.PROJECT]: {
    name: 'Projects',
    type: 'dropdown',
    dropdownItems: [
      {
        name: PROJECT.MEMORY_GAME,
        url: 'project/' + PROJECT_ROUTE.MEMORY_GAME
      },
      {
        name: PROJECT.PASSWORD_GENERATOR,
        url: 'project/' + PROJECT_ROUTE.PASSWORD_GENERATOR
      },
      {
        name: PROJECT.TODO,
        url: 'project/' + PROJECT_ROUTE.TODO
      },
      {
        name: PROJECT.CURRENCY_CONVERTER,
        url: 'project/' + PROJECT_ROUTE.CURRENCY_CONVERTER
      }
    ]
  }
} as const;
