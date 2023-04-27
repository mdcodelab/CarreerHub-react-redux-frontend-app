import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//dashboard
import AddJob from './dashboardPages/AddJob';
import AllJobs from "./dashboardPages/AllJobs";
import Profile from "./dashboardPages/Profile";
import SharedLayout from "./dashboardPages/SharedLayout";
import Stats from "./dashboardPages/Stats";
//pages
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Error from "./pages/Error";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<SharedLayout></SharedLayout>}>
            <Route index element={<Stats></Stats>}></Route>
            <Route path="all-jobs" element={<AllJobs></AllJobs>}></Route>
            <Route path="add-job" element={<AddJob></AddJob>}></Route>
            <Route path="profile" element={<Profile></Profile>}></Route> 
      </Route>
        <Route path="landing" element={<Landing></Landing>}></Route>
        <Route path="register" element={<Register></Register>}></Route>
        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
      <ToastContainer position='top-center'></ToastContainer>
    </Router>
  );
}

export default App;
