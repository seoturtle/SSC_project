import React, { useState, useEffect} from 'react';

function Search() {

    const [searchEmail, setSearchEmail] = useState([{idx: '', email: '', name: '', sex: ''}]);

    const handleChange = (e) => {
        const emailinfo = {
            email : e.target.value
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
                    setSearchEmail({idx: '', email: '', name: '', sex: ''});
                }else{
                    setSearchEmail(res.result);
                }
            })
        }
    return(
        <div className="search">
            <input onChange={handleChange}></input>
            <div>{!searchEmail.map ? <div></div> : searchEmail.map(user => <div key={user.idx}>{user.email}<div>{user.name}</div></div>)}</div>
            {console.log(searchEmail.length)}
        </div>
    )
}

export default Search;