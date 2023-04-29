import React from 'react';
import styled from "styled-components";
import {FaAlignLeft, FaUserCircle, FaCaretDown} from "react-icons/fa";
import Logo from "../components/Logo";
import {useSelector, useDispatch} from "react-redux";

function Navbar() {
  const {user}=useSelector(store => store.user);
  const dispatch = useDispatch();
  return (
    <Wrapper>
    <div className='nav-center'>
      <button type='button' className='toggle-btn' onClick={()=> console.log("toggle")}>
        <FaAlignLeft /></button>
      <div>
        <WrapperLogo> <Logo className="logo"/></WrapperLogo>
        <h3 className='logo-text'>dashboard</h3>
      </div>
      <div className='btn-container'>
        <button type='button'className='btn'onClick={() => console.log("hello")}>
          <FaUserCircle />
          {user?.name}
          <FaCaretDown />
        </button>
        <div className="dropdown show-dropdown">
          <button type='button' className='dropdown-btn' 
          onClick={() => console.log("log out")}>
            Logout
          </button>
        </div>
      </div>
    </div>
  </Wrapper>
    )
  
}

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    height: 3rem;
    border: 2px solid red;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  background: var(--white);
  .btn-container {
    position: relative;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: var(--shadow-2);
  }

  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background: var(--primary-100);
    box-shadow: var(--shadow-2);
    padding: 0.5rem;
    text-align: center;
    visibility: hidden;
    border-radius: var(--borderRadius);
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: var(--primary-500);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
  }
  .logo-text {
    display: none;
    margin: 0;
  }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;

    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }`

  const WrapperLogo = styled.div `
  margin-top: -1.5rem;
  margin-bottom: -0.5rem;
  height: max-content;
  `

export default Navbar;
