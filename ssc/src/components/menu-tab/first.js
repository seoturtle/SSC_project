import React, { Component } from 'react';
import '../../css/menu-tab_css/first.css';

class first extends Component{
    render(){
        return (
            <div className="first">
                <ol className="menu">
                    <li className="menu_tab">
                        뉴스
                    </li>
                    <li className="menu_tab">
                        특징종목
                    </li>
                </ol>
            </div>
        );
    }
}

export default first;