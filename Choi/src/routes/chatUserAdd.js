import React, { useState, useEffect } from 'react';
import '../css/userAdd_header.css';
import '../css/chatUserAdd.css'
import { useHistory } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import Header from '../components/header.js'

function ChatUserAdd() {
    
  const history = useHistory();
  const [searchEmail, setSearchEmail] = useState([{user_idx: '', email: '', name: '', sex: ''}]);
  const [cookie] = useCookies('["jwt"]');
  const [idx, setIdx] = useState("");
  const [otherName, setOtherName] = useState("");
  const [check, setCheck] = useState([]);
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
      setCheck(res.result);
    })
  }, []);

  useEffect(() => {

  }, [check])

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
    setSearchEmail([{user_idx: '', email: '', name: '', sex: ''}]);
  }

  const handleClick = (e) => {
    e.preventDefault();
    setOtherName(e.target.name);
    
    setTimeout(() =>{
      history.push("/chatUserList");
    }, 50);
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
          setSearchEmail([{user_idx: '', email: '', name: '', sex: ''}]);
        }else{
          setSearchEmail(res.result);
        }
      })
  }

  return (
    <div className="chatUserAdd">
      <Header />
      <div className="content">
        <h2 style={{width: "800px"}}>?????? ??????</h2>
        <div className="user_search">
          <div style={{width: "800px"}}></div>
          <input type="search" onChange={handleChange}></input>
        </div>
          <div className="list">
            <div className="list_name">
              <div>??????</div>
            </div>
            <div className="list_email">
              <div>?????????</div>
            </div>
            <div style={{width:"200px"}}></div>
          </div>
        
        {!searchEmail.map || searchEmail[0].user_idx=='' ? <div></div> : searchEmail.map(user => 
          <div className="search_result" key={user.user_idx}>
            {check.includes(user.user_idx) === true ? <li></li> : 
            <ol>
              <li className="chat-people-name"><div>{user.name}</div></li>
              <li className="chat-people-email"><div>{user.email}</div></li>
              <li className="btnli"><button className="chat-people-btn" onClick={handleClick} name={user.user_idx}>Add Chat</button></li>
            </ol>
            }
          </div>
        )}
      </div>
      <footer>
      </footer>
    </div>
  )
}

export default ChatUserAdd;