"use client"

// components/Nav.js
import Link from 'next/link';
// import { useRecoilState } from 'recoil';
// import { Lang, langAtom } from '../context/recoil';
// import { ChangeEvent } from 'react';

const Nav = () => {
  // const [lang, setLang] = useRecoilState(langAtom);
  // const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //   setLang(e.target.value as Lang);
  // }
  return (
    <nav className="bg-slate-400 p-4">
      <ul className="flex space-x-6 justify-center">
        <li>
          <Link href="/">
            <span className="text-white font-bold hover:text-gray-400">person</span>
          </Link>
        </li>
        <li className="block">
        {/* <select
          id="language"
          value={lang}
          onChange={handleLanguageChange}
          className="p-2 border rounded-md bg-white text-gray-700"
        >
          <option value="ko">한국어</option>
          <option value="zh">中文</option>
          <option value="ja">日本語</option>
          <option value="en">English</option>
        </select> */}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
