import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import $ from 'jquery';
import { StockContext } from "../store/stock_Item";

window.$ = $;

function Test() {
  const [delay, setDelay] = useState()
  const [a, setA] = useState([null])
  const { storeCode, setStoreCode, storeName } = useContext(StockContext)
  const [max, setMax] = useState()

  useEffect(() => {
    axios.post('http://localhost:3002/stock_back/test',)
    .then(res => {
      $.each(res.data, function(i, item){
        const items = item._attributes.data.split('|').map(Number)
        if(items[2] != 0){
          setA(oldArray => [...oldArray, items[2]])
        }
      })
    })
  }, [])

  useEffect(() => {
    if(a.length == 366){
      console.log(Math.max.apply(null, a))
    }
  },[a])


  return (
    <div className="test">
    </div>
  );
}

export default Test;
