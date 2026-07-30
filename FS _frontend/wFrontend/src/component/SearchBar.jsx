import { useState } from "react";

const SearchBar=({onSearch})=>{
    const [city,setCity]=useState("")

    const handleSubmit=(e)=>{
        e.preventDefault()

        if(!city.trim())return;

        onSearch(city)

        setCity("")
    }

    return (
    <form
    onSubmit={handleSubmit}
    className="max-w-2xl mx-auto"
    >
        <h1 className="text-5xl font-bold text-center mb-8">
            Weather Forecast
        </h1>

        <div className="flex gap-3">
            <input type="text" placeholder="Enter city..."
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            className="flex-1 rounded-xl border p-4 text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-slate-700 dark:text-white dark:border-slate-600"
            />
             <button
          className="bg-sky-600 text-white px-8 rounded-xl hover:bg-sky-700 transition dark:bg-indigo-600 dark:hover:bg-indigo-700"
        >
          Search
        </button>
        </div>
    </form>
    )
}

export default SearchBar