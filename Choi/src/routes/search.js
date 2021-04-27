import React, { useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';

function Search() {
    const history = useHistory();
    const [searchEmail, setSearchEmail] = useState([{idx: '', email: '', name: '', sex: ''}]);
    const [cookie, setCookie, removeCookie] = useCookies('["jwt"]');
    const [idx, setIdx] = useState("");
    const [otherName, setOtherName] = useState("");

    useEffect(() => {
        if (cookie.jwt){
          const decode = jwtDecode(cookie.jwt);
          setIdx(decode.idx);
          console.log("idx: "+decode.idx);
        }else {
          history.push("/");
        }
      }, []);

    const handleClick = (e) => {
        setOtherName(e.target.name);
        
        fetch("http://localhost:3002/search/add", {
            method: "POST",
            body: JSON.stringify({
                idx : otherName
              }),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(res=>res.json())
            .then(res=> {
                if(res.result==false){
                    setSearchEmail([{idx: '', email: '', name: '', sex: ''}]);
                }else{
                    setSearchEmail(res.result);
                }
            })
    }


    
    const handleChange = (e) => {
        const decode = jwtDecode(cookie.jwt);

        const emailinfo = {
            email : e.target.value,
            uemail : decode.email
          }
        const email_info = {
            method: "POST",
            body: JSON.stringify(emailinfo),
            headers: {
              "Content-Type": "application/json"
            }
          };
        fetch("http://localhost:3002/search", email_info)
            .then(res=>res.json())
            .then(res=> {
                if(res.result==false){
                    setSearchEmail([{idx: '', email: '', name: '', sex: ''}]);
                }else{
                    setSearchEmail(res.result);
                }
            })
        }
    return(
        <div className="search">
            <input onChange={handleChange}></input>
            <div>
                {!searchEmail.map || searchEmail[0].idx=='' ? <div></div> : searchEmail.map(user => 
                    <ol className="search_result" key={user.idx}>
                        <li>{user.email}</li>
                        <li>{user.name}</li>
                        <button onClick={handleClick} name={user.idx} style={{height:"20px", width:"50px"}}></button>
                    </ol>)}
            </div>
            {console.log(searchEmail)}
        </div>
    )
}

export default Search;