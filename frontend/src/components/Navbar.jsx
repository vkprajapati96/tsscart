import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          QuickCart
        </Link>

        <div style={styles.links}>
          <Link to="/" style={styles.link}>
            Home
          </Link>

          {user ? (
            <>
              <Link to="/cart" style={styles.link}>
                Cart
              </Link>
              <Link to="/orders" style={styles.link}>
                Orders
              </Link>

              {user.role === "admin" && (
                <Link to="/admin/dashboard" style={styles.link}>
                  Admin
                </Link>
              )}

              <span style={styles.username}>Hi, {user.name}</span>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
            
          ) : (
            <>
              <Link to="/login" style={styles.link}>
                Login
              </Link>
              <Link to="/register" style={styles.link}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: "#2563eb",
    color: "white",
    padding: "1rem 0",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "white",
    textDecoration: "none",
  },
  links: { display: "flex", gap: "1.5rem", alignItems: "center" },
  link: { color: "white", textDecoration: "none", fontSize: "1rem" },
  username: { fontSize: "0.9rem", opacity: 0.9 },
  logoutBtn: {
    background: "rgba(255,255,255,0.2)",
    border: "none",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Navbar;
