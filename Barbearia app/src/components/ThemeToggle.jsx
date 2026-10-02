const ThemeToggle = ({ darkMode, setDarkMode }) => (
    <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
    </button>
);

export default ThemeToggle;
