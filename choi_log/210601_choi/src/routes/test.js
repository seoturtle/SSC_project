import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import HighStock from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import axios from 'axios'
import $ from 'jquery';
window.$ = $;

function Test() {
  const [delay, setDelay] = useState()
  const [a, setA] = useState([])
  // const [option, setOption] = useState({
  //     rangeSelector: {
  //         buttons: [
  //             {type: 'hour',count: 1,text: '1h'}, 
  //             {type: 'day',count: 1,text: '1d'}, 
  //             {type: 'all',count: 1,text: 'All'}
  //         ],
  //         selected: 2,
  //         inputEnabled: true
  //     },
  
  //   yAxis: [
  //     {
  //       labels: {
  //         align: "right",
  //         x: -3
  //       },
  //       title: {
  //         text: "OHLC"
  //       },
  //       height: "60%",
  //       lineWidth: 2,
  //       resize: {
  //         enabled: true
  //       }
  //     },
  //     {
  //       labels: {
  //         align: "right",
  //         x: -3
  //       },
  //       title: {
  //         text: "Volume"
  //       },
  //       top: "65%",
  //       height: "35%",
  //       offset: 0,
  //       lineWidth: 2
  //     }
  //   ],
  
  //   tooltip: {
  //     split: true
  //   },
  //   plotOptions: {
  //     candlestick: {
  //         downColor: 'blue',
  //         upColor: 'red'
  //     }
  //     },
  //   series: [
  //     {
  //       type: "candlestick",
  //       data: (function () {
  //         var chartdata = [];
  //         axios.post('http://localhost:3002/search/test')
  //         .then(res => {
  //           $.each(res.data, function(i, item){
  //             chartdata.push([item.date*100, item.open, item.high, item.low, item.close]);
  //           });
  //         })
  //         return chartdata;
  //       })()
  //     },
  //     {
  //       type: "column",
  //       data: (function () {
  //         var columndata = [];
  //         axios.post('http://localhost:3002/search/test')
  //         .then(res => {
  //           $.each(res.data, function(i, item){
  //             columndata.push([item.date*100, item.volume]);
  //           });
  //         })
  //         return columndata;
  //       })(),
  //       yAxis: 1
  //     }
  //   ]
  // })

  useEffect(() => {
    // setTimeout(() => {
    //   setDelay(1);
    // }, 1000)
    // $.getJSON('https://poloniex.com/public?command=returnChartData&currencyPair=BTC_ETH&start=1455699200&end=9999999999&period=14400', function (data) {
    //       console.log(data);
		// 		})
    axios.post('http://localhost:3002/search/test')
    .then(res => {
      $.each(res.data, function(i, item){
        const items = item._attributes.data.split('|')
        const itemsDate = items[0].slice(0,4) + '.' + items[0].slice(4, 6) + '.' + items[0].slice(6,8);
        const items2 = item._attributes.data.split('|').map(Number)
        const date = new Date(itemsDate).getTime()
        setA([date, items2[1], items2[2], items2[3]])
      });
    })
  }, [])

  useEffect(() => {
    console.log(a)
  }, [a])


  return (
    <div className="App">
      {/* {delay == 1 &&
        <HighchartsReact
          highcharts={HighStock}
          constructorType={"stockChart"}
          options={option}
        />
      } */}
    </div>
  );
}

export default Test;
