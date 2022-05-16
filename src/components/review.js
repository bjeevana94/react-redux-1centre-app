import _ from 'lodash';
import { QuestionOutlined } from '@ant-design/icons';
import {useLocation, useNavigate} from 'react-router-dom';

export const Review = () => {
    const { state } = useLocation();
    const navigator = useNavigate()
    const { applicant_info, directors_info } = state

    const submitUser = () => {
        navigator('/thankyou')
    }

    return (
        <>
            <br/>
            <label className="Title">Review</label> <br/>
            
            <div className='row'>
                <div className='column'/>
                <div className='column' style={{width:'30%', textAlign: 'left'}}>
                    <label className="Title">Bussiness Details</label> <br/>
                    <b>Company Name:</b> {_.get(state, 'company_name')} <br/>
                    <b>Company Number:</b> {_.get(state, 'company_number')} <br/>
                    <b>Country:</b> {_.get(state, 'country')}
                </div>
                <div className='column' style={{width:'30%', textAlign: 'left'}}>
                    <br/>
                    <b>Trading Name:</b> {_.get(state, 'trading_name')}<br/>
                    <b>Registration Date:</b> {_.get(state, 'registration_date')}<br/>
                    <b>Address:</b> {_.get(state, 'address')}
                </div>
                <div className='column'/>
            </div>

            <>
                    {
                        _.map(directors_info, (director, index) => {
                            return (
                                <div className='row'>
                                    <div className='column'/>
                                     <div className='column' style={{width:'30%', textAlign: 'left', paddingTop: '0px', paddingBottom: '0px'}}>
                                        {index === 0 ? <><label className="Title" style={{textAlign: 'left'}}>Directors</label><br/></> : null}
                                        {
                                            _.get(director, 'director_name', null) ? <span><b>Director {index+1} Name: </b> {_.get(director, 'director_name')} <br/></span> : null
                                        }
                                    </div>
                                    <div className='column' style={{width:'30%', textAlign: 'left', paddingTop: '0px', paddingBottom: '0px'}}>
                                        {index === 0 ? <br/> : null}
                                        {   
                                            _.get(director, 'director_email', null) ? <span><b> Director {index+1} Email: </b> {director.director_email} <br/></span> : null
                                        }
                                    </div>
                                    <div className='column'/>
                                </div>
                            )
                        })
                    }
            </>
            <br/>
            <div className='row'>
                <div className='column'/>
                <div className='column' style={{width:'30%', textAlign: 'left'}}>
                     <label className="Title">Applicant Details</label> <br/>
                     {_.get(applicant_info, 'image_url') ? <img src={_.get(applicant_info, 'image_url')} alt="avatar" width="250" height="250" /> : <div><QuestionOutlined /></div>} 
                </div>
                <div className='column' style={{width:'30%', textAlign: 'left'}}>
                    <br/>
                    <b>First Name:</b> {_.get(applicant_info, 'first_name')}<br/>
                    <b>Last Name:</b> {_.get(applicant_info, 'last_name')}<br/>
                    <b>Data of Birth:</b> {_.get(applicant_info, 'dob')}<br/>
                    <b>Identification Number</b> {_.get(applicant_info, 'identification_num')}<br/>
                </div>
                <div className='column'/>
            </div>

            <button onClick={submitUser} className={'Btn-primary'}>Submit</button>
        </>
    )
}