import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import '../css/kospi.css'

function Kospi() {
    const [button, setButton] = useState('1일');

  return (
    <div className="kospi">
      <button onClick={()=>setButton('1일')}>1일</button>
      <button onClick={()=>setButton('3개월')}>3개월</button>
      <button onClick={()=>setButton('1년')}>1년</button>
      <button onClick={()=>setButton('일봉')}>일봉</button>
      <button onClick={()=>setButton('주봉')}>주봉</button>
      <button onClick={()=>setButton('월봉')}>월봉</button>
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

export default Kospi;