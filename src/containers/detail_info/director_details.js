import { useEffect, useState } from "react"
import _ from 'lodash'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { Directors } from "../../components/directors"
import { useCurrentUser } from "../../service/getCurrentUser"
import { updateUserInfo } from "../../reducers/users/users_reducer"

let initial_state = {
    director_name: '',
    director_email: ''
}

export const DirectorDetails = () => {
    const trigger_store_action = useDispatch()
    const {current_user, current_index} = useCurrentUser()
    const navigator = useNavigate()

    const [directors, setDirectors] = useState(_.get(current_user, 'directors_info', [initial_state]))
    const [error, setError] = useState(null)
    
    useEffect(() => {
        setDirectors(directors)
    }, [directors])

    const addNewDirector = () => {
        if(directors.length < 10) {
            setError(null)
            setDirectors([...directors, initial_state])
        }
        else setError("You can only add maximum of 10 directors.")
    }
    
    const updateDirector = (index, obj) => setDirectors([...directors.slice(0, index),{...directors[index], ...obj} ,...directors.slice(index+1)])

    const removeDirector = (index) => {
        setError(null)
        setDirectors([...directors.slice(0, index), ...directors.slice(index+1)])
    }

    const handelNext = () => {
        const directors_info = _.filter(directors, (dir) => !_.isEmpty(dir.director_name) || !_.isEmpty(dir.director_email))

        if(directors_info.length > 0){
            trigger_store_action(updateUserInfo({
                current_index,
                user: {
                    ...current_user,
                    'directors_info': _.filter(directors, (dir) => !_.isEmpty(dir.director_name) || !_.isEmpty(dir.director_email))
                }
            }))
            navigator('/applicantdetails')
        } else setError("There should be at least one director.")
    }
    

    return (
        <>
            <br/>
            <label className="Title">Director Details</label>
            <Directors directors={directors} remove={removeDirector} update={updateDirector}
            addNew={addNewDirector} handelNext={handelNext} error={error}/>
        </>
    )
}