import React, { Component } from 'react';
import '../../css/menu-tab_css/second.css';

class second extends Component{
    render(){
        return (
            <div className="second">
                <ol className="menu">
                    <li className="menu_tab">
                        종목요약
                    </li>
                    <li className="menu_tab">
                        재무정보
                    </li>
                    <li className="menu_tab">
                        종목이슈
                    </li>
                    <li className="menu_tab">
                        종목메모
                    </li>
                </ol>
            </div>
        );
    }
}

export default second;