import { Link } from 'react-router'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-top bg-white mt-auto">
      <div className="container d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2 py-3">
        <p className="mb-0 text-muted">Copyright {year} User Management.</p>
        <div className="d-flex flex-wrap gap-3">
          <Link to="/" className="footer-link">
            Home
          </Link>
          <Link to="/adduser" className="footer-link">
            Add User
          </Link>
          <Link to="/userlist" className="footer-link">
            User List
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
