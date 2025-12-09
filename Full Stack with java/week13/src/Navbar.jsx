import { NavLink } from "react-router-dom";

const linkStyle = {
  marginRight: 12,
  padding: "8px 12px",
  borderRadius: 6,
  textDecoration: "none",
};

export default function Navbar() {
  return (
    <nav style={{ background: "#0b79ff", color: "#fff", padding: 12 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center" }}>
        <h3 style={{ margin: 0, marginRight: 18 }}>MiniBlog</h3>

        <NavLink
          to="/"
          style={({ isActive }) => ({
            ...linkStyle,
            background: isActive ? "#fff" : "transparent",
            color: isActive ? "#0b79ff" : "#fff",
          })}
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          style={({ isActive }) => ({
            ...linkStyle,
            background: isActive ? "#fff" : "transparent",
            color: isActive ? "#0b79ff" : "#fff",
          })}
        >
          About
        </NavLink>

        <NavLink
          to="/blog"
          style={({ isActive }) => ({
            ...linkStyle,
            background: isActive ? "#fff" : "transparent",
            color: isActive ? "#0b79ff" : "#fff",
          })}
        >
          Blog
        </NavLink>
      </div>
    </nav>
  );
}
