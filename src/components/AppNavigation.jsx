import Navbar from "./Navbar";
import { BrowserRouter, Router } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import History from "./History";
import Trackers from "./Trackers";
import Logout from "./Logout";

const AppNavigation = () => {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/Trackers" element={<Trackers />} />
            <Route path="/History" element={<History />} />
            <Route path="/Logout" element={<Logout />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
};
export default AppNavigation;
