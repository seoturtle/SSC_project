import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import $ from 'jquery';
import { StockContext } from "../store/stock_Item";


function Test() {
  const [code, setCode] = useState('000660')
  return (
    <div className="test">
      <a href = {require('../prediction/'+code+'.png').default} target = "_blank">금주 산업 분석 : 폐기물 시장</a>
    </div>
  );
}

export default Test;
