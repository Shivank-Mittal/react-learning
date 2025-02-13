import React from 'react'

function LogoButton({imgSrc, name = "Projects"}: {imgSrc: string, name? : string}) {
  return (
    <div>
        <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={imgSrc} className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{name}</span>
        </a>
    </div>
  )
}

export default LogoButton