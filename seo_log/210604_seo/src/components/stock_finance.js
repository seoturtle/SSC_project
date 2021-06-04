import React, { useState, useEffect, useContext } from 'react';
import { StockContext } from "../store/stock_Item";
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import axios from 'axios';
import '../css/stock_finance.css'

function Quarter() {
    const { storeCode, setStoreCode, storeName } = useContext(StockContext);

    const [year20_01, setYear20_01] = useState([]);
    const [year20_02, setYear20_02] = useState([]);
    const [year20_03, setYear20_03] = useState([]);
    const [year20_04, setYear20_04] = useState([]);


    useEffect(() => {
        axios.post("http://localhost:3002/stock_finance/year20_01", {code: storeCode})
        .then(res=>{
            setYear20_01(res.data.result);
        })
        axios.post("http://localhost:3002/stock_finance/year20_02", {code: storeCode})
        .then(res=>{
            setYear20_02(res.data.result);
        })
        axios.post("http://localhost:3002/stock_finance/year20_03", {code: storeCode})
        .then(res=>{
            setYear20_03(res.data.result);
        })
        axios.post("http://localhost:3002/stock_finance/year20_04", {code: storeCode})
        .then(res=>{
            setYear20_04(res.data.result);
        })
    }, [])

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
                <div className="value">{year20_01 != 0 && year20_01[0].sales}</div>
                <div className="value">{year20_02 != 0 && year20_02[0].sales}</div>
                <div className="value">{year20_03 != 0 && year20_03[0].sales}</div>
                <div className="value">{year20_04 != 0 && year20_04[0].sales}</div>
            </div>
            <div className="finance-row">
                <div className="name">영업이익(억)</div>
                <div className="value">{year20_01 != 0 && year20_01[0].bus_pro}</div>
                <div className="value">{year20_02 != 0 && year20_02[0].bus_pro}</div>
                <div className="value">{year20_03 != 0 && year20_03[0].bus_pro}</div>
                <div className="value">{year20_04 != 0 && year20_04[0].bus_pro}</div>
            </div>
            <div className="finance-row">
                <div className="name">영업이익률(%)</div>
                <div className="value">{year20_01 != 0 && year20_01[0].net_pro}</div>
                <div className="value">{year20_02 != 0 && year20_02[0].net_pro}</div>
                <div className="value">{year20_03 != 0 && year20_03[0].net_pro}</div>
                <div className="value">{year20_04 != 0 && year20_04[0].net_pro}</div>
            </div>
            <div className="finance-row">
                <div className="name">당기순이익(억)</div>
                <div className="value">{year20_01 != 0 && year20_01[0].bus_pro_rat}</div>
                <div className="value">{year20_02 != 0 && year20_02[0].bus_pro_rat}</div>
                <div className="value">{year20_03 != 0 && year20_03[0].bus_pro_rat}</div>
                <div className="value">{year20_04 != 0 && year20_04[0].bus_pro_rat}</div>
            </div>
            <div className="finance-row">
                <div className="name">당기순이익[지배](억)</div>
                <div className="value">{year20_01 != 0 && year20_01[0].net_inc_rat}</div>
                <div className="value">{year20_02 != 0 && year20_02[0].net_inc_rat}</div>
                <div className="value">{year20_03 != 0 && year20_03[0].net_inc_rat}</div>
                <div className="value">{year20_04 != 0 && year20_04[0].net_inc_rat}</div>
            </div>
            <div className="finance-row">
                <div className="name">순이익률(%)</div>
                <div className="value">{year20_01 != 0 && year20_01[0].ror}</div>
                <div className="value">{year20_02 != 0 && year20_02[0].ror}</div>
                <div className="value">{year20_03 != 0 && year20_03[0].ror}</div>
                <div className="value">{year20_04 != 0 && year20_04[0].ror}</div>
            </div>
            <div className="finance-row">
                <div className="name">자산총계(억)</div>
                <div className="value">{year20_01 != 0 && year20_01[0].debt_rat}</div>
                <div className="value">{year20_02 != 0 && year20_02[0].debt_rat}</div>
                <div className="value">{year20_03 != 0 && year20_03[0].debt_rat}</div>
                <div className="value">{year20_04 != 0 && year20_04[0].debt_rat}</div>
            </div>
            <div className="finance-row">
                <div className="name">부채총계(억)</div>
                <div className="value">{year20_01 != 0 && year20_01[0].acid_rat}</div>
                <div className="value">{year20_02 != 0 && year20_02[0].acid_rat}</div>
                <div className="value">{year20_03 != 0 && year20_03[0].acid_rat}</div>
                <div className="value">{year20_04 != 0 && year20_04[0].acid_rat}</div>
            </div>
            <div className="finance-row">
                <div className="name">자본총계(억)</div>
                <div className="value">{year20_01 != 0 && year20_01[0].reten_rat}</div>
                <div className="value">{year20_02 != 0 && year20_02[0].reten_rat}</div>
                <div className="value">{year20_03 != 0 && year20_03[0].reten_rat}</div>
                <div className="value">{year20_04 != 0 && year20_04[0].reten_rat}</div>
            </div>
            <div className="finance-row">
                <div className="name">부채비율(%)</div>
                <div className="value">{year20_01 != 0 && year20_01[0].eps}</div>
                <div className="value">{year20_02 != 0 && year20_02[0].eps}</div>
                <div className="value">{year20_03 != 0 && year20_03[0].eps}</div>
                <div className="value">{year20_04 != 0 && year20_04[0].eps}</div>
            </div>
            <div className="finance-row">
                <div className="name">유동비율(%)</div>
                <div className="value">{year20_01 != 0 && year20_01[0].per}</div>
                <div className="value">{year20_02 != 0 && year20_02[0].per}</div>
                <div className="value">{year20_03 != 0 && year20_03[0].per}</div>
                <div className="value">{year20_04 != 0 && year20_04[0].per}</div>
            </div>
            <div className="finance-row">
                <div className="name">자본금(억)</div>
                <div className="value">{year20_01 != 0 && year20_01[0].bps}</div>
                <div className="value">{year20_02 != 0 && year20_02[0].bps}</div>
                <div className="value">{year20_03 != 0 && year20_03[0].bps}</div>
                <div className="value">{year20_04 != 0 && year20_04[0].bps}</div>
            </div>
            <div className="finance-row">
                <div className="name">영업활동현금흐름(억)</div>
                <div className="value">{year20_01 != 0 && year20_01[0].pbr}</div>
                <div className="value">{year20_02 != 0 && year20_02[0].pbr}</div>
                <div className="value">{year20_03 != 0 && year20_03[0].pbr}</div>
                <div className="value">{year20_04 != 0 && year20_04[0].pbr}</div>
            </div>
            <div className="finance-row">
                <div className="name">투자활동현금흐름(억)</div>
                <div className="value">{year20_01 != 0 && year20_01[0].divid_per_share}</div>
                <div className="value">{year20_02 != 0 && year20_02[0].divid_per_share}</div>
                <div className="value">{year20_03 != 0 && year20_03[0].divid_per_share}</div>
                <div className="value">{year20_04 != 0 && year20_04[0].divid_per_share}</div>
            </div>
            <div className="finance-row">
                <div className="name">재무활동현금흐름(억)</div>
                <div className="value">{year20_01 != 0 && year20_01[0].mark_divid_rat}</div>
                <div className="value">{year20_02 != 0 && year20_02[0].mark_divid_rat}</div>
                <div className="value">{year20_03 != 0 && year20_03[0].mark_divid_rat}</div>
                <div className="value">{year20_04 != 0 && year20_04[0].mark_divid_rat}</div>
            </div>
            <div className="finance-row">
                <div className="name">EPS(원)</div>
                <div className="value">{year20_01 != 0 && year20_01[0].divid_pay_rat}</div>
                <div className="value">{year20_02 != 0 && year20_02[0].divid_pay_rat}</div>
                <div className="value">{year20_03 != 0 && year20_03[0].divid_pay_rat}</div>
                <div className="value">{year20_04 != 0 && year20_04[0].divid_pay_rat}</div>
            </div>
        </div>
    )
}

