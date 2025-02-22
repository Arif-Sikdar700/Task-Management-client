import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./../App";
import Home from "../page/home";
import SingIn from "../page/SingIn";
import SingUp from "../page/SingUp";
import PrivateRoute from "../private/PrivateRoute";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/singup",
    element: <SingUp />,
  },
  {
    path: "/singin",
    element: <SingIn />,
  },
]);
export default Router;
