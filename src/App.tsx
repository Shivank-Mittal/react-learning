import './App.css'
import Header from './components/core/Header'
import { Outlet } from "react-router";
import { MENU_AVAILABLE } from './constants/menu';
import { useTheme} from './context/index.ts';

export default function App() {
  const {themeColor} = useTheme();
  return (
    <>
      <div style={{backgroundColor: themeColor}} className='m-0 pt-10 pr-5 pl-5 grid grid-rows-[auto_1fr] h-screen'>
        <Header menus={ Object.values(MENU_AVAILABLE)}></Header>  
        <div className="flex justify-center items-center"> <Outlet /> </div>
      </div>
    </>
  )
}

// function EnableBackgroundChanger(enable : boolean) {

//   const [color, seColor] = useState(COLORS.BLACK);
//   const updateColor = (chosenColor: COLORS) =>{
//     seColor(chosenColor)
//   }

//   const [color, seColor] = useState(COLORS.BLACK);

//   if(!enable) return {color};
//   const updateColor = (chosenColor: COLORS) =>{
//     seColor(chosenColor)
//   }

//   return {
//     color,
//     html: <BackgroundChanger backgroundColor={updateColor}/>
//   } 
// }

