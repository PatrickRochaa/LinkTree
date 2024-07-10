import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Admin } from "./pages/admin";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Private } from "./routes/Private";
import { ErrorPage } from "./pages/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <Private>
        <Admin />
      </Private>
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
export { router };
