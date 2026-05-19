import { Link } from 'react-router'

function Home() {
  return (
    <section className="content-card">
      <h1 className="h2 mb-3">
        Welcome to User Management
      </h1>
      <p className="text-muted mb-4">
        Use this app to add users, view the list, and open individual records.
      </p>

      <div className="d-flex flex-wrap gap-2 mb-4">
        <Link
          to="/adduser"
          className="btn btn-primary"
        >
          Add User
        </Link>
        <Link
          to="/userlist"
          className="btn btn-outline-secondary"
        >
          View Users
        </Link>
      </div>

      <div className="border-top pt-4">
        <h2 className="h5 mb-3">What you can do</h2>
        <ul className="mb-0 simple-list">
          <li>Add a new user with name, email, date of birth, and mobile number.</li>
          <li>Browse all active users in a simple list.</li>
          <li>Open a user to view details or delete the record.</li>
        </ul>
      </div>
    </section>
  )
}

export default Home
