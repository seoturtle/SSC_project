import React, { useState, useEffect, useContext } from 'react';
import { StockContext } from "../store/stock_Item";
import { Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import '../css/stock_news.css'
import InfiniteScroll from 'react-infinite-scroll-component';

function Stock_news() {
    const { storeCode, setStoreCode, storeName } = useContext(StockContext)
    const [stock_news, setStock_news] = useState([]);
    const [index, setIndex] = useState(30);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (!isFetching) return;
        fetchMoreListItems();
    }, [isFetching]);

    const handleScroll = () => {
        if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
        )
        return;
        setIsFetching(true);
    };

    const fetchMoreListItems = () => {
        setTimeout(() => {
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
				setStock_news(res.result.items.slice(0, index));
                console.log(res.result.items)
                setIndex(index+10)
                setIsFetching(false)
            })
        setIsFetching(false);
        }, 2000);
    };

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
				setStock_news(res.result.items.slice(0,20));
            })
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    const fetchData = () => {
        console.log("하이")
        // setTimeout(() =>{
        //     fetch("http://localhost:3002/search/news", {
		// 	method: "POST",
		// 	body: JSON.stringify({
		// 		code: storeCode
		// 	}),
		// 	headers: {
		// 		"Content-Type": "application/json"
		// 	}
		// 	})
		// 	.then(res=>res.json())
        //     .then(res => {
		// 		setStock_news(res.result.items.slice(0, index));
        //         console.log(res.result.items)
        //         setIndex(index+10)
        //         setIsFetching(false)
        //     })
        // }, 1000)
    }

    useEffect(() => {
        // console.log(stock_news)
    }, [stock_news])
    return(
            <div className="stock_news">
                <section className="app-content">
                    <div className="stock-issue">
                        <section className="head stock">
                            <h3 className="stockissue-title">{storeName}</h3>
                        </section>
                        <section className="issue-wrap">
                            {stock_news == 0 ? <div></div> : stock_news.map((news, index) => (
                                <div key={index} className="main-contents">
                                <div className="market-issue-item">
                                    <h3 onClick={() => window.open(`${news.link}`, '_blank')} dangerouslySetInnerHTML={ {__html: news.title} } className="issue-title"></h3>
                                    <div className="issue-bottom">
                                        <span className="source"></span>
                                        <span className="date">{ new Date(news.pubDate).toLocaleDateString() } { new Date(news.pubDate).toLocaleTimeString() }</span>
                                    </div>
                                </div>
                            </div>
                                    ))}
                            {isFetching && "loading"}
                        </section>
                    </div>
                </section>
            </div>
        );  
}

export default Stock_news;