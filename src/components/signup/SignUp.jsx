import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../shared/firebase";
import { collection, addDoc } from "firebase/firestore";
import SignUpView, { id_ref, pw_ref, name_ref } from "./SignUpView";
// import uuid from 'react-uuid'
import { v4 as uuidV4 } from "uuid";
import { useDispatch } from "react-redux";
import { createUserThunk } from "../../redux/modules/users";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import TextField from "@material-ui/core/TextField";
import Box from "@mui/material/Box";
// import styled from 'styled-components;'
// import { StylesProvider } from '@material-ui/core/styles';
import axios from "axios";
import "./SignUp.css";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
// import {btn_google} from "../public/img/btn_google.png"

export default function SignUp() {
  const dispatch = useDispatch();
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const passwordConfirmInput = useRef(null);
  const { nanoid } = require("nanoid");
  const [isUsername, setisUsername] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [isUsernameOk, setIsUsernameOk] = useState("false");
  const [isPasswordOk, setIsPasswordOk] = useState("false");
  const navigate = useNavigate;
  // console.log(usernameInput)
  useEffect(() => {
    // dispatch(__deleteReviews())
    dispatch(createUserThunk());
  }, [dispatch]);

  const signupClickHandler = async () => {
    const newUser = {
      id: nanoid(),
      username: usernameInput.current.value,
      // nickname: usernameInput.current.value,
      password: passwordInput.current.value,
      passwordConfirm: passwordConfirmInput.current.value,
    };

    const usernameRegex = /^[A-Za-z0-9+]{3,13}$/;
    const userCurrent = usernameInput.current.value;
    // const userCurrent = usernameInput
    setisUsername(userCurrent);
    console.log(isUsername);
    console.log(userCurrent);
    console.log(usernameInput);

    if (!usernameRegex.test(userCurrent)) {
      setUsernameMessage("????????? ????????? ????????????! ?????? ??????????????????");
    } else {
      setUsernameMessage("????????? ????????? ??????????????? : )");
      setIsUsernameOk(true);
    }

    const passwordRegex = /^[A-Za-z0-9+]{3,13}$/;
    const PWCurrent = passwordInput.current.value;
    setIsPassword(PWCurrent);

    if (!passwordRegex.test(PWCurrent)) {
      setPasswordMessage("???????????? ????????? ????????????! ?????? ??????????????????");
    } else {
      setPasswordMessage("????????? ???????????? ??????????????? : )");
      setIsPasswordOk(true);
    }
    const PWConfirmCurrent = passwordConfirmInput.current.value;

    // if( PWCurrent !== PWConfirmCurrent) {
    // setPasswordConfirmMessage('??????????????? ??????????????? ??????????????????')
    // }

    if (isUsernameOk === true && isPasswordOk === true) {
      axios({
        // id:nanoid(),
        url: "http://13.125.246.47:8080/api/member/signup",
        // url: "http://localhost:3001/users",
        method: "POST",
        data: newUser,
        withCredentials: true,
      });
    }
    navigate(`/`);
    // dispatch(createUserThunk(newUser));
  };

  return (
    <div className="SignUp">
      <div></div>
      <div>
        {/* username : <input  type="text" /> <br /> */}
        username :{" "}
        <input
          ref={usernameInput}
          type="text"
          placeholder="?????????????????? 3?????? ??????, 13?????? ??????"
          size="35"
        />{" "}
        <br />
        <div className="valid">{usernameMessage}</div>
        password :{" "}
        <input
          ref={passwordInput}
          type="password"
          placeholder="?????????????????? 3?????? ??????, 33?????? ??????"
          size="35"
        />{" "}
        <br />
        <div className="valid">{passwordMessage}</div>
        passwordConfirm :{" "}
        <input
          ref={passwordConfirmInput}
          type="password"
          placeholder="??????????????? ?????? ?????? ??????????????????"
          size="27"
        />
      </div>
      <div></div>
      <Button variant="contained" onClick={signupClickHandler}>
        ????????????
      </Button>{" "}
      <br />
      {/* <a href="https://google.com"> */}
      <a href="http://weref.vercel.app/login">
        <img src="btn_google.png" href="http://weref.vercel.app/login" />
      </a>
    </div>
  );
}
