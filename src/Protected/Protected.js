import React from "react";
//import { Children } from 'react';
//import { Navigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
//import Login from "../LoginPage/Login";
//import home from '../HOME/homePage';
//import home from "../HOME/HomePage";
//{ auth, children,...rest}
import "./Protected.css";
const Protected = ({ children }) => {
  // console.log("auth auth", auth);
  //   console.log("auth auth-2", rest);

  let isauthentica = localStorage.getItem("authenticated");
  isauthentica = Boolean(isauthentica);
  console.log("isauthentica", isauthentica);

  // console.log("auth-1", auth);
  // const isauthenticated = Boolean(auth);
  return isauthentica ? children : <Navigate to="/login" />;
};

export default Protected;
