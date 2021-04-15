import React from 'react';
import '../css/chat.css';

function Chat() {
    return (
        <div className="chat">
        <div id="container">
            <div className="aside">
                <div className="chatheader">
                    <input type="text" placeholder="search" />
                </div>
                <ul>
                    <li>
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt="" />
                        <div>
                            <h2>anonymous@naver.com</h2>
                            <h3>
                                익명
                            </h3>
                        </div>
                    </li>
                </ul>
            </div>
            <main>
                <header>
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt="" />
                    <div>
                        <h2>anonymous@naver.com</h2>
                        <h3>익명</h3>
                    </div>
                </header>
                <ul id="chat">
                    <li className="you">
                        <div className="entete">
                            <span className="status green"></span>
                            <h2>Vincent</h2>
                            <h3>10:12AM, Today</h3>
                        </div>
                        <div className="triangle"></div>
                        <div className="message">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                        </div>
                    </li>
                    <li className="me">
                        <div className="entete">
                            <h3>10:12AM, Today</h3>
                            <h2>Vincent</h2>
                            <span className="status blue"></span>
                        </div>
                        <div className="triangle"></div>
                        <div className="message">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                        </div>
                    </li>
                    <li className="me">
                        <div className="entete">
                            <h3>10:12AM, Today</h3>
                            <h2>Vincent</h2>
                            <span className="status blue"></span>
                        </div>
                        <div className="triangle"></div>
                        <div className="message">
                            OK
                        </div>
                    </li>
                    <li className="you">
                        <div className="entete">
                            <span className="status green"></span>
                            <h2>Vincent</h2>
                            <h3>10:12AM, Today</h3>
                        </div>
                        <div className="triangle"></div>
                        <div className="message">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                        </div>
                    </li>
                    <li className="me">
                        <div className="entete">
                            <h3>10:12AM, Today</h3>
                            <h2>Vincent</h2>
                            <span className="status blue"></span>
                        </div>
                        <div className="triangle"></div>
                        <div className="message">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                        </div>
                    </li>
                    <li className="me">
                        <div className="entete">
                            <h3>10:12AM, Today</h3>
                            <h2>Vincent</h2>
                            <span className="status blue"></span>
                        </div>
                        <div className="triangle"></div>
                        <div className="message">
                            OK
                        </div>
                    </li>
                </ul>
                <footer>
                    <textarea placeholder="Type your message"></textarea>
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_picture.png" alt="" />
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_file.png" alt="" />
                    <a href="#">Send</a>
                </footer>
            </main>
        </div>
    </div>
    );
}
export default Chat;