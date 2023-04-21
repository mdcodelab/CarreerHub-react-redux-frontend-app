import React from 'react';
import main from ".././assets/images/main.jpg";
import styled from "styled-components";
import Logo from "../components/Logo";
import {Link} from "react-router-dom"


function Landing() {
  return (
    <Wrapper>
      <nav>
            <Logo className="logo"></Logo>
      </nav>
      <div className="container page">
      {/* info*/}
        <div className="info">
        <h1>job <span>tracking</span> app</h1>
        <p>Welcome to CareerHub, the go-to platform for job seekers and employers! Browse through our job 
        postings, create your profile and apply for your 
        dream job today. Employers, post your job openings and find your next star employee.</p>
        <button className="btn btn-hero landing"><Link to="/register">Login/Register</Link></button>
        </div>
        <img src={main} alt="job hunt" className="img main-img"></img>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main `
nav .logo {
    
}
nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
    padding-top: 2rem;
} 
article {
    width: max-content;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
} article img {
    margin-right: 0.5rem;
    width: 3rem;
    height: 3rem;
} article span {
    font-size: 1.4rem;
    color: var(--primary-500);
    letter-spacing: 0.2rem;
    font-weight: 900;
}
.page {
    min-height: calc(100vh-ar(--nav-height));
    display: grid;
    align-items: center;
    margin-top: 2rem;
}
.main-img {
    width: 30rem;
    height: 30rem;
    object-fit: cover;
    display: none;
}
h1 {
    font-weight: 700;
    span {
        color: var(--primary-500);
    }
}
p {
    color: var(--grey-600);
}

@media (min-width: 992px) {
    .page {
        grid-template-columns: repeat(2, 1fr);
        column-gap: 3rem;
    }
    .main-img {
        display: block;
    }
}
@media (max-width: 400px) {
    .logo {
        width: 15rem;
        height: 8rem;
    }
    h1 {
        font-size: 2rem;
    }
}
`


export default Landing;
