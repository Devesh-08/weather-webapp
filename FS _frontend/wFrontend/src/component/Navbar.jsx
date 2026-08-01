import { Link } from "react-router-dom";
import Login from '../pages/Login'
import { useAuth } from "../context/AuthContext";
import Register from "../pages/Register";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

const Navbar = () => {
    const { user, logout } = useAuth()
    const { darkMode, toggleTheme } = useTheme()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="bg-sky-600 dark:bg-slate-800 dark:border-slate-700 text-white shadow-md">
            <div className="md:hidden flex items-center justify-between px-6 h-16">
                <Link to="/" className="text-2xl font-bold">
                    Weather App
                </Link>

                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    ☰
                </button>
            </div>
            <div className="max-w-7xl mx-auto px-6 h-16 items-center justify-between hidden md:flex ">
                <Link to="/" className="text-2xl font-bold">
                    Weather App
                </Link>
                <div className="flex items-center gap-6 text-lg">
                    <Link to="/favorites" className="hover:text-grey-200 transition">
                        Favorites
                    </Link>
                    <Link to="/history" className="hover:text-grey-200 transition">
                        History
                    </Link>
                    {user ? (
                        <button onClick={logout} className="bg-red-500 px-4 py-2 rounded-lg text-white">Logout</button>
                    ) : (
                        <>
                            <Link to='/login'>Login</Link>
                            <Link to='/register'>Register</Link>
                        </>
                    )
                    }
                    <select
                        value={darkMode ? "dark" : "light"}
                        onChange={() => toggleTheme()}
                        className="px-3 py-2 rounded-lg border bg-sky-500 outline-none border-sky-400
                         dark:bg-slate-700 dark:text-white dark:border-slate-600"
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
            </div>

            {
                isMenuOpen && (
                    <div className={`
                            fixed
                            top-0
                            left-0
                            h-screen
                            w-64
                            z-50
                            bg-sky-600
                            dark:bg-slate-800
                            shadow-xl
                            transition-transform
                            duration-300
                            ease-in-out
                            ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
                        `}>
                            <div className="flex flex-col mt-10">
                                <div className="">
                                <div className="flex items-center justify-between h-10 bg-linear-to-br from-sky-100 to-blue-200 dark:from-slate-400 dark:to-slate-500">
                                    <h2 className="ml-7.5 text-black dark:text-white font-bold">Weather Menu</h2>
                                    <button onClick={()=>setIsMenuOpen(false)} className="mr-6  text-black font-extrabold dark:text-white">X</button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-6 pl-8 pt-7">
                                
                                <Link to="/favorites" className="hover:text-grey-200 transition"
                            onClick={() => setIsMenuOpen}
                            >
                            Favorites
                        </Link>
                        <Link to="/history" className="hover:text-grey-200 transition" onClick={() => setIsMenuOpen}>
                            History
                        </Link>
                        {user ? (
                            <button onClick={logout} className="bg-red-500 py-2 rounded-lg text-white w-25">Logout</button>
                        ) : (
                            <>
                                <Link to='/login'>Login</Link>
                                <Link to='/register'>Register</Link>
                            </>
                        )
                        }
                        <select
                            value={darkMode ? "dark" : "light"}
                            onChange={() => toggleTheme()}
                            className="px-3 py-2 w-25
                        rounded-lg border bg-sky-500 outline-none border-sky-400
                         dark:bg-slate-700 dark:text-white dark:border-slate-600"
                        >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                            </div>
                            </div>
                    </div>
                )
            }
        </nav>
    )
}

export default Navbar;