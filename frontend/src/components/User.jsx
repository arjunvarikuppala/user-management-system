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

function User() {
  const user = useLoaderData()
  const navigate = useNavigate()
  const [deleteError, setDeleteError] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    setDeleteError("")
    setIsDeleting(true)

    try {
      const res = await fetch(`http://localhost:3000/user-api/users/${user._id}`, {
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
    <section className="content-card">
      <h1 className="h3 mb-1">User Details</h1>
      <p className="text-muted mb-4">{user.name}</p>

      <div className="table-responsive">
        <table className="table table-bordered detail-table mb-0">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{user.name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th>Date of birth</th>
              <td>{formatDate(user.DOB)}</td>
            </tr>
            <tr>
              <th>Mobile number</th>
              <td>{user.mobilenumber}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {deleteError ? (
        <div className="alert alert-danger py-2 mt-4" role="alert">
          {deleteError}
        </div>
      ) : null}

      <div className="d-flex flex-wrap gap-2 mt-4">
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="btn btn-danger"
        >
          {isDeleting ? "Deleting..." : "Delete User"}
        </button>

        <Link
          to="/userlist"
          className="btn btn-outline-secondary"
        >
          Back to List
        </Link>
      </div>
    </section>
  )
}

export default User
