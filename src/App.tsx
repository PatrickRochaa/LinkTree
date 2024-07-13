import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Admin } from "./pages/admin";
import { Links } from "./pages/home";
import { Login } from "./pages/login";
import { Private } from "./routes/Private";
import { ErrorPage } from "./pages/error";
import { Name } from "./pages/name";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Links",
    element: <Links />,
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
    path: "/name",
    element: (
      <Private>
        <Name />
      </Private>
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
export { router };
