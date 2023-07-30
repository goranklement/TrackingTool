import Navbar from "./Navbar";
import { BrowserRouter, Router } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import History from "./History";
import Trackers from "./Trackers";
import Logout from "./Logout";
import Login from "./Login";
import Register from "./Register";
import NavbarLogin from "./NavbarLogin";

import { useContext } from "react";
import { UserContext } from "./UserContext";

const AppNavigation = () => {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <div className="App">
      <header className="App-header">
        {user !== null ? (
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Trackers />} />
              <Route path="/Trackers" element={<Trackers />} />
              <Route path="/History" element={<History />} />
              <Route path="/Logout" element={<Logout />} />
            </Routes>
          </BrowserRouter>
        ) : (
          <BrowserRouter>
            <NavbarLogin />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
            </Routes>
          </BrowserRouter>
        )}
      </header>
    </div>
  );
};

export default AppNavigation;
