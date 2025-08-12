import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import RecipeDetailPage from "../pages/RecipeDetailPage";
import NotFoundPage from "../pages/NotFoundPage"
import RecipeListPage from "../pages/RecipeListPage"
import Dashboard from "../pages/Dashboard";


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
      { path: "*", element: <NotFoundPage /> },
      {path: "dashboard", element: <Dashboard />}
    ],
  },
]);
