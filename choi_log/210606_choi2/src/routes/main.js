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
import PDF10 from "../pdf/3_1.pdf"
import PDF11 from "../pdf/3_2.pdf"
import PDF12 from "../pdf/3_3.pdf"
import PDF13 from "../pdf/3_4.pdf"
import PDF14 from "../pdf/3_5.pdf"



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
              <div className="img_kospi"><p>?????????<span>{kospi}</span></p><Kospi /></div>
              <div className="img_kosdaq"><p>?????????<span>{kosdaq}</span></p><Kosdaq /></div>
            </div>
            <div className="main_four_index">
              <div className="img_four_index"><p>?????? ?????? ??????</p><Four_indicator /></div>
            </div>
          </div>
          <div className="main_right">
            <div className="column_header">Weekly Column</div>
              <div className="column_list">
                <div className="column">
                  <div className="list">
                    <a href={PDF} target='_black'><div className="column_name">?????? ?????? ?????? : ????????? ??????</div></a>
                  </div>
                  <div className="angelright">
                  </div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF1} target='_black'><div className="column_name">????????? ???????????? ??????</div></a>
                  </div>
                  <div className="angelright">
                  </div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF2} target='_black'><div className="column_name">???????????? ?????? ????????? ?????? ??????</div></a>
                  </div>
                  <div className="angelright">
                  </div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF3} target='_black'><div className="column_name">?????????(Moody???s) ?????? ?????????????????? Aa2 ?????? ?????? ??????</div></a>
                  </div>
                  <div className="angelright">
                  </div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF4} target='_black'><div className="column_name">?????? ?????? ?????? : ?????? ?????????</div></a>
                  </div>
                  <div className="angelright">
                  </div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF5} target='_black'><div className="column_name">??????????????????, 5??? ?????? ?????????????????? ????????? ??????</div></a>
                  </div>
                  <div className="angelright">
                  </div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF6} target='_black'><div className="column_name">?????? ?????? ?????? : ?????? ??????</div></a>
                  </div>
                  <div className="angelright">
                  </div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF7} target='_black'><div className="column_name">???????????? ??????????????? ??????(Feat. ??? ?????????)</div></a>
                  </div>
                  <div className="angelright">
                  </div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF8} target='_black'><div className="column_name">?????? ?????? ?????? : ?????? ??????</div></a>
                  </div>
                  <div className="angelright">
                  </div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF9} target='_black'><div className="column_name">OECD 21??? ?????? ?????? ????????? 3.8% ??????</div></a>
                  </div>
                  <div className="angelright"></div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF10} target='_black'><div className="column_name">?????? ?????? ?????? : ?????????</div></a>
                  </div>
                  <div className="angelright"></div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF11} target='_black'><div className="column_name">?????? (????????? ??????) ????????? ?????? ??????</div></a>
                  </div>
                  <div className="angelright"></div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF12} target='_black'><div className="column_name">?????? ?????? ?????? : ?????????</div></a>
                  </div>
                  <div className="angelright"></div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF13} target='_black'><div className="column_name">?????? ?????? ?????? ??? ??????</div></a>
                  </div>
                  <div className="angelright"></div>
                </div>
                <div className="column">
                  <div className="list">
                    <a href={PDF14} target='_black'><div className="column_name">?????? ?????? ?????? : ?????????</div></a>
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