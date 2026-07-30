import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteHistory, getHistory } from '../services/history'
import { Trash2, MapPin, RotateCcw } from "lucide-react";
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginRequired from '../component/Loginrequired';

function History() {

  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  const { token } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    fetchHistory()
  })

  const fetchHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data.history)
    } catch (error) {
      toast.error("Failed to load history")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteHistory(id);

      setHistory((prev) => prev.filter((item) => item._id !== id))

      toast.success("Deleted successfully")
    } catch (error) {
      toast.error("Delete failed")
    }
  }

  const handleSearchAgain = (city) => {
    navigate("/", {
      state: { city }
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        Loading...
      </div>
    );
  }
  if (!token) {
    return (
      <LoginRequired
        title="Search History"
        message="Login to view your previous weather searches."
      />
    );
  }

  return (
    <div className="min-h-screen bg-sky-100 bg-linear-to-br dark:from-slate-400 dark:to-slate-500 transition-colors duration-300 p-6">

      <div className="max-w-4xl mx-auto">

        <div className='flex justify-between'>
          <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-black">
            Search History
          </h1>
          <Link to="/" className="p-2 text-2xl">&larr;BACK</Link>
        </div>

        {history.length === 0 ? (
          <div className="text-center mt-20">

            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              No Search History
            </h2>

            <p className="text-gray-500 mt-2">
              Start searching cities to see them here.
            </p>

          </div>
        ) : (
          <div className="space-y-4">

            {history.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-gray-200 dark:border-slate-700 p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4"
              >

                <div>

                  <div className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-white">
                    <MapPin size={20} />
                    {item.city}
                  </div>

                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(item.searchedAt).toLocaleString()}
                  </p>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() => handleSearchAgain(item.city)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    <RotateCcw size={18} />
                    Search Again
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default History