import React, { useEffect, useState, useContext } from 'react';
import { StockContext } from "../store/stock_Item";
import queryString from 'query-string';
import '../css/stock_major_news.css';


function Stock_major_news() {
    return(
        <div className="stock_major_news">
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

export default Stock_major_news;