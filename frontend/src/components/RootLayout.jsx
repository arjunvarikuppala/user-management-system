import { Outlet, useNavigation } from 'react-router'
import Footer from './Footer'
import Header from './Header'

function RootLayout() {
  const navigation = useNavigation()
  const isNavigating = navigation.state !== "idle"

  return (
    <div className="page-shell d-flex min-vh-100 flex-column">
      <div className="d-flex min-vh-100 flex-column">
        <Header />

        <main className="flex-grow-1 py-4">
          <div className="container">
            {isNavigating ? (
              <div className="alert alert-light border mb-4" role="status">
                Loading content...
              </div>
            ) : null}

            <Outlet />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default RootLayout
