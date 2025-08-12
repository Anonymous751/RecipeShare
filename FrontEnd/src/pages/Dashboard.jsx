import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiLogOut, FiMenu } from "react-icons/fi";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const sampleData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Visits",
      data: [65, 59, 80, 81, 56],
      backgroundColor: "rgba(245, 171, 0, 0.6)",
    },
  ],
};

const sidebarVariants = {
  open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  closed: {
    x: "-100%",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

const DashboardPage = () => {
  const [theme, setTheme] = useState("light");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Apply theme class
  useEffect(() => {
    document.documentElement.className = `theme-${theme}`;
  }, [theme]);

  // Fetch dashboard message
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    fetch("http://localhost:5000/api/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setMessage(data.message))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-[color:var(--color-background)] text-[color:var(--color-text-primary)] transition-colors duration-300">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            className="fixed top-0 left-0 h-full w-64 bg-[color:var(--color-primary)] p-6 z-20 shadow-lg"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <h2 className="text-2xl font-bold text-white mb-8">Dashboard</h2>
            <nav className="space-y-4">
              {["Overview", "Analytics", "Reports", "Settings"].map((sec) => (
                <a
                  key={sec}
                  href={`#${sec}`}
                  className="block text-white hover:underline"
                >
                  {sec}
                </a>
              ))}
            </nav>
            <div className="mt-auto space-y-4 pt-10">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-2 bg-white text-[color:var(--color-primary)] rounded"
              >
                {theme === "light" ? <FiMoon /> : <FiSun />}{" "}
                {theme === "light" ? "Dark" : "Light"} Mode
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        className={`flex-1 p-6 ml-0 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : ""
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="mb-4 p-2 bg-[color:var(--color-accent)] text-white rounded"
        >
          <FiMenu />
        </button>
        <h1 className="text-3xl font-bold mb-6">{message || "Welcome"}</h1>

        {/* Animated Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white p-6 rounded shadow mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Visits Over Time</h2>
          <Bar data={sampleData} />
        </motion.div>

        {/* Dummy Sections */}
        {["Overview", "Analytics", "Reports", "Settings"].map((sec) => (
          <motion.section
            key={sec}
            id={sec}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded shadow mb-6"
          >
            <h2 className="text-xl font-semibold mb-2">{sec}</h2>
            <p className="text-[color:var(--color-text-muted)]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>
          </motion.section>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
