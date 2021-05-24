import React, { useState, useEffect, useContext } from 'react';
import { StockContext } from "../store/stock_Item";
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import '../css/stock_finance.css'

function Quarter() {
    return(
        <div className="finance-info">
            <div className="years">
                <div></div>
                <div>2020/03</div>
                <div>2020/06</div>
                <div>2020/09</div>
                <div>2020/12</div>
            </div>
            <div className="finance-row">
                <div className="name">매출액(억)</div>
                <div className="value">5553,252</div>
                <div className="value">529,661</div>
                <div className="value">669,642</div>
                <div className="value">615,515</div>
            </div>
            <div className="finance-row">
                <div className="name">영업이익(억)</div>
                <div className="value">64,473</div>
                <div className="value">81,463</div>
                <div className="value">123,532</div>
                <div className="value">90,470</div>
            </div>
            <div className="finance-row">
                <div className="name">영업이익률(%)</div>
                <div className="value">11.65</div>
                <div className="value">15.38</div>
                <div className="value">18.45</div>
                <div className="value">14.70</div>
            </div>
            <div className="finance-row">
                <div className="name">당기순이익(억)</div>
                <div className="value">48,849</div>
                <div className="value">55,551</div>
                <div className="value">93,607</div>
                <div className="value">66,071</div>
            </div>
            <div className="finance-row">
                <div className="name">당기순이익[지배](억)</div>
                <div className="value">48,896</div>
                <div className="value">54,890</div>
                <div className="value">92,668</div>
                <div className="value">64,455</div>
            </div>
            <div className="finance-row">
                <div className="name">순이익률(%)</div>
                <div className="value">8.83</div>
                <div className="value">10.49</div>
                <div className="value">13.98</div>
                <div className="value">10.73</div>
            </div>
            <div className="finance-row">
                <div className="name">자산총계(억)</div>
                <div className="value">3,574,575</div>
                <div className="value">3,579,595</div>
                <div className="value">3,757,887</div>
                <div className="value">3,782,357</div>
            </div>
            <div className="finance-row">
                <div className="name">부채총계(억)</div>
                <div className="value">910,698</div>
                <div className="value">881,517</div>
                <div className="value">996,526</div>
                <div className="value">1,022,877</div>
            </div>
            <div className="finance-row">
                <div className="name">자본총계(억)</div>
                <div className="value">2,663,877</div>
                <div className="value">2,698,078</div>
                <div className="value">2,761,362</div>
                <div className="value">2,759,480</div>
            </div>
            <div className="finance-row">
                <div className="name">부채비율(%)</div>
                <div className="value">34.19</div>
                <div className="value">32.67</div>
                <div className="value">36.09</div>
                <div className="value">37.07</div>
            </div>
            <div className="finance-row">
                <div className="name">유동비율(%)</div>
                <div className="value">288.34</div>
                <div className="value">300.88</div>
                <div className="value">278.77</div>
                <div className="value">262.17</div>
            </div>
            <div className="finance-row">
                <div className="name">자본금(억)</div>
                <div className="value">8,975</div>
                <div className="value">8,975</div>
                <div className="value">8,975</div>
                <div className="value">8,975</div>
            </div>
            <div className="finance-row">
                <div className="name">영업활동현금흐름(억)</div>
                <div className="value">118,299</div>
                <div className="value">147,982</div>
                <div className="value">141,444</div>
                <div className="value">245,146</div>
            </div>
            <div className="finance-row">
                <div className="name">투자활동현금흐름(억)</div>
                <div className="value">-85,292</div>
                <div className="value">-24,115</div>
                <div className="value">-239,889</div>
                <div className="value">-186,991</div>
            </div>
            <div className="finance-row">
                <div className="name">재무활동현금흐름(억)</div>
                <div className="value">-29,736</div>
                <div className="value">-38,591</div>
                <div className="value">4,994</div>
                <div className="value">-19,946</div>
            </div>
            <div className="finance-row">
                <div className="name">EPS(원)</div>
                <div className="value">720</div>
                <div className="value">808</div>
                <div className="value">1,364</div>
                <div className="value">949</div>
            </div>
            <div className="finance-row">
                <div className="name">PER(배)</div>
                <div className="value">13.39</div>
                <div className="value">14.52</div>
                <div className="value">13.97</div>
                <div className="value">18.53</div>
            </div>
            <div className="finance-row">
                <div className="name">PBR(배)</div>
                <div className="value">1.11</div>
                <div className="value">1.21</div>
                <div className="value">1.31</div>
                <div className="value">1.81</div>
            </div>
            <div className="finance-row">
                <div className="name">ROE(%)</div>
                <div className="value">8.29</div>
                <div className="value">8.35</div>
                <div className="value">9.39</div>
                <div className="value">9.74</div>
            </div>
            <div className="finance-row">
                <div className="name">ROA(%)</div>
                <div className="value">6.08</div>
                <div className="value">6.14</div>
                <div className="value">6.82</div>
                <div className="value">7</div>
            </div>
        </div>
    )
}

