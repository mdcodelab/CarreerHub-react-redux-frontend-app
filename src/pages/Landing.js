import React from 'react';
import logo from ".././assets/images/logo.png";
import main from ".././assets/images/main.jpg";
import styled from "styled-components";
import Logo from "../components/Logo";


function Landing() {
  return (
    <Wrapper>
      <nav>
            <article>
            <Logo></Logo>
            <span className="logo">CareerHub</span>
            </article>
      </nav>
      <div className="container page">
      {/* info*/}
        <div className="info">
        <h1>job <span>tracking</span> app</h1>
        <p>Welcome to CareerHub, the go-to platform for job seekers and employers! Browse through our job 
        postings, create your profile and apply for your 
        dream job today. Employers, post your job openings and find your next star employee.</p>
        <button className="btn btn-hero">Login/Register</button>
        </div>
        <img src={main} alt="job hunt" className="img main-img"></img>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main `
nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
} article {
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

`;

export default Landing;
