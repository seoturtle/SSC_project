import React, { useEffect, useState, useContext } from 'react';
import { StockContext } from "../../store/stock_Item";
import queryString from 'query-string';
import '../../css/menu-tab_css/first.css';
import Stock_major_news from '../stock_major_news';

function SecondDetail() {
    const context = useContext(StockContext)
        return(
            <div className="First_second">
                특징종목 입니다
            </div>
        );
    }

function First() {
    const [color, setColor] = useState(0);
    const [activeTab, SetActiveTab] = useState(0);
    const context = useContext(StockContext)

    const clickHandler = (id) => {
        setColor(id);
        SetActiveTab(id)
      }
        return (
            <div className="first">
                <ol className="menu">
                    <li onClick={() => clickHandler(0)} className={color===0 ? "menu_tab_clicked" : "menu_tab"}>
                        뉴스
                    </li>
                </ol>
                <div>
                {
                {
                  0 : <Stock_major_news />,
                }[activeTab]
                }
                </div>
            </div>
        );
    }

export default First;