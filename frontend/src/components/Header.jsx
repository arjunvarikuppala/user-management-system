import { NavLink } from 'react-router'

function Header() {
  return (
    <header className="w-full sticky top-0 z-50 bg-blue-500 shadow-md select-none">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo / Avatar */}
        <NavLink
          to="/"
          className="flex items-center gap-2.5 hover:opacity-95 transition-opacity"
        >
          <div className="w-10 h-10 rounded-full border border-white bg-blue-400 flex items-center justify-center overflow-hidden shadow-sm">
            <svg className="w-8 h-8 text-white mt-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </NavLink>

        {/* Navigation Links */}
        <nav className="flex items-center gap-3">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-5 py-1.5 rounded-full text-base font-bold transition-all duration-150 ${
                isActive
                  ? 'bg-white text-orange-500 shadow-xs'
                  : 'text-slate-900 hover:text-orange-500'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/adduser"
            className={({ isActive }) =>
              `px-5 py-1.5 rounded-full text-base font-bold transition-all duration-150 ${
                isActive
                  ? 'bg-white text-orange-500 shadow-xs'
                  : 'text-slate-900 hover:text-orange-500'
              }`
            }
          >
            Add User
          </NavLink>
          <NavLink
            to="/userlist"
            className={({ isActive }) =>
              `px-5 py-1.5 rounded-full text-base font-bold transition-all duration-150 ${
                isActive
                  ? 'bg-white text-orange-500 shadow-xs'
                  : 'text-slate-900 hover:text-orange-500'
              }`
            }
          >
            User List
          </NavLink>
        </nav>

      </div>
    </header>
  )
}

export default Header

