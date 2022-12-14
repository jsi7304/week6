import styled, { css } from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Button = ({
  text,
  btntype,
  type,
  onClick,
  children,
  uibutton,
  disabled,
}) => {
  return (
    <StButton type={type} onClick={onClick} btntype={btntype}>
      {children}
      {uibutton === "delete" ? <DeleteIcon /> : null}
      {uibutton === "edit" ? <EditIcon /> : null}
    </StButton>
  );
};

export default Button;

const StButton = styled.button`
  border-radius: 8px;
  cursor: pointer;
  ${(props) => {
    return (
      props.btntype === "login" &&
      css`
        border: 1px solid rgb(221, 221, 221);
        background-color: white;
        :hover {
          border: 1px solid rgb(254, 83, 31);
        }
        width: 100%;
        height: 50px;
      `
    );
  }}
  ${(props) => {
    return (
      props.btntype === "signup" &&
      css`
        border: 1px solid rgb(221, 221, 221);
        background-color: white;
        :hover {
          border: 1px solid rgb(254, 83, 31);
        }
        width: 100%;
        height: 50px;
      `
    );
  }}
  ${(props) => {
    return (
      props.btntype === "signSubmit" &&
      css`
        border: 1px solid rgb(221, 221, 221);
        background-color: white;
        :hover {
          border: 1px solid rgb(254, 83, 31);
        }
        width: 100%;
        height: 50px;
      `
    );
  }}
  ${(props) => {
    return (
      props.btntype === "back" &&
      css`
        border: 1px solid rgb(221, 221, 221);
        background-color: white;
        :hover {
          border: 1px solid rgb(254, 83, 31);
        }
        width: 100%;
        height: 50px;
      `
    );
  }}

  ${(props) => {
    return (
      props.btntype === 'logout' &&
      css`
        border: 1px solid rgb(254, 83, 31);
        background-color: transparent;
        /* width: 100px; */
        /* height: 50px; */
        /* line-height:50px; */
        padding:15px 25px;
      `
    );
  }}
`;
