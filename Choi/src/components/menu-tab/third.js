import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import '../../css/menu-tab_css/third.css';

function Third() {
    const [cookie] = useCookies('["jwt"]');
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
                <div className="sto">
                <div className="story">
                    <div className="story_tab_list">
                        <div className="story_tab">
                            <div className="story_name">{decode.name}</div>
                            <form onSubmit={clickHandler}>
                            <input className="story_write" value={value} onChange={(e) => setValue(e.target.value)}></input>
                            </form>
                        </div>
                    </div>
                    <div className="story_list">
                        <div className="story_list1">
                            {talkList.map(list => 
                            <div className="story_list2" key={list.id}>
                                <div className="story_head">
                                    <div className="story_head2">
                                        <div className="story_email">{list.email.substring(0,3)}***</div>
                                        <div className="story_day">{new Date(list.date).toLocaleDateString('zh-Hans-CN')} {new Date(list.date).toLocaleTimeString('en-GB')}</div>
                                    </div>
                                    <div className="story_del"></div>
                                </div>
                                <div className="story_content">{list.content}</div>

                                <div className="story_footer">
                                    <button className="btn_like">
                                        <span className="spa_like">
                                            <span className="like_btn"></span>
                                            <span className="like_text">1</span>
                                        </span>
                                    </button>
                                    <button className="btn_hate">
                                        <span className="spa_hate">
                                            <span className="hate_btn"></span>
                                            <span className="hate_text">2</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }

export default Third;