function Years() {
    const { storeCode, setStoreCode, storeName } = useContext(StockContext);
    const [year18, setYear18] = useState([]);
    const [year19, setYear19] = useState([]);
    const [year20, setYear20] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:3002/stock_finance/year18", {code: storeCode})
        .then(res=>{
            setYear18(res.data.result);
        })
        axios.post("http://localhost:3002/stock_finance/year19", {code: storeCode})
        .then(res=>{
            setYear19(res.data.result);
        })
        axios.post("http://localhost:3002/stock_finance/year20", {code: storeCode})
        .then(res=>{
            setYear20(res.data.result);
        })
    }, [])

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
                <div className="value"></div>
                <div className="value">{year18 != 0 && year18[0].sales}</div>
                <div className="value">{year19 != 0 && year19[0].sales}</div>
                <div className="value">{year20 != 0 && year20[0].sales}</div>
            </div>
            <div className="finance-row">
                <div className="name">영업이익(억)</div>
                <div className="value"></div>
                <div className="value">{year18 != 0 && year18[0].bus_pro}</div>
                <div className="value">{year19 != 0 && year19[0].bus_pro}</div>
                <div className="value">{year20 != 0 && year20[0].bus_pro}</div>
            </div>
            <div className="finance-row">
                <div className="name">영업이익률(%)</div>
                <div className="value"></div>
                <div className="value">{year18 != 0 && year18[0].net_pro}</div>
                <div className="value">{year19 != 0 && year19[0].net_pro}</div>
                <div className="value">{year20 != 0 && year20[0].net_pro}</div>
            </div>
            <div className="finance-row">
                <div className="name">당기순이익(억)</div>
                <div className="value"></div>
                <div className="value">{year18 != 0 && year18[0].bus_pro_rat}</div>
                <div className="value">{year19 != 0 && year19[0].bus_pro_rat}</div>
                <div className="value">{year20 != 0 && year20[0].bus_pro_rat}</div>
            </div>
            <div className="finance-row">
                <div className="name">당기순이익[지배](억)</div>
                <div className="value"></div>
                <div className="value">{year18 != 0 && year18[0].net_inc_rat}</div>
                <div className="value">{year19 != 0 && year19[0].net_inc_rat}</div>
                <div className="value">{year20 != 0 && year20[0].net_inc_rat}</div>
            </div>
            <div className="finance-row">
                <div className="name">순이익률(%)</div>
                <div className="value"></div>
                <div className="value">{year18 != 0 && year18[0].ror}</div>
                <div className="value">{year19 != 0 && year19[0].ror}</div>
                <div className="value">{year20 != 0 && year20[0].ror}</div>
            </div>
            <div className="finance-row">
                <div className="name">자산총계(억)</div>
                <div className="value"></div>
                <div className="value">{year18 != 0 && year18[0].debt_rat}</div>
                <div className="value">{year19 != 0 && year19[0].debt_rat}</div>
                <div className="value">{year20 != 0 && year20[0].debt_rat}</div>
            </div>
            <div className="finance-row">
                <div className="name">부채총계(억)</div>
                <div className="value"></div>
                <div className="value">{year18 != 0 && year18[0].acid_rat}</div>
                <div className="value">{year19 != 0 && year19[0].acid_rat}</div>
                <div className="value">{year20 != 0 && year20[0].acid_rat}</div>
            </div>
            <div className="finance-row">
                <div className="name">자본총계(억)</div>
                <div className="value"></div>
                <div className="value">{year18 != 0 && year18[0].reten_rat}</div>
                <div className="value">{year19 != 0 && year19[0].reten_rat}</div>
                <div className="value">{year20 != 0 && year20[0].reten_rat}</div>
            </div>
            <div className="finance-row">
                <div className="name">부채비율(%)</div>
                <div className="value"></div>
                <div className="value">{year18 != 0 && year18[0].eps}</div>
                <div className="value">{year19 != 0 && year19[0].eps}</div>
                <div className="value">{year20 != 0 && year20[0].eps}</div>
            </div>
            <div className="finance-row">
                <div className="name">유동비율(%)</div>
                <div className="value"></div>
                <div className="value">{year18 != 0 && year18[0].per}</div>
                <div className="value">{year19 != 0 && year19[0].per}</div>
                <div className="value">{year20 != 0 && year20[0].per}</div>
            </div>
            <div className="finance-row">
                <div className="name">자본금(억)</div>
                <div className="value"></div>
                <div className="value">{year18 != 0 && year18[0].bps}</div>
                <div className="value">{year19 != 0 && year19[0].bps}</div>
                <div className="value">{year20 != 0 && year20[0].bps}</div>
            </div>
            <div className="finance-row">
                <div className="name">영업활동현금흐름(억)</div>
                <div className="value"></div>
                <div className="value">{year18 != 0 && year18[0].pbr}</div>
                <div className="value">{year19 != 0 && year19[0].pbr}</div>
                <div className="value">{year20 != 0 && year20[0].pbr}</div>
            </div>
            <div className="finance-row">
                <div className="name">투자활동현금흐름(억)</div>
                <div className="value"></div>
                <div className="value">{year18 != 0 && year18[0].divid_per_share}</div>
                <div className="value">{year19 != 0 && year19[0].divid_per_share}</div>
                <div className="value">{year20 != 0 && year20[0].divid_per_share}</div>
            </div>
            <div className="finance-row">
                <div className="name">재무활동현금흐름(억)</div>
                <div className="value"></div>
                <div className="value">{year18 != 0 && year18[0].mark_divid_rat}</div>
                <div className="value">{year19 != 0 && year19[0].mark_divid_rat}</div>
                <div className="value">{year20 != 0 && year20[0].mark_divid_rat}</div>
            </div>
            <div className="finance-row">
                <div className="name">EPS(원)</div>
                <div className="value"></div>
                <div className="value">{year18 != 0 && year18[0].divid_pay_rat}</div>
                <div className="value">{year19 != 0 && year19[0].divid_pay_rat}</div>
                <div className="value">{year20 != 0 && year20[0].divid_pay_rat}</div>
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
                                <button onClick={(e) => setValue(1)} className={value==1 ? "black" : ""}>분기</button>
                                |<button onClick={(e) => setValue(0)} className={value==0 ? "black" : ""}>연간</button>
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