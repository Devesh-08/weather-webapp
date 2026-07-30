import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/authService';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function Register() {
  const navigate=useNavigate();

  const[formData,setFormData]=useState({
    name:"",
    email:"",
    password:""
  })
  
  const[loading,setLoading]=useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange=(e)=>{
    setFormData((prev)=>({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()

    const {name,email,password}=formData

    if(!name || !email || !password ){
      toast.error("All field required")
      return
    }

    if(password.length <6){
      toast.error("Password must be at least 6 character long!!!")
      return
    }

    try {
      setLoading(true);
      const res=await register({
        name,email,password
      })
      toast.success('Register successful')
      navigate('/login')
    } catch (error) {
      toast.error('Register failed')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Register to continue
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 mt-8"
        >

          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword  ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 pr-14 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword )
                }
                className="absolute right-4 top-3 text-sm text-blue-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register