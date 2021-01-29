import styled from 'styled-components';
import db from '../../../db.json';

const Form = styled.div`
    input {
        width:38px;
        width:100%;
        font-size:14px;
        background-color:transparent;
        border: solid 1px ${({ theme }) => theme.colors.contrastText};
        color:${({ theme }) => theme.colors.contrastText};
        padding: 10px 15px;
        border-radius:3px;
        margin-top:5px;
        transition:.3s;
        &:focus {
            outline:none;
            border: solid 1px ${({ theme }) => theme.colors.secondary};
        }
    }
    button {
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
    }

`;

export default Form;