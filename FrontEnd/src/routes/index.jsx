import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import RecipeDetailPage from "../pages/RecipeDetailPage";
import NotFoundPage from "../pages/NotFoundPage";
import RecipeListPage from "../pages/RecipeListPage";
import Dashboard from "../pages/Dashboard";
import DashboardHomePage from "../pages/DashboardHomePage";
import UserProfilePage from "../pages/UserProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "recipes", element: <RecipeListPage /> },
      { path: "recipe/:id", element: <RecipeDetailPage /> },
      {
        path: "dashboard",
        element: <Dashboard />, // Sidebar + auth + layout
        children: [
          { index: true, element: <DashboardHomePage /> }, // Dashboard main content
          { path: "user-profile", element: <UserProfilePage /> },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
