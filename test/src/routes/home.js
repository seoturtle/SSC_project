import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import '../css/home.css';

function Home() {
  //state
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  //handler
  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  }
  const handlePwd = (e) => {
    e.preventDefault();
    setPwd(e.target.value);
  }
  const handleSubmit = (e) => {
    const logininfo = {
      email : email,
      pwd : pwd
    }
    const login_info = {
      method: "POST",
      body: JSON.stringify(logininfo),
      headers: {
        "Content-Type": "application/json"
      }
    };
    if (
      email &&
      pwd
      ) {
      fetch("http://localhost:3002/login", login_info)
      .then(history.push("/main"));
    } else {
      alert("err");
        }
    }
  
    return (
      <div className="home">
        <div className="left-side">
          <div className="left-background">
          </div>
        </div>
        <div className="right-side">
          <div className="login-tab">
            <input className="login-email" onChange={handleEmail} type="email" placeholder="이메일"></input>
            <input className="login-pwd" onChange={handlePwd} type="password" placeholder="비밀번호"></input>
            <Link to="/main"><input className="login-btn" onClick={handleSubmit} type="submit" value="로그인"></input></Link>
          </div>
          <div className="logo-ment-register">
            <div className="home_logo">
            </div>
            <div className="home_ment">
              주식은 처음이지?
            </div>
            <div className="home_register">
              <Link to="/register">
                <button className="home_register-btn">
                  가입하기
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default Home;
