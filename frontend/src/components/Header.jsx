import { NavLink } from 'react-router'

const navItems = [
  { label: "Home", to: "/" },
  { label: "Add User", to: "/adduser" },
  { label: "User List", to: "/userlist" }
]

function getLinkClassName(isActive) {
  return [
    "app-nav-link",
    isActive ? "active" : ""
  ].join(" ")
}

function Header() {
  return (
    <header className="border-bottom bg-white">
      <div className="container d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 py-3">
        <div>
          <NavLink
            to="/"
            end
            className="app-brand text-decoration-none"
          >
            User Management
          </NavLink>
          <p className="mb-0 mt-1 text-muted">
            Simple pages for adding and viewing users.
          </p>
        </div>

        <nav className="app-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => getLinkClassName(isActive)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
