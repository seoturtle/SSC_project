import React, { useState, useEffect, createContext, useContext} from 'react';
import '../css/userAdd_header.css';
import '../css/chatUserAdd.css'
import { useHistory } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import { Link } from 'react-router-dom';
import Header from '../components/header.js'
import { json } from 'body-parser';


function ChatUserAdd() {
    const history = useHistory();
    const [searchEmail, setSearchEmail] = useState([{idx: '', email: '', name: '', sex: ''}]);
    const [cookie, setCookie, removeCookie] = useCookies('["jwt"]');
    const [idx, setIdx] = useState("");
    const [otherName, setOtherName] = useState("");
    const [count, setCount] = useState([]);
    const [count2, setCount2] = useState();
    const decode = jwtDecode(cookie.jwt);

    useEffect(() => {
        if (cookie.jwt){
          setIdx(decode.idx);
          console.log("idx: "+decode.idx);
        }else {
          history.push("/");
        }

        fetch("http://localhost:3002/search/check", {
            method: "POST",
            body: JSON.stringify({midx: decode.idx}),
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(res => res.json())
          .then(res => {
            setCount(res.result);
          })
      }, []);

      useEffect(() => {

      }, [count])

    useEffect(() => {
        if(otherName==""){
            console.log(otherName);
        }else{
            fetch("http://localhost:3002/search/add", {
            method: "POST",
            body: JSON.stringify({
                oidx : otherName,
                midx : decode.idx
              }),
            headers: {
              "Content-Type": "application/json"
            }
          })
        }
    }, [otherName])

    const handleEmail = (e) => {
        setSearchEmail([{idx: '', email: '', name: '', sex: ''}]);
    }

    const handleClick = (e) => {
        e.preventDefault();
        setOtherName(e.target.name);
    }
    
    const handleChange = (e) => {
        e.preventDefault();
        const decode = jwtDecode(cookie.jwt);

        const emailinfo = {
            email : e.target.value,
            memail : decode.email
          }
        const email_info = {
            method: "POST",
            body: JSON.stringify(emailinfo),
            headers: {
              "Content-Type": "application/json"
            }
          };
        fetch("http://localhost:3002/search", email_info)
            .then(res=>res.json())
            .then(res=> {
                if(res.result==false){
                    setSearchEmail([{idx: '', email: '', name: '', sex: ''}]);
                }else{
                    setSearchEmail(res.result);
                }
            })
        }

    return (
        <div className="chatUserAdd">
                <Header />
                        <div className="content">
                            <h2 style={{width: "800px"}}>채팅 추가</h2>
                            <div className="user_search">
                                <div style={{width: "800px"}}></div>
                                <input type="search" onChange={handleChange} style={{height: "20px", width:"200px",marginRight: "30px"}}></input>
                            </div>
                            <div className="list">
                                <div className="list_name">
                                    <div>이름</div>
                                </div>
                                <div className="list_email">
                                    <div>이메일</div>
                                </div>
                                <div style={{width:"200px"}}></div>
                            </div>
                            {!searchEmail.map || searchEmail[0].idx=='' ? <div></div> : searchEmail.map(user => 
                                <div className="search_result" key={user.idx}>
                                    <ol>
                                        <li className="chat-people-name"><div>{user.name}</div></li>
                                        <li className="chat-people-email"><div>{user.email}</div></li>
                                        {count.includes(user.idx) === true ? <li style={{width: "200px"}}></li> : <li className="btnli"><button className="chat-people-btn" onClick={handleClick} name={user.idx}></button></li>}
                                    </ol>   
                                </div>
                                )}
                        </div>
                    <footer>
                    </footer>
        </div>
    )
}

export default ChatUserAdd;