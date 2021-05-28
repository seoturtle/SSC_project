import React, { useState } from 'react';
import '../../css/menu-tab_css/second.css';

function FirstDetail() {
        return(
            <div className="Second_first">
                종목요약 입니다
            </div>
        );
    }

function SecondDetail(){
        return(
            <div className="Second_second">
                재무정보 입니다
            </div>
        );
    }

function ThirdDetail(){
        return(
            <div className="Second_third">
                종목이슈 입니다
            </div>
        );
    }

function FourthDetail(){
        return(
            <div className="Second_fourth">
                종목메모 입니다
            </div>
        );
    }

const obj = {
    0: <FirstDetail />,
    1: <SecondDetail />,
    2: <ThirdDetail />,
    3: <FourthDetail />
  }

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
                  0 : <FirstDetail />,
                  1 : <SecondDetail />,
                  2 : <ThirdDetail />,
                  3 : <FourthDetail />
                }[activeTab]
                }
                </div>
            </div>
        );
    }

export default Second;