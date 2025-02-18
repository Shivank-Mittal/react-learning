import { lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { MAIN_ROUTE, PROJECT_ROUTE } from './constants/menu_routes.ts';
import Todo from './project/todo/todo.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { Suspense } from 'react';
import AuthLayout from './components/AuthLayout';
import Signup from './project/blog/Signup';
import Login from './project/blog/Login';
import Home from './project/blog/Home';
import AddPost from './project/blog/PostForm';
import AllPost from './project/blog/AllPost';
import { BLOG_ROUTE } from './constants/menu_routes';
import Post from './project/blog/Post';
import EditPost from './project/blog/EditPost';

const Currency_Converter = lazy(() => import('./project/currency-converter/Currency_Converter'));
const Password_Generator = lazy(() => import('./project/password-genrator/Password_Generator'));
const Background_Changer = lazy(() => import('./project/background-changer/Background_Changer'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route path="/" element={<App />}>
              <Route
                path={MAIN_ROUTE.BACKGROUND_UPDATER.toLowerCase()}
                element={<Background_Changer />}
              />
              <Route path="blog">
                <Route element={<AuthLayout authentication={false} />}>
                  <Route path={BLOG_ROUTE.SIGN_UP} element={<Signup />} />
                  <Route path={BLOG_ROUTE.LOGIN} element={<Login />} />
                </Route>
                <Route element={<AuthLayout authentication={true} />}>
                  <Route path={BLOG_ROUTE.HOME} element={<Home />} />
                  <Route path={BLOG_ROUTE.ADD} element={<AddPost />} />
                  <Route path={BLOG_ROUTE.All} element={<AllPost />} />
                  <Route path={BLOG_ROUTE.POST} element={<Post />} />
                  <Route path={BLOG_ROUTE.EDIT} element={<EditPost />} />
                </Route>
              </Route>
              <Route path="project">
                <Route
                  path={PROJECT_ROUTE.CURRENCY_CONVERTER.toLowerCase()}
                  element={<Currency_Converter />}
                />
                <Route
                  path={PROJECT_ROUTE.PASSWORD_GENERATOR.toLowerCase()}
                  element={<Password_Generator />}
                />
                <Route path={PROJECT_ROUTE.TODO.toLowerCase()} element={<Todo />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
