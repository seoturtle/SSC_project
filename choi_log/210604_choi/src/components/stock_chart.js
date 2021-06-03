import React, { useState, useEffect, useContext } from 'react';
import { StockContext } from "../store/stock_Item";
import axios from 'axios';
import HighStock from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
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


function Stock_chart() {
  const { setStoreCode, setStoreName, setStoreFav, storeCode } = useContext(StockContext)
  const [delay, setDelay] = useState()
  const [option, setOption] = useState()
  const [status, setStatus] = useState();

  useEffect(() => {
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
          axios.post('http://localhost:3002/search/stock_chart', {code: storeCode})
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
          axios.post('http://localhost:3002/search/stock_chart', {code: storeCode})
          .then(res => {
            $.each(res.data, function(i, item){
              const items = item._attributes.data.split('|')
              const itemsDate = items[0].slice(0,4) + '.' + items[0].slice(4, 6) + '.' + items[0].slice(6,8);
              const items2 = item._attributes.data.split('|').map(Number)
              const date = new Date(itemsDate).getTime()
              columndata.push([date, items2[5]]);
            });
            setStatus(res.status)
          })
          return columndata;
        })(),
        yAxis: 1
      }
    ]
  })

  }, [])

  useEffect(() => {
    if(status==200){
        setTimeout(() => {
            setDelay(1)
        }, 100)
    }
  }, [status])

      return (
        <div className="stock_chart">
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

export default Stock_chart;