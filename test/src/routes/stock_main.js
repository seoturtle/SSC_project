import React, { useState } from 'react';
// import { Link } from "react-router-dom";
import Header from "../components/header.js";
import First from "../components/menu-tab/first.js";
import Second from "../components/menu-tab/second.js";
import Third from "../components/menu-tab/third.js";
import Fourth from "../components/menu-tab/fourth.js";
import '../css/stock_main.css';

const obj = {
  0: <First />,
  1: <Second />,
  2: <Third />,
  3: <Fourth />
}

function Stock_main() {
  let [activeTab, SetActiveTab] = useState(0);
  let [color, setColor] = useState(0);

  const clickHandler = (id) => {
    setColor(id);
    SetActiveTab(id)
  }

      return (
        <div className="stock_main">
          <Header />
          <div className="main">
            <div className="stock_graph">

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
                  {obj[activeTab]}
              </div>
            </div>
          </div>
        </div>
      );
    }

export default Stock_main;