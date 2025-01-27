import { NavLink } from "react-router";
export default function Header({menus= [], className = ""}: {menus: string[], className?: string}) {

    const active = (event: React.MouseEvent<HTMLHeadElement>) => {
        if(!((event.target) instanceof HTMLLIElement)) return;
        console.log(event.target.textContent)
    }

    return (
        <header onClick={ (event) => active(event)}  
            className= {`min-w-lg bg-white text-black flex justify-around items-center rounded-2xl h-20  font-semibold ${className}` }>
            {menus.map(menu => 
                <NavLink to={"/project/" + menu.toLowerCase()} className= {(state) => !state.isActive ? "cursor-pointer hover:text-blue-600 ": "cursor-pointer hover:text-blue-600 text-blue-600"}>
                    {menu.replace("_", " ")}
                </NavLink>)}
        </header>
    )
}