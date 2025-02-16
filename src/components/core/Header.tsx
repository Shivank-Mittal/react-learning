import { NavLink } from "react-router";
import { LoginButton } from '../index';
export default function Header({menus , className = ""}: {menus: Map<string, string>, className?: string}) {

    const active = (event: React.MouseEvent<HTMLHeadElement>) => {
        if(!((event.target) instanceof HTMLLIElement)) return;
    }

    return (
        <nav onClick={ (event) => active(event)} className= {`bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600" ${className}`}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <LoginButton />
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {
                            (() => {
                                const list = [];
                                for (const [key, value] of menus.entries()) {
                                    list.push(
                                        <li key={key} className='className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page"'>
                                            <NavLink to={key} className= {(state) => !state.isActive ? " hover:text-blue-600 text-white ": " hover:text-blue-600 text-blue-600  cursor-pointer"}>
                                                {value.replace("_", " ")}
                                            </NavLink>
                                        </li> 
                                    )
                                }
                                return list;
                            })()
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}




{/* <header onClick={ (event) => active(event)}  
            className= {`min-w-lg bg-white text-black flex justify-around items-center rounded-2xl h-20  font-semibold ${className}` }>
            {menus.map((menu, index) => 
                <NavLink key={index} to={"/project/" + menu.toLowerCase()} className= {(state) => !state.isActive ? "cursor-pointer hover:text-blue-600 ": "cursor-pointer hover:text-blue-600 text-blue-600"}>
                    {menu.replace("_", " ")}
                </NavLink>)}
        </header> */}