import { Link } from 'react-router'

function Home() {
  return (
    <div className="w-full max-w-2xl mx-auto py-12 select-none animate-fade-in space-y-8">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
          User Management System
        </h1>
      </div>

      {/* Grid of Main Functional Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
        {/* Action 1: Directory */}
        <Link
          to="/userlist"
          className="flex flex-col items-center justify-center p-8 bg-white border border-slate-100 hover:border-indigo-150 hover:bg-slate-50/50 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.01)] transition-all duration-200 no-underline text-center group"
        >
          <span className="text-4xl mb-4 group-hover:scale-105 transition-transform">👥</span>
          <h2 className="text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
            View Users List
          </h2>
        </Link>

        {/* Action 2: Add User */}
        <Link
          to="/adduser"
          className="flex flex-col items-center justify-center p-8 bg-white border border-slate-100 hover:border-indigo-150 hover:bg-slate-50/50 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.01)] transition-all duration-200 no-underline text-center group"
        >
          <span className="text-4xl mb-4 group-hover:scale-105 transition-transform">📝</span>
          <h2 className="text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
            Add New User
          </h2>
        </Link>
      </div>
    </div>
  )
}

export default Home
