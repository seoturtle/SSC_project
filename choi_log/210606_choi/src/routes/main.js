/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Header from "../components/header.js";
import '../css/main.css';
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import Kospi from '../components/kospi.js'
import Kosdaq from '../components/kosdaq.js'
import Four_indicator from '../components/four_indicator.js'
import axios from 'axios'
import PDF from "../pdf/4_1.pdf"
import PDF1 from "../pdf/4_2.pdf"
import PDF2 from "../pdf/4_3.pdf"
import PDF3 from "../pdf/4_4.pdf"
import PDF4 from "../pdf/4_5.pdf"
import PDF5 from "../pdf/5_1.pdf"
import PDF6 from "../pdf/5_2.pdf"
import PDF7 from "../pdf/5_3.pdf"
import PDF8 from "../pdf/5_4.pdf"
import PDF9 from "../pdf/6_1.pdf"

function Main() {

  //state
  const history = useHistory();
  const [cookie, setCookie, removeCookie] = useCookies('["jwt"]');
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [kospi, setKospi] = useState();
  const [kosdaq, setKosdaq] = useState();

  
  useEffect(() => {
    if (cookie.jwt){
      const decode = jwtDecode(cookie.jwt);
      setUserEmail(decode.email);
      setUserName(decode.name);
    }else {
      history.push("/");
    }

    axios.post('http://localhost:3002/stock_back/kospi')
        .then(res => {
            const items = res.data._attributes.data.split('|')
            const itemsKospi = items[4].slice(0, -2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.' + items[4].slice(-2)
            setKospi(itemsKospi)
        })
        axios.post('http://localhost:3002/stock_back/kosdaq')
        .then(res => {
            const items = res.data._attributes.data.split('|')
            const itemsKosdaq = items[4].slice(0, -2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.' + items[4].slice(-2)
            setKosdaq(itemsKosdaq)
        })
  }, []);

  return (
    <div className="main">
      <Header />
      <div id="container">
          <div className="main_left">
            <div className="korea_index">
              <div className="img_kospi"><p>코스피<span>{kospi}</span></p><Kospi /></div>
              <div className="img_kosdaq"><p>코스닥<span>{kosdaq}</span></p><Kosdaq /></div>
            </div>
            <div className="main_four_index">
              <div className="img_four_index"><p>해외 주요 증시</p><Four_indicator /></div>
            </div>
          </div>
          <div className="main_right">
            <div className="column_header">Stock Column</div>
              <div className="column_list">
                <div className="column">
                  <div className="list">
                    <a href={PDF} target='_black'><div className="column_name">금주 산업 분석 : 폐기물 시장</div></a>
                  </div>
                  <div className="angelright">
                  </div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF1} target='_black'><div className="column_name">카카오 액면분할 분석</div></a>
                  </div>
                  <div className="angelright">
                  </div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF2} target='_black'><div className="column_name">후쿠시마 원전 오염수 방류 결정</div></a>
                  </div>
                  <div className="angelright">
                  </div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF3} target='_black'><div className="column_name">무디스(Moody’s) 한국 국가신용등급 Aa2 평가 유지 결정</div></a>
                  </div>
                  <div className="angelright">
                  </div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF4} target='_black'><div className="column_name">금주 산업 분석 : 이동 통신업</div></a>
                  </div>
                  <div className="angelright">
                  </div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF5} target='_black'><div className="column_name">국민연금기금, 5월 국내 유가증권시장 손매수 전환</div></a>
                  </div>
                  <div className="angelright">
                  </div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF6} target='_black'><div className="column_name">금주 산업 분석 : 게임 산업</div></a>
                  </div>
                  <div className="angelright">
                  </div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF7} target='_black'><div className="column_name">본격적인 보복소비의 시작(Feat. 노 마스크)</div></a>
                  </div>
                  <div className="angelright">
                  </div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF8} target='_black'><div className="column_name">금주 산업 분석 : 방위 산업</div></a>
                  </div>
                  <div className="angelright">
                  </div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF9} target='_black'><div className="column_name">OECD 21년 한국 경제 성장률 3.8% 전망</div></a>
                  </div>
                  <div className="angelright"></div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF9} target='_black'><div className="column_name">OECD 21년 한국 경제 성장률 3.8% 전망</div></a>
                  </div>
                  <div className="angelright"></div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF9} target='_black'><div className="column_name">OECD 21년 한국 경제 성장률 3.8% 전망</div></a>
                  </div>
                  <div className="angelright"></div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF9} target='_black'><div className="column_name">OECD 21년 한국 경제 성장률 3.8% 전망</div></a>
                  </div>
                  <div className="angelright"></div>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
}

export default Main;