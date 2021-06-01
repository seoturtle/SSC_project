import React, { useEffect, useState, useContext } from 'react';
import { StockContext } from "../store/stock_Item";
import queryString from 'query-string';
import '../css/stock_major_news.css';
import axios from 'axios';


function Stock_major_news() {
    const [majorNews, setMajorNews] = useState([]);
    useEffect(() => {
        axios.post('http://15.164.94.207:3002/search/major_news')
        .then(res => {
            console.log(res.data.result)
            setMajorNews(res.data.result.items)
        })
    }, [])
    
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
                                <div className="kospi-chart"><img src={'https://ssl.pstatic.net/imgfinance/chart/mobile/day/KOSPI_search.png'} /></div>
                            </div>
                        </div>
                        <div className="kosdaq">
                            <div className="price-info">
                                <h4 className="index-name">코스닥</h4>
                                <p className="current-price">966.06</p>
                            </div>
                            <div className="content">
                                <div className="kosdaq-chart"><img src={'https://ssl.pstatic.net/imgfinance/chart/mobile/day/KOSDAQ_search.png'} /></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-new">
                    <div className= "market-header">
                        <h2 className="title">주요뉴스</h2>
                    </div>
                    {majorNews !=0 && majorNews.map((list, index) => (
                        <div key={index}>
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