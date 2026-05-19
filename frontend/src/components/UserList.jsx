import { Link, useLoaderData } from 'react-router'

function UserList() {
  const users = useLoaderData()

  return (
    <section className="content-card">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2 mb-4">
        <div>
          <h1 className="h3 mb-1">Users List</h1>
          <p className="text-muted mb-0">Active users in the system.</p>
        </div>
        <p className="text-muted mb-0">
          {users.length} active {users.length === 1 ? "record" : "records"}
        </p>
      </div>

      {users.length === 0 ? (
        <div className="alert alert-light border mb-0" role="alert">
          No users found.
        </div>
      ) : (
        <div className="list-group">
          {users.map((user) => (
            <Link
              key={user._id}
              to={`/user/${user._id}`}
              className="list-group-item list-group-item-action"
            >
              <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
                <div>
                  <h2 className="h6 mb-1 text-dark">{user.name}</h2>
                  <p className="mb-0 text-muted">{user.email}</p>
                </div>
                <span className="btn btn-sm btn-outline-secondary">
                  View Details
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

export default UserList
