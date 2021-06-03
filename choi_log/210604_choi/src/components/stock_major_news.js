import React, { useEffect, useState, useContext } from 'react';
import { StockContext } from "../store/stock_Item";
import queryString from 'query-string';
import '../css/stock_major_news.css';
import axios from 'axios';
import $ from 'jquery'
window.$ = $;


function Stock_major_news() {
    const [majorNews, setMajorNews] = useState([]);
    const [kospi, setKospi] = useState();
    const [kosdaq, setKosdaq] = useState();

    useEffect(() => {
        axios.post('http://localhost:3002/search/major_news')
        .then(res => {
            console.log(res.data.result)
            setMajorNews(res.data.result.items)
        })

        axios.post('http://localhost:3002/stock_back/kospi')
        .then(res => {
            const items = res.data._attributes.data.split('|')
            const itemsKospi = items[4].slice(0, -2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.' + items[4].slice(-2)
            setKospi(itemsKospi)
        })
        axios.post('http://localhost:3002/stock_back/kosdaq')
        .then(res => {
            const items = res.data._attributes.data.split('|')
            const itemsKosdaq = items[4].slice(0, -2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.' + items[4].slice(-2)
            setKosdaq(itemsKosdaq)
        })
    }, [])
    
    return(
        <div className="stock_major_news">
            <div className="market-summary">
                <div className="index-snapshot">
                    <div className= "market-header">
                        <h2 className="title">증시현황</h2>
                        <p className="date">{function() {
                            let today = new Date();  
                            let year = today.getFullYear();
                            let month = today.getMonth() + 1;
                            let date = today.getDate();
                            return year+'.'+month+'.'+date;
                        }()}기준</p>
                    </div>
                    <div className="content-wrap">
                        <div className="kospi">
                            <div className="price-info">
                                <h4 className="index-name">코스피</h4>
                                <p className="current-price">{kospi}</p>
                            </div>
                            <div className="content">
                                <div className="kospi-chart"><img src={'https://ssl.pstatic.net/imgfinance/chart/mobile/day/KOSPI_search.png'} /></div>
                            </div>
                        </div>
                        <div className="kosdaq">
                            <div className="price-info">
                                <h4 className="index-name">코스닥</h4>
                                <p className="current-price">{kosdaq}</p>
                            </div>
                            <div className="content">
                                <div className="kosdaq-chart"><img src={'https://ssl.pstatic.net/imgfinance/chart/mobile/day/KOSDAQ_search.png'} /></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-new">
                    <div className= "market-header2">
                        <h2 className="title">주요뉴스</h2>
                    </div>
                    {majorNews !=0 && majorNews.map((list, index) => (
                        <div key={index} className="market_news_wrap">
                            <div>
                                <h3 onClick={() => window.open(`${list.link}`, '_blank')} dangerouslySetInnerHTML={ {__html: list.title} } className="issue-title"></h3>
                                <div className="issue-bottom">
                                    <span className="source"></span>
                                    <span className="date">{ new Date(list.pubDate).toLocaleDateString() } { new Date(list.pubDate).toLocaleTimeString() }</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Stock_major_news;