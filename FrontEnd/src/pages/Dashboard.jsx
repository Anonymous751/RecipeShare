import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiLogOut, FiMenu } from "react-icons/fi";

const sidebarVariants = {
  open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  closed: {
    x: "-100%",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

const menuItems = [
  "User Profile",
  "CRUD operations",
  "Recipe Lists",
  "Settings",
];

const slugify = (text) => text.toLowerCase().replace(/\s+/g, "-");

const Dashboard = () => {
  const [theme, setTheme] = useState("light");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true); // optional UX improvement
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.className = `theme-${theme}`;
  }, [theme]);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/user-profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setLoading(false); // valid token
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    checkToken();
  }, [navigate]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  
  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return null; // or a loader if you prefer

  return (
    <div
      className={`flex h-screen transition-colors duration-500 bg-[color:var(--color-background)] text-[color:var(--color-text-primary)]`}
    >
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            className="fixed top-0 left-0 h-full w-64 bg-[color:var(--color-primary)] p-6 z-20 shadow-lg flex flex-col"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <h2 className="text-2xl font-bold text-white mb-8">Dashboard</h2>
            <nav className="space-y-4 flex-grow">
              {menuItems.map((sec) =>
                sec === "User Profile" ? (
                  <button
                    key={sec}
                    onClick={() => navigate("/dashboard/user-profile")}
                    className="block text-white hover:underline text-left w-full"
                  >
                    {sec}
                  </button>
                ) : (
                  <a
                    key={sec}
                    href={`#${slugify(sec)}`}
                    className="block text-white hover:underline"
                  >
                    {sec}
                  </a>
                )
              )}
            </nav>
            <div className="mt-auto space-y-4 pt-10">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-2 bg-white text-[color:var(--color-primary)] rounded transition-colors duration-300 hover:bg-yellow-400"
                aria-label="Toggle dark/light mode"
              >
                {theme === "light" ? <FiMoon /> : <FiSun />}
                {theme === "light" ? "Dark" : "Light"} Mode
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded transition-colors duration-300 hover:bg-red-600"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div
        className={`flex-1 p-6 ml-0 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : ""
        } overflow-y-auto`}
      >
        <button
          onClick={toggleSidebar}
          className="mb-4 p-2 bg-[color:var(--color-accent)] text-white rounded shadow hover:bg-[color:var(--color-accent-hover)] transition-colors duration-300"
          aria-label="Toggle sidebar"
        >
          <FiMenu />
        </button>

        {/* Nested Routes Render Here */}
        <Outlet context={{ theme }} />
      </div>
    </div>
  );
};

export default Dashboard;
