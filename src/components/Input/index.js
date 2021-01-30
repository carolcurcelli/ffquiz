import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputBase = styled.input`
    width:38px;
    width:100%;
    font-size:14px;
    background-color:transparent;
    border: solid 1px ${({ theme }) => theme.colors.secondary};
    color:${({ theme }) => theme.colors.contrastText};
    padding: 10px 15px;
    border-radius:3px;
    margin-top:5px;
    transition:.3s;
    &:focus {
        outline:none;
        border: solid 1px ${({ theme }) => theme.colors.contrastText};
    }
`;

// eslint-disable-next-line import/prefer-default-export
export default function Input({ onChange, placeholder, ...props }) {
  return (
    <div>
      <InputBase
        placeholder={placeholder}
        onChange={onChange}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </div>
  );
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
