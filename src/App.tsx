import './App.css'
import { Header } from './components/index'
import { Outlet } from "react-router";
import { MENU_TYPE, MENU_AVAILABLE, MENU_BLOG } from './constants/menu';;
import { useColor } from './store/selector/selector'
import  AuthService  from './data/appWrite/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction, logoutAction} from './store/slice/authSlice';
import { TailSpin } from 'react-loading-icons'
import BLOG_ROUTE from './constants/router';
import ToasterContainer from './components/core/ToasterContainer';

export default function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const menus = new Map<string, MENU_TYPE >([
    ["main", MENU_AVAILABLE],
    ["blog", MENU_BLOG]
  ]);


  /**
   * Check if the user is logged in or not.
   * Accordingly set the user data in the store.
   */
  useEffect(() => {
    AuthService.currentUser()
    .then((useDate) => 
      useDate ?
        dispatch(loginAction(useDate)) :
        dispatch(logoutAction())
      )
    .finally( () => setLoading(false))
  }, [loading, dispatch])

  
  /** 
   * Loading Sign till we get the user data from the server.
   * 
   * @returns Loading Sign
   * */ 
  function loadingFragment() {
    return (
      <div role="status">
        <TailSpin ></TailSpin>
        <span className="sr-only text-white">Loading...</span>
      </div>
    )
  }


  /**
   * Creating the combination of menu from different types of menu with routing URL
   * @returns Map of menu with routing URL
   */
  function getMenu() {
    const menuURL= new Map<string, string>();

    menus.forEach((menu, key) => { 
      if (key === "main") { 
        Object.values(menu).forEach(menu => menuURL.set( `project/${menu}`, menu) ) 
      }

      if(key !== "main") {
        Object.values(menu).forEach((subMenu:string) => {
          const prefix = subMenu.toLowerCase() === 'blog'? `${key}/${BLOG_ROUTE.All}` : key; 
          menuURL.set(`project/${prefix}`, subMenu) 
        }) 
      }
    })

    return menuURL;
  }


  return ( 
    <div style={{backgroundColor: useColor()}} className='m-0 pt-10 pr-5 pl-5 grid grid-rows-[auto_1fr] h-screen'>
      {
        <>
          <Header menus={getMenu()}></Header>  
          <main className="flex justify-center items-center h-lvh"> 
            {loading ? loadingFragment() : <Outlet /> } 
          </main>
          <ToasterContainer></ToasterContainer>
        </>
      }
    </div>
  )
}
