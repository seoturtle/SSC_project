import React, { useState } from 'react'
import '../css/chat.css';
import Header from '../components/header'
import Popup from './popup'

function Chat() {
	const [ modalOpen, setModalOpen ] = useState(false);

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
							<div className="title-text">김사과</div>
							<div className="created-date">04.16</div>
							<div className="conversation-message">
								안녕하세요. 김사과 입니다. 저는 컴퓨터공학과를 전공하였으며
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
					</div>
					<div id="new-message-container">
						<button onClick={ openModal }>+</button>
					</div>
					<Popup open={ modalOpen } close={ closeModal } header="채팅 추가">
					</Popup>
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

export default Chat;