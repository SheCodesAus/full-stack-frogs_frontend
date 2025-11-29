import React from "react";
import './styles/global.css'
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import QuotePage from "./pages/QuotePage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import CheckInPage from "./pages/CheckInPage.jsx";

const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/checkin", element: <CheckInPage /> },
    { path: "/quote", element: <QuotePage /> },
    { path: "/dashboard", element: <DashboardPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
