import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";

const UserProfilePage = ({ theme, toggleTheme }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/api/user-profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-[color:var(--color-text-primary)]">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-[color:var(--color-background)] text-[color:var(--color-text-primary)] transition-colors duration-500">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">User Profile</h1>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-4 py-2 bg-[color:var(--color-primary)] text-[color:var(--color-background)] rounded shadow hover:brightness-90 transition"
          aria-label="Toggle dark/light mode"
        >
          {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </header>

      <main className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-500">
        <div className="flex flex-col items-center">
          <img
            src={
              user.avatarUrl ||
              `https://i.pravatar.cc/150?u=${encodeURIComponent(user.email)}`
            }
            alt={`${user.username} avatar`}
            className="w-32 h-32 rounded-full mb-4 border-4 border-[color:var(--color-primary)]"
          />
          <h2 className="text-2xl font-semibold mb-1">{user.username}</h2>
          <p className="text-[color:var(--color-text-muted)] mb-4 text-center">
            {user.bio || "No bio provided."}
          </p>
          <p className="text-[color:var(--color-text-primary)] font-mono break-all">
            {user.email}
          </p>
        </div>
      </main>
    </div>
  );
};

export default UserProfilePage;
