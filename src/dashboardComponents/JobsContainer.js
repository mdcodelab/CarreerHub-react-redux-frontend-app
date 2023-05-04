import React from 'react';
import styled from "styled-components";
import Loader from './Loader';
import { useSelector, useDispatch } from 'react-redux';
import Job from './Job';

function JobsContainer() {
    const {isLoading, jobs}=useSelector((store)=> store.allJobs);
    const dispatch=useDispatch();

    if(isLoading){
        return <Loader></Loader>
    }

    if(jobs.length < 1) {
        return <Wrapper><h2>No jobs to display...</h2></Wrapper>
    }


  return (
    <Wrapper>
      <h5>Jobs info</h5>
      <div className="jobs">
        {jobs.map((job) => {
            return <Job key={job._id}></Job>
        })}
      </div>

    </Wrapper>
  );
}

const Wrapper = styled.div `

`;


export default JobsContainer;
