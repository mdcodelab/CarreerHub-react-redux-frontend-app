import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";
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
//protected route
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>}>
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
        </Route>

        <Route path="landing" element={<Landing></Landing>}></Route>
        <Route path="register" element={<Register></Register>}></Route>
        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
        <StyledToastContainer position="top-center" />
    </Router>
  );
}

const StyledToastContainer = styled(ToastContainer)`
.Toastify__toast-body {
    background-color: #fff;
    color: #333;
    font-size: 16px;
    text-align: center;
  }

`;


export default App;





