import React from "react";
import Logo from "../assets/logo.png";
import "../main.css";
import NavigationItem from "./NavigationItem";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={Logo} alt="Devot Logo" />
        <h2 className="heading-navbar">Tracking tool</h2>
      </div>
      <div className="items-container">
        <NavigationItem
          icon="clock"
          text="Trackers"
          color="#c4c5d7"
          hasBorder={true}
        />
        <NavigationItem
          icon="history"
          text="History"
          color="#C4C5D7"
          hasBorder={true}
        />
        <NavigationItem
          icon="power-off"
          text="Login"
          color="#181846"
          hasBorder={false}
        />
      </div>
    </nav>
  );
};

export default Navbar;
