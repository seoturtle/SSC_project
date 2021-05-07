import React, { useState } from 'react';
import '../../css/menu-tab_css/first.css';


function FirstDetail() {
        return(
            <div className="First_first">
                뉴스 입니다
            </div>
        );
    }

function SecondDetail() {
        return(
            <div className="First_second">
                특징종목 입니다
            </div>
        );
    }

const obj = {
    0: <FirstDetail />,
    1: <SecondDetail />
  }

function First() {
    let [color, setColor] = useState(0);
    let [activeTab, SetActiveTab] = useState(0);

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
                    <li onClick={() => clickHandler(1)} className={color===1 ? "menu_tab_clicked" : "menu_tab"}>
                        특징종목
                    </li>
                </ol>
                <div>
                    {obj[activeTab]}
                </div>
            </div>
        );
    }

export default First;