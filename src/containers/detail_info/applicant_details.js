import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useState, useReducer } from 'react';

import { ImageUpload } from '../../components/upload_image';
import { useCurrentUser } from '../../service/getCurrentUser';
import { updateUserInfo } from '../../reducers/users/users_reducer';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const initial_state = {
    first_name: '',
    last_name: '',
    dob: '',
    identification_num: '' ,
    image_url: ''  
}

const reducer = (state=initial_state, action) => {
    const {payload} = action
    console.log(payload, action.type)
    switch(action.type){
        case 'SET_FIRST_NAME':
            return {...state, 'first_name': payload}
        case 'SET_LAST_NAME':
            return {...state, 'last_name': payload}
        case 'SET_DOB':
            return {...state, 'dob': payload}
        case 'SET_IDENTITY_NUM':
            return {...state, 'identification_num': payload}
        case 'SET_IMG_URL':
            return {...state, 'image_url': payload.toString()}
        default:
            new Error("undefined action type")
    }
}

export const ApplicantDetails = () => {
    const {current_user, current_index} = useCurrentUser()
    
    const [state, dispatch] = useReducer(reducer, _.get(current_user, 'applicant_info', initial_state)) 
    const [img_url, setURL] = useState(_.get(state, 'image_url', ''))

    const {first_name, last_name, dob, identification_num} = state

    const navigator = useNavigate()
    const trigger_store_action = useDispatch()
   

    const update = (val, actionType) => dispatch({'type': actionType, payload: val})
    
    // const update = (key, value) => {
    //     if(key === 'image_url') value = value.toString()
    //     // _.set(applicant_info, key, value)
    //     setApplicantInfo(applicant_info)
    // }

    const handleChange = info => {
        console.log(info)
        getBase64(info.file.originFileObj, imageUrl => {
            setURL(imageUrl)
            update(imageUrl, 'SET_IMG_URL')
        });
    };

    const handelNext = () => {
        console.log(state, "yoyoo")
        trigger_store_action(updateUserInfo({
            current_index,
            user: {
                ...current_user,
                ...{'applicant_info': state}
            }
        }))
        navigator('/review', {'state': Object.assign({}, current_user, {applicant_info: state})})
    }

    // console.log(applicant_info)

    return (
        <>
            <br/>
            <label className="Title">Application Details</label>
            <div className="row" style={{marginTop: '30px'}}>
                <div className="column"/>
                <div className="column" style={{marginTop: '30px'}}>
                    <ImageUpload handleChange={handleChange} imageUrl={img_url}/>
                </div>
                <div className="column">
                    <label className='label-text' >First Name:</label> 
                    <input className="Simple-input" placeholder="First Name" value={first_name}
                    onChange={({target}) => update(_.get(target, 'value'), 'SET_FIRST_NAME')}/> 

                    <label className='label-text' >Last Name:</label> 
                    <input className="Simple-input" placeholder="Last Name" value={last_name}
                    onChange={({target}) => update(_.get(target, 'value'), 'SET_LAST_NAME')}/> 

                    <label className='label-text' for="DOB">Date of Birth:</label> 
                    <input className="Simple-input" type="date" id="DOB" name="DOB" value={dob}
                    onChange={({target}) => update(_.get(target, 'value'), 'SET_DOB')}/> 

                    <label className='label-text' >Identification Number:</label> 
                    <input className="Simple-input" placeholder="Identification Number" maxlength="10" value={identification_num}
                    onChange={({target}) => update(_.get(target, 'value'), 'SET_IDENTITY_NUM')}/> 
                    
                    <button className={'Btn-primary'} style={{floar:'right'}} onClick={handelNext}> Next</button>
                </div>
                <div className="column"/>
            </div>
        </>
    )
}