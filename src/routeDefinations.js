import React from 'react';
import {Routes, Route} from 'react-router-dom'
import _ from 'lodash';
import { Navigate, Outlet, } from 'react-router-dom';

// import { getCurrentindex } from './reducers/users/current_user_index';
import { Login } from './containers/auth/login';
import { Signup } from './containers/auth/signup';
import { Home } from './containers/home';
import { Header } from "./components/header"
import { useCurrentUser } from './service/getCurrentUser';
import { BussinessDetails } from './containers/detail_info/bussiness-details';
import { DirectorDetails } from './containers/detail_info/director_details';
import { ApplicantDetails } from './containers/detail_info/applicant_details';
import { Review } from './components/review';
import { Thankyou } from './containers/thankyou'


const ProtectedRoute = ({redirectPath =  "/"}) => {
    // return <Outlet/>
    const {current_user} = useCurrentUser()
    return !_.isEmpty(current_user) ?  <Outlet/> : <Navigate to={redirectPath} replace />
};


const RouteDefinations = () => {
    return (
        <>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/Signup" element={<Signup/>}/>
            <Route element={<ProtectedRoute />}>
                <Route path="/bussinessdetails" element={<BussinessDetails/>}/>
                <Route path="/directordetails" element={<DirectorDetails/>}/>
                <Route path="/applicantdetails" element={<ApplicantDetails/>}/>
                <Route path="/review" element={<Review />}/>
                <Route path="/thankyou" element={<Thankyou />}/>
             </Route>
             
        </Routes>
        </>
    )
}

export default RouteDefinations