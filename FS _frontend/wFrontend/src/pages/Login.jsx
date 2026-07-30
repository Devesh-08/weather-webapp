
import { useState } from 'react'
import {login as loginUser} from '../services/authService'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate=useNavigate()
  const {login}=useAuth()

  const [formData,setFormData]=useState({email:"",password:""})

  const[loading,setLoading]=useState(false);
  const [error,setError]=useState("")

  const handleChange=(e)=>{
    setFormData((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();

    try {
      setLoading(true)
      setError("")

      const response=await loginUser(formData)
      // console.log("response",response);
      

      login({
        user:response.loggedInUser,
        accessToken:response.accessToken
      })
      navigate("/")
      
    } catch (error) {
      setError(error.response?.data?.message || "Login failed")
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-linear-to-br from-sky-500 via-blue-600 to-indigo-700 dark:from-slate-900 dark:to-slate-800'>
      <form onSubmit={handleSubmit} className='bg-white shadow-xl rounded-xl p-8 w-full max-w-md'>
        <h1 className='text-3xl fontbold text-center mb-6'>
          Login
        </h1>

        {error && (
          <div className='bg-red-100 text-red-700 p-3 rounded mb-4'>{error}</div>
        )}

        <div className='mb-4'>
          <label className='font-medium'>Email</label>
          <input type="email" name='email' value={formData.email} 
          onChange={handleChange}
          className='w-full border rounded-lg p-3 mt-1'/>
        </div>

        <div className='mb-6'>
          <label htmlFor="" className='font-medium'>Password</label>
          <input type="password" name='password'
          value={formData.password}
          onChange={handleChange}
          className='w-full border rounded-lg p-3 mt-1'/>
        </div>

        <button className='w-full bg-sky-600 text-white rounded-lg py3 hover:bg-sky-700 disabled:bg-gray-400' disabled={loading}>
          {loading ?"Logging in....":"Login"}
        </button>
      </form>
    </div>
  )
}

export default Login