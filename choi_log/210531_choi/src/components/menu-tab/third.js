import React, { useState, useEffect, useContext } from 'react';
import { StockContext } from "../../store/stock_Item";
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import '../../css/menu-tab_css/third.css';

function Third() {
    const [cookie, setCookie, removeCookie] = useCookies('["jwt"]');
    const [like, setLike] = useState(0);
    const [likeBoolean, setLikeBoolean] = useState(false);
    const [value, setValue] = useState("");
    const [talkList, setTalkList] = useState([]);
    const [talkDelete, setTalkDelete] = useState("");
    const [likeTalkIdx, setLikeTalkIdx] = useState("");
    const [likeRedTalkIdx, setLikeRedTalkIdx] = useState("");
    const decode = jwtDecode(cookie.jwt);
    const { storeCode, setStoreCode, storeName } = useContext(StockContext)

    useEffect(() => {
        if(value=="" || talkDelete == "") {
            setTimeout(() => {
                fetch("http://localhost:3002/stock_back/talk_content", {
                    method: "POST",
                    body: JSON.stringify({
                        user_idx: decode.idx,
                        code: storeCode
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
        }
    }, [value, talkDelete])

    useEffect(() => {
        if(talkDelete !=""){
            fetch("http://localhost:3002/stock_back/talk_delete", {
                method: "POST",
                body: JSON.stringify({
                    id: talkDelete
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        setTalkDelete("");
        }
    }, [talkDelete])

    const clickHandler = () => {
        fetch("http://localhost:3002/stock_back/talk_submit", {
            method: "POST",
            body: JSON.stringify({
                midx: decode.idx,
                name: decode.name,
                email: decode.email,
                sex: decode.sex,
                content: value,
                code: storeCode
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        setValue("");
    }

    // useEffect(() => {
    //     if(likeTalkIdx != "") {
    //         fetch("http://localhost:3002/stock_back/like", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             user_idx: decode.idx,
    //             talk_idx: likeTalkIdx
    //         }),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //     }
    //     setLikeTalkIdx("")
    // }, [likeTalkIdx])
    

        return (
            <div className="third">
                <ol className="menu">
                    <li className="menu_tab">
                        토론방
                    </li>
                </ol>
                <div className="story">
                    <div className="story_tab_list">
                        <div className="story_tab">
                            <input className="story_write" value={value} onChange={(e) => setValue(e.target.value)}></input>
                            <div className="story_btn" onClick={clickHandler}></div>
                        </div>
                    </div>
                    <div className="story_list">
                            {talkList.map(list => 
                            <div className="story_list2" key={list.talk_idx}>
                                <div className="story_head">
                                    <div className="story_head2">
                                        <div className="story_email">{list.email}</div>
                                        <div className="story_day">{new Date(list.date).toLocaleDateString('zh-Hans-CN')} {new Date(list.date).toLocaleTimeString('en-GB')}</div>
                                    </div>
                                    {decode.idx == list.user_idx ? <div className="story_del" onClick={(e) => setTalkDelete(list.talk_idx)}>삭제</div> : <div></div>}
                                </div>
                                <div className="story_content">{list.content}</div>
                                <div className="story_footer">
                                    {/* <button className="btn_like">
                                        <span className="spa_like">
                                            {list.like_check == null || list.like_check == 0 ? <span className="like_btn" onClick={(e) => setLikeTalkIdx(list.talk_idx)} ></span> :<span className="like_btn_red" ></span>}
                                            <span className="like_text">{like}</span>
                                        </span>
                                    </button>
                                    <button className="btn_hate">
                                        <span className="spa_hate">
                                            <span className="hate_btn"></span>
                                            <span className="hate_text">232</span>
                                        </span>
                                    </button> */}
                                </div>
                            </div>
                            )}
                    </div>
                </div>
            </div>
        );
    }

export default Third;