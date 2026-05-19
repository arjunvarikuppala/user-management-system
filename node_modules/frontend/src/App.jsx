import { createBrowserRouter, RouterProvider } from "react-router"
import AddUser from "./components/AddUser"
import Home from "./components/Home"
import RootLayout from "./components/RootLayout"
import RouteError from "./components/RouteError"
import User from "./components/User"
import UserList from "./components/UserList"
import { userLoader, usersLoader } from "./loaders/userLoaders"

const routerObj = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "userlist",
        element: <UserList />,
        loader: usersLoader
      },
      {
        path: "adduser",
        element: <AddUser />
      },
      {
        path: "user/:id",
        element: <User />,
        loader: userLoader
      }
    ]
  }
])

function App() {
  return <RouterProvider router={routerObj} />
}

export default App
