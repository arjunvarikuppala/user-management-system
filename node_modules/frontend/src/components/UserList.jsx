import { useState, useDeferredValue } from 'react'
import { Link, useLoaderData } from 'react-router'

function getInitials(name) {
  if (!name) return "?"
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

function UserList() {
  const users = useLoaderData()
  const [query, setQuery] = useState("")
  const deferredQuery = useDeferredValue(query.trim().toLowerCase())

  const filteredUsers = users.filter((user) => {
    if (!deferredQuery) {
      return true
    }
    return [user.name || "", user.email || "", String(user.mobilenumber || "")]
      .some((value) => value.toLowerCase().includes(deferredQuery))
  })

  return (
    <div className="w-full select-none animate-fade-in space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            Users List
          </h1>
        </div>
      </div>

      {/* Toolbar / Search Box */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white border border-slate-100 p-4 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-3.5 flex items-center text-slate-400 text-sm">
            🔍
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-hidden focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all text-sm text-slate-700 placeholder:text-slate-400"
          />
        </div>
        <Link
          to="/adduser"
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-xs font-semibold px-5 py-3 rounded-full shadow-[0_4px_12px_rgba(37,99,235,0.2)] text-center cursor-pointer transition-all"
        >
          Add User
        </Link>
      </div>

      {/* Roster list */}
      {users.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
          <span className="text-3xl block mb-3">📂</span>
          <h3 className="text-base font-semibold text-slate-800 mb-1">No users found</h3>
          <Link
            to="/adduser"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all shadow-[0_4px_12px_rgba(37,99,235,0.2)]"
          >
            Add New User
          </Link>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
          <h3 className="text-base font-semibold text-slate-800 mb-1">No matches found</h3>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-xs font-semibold text-blue-600 hover:underline mt-2"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredUsers.map((user) => (
            <Link
              key={user._id}
              to={`/user/${user._id}`}
              className="group bg-white hover:bg-slate-50/50 border border-slate-100 hover:border-slate-200 rounded-xl p-4 flex items-center gap-4 transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.01)] no-underline"
            >
              {/* Initials badge */}
              <div className="w-12 h-12 bg-blue-50 text-blue-600 font-semibold rounded-xl flex items-center justify-center flex-shrink-0 text-sm shadow-inner">
                {getInitials(user.name)}
              </div>

              {/* Main meta */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors no-underline">
                  {user.name}
                </h3>
                <p className="text-sm text-slate-400 truncate mt-0.5 no-underline">
                  {user.email}
                </p>
              </div>

              {/* Action trigger */}
              <div className="flex items-center gap-1 text-sm font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                <span>View Details</span>
                <span className="text-[11px] group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserList

