import React from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css'
import { useHistory } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';

function Header() {
    const history = useHistory();
    const [cookie, removeCookie] = useCookies('["jwt"]');
    const decode = jwtDecode(cookie.jwt);

    const handleClick = (e) => {
        alert(`${decode.name}님이 로그아웃 하셨습니다.`);
        removeCookie("jwt");
        history.push("/");
    }
    return (
        <div className="header">
            <header id="header">
                <h1>
                    <button type="button">
                        로고
                    </button>
                    <p>
                        떠블에스씨
                    </p>
                </h1>
                <div className="search_box">
                    <div className="search_icon"></div>
                    <input type="search" className="search_bar" title="검색어를 입력하세요" placeholder="검색어를 입력하세요"></input>
                </div>
                <div className="header_cont">
                    <ul className="header_category">
                        <li><Link to={`/stock_main?name=삼성전자&code=005930`}><button herf="#" className="header_stock">주식</button></Link></li>
                        <li><button herf="#" className="header_coin">코인</button></li>
                        <li><Link to={'/chatUserList'}><button herf="#" className="header_chat">채팅</button></Link></li>
                        <li><button herf="#" className="header_logout" onClick={handleClick}>로그아웃</button></li>
                    </ul>
                </div>
            </header>
        </div>
    );
}

export default Header;