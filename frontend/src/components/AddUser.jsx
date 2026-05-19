import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router'

function AddUser() {
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState("")
  const [loading, setLoading] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()

  async function userUpdate(formValues) {
    setLoading(true)
    setSubmitError("")

    try {
      const userData = {
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        DOB: formValues.dateOfBirth,
        mobilenumber: Number(formValues.mobilenumber)
      }

      const res = await fetch("/user-api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Failed to save user")
      }

      navigate("/userlist")
    } catch (err) {
      setSubmitError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto select-none animate-fade-in py-4">
      {/* Title */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Add New User
        </h1>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.015)]">
        
        {submitError ? (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl p-4 mb-6">
            Error: {submitError}
          </div>
        ) : null}

        <form onSubmit={handleSubmit(userUpdate)} className="space-y-6">
          
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider">
              Name
            </label>
            <input
              type="text"
              placeholder="Full name"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-hidden focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all text-base text-slate-800 placeholder:text-slate-400"
              {...register('name', { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-hidden focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all text-base text-slate-800 placeholder:text-slate-400"
              {...register('email', { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider">
              Date of Birth
            </label>
            <input
              type="date"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-hidden focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all text-base text-slate-800"
              {...register('dateOfBirth', { required: "Date of birth is required" })}
            />
            {errors.dateOfBirth && (
              <p className="text-sm text-red-500 mt-1">{errors.dateOfBirth.message}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider">
              Mobile Number
            </label>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="Mobile digits"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-hidden focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all text-base text-slate-800 placeholder:text-slate-400"
              {...register('mobilenumber', {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Enter a valid mobile number"
                }
              })}
            />
            {errors.mobilenumber && (
              <p className="text-sm text-red-500 mt-1">{errors.mobilenumber.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-50 text-white py-3 rounded-xl font-semibold text-sm transition-all shadow-[0_4px_12px_rgba(79,70,229,0.2)] flex items-center justify-center cursor-pointer"
            >
              {loading ? "Saving..." : "Save Member"}
            </button>
            <Link
              to="/"
              className="w-full border border-slate-200 text-slate-600 hover:bg-slate-50 py-3 rounded-xl font-semibold text-sm transition flex items-center justify-center cursor-pointer text-center no-underline"
            >
              Cancel
            </Link>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddUser
