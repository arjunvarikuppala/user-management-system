import { useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router'

function formatDate(dateValue) {
  if (!dateValue) {
    return "Not available"
  }

  const parsedDate = new Date(dateValue)

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not available"
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(parsedDate)
}

function getInitials(name) {
  if (!name) return "?"
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

function User() {
  const user = useLoaderData()
  const navigate = useNavigate()
  const [deleteError, setDeleteError] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const detailRows = [
    { label: "Full Name", value: user.name },
    { label: "Email Address", value: user.email },
    { label: "Date of Birth", value: formatDate(user.DOB) },
    { label: "Mobile Number", value: user.mobilenumber || "Not available" }
  ]

  async function handleDelete() {
    const shouldDelete = window.confirm(`Are you sure you want to delete ${user.name}'s record permanently?`)
    if (!shouldDelete) return

    setDeleteError("")
    setIsDeleting(true)

    try {
      const res = await fetch(`/user-api/users/${user._id}`, {
        method: "DELETE"
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Unable to delete user")
      }

      navigate("/userlist")
    } catch (err) {
      setDeleteError(err.message)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto select-none animate-fade-in space-y-6">
      
      {/* Back button link */}
      <div>
        <Link
          to="/userlist"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-indigo-600 transition-colors"
        >
          ← Back to List
        </Link>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.015)]">
        
        {deleteError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl p-4 mb-6">
            Error: {deleteError}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Avatar side */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left shrink-0">
            <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-inner mb-4">
              {getInitials(user.name)}
            </div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">
              {user.name}
            </h2>
            <p className="text-sm text-slate-400 mt-1 truncate max-w-[200px]">
              {user.email}
            </p>
          </div>

          {/* Details specs */}
          <div className="flex-1 w-full space-y-5">
            <div className="space-y-4">
              {detailRows.map((item) => (
                <div key={item.label} className="flex flex-col sm:flex-row justify-between sm:items-center py-3.5 border-b border-slate-50 last:border-0">
                  <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                    {item.label}
                  </span>
                  <span className="text-base font-semibold text-slate-800 break-all max-w-sm mt-1 sm:mt-0">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Action Panel */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="w-full sm:w-auto bg-rose-50 hover:bg-rose-100 active:scale-[0.98] disabled:opacity-50 text-rose-600 text-xs font-semibold px-5 py-3 rounded-xl transition-all cursor-pointer text-center"
          >
            {isDeleting ? "Deleting..." : "Delete User"}
          </button>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              to="/adduser"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-5 py-3 rounded-xl transition-all shadow-[0_4px_12px_rgba(79,70,229,0.2)] text-center cursor-pointer no-underline"
            >
              Add User
            </Link>
            <Link
              to="/userlist"
              className="w-full sm:w-auto border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold px-5 py-3 rounded-xl transition-all text-center cursor-pointer no-underline"
            >
              Back to List
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default User
