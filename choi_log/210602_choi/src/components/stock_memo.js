import React, { useState, useEffect, useContext } from 'react';
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import '../css/stock_memo.css';
import { StockContext } from "../store/stock_Item";

function Memo(){
    const [cookie] = useCookies('["jwt"]');
    const [boolean, setBoolean] = useState(false);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("");
    const decode = jwtDecode(cookie.jwt);
    const { storeCode, setStoreCode, storeName } = useContext(StockContext)

    useEffect(() => {
        fetch("http://15.164.94.207:3002/stock_back/memo2", {
            method: "POST",
            body: JSON.stringify({
                midx: decode.idx,
                code: storeCode
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
        fetch("http://15.164.94.207:3002/stock_back/memo", {
        method: "POST",
        body: JSON.stringify({
            midx : decode.idx,
            content : text,
            code: storeCode
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
            <div className="stock_memo">
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

export default Memo;