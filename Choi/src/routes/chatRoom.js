import React, { useEffect, useState, useRef, useCallback } from 'react'
import '../css/chatRoom.css';
import Header from '../components/header'
import jwtDecode from 'jwt-decode';
import queryString from 'query-string';
import {useCookies} from 'react-cookie';
import socketIoClient from "socket.io-client";
import { useSelector } from 'react-redux';

const socket = socketIoClient("http://localhost:5555", { autoConnect: false });

const Message = ({ msg }) => {
	const [cookie, setCookie, removeCookie] = useCookies('["jwt"]');
	const decode = jwtDecode(cookie.jwt);

	return(
		<div>
		{msg.midx == decode.idx ? 
			<div className="message-row you-message">
			<div className="message-content">
				<div className="message-text">
					{ msg.content }
				</div>
				<div className="message-time">{ new Date(msg.date).toLocaleDateString() }</div>
			</div>
			</div>
			:
			<div className="message-row other-message">
			<div className="message-content">
				<div className="message-text">
					{ msg.content }
				</div>
				<div className="message-time">{ new Date(msg.date).toLocaleDateString() }</div>
			</div>
		</div>
		}
	  </div>
	)
}
const MessageBox = (props) => {
	
    const [value, setValue] = useState("");

    const postMessage = e => {
        e.preventDefault();
		
        if (!value) return;
		console.log(props.oid);
        socket.emit("message", {value: value, oid: props.oid, midx: props.midx} );

		setValue("");

		fetch("http://localhost:3002/search/add2", {
            method: "POST",
            body: JSON.stringify({
                oidx : props.oid,
                midx : props.midx
              }),
            headers: {
              "Content-Type": "application/json"
            }
          })
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
	const [otherIdx, setOtherIdx] = useState('');
	const [otherName, setOtherName] = useState('');
	const [otherEmail, setOtherEmail] = useState('');
	const [myIdx, setMyIdx] = useState('');
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true)
	const decode = jwtDecode(cookie.jwt);

	const addMessage = (msg) => {
        setMessages(oldMessages => [...oldMessages, ...(Array.isArray(msg) ? msg.reverse() : [msg])]);
    };

	const messagesEndRef = useRef(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages]);

	useEffect(() => {
		return () => setLoading(false);
	  }, []);

	useEffect(() => {
		const { oid, midx, name, email } = queryString.parse(location.search);
		console.log(oid, midx, name, email);
		setOtherIdx(oid);
		setOtherEmail(email);
		setOtherName(name);
		setMyIdx(midx);

		socket.emit("latest", {oid:oid, midx:midx})

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
						<span>{otherName}</span>
						<div className="trash-logo"></div>
					</div>
					<div id="chat-message-list">
						<div className="fix"></div>
						{ messages.map((msg, index) => <Message key={index} msg={msg} />) }
						<div ref={messagesEndRef} />
                    </div>
					<MessageBox oid={otherIdx} midx={myIdx} />
				</div>
			</div>
        </div>
    )
}

export default ChatRoom;