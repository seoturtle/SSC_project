import React, { useState, useEffect, useContext } from 'react';
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
        axios.post("http://15.164.94.207:3002/stock_back/favorite_list", {idx: decode.idx})
        .then(res => {
            setFavList(res.data.result);
        })
    }, [])

    useEffect(() => {
        setTimeout(() => {
            axios.post("http://15.164.94.207:3002/stock_back/favorite_list", {idx: decode.idx})
        .then(res => {
            setFavList(res.data.result);
        })
        },50)
    }, [storeFav])

        return (
            <div className="fourth">
                <ol className="menu">
                    <li className="menu_tab">
                        관심목록
                    </li>
                </ol>
                <div class="fourth_content">
                    {favList != 0 && favList.map((list, index) => (
                        <div key={index} className="fourth_wrap">
                            <div className="fourth_name">{list.stock_summary_name}</div>
                            <div className="fourth_code">{list.stock_code}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

export default Fourth;