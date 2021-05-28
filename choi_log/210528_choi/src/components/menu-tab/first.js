import React, { useEffect, useState, useContext } from 'react';
import { StockContext } from "../../store/stock_Item";
import queryString from 'query-string';
import '../../css/menu-tab_css/first.css';


function FirstDetail() {
    return(
        <div className="First_first">
            <div className="market-summary">
                <div className="index-snapshot">
                    <div className= "market-header">
                        <h2 className="title">증시현황</h2>
                    </div>
                    <div className="content-wrap">
                        <div className="kospi">
                            <div className="price-info">
                                <h4 className="index-name">코스피</h4>
                                <p className="current-price">3,168.43</p>
                            </div>
                            <div className="content">
                                <div className="kospi-chart"></div>
                            </div>
                        </div>
                        <div className="kosdaq">
                            <div className="price-info">
                                <h4 className="index-name">코스닥</h4>
                                <p className="current-price">966.06</p>
                            </div>
                            <div className="content">
                                <div className="kosdaq-chart"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-new">
                    <div className= "market-header">
                        <h2 className="title">주요뉴스</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SecondDetail() {
    const context = useContext(StockContext)
        return(
            <div className="First_second">
                특징종목 입니다
            </div>
        );
    }

function First() {
    const [color, setColor] = useState(0);
    const [activeTab, SetActiveTab] = useState(0);
    const context = useContext(StockContext)

    const clickHandler = (id) => {
        setColor(id);
        SetActiveTab(id)
      }
        return (
            <div className="first">
                <ol className="menu">
                    <li onClick={() => clickHandler(0)} className={color===0 ? "menu_tab_clicked" : "menu_tab"}>
                        뉴스
                    </li>
                    <li onClick={() => clickHandler(1)} className={color===1 ? "menu_tab_clicked" : "menu_tab"}>
                        특징종목
                    </li>
                </ol>
                <div>
                {
                {
                  0 : <FirstDetail />,
                  1 : <SecondDetail />         
                }[activeTab]
                }
                </div>
            </div>
        );
    }

export default First;