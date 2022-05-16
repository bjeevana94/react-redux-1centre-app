import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import _ from 'lodash' 
import { getState } from "../reducers/users/users_reducer";

// import { initUserInfo} from "../reducers/users/users_reducer";
// import { setCurrentIndex } from "../reducers/users/current_user_index";

export const Home = () => {

    const lc_info = useSelector(getState)
    let users_info = _.get(lc_info, 'user_info')

    const navigation = useNavigate()
    
    const [email, setEmail] = useState('')
    
    function checkForUsers() {
        if(email) {
            let user_index = _.findIndex(users_info, function(user) { return user.email === email});
            if(user_index >=0) {
                navigation("/login", {'state': {email, user_index}})
            }
            else {
                // const new_user = Object.assign(new_user_info, {'email': email})
                // dispatch(initUserInfo(new_user))
                // dispatch(setCurrentIndex(users_info.length))
                navigation("/signup", {'state': {email}})
            }  
        }
    }

    return(
        <div className="row">
            <div className="column"></div>
            <div style={{width:' 35%', marginLeft: '10%', verticalAlign: 'center'}} className="column">
                <label className='label-text' htmlFor="email">Email:</label> 
                <input className="Simple-input" placeholder="Input Email" id="email" onChange={(e) => setEmail(e.target.value)}/> <br/>
                <button className="Btn-primary" onClick={checkForUsers}>Next</button>
            </div>
            <div className="column"></div>
        </div>
    )
}