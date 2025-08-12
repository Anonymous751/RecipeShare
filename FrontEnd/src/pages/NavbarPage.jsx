
import { Link, NavLink } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import DarkModeSwitch from "../components/DarkModeSwitch";

const Navbar = ({ darkMode, toggleTheme }) => {
  return (
    <nav
      className="shadow-md sticky top-0 z-50"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-[color:var(--color-primary)] text-2xl font-extrabold"
        >
          <FaUtensils className="mr-2" />
          RecipeShare
        </Link>

        {/* Navigation Links */}
        <ul
          className="flex space-x-6 font-semibold"
          style={{ color: "var(--color-text-primary)" }}
        >
          {["/", "/recipes", "/about", "/contact"].map((path, idx) => {
            const label =
              path === "/"
                ? "Home"
                : path.substring(1).charAt(0).toUpperCase() + path.substring(2);
            return (
              <li key={idx}>
                <NavLink
                  to={path}
                  end={path === "/"}
                  className={({ isActive }) =>
                    isActive ? "border-b-2 pb-1" : "hover:underline"
                  }
                  style={({ isActive }) => ({
                    color: isActive
                      ? "var(--color-primary)"
                      : "var(--color-text-primary)",
                    borderColor: isActive ? "var(--color-primary)" : "transparent",
                    transition: "color 0.3s",
                  })}
                >
                  {label}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Actions + Dark Mode Toggle */}
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="font-semibold"
            style={{ color: "var(--color-secondary)" }}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="font-semibold px-4 py-2 rounded-md"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-text-primary)",
              transition: "background-color 0.3s",
            }}
          >
            Register
          </Link>

          <DarkModeSwitch darkMode={darkMode} toggleTheme={toggleTheme} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
