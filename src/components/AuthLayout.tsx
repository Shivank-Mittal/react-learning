import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { useIsLoggedIn } from '../store/selector/auth.selector';
import { TailSpin } from 'react-loading-icons';
import BLOG_ROUTE from '../constants/router';

export default function AuthLayout({ authentication = true }) {
  const [loader, setLoader] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const authStatus = useIsLoggedIn();

  function loadingFragment() {
    return (
      <div role="status">
        <TailSpin></TailSpin>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  useEffect(() => {
    if (authentication && authStatus != authentication) {
      if (!location.pathname.includes(BLOG_ROUTE.SIGN_UP)) {
        navigate(BLOG_ROUTE.LOGIN);
      }
    } else if (!authentication && authStatus != authentication) {
      navigate(BLOG_ROUTE.All);
    }
    setLoader(false);
  }, [authStatus, navigate, authentication, location.pathname]);
  return loader ? loadingFragment() : <Outlet />;
}
