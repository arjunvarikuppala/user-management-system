import { NavLink } from 'react-router'

function Header() {
  return (
    <header className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 select-none">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
        >
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-[0_4px_12px_rgba(79,70,229,0.25)]">
            UM
          </div>
          <span className="font-bold text-slate-800 tracking-tight text-lg">
            User Management System
          </span>
        </NavLink>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1.5 md:gap-3">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/userlist"
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`
            }
          >
            Users List
          </NavLink>
          <NavLink
            to="/adduser"
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`
            }
          >
            Add User
          </NavLink>
        </nav>

        {/* Balance layout */}
        <div className="hidden md:block w-8"></div>

      </div>
    </header>
  )
}

export default Header
