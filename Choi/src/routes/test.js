import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';

function Test() {
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
            setText(res.result[0].memo);
            res.result[0].memo !="" ? setBoolean(true) : setBoolean(false)
        })
        
        setTimeout(() => {
            setLoading(true);
        }, 50)
    }, [])

    const clickHandler = () => {
        if(text == ""){
            alert("내용을 입력해주세요");
        }else{
            setBoolean(true);
            fetch("http://localhost:3002/stock_back/memo", {
            method: "POST",
            body: JSON.stringify({
                midx : decode.idx,
                memo : text
              }),
            headers: {
              "Content-Type": "application/json"
            }
          })
        }
    }
    const clickHandler2 = () => {
        setBoolean(false);
    }
    return(
        loading ?
        <div className='test'>
            <div>{
                boolean === true ? <input value="수정" type="submit" onClick={clickHandler2} /> : <input value="등록" type="submit" onClick={clickHandler} />
            }</div>
            {
                boolean === true ? <div>{text.split('\n').map((line, index) => { return (<div key={index}>{line}<br /></div>)})}</div> : <textarea value={text} type="text" onChange={(e) => setText(e.target.value)} style={{width:"400px", height:"400px", fontSize:"15px", resize:"none", overflow:"hidden"}} />
            }
        </div>
        : loading
    )
}

export default Test;