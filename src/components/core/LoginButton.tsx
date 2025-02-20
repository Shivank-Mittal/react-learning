import { useDispatch } from 'react-redux';
import { useIsLoggedIn } from '../../store/selector/auth.selector';
import { logoutAction } from '../../store/slice/authSlice';
import auth from '../../data/appWrite/auth';
import { useNavigate } from 'react-router';
import { AppwriteException } from 'appwrite';
import { setLoadingAction } from '../../store/slice/loadSlice';
import { BLOG_ROUTE } from '../../constants/menu_routes';

export default function LoginButton() {
  const loggedIn = useIsLoggedIn();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const baseURL = 'project/blog/';
    try {
      dispatch(setLoadingAction(true));
      if (loggedIn) {
        await logoutUser();
        return;
      }
      const currentUser = await auth.currentUser();
      const navigationUrl = currentUser ? BLOG_ROUTE.LOGIN : BLOG_ROUTE.HOME;
      navigate(baseURL + navigationUrl);
    } catch (error) {
      if (error instanceof AppwriteException) {
        navigate(baseURL + BLOG_ROUTE.LOGIN);
      } else {
        console.log(error);
      }
    } finally {
      dispatch(setLoadingAction(false));
    }
  };

  const logoutUser = async () => {
    await auth.logout();
    dispatch(logoutAction());
  };

  return (
    <>
      <button
        type="button"
        onClick={handleLogout}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {loggedIn ? 'Logout' : 'Login'}
      </button>
      <button
        data-collapse-toggle="navbar-sticky"
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-sticky"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
    </>
  );
}
