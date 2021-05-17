import React, { useState, useEffect, useContext } from 'react';
import { StockContext } from "../store/stock_Item";
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import '../css/stock_news.css'

function Stock_news() {
    const { storeCode, setStoreCode, storeName } = useContext(StockContext)

    return(
            <div className="stock_news">
                <section className="app-content">
                    <div className="stock-issue">
                        <section className="head stock">
                            <h3 className="stockissue-title">{storeName}</h3>
                        </section>
                        <section className="issue-wrap">
                            <div className="main-contents">
                                <div className="market-issue-item">
                                    <h3 className="issue-title">[앤츠랩]"1년 전에 사두걸"...개미가 땅치고 후회하는 이 종목</h3>
                                    <div className="issue-bottom">
                                        <span className="source">중앙일보</span>
                                        <span className="date">한 시간 전</span>
                                    </div>
                                </div>
                            </div>
                            <div className="main-contents">
                                <div className="market-issue-item">
                                    <h3 className="issue-title">[앤츠랩]"1년 전에 사두걸"...개미가 땅치고 후회하는 이 종목</h3>
                                    <div className="issue-bottom">
                                        <span className="source">중앙일보</span>
                                        <span className="date">한 시간 전</span>
                                    </div>
                                </div>
                            </div>
                            <div className="main-contents">
                                <div className="market-issue-item">
                                    <h3 className="issue-title">[앤츠랩]"1년 전에 사두걸"...개미가 땅치고 후회하는 이 종목</h3>
                                    <div className="issue-bottom">
                                        <span className="source">중앙일보</span>
                                        <span className="date">한 시간 전</span>
                                    </div>
                                </div>
                            </div>
                            <div className="main-contents">
                                <div className="market-issue-item">
                                    <h3 className="issue-title">[앤츠랩]"1년 전에 사두걸"...개미가 땅치고 후회하는 이 종목</h3>
                                    <div className="issue-bottom">
                                        <span className="source">중앙일보</span>
                                        <span className="date">한 시간 전</span>
                                    </div>
                                </div>
                            </div>
                            <div className="main-contents">
                                <div className="market-issue-item">
                                    <h3 className="issue-title">[앤츠랩]"1년 전에 사두걸"...개미가 땅치고 후회하는 이 종목</h3>
                                    <div className="issue-bottom">
                                        <span className="source">중앙일보</span>
                                        <span className="date">한 시간 전</span>
                                    </div>
                                </div>
                            </div>
                            <div className="main-contents">
                                <div className="market-issue-item">
                                    <h3 className="issue-title">[앤츠랩]"1년 전에 사두걸"...개미가 땅치고 후회하는 이 종목</h3>
                                    <div className="issue-bottom">
                                        <span className="source">중앙일보</span>
                                        <span className="date">한 시간 전</span>
                                    </div>
                                </div>
                            </div>
                            <div className="main-contents">
                                <div className="market-issue-item">
                                    <h3 className="issue-title">[앤츠랩]"1년 전에 사두걸"...개미가 땅치고 후회하는 이 종목</h3>
                                    <div className="issue-bottom">
                                        <span className="source">중앙일보</span>
                                        <span className="date">한 시간 전</span>
                                    </div>
                                </div>
                            </div>
                            <div className="main-contents">
                                <div className="market-issue-item">
                                    <h3 className="issue-title">[앤츠랩]"1년 전에 사두걸"...개미가 땅치고 후회하는 이 종목</h3>
                                    <div className="issue-bottom">
                                        <span className="source">중앙일보</span>
                                        <span className="date">한 시간 전</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>
            </div>
        );  
}

export default Stock_news;