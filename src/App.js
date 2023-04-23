import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//pages
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Error from "./pages/Error";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Dashboard></Dashboard>}></Route>
        <Route path="landing" element={<Landing></Landing>}></Route>
        <Route path="register" element={<Register></Register>}></Route>
        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
      <ToastContainer position='top-center'></ToastContainer>
    </Router>
  );
}

export default App;
