import { LoginButton, Logo } from '../index';
import { LOGO } from '../../constants/menu';
import HeaderLink from './HeaderLink';
import { Menu } from '../../constants/router';

type headerType = {
  menu: Menu;
  className?: string;
};

export default function Header({ menu, className = '' }: headerType) {
  const active = (event: React.MouseEvent<HTMLHeadElement>) => {
    if (!(event.target instanceof HTMLLIElement)) return;
  };

  return (
    <nav
      onClick={(event) => active(event)}
      className={`bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600" ${className}`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Logo imgSrc={LOGO} />
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <LoginButton />
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col items-center p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {Object.values(menu).map((link, index) => (
              <HeaderLink key={index} props={link}></HeaderLink>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
