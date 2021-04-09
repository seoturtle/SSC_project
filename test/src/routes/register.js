import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import '../css/register.css';

function Register() {
const [email, setEmail] = useState("");
// const [pwd, setPwd] = useState("");
// const [nickname, setNickname] = useState("");
// const [sex, setSex] = useState("");
// const [phone, setPhone] = useState("");

const handleEmail = (e) => {
    e.preventDefault();
        setEmail(e.target.value);
  };
// const handlePwd = (e) => {
//     e.preventDefault();
//         setPwd(e.target.value);
//   };
// const handleSubmit = (e) => {
//     e.preventDefault();
        
//   };
const handleClick = async() => {
    const response = await axios.post('http://localhost:3002/text', {
        email: email
    });
    console.log(response.data);
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
                        </span>
                        <span className="error_next_box"></span>
                    </div>

                    <div>
                        <h3 className="join_title">
                            <label for="pswd1">비밀번호</label>
                        </h3>
                        <span className="box int_pass">
                            <input type="text" id="pswd1" className="int" maxlength="20" />
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
                            <input type="text" id="pswd2" className="int" maxlength="20" />
                            {/* <img src="../img/cancel.png" id="pswd2_img1" className="pswdImg" /> */}
                        </span>
                        <span className="error_next_box"></span>
                    </div>

                {/* <!-- NAME --> */}
                    <div>
                        <h3 className="join_title">
                            <label for="name">닉네임</label>
                        </h3>
                        <span className="box int_name">
                            <input type="text" id="nickname" className="int" maxlength="20" />
                        </span>
                        <span className="error_next_box"></span>
                    </div>

                    <div>
                        <h3 className="join_title"><label for="gender">성별</label></h3>
                        <span className="box gender_code">
                            <select id="gender" className="sel">
                                <option>성별</option>
                                <option value="M">남자</option>
                                <option value="F">여자</option>
                            </select>                            
                        </span>
                        <span className="error_next_box">필수 정보입니다.</span>
                    </div>

                    <div>
                        <h3 className="join_title"><label for="phoneNo">휴대전화</label></h3>
                        <span className="box int_mobile">
                            <input type="tel" id="mobile" className="int" maxlength="16" placeholder="전화번호 입력" />
                        </span>
                        <span className="error_next_box"></span>    
                    </div>

                    <div className="btn_area">
                        <button onClick={handleClick} type="button" id="btnJoin">
                            <span>가입하기</span>
                        </button>
                    </div>
                </div> 
            </div>
        </div>
    );
  }


export default Register;
