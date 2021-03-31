import React, { Component } from 'react';
import '../../css/menu-tab_css/first.css';


class First extends Component{
    render(){
        return(
            <div className="First_first">
                뉴스 입니다
            </div>
        );
    }
}

class Second extends Component{
    render(){
        return(
            <div className="First_second">
                특징종목 입니다
            </div>
        );
    }
}

const obj = {
    0: <First />,
    1: <Second />
  }

class first extends Component{
    state = {
        activeTab : 0
      }
    
    clickHandler = (id) => {
        this.setState({activeTab : id})
      }
    render(){
        return (
            <div className="first">
                <ol className="menu">
                    <li onClick={() => this.clickHandler(0)} className="menu_tab">
                        뉴스
                    </li>
                    <li onClick={() => this.clickHandler(1)} className="menu_tab">
                        특징종목
                    </li>
                </ol>
                <div>
                    {obj[this.state.activeTab]}
                </div>
            </div>
        );
    }
}

export default first;