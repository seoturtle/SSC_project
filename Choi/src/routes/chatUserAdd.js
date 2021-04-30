import React, { useState, useEffect, createContext, useContext} from 'react';
import '../css/userAdd_header.css';
import '../css/chatUserAdd.css'
import { useHistory } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import { Link } from 'react-router-dom';


function ChatUserAdd() {
    const history = useHistory();
    const [searchEmail, setSearchEmail] = useState([{idx: '', email: '', name: '', sex: ''}]);
    const [cookie, setCookie, removeCookie] = useCookies('["jwt"]');
    const [idx, setIdx] = useState("");
    const [otherName, setOtherName] = useState("");
    const [count, setCount] = useState(0);
    const decode = jwtDecode(cookie.jwt);

    useEffect(() => {
        if (cookie.jwt){
          setIdx(decode.idx);
          console.log("idx: "+decode.idx);
        }else {
          history.push("/");
        }
      }, []);

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
        setTimeout(() => {
            fetch("http://localhost:3002/search/count", {
            method: "POST",
            body: JSON.stringify({
                midx : decode.idx
              }),
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(res=>res.json())
          .then(res=> {
              console.log(res.count);
              setCount(res.count);
          })
            }, 50)
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
            uemail : decode.email
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

        function Header() {
          return (
              <div className="userAdd_header">
                  <header id="header">
                      <h1>
                          <button type="button">
                              로r고
                          </button>
                          <p>
                              떠블에스씨
                          </p>
                      </h1>
                      <div className="search_box">
                          <span className="search_con">
                          </span>
                          <input onChange={handleChange} className="search_bar" title="검색어를 입력하세요" placeholder="검색어를 입력하세요"></input>
                      </div>
                      <div className="header_cont">
                          <ul className="header_category">
                              <li><Link to='/stock_main'><button herf="#" className="header_stock">주식</button></Link></li>
                              <li><button herf="#" className="header_coin">코인</button></li>
                              <li><Link to='/chatUserList'><button herf="#" className="header_chat">채팅</button></Link></li>
                              <li><button herf="#" className="header_notice">알림</button></li>
                          </ul>
                      </div>
                  </header>
              </div>
          );
      }

    return (
        <div className="chatUserAdd">
                <section>
                    <Header />
                    <main>
                        <div>
                            {!searchEmail.map || searchEmail[0].idx=='' ? <div></div> : searchEmail.map(user => 
                                <div className="search_result" key={user.idx}>
                                    <ol>
                                        <li className="chat-people-email">{user.email}</li>
                                        <li className="chat-people-name">{user.name}</li>
                                    </ol>
                                    <button onClick={handleClick} name={user.idx} style={{height:"20px", width:"50px"}}></button>
                                </div>
                                )}
                        </div>
                    </main>
                    <footer>
                    </footer>
                </section>
        </div>
    )
}

export default ChatUserAdd;