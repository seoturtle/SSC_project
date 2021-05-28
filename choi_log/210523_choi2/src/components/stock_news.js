import React, { useState, useEffect, useContext } from 'react';
import { StockContext } from "../store/stock_Item";
import { Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import '../css/stock_news.css'

function Stock_news() {
    const { storeCode, setStoreCode, storeName } = useContext(StockContext)
    const [stock_news, setStock_news] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3002/search/news", {
			method: "POST",
			body: JSON.stringify({
				code: storeCode
			}),
			headers: {
				"Content-Type": "application/json"
			}
			})
			.then(res=>res.json())
            .then(res => {
				setStock_news(res.result);
            })
    }, [])

    useEffect(() => {
        console.log(stock_news)
    }, [stock_news])
    return(
            <div className="stock_news">
                <section className="app-content">
                    <div className="stock-issue">
                        <section className="head stock">
                            <h3 className="stockissue-title">{storeName}</h3>
                        </section>
                        <section className="issue-wrap">
                            {stock_news == 0 ? <div></div> : stock_news.items.map(news => (
                            <div key={news.title} className="main-contents">
                            <div className="market-issue-item">
                                <h3 onClick={() => window.open(`${news.link}`, '_blank')} dangerouslySetInnerHTML={ {__html: news.title} } className="issue-title"></h3>
                                <div className="issue-bottom">
                                    <span className="source"></span>
                                    <span className="date">{ new Date(news.pubDate).toLocaleDateString() } { new Date(news.pubDate).toLocaleTimeString() }</span>
                                </div>
                            </div>
                        </div>
                                ))}
                        </section>
                    </div>
                </section>
            </div>
        );  
}

export default Stock_news;