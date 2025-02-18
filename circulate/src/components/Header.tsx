import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const handleMouseEnter = (link: string) => {
    setHoveredLink(link);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  const linkStyle = (isActive: boolean, link: string) => ({
    display: "inline",
    textAlign: "center",
    color: "white",
    fontSize: hoveredLink === link || isActive ? 26 : 22,
    fontFamily: "'SF Pro Display', sans-serif",
    fontWeight: isActive ? "bold" : "500",
    lineHeight: "30px",
    letterSpacing: 1.62,
    textDecoration: "none",
    margin: "0 20px",
    transition: "font-size 0.3s ease",
    cursor: "pointer",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100px",
        background: "#2B303A",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        display: "flex",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        fontFamily: "'SF Pro Display', sans-serif",
      }}
    >
      {/* Left side logo */}
      <div style={{ display: "flex", alignItems: "center", width: "200px" }}>
        <img src="/logo.png" alt="Logo" style={{ height: "100px" }} />
      </div>

      {/* Center navigation links */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "space-between",
          width: "700px",
          color: "white",
        }}
      >
        <NavLink
          to="/Products"
          style={({ isActive }) => linkStyle(isActive, "Products")}
          onMouseEnter={() => handleMouseEnter("Products")}
          onMouseLeave={handleMouseLeave}
        >
          Products
        </NavLink>

        <NavLink
          to="/Home"
          style={({ isActive }) => linkStyle(isActive, "Home")}
          onMouseEnter={() => handleMouseEnter("Home")}
          onMouseLeave={handleMouseLeave}
        >
          Home
        </NavLink>

        <NavLink
          to="/AboutUs"
          style={({ isActive }) => linkStyle(isActive, "AboutUs")}
          onMouseEnter={() => handleMouseEnter("AboutUs")}
          onMouseLeave={handleMouseLeave}
        >
          About Us
        </NavLink>
      </div>
    </div>
  );
};

export default Header;