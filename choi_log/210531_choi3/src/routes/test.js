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
  const [option, setOption] = useState({
      rangeSelector: {
          buttons: [
              {type: 'hour',count: 1,text: '1h'}, 
              {type: 'day',count: 1,text: '1d'}, 
              {type: 'all',count: 1,text: 'All'}
          ],
          selected: 2,
          inputEnabled: true
      },
  
    yAxis: [
      {
        labels: {
          align: "right",
          x: -3
        },
        title: {
          text: "OHLC"
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
          x: -3
        },
        title: {
          text: "Volume"
        },
        top: "65%",
        height: "35%",
        offset: 0,
        lineWidth: 2
      }
    ],
  
    tooltip: {
      split: true
    },
    plotOptions: {
      candlestick: {
          downColor: 'blue',
          upColor: 'red'
      }
      },
    series: [
      {
        type: "candlestick",
        data: (function () {
          var chartdata = [];
          axios.post('http://localhost:3002/search/test')
          .then(res => {
            $.each(res.data, function(i, item){
              chartdata.push([item.date*100, item.open, item.high, item.low, item.close]);
            });
          })
          return chartdata;
        })()
      },
      {
        type: "column",
        data: (function () {
          var columndata = [];
          axios.post('http://localhost:3002/search/test')
          .then(res => {
            $.each(res.data, function(i, item){
              columndata.push([item.date*100, item.volume]);
            });
          })
          return columndata;
        })(),
        yAxis: 1
      }
    ]
  })

  useEffect(() => {
    setTimeout(() => {
      setDelay(1);
    }, 1000)
  }, [])


  return (
    <div className="App">
      {delay == 1 &&
        <HighchartsReact
          highcharts={HighStock}
          constructorType={"stockChart"}
          options={option}
        />
      }
    </div>
  );
}

export default Test;
