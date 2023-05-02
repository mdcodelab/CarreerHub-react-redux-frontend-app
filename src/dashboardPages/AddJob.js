import React from 'react';
import styled from "styled-components";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';
import FormRow from "../components/FormRow";
import FormRowSelect from '../components/FormRowSelect';

function AddJob() {
  const {isLoading, position, company, jobLocation, jobType, jobTypeOptions, status,
  statusOptions, isEditing, editJobId}=useSelector((state)=> state.job);
  const dispatch=useDispatch();
  

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(!position || !company || !jobLocation) {
      toast.warning("Please Fill Out All Fields!");
      return;
    }
  }
  
  return (
    <Wrapper>
    <form className='form'>
      <h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>
      <div className='form-center'>
        {/* position */}
        <FormRow type='text' name='position' value={position} onChange={onChange}/>
        {/* company */}
        <FormRow type='text' name='company' value={company} onChange={onChange}
        />
        {/* jobLocation */}
        <FormRow type='text' name='jobLocation' labelText='Job Location' value={jobLocation} onChange={onChange}/>
        {/* status */}
        <FormRowSelect name="status" value={status} labelText="Status" list={statusOptions} onChange={onChange} id="status"></FormRowSelect>
        {/* job type*/}
        <FormRowSelect name="jobType" value={jobType} labelText="Job Type" list={jobTypeOptions} onChange={onChange} id="jobType"></FormRowSelect>
        <div className='btn-container'>
          <button
            type='button'
            className='btn btn-block clear-btn'
            onClick={() => console.log("clear")}>
            Clear
          </button>
          <button
            type='submit'
            className='btn btn-block submit-btn'
            onClick={onSubmit}
            disabled={isLoading}>
            Submit
          </button>
        </div>
      </div>
    </form>
  </Wrapper>
  );
}

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`
export default AddJob;
