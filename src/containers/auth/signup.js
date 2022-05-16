import _ from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setCurrentIndex } from "../../reducers/users/current_user_index";

import { getState, initUserInfo } from "../../reducers/users/users_reducer"

let new_user_info = { 
    email: '',
    password: '',
    company_name: '',
    trading_name: '',
    company_number: '',
    registration_num: '',
    registration_date: '',
    country: '',
    address: ''
}


export const Signup = () => {

    const lc_info = useSelector(getState)
    let users_info = _.get(lc_info, 'user_info')

    const dispatch = useDispatch()
    const navigator = useNavigate()
    const { state } = useLocation()
    const [password, setPassword] = useState('')
    const [confirm, setconfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const matchCheck = () => {
        if(!_.isEmpty(password) && !_.isEmpty(confirm)){
            if(password !== confirm) setMessage("Password and Confirm password did not match.")
            else {
                const new_user = Object.assign(new_user_info, {'email': _.get(state, 'email'), 'password': password})
                setMessage(null)
                dispatch(initUserInfo(new_user))
                dispatch(setCurrentIndex(users_info.length))
                navigator('/bussinessdetails')
            }
        } else setMessage("Password and Confirm password cannot be empty.")
    }

    return(
        <div className="row">
            <div className="column"></div>
            <div style={{width:' 35%', marginLeft: '10%', verticalAlign: 'center'}} className="column">
                <label className='label-text' htmlFor="email">Email:</label> 
                <input className="Simple-input" id="email" value={_.get(state, 'email')} disabled/> <br/>

                <label className='label-text' htmlFor="password">Create Password:</label> 
                <input className="Simple-input" required placeholder="Password" id="password" type="password" onChange={(e) => setPassword( e.target.value)}/> <br/>
                
                <label className='label-text' htmlFor="confirm">Confirm Password:</label> 
                <input className="Simple-input" required placeholder="Confirm Password" id="confirm" type="password" onChange={(e) => setconfirmPassword(e.target.value)}/> <br/>
                
                <div className="Error-message">{message}</div>
                <button className="Btn-primary"  type="submit" onClick={matchCheck}>Create Account</button>
            </div>
            <div className="column"></div>
        </div>
    )
}