import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Donate from "./Donate"; // Import DonateOptions component

import LandingPage from "./LandingPage";
import Footer from "./Footer";
import Dashboard from "./Dashboard"; // Import Dashboard component

import "./App.css";
import LoginPage from "./Login";
import SignupPage from "./SignUp";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Signup" element={<SignupPage />} />
            <Route path="/Dashboard" element={<Dashboard />} /> {/* Add Dashboard route */}
            <Route path="/Donate" element={<Donate />} /> {/* Add DonateOptions route */}


            <Route path="/Donate" element={<Donate/>} /> {/* Add DonateOptions route */}



          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
