import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../dashboardComponents/Navbar';
import BigSidebar from '../dashboardComponents/BigSidebar';
import SmallSidebar from '../dashboardComponents/SmallSidebar';
import styled from 'styled-components';


function SharedLayout() {
  return (
    <Wrapper>
        <main className="dashboard">
            <SmallSidebar></SmallSidebar>
            <BigSidebar></BigSidebar>
            <div>
              <Navbar></Navbar>
              <div className="dashboard-page">
                <Outlet></Outlet>
              </div>
            </div>
        </main>
    </Wrapper>
  );
}

const Wrapper = styled.main `

`;

export default SharedLayout;
