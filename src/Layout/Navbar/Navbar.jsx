import { Link, NavLink } from "react-router-dom";
import "./style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`navbar bg-white sticky top-0 z-50 shadow-lg h-20`}>
      <div className='navbar-start'>
        <div className='relative ml-2 mr-5 flex md:hidden lg:hidden'>
          {isOpen ? (
            <AiOutlineClose
              onClick={toggleMenu}
              size={30}
              className='text-black'
            />
          ) : (
            <FiMenu onClick={toggleMenu} size={30} className='text-black' />
          )}
        </div>
        <Link className='btn btn-ghost normal-case text-xl text-black '>
          Demo
        </Link>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          {/* Nav ber Links For Desktop Size  */}
          <NavLink to='/' className='text-black mr-2'>
            Home
          </NavLink>
        </ul>
      </div>
      <ToastContainer />
      <div className='navbar-end'>
        {user ? (
          <div className='group dropdown dropdown-end'>
            <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
              <div className='w-10 rounded-full'>
                <img src={user.photoURL} alt='User Avatar' />
              </div>
            </label>
            <ul
              tabIndex={0}
              className='group-hover:block hidden z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 transition-transform duration-200 ease-in-out delay-200'
            >
              {/* Profile Menu Item */}
              <h2 className='fond-bold ml-3 my-2'>{user.displayName}</h2>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <Link to='/orders'>Orders</Link>
              </li>
              <li>
                <button
                  className='hover:bg-red-500 hover:text-white'
                  onClick={logOut}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to='/login'
            className='bg-gradient-to-r from-teal-400 to-teal-600 text-white font-semibold py-2 px-4 rounded-br-full rounded-tl-full transition duration-500 ease-in-out hover:scale-x-105'
          >
            Join US
          </Link>
        )}
      </div>
      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "visible" : "invisible"
        } z-50 flex flex-col justify-center items-center min-h-screen absolute top-20 left-0 min-w-full bg-black transition-transform duration-500 ease-in-out`}
      >
        {/* Nav ber Links For Mobile Size  */}
        <NavLink
          onClick={toggleMenu}
          to='/'
          className={`text-white p-4 ${
            isOpen ? "opacity-100 duration-500" : "opacity-0 duration-200"
          }`}
        >
          Home
        </NavLink>
        <NavLink
          onClick={toggleMenu}
          to='/profile'
          className={`text-white p-4 ${
            isOpen ? "opacity-100 duration-500" : "opacity-0 duration-200"
          }`}
        >
          Profile
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
