import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Header from "../components/header.js";
import '../css/main.css';
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import Kospi from '../components/kospi.js'
import Kosdaq from '../components/kosdaq.js'
import Four_indicator from '../components/four_indicator.js'

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
    }else {
      history.push("/");
    }
  }, []);

  return (
    <div className="main">
      <Header />
      <div id="container">
          <div className="main_left">
            <div className="korea_index">
              <div className="img_kospi"><p>코스피</p><Kospi /></div>
              <div className="img_kosdaq"><p>코스닥</p><Kosdaq /></div>
            </div>
            <div className="main_four_index">
              <div className="img_four_index"><p>해외 주요 증시</p><Four_indicator /></div>
            </div>
          </div>
        <div className="main_column">
          
        </div>
      </div>
    </div>
  );
}

export default Main;