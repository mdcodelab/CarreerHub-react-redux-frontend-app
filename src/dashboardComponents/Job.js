import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';


function Job({_id, position, company, jobLocation, jobType, createdAt, status}) {
const dispatch = useDispatch();
const date=createdAt;

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
          <div className="info">
            <h5>{position}</h5>
            <p>{company}</p>
          </div>
      </header>
      <div className="center">
          <div className="content-center">
            <div className="more-info">
                <span className="icon"><FaLocationArrow></FaLocationArrow></span>
                <span className="text">{jobLocation}</span>
            </div>
            <div className="more-info">
                <span className="icon"><FaCalendarAlt></FaCalendarAlt></span>
                <span className="text">{createdAt}</span>
            </div>
            <div className="more-info">
                <span className="icon"><FaBriefcase></FaBriefcase></span>
                <span className="text">{jobType}</span>
            </div>
            <div className={`status ${status}`}>{status}</div>
          </div>
          <footer>
            <div className="actions">
                <Link to ="/add-job" className="btn edit-btn" onClick={()=> console.log("edit")}>Edit</Link>
                <button type="button" className="btn delete-btn" onClick={()=> console.log("delete")}>Delete</button>
            </div>
          </footer>
      </div>

    </Wrapper>
  );
}

const Wrapper = styled.article`
background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);
  padding-bottom: 1rem;
  padding-left: 1rem;

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.25rem;
      font-size: 2rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
      font-size: 1.5rem;
    }
  }
  .pending {
    background: #fcefc7;
    color: #e9b949;
  }
  .interview {
    background: #e0e8f9;
    color: #647acb;
  }
  .declined {
    color: #d66a6a;
    background: #ffeeee;
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
    margin-top: 0.5rem;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-2);
  }
  footer {
    margin-top: 1rem;
  }
  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
    font-size: 1rem;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
    font-size: 1rem;
  }
  &:hover .actions {
    visibility: visible;
  }
  .more-info {
    margin-top: 0.5rem;
  display: flex;
  align-items: center;
  }
  .icon {
    font-size: 1.2rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
  }
  .text {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    font-size: 1.2rem;
  }
`;


export default Job
