import { useState, useCallback } from 'react'
import './App.css'
// import BackgroundChanger from './project/background-changer/Background_Changer'
import PasswordGenerator from './project/password-genrator/Password_Generator'
import CurrencyConverter from './project/currency-converter/Currency_Converter'
import { COLORS } from './project/background-changer/colors'

export default function App() {


  return (
    <>
      <div style={{backgroundColor: COLORS.BLACK}} className='h-screen flex justify-center items-center'>
        {/* <PasswordGenerator></PasswordGenerator> */}
        {/* <BackgroundChanger backgroundColor={updateColor}/> */}
        <CurrencyConverter></CurrencyConverter>
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

