import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import axios from 'axios';
import '../css/test.css'

function Test() {
    const [cookie] = useCookies('["jwt"]');
    const [boolean, setBoolean] = useState(false);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("");
    const decode = jwtDecode(cookie.jwt);

    useEffect(() => {
        axios.post("http://localhost:3002/search/test", {
            name: decode.name
        })
        .then(res => console.log(res.data))
    }, [])

    return(
        <div className='test'>
            
        </div>
    )
}

export default Test;