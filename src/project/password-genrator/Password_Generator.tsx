import { useState, useCallback, useEffect, useRef } from 'react'
import useToaster from '../../hooks/useToaster';

export default function PasswordGenerator() {

    const [includeNumber, setUseNumber] = useState(false);
    const [includeCharacters, setCharacters] = useState(false);
    const [length, setLength] = useState(5);
    const [password, setPassword] = useState("");
    const {addToast} = useToaster()
    const passwordRef = useRef<HTMLInputElement>(null);

    /**
     * This is use to optimise the function by memoize it.
     * It track the dependencies and memoize them 
     */
    const passwordCallback =  useCallback( () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        // Build the character set based on the parameters
        let characters = letters;
        if (includeNumber) { characters += numbers;}
        if (includeCharacters) {characters += specialChars;}
    
        let result = '';
        for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
        }

        setPassword(result);
    }, [setPassword, length, includeNumber, includeCharacters])

    const copyCallback = useCallback(async () => {
        // debugger
        try {
            document.body.focus();
            // await navigator.clipboard.writeText(password);
            addToast({message: "Password Copied", type: 'info'});
            passwordRef.current?.select();
        } catch(error) {
            alert(error)
        }
    } ,[password, addToast])

    // use to call a function when ever the dependencies update which are passed in array
    useEffect(
        () => passwordCallback(), 
        [length, includeNumber, includeCharacters, passwordCallback]) 
    return (
        <>
            <div className="max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div >
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Small input
                        </label>
                        <div className="flex items-center justify-center align-middler">
                            <input type="text" id="small-input" value={password} ref={passwordRef} className="block h-10 mb-2 w-100 rounded-l-lg text-gray-900 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> 
                            <button type="button" onClick={copyCallback} className="m-0 rounded-r-lg h-10 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ">
                                Copy
                            </button>
                        </div>
                </div>

                <div className='flex gap-5 justify-around pt-5'>
                    <div className="flex items-center gap-1">
                        <label className="block text-sm font-medium text-gray-900 dark:text-white">Length</label>
                        <input id="default-range" 
                            type="range" 
                            min="1"
                            max="50" 
                            onChange = {(event => setLength(+(event.target as HTMLInputElement).value))} 
                            value={length} 
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                        <label className="block text-sm font-medium text-gray-900 dark:text-white">{length}</label>   
                    </div>
                    <div className="flex items-center">
                        <input id="checked-checkbox" checked= {includeNumber} onChange={() => setUseNumber(prevNumber => !prevNumber )} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Numbers</label>
                    </div>
                    <div className="flex items-center">
                        <input id="checked-checkbox" checked= {includeCharacters} onChange={() => setCharacters(prevChar => !prevChar )} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Characters</label>
                    </div>
                </div>
            </div>
        </>
    )
}