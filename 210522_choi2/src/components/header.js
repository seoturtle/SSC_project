import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css'
import { useHistory } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';

function Header() {
    const history = useHistory();
    const [cookie, removeCookie] = useCookies('["jwt"]');
    const decode = jwtDecode(cookie.jwt);
    const [focus, setFocus] = useState(false);
    const [value, setValue] = useState("");
    const [searchList, setSearchList] = useState([]);

    const handleClick = (e) => {
        alert(`${decode.name}님이 로그아웃 하셨습니다.`);
        removeCookie("jwt");
        history.push("/");
    }

    const handleFocus = (e) => {
        setFocus(true);
    }
    const handleBlur = (e) => {
        setTimeout(() => {
            setFocus(false);
        }, 75)
    }

    useEffect(() => {
        if(value != ""){
            fetch("http://localhost:3002/search/header", {
			method: "POST",
			body: JSON.stringify({
				value: value
			}),
			headers: {
				"Content-Type": "application/json"
			}
			})
			.then(res=>res.json())
            .then(res => {
                console.log(res.result)
				setSearchList(res.result);
            })
        }else{
            setSearchList([]);
        }
    }, [value])

    const reload = (e) => {
        setTimeout(() => {
            window.location.reload();
        }, 1)
    }
    return (
        <div className="header">
            <header id="header">
                <Link to={'/main'}>
                <h1>
                    <button type="button">
                        로고
                    </button>
                    <p>
                        떠블에스씨
                    </p>
                </h1>
                </Link>
                <div className="search_box">
                    <div className="search_icon"></div>
                    <input onFocus={handleFocus} onBlur={handleBlur} value={value} onChange={(e) => {setValue(e.target.value)}} type="search" className="search_bar" title="검색어를 입력하세요" placeholder="검색어를 입력하세요"></input>
                </div>
                {focus == true ? 
                        <div className="search_list">
                            {searchList == 0  ? <div className="search_none"><span>검색 결과 없음</span></div> : searchList.map(list => 
                            <div key={list.stock_code}>
                                <ul>
                                    <Link onClick={reload} to={`/stock_main?name=${list.stock_summary_name}&code=${list.stock_code}`}>
                                    <li className="search_li">
                                        <div className="search_name">
                                            {list.stock_summary_name}
                                        </div>
                                        <div className="search_code">
                                            <span>{list.stock_code}</span>
                                            <span>{list.stock_class}</span>
                                        </div>
                                    </li>
                                    </Link>
                                </ul>
                            </div>)}
                        </div> 
                        : <div style={{display:"none"}}>검색 리스트 삭제</div>}
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