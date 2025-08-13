const DarkModeSwitch = ({ darkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
        darkMode ? "bg-amber-400" : "bg-zinc-400"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          darkMode ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default DarkModeSwitch;
