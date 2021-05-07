import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import '../../css/menu-tab_css/third.css';

function Third() {
    const [cookie, setCookie, removeCookie] = useCookies('["jwt"]');
    const [value, setValue] = useState("");
    const [talkList, setTalkList] = useState([]);
    const decode = jwtDecode(cookie.jwt);

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:3002/stock_back/talk_content", {
                method: "POST",
                body: JSON.stringify({
                    
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(res => {
                setTalkList(res.result);
            })
        }, 50);
    }, [value==""])

    const clickHandler = () => {
        fetch("http://localhost:3002/stock_back/talk_submit", {
            method: "POST",
            body: JSON.stringify({
                midx: decode.idx,
                name: decode.name,
                email: decode.email,
                sex: decode.sex,
                content: value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        setValue("");
    }
        return (
            <div className="third">
                <ol className="menu">
                    <li className="menu_tab">
                        토론방
                    </li>
                </ol>
                <div className="story">
                    <div className="story_tab">
                        <input className="story_write" value={value} onChange={(e) => setValue(e.target.value)}></input>
                        <input className="story_sub" onClick={clickHandler} type='submit'></input>
                    </div>
                    <div className="story_list">
                        <div className="story_list1">
                            {talkList.map(list => 
                            <div className="story_list2" key={list.id}>
                                <div>{list.name}</div>
                                <div>{list.email}</div>
                                <div>{list.content}</div>
                                <div>{new Date(list.date).toLocaleDateString('zh-Hans-CN')}</div>
                                <div>{new Date(list.date).toLocaleTimeString('en-GB')}</div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

export default Third;