import { Link } from 'react-router'

function Home() {
  return (
    <div className="w-full max-w-3xl mx-auto py-24 select-none animate-fade-in flex flex-col items-center justify-center text-center space-y-8">
      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
        User Management
      </h1>

      {/* Subtitle */}
      <p className="text-base md:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
        The most efficient way to manage your community. Register new members and keep your database organized in one place.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-row gap-4 justify-center items-center w-full pt-4">
        <Link
          to="/adduser"
          className="bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-bold px-8 py-3 rounded-full shadow-[0_4px_12px_rgba(37,99,235,0.2)] transition-all duration-150 text-center no-underline"
        >
          Add New User
        </Link>
        <Link
          to="/userlist"
          className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-[0.98] text-sm font-bold px-8 py-3 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all duration-150 text-center no-underline"
        >
          View Directory
        </Link>
      </div>
    </div>
  )
}

export default Home

