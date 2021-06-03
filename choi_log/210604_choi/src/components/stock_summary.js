import React, { useState, useEffect, useContext } from 'react';
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import '../css/stock_summary.css';
import { StockContext } from "../store/stock_Item";
import axios from 'axios';
import $ from 'jquery'
window.$ = $;

function Stock_summary() {
    const { storeCode, setStoreCode, storeName } = useContext(StockContext)
    const [stock, setStock] = useState([]);
    const [stock2, setStock2] = useState([]);
    const [select, setSelect] = useState("분기")
    const [max, setMax] = useState([])

    useEffect(() => {
        axios.post("http://localhost:3002/stock_back/graph_header", {code: storeCode})
        .then(res => {
          setStock(res.data.result)
        })
        axios.post("http://localhost:3002/stock_back/stock_summary", {code: storeCode})
        .then(res => {
            setStock2(res.data)
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
                        <div className="main_name">상장일</div>
                        <div className="main_value">{stock != 0 && stock[0].stock_listed_date}</div>
                    </div>
                    <div>
                        <div className="main_name">시가총액(억)</div>
                        <div className="main_value">{stock2 != 0 && stock2[0].stock_total.slice(0,-8).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                    </div>
                    <div>
                        <div className="main_name">산업군</div>
                        <div className="main_value">{stock2 != 0 && stock2[0].stock_group}</div>
                    </div>
                    <div>
                        <div className="main_name">주식수</div>
                        <div className="main_value">{stock != 0 && stock[0].stock_number.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
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
        const { storeCode, setStoreCode, storeName } = useContext(StockContext)
        const [summary, setSummary] = useState([])

        useEffect(() => {
            axios.post('http://localhost:3002/stock_back/recent_year', {code: storeCode})
            .then(res => {
                setSummary(res.data)
            })
        }, [])
        return(
            <div className="bot_sales">
                <div className="bot_div">
                    <div>최근 매출액(억)</div>
                    <div>{summary != 0 && summary[0].sales.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                </div>
                <div className="bot_div">
                    <div>최근 영업이익(억)</div>
                    <div>{summary != 0 && summary[0].bus_pro.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                </div>
                <div className="bot_div">
                    <div>최근 순이익(억)</div>
                    <div>{summary != 0 && summary[0].net_pro.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                </div>
            </div>
        )
    }

    function Quarter() {
        const { storeCode, setStoreCode, storeName } = useContext(StockContext)
        const [summary, setSummary] = useState([])

        useEffect(() => {
            axios.post('http://localhost:3002/stock_back/recent_quarter', {code: storeCode})
            .then(res => {
                setSummary(res.data)
            })
        }, [])

        return(
            <div className="bot_sales">
                <div className="bot_div">
                    <div>최근 매출액(억)</div>
                    <div>{summary != 0 && summary[0].sales.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                </div>
                <div className="bot_div">
                    <div>최근 영업이익(억)</div>
                    <div>{summary != 0 && summary[0].bus_pro.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                </div>
                <div className="bot_div">
                    <div>최근 순이익(억)</div>
                    <div>{summary != 0 && summary[0].net_pro.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                </div>
            </div>
        )
    }

export default Stock_summary;