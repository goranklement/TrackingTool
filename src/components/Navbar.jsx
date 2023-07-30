import React from "react";
import Logo from "../assets/logo.png";
import "../main.css";
import NavigationItem from "./NavigationItem";
import { auth } from "./FirebaseConfig";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import firebase from "firebase/app";

const Navbar = () => {
  const { setUser } = useContext(UserContext);

  const logoff = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User logged out.");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
    setUser(null);
  };

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
          text="Logoff"
          color="#181846"
          hasBorder={false}
          onClick={logoff}
        />
      </div>
    </nav>
  );
};

export default Navbar;
