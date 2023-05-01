import React from 'react';
import styled from "styled-components";
import Logo from ".././components/Logo";
import { useSelector, useDispatch} from 'react-redux';
import { toggleSidebar } from '../features/user/userSlice';
import { NavLink } from 'react-router-dom';
import links from '../utils/links';

function BigSidebar() {
  const {isSidebarOpen}=useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Wrapper>
        <div className={isSidebarOpen ? "sidebar-container" : "sidebar-container show-sidebar"}>
            <div className="content">
              <header>
                <WrapperLogo><Logo></Logo></WrapperLogo>
              </header>
            </div>
            <div className="nav-links">
                  {links.map((link) => {
                    const {id, text, path, icon}=link
                      return <NavLink to={path} key={id} 
                      className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={()=> dispatch(toggleSidebar())}>
                      <span className="icon">
                      {icon}</span>{text}
                      </NavLink>
                  })}
                </div>
        </div>
    </Wrapper>
  );
}

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    background: red;
    .sidebar-container {
      background: var(--white);
      min-height: 100vh;
      height: 100%;
      width: 250px;
      margin-left: -250px;
      transition: var(--transition);
    }
    .content {
      position: sticky;
      top: 0;
    }
    .show-sidebar {
      margin-left: 0;
    }
    header {
      height: 6rem;
      display: flex;
      align-items: center;
      justify-content: center;  
      padding-left: 1.5rem;
     }
    .nav-links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
    }
    .nav-link {
      display: flex;
      align-items: center;
      color: var(--grey-500);
      padding: 1rem 0;
      padding-left: 2.5rem;
      text-transform: capitalize;
      font-size: 1.3rem;
      transition: var(--transition);
    }
    .nav-link:hover {
      background: var(--grey-50);
      padding-left: 3rem;
      color: var(--grey-900);
    }
    .nav-link:hover .icon {
      color: var(--primary-500);
    }
    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
      transition: var(--transition);
    }
    .active {
      color: var(--grey-900);
    }
    .active .icon {
      color: var(--primary-500);
    }
  }
`
const WrapperLogo = styled.div`
width: 90%
h1 {
  font-size: 1.8rem;
}
h2 {
  font-size: 1.5rem;
  margin-left: 0.5rem;
}
`;


export default BigSidebar;
