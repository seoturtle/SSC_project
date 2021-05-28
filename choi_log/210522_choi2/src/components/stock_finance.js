import React, { useState, useEffect, useContext } from 'react';
import { StockContext } from "../store/stock_Item";
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import '../css/stock_finance.css'

function Stock_finance() {
    const { storeCode, setStoreCode, storeName } = useContext(StockContext)

    return(
            <div className="stock_finance">
                <section className="app-content">
                    <div className="financial-information">
                        <div className="financial-information-header">
                            <p className="title">{storeName}</p>
                            <div className="financial-information-tab-group">
                                <button className="btn-quarter">분기</button>
                                <button className="btn-year active">연간</button>
                            </div>
                        </div>
                        <section className="financial-information-section">
                            <table className="financial-information-table">
                                <tbody>
                                    <td className="name">
                                        <tr className="contents"> </tr>
                                        <tr className="contents">매출액(억)</tr>
                                        <tr className="contents">영업이익(억)</tr>
                                        <tr className="contents">영업이익률(%)</tr>
                                        <tr className="contents">당기순이익(억)</tr>
                                        <tr className="contents">당기순이익[지배](억)</tr>
                                        <tr className="contents">순이익률(%)</tr>
                                        <tr className="contents">자산총계(억)</tr>
                                        <tr className="contents">부채총계(억)</tr>
                                        <tr className="contents">자본총계(억)</tr>
                                        <tr className="contents">부채비율(%)</tr>
                                        <tr className="contents">유동비율(%)</tr>
                                        <tr className="contents">자본금(억)</tr>
                                        <tr className="contents">영업활동현금흐름(억)</tr>
                                        <tr className="contents">투자활동현금흐름(억)</tr>
                                        <tr className="contents">재무활동현금흐름(억)</tr>
                                        <tr className="contents">EPS(원)</tr>
                                        <tr className="contents">PER(배)</tr>
                                        <tr className="contents">PBR(배)</tr>
                                        <tr className="contents">ROE(%)</tr>
                                        <tr className="contents">ROA(%)</tr>
                                    </td>
                                    <td className="value">
                                        <tr className="contents">2020/03</tr>
                                        <tr className="contents">553,252</tr>
                                        <tr className="contents">64,473</tr>
                                        <tr className="contents">11.65</tr>
                                        <tr className="contents">48,849</tr>
                                        <tr className="contents">48,896</tr>
                                        <tr className="contents">8.83</tr>
                                        <tr className="contents">3,574,575</tr>
                                        <tr className="contents">910,698</tr>
                                        <tr className="contents">2,663,877</tr>
                                        <tr className="contents">34.19</tr>
                                        <tr className="contents">288.34</tr>
                                        <tr className="contents">8,975</tr>
                                        <tr className="contents">118,299</tr>
                                        <tr className="contents">-85,292</tr>
                                        <tr className="contents">-29,736</tr>
                                        <tr className="contents">720</tr>
                                        <tr className="contents">13.39</tr>
                                        <tr className="contents">1.11</tr>
                                        <tr className="contents">8.29</tr>
                                        <tr className="contents">6.08</tr>
                                    </td>
                                    <td className="value">
                                        <tr className="contents">2020/06</tr>
                                        <tr className="contents">553,252</tr>
                                        <tr className="contents">64,473</tr>
                                        <tr className="contents">11.65</tr>
                                        <tr className="contents">48,849</tr>
                                        <tr className="contents">48,896</tr>
                                        <tr className="contents">8.83</tr>
                                        <tr className="contents">3,574,575</tr>
                                        <tr className="contents">910,698</tr>
                                        <tr className="contents">2,663,877</tr>
                                        <tr className="contents">34.19</tr>
                                        <tr className="contents">288.34</tr>
                                        <tr className="contents">8,975</tr>
                                        <tr className="contents">118,299</tr>
                                        <tr className="contents">-85,292</tr>
                                        <tr className="contents">-29,736</tr>
                                        <tr className="contents">720</tr>
                                        <tr className="contents">13.39</tr>
                                        <tr className="contents">1.11</tr>
                                        <tr className="contents">8.29</tr>
                                        <tr className="contents">6.08</tr>
                                    </td>
                                    <td className="value">
                                        <tr className="contents">2020/09</tr>
                                        <tr className="contents">553,252</tr>
                                        <tr className="contents">64,473</tr>
                                        <tr className="contents">11.65</tr>
                                        <tr className="contents">48,849</tr>
                                        <tr className="contents">48,896</tr>
                                        <tr className="contents">8.83</tr>
                                        <tr className="contents">3,574,575</tr>
                                        <tr className="contents">910,698</tr>
                                        <tr className="contents">2,663,877</tr>
                                        <tr className="contents">34.19</tr>
                                        <tr className="contents">288.34</tr>
                                        <tr className="contents">8,975</tr>
                                        <tr className="contents">118,299</tr>
                                        <tr className="contents">-85,292</tr>
                                        <tr className="contents">-29,736</tr>
                                        <tr className="contents">720</tr>
                                        <tr className="contents">13.39</tr>
                                        <tr className="contents">1.11</tr>
                                        <tr className="contents">8.29</tr>
                                        <tr className="contents">6.08</tr>
                                    </td>
                                    <td className="value">
                                        <tr className="contents">2020/12</tr>
                                        <tr className="contents">553,252</tr>
                                        <tr className="contents">64,473</tr>
                                        <tr className="contents">11.65</tr>
                                        <tr className="contents">48,849</tr>
                                        <tr className="contents">48,896</tr>
                                        <tr className="contents">8.83</tr>
                                        <tr className="contents">3,574,575</tr>
                                        <tr className="contents">910,698</tr>
                                        <tr className="contents">2,663,877</tr>
                                        <tr className="contents">34.19</tr>
                                        <tr className="contents">288.34</tr>
                                        <tr className="contents">8,975</tr>
                                        <tr className="contents">118,299</tr>
                                        <tr className="contents">-85,292</tr>
                                        <tr className="contents">-29,736</tr>
                                        <tr className="contents">720</tr>
                                        <tr className="contents">13.39</tr>
                                        <tr className="contents">1.11</tr>
                                        <tr className="contents">8.29</tr>
                                        <tr className="contents">6.08</tr>
                                    </td>
                                </tbody>
                            </table>
                        </section>
                    </div>
                </section>
            </div>
        );  
}

export default Stock_finance;