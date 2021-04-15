import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Header from "../components/header.js";
import '../css/main.css';
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';

function Main() {

  //state
  const history = useHistory();
  const [cookie, setCookie, removeCookie] = useCookies('["jwt"]');
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  
  useEffect(() => {
    if (cookie.jwt){
      const decode = jwtDecode(cookie.jwt);
      setUserEmail(decode.email);
      setUserName(decode.name);
      console.log(decode);
    }else {
      history.push("/");
    }
  }, []);

  const handleClick = (e) => {
    removeCookie("jwt");
    history.push("/");
  }

      return (
        <div className="main">
          <Header />
          <div id="container">
            <div className="korea_index">
                <div className="img_kospi">{cookie.jwt ? userEmail : null}코스피</div>
                <div className="img_kosdaq">코스닥</div>
            </div>
            <div className="main_four_index">
                <div className="img_four_index">4대 지표</div>
            </div>
            <div className="main_invest">
                <div className="img_invest">투자 동향</div>
                <button onClick={handleClick} style={{height:"20px", width:"20px"}}></button>
            </div>
        </div>
        </div>
      );
    }

export default Main;