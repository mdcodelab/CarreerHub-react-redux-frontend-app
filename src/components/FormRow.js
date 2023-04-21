import React from 'react';
import styled from "styled-components";

function FormRow({type, name, value, onChange}) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">{name}</label>
      <input type={type} name={name} value={value} onChange={onChange} className="form-input"></input>
    </div>
  );
}

export default FormRow;


