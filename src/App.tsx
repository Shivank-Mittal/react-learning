import './App.css';
import { Header } from './components/index';
import { Outlet } from 'react-router';
import { useColor } from './store/selector/selector';
import AuthService from './data/appWrite/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction, logoutAction } from './store/slice/authSlice';
import { TailSpin } from 'react-loading-icons';
import { menu } from './constants/router';

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  /**
   * Check if the user is logged in or not.
   * Accordingly set the user data in the store.
   */
  useEffect(() => {
    AuthService.currentUser()
      .then((useDate) => (useDate ? dispatch(loginAction(useDate)) : dispatch(logoutAction())))
      .finally(() => setLoading(false));
  }, []);

  /**
   * Loading Sign till we get the user data from the server.
   *
   * @returns Loading Sign
   * */
  function loadingFragment() {
    return (
      <div role="status">
        <TailSpin></TailSpin>
        <span className="sr-only text-white">Loading...</span>
      </div>
    );
  }

  return (
    <div
      style={{ backgroundColor: useColor() }}
      className="m-0 pt-10 pr-5 pl-5 grid grid-rows-[auto_1fr] h-screen"
    >
      {
        <>
          <Header menu={menu}></Header>
          <main className="flex justify-center items-center h-lvh">
            {loading ? loadingFragment() : <Outlet />}
          </main>
        </>
      }
    </div>
  );
}
