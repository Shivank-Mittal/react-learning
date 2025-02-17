export enum MENU_AVAILABLE {
  CURRENCY_CONVERTER = 'CURRENCY_CONVERTER',
  BACKGROUND_UPDATER = 'BACKGROUND_UPDATER',
  PASSWORD_GENERATOR = 'PASSWORD_GENERATOR',
  TODO = 'TODO'
}

export enum MENU_BLOG {
  BLOG = 'BLOG'
}

export type MENU_TYPE = typeof MENU_AVAILABLE | typeof MENU_BLOG;

export const LOGO = 'https://logo.uplead.com/amazon.com';
