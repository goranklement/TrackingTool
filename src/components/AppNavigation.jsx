import Navbar from "./Navbar";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import History from "./History";
import Trackers from "./Trackers";
import Login from "./Login";
import Register from "./Register";
import NavbarLogin from "./NavbarLogin";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";

const AppNavigation = () => {
  const { isAuthenticated } = useContext(AuthContext);
  if (isAuthenticated) {
    return (
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Trackers />} />
              <Route path="/trackers" element={<Trackers />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </BrowserRouter>
        </header>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <NavbarLogin />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </BrowserRouter>
        </header>
      </div>
    );
  }
};

export default AppNavigation;
