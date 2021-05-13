import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import '../../css/menu-tab_css/second.css';

function FirstDetail() {
        return(
            <div className="Second_first">
                종목요약 입니다
            </div>
        );
    }

function SecondDetail(){
        return(
            <div className="Second_second">
                재무정보 입니다
            </div>
        );
    }

function ThirdDetail(){
        return(
            <div className="Second_third">
                종목이슈 입니다
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
                  1 : <SecondDetail />,
                  2 : <ThirdDetail />,
                  3 : <FourthDetail />
                }[activeTab]
                }
                </div>
            </div>
        );
    }

export default Second;