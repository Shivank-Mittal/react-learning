import React from "react"
import {COLORS, ColorsRecord} from './colors'
import {Button, buttonVariants} from '../../components/ui/button'



// prop: { backgroundColor: COLORS} = { backgroundColor: COLORS.GREEN}
interface BackgroundChangerProps {
    backgroundColor: (color: COLORS) => void;
}

type buttonInfo = {
    name: string,
    color: COLORS
}

const buttonInfoArray: buttonInfo[] = [
    {name: "Yellow", color: COLORS.YELLOW},
    {name: "RED", color: COLORS.RED},
    {name: "GREEN", color: COLORS.GREEN},
    {name: "BLUE", color: COLORS.BLUE},
    {name: "BROWN", color: COLORS.BROWN},
]


const buttons = buttonInfoArray.map(buttonInfo => 
    <Button key={buttonInfo.name} className="bg-white rounded-xl" 
        style={{backgroundColor: buttonInfo.color}} 
        value={buttonInfo.color}> 
        {buttonInfo.name} 
    </Button>
)
export default function BackgroundChanger({ backgroundColor }: BackgroundChangerProps) {
    function changeColor(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const target = event.target as HTMLButtonElement;
        if(!target.value && !ColorsRecord.has(target.value))  return
        backgroundColor(ColorsRecord.get(target.value)!)
    }
    return (
        <>
            <div onClick={ (event) => changeColor(event)}
                className="rounded-xl bg-white h-10 mb-16 pl-5 pr-5 p-6 flex justify-around items-center gap-10"> 
                {buttons}
            </div>
        </>
    )
}