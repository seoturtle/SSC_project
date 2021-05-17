import React, { useState, useEffect, useContext } from 'react';
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import '../../css/menu-tab_css/second.css';
import { StockContext } from "../../store/stock_Item";
import Stock_news from "../stock_news"
import Stock_finance from "../stock_finance"


function FirstDetail() {
    const { storeCode, setStoreCode, storeName } = useContext(StockContext)
        return(
            <div className="Second_first">
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

function FourthDetail(){
    const [cookie] = useCookies('["jwt"]');
    const [boolean, setBoolean] = useState(false);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("");
    const decode = jwtDecode(cookie.jwt);

    useEffect(() => {
        fetch("http://localhost:3002/stock_back/memo2", {
            method: "POST",
            body: JSON.stringify({
                midx: decode.idx,
            }),
            headers: {
              "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => {
            setText(res.result[0].content);
            res.result[0].content !="" ? setBoolean(true) : setBoolean(false)
        })
        
        setTimeout(() => {
            setLoading(true);
        }, 50)
    }, [])

    const clickHandler = () => {
        setBoolean(true);
        fetch("http://localhost:3002/stock_back/memo", {
        method: "POST",
        body: JSON.stringify({
            midx : decode.idx,
            content : text
            }),
        headers: {
            "Content-Type": "application/json"
        }
        })
    }
    const clickHandler2 = () => {
        setBoolean(false);
    }
        return(
            loading ?
            <div className="Second_fourth">
                <div className="memo_header">
                <div style={{width:"100px"}}>종목명</div>
                <div style={{width:"100%"}}></div>
                {
                boolean === true ? <input className="alter" value="수정" type="submit" onClick={clickHandler2} /> : <input className="submit" value="등록" type="submit" onClick={clickHandler} />
                }
                </div>
                <div className="memo_main">
                    <div className="memo">
                        <div className="memo_title">
                            메모
                        </div>
                        <div className="memo_content">
                        {
                        boolean === true ? <div>{text.split('\n').map((line, index) => { return (<div key={index}>{line}<br /></div>)})}</div> : <textarea value={text} type="text" onChange={(e) => setText(e.target.value)} />
                        }
                        </div>
                    </div>
                </div>
            </div>
            : loading
        );
    }

function Second() {
    let [color, setColor] = useState(0);
    let [activeTab, SetActiveTab] = useState(0);

    const clickHandler = (id) => {
        setColor(id);
        SetActiveTab(id)
      }
        return (
            <div className="second">
                <ol className="menu">
                    <li onClick={() => clickHandler(0)} className={color===0 ? "menu_tab_clicked" : "menu_tab"}>
                        종목요약
                    </li>
                    <li onClick={() => clickHandler(1)} className={color===1 ? "menu_tab_clicked" : "menu_tab"}>
                        재무정보
                    </li>
                    <li onClick={() => clickHandler(2)} className={color===2 ? "menu_tab_clicked" : "menu_tab"}>
                        종목이슈
                    </li>
                    <li onClick={() => clickHandler(3)} className={color===3 ? "menu_tab_clicked" : "menu_tab"}>
                        종목메모
                    </li>
                </ol>
                <div>
                {
                {
                  0 : <FirstDetail />,
                  1 : <Stock_finance />,
                  2 : <Stock_news />,
                  3 : <FourthDetail />
                }[activeTab]
                }
                </div>
            </div>
        );
    }

export default Second;