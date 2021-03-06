import React, { useEffect, useState, useContext } from 'react'
import '../css/chat.css';
import Header from '../components/header'
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';

function Chat() {
	const [cookie, setCookie, removeCookie] = useCookies('["jwt"]');
	const [ modalOpen, setModalOpen ] = useState(false);
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
	}, [chatUserList])

	// useEffect(() => {
	// 	fetch("http://localhost:3002/search/chatList", {
    //         method: "POST",
    //         body: JSON.stringify({midx: decode.idx}),
    //         headers: {
    //           "Content-Type": "application/json"
    //         }
    //       })
    //         .then(res=>res.json())
    //         .then(res=> {
    //             setChatUserList(res.result);
    //         })
	// 		console.log(count);
	// }, [])

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }
    return(
        <div className="chat">
			<Header />
            <div id = "chat-background">
				<div id="chat-container">
					<div id="search-container">
						<input type="text" placeholder="Search" />
					</div>
					<div id="conversation-list">
						<div className="conversation active">
							<div className="chat-img-man"></div>
							<div className="title-text">?????????</div>
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
							<div className="title-text">?????????</div>
							<div className="created-date">2??????</div>
							<div className="conversation-message">
								??????
							</div>
						</div>
						<div className="conversation">
							<div className="chat-img-man"></div>
							<div className="title-text">?????????</div>
							<div className="created-date">3??????</div>
							<div className="conversation-message">
								??????
							</div>
						</div>
						<div className="conversation">
							<div className="chat-img-woman"></div>
							<div className="title-text">?????????</div>
							<div className="created-date">3??????</div>
							<div className="conversation-message">
								????????? ??????????????????.
							</div>
						</div>
						<div className="conversation">
							<div className="chat-img-man"></div>
							<div className="title-text">?????????</div>
							<div className="created-date">2??????</div>
							<div className="conversation-message">
								?????? ??? ??????????????????!!
							</div>
						</div>
						<div className="conversation">
							<div className="chat-img-woman"></div>
							<div className="title-text">?????????</div>
							<div className="created-date">?????????</div>
							<div className="conversation-message">
								??? ???????
							</div>
						</div>
						<div className="conversation">
							<div className="chat-img-woman"></div>
							<div className="title-text">?????????</div>
							<div className="created-date">3??????</div>
							<div className="conversation-message">
								????????????
							</div>
						</div>
						<div className="conversation">
							<div className="chat-img-man"></div>
							<div className="title-text">?????????</div>
							<div className="created-date">1??????</div>
							<div className="conversation-message">
								???????????????
							</div>
						</div>
					</div>
					<div id="new-message-container">
						<button onClick={ openModal }>+</button>
					</div>
					<div id="chat-title">
						<span>?????????</span>
						<div className="trash-logo"></div>
					</div>
					<div id="chat-message-list">
						<div className="message-row other-message">
							<div className="message-content">
								<div className="message-img-man"></div>
								<div className="message-text">
									???????????????. ????????? ?????????. ?????? ????????????????????? ?????????????????? ... ??????, ?????????, ??????????????????, ?????? ?????? ???????????? ????????? ????????????....
								</div>
								<div className="message-time">04.16</div>
							</div>
						</div>
						<div className="message-row you-message">
							<div className="message-content">
								<div className="message-text">
									?????? ???????????? ????????????~
								</div>
								<div className="message-time">04.16</div>
							</div>
						</div>
						<div className="message-row other-message">
							<div className="message-content">
								<div className="message-img-man"></div>
								<div className="message-text">
									???????????????????????????
								</div>
								<div className="message-time">04.16</div>
							</div>
						</div>
						<div className="message-row you-message">
							<div className="message-content">
								<div className="message-text">
									?????????????????????????????????????????????????????????????????????????????????????????????????????????
								</div>
								<div className="message-time">04.15</div>
							</div>
						</div>
						<div className="message-row other-message">
							<div className="message-content">
								<div className="message-img-man"></div>
								<div className="message-text">
									????????? ????????????????????? ?????? ???????????? ???...????????? ?????? ?????????... ???????????? ?????????;;
								</div>
								<div className="message-time">04.14</div>
							</div>
						</div>
						<div className="message-row you-message">
							<div className="message-content">
								<div className="message-text">
									?????? ????????? ???????
								</div>
								<div className="message-time">04.13</div>
							</div>
						</div>
						<div className="message-row other-message">
							<div className="message-content">
								<div className="message-img-man"></div>
								<div className="message-text">
									????? ????????? ???????
								</div>
								<div className="message-time">04.13</div>
							</div>
						</div>
						<div className="message-row you-message">
							<div className="message-content">
								<div className="message-text">
									??? ?????????!
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

export default Chat;