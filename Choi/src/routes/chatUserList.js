import React, { useEffect, useState, useContext } from 'react'
import '../css/chatUserList.css';
import Header from '../components/header'
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';

function ChatUserList() {
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
        <div className="chatUserList">
			<Header />
            <div id = "chat-background">
				<div id="chat-container">
					<div id="search-container">
						<input type="text" placeholder="Search" />
					</div>
					<div id="conversation-list">
						<div className="conversation active">
							<div className="chat-img-man"></div>
							<div className="title-text">김사과</div>
							<div className="created-date">04.16</div>
							<div className="conversation-message">
							{!chatUserList.map || chatUserList[0]._id=='' ? <div></div> : chatUserList.map(user => 
                                <div key={user._id}>
                                    <ol>
                                        <li>{user.email}</li>
                                    </ol>
                                </div>
                                )}
								
							</div>
						</div>
						<div className="conversation">
							<div className="chat-img-woman"></div>
							<div className="title-text">반하나</div>
							<div className="created-date">2일전</div>
							<div className="conversation-message">
								안녕
							</div>
						</div>
						<div className="conversation">
							<div className="chat-img-man"></div>
							<div className="title-text">이메론</div>
							<div className="created-date">3일전</div>
							<div className="conversation-message">
								ㄱㄱ
							</div>
						</div>
						<div className="conversation">
							<div className="chat-img-woman"></div>
							<div className="title-text">김예지</div>
							<div className="created-date">3일전</div>
							<div className="conversation-message">
								과제좀 부탁드립니다.
							</div>
						</div>
						<div className="conversation">
							<div className="chat-img-man"></div>
							<div className="title-text">홍길동</div>
							<div className="created-date">2주전</div>
							<div className="conversation-message">
								연락 좀 부탁드립니다!!
							</div>
						</div>
						<div className="conversation">
							<div className="chat-img-woman"></div>
							<div className="title-text">이체리</div>
							<div className="created-date">한달전</div>
							<div className="conversation-message">
								겜 ㄱㄱ?
							</div>
						</div>
						<div className="conversation">
							<div className="chat-img-woman"></div>
							<div className="title-text">김태희</div>
							<div className="created-date">3달전</div>
							<div className="conversation-message">
								ㅎㅇㅎㅇ
							</div>
						</div>
						<div className="conversation">
							<div className="chat-img-man"></div>
							<div className="title-text">김철수</div>
							<div className="created-date">1년전</div>
							<div className="conversation-message">
								살아있니???
							</div>
						</div>
                        <div className="conversation">
							<div className="chat-img-man"></div>
							<div className="title-text">김철수</div>
							<div className="created-date">1년전</div>
							<div className="conversation-message">
								살아있니???
							</div>
						</div>
                        <div className="conversation">
							<div className="chat-img-man"></div>
							<div className="title-text">김철수</div>
							<div className="created-date">1년전</div>
							<div className="conversation-message">
								살아있니???
							</div>
						</div>
                        <div className="conversation">
							<div className="chat-img-man"></div>
							<div className="title-text">김철수</div>
							<div className="created-date">1년전</div>
							<div className="conversation-message">
								살아있니???
							</div>
						</div>
                        <div className="conversation">
							<div className="chat-img-man"></div>
							<div className="title-text">김철수</div>
							<div className="created-date">1년전</div>
							<div className="conversation-message">
								살아있니???
							</div>
						</div>
                        <div className="conversation">
							<div className="chat-img-man"></div>
							<div className="title-text">김철수</div>
							<div className="created-date">1년전</div>
							<div className="conversation-message">
								살아있니???
							</div>
						</div>
                        <div className="conversation">
							<div className="chat-img-man"></div>
							<div className="title-text">김철수</div>
							<div className="created-date">1년전</div>
							<div className="conversation-message">
								살아있니???
							</div>
						</div>
                        <div className="conversation">
							<div className="chat-img-man"></div>
							<div className="title-text">김철수</div>
							<div className="created-date">1년전</div>
							<div className="conversation-message">
								살아있니???
							</div>
						</div>
                        <div className="conversation">
							<div className="chat-img-man"></div>
							<div className="title-text">김철수</div>
							<div className="created-date">1년전</div>
							<div className="conversation-message">
								살아있니???
							</div>
						</div>
					</div>
				</div>
            </div>
            <footer>

            </footer>
        </div>
    )
}

export default ChatUserList;