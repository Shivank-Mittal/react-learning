import { ComponentType, useEffect, useState } from "react"

export default function WithNoContentState (Component: ComponentType<unknown>) {

    const [inErrorState, setErrorState] = useState(false)

    const errorHandler = () => {
        console.log("in error");
        setErrorState(true);
    }

    const resetHandler = () => {
        console.log("in reset");
        setErrorState(false);
    }

    const resetEvent = new CustomEvent("Reset-state")

    useEffect(() => {
        window.addEventListener("Error-state", errorHandler);
        return () =>  window.removeEventListener("Error-state", errorHandler)
    }, [])

    useEffect(() => {
        window.addEventListener("Reset-state", resetHandler);
        return () => window.removeEventListener("Reset-state", errorHandler)
    }, [])

    return (prop: any) => {
        return ( inErrorState ?  
            (
            <div onClick={ () => dispatchEvent(resetEvent) } className="p-4 mb-4 text-sm cursor-pointer text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">Danger alert!</span> Error Accrued. Press the reset button to try again.
            </div>
        ): 
            <Component {...prop}  />
        )
    }
}