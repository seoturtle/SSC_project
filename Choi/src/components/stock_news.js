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
                                    <h3 className="issue-title">출근전(戰) 한미 정상회담 D-1, 반도체 회의 임박! 반도체 장비주 준비하자!</h3>
                                    <div className="issue-bottom">
                                        <span className="source">머니투데이</span>
                                        <span className="date">한 시간 전</span>
                                    </div>
                                </div>
                            </div>
                            <div className="main-contents">
                                <div className="market-issue-item">
                                    <h3 className="issue-title">외국인 매도세 주춤해지자 코스피 반등....삼바 4%↑</h3>
                                    <div className="issue-bottom">
                                        <span className="source">머니투데이</span>
                                        <span className="date">두 시간 전</span>
                                    </div>
                                </div>
                            </div>
                            <div className="main-contents">
                                <div className="market-issue-item">
                                    <h3 className="issue-title">최주선 삼성디스플 사장 "메타버스 시대, 자발광 디스플레이로 미래 연다"</h3>
                                    <div className="issue-bottom">
                                        <span className="source">뉴시스</span>
                                        <span className="date">세 시간 전</span>
                                    </div>
                                </div>
                            </div>
                            <div className="main-contents">
                                <div className="market-issue-item">
                                    <h3 className="issue-title">SK하이닉스, 국내 파운드리업체 '키파운드리' 완전인수 추진</h3>
                                    <div className="issue-bottom">
                                        <span className="source">뉴시스</span>
                                        <span className="date">네 시간 전</span>
                                    </div>
                                </div>
                            </div>
                            <div className="main-contents">
                                <div className="market-issue-item">
                                    <h3 className="issue-title">상생 택한 삼성 "사내식당 급식거래 자진시정"</h3>
                                    <div className="issue-bottom">
                                        <span className="source">매일경제</span>
                                        <span className="date">네 시간 전</span>
                                    </div>
                                </div>
                            </div>
                            <div className="main-contents">
                                <div className="market-issue-item">
                                    <h3 className="issue-title">삼성, 사내식당 급식거래 관련 공정위에 '동의의결' 신청</h3>
                                    <div className="issue-bottom">
                                        <span className="source">머니투데이</span>
                                        <span className="date">다섯 시간 전</span>
                                    </div>
                                </div>
                            </div>
                            <div className="main-contents">
                                <div className="market-issue-item">
                                    <h3 className="issue-title">삼성 반도체 둘러본 野 "이재용 사면, 국가발전 관련된 문제"</h3>
                                    <div className="issue-bottom">
                                        <span className="source">매일경제</span>
                                        <span className="date">다섯 시간 전</span>
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