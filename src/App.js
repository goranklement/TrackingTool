import "./App.css";
import "./components/Navbar";

import "primereact/resources/themes/lara-light-indigo/theme.css";

import "primereact/resources/primereact.min.css";
import React from "react";
import { useState } from "react";
import { UserContext } from "./components/UserContext";

import AppNavigation from "./components/AppNavigation.jsx";

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AppNavigation />
    </UserContext.Provider>
  );
}

export default App;
