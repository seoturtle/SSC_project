import React, { useEffect, useState } from 'react';
import { Link,useHistory } from "react-router-dom";
// import axios from 'axios';
import '../css/register.css';

function Register() {

  // state
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [emailCheck, setEmailCheck] = useState("");
  const [pwd, setPwd] = useState("");
  const [repwd, setRepwd] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("남자");
  const [phone, setPhone] = useState("");
  const [emailText, setEmailText] = useState("");
  const [pwdText, setPwdText] = useState("");
  const [phoneText, setPhoneText] = useState("");
  const [nameText, setNameText] = useState("");
  const [regText, setRegText] = useState("");

  // handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailText("");
    setPwdText("");

      // 이메일 체크
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
      setEmailText("이메일 형식이 유효하지 않습니다.");
      setEmail("");
    } else {
      fetch("http://localhost:3002/login/email", email_info)
      .then(res => res.json())
      .then(res => {
        if (res.result[0] == undefined) {
          setEmailCheck(email);
          console.log(emailCheck);
        }else {
          setEmailText("이미 존재하는 아이디입니다");
        }
      });
    }
  
    // 비밀번호 체크
    const chkPwd = function(str) {
      var reg_pwd = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
      return !reg_pwd.test(str) ? false : true;
    };

    if (chkPwd(pwd) === false) {
      setPwdText("영문,숫자를 혼합하여 6~12자 이내");
      setPwd("");
      setRepwd("");
    } else {
      if (pwd === repwd) {
        setPwCheck(repwd);
      } else {
        setPwdText("비밀번호가 일치하지 않습니다");
      }
    }

  

  //핸드폰번호 체크
    if (phone) {
      fetch("http://localhost:3002/login/phone", {
        method: "POST",
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify({
          phone: phone
        })
      })
      .then(res=>res.json())
      .then(res=>{
        if (res.data === true){
          setPhoneText("")
        }else{
          setPhoneText("이미 존재하는 번호입니다");
        }
      })
    }else{
      setPhoneText("핸드폰 번호를 입력해주세요");
    }

    // 이름 체크
    if (name === "") {
      setNameText("이름을 입력해주세요");
    }else{
      setNameText("");
    }
  };

  useEffect(() => {
    // 데이터 DB에 넣기

  const signupInfo = {
    email: email,
    pwd: pwd,
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
  setTimeout(() =>{
    console.log(email, emailCheck, name, pwd, repwd, sex, phone);
    if (
      email &&
      emailCheck &&
      email === emailCheck &&
      name &&
      pwd &&
      repwd &&
      sex &&
      phone &&
      pwd === repwd
    ) {
      fetch("http://localhost:3002/login/user", signup_info)
      .then(alert("가입이 완료되었습니다"))
      .then(history.push("/"));
    } else {
        setRegText("입력값을 확인해주세요");
    }
  }, 50)
  }, [emailCheck])

  return (
    <div className="register">
      <div id="header">
          <Link to='/'>
            <div className="logo"></div>
          </Link>
      </div>
      <div id="wrapper">
        <div id="content">
          <div style={{height:"105px"}}>
            <h3 className="join_title">
              <label htmlFor="id">이메일</label>
            </h3>
            <span className="box int_id">
              <input onChange={(e) => {setEmail(e.target.value)}} type="text" id="email" className="int" maxLength={20} />
            </span>
            <div style={{color:"#d50000", fontWeight:"bold"}}>{emailText}</div>
            <span className="error_next_box"></span>
          </div>
          <div>
            <h3 className="join_title">
              <label htmlFor="pswd1">비밀번호</label>
            </h3>
            <span className="box int_pass">
              <input onChange={(e) => {setPwd(e.target.value)}} type="password" id="pswd1" className="int" maxLength={20} />
              <span id="alertTxt">사용불가</span>
            </span>
            <span className="error_next_box"></span>
          </div>
      {/* <!-- PW2 --> */}
          <div style={{height:"105px"}}>
            <h3 className="join_title">
              <label htmlFor="pswd2">비밀번호 재확인</label>
            </h3>
            <span className="box int_pass_check">
              <input onChange={(e) => {setRepwd(e.target.value)}} type="password" id="pswd2" className="int" maxLength={20} />
            </span>
            <div style={{color:"#d50000", fontWeight:"bold"}}>{pwdText}</div>
            <span className="error_next_box"></span>
          </div>
      {/* <!-- NAME --> */}
          <div style={{height: "105px"}}>
            <h3 className="join_title">
              <label htmlFor="name">이름</label>
            </h3>
            <span className="box int_name">
              <input onChange={(e) => {setName(e.target.value)}} type="text" id="nickname" className="int" maxLength={20} />
            </span>
            <div style={{color:"#d50000", fontWeight:"bold"}}>{nameText}</div>
            <span className="error_next_box"></span>
          </div>
          <div>
            <h3 className="join_title"><label htmlFor="gender">성별</label></h3>
            <span className="box gender_code">
              <select onChange={(e) => {setSex(e.target.value)}} value={sex} id="gender" className="sel">
                <option value="남자">남자</option>
                <option value="여자">여자</option>
              </select>                            
            </span>
            <span className="error_next_box">필수 정보입니다.</span>
          </div>
          <div style={{height: "105px"}}>
            <h3 className="join_title"><label htmlFor="phoneNo">휴대전화</label></h3>
            <span className="box int_mobile">
              <input onChange={(e) => {setPhone(e.target.value)}}type="tel" id="mobile" className="int" maxLength={16} placeholder="전화번호 입력" />
            </span>
            <div style={{color:"#d50000", fontWeight:"bold"}}>{phoneText}</div>
            <span className="error_next_box"></span>    
          </div>
          <div className="btn_area">
            <button onClick={handleSubmit} type="button" id="btnJoin">
              <span>가입하기</span>
            </button>
          </div>
        </div> 
      </div>
    </div>
  );
}


export default Register;
