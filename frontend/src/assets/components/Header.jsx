
/*

import React from 'react'
import {FaSearch} from 'react-icons/fa'; 
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
         <Link to='/'>   
            <h1 className="front-bold text-sm sm:text-xl flex-wrap">
            <span className='text-slate-500'>Pawfect</span>
            <span className='text-slate-900'>care</span>
        </h1>
        </Link>
        <form className="bg-slate-500 p-3 rounded-lg flex items-center">
            <input type="text" placeholder='Search...' 
            className='bg-transparent focus:outline-none w-24 sm:w-64'/>
            <FaSearch className='text-slate-500'/>
        </form>
        <ul className='flex gap-4'>
        <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
                Home
                </li>
        </Link>    
         <Link to='/about'>   
            <li className='hidden sm:inline text-slate-700 hover:underline'>
                About
                </li>
            </Link>   


            <Link to='/PetRecord'>   
            <li className='hidden sm:inline text-slate-700 hover:underline'>
                Add Report
                </li>
            </Link>   


        </ul>
        </div>
    </header>
  );
}

*/
import React, { useEffect, useState } from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa'; 
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in by checking localStorage
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user); // Set to true if user exists, false otherwise
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    setIsLoggedIn(false); // Update state to hide Profile and Logout buttons
    navigate("/"); // Redirect to login page
  };

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        {/* Logo */}
        <Link to='/'>   
          <h1 className="font-bold text-sm sm:text-xl flex-wrap">
            <span className='text-slate-500'>Pawfect</span>
            <span className='text-slate-900'>care</span>
          </h1>
        </Link>

        {/* Search Bar */}
        <form className="bg-slate-500 p-3 rounded-lg flex items-center">
          <input 
            type="text" 
            placeholder='Search...' 
            className='bg-transparent focus:outline-none w-24 sm:w-64'
          />
          <FaSearch className='text-slate-500'/>
        </form>

        {/* Navigation Links */}
        <ul className='flex gap-4 items-center'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Home
            </li>
          </Link>    
          <Link to='/about'>   
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              About
            </li>
          </Link>   
          <Link to='/PetRecord'>   
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Add Report
            </li>
          </Link>   

          {/* Show Login and Register if not logged in */}
          {!isLoggedIn && (
            <>
              <Link to='/login'>
                <li className='text-slate-700 hover:underline'>
                  Login
                </li>
              </Link>
              <Link to='/register'>
                <li className='text-slate-700 hover:underline'>
                  Register
                </li>
              </Link>
            </>
          )}

          {/* Show Profile and Logout if logged in */}
          {isLoggedIn && (
            <>
              <Link to='/profile'>
                <li>
                  <FaUserCircle className='text-slate-700 text-2xl hover:text-slate-900' />
                </li>
              </Link>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-slate-700 hover:underline"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}