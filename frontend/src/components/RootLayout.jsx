import { Outlet, useNavigation } from 'react-router'
import Header from './Header'

function RootLayout() {
  const navigation = useNavigation()
  const isNavigating = navigation.state !== "idle"

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 text-slate-900 antialiased">
      <Header />

      <main className="flex-grow w-full max-w-6xl mx-auto px-6 py-8">
        {isNavigating ? (
          <div className="bg-white/80 border border-slate-100 rounded-2xl text-slate-600 py-3 px-6 text-center text-sm font-medium shadow-sm mb-6 animate-pulse" role="status">
            Updating content...
          </div>
        ) : null}

        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-6 select-none mt-12 text-slate-400">
        <div className="max-w-6xl mx-auto px-6 text-center text-xs">
          &copy; {new Date().getFullYear()} User Management System
        </div>
      </footer>
    </div>
  )
}

export default RootLayout
