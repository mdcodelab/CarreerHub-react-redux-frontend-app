import React from 'react';
import Logo from "../components/Logo"
import styled from "styled-components";
import FormRow from "../components/FormRow";
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';
import { useLocation } from 'react-router-dom';


const initialState = {
name: "",
email: "",
password: "",
isMember: true
}



function Register() {
    const [values, setValues]=React.useState(initialState);

    const dispatch=useDispatch();
    const {user, isLoading}=useSelector(store => store.user)

    function onChange (e) {
        const name=e.target.name;
        const value=e.target.value;
        setValues({...values, [name]: value})
        console.log(values);
    }

    function onSubmit (e) {
        e.preventDefault();
        const {name, email, password, isMember}=values;
        if(!isMember) {
             if(!name || !email || !password) {
                toast.error("Please fill all fields!")
                return
             }
        } else {
              if (!email || !password) {
                toast.warning("Please fill all fields!");
                return
              }
            dispatch(loginUser({ email: email, password: password }));
            return
        }
        dispatch(registerUser({name: name, email: email, password: password}))
        return
    }

    const location=useLocation();

    React.useEffect(() => {
      if(user) {
        setTimeout(() => {
          window.location.href="/"
        }, 2000)
      }
    }, [user])


    function toggleMember () {
        setValues({...values, isMember: !values.isMember})
    }


  return (
    <Wrapper className="full-page">
        <form className='form' onSubmit={onSubmit}>
        <WrapperLogo><Logo></Logo></WrapperLogo>
        {values.isMember ? <h3>Login</h3> : <h3>Register</h3>}

        {/* name field */}
        {!values.isMember && (
            <FormRow type="text" name="name" value={values.name} onChange={onChange}/>
        )}
        

         {/* email field */}
         <FormRow type="email" name="email" value = {values.email} onChange={onChange}/>

        {/* password field */}
        <FormRow type="password" name="password" value={values.password} onChange={onChange}/>

        <button type='submit' className='btn btn-block' disabled={isLoading}>{isLoading ? "Loading..." : "Submit"}</button>
        <button type="button" className="btn btn-block btn-hipster" disabled={isLoading}
            onClick={()=> dispatch(loginUser({email: "testUser@test.com", password: "secret"}))}>
              {isLoading ? "Loading.." : "Demo App"}
            </button>
        <div className="toggle">
            {values.isMember ? <span>Not a member yet?</span> : <span>Already a member?</span> }
            <button type="button" className="member-btn" onClick={()=>toggleMember()}>
                {values.isMember ? "Register" : "Login"}
            </button>
           
        </div>
      </form>

    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: grid;
  align-items: center; 
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
    display: inline-block;
    margin-left: 0.3rem;
  }
  div.toggle {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  `

  const WrapperLogo = styled.div `
  margin: 0 auto;
  main {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  `;


export default Register;

