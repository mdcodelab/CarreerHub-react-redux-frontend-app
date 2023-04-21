import React from 'react';
import styled from "styled-components";

function Logobis() {
  return (
    <Wrapper>
        <h1 className="title" style={{color: "white", background: "var(--primary-500"}}>CH</h1>
        <h2>CarreerHub</h2>
      
    </Wrapper>
  );
}

const Wrapper = styled.main `
margin-top: 2rem;
display: flex;
align-items: center;
h1.title {
    color: white;
    background: var(--primary-500);
    border-radius: 3rem;
    width: 5rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
}
h2 {
color: var(--primary-500);
margin-left: 1rem;
font-size: 1.7rem;
font-weight: 700;
letter-spacing: 0.2rem;


}


`

export default Logobis;
