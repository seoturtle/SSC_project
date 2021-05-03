import React, { useEffect, useState, useContext } from 'react'
import '../css/chatRoom.css';
import Header from '../components/header'
import jwtDecode from 'jwt-decode';
import queryString from 'query-string';
import {useCookies} from 'react-cookie';
import socketIoClient from 'socket.io-client';

const socket = socketIoClient("http://localhost:8463", { autoConnect: false});

const Message = ({ msg }) => {
	return(
		<div className="message-row other-message">
			<div className="message-content">
				<div className="message-text">
					{ msg.content }
				</div>
				<div className="message-time">{ new Date(msg.date).toLocaleDateString() }</div>
			</div>
		</div>
	)
}
const MessageBox = () => {
	const [value, setValue] = useState("");

	const postMessage = e => {
		e.preventDefault();

		if(!value) return;

		socket.emit("message", value);

		setValue("");
	};

	return (
		<form onSubmit={ postMessage }>
			<div id="chat-form">
				<div className="attachment-logo"></div>
				<input value={ value } onChange={ e => setValue(e.target.value)} type="text" placeholder="type a message" />
			</div>
		</form>
	)
}


function ChatRoom({location}) {

	const [cookie, setCookie, removeCookie] = useCookies('["jwt"]');
	const [id, setId] = useState('');
	const [messages, setMessages] = useState([]);
	const [chatUserList, setChatUserList] = useState([{_id: '', name: '', email: '', sex: '', __v: 0}]);
	const decode = jwtDecode(cookie.jwt);

	const addMessage = (msg) => {
		setMessages(oldMessages => [...oldMessages, ...(Array.isArray(msg) ? msg.reverse() : [msg])]);
	}

	useEffect(() => {
		const { id, midx, name, email } = queryString.parse(location.search);
		console.log(id, midx, name, email);
		setId(name);

		socket.on("latest", (data) => {
            // expect server to send us the latest messages
            addMessage(data);
        });
        socket.on("message", (msg) => {
            addMessage(msg);
        });

        socket.connect();
	}, [])

    return(
        <div className="chatRoom">
			<Header />
            <div id = "chat-background">
				<div id="chat-container">
					<div id="new-message-container">
					</div>
					<div id="chat-title">
						<span>{id}</span>
						<div className="trash-logo"></div>
					</div>
					<div id="chat-message-list">
						{ messages.map((msg, index) => <Message msg={msg} />)}
                    </div>
					<MessageBox />
				</div>
			</div>
        </div>
    )
}

export default ChatRoom;