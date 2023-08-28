import { useState } from "react";
import "./LoginPage.css";
import axios from "axios";
//import Protected from "../Protected/Protected";
//import { Navigate } from "react-router-dom";
//import Home from "../HOME/HomePage";
//import Protected from "../Protected/Protected";
//import useCustoHook from "../useCustoHook";
import { useNavigate } from "react-router-dom";
//import Protected from "../Protected/Protected";
//import home from "../HOME/homePage";
//import { Routes, Route } from "react-router-dom";
const Login = ({ auth, children, ...rest }) => {
  const [userDetails, setUserDetails] = useState({
    //firstname: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [logDetailsErrorMsg, setLogDetailsErrorMsg] = useState(false);

  const [isLogMsg, setLogMsg] = useState("");

  // const [loginDetails, setLoginDetails] = useState({
  //   loguser: "",
  //   logpassword:""
  // });
  // console.log("logindetails:", loginDetails.loguser);
  //   console.log("logindetailsPassword:", loginDetails.logpassword);

  function usernameHandler(event) {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name);
    console.log(value);
    setUserDetails((previous) => {
      return { ...previous, [name]: value };
    });
    setLogDetailsErrorMsg(false);
  }

  // const fetchUserLogDetails =  () => {

  //     try {
  //        const responses =  axios.post(
  //          "http://localhost:3001/routes/Loginin",
  //          loginDetails
  //       );
  //       console.log("responses", responses);
  //     } catch (err) {
  //   console.log("err", err);
  //      }

  //   //  console.log("logindetails:", loginDetails.loguser);
  //   //  console.log("logindetailsPassword:", loginDetails.logpassword);

  //    };

  const logMsgMethod = () => {
    setLogDetailsErrorMsg(true);

    setLogMsg("enter correct details");
  };

  const logSuccess = (name) => {
    localStorage.setItem("authenticated", true);
    setLogDetailsErrorMsg(false);
    setLogMsg("");
    localStorage.setItem("profileName", name);
    navigate("/home");
  };

  // const forgetPasswordPage = () => {
  //   navigate("/ForgetPassword ");
  // }

  const submitHandler = (event) => {
    event.preventDefault();
    // const usernameSub = userDetails.username;
    // const passwordSub = userDetails.password;
    // console.log("username:",usernameSub);
    // console.log("password:", passwordSub);
    // setLoginDetails(() => {
    //   return { loguser: usernameSub, logpassword: passwordSub };
    // })

    const logindetailsList = userDetails;
    console.log("logindetailsList", logindetailsList);
    try {
      const responses = axios.post(
        "http://localhost:3003/routes/login",
        logindetailsList
      );

      responses.then((data) => {
        console.log("data", data);
        console.log("data", data.data);

        if (data.data === "enter correct details") {
          logMsgMethod();
        } else {
          localStorage.setItem("profileName", data.data.name);
          console.log("dta", data.data.name);
          logSuccess(data.data.name);
        }
      });
    } catch (err) {
      console.log("err", err);
    }
    //console.log("responses", responses);

    // console.log("logindetails:", loginDetails.loguser);
    // console.log("logindetailsPassword:", loginDetails.logpassword);

    // console.log("funny");
  };
  return (
    <div className="d-flex justify-content-center align-items-center loginBackground">
      <div
        className="d-flex  card w-50  flex-column from-group  justify-content-center align-items-center
      
         shadow-lg  rounded  logcss"
      >
        <h1>Login form</h1>
        <form
          className="d-flex flex-column custom-input"
          onSubmit={submitHandler}
          // method=""
          // action=""
        >
          <div className="row ">
            <div className="">
              <input
                className="form-control mb-5 mt-4 "
                name="username"
                type="text"
                // name="firstname"
               // name="email"
                value={userDetails.username}
                onChange={usernameHandler}
                placeholder="Enter username"
                aria-describedby="emailHelp"
              />
            </div>

            <div>
              <input
                className="form-control "
                type="password"
                name="password"
                value={userDetails.password}
                onChange={usernameHandler}
                placeholder="enter password"
              />
            </div>
            <div className="d-flex flex-column justify-content-start">
              {logDetailsErrorMsg && (
                <span className=" text-danger errorDetail">{isLogMsg}</span>
              )}
            </div>
            <div>
              <input
                className="form-control mt-5 mb-5 btn btn--block btn--solid btn--med loginbg"
                type="submit"
                // name="commit"
                value="Login Now"
                onClick={submitHandler}
              />
            </div>
            {/* <>{logDetailsErrorMsg && <p>{isLogMsg}</p>}</> */}
            {/* <div>
              <input
                className="form-control mb-5 btn btn--block btn--solid btn--med loginbg"
                type="submit"
                // name="commit"
                value="forget password"
              />
            </div> */}
            {/* <div className="d-flex flex-row  g-3">
                <div className="row">
                  <div className="col">
                    <button type="submit" className="btn btn-primary mr-4 mb-4">
                      login
                    </button>
                  </div>
                  <div className="col">
                    <button type="submit" className="btn btn-primary ml-4">
                      Signup
                    </button>
                  </div>
                </div>
              </div> */}
          </div>
        </form>
        <div className="d-sm-flex flex-row flex-sm-col justify-content-sm-center align-items-sm-center">
          <div className="">
            <input
              className="form-control mb-5 btn btn--block btn--solid btn--med loginbg"
              type="submit"
              // name="commit"
              value="forget password"
              onClick={() => {
                navigate("/ForgetPassword");
              }}
            />
          </div>
          <div className="ml-5">
            <input
              className="form-control mb-5 btn btn--block btn--solid btn--med loginbg"
              type="submit"
              // name="commit"
              value="create account"
              onClick={() => {
                navigate("/signin");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
