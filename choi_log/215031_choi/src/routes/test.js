import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import HighStock from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import $ from 'jquery';
window.$ = $;

let mockOptions = {
    rangeSelector: {
        buttons: [
            {type: 'hour',count: 1,text: '1h'}, 
            {type: 'day',count: 1,text: '1d'}, 
            {type: 'all',count: 1,text: 'All'}
        ],
        selected: 2,
        inputEnabled: true
    },

  title: {
    text: "AAPL Historical"
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
        $.getJSON('https://poloniex.com/public?command=returnChartData&currencyPair=BTC_ETH&start=1455699200&end=1460000000&period=14400', function (data) {
            $.each(data, function(i, item){
                console.log(item)
                chartdata.push([item.date*1000, item.open, item.high, item.low, item.close]);
            });
        })
        return chartdata;
      })()
    },
    {
      type: "column",
      data: (function () {
        var columndata = [];
        $.getJSON('https://poloniex.com/public?command=returnChartData&currencyPair=BTC_ETH&start=1455699200&end=1460000000&period=14400', function (data) {
            $.each(data, function(i, item){
                columndata.push([item.date*1000, item.volume]);
            });
        })
        return columndata;
      })(),
      yAxis: 1
    }
  ]
};

// const transformChartData = (options, array) => {
//   const dataLength = array.length;

//   for (var i = 0; i < dataLength; i += 1) {
//     options.series[0].data.push([
//       array[i][0], // the date
//       array[i][1], // open
//       array[i][2], // high
//       array[i][3], // low
//       array[i][4] // close
//     ]);

//     options.series[1].data.push([
//       array[i][0], // the date
//       array[i][5] // the volume
//     ]);
//   }
//   return options;
// };

function Test() {
  // const [data, setData] = useState({ options: {} });
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     const fetchedData = mockData; // simulate xhr request
  //     const newOptions = transformChartData(mockOptions, fetchedData);
  //     setData({ options: newOptions });
  //     setIsLoading(false);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="App">
      {
        <HighchartsReact
          highcharts={HighStock}
          constructorType={"stockChart"}
          options={mockOptions}
        />
      }
    </div>
  );
}

export default Test;
