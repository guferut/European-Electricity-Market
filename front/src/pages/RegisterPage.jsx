import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/features/auth/authSlice'
import {toast} from 'react-toastify'

export const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const { status } = useSelector((state) => state.auth)
  const dispatch = useDispatch()


  useEffect(() => {
    if (status) {
      toast(status)
    }

  }, [status])

  const handleSubmit = (e) => {
    e.preventDefault()

    try {
      dispatch(registerUser({ email, password, fullName}))
      setEmail('')
      setPassword('')
      setFullName('')
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='w-1/4 h-60 mx-auto mt-40'
    >
      <h1 className='text-lg text-white text-center'>Register</h1>
      <label className='text-xs text-gray-400'>
        Email:
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
        />
      </label>

      <label className='text-xs text-gray-400'>
        Password:
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
        />
      </label>

      <label className='text-xs text-gray-400'>
        Username:
        <input
          type='text'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder='Full Name'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
        />
      </label>

     

      <div className='flex gap-8 justify-center mt-4'>
        <button
          type='submit'
          className='flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4'
        >
          Register
        </button>
        <Link
          to='/login'
          className='flex justify-center items-center text-xs text-white'
        >
          Already registered?
        </Link>
      </div>
    </form>
  )
}
