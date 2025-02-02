import './App.css'
import Header from './components/core/Header'
import { Outlet } from "react-router";
import { MENU_AVAILABLE } from './constants/menu';;
import {useColor} from './store/selector/selector.ts'

export default function App() {
  console.log(import.meta.env.VITE_APP_APPWRITE_URL)
  return (
    <>
      <div style={{backgroundColor: useColor()}} className='m-0 pt-10 pr-5 pl-5 grid grid-rows-[auto_1fr] h-screen'>
        <Header menus={ Object.values(MENU_AVAILABLE)}></Header>  
        <div className="flex justify-center items-center"> <Outlet /> </div>
      </div>
    </>
  )
}
