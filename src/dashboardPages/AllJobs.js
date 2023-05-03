import React from 'react';
import JobsContainer from '../dashboardComponents/JobsContainer';
import SearchContainer from '../dashboardComponents/SearchContainer';

function AllJobs() {
  return (
    <h1>
      All Jobs
      <SearchContainer></SearchContainer>
      <JobsContainer></JobsContainer>
    </h1>
  );
}

export default AllJobs;
