import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Layout from "./components/layout/Layout.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from "./page/home/Home.jsx";
import AboutUs from "./page/about-us/AboutUs.jsx";
import SportClub from "./page/sport-club/SportClub.jsx";
import Events from "./page/events/Events.jsx";
import News from "./page/news/News.jsx";
import History from "./page/history/History.jsx";
import Login from "./page/auth/login/Login.jsx";
import Register from "./page/auth/register/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      // {
      //   path: "/home",
      //   element: <Home />,
      // },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/sport-club",
        element: <SportClub />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/history",
        element: <History />,
      },
      // {
      //   path: "/product-detail",
      //   element: <ProductDetail />,
      // },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
