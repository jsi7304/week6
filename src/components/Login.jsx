import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __postLogin } from "../redux/modules/todoSlice";
import Button from "./elements/Button";
import Input from "./elements/Input";

import bgImg from "../img/programming.jpg";

import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export function setRefreshTokenToCookie(data) {
  let now = new Date();
  // let after1m = new Date();
  // after1m.setMinutes(now.getMinutes() + 10);
  now.setMinutes(now.getMinutes() + 30);
  cookies.set("Authorization", data, { path: "/", expires: now });
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, setLogin] = React.useState({
    userId: "",
    password: "",
  });

  const { userId, password } = login;

  const onSubmitEventHandler = async () => {
    if (userId.trim() === "") {
      window.alert("아이디를 입력해주세요.");
      return false;
    }
    if (password.trim() === "") {
      window.alert("비밀번호를 입력해주세요.");
      return false;
    }
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_IP_ADDRESS}/member/login`,
        login,
        {
          // const data = await axios.post(`${process.env.REACT_APP_TEST_IP_ADDRESS}/login`, login, {
          headers: {},
        }
      );
      console.log("로그인성공데이터1:", data);
      console.log("로그인성공데이터2:", data.status);
      /* 트루이면 */
      // data?navigate('/main'):window.alert("로그인 실패하였습니다.");
      const token = data.headers.authorization;
      setRefreshTokenToCookie(token);
      data.status === 200
        ? navigate("/main")
        : window.alert("로그인 실패하였습니다.");
    } catch {
      alert("사용자를 찾을 수 없습니다.");
    }
  };
  const onChangeEventHandler = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  return (
    <>
      <ImgDiv>
        <LoginWrap>
          <LoginTitle>로그인</LoginTitle>
          <LoginForm>
            <div>
              <Input
                type={"text"}
                width={"500px"}
                id={"userId"}
                name={"userId"}
                maxLength={"20"}
                onChange={onChangeEventHandler}
                placeholder={"아이디를 입력하세요."}
                autoFocus={"autoFocus"}
              />
            </div>
            <div>
              <Input
                type={"password"}
                width={"500px"}
                id={"password"}
                name={"password"}
                maxLength={"20"}
                onChange={onChangeEventHandler}
                placeholder={"비밀번호를 입력하세요."}
              />
            </div>
            <Button btntype='login' onClick={() => onSubmitEventHandler()}>
              로그인
            </Button>
            <Button btntype='signup' onClick={() => navigate("/signup")}>
              회원가입
            </Button>
          </LoginForm>
        </LoginWrap>
      </ImgDiv>
    </>
  );
};

export default Login;

const ImgDiv = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url(${bgImg}) no-repeat 50% 25%;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const LoginWrap = styled.div`
  width: 1000px;
  background-color: rgba(0, 0, 0, 0.8);
  text-align: center;
  display: flex;
  flex-direction: column;
`;
const LoginTitle = styled.h1`
  line-height: 80px;
  font: 40px/80px "Arial", "sans-serif";
  letter-spacing: 10px;
`;
const LoginForm = styled.div`
  font: 20px/80px "Arial", "sans-serif";
  letter-spacing: 5px;
  padding: 15px;
  box-sizing: border-box;
`;
