import React from 'react';
import styled from "styled-components";
import Loader from './Loader';
import { useSelector, useDispatch } from 'react-redux';
import Job from "./Job";
import { getAllJobs } from '../features/allJobs/allJobsSlice';

function JobsContainer() {
    const {isLoading, jobs}=useSelector((store)=> store.allJobs);
    const dispatch=useDispatch();
    React.useEffect(()=> {
        dispatch(getAllJobs());
    }, [])

    if(isLoading){
        return <Loader></Loader>
    }

    if(jobs.length < 1) {
        return <Wrapper><h2>No jobs to display...</h2></Wrapper>
    }


  return (
    <Wrapper>
      <h5>{jobs.length} Jobs Found</h5>
      <div className="jobs">
        {jobs.map((job) => {
            return <Job key={job._id} {...job}></Job>
        })}
      </div>

    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`


export default JobsContainer;
