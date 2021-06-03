import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { StockContext } from "../../store/stock_Item";
import '../../css/menu-tab_css/fourth.css';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';

function Fourth() {
    const [cookie, setCookie, removeCookie] = useCookies('["jwt"]');
    const { storeCode, storeName, storeFav } = useContext(StockContext)
    const decode = jwtDecode(cookie.jwt);
    const [favList, setFavList] = useState([]);


    useEffect(() => {
        axios.post("http://localhost:3002/stock_back/favorite_list", {idx: decode.idx})
        .then(res => {
            setFavList(res.data.result);
        })
    }, [])

    useEffect(() => {
        setTimeout(() => {
            axios.post("http://localhost:3002/stock_back/favorite_list", {idx: decode.idx})
        .then(res => {
            setFavList(res.data.result);
        })
        },50)
    }, [storeFav])

    const reload = (e) => {
        setTimeout(() => {
            window.location.reload();
        }, 1)
    }

        return (
            <div className="fourth">
                <ol className="menu">
                    <li className="menu_tab">
                        관심목록
                    </li>
                </ol>
                {favList != 0 && favList.map((list, index) => (
                    <Link style={{textDecoration: "none"}} onClick={reload} to={`/stock_main?name=${list.stock_summary_name}&code=${list.stock_code}`}>
                    <div key={index} className="fourth_wrap">
                        <div className="list">
                            <div className="fourth_name">{list.stock_summary_name}</div>
                            <div className="fourth_code">{list.stock_code}</div>
                            <div className="fourth_class">{list.stock_class}</div>
                        </div>
                        <div className="angelright">
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        );
    }

export default Fourth;