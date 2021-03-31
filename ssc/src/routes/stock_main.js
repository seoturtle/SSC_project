import React, { Component } from 'react';
import Header from "../components/header.js";
import '../css/stock_main.css';

class stock_main extends Component {
    render() {
      return (
        <div className="stock_main">
          <Header></Header>
          <div className="main">
            <div className="stock_graph">

            </div>
            <div className="stock_info">
              <div className="info_button">
                <button type="button">
                  <div className="button_img1"> {/* 아이콘 1*/}
                  </div>
                </button>
                <button type="button">
                  <div className="button_img2"> {/* 아이콘 2*/}
                  </div>
                </button>
                <button type="button">
                  <div className="button_img3"> {/* 아이콘 3*/}
                  </div>
                </button>
                <button type="button">
                  <div className="button_img4"> {/* 아이콘 4*/}
                  </div>
                </button>
              </div>
              <div className="info_detail">
                  
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default stock_main;