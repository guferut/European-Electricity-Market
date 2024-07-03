import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import {checkIsAuth, logout} from '../redux/features/auth/authSlice'


export const Navbar = () => {

  const isAuth = useSelector(checkIsAuth)

  const activeStyles = {
    color: 'white',
  }

  return (
    <div className='flex py-4 justify-between items-center'>
      <span className='flex justify-centr items-center w-6 h-6 bg-gray-600 text-sx text-white rounded-sm'>we</span>

      {
        isAuth && ( 
      

          <ul className='flex gap-8'>
            <li>
              <NavLink
                to={'/'}
                href='/'
                className='text-xs text-gray-400 hover:text-white'
                style={({ isActive }) => isActive ? activeStyles : undefined}

              >
                Main
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/entity'}
                href='/'
                className='text-xs text-gray-400 hover:text-white'
                style={({ isActive }) => isActive ? activeStyles : undefined}

              >
                My providers
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/new'}
                href='/'
                className='text-xs text-gray-400 hover:text-white'
                style={({ isActive }) => isActive ? activeStyles : undefined}

              >
                Create provaider
              </NavLink>
            </li>
          </ul>
        )}
      <div className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'>
        {isAuth ? (
          <button>Log out</button>
        ) : (
            <Link to={'/login'}> Login </Link>
        ) }
      </div>
    </div>
    
  )
}
