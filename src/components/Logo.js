import React from 'react';
import logo from ".././assets/images/logo.png";
import styled from "styled-components";


function Logo() {
  return (
    <Wrapper>
        <img src={logo} alt="CareerHub " className="logo"></img>
    </Wrapper>
    )
}

const Wrapper = styled.main `
img {
    margin-right: 0.5rem;
    width: 3rem;
    height: 3rem;
}
`;

export default Logo;
