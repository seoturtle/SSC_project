import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import '../css/chatUserList.css';
import Header from '../components/header'
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import socketIoClient from "socket.io-client";

const socket = socketIoClient("http://localhost:5555", { autoConnect: false });


function ChatUserList() {
	const [cookie, setCookie, removeCookie] = useCookies('["jwt"]');
	const [chatUserList, setChatUserList] = useState([{oidx: '', name: '', email: '', sex: ''}]);
	const decode = jwtDecode(cookie.jwt);

	useEffect(() => {
		fetch("http://localhost:3002/search/chatList", {
            method: "POST",
            body: JSON.stringify({midx: decode.idx}),
            headers: {
              "Content-Type": "application/json"
            }
        })
        .then(res=>res.json())
        .then(res=> {
			if(res.result == false){
				console.log(false)
			}else{
				setChatUserList(res.result);
			}
        })

		socket.on("last", (data) => {

		})
	}, [])

    return(
        <div className="chatUserList">
			<Header />
            <div id = "chat-background">
				<div id="chat-container">
					<Link to='/chatUserAdd'>
						<div id="new-message-container">
							<button>+</button>
						</div>
					</Link>
					<div id="search-container">
						<input type="text" placeholder="Search" />
					</div>
					<div id="conversation-list">
						{!chatUserList.map || chatUserList[0].oidx=='' ? <div></div> : chatUserList.map(user => 
							<div key={user._id}>
								<Link to={`/chatRoom?oid=${user.oidx}&midx=${decode.idx}&name=${user.name}&email=${user.email}`}>
								<ol className="conversation">
									{user.sex == '남자' ? <div className="chat-img-man"></div> : <div className="chat-img-woman"></div>}
									<li className="userName">{user.name}</li>
									<li className="userEmail">({user.email})</li>
									<li className="userText">안녕하세요</li>
								</ol>
								</Link>
							</div>
						)}
					</div>
				</div>
            </div>
            <footer>
            </footer>
        </div>
    )
}

export default ChatUserList;