import { useNavigate } from "react-router-dom"

import { useCurrentUser } from "../../service/getCurrentUser"
import { updateUserInfo } from "../../reducers/users/users_reducer"
import { useReducer } from "react"
import { useDispatch } from "react-redux"
import _ from "lodash"

const Country = (props) => (
  <select className="Simple-input" required name="country" id="country" value={props.value} onChange={({target}) => {
      props.setBussInfo(target, 'SET_COUNTRY')}
      }>
    <option value=""></option>
    <option value="NJ">NJ</option>
    <option value="Australia">Australia</option>
  </select>
)

const initialState = {
    company_name: '',
    trading_name: '',
    company_number: '',
    registration_date: '',
    country: '',
    address: ''
}

const reducer = (state, action) => {
    const {payload} = action
    switch(action.type){
        case 'SET_COMPANY_NAME':
            return {...state, 'company_name': payload}
        case 'SET_TRADING_NAME':
            return {...state, 'trading_name': payload}
        case 'SET_COMPANY_NUM':
            return {...state, 'company_number': payload}
        case 'SET_REGISTARTION_DATE':
            return {...state, 'registration_date': payload}
        case 'SET_REGISTARTION_NUM':
            return {...state, 'registration_num': payload}
        case 'SET_COUNTRY':
            return {...state, 'country': payload}
        case 'SET_ADDRESS':
            return {...state, 'address': payload}
        default:
            new Error("undefined action type")
    }
}

export const BussinessDetails = () => {
    const trigger_store_action = useDispatch()
    const navigator = useNavigate()
    const {current_user, current_index} = useCurrentUser()

    const [state, dispatch] = useReducer(reducer, _.isEmpty(current_user) ? initialState: current_user) 
    const { company_name, company_number, registration_date,
        registration_num, trading_name, country, address } = state

    const setBussInfo = (selection, actionType) => dispatch({'type': actionType, payload: _.get(selection, 'value', selection)})
    
    const handleNext = () => {
        trigger_store_action(updateUserInfo({
            current_index,
            user: state
        }))
        
        navigator('/directordetails')
    }

    return (
        <div className="row">
            <div className="column"></div>
            <div style={{width:' 35%', marginLeft: '10%', verticalAlign: 'center'}} className="column">
                <label className="Title">Bussiness Details</label> <br/>

                <label className='label-text'>Company Name:</label>
                <input className="Simple-input" placeholder="Company Name" value={company_name} onChange={({target}) => setBussInfo(target, 'SET_COMPANY_NAME')}/> 
               
                <label className='label-text'>Trading Name:</label>
                <input className="Simple-input" placeholder="Trading Name" value={trading_name} onChange={({target}) => setBussInfo(target, 'SET_TRADING_NAME')}/>  <br/>
               
                <label className='label-text'>Company Number:</label>
                <input className="Simple-input" maxlength="10" placeholder="Company Number" value={company_number}  onChange={({target}) => setBussInfo(target, 'SET_COMPANY_NUM')}/> <br/>
                
                <label className='label-text'>Registation Number:</label>
                <input className="Simple-input" placeholder="Registation Number" value={registration_num} onChange={({target}) => setBussInfo(target, 'SET_REGISTARTION_NUM')}/> 
                
                <label className='label-text' htmlFor="registration_date">Registration Date:</label> 
                <input className="Simple-input" type="date" id="registration_date" name="registration_date" value={registration_date} onChange={({target}) => setBussInfo(target, 'SET_REGISTARTION_DATE')}/> 
                
                <label className='label-text' htmlFor="country">Country:</label> <Country setBussInfo={setBussInfo} value={country}/>
                
                <label className='label-text' htmlFor="address">Address:</label>
                <input className="Simple-input" placeholder="Address" value={address} onChange={({target}) => setBussInfo(target, 'SET_ADDRESS')}/> <br/><br/>
                <button className="Btn-primary" type="submit" onClick={handleNext}>Next</button>
            </div>
        </div>
       
    )

}