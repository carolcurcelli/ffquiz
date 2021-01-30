/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonBase = styled.button`
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

function Button({
  type,
  disabled,
  text,
  id,
}) {
  if (disabled && id === 'index') {
    return (
      <ButtonBase type={type} disabled={disabled} id={id}>
        New Game
      </ButtonBase>
    );
  }
  return (
    <ButtonBase type={type} disabled={disabled} id={id}>
      {text}
    </ButtonBase>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['submit', 'type', 'button']).isRequired,
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.bool.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export default Button;
