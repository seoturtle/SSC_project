import React, { useState, useEffect, useContext } from 'react';
import queryString from 'query-string';
import { useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";
import Header from "../components/header.js";
import First from "../components/menu-tab/first.js";
import Second from "../components/menu-tab/second.js";
import Third from "../components/menu-tab/third.js";
import Fourth from "../components/menu-tab/fourth.js";
import Stock_chart from '../components/stock_chart.js';
import { StockContext } from "../store/stock_Item";
import '../css/stock_main.css';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';

function Stock_main({location}) {
  const [cookie, setCookie, removeCookie] = useCookies('["jwt"]');
  const [activeTab, SetActiveTab] = useState(0);
  const [color, setColor] = useState(0);
  const [stock, setStock] =useState([])
  const { setStoreCode, setStoreName, setStoreFav } = useContext(StockContext)
  const { name, code } = queryString.parse(location.search);
  const [favCheck, setFavCheck] = useState();
  const decode = jwtDecode(cookie.jwt);
  const [delay, setDelay] = useState()
  const [option, setOption] = useState()

  useEffect(() => {
    setStoreCode(code);
    setStoreName(name);

    axios.post("http://localhost:3002/stock_back/graph_header", {code: code})
    .then(res => {
      setStock(res.data.result)
    })
  }, [])

  const favorite = () => {
    axios.post("http://localhost:3002/stock_back/favorite", {code: code, idx: decode.idx})
    setFavCheck(1)
    setStoreFav(1)
  }
  const favorite_delete = () => {
    axios.post("http://localhost:3002/stock_back/favorite_delete", {code: code, idx: decode.idx})
    setFavCheck(0)
    setStoreFav(0)
  }

  useEffect(() => {
    axios.post("http://localhost:3002/stock_back/favorite_check", {code: code, idx: decode.idx})
    .then(res => {
      if(res.data.result == 1){
        setFavCheck(res.data.result);
      }
    })

    setTimeout(() => {
      setDelay(1);
    }, 1)
  }, [])


  const clickHandler = (id) => {
    setColor(id);
    SetActiveTab(id)
  }

      return (
        <div className="stock_main">
          <Header />
          <div className="main">
            <div className="stock_graph">
              <div className="graph_title">
                <div className="graph_title_left">
                  <h2 className="name">{name}</h2>
                  <span className="code">{code}</span>
                  <span className="type">{stock != 0 && stock[0].stock_class}</span>
                </div>
                <div className="graph_title_right">
                  <input type="submit" style={{marginRight:"10px"}} value="버튼"></input>
                  {favCheck == 1 ? <input type="submit" onClick={favorite_delete} className="favorite" value="관심중"></input> : <input type="submit" onClick={favorite} className="favorite" value="관심"></input> }
                </div>
              </div>
              <div style={{padding: "50px 0"}}>
              {delay == 1 &&
                <Stock_chart />
              }
              </div>  
            </div>
            <div className="stock_info">
              <div className="info_button">
                <button onClick={() => clickHandler(0)} type="button">
                  <div className={color===0 ? "button_img1_clicked" : "button_img1"}> {/* 아이콘 1*/}
                  </div>
                </button>
                <button onClick={() => clickHandler(1)} type="button">
                  <div className={color===1 ? "button_img2_clicked" : "button_img2"}> {/* 아이콘 2*/}
                  </div>
                </button>
                <button onClick={() => clickHandler(2)} type="button">
                  <div className={color===2 ? "button_img3_clicked" : "button_img3"}> {/* 아이콘 3*/}
                  </div>
                </button>
                <button onClick={() => clickHandler(3)} type="button">
                  <div className={color===3 ? "button_img4_clicked" : "button_img4"}> {/* 아이콘 4*/}
                  </div>
                </button>
              </div>
              <div className="info_detail">
                {
                {
                  0 : <First />,
                  1 : <Second />,
                  2 : <Third />,
                  3 : <Fourth />
                }[activeTab]
                }
              </div>
            </div>
          </div>
        </div>
      );
    }

export default Stock_main;