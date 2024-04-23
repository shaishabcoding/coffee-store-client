import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import NewCoffee from "./components/NewCoffee";
import Home from "./components/Home";
import UpdateCoffee from "./components/UpdateCoffee";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    loader: () => fetch("http://localhost:5000/coffees"),
  },
  {
    path: "/coffee/new",
    element: <NewCoffee></NewCoffee>,
  },
  {
    path: "/coffee/update/:id",
    element: <UpdateCoffee></UpdateCoffee>,
    loader: ({ params }) =>
      fetch(`http://localhost:5000/coffee/details/${params.id}`),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
