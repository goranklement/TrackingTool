import React from "react";
import "../main.css";
import { NavLink } from "react-router-dom";

import "primeicons/primeicons.css";

const NavigationItem = ({ icon, text, color, hasBorder }) => {
  const navLinkStyles = ({ isActive }) => {
    if (hasBorder) {
      return {
        color: isActive ? "#F9F9FD" : "#C4C5D7",
        borderBottom: isActive ? "5px solid #FF5722" : `5px solid ${color}`,
        borderWidth: "100%",
      };
    } else {
      return {};
    }
  };

  return (
    <NavLink to={`/${text}`} style={navLinkStyles} className="nav-item">
      <div className="group">
        <i className={`pi pi-${icon} `} style={{ fontSize: "18px" }}></i>
        <h2 className="navitem-heading">{text}</h2>
      </div>
    </NavLink>
  );
};

export default NavigationItem;
