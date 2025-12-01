import { useState } from "react";
import  React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider.jsx";
import './styles/global.css'


import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CheckInPage from "./pages/CheckInPage.jsx";
import QuotePage from "./pages/QuotePage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/checkin", element: <CheckInPage /> },
    { path: "/quote", element: <QuotePage /> },
    { path: "/dashboard", element: <DashboardPage />},
]);

// function AppRoot() {
//   const [showIntro, setShowIntro] = useState(true);

//   return showIntro ? (
//     <LandingAnimation onFinish={() => setShowIntro(false)} />
//   ) : (
//     <RouterProvider router={router} />
//   );
// }



function AppRoot() {
  return (
    <RouterProvider router={router} />
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <AuthProvider>
        <AppRoot />
      </AuthProvider>
  </React.StrictMode>
);