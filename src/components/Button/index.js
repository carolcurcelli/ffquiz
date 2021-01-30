import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputBase = styled.button`
    width:100%;
    color:${({ theme }) => theme.colors.contrastText};
    background:${({ theme }) => theme.colors.secondary};
    border: 0;
    padding: 13px 15px;
    margin-top: 25px;
    text-transform:uppercase;
    font-weight:bold;
    border-radius:3px;
    cursor:pointer;
    transition:.3s;
    &:hover {
        opacity:.8;
    }
    &:disabled {
        cursor:alias;
        opacity:.5;
    }
    &:disabled:hover {
        opacity:.5;
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
