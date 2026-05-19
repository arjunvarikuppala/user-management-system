import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

const inputClassName =
  "form-control"

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

      const res = await fetch("http://localhost:3000/user-api/user", {
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
    <section className="content-card content-card-narrow">
      <div className="mb-4">
        <h1 className="h3 mb-2">Add User</h1>
        <p className="text-muted mb-0">
          Enter the user details below.
        </p>
      </div>

      {submitError ? (
        <div className="alert alert-danger py-2" role="alert">
          {submitError}
        </div>
      ) : null}

      <form onSubmit={handleSubmit(userUpdate)}>
        <div className="mb-3">
          <label className="form-label">Full name</label>
          <input
            type="text"
            placeholder="Enter user name"
            className={inputClassName}
            {...register('name', {
              required: "Name is required"
            })}
          />
          {errors.name ? (
            <p className="form-error">{errors.name.message}</p>
          ) : null}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            placeholder="Enter email address"
            className={inputClassName}
            {...register('email', {
              required: "Email is required"
            })}
          />
          {errors.email ? (
            <p className="form-error">{errors.email.message}</p>
          ) : null}
        </div>

        <div className="mb-3">
          <label className="form-label">Date of birth</label>
          <input
            type="date"
            className={inputClassName}
            {...register('dateOfBirth', {
              required: "Date of birth is required"
            })}
          />
          {errors.dateOfBirth ? (
            <p className="form-error">{errors.dateOfBirth.message}</p>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="form-label">Mobile number</label>
          <input
            type="tel"
            inputMode="numeric"
            placeholder="Enter mobile number"
            className={inputClassName}
            {...register('mobilenumber', {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: "Enter a valid mobile number"
              }
            })}
          />
          {errors.mobilenumber ? (
            <p className="form-error">{errors.mobilenumber.message}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? "Saving..." : "Save user"}
        </button>
      </form>
    </section>
  )
}

export default AddUser
