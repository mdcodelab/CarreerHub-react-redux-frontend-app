import React from 'react';
import Logo from "../components/Logo"
import styled from "styled-components";
import {useSelector} from "react-redux";


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
        <div className='form-row'>
          <label htmlFor='name' className="form-label">Name</label>

          <input type='text'name='name' value={values.name} className='form-input' onChange={onChange}/>
        </div>

         {/* email field */}
         <div className='form-row'>
          <label htmlFor='email' className='form-label'>Email</label>

          <input type='email'name='email' className='form-input'/>
        </div>

        {/* password field */}
        <div className='form-row'>
          <label htmlFor='password' className='form-label'>Password</label>

          <input type='password' name='password' className='form-input'/>
        </div>

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

