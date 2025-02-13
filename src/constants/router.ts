enum BLOG_ROUTE {
    SIGN_UP = "sign-up", 
    LOGIN = "login",
    All = "all-post",
    ADD = "add-post",
    DELETE = "delete-post/:id",
    EDIT = "edit-post/:id",
    POST = "post/:id",
    HOME = "home"
}


export enum BLOG_FULL_ROUTE {
    BASE = '/project/blog/',
    SIGN_UP = BASE + BLOG_ROUTE.SIGN_UP, 
    LOGIN = BASE + BLOG_ROUTE.LOGIN,
    All = BASE +  BLOG_ROUTE.All,
    ADD = BASE +  BLOG_ROUTE.ADD,
    DELETE = BASE +  BLOG_ROUTE.DELETE,
    EDIT = BASE + BLOG_ROUTE.EDIT,
    POST = BASE +  BLOG_ROUTE.POST,
    HOME = BASE +  BLOG_ROUTE.POST
}

export default BLOG_ROUTE;
