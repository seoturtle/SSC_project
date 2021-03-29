import React, { Component } from 'react';
import Header from "../components/header.js";
import '../css/main.css';

class main extends Component {
    render() {
      return (
        <div className="main">
          <Header></Header>
          <div id="container">
            <div className="korea_index">
                <div className="img_kospi">코스피</div>
                <div className="img_kosdaq">코스닥</div>
            </div>
            <div className="main_four_index">
                <div className="img_four_index">4대 지표</div>
            </div>
            <div className="main_invest">
                <div className="img_invest">투자 동향</div>
            </div>
        </div>
        </div>
      );
    }
}

export default main;