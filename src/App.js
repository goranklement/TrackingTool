import "./App.css";
import "./components/Navbar";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import { AuthProvider } from "./components/AuthProvider";

import "primereact/resources/primereact.min.css";
import React from "react";
import { useState } from "react";

import AppNavigation from "./components/AppNavigation.jsx";

function App() {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}

export default App;
