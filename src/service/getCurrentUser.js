import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'

import { getCurrentindex } from '../reducers/users/current_user_index'
import { getState, getUserInfo } from '../reducers/users/users_reducer'

export function useCurrentUser() {
    const current_index = useSelector(getCurrentindex)
    const users_info = useSelector(getUserInfo)
    const state_info = useSelector(getState)
   
    const [current_user, set_user] = useState(current_index > -1 ? users_info[current_index] : {})
    // console.log(state_info, current_user, "state_info")
    useEffect(() => {
        if(current_index > -1)  set_user(users_info[current_index])
        else set_user({})
    }, [users_info, current_index])

    return {current_user, current_index}
}