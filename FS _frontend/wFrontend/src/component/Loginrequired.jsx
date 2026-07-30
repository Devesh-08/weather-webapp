import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

const LoginRequired = ({ title, message }) => {
  return (
    <div className="min-h-[100vh] flex items-center justify-center px-6 bg-sky-100 dark:bg-slate-900 transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 text-center border border-gray-200 dark:border-slate-700">

        <div className="flex justify-center mb-5">
          <div className="bg-blue-100 dark:bg-slate-700 p-4 rounded-full">
            <Lock className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {title}
        </h2>

        <p className="mt-3 text-gray-600 dark:text-gray-300">
          {message}
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 transition"
          >
            Register
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LoginRequired;