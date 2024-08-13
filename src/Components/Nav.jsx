import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Nav() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const profileIconRef = useRef(null);
  const drawerRef = useRef(null);

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      profileIconRef.current &&
      !profileIconRef.current.contains(event.target)
    ) {
      setDropdownOpen(false);
    }

    if (
      drawerRef.current &&
      !drawerRef.current.contains(event.target)
    ) {
      setDrawerOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const activeLink = 'block underline underline-offset-8 py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent text-white md:p-0';
  const nonActiveLink = 'block text-white py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:font-black md:hover:text-white md:p-0';



  return (
    <>
      <nav className="fixed w-full bg-utama z-50">
        <div className="flex mx-0 sm:mx-20 justify-between items-center p-4">
          <div className="flex items-center space-x-4">
            <img className="w-8 h-8 md:w-12 md:h-12 overflow-hidden rounded-full object-cover" src="/images/logo-muvausa-store.webp" alt="" />
            <a onClick={() => navigate("/")} className="text-lg md:text-2xl text-white font-bold cursor-pointer">Muvausa Store</a>
          </div>

          <div className="hidden items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col gap-x-1 p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-utama">
              <li>
                <NavLink className={({ isActive }) => (isActive ? activeLink : nonActiveLink)} to='#'>Home</NavLink>
              </li>
            </ul>
          </div>

          {/* Mobile Menu */}
          <button onClick={handleDrawerToggle} className="md:hidden text-white rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Drawer */}
          {drawerOpen && (
            <>
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black bg-opacity-60 z-30"
                onClick={handleDrawerToggle} // Menutup drawer ketika overlay diklik
              ></div>

              {/* Drawer */}
              <div ref={drawerRef} className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transition-transform transform translate-x-0 z-40">
                <button onClick={handleDrawerToggle} className="absolute top-4 right-4 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="p-4">
                  <h2 className="text-xl font-bold">Menu</h2>
                  <ul className="mt-4">
                    <li>
                      <NavLink className={({ isActive }) => (isActive ? 'block py-2 px-4 bg-gray-700 rounded' : 'block py-2 px-4 hover:bg-gray-700 rounded')} to='#'>Home</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
      <div className='pb-16'></div>
    </>
  );
}