function Years() {
    return(
        <div className="finance-info">
            <div className="years">
                <div></div>
                <div></div>
                <div>2018/12</div>
                <div>2019/12</div>
                <div>2020/12</div>
            </div>
            <div className="finance-row">
                <div className="name">매출액(억)</div>
                <div className="value">5553,252</div>
                <div className="value">529,661</div>
                <div className="value">669,642</div>
                <div className="value">615,515</div>
            </div>
            <div className="finance-row">
                <div className="name">영업이익(억)</div>
                <div className="value">64,473</div>
                <div className="value">81,463</div>
                <div className="value">123,532</div>
                <div className="value">90,470</div>
            </div>
            <div className="finance-row">
                <div className="name">영업이익률(%)</div>
                <div className="value">11.65</div>
                <div className="value">15.38</div>
                <div className="value">18.45</div>
                <div className="value">14.70</div>
            </div>
            <div className="finance-row">
                <div className="name">당기순이익(억)</div>
                <div className="value">48,849</div>
                <div className="value">55,551</div>
                <div className="value">93,607</div>
                <div className="value">66,071</div>
            </div>
            <div className="finance-row">
                <div className="name">당기순이익[지배](억)</div>
                <div className="value">48,896</div>
                <div className="value">54,890</div>
                <div className="value">92,668</div>
                <div className="value">64,455</div>
            </div>
            <div className="finance-row">
                <div className="name">순이익률(%)</div>
                <div className="value">8.83</div>
                <div className="value">10.49</div>
                <div className="value">13.98</div>
                <div className="value">10.73</div>
            </div>
            <div className="finance-row">
                <div className="name">자산총계(억)</div>
                <div className="value">3,574,575</div>
                <div className="value">3,579,595</div>
                <div className="value">3,757,887</div>
                <div className="value">3,782,357</div>
            </div>
            <div className="finance-row">
                <div className="name">부채총계(억)</div>
                <div className="value">910,698</div>
                <div className="value">881,517</div>
                <div className="value">996,526</div>
                <div className="value">1,022,877</div>
            </div>
            <div className="finance-row">
                <div className="name">자본총계(억)</div>
                <div className="value">2,663,877</div>
                <div className="value">2,698,078</div>
                <div className="value">2,761,362</div>
                <div className="value">2,759,480</div>
            </div>
            <div className="finance-row">
                <div className="name">부채비율(%)</div>
                <div className="value">34.19</div>
                <div className="value">32.67</div>
                <div className="value">36.09</div>
                <div className="value">37.07</div>
            </div>
            <div className="finance-row">
                <div className="name">유동비율(%)</div>
                <div className="value">288.34</div>
                <div className="value">300.88</div>
                <div className="value">278.77</div>
                <div className="value">262.17</div>
            </div>
            <div className="finance-row">
                <div className="name">자본금(억)</div>
                <div className="value">8,975</div>
                <div className="value">8,975</div>
                <div className="value">8,975</div>
                <div className="value">8,975</div>
            </div>
            <div className="finance-row">
                <div className="name">영업활동현금흐름(억)</div>
                <div className="value">118,299</div>
                <div className="value">147,982</div>
                <div className="value">141,444</div>
                <div className="value">245,146</div>
            </div>
            <div className="finance-row">
                <div className="name">투자활동현금흐름(억)</div>
                <div className="value">-85,292</div>
                <div className="value">-24,115</div>
                <div className="value">-239,889</div>
                <div className="value">-186,991</div>
            </div>
            <div className="finance-row">
                <div className="name">재무활동현금흐름(억)</div>
                <div className="value">-29,736</div>
                <div className="value">-38,591</div>
                <div className="value">4,994</div>
                <div className="value">-19,946</div>
            </div>
            <div className="finance-row">
                <div className="name">EPS(원)</div>
                <div className="value">720</div>
                <div className="value">808</div>
                <div className="value">1,364</div>
                <div className="value">949</div>
            </div>
            <div className="finance-row">
                <div className="name">PER(배)</div>
                <div className="value">13.39</div>
                <div className="value">14.52</div>
                <div className="value">13.97</div>
                <div className="value">18.53</div>
            </div>
            <div className="finance-row">
                <div className="name">PBR(배)</div>
                <div className="value">1.11</div>
                <div className="value">1.21</div>
                <div className="value">1.31</div>
                <div className="value">1.81</div>
            </div>
            <div className="finance-row">
                <div className="name">ROE(%)</div>
                <div className="value">8.29</div>
                <div className="value">8.35</div>
                <div className="value">9.39</div>
                <div className="value">9.74</div>
            </div>
            <div className="finance-row">
                <div className="name">ROA(%)</div>
                <div className="value">6.08</div>
                <div className="value">6.14</div>
                <div className="value">6.82</div>
                <div className="value">7</div>
            </div>
        </div>
    )
}

function Stock_finance() {
    const { storeCode, setStoreCode, storeName } = useContext(StockContext)
    const [value, setValue] = useState(1);

    return(
            <div className="stock_finance">
                <section className="app-content">
                    <div className="financial-information">
                        <div className="financial-information-header">
                            <p className="title">{storeName}</p>
                            <div className="financial-information-tab-group">
                                <button onClick={(e) => setValue(1)} className="btn-quarter">분기</button>
                                <button onClick={(e) => setValue(0)} className="btn-year active">연간</button>
                            </div>
                        </div>
                        {
                            value == 0 ? <Years /> : <Quarter />
                        }
                    </div>
                </section>
            </div>
        );  
}

export default Stock_finance;