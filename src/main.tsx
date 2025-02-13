import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes} from 'react-router'
import { MENU_AVAILABLE } from './constants/menu.ts'
import Todo from './project/todo/Todo.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { Suspense } from 'react'
import AuthLayout from './components/AuthLayout.tsx'
import Signup from './project/blog/Signup.tsx'
import Login from './project/blog/Login.tsx'
import Home from './project/blog/Home.tsx'
import AddPost from './project/blog/PostForm.tsx'
import AllPost from './project/blog/AllPost.tsx'
import BLOG_ROUTE from './constants/router.ts'
import Post from './project/blog/post.tsx'
import EditPost from './project/blog/EditPost.tsx'


const Currency_Converter = lazy(() => import('./project/currency-converter/Currency_Converter'));
const Password_Generator = lazy(() => import('./project/password-genrator/Password_Generator'));
const Background_Changer = lazy(() => import('./project/background-changer/Background_Changer'));


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store = {store}>
      <BrowserRouter>
        <Suspense >
          <Routes>
              <Route path='/' element={<App />}>
                <Route path='project'>
                  <Route path='blog'>
                    <Route element= {<AuthLayout authentication={false} />}>
                      <Route path= {BLOG_ROUTE.SIGN_UP} element= {<Signup />} />
                      <Route path= {BLOG_ROUTE.LOGIN} element= {<Login />} />
                    </Route>
                    <Route element= {<AuthLayout authentication={true} />}>
                      <Route path= {BLOG_ROUTE.HOME} element= {<Home />} />
                      <Route path= {BLOG_ROUTE.ADD} element= {<AddPost />} />
                      <Route path= {BLOG_ROUTE.All} element= {<AllPost />} />
                      <Route path= {BLOG_ROUTE.POST} element= {<Post />} />
                      <Route path= {BLOG_ROUTE.EDIT} element= {<EditPost />} />
                    </Route>
                  </Route>
                  <Route path= {MENU_AVAILABLE.CURRENCY_CONVERTER.toLowerCase()} element= {<Currency_Converter />} />
                  <Route path= {MENU_AVAILABLE.PASSWORD_GENERATOR.toLowerCase()} element= {<Password_Generator />} />
                  <Route path= {MENU_AVAILABLE.BACKGROUND_UPDATER.toLowerCase()} element= {<Background_Changer /> } />
                  <Route path= {MENU_AVAILABLE.TODO.toLowerCase()} element= {<Todo /> } />
                </Route>
              </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
