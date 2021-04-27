import React, { useState, useEffect} from 'react';
import '../css/popup.css';
import { useHistory } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import {useCookies} from 'react-cookie';
import axios from 'axios';

const Popup = ( props ) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header } = props;
    const history = useHistory();
    const [searchEmail, setSearchEmail] = useState([{idx: '', email: '', name: '', sex: ''}]);
    const [cookie, setCookie, removeCookie] = useCookies('["jwt"]');
    const [idx, setIdx] = useState("");
    const [otherName, setOtherName] = useState("");

    const decode = jwtDecode(cookie.jwt);

    useEffect(() => {
        if (cookie.jwt){
          setIdx(decode.idx);
          console.log("idx: "+decode.idx);
        }else {
          history.push("/");
        }
      }, []);

    useEffect(async () => {
        if(otherName==""){
            console.log(otherName);
        }else{
        //     fetch("http://localhost:3002/search/add", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         oidx : otherName,
        //         midx : decode.idx
        //       }),
        //     headers: {
        //       "Content-Type": "application/json"
        //     }
        //   })
        await axios.post("http://localhost:3002/search/add", {
            oidx : otherName,
            midx : decode.idx
        })
        }
        console.log(otherName);
    }, [otherName])

    const handleEmail = (e) => {
        setSearchEmail([{idx: '', email: '', name: '', sex: ''}]);
    }

    const handleClick = async (e) => {
        await setOtherName(e.target.name);
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

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={ open ? 'openModal modal' : 'modal' }>
            { open ? (  
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={() => {close(); handleEmail();}}> &times; </button>
                    </header>
                    <main>
                        <input onChange={handleChange}></input>
                        <div>
                            {!searchEmail.map || searchEmail[0].idx=='' ? <div></div> : searchEmail.map(user => 
                                <div className="search_result" key={user.idx}>
                                    <ol>
                                        <li className="chat-people-email">{user.email}</li>
                                        <li className="chat-people-name">{user.name}</li>
                                    </ol>
                                    <button onClick={handleClick} name={user.idx} style={{height:"20px", width:"50px"}}></button>
                                </div>
                                )}
                        </div>
                    </main>
                    <footer>
                        <button className="close" onClick={() => {close(); handleEmail();}}> close </button>
                    </footer>
                </section>
            ) : null }
        </div>
    )
}

export default Popup;