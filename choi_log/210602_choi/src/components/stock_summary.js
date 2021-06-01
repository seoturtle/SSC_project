import React, { useState, useEffect, useContext } from 'react';
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import '../css/stock_summary.css';
import { StockContext } from "../store/stock_Item";
import axios from 'axios';

function Stock_summary() {
    const { storeCode, setStoreCode, storeName } = useContext(StockContext)
    const [stock, setStock] = useState([]);
    const [select, setSelect] = useState("분기")

    useEffect(() => {
        axios.post("http://15.164.94.207:3002/stock_back/graph_header", {code: storeCode})
        .then(res => {
          setStock(res.data.result)
        })
      }, [])

        return(
            <div className="stock_summary">
                <div className="summary_title">
                    <div className="name">{storeName}</div>
                    <div className="title_div">
                        <div className="type">{stock != 0 && stock[0].stock_class}</div>
                        <div className="code">{storeCode}</div>
                    </div>
                </div>
                <div className="summary_main">
                    <div>
                        <div className="main_name">시가총액</div>
                        <div className="main_value">123</div>
                    </div>
                    <div>
                        <div className="main_name">주식수</div>
                        <div className="main_value">123</div>
                    </div>
                    <div>
                        <div className="main_name">산업군</div>
                        <div className="main_value">123</div>
                    </div>
                    <div>
                        <div className="main_name">52주 최고</div>
                        <div className="main_value">123</div>
                    </div>
                    <div>
                        <div className="main_name">52주 최저</div>
                        <div className="main_value">123</div>
                    </div>
                </div>
                <div className="summary_bot">
                    <div className="summary_bot_head">
                        <div>
                            <button className={select=="분기" ? "black" : ""} onClick={(e) => setSelect("분기")}>분기매출</button>|<button className={select=="연간" ? "black" : ""} onClick={(e) => setSelect("연간")}>연간매출</button>
                        </div>
                        <div className="head_content">2020.12기준</div>
                    </div>
                    {select=="분기" ? <Quarter /> : <Years />}
                </div>
            </div>
        );
    }

    function Years() {
        return(
            <div className="bot_sales">
                <div className="bot_div">
                    <div>최근 매출액</div>
                    <div>123</div>
                </div>
                <div className="bot_div">
                    <div>최근 영업이익</div>
                    <div>123</div>
                </div>
                <div className="bot_div">
                    <div>최근 순이익</div>
                    <div>123</div>
                </div>
            </div>
        )
    }

    function Quarter() {
        return(
            <div className="bot_sales">
                <div className="bot_div">
                    <div>최근 매출액</div>
                    <div>456</div>
                </div>
                <div className="bot_div">
                    <div>최근 영업이익</div>
                    <div>456</div>
                </div>
                <div className="bot_div">
                    <div>최근 순이익</div>
                    <div>456</div>
                </div>
            </div>
        )
    }

export default Stock_summary;