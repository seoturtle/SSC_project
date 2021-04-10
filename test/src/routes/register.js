import React, { useState } from 'react';
import { Link,useHistory } from "react-router-dom";
// import axios from 'axios';
import '../css/register.css';

function Register() {
const history = useHistory();
const [data, setData] = useState("");
const [email, setEmail] = useState("");
const [emailCheck, setEmailCheck] = useState("");
const [pwd, setPwd] = useState("");
const [repwd, setRepwd] = useState("");
const [pwCheck, setPwCheck] = useState("");
const [name, setName] = useState("");
const [sex, setSex] = useState("남자");
const [phone, setPhone] = useState("");

const handleEmail = (e) => {
    e.preventDefault();
        setEmail(e.target.value);
  };
const checkEmail = (e) => {
    e.preventDefault();

    //이메일 유효성 검사 함수
    const chkEmail = function(str) {
      var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      return regExp.test(str) ? true : false;
    };

    const inputEmail = {
      email: email
    };
    const email_info = {
      method: "POST",
      body: JSON.stringify(inputEmail),
      headers: {
        "Content-Type": "application/json"
      }
    };

    if (chkEmail(email) === false) {
      alert("이메일 형식이 유효하지 않습니다.");
      setEmail("")
    } else {
      fetch("http://localhost:3002/email", email_info)
        .then(res => res.json())
        .then(json => {
          if (json === true) {
            alert("사용가능 한 아이디입니다");
            setEmailCheck(email)
          } else {
            alert("이미 존재하는 아이디입니다");
          }
        });
    }
  };
const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value)
  };
const handlePwd = (e) => {
    e.preventDefault();
    setPwd(e.target.value);
  };
const handleRepwd = (e) => {
    e.preventDefault();
    setRepwd(e.target.value);
}
const checkPwd = (e) => {
    e.preventDefault();

    //비밀번호 유효성검사(영문,숫자 혼합 6~20)
    const chkPwd = function(str) {
      var reg_pwd = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
      return !reg_pwd.test(str) ? false : true;
    };

    if (chkPwd(pwd) === false) {
      alert("영문,숫자를 혼합하여 6~12자 이내");
      setPwd("");
      setRepwd("");
    } else {
      if (pwd === repwd) {
        alert("일치합니다.");
          setPwCheck(repwd)
      } else {
        alert("불일치합니다.");
      }
    }
  };

const handleSex = (e) => {
    e.preventDefault();
    setSex(e.target.value);
}
const handlePhone = (e) => {
    e.preventDefault();
    setPhone(e.target.value);
}
const handleSubmit = (e) => {
    e.preventDefault();
    
    const post = {
        email,
        emailCheck,
        name,
        pwd,
        repwd,
        pwCheck,
        sex,
        phone
    }
    const signupInfo = {
        email: emailCheck,
        pwd: pwCheck,
        name : name,
        sex : sex,
        phone : phone
    }

    const signup_info = {
        method: "POST",
        body: JSON.stringify(signupInfo),
        headers: {
          "Content-Type": "application/json"
        }
      };

      if (
          email &&
          name &&
          pwd &&
          repwd &&
          sex &&
          phone &&
          email === emailCheck &&
          pwd === repwd &&
          repwd === pwCheck
      ) {
          fetch("http://localhost:3002/user", signup_info)
          .then(alert("가입이 완료되었습니다."))
          .then(history.push("/"));
      } else {
          alert("입력값을 확인해주세요");
          console.log(sex);
      }
  };

    return (
        <div className="register">
            <div id="header">
                <Link to='/'>
                    <div className="logo">
                        
                    </div>
                </Link>
            </div>

            <div id="wrapper">
                <div id="content">
                    <div>
                        <h3 className="join_title">
                            <label for="id">이메일</label>
                        </h3>
                        <span className="box int_id">
                            <input onChange={handleEmail} type="text" id="email" className="int" maxlength="20" />
                            <button onClick={checkEmail}>중복체크</button>
                        </span>
                        <span className="error_next_box"></span>
                    </div>

                    <div>
                        <h3 className="join_title">
                            <label for="pswd1">비밀번호</label>
                        </h3>
                        <span className="box int_pass">
                            <input onChange={handlePwd} type="password" id="pswd1" className="int" maxlength="20" />
                            <span id="alertTxt">사용불가</span>
                            {/* <img src="../img/cancel.png" id="pswd1_img1" className="pswdImg" /> */}
                        </span>
                        <span className="error_next_box"></span>
                    </div>

                {/* <!-- PW2 --> */}
                    <div>
                        <h3 className="join_title">
                            <label for="pswd2">비밀번호 재확인</label>
                        </h3>
                        <span className="box int_pass_check">
                            <input onChange={handleRepwd} type="password" id="pswd2" className="int" maxlength="20" />
                            {/* <img src="../img/cancel.png" id="pswd2_img1" className="pswdImg" /> */}
                        </span>
                        <span className="error_next_box"></span>
                    </div>
                    <button onClick={checkPwd}>중복체크</button>
                {/* <!-- NAME --> */}
                    <div>
                        <h3 className="join_title">
                            <label for="name">닉네임</label>
                        </h3>
                        <span className="box int_name">
                            <input onChange={handleName} type="text" id="nickname" className="int" maxlength="20" />
                        </span>
                        <span className="error_next_box"></span>
                    </div>

                    <div>
                        <h3 className="join_title"><label for="gender">성별</label></h3>
                        <span className="box gender_code">
                            <select onChange={handleSex} value={sex} id="gender" className="sel">
                                <option value="남자">남자</option>
                                <option value="여자">여자</option>
                            </select>                            
                        </span>
                        <span className="error_next_box">필수 정보입니다.</span>
                    </div>

                    <div>
                        <h3 className="join_title"><label for="phoneNo">휴대전화</label></h3>
                        <span className="box int_mobile">
                            <input onChange={handlePhone}type="tel" id="mobile" className="int" maxlength="16" placeholder="전화번호 입력" />
                        </span>
                        <span className="error_next_box"></span>    
                    </div>

                    <div className="btn_area">
                        <button onClick={handleSubmit} type="button" id="btnJoin">
                            <span>가입하기</span>
                        </button>
                        {data}
                    </div>
                </div> 
            </div>
        </div>
    );
  }


export default Register;
