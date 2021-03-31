import React, { Component } from 'react';
import '../../css/menu-tab_css/second.css';

class First extends Component{
    render(){
        return(
            <div className="First_first">
                종목요약 입니다
            </div>
        );
    }
}

class Second extends Component{
    render(){
        return(
            <div className="First_second">
                재무정보 입니다
            </div>
        );
    }
}

class Third extends Component{
    render(){
        return(
            <div className="First_second">
                종목이슈 입니다
            </div>
        );
    }
}

class Fourth extends Component{
    render(){
        return(
            <div className="First_second">
                종목메모 입니다
            </div>
        );
    }
}

const obj = {
    0: <First />,
    1: <Second />,
    2: <Third />,
    3: <Fourth />
  }

class second extends Component{
    state = {
        activeTab : 0
      }
    
      clickHandler = (id) => {
        this.setState({activeTab : id})
      }
    render(){
        return (
            <div className="second">
                <ol className="menu">
                    <li onClick={() => this.clickHandler(0)} className="menu_tab">
                        종목요약
                    </li>
                    <li onClick={() => this.clickHandler(1)} className="menu_tab">
                        재무정보
                    </li>
                    <li onClick={() => this.clickHandler(2)} className="menu_tab">
                        종목이슈
                    </li>
                    <li onClick={() => this.clickHandler(3)} className="menu_tab">
                        종목메모
                    </li>
                </ol>
                <div>
                    {obj[this.state.activeTab]}
                </div>
            </div>
        );
    }
}

export default second;