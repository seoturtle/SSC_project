import React, { useEffect, useState, useContext } from 'react'
import '../css/chatRoom.css';
import Header from '../components/header'
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';

function ChatRoom() {
	const [cookie, setCookie, removeCookie] = useCookies('["jwt"]');
	const [chatUserList, setChatUserList] = useState([{_id: '', name: '', email: '', sex: '', __v: 0}]);
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
					if(chatUserList.length == res.result.length && chatUserList[0]._id == ''){
						console.log("id : 0");
					}else if(chatUserList.length != res.result.length){
						console.log(res.result);
						setChatUserList(res.result);
					}
				}
            })
	}, [])

    return(
        <div className="chatRoom">
			<Header />
            <div id = "chat-background">
				<div id="chat-container">
					<div id="new-message-container">
					</div>
					<div id="chat-title">
						<span>김사과</span>
						<div className="trash-logo"></div>
					</div>
					<div id="chat-message-list">
						<div className="message-row other-message">
							<div className="message-content">
								<div className="message-img-man"></div>
								<div className="message-text">
									안녕하세요. 김사과 입니다. 저는 컴퓨터공학과를 전공하였으며 ... 자바, 파이썬, 자바스크립트, 노드 등등 여러가지 언어를 접했으며....
								</div>
								<div className="message-time">04.16</div>
							</div>
						</div>
                        <div className="message-row you-message">
							<div className="message-content">
								<div className="message-text">
									면접 준비한거 보여줘봐~
								</div>
								<div className="message-time">04.16</div>
							</div>
						</div>
						<div className="message-row other-message">
							<div className="message-content">
								<div className="message-img-man"></div>
								<div className="message-text">
									도와줰ㅋㅋㅋㅋㅋㅋ
								</div>
								<div className="message-time">04.16</div>
							</div>
						</div>
						<div className="message-row you-message">
							<div className="message-content">
								<div className="message-text">
									ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅅㄱ
								</div>
								<div className="message-time">04.15</div>
							</div>
						</div>
						<div className="message-row other-message">
							<div className="message-content">
								<div className="message-img-man"></div>
								<div className="message-text">
									캡스톤 프로젝트하면서 면접 준비하는 중...살려줘 너무 어려워... 왜이렇게 어렵냐;;
								</div>
								<div className="message-time">04.14</div>
							</div>
						</div>
						<div className="message-row you-message">
							<div className="message-content">
								<div className="message-text">
									그냥 뭐하고 있어?
								</div>
								<div className="message-time">04.13</div>
							</div>
						</div>
						<div className="message-row other-message">
							<div className="message-content">
								<div className="message-img-man"></div>
								<div className="message-text">
									왜?? 무슨일 있어?
								</div>
								<div className="message-time">04.13</div>
							</div>
						</div>
						<div className="message-row you-message">
							<div className="message-content">
								<div className="message-text">
									야 김사과!
								</div>
								<div className="message-time">04.13</div>
							</div>
						</div>
                    </div>
					<div id="chat-form">
						<div className="attachment-logo"></div>
						<input type="text" placeholder="type a message" />
					</div>
				</div>
			</div>
        </div>
    )
}

export default ChatRoom;