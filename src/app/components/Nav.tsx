// components/Nav.js
import Link from 'next/link';

const Nav = () => {
  return (
    <nav className="bg-slate-400 p-4">
      <ul className="flex space-x-6 justify-center">
        <li>
          <Link href="/">
            <span className="text-white font-bold hover:text-gray-400">person</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
