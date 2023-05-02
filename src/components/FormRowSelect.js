import React from 'react';
import styled from "styled-components";

function FormRowSelect({labelText, name, value, onChange, list}) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">{labelText || name}</label>
      <WrapperSelect name={name} value={value} onChange={onChange} id={name} className="form-select">
            {list.map((option, index) => {
                return <option key={index} value={option}>{option}</option>
            })}
      </WrapperSelect>
    </div>
  );
}

const WrapperSelect = styled.select`
  padding: 1.1rem;
  border-radius: 0.3rem;
  transition: all 0.2s;

  &:focus {
    border-color: grey;
    border: 0.15rem solid grey;
  }
`;


export default FormRowSelect;
