import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Donate from "./Donate";
import LandingPage from "./LandingPage";
import Footer from "./Footer";
import Dashboard from "./Dashboard";
import LoginPage from "./Login";
import SignupPage from "./SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

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
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/Donate" element={
              <ProtectedRoute>
                <Donate />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
