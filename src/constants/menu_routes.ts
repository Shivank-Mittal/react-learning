export enum MAIN_ROUTE {
  BACKGROUND_UPDATER = '/background-updater'
}

export enum PROJECT_ROUTE {
  CURRENCY_CONVERTER = 'currency-converter',
  PASSWORD_GENERATOR = 'password-generator',
  TODO = 'todo',
  MEMORY_GAME = 'memory-game'
}

export enum BLOG_ROUTE {
  SIGN_UP = 'sign-up',
  LOGIN = 'login',
  All = 'all-post',
  ADD = 'add-post',
  DELETE = 'delete-post/:id',
  EDIT = 'edit-post/:id',
  POST = 'post/:id',
  HOME = 'home'
}

export enum BLOG_FULL_ROUTE {
  BASE = '/blog/',
  SIGN_UP = BASE + BLOG_ROUTE.SIGN_UP,
  LOGIN = BASE + BLOG_ROUTE.LOGIN,
  All = BASE + BLOG_ROUTE.All,
  ADD = BASE + BLOG_ROUTE.ADD,
  DELETE = BASE + BLOG_ROUTE.DELETE,
  EDIT = BASE + BLOG_ROUTE.EDIT,
  POST = BASE + BLOG_ROUTE.POST,
  HOME = BASE + BLOG_ROUTE.POST
}
