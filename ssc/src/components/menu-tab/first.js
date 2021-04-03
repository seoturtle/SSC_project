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
    let [act, setAct] = useState(0);

    const clickHandler = (id) => {
        setAct(id)
      }
        return (
            <div className="first">
                <ol className="menu">
                    <li onClick={() => clickHandler(0)} className="menu_tab">
                        뉴스
                    </li>
                    <li onClick={() => clickHandler(1)} className="menu_tab">
                        특징종목
                    </li>
                </ol>
                <div>
                    {obj[act]}
                </div>
            </div>
        );
    }

export default First;