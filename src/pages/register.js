import React from 'react';
import Logo from "../components/Logo"
import styled from "styled-components";
import FormRow from "../components/FormRow";


const initialState = {
name: "",
email: "",
password: "",
isMember: true
}



function Register() {
    const [values, setValues]=React.useState(initialState);

    function onChange (e) {
        console.log(e.target.value);
        setValues(e.target.value);
    }

    function onSubmit (e) {
        e.preventDefault();
        console.log("submitted");
    }


  return (
    <Wrapper className="full-page">
        <form className='form' onSubmit={onSubmit}>
        <Logo style={{background: "red"}}></Logo>
        <h3>Login</h3>

        {/* name field */}
        <FormRow type="text" name="name" value={values.name} onChange={onChange}/>

         {/* email field */}
         <FormRow type="email" name="email" value = {values.email} onChange={onChange}/>

        {/* password field */}
        <FormRow type="password" name="password" value={values.password} onChange={onChange}/>

        <button type='submit' className='btn btn-block'>Submit</button>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: grid;
  align-items: center; 

  .logo {
    margin-top: -5rem;
    border: 2px solid red;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }`

export default Register;

