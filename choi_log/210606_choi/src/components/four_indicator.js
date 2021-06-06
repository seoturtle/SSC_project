import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import '../css/four_indicator.css'

function Four_indicator() {
    const [button, setButton] = useState('1일');

    return (
        <div className="four_indicator">
            <button onClick={()=>setButton('1일')} className={button=='1일' ? 'black' : ''}>1일</button><button onClick={()=>setButton('3개월')} className={button=='3개월' ? 'black' : ''}>3개월</button><button onClick={()=>setButton('1년')} className={button=='1년' ? 'black' : ''}>1년</button><button onClick={()=>setButton('일봉')} className={button=='일봉' ? 'black' : ''}>일봉</button><button onClick={()=>setButton('주봉')} className={button=='주봉' ? 'black' : ''}>주봉</button><button onClick={()=>setButton('월봉')} className={button=='월봉' ? 'black' : ''}>월봉</button>
            <div>
            {button == '1일' && <div className="day">
                <div>
                    <div className="nasdaq_day"></div>
                    <div>미국 나스닥 종합</div>
                </div>
                <div>
                    <div className="dau_day"></div>
                    <div>미국 다우 산업</div>
                </div>
                <div>
                    <div className="sp_day"></div>
                    <div>S&amp;P 500</div>
                </div>
                <div>
                    <div className="nikkei_day"></div> 
                    <div>일본 니케이225</div>
                </div>
            </div>}
            {button == '3개월' && <div className="month">
                <div>
                    <div className="nasdaq_month"></div>
                    <div>미국 나스닥 종합</div>
                </div>
                <div>
                    <div className="dau_month"></div>
                    <div>미국 다우 산업</div>
                </div>
                <div>
                    <div className="sp_month"></div>
                    <div>S&amp;P 500</div>
                </div>
                <div>
                    <div className="nikkei_month"></div> 
                    <div>일본 니케이225</div>
                </div>   
            </div>}
            {button == '1년' && <div className="year">
                <div>
                    <div className="nasdaq_year"></div>
                    <div>미국 나스닥 종합</div>
                </div>
                <div>
                    <div className="dau_year"></div>
                    <div>미국 다우 산업</div>
                </div>
                <div>
                    <div className="sp_year"></div>
                    <div>S&amp;P 500</div>
                </div>
                <div>
                    <div className="nikkei_year"></div> 
                    <div>일본 니케이225</div>
                </div>      
            </div>}
            {button == '일봉' && <div className="days">
                <div>
                    <div className="nasdaq_days"></div>
                    <div>미국 나스닥 종합</div>
                </div>
                <div>
                    <div className="dau_days"></div>
                    <div>미국 다우 산업</div>
                </div>
                <div>
                    <div className="sp_days"></div>
                    <div>S&amp;P 500</div>
                </div>
                <div>
                    <div className="nikkei_days"></div> 
                    <div>일본 니케이225</div>
                </div>    
            </div>}
            {button == '주봉' && <div className="weeks">
                <div>
                    <div className="nasdaq_weeks"></div>
                    <div>미국 나스닥 종합</div>
                </div>
                <div>
                    <div className="dau_weeks"></div>
                    <div>미국 다우 산업</div>
                </div>
                <div>
                    <div className="sp_weeks"></div>
                    <div>S&amp;P 500</div>
                </div>
                <div>
                    <div className="nikkei_weeks"></div> 
                    <div>일본 니케이225</div>
                </div>    
            </div>}
            {button == '월봉' && <div className="months">
                <div>
                    <div className="nasdaq_months"></div>
                    <div>미국 나스닥 종합</div>
                </div>
                <div>
                    <div className="dau_months"></div>
                    <div>미국 다우 산업</div>
                </div>
                <div>
                    <div className="sp_months"></div>
                    <div>S&amp;P 500</div>
                </div>
                <div>
                    <div className="nikkei_months"></div> 
                    <div>일본 니케이225</div>
                </div>
            </div>}
            </div>
        </div>
    );
}

export default Four_indicator;