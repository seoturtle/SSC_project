import React, { useState, useEffect, useContext } from 'react';
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import '../css/stock_summary.css';
import { StockContext } from "../store/stock_Item";

function Stock_summary() {
    const { storeCode, setStoreCode, storeName } = useContext(StockContext)
        return(
            <div className="stock_summary">
                <section className="app-content">
                    <div id ="stock-summary">
                        <section>
                            <section id="company-information">
                                <div className="header-contents">
                                    <div calss="basic-information">
                                        <div className="text-contents">
                                            <h3 className="company-name">{storeName}</h3>
                                            <div className="market-data">
                                                <span className="market-type">코스피</span>
                                                <span className="stock-code">{storeCode}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="information-contets">
                                    <div>
                                        <div>
                                            <p className="title">시가총액</p>
                                            <p className="contents">469조 2,249억</p>
                                        </div>
                                        <div>
                                            <p className="title">기업순위</p>
                                            <p className="contents">코스피 1위</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <p className="title">주식수</p>
                                            <p className="contents">5,969,782,550주</p>
                                        </div>
                                        <div>
                                            <p className="title">외국인비중</p>
                                            <p className="contents">54.07%</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <p className="title">산업군</p>
                                            <p className="contents">IT</p>
                                        </div>
                                        <div>
                                            <p className="title">세부산업군</p>
                                            <p className="contents">반도체및반도체장비</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <p className="title">52주 최저</p>
                                            <p className="contents">47,600</p>
                                        </div>
                                        <div>
                                            <p className="title">52주 최고</p>
                                            <p className="contents">96,800</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section>
                                
                            </section>
                        </section>
                    </div>
                </section>
            </div>
        );
    }

export default Stock_summary;