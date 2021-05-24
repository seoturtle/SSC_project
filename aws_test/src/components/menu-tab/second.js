import React, { useState, useEffect, useContext } from 'react';
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import '../../css/menu-tab_css/second.css';
import { StockContext } from "../../store/stock_Item";
import Stock_news from "../stock_news"
import Stock_finance from "../stock_finance"
import Stock_memo from "../stock_memo"
import Stock_summary from '../stock_summary';

function Second() {
    let [color, setColor] = useState(0);
    let [activeTab, SetActiveTab] = useState(0);

    const clickHandler = (id) => {
        setColor(id);
        SetActiveTab(id)
      }
        return (
            <div className="second">
                <ol className="menu">
                    <li onClick={() => clickHandler(0)} className={color===0 ? "menu_tab_clicked" : "menu_tab"}>
                        종목요약
                    </li>
                    <li onClick={() => clickHandler(1)} className={color===1 ? "menu_tab_clicked" : "menu_tab"}>
                        재무정보
                    </li>
                    <li onClick={() => clickHandler(2)} className={color===2 ? "menu_tab_clicked" : "menu_tab"}>
                        종목이슈
                    </li>
                    <li onClick={() => clickHandler(3)} className={color===3 ? "menu_tab_clicked" : "menu_tab"}>
                        종목메모
                    </li>
                </ol>
                <div>
                {
                {
                  0 : <Stock_summary />,
                  1 : <Stock_finance />,
                  2 : <Stock_news />,
                  3 : <Stock_memo />
                }[activeTab]
                }
                </div>
            </div>
        );
    }

export default Second;