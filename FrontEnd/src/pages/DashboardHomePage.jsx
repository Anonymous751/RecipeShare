import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const visitsData = (theme) => ({
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Visits",
      data: [65, 59, 80, 81, 56],
      backgroundColor:
        theme === "light" ? "rgba(245, 171, 0, 0.7)" : "rgba(245, 171, 0, 0.9)",
      borderRadius: 4,
    },
  ],
});

const salesData = (theme) => ({
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Sales ($K)",
      data: [12, 19, 13, 22, 18, 30],
      borderColor: theme === "light" ? "#f5ab00" : "#f5ab00",
      backgroundColor: "transparent",
      tension: 0.3,
      fill: false,
      pointBackgroundColor: theme === "light" ? "#f5ab00" : "#f5ab00",
      pointRadius: 5,
    },
  ],
});

const userDistributionData = (theme) => ({
  labels: ["Free Users", "Premium Users", "Guests"],
  datasets: [
    {
      label: "Users",
      data: [55, 30, 15],
      backgroundColor:
        theme === "light"
          ? ["#f5ab00cc", "#005f73cc", "#0a9396cc"]
          : ["#f5ab00ff", "#94d2bdff", "#ee9b00ff"],
      borderColor:
        theme === "light"
          ? ["#f5ab00", "#005f73", "#0a9396"]
          : ["#f5ab00", "#94d2bd", "#ee9b00"],
      borderWidth: 2,
    },
  ],
});

const menuItems = [
  "User Profile",
  "CRUD operations",
  "Recipe Lists",
  "Settings",
];

const slugify = (text) => text.toLowerCase().replace(/\s+/g, "-");

const DashboardHomePage = () => {
  const { theme } = useOutletContext();

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Welcome to your dashboard</h1>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
        style={{ minHeight: "320px" }}
      >
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow transition-colors duration-500">
          <h2 className="text-xl font-semibold mb-4 text-[color:var(--color-text-primary)]">
            Visits Over Time
          </h2>
          <div style={{ height: 240 }}>
            <Bar
              data={visitsData(theme)}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow transition-colors duration-500">
          <h2 className="text-xl font-semibold mb-4 text-[color:var(--color-text-primary)]">
            Sales Trend
          </h2>
          <div style={{ height: 240 }}>
            <Line
              data={salesData(theme)}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow transition-colors duration-500 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-[color:var(--color-text-primary)]">
            User Distribution
          </h2>
          <div style={{ height: 280, maxWidth: 480, margin: "0 auto" }}>
            <Pie
              data={userDistributionData(theme)}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      </motion.div>

      {menuItems.map((sec) => (
        <motion.section
          key={sec}
          id={slugify(sec)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded shadow mb-6 transition-colors duration-500"
        >
          <h2 className="text-xl font-semibold mb-2 text-[color:var(--color-text-primary)]">
            {sec}
          </h2>
          <p className="text-[color:var(--color-text-secondary)]">
            Content for {sec} goes here. This section can be extended to show
            user info, CRUD forms, recipes, or settings controls.
          </p>
        </motion.section>
      ))}
    </>
  );
};

export default DashboardHomePage;
