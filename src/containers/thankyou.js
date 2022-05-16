import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentIndex } from "../reducers/users/current_user_index";

export const Thankyou = () => {
    const dispatch = useDispatch()
    const navigator =  useNavigate()

    const reset = () => {
        dispatch(setCurrentIndex(null))
        navigator('/')
    }

    return(
        <>
            <div className="row"> 
                <div className="column"/>
                <div style={{width:' 35%', marginLeft: '10%', marginTop: '10%', border: '1px solid grey'}} className="column">
                    <h3>Thank you for trading with us!</h3> <br/>
                    Your Application has been submitted for review.  <br/> <br/>
                </div>
                <div className="column"/>
            </div>
            <div className="row"> 
                <div className="column"/>
                <div style={{width:' 35%', marginLeft: '10%'}} className="column">
                   <button className="Btn-primary" onClick={reset}> Start Again </button>
                </div>
            <div className="column"/>
        </div>
        </>
    )
}