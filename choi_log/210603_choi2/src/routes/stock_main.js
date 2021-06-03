import React, { useState, useEffect, useContext } from 'react';
import queryString from 'query-string';
import { useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";
import Header from "../components/header.js";
import First from "../components/menu-tab/first.js";
import Second from "../components/menu-tab/second.js";
import Third from "../components/menu-tab/third.js";
import Fourth from "../components/menu-tab/fourth.js";
import { StockContext } from "../store/stock_Item";
import '../css/stock_main.css';
import axios from 'axios';
import HighStock from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import $ from 'jquery';
window.$ = $;

HighStock.setOptions({
  lang: {
      decimalPoint: '.',
      thousandsSep: ',',
      loading: 'Loading...',
      months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
      shortWeekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
      shortMonths: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        },
  global: {
          useUTC: false
  }
});


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
    setOption({
      chart: {
        height: (9 / 16 * 100) + '%',
       },
      rangeSelector: {
          buttons: [
              {type: 'week',count: 1,text: '1주'}, 
              {type: 'month',count: 1,text: '1달'},
              {type: 'year',count: 1,text: '1년'}, 
              {type: 'all',count: 1,text: '전체'}
          ],
          selected: 2,
          inputEnabled: true
      },
      xAxis: {
        type: 'datetime',
        labels: {
          format: '{value:%Y-%m-%d}',
        },
      },
    yAxis: [
      {
        labels: {
          align: "right",
          format: '{value:,.0f}',
          x: -3
        },
        height: "60%",
        lineWidth: 2,
        resize: {
          enabled: true
        }
      },
      {
        labels: {
          align: "right",
          format: '{value:,.0f}',
          x: -3
        },
        title: {
          text: "거래량"
        },
        top: "65%",
        height: "35%",
        offset: 0,
        lineWidth: 2
      }
    ],
  
    tooltip: {
      split: true,
      formatter: function() {
        var s = HighStock.dateFormat('%Y.%m.%d', this.x)
        $.each(this.points, function(i, p){
          if (p.series.type == 'candlestick'){
            s += ('<br />시가 : '+HighStock.numberFormat(p.point.open, 0) + '<br />고가 : '+HighStock.numberFormat(p.point.high, 0) + '<br />저가 : '+HighStock.numberFormat(p.point.low, 0) + '<br />종가 : '+HighStock.numberFormat(p.point.close, 0))
          }
          if (p.series.type == 'column'){
            s += ('<br />거래량 : '+ HighStock.numberFormat(this.y, 0))
          }
        })
        return s;
      },
    },
    plotOptions: {
      candlestick: {
          color: '#0A7DF2',
          upColor: '#EE3739',
          lineColor: '#0A7DF2',
          upLineColor: '#EE3739'
      },
      column: {
        color: 'grey'
      }
      },
    series: [
      {
        type: "candlestick",
        name: "일봉",
        data: (function () {
          var chartdata = [];
          axios.post('http://localhost:3002/search/stock_chart', {code: code})
          .then(res => {
            $.each(res.data, function(i, item){
              const items = item._attributes.data.split('|')
              const itemsDate = items[0].slice(0,4) + '.' + items[0].slice(4, 6) + '.' + items[0].slice(6,8);
              const items2 = item._attributes.data.split('|').map(Number)
              const date = new Date(itemsDate).getTime()
              if (items2[1] == 0){
                chartdata.push([date, items2[4], items2[4], items2[4], items2[4]]);
              }else{
                chartdata.push([date, items2[1], items2[2], items2[3], items2[4]]);
              }
            });
          })
          return chartdata;
        })()
      },
      {
        type: "column",
        name: "거래량",
        data: (function () {
          var columndata = [];
          axios.post('http://localhost:3002/search/stock_chart', {code: code})
          .then(res => {
            $.each(res.data, function(i, item){
              const items = item._attributes.data.split('|')
              const itemsDate = items[0].slice(0,4) + '.' + items[0].slice(4, 6) + '.' + items[0].slice(6,8);
              const items2 = item._attributes.data.split('|').map(Number)
              const date = new Date(itemsDate).getTime()
              columndata.push([date, items2[5]]);
            });
          })
          return columndata;
        })(),
        yAxis: 1
      }
    ]
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
    }, 2000)
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
                <HighchartsReact
                  highcharts={HighStock}
                  constructorType={"stockChart"}
                  options={option}
                />
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