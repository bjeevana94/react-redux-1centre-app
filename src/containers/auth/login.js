import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import { setCurrentIndex } from "../../reducers/users/current_user_index";
import { getState } from "../../reducers/users/users_reducer";

export const Login = () => {

    const lc_info = useSelector(getState)
    const { state } = useLocation()
    const navigator = useNavigate()
    const dispatch = useDispatch()

    let users_info = _.get(lc_info, 'user_info')

    const [error, setError] = useState(null)
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        const current_user = _.get(state, 'user_index', -1) >=0  ? _.get(users_info, `[${state.user_index}]`) : null
        if(password === _.get(current_user, 'password')) {
            dispatch(setCurrentIndex(state.user_index))
            setError(null)
            navigator('/bussinessdetails')
        } 
        else setError("Password did not match. Please try again")
    }

    return(
        <div className="row">
            <div className="column"></div>
            <div style={{width:' 35%', marginLeft: '10%', verticalAlign: 'center'}} className="column">
                <label className='label-text' htmlFor="email">Email:</label> 
                <input className="Simple-input" id="email" value={_.get(state, 'email')} disabled/> <br/>

                <label className='label-text' htmlFor="password">Password:</label> 
                <input className="Simple-input" id="password" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}/> <br/>
               
                <div className="Error-message">{error}</div>
                <button className="Btn-primary" onClick={handleLogin}>Login</button>
            </div>
            <div className="column"></div>
        </div>
    )
}