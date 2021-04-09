import React from 'react';
import { Link } from "react-router-dom";
import '../css/home.css';

function Home() {
    return (
      <div className="home">
        <div className="left-side">
          <div className="left-background">
          </div>
        </div>
        <div className="right-side">
          <div className="login-tab">
            <input className="login-email" type="email" placeholder="이메일"></input>
            <input className="login-pwd" type="password" placeholder="비밀번호"></input>
            <Link to="/main"><input className="login-btn" type="submit" value="로그인"></input></Link>
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
