import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import '../css/kosdaq.css'

function Kosdaq() {
    const [button, setButton] = useState('1일');

    return (
        <div className="kosdaq">
            <button onClick={()=>setButton('1일')} className={button=='1일' ? 'black' : ''}>1일</button><button onClick={()=>setButton('3개월')} className={button=='3개월' ? 'black' : ''}>3개월</button><button onClick={()=>setButton('1년')} className={button=='1년' ? 'black' : ''}>1년</button><button onClick={()=>setButton('일봉')} className={button=='일봉' ? 'black' : ''}>일봉</button><button onClick={()=>setButton('주봉')} className={button=='주봉' ? 'black' : ''}>주봉</button><button onClick={()=>setButton('월봉')} className={button=='월봉' ? 'black' : ''}>월봉</button>
            <div>
            {button == '1일' && <div className="day"></div>}
            {button == '3개월' && <div className="month"></div>}
            {button == '1년' && <div className="year"></div>}
            {button == '일봉' && <div className="days"></div>}
            {button == '주봉' && <div className="weeks"></div>}
            {button == '월봉' && <div className="months"></div>}
            </div>
        </div>
    );
}

export default Kosdaq;