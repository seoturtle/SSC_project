import React, { Component } from 'react';
import '../css/header.css'

class header extends Component{
    render(){
        return (
            <div className="header">
                <header id="header">
                    <h1>
                        <button type="button" onClick="location.href='./main.html'">
                            로r고
                        </button>
                        <p>
                            떠블에스씨
                        </p>
                    </h1>
                    <div className="search_box">
                        <span className="search_con">
                        </span>
                        <input type="search" className="search_bar" title="검색어를 입력하세요" placeholder="검색어를 입력하세요"></input>
                    </div>
                    <div className="header_cont">
                        <ul className="header_category">
                            <li><button herf="#" className="header_stock">주식</button></li>
                            <li><button herf="#" className="header_coin">코인</button></li>
                            <li><button herf="#" className="header_chat">채팅</button></li>
                            <li><button herf="#" className="header_notice">알림</button></li>
                        </ul>
                    </div>
                </header>
            </div>
        );
    }
}

export default header;