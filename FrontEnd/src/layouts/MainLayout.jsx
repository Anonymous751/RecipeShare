import { Outlet } from "react-router-dom";
import NavbarPage from "../pages/NavbarPage";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("theme-dark");
      root.classList.remove("theme-light");
    } else {
      root.classList.add("theme-light");
      root.classList.remove("theme-dark");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <>
      <NavbarPage darkMode={darkMode} toggleTheme={toggleTheme} />
      <main className="container max-w-full px-0">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
