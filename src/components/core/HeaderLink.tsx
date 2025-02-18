import { Link, NavLink } from 'react-router';

type HeaderLinkProps = { name: string } & (
  | { type: 'link'; url: string }
  | { type: 'dropdown'; dropdownItems: { name: string; url: string }[] }
);

export default function HeaderLink({ props }: { props: HeaderLinkProps }) {
  const navLink = () => {
    if (props.type === 'dropdown') return;
    return (
      <NavLink
        className={(state) =>
          !state.isActive
            ? ' hover:text-blue-600 text-white '
            : ' hover:text-blue-600 text-blue-600 '
        }
        to={props.url}
      >
        {props.name.toUpperCase()}
      </NavLink>
    );
  };

  const dropdownButton = () => {
    if (props.type === 'link') return;

    return (
      <div className="relative group">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          {props.name.toUpperCase()}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div className="absolute w-full h-3 -bottom-3"></div>
        <div className="hidden group-hover:block absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 mt-3">
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownHoverButton"
          >
            {props.dropdownItems.map((item) => (
              <li key={item.url}>
                <Link
                  to={item.url}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return props.type === 'link' ? navLink() : dropdownButton();
}
