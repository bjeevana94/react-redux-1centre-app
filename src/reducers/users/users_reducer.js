import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const setLocalStorage = (state) => {
    localStorage.setItem('users_info', JSON.stringify(state))
}

const userInfoReducer = createSlice({
  name: 'user_info',
  initialState,
  reducers: {
    init_userinfo: (state, action) => {
      state.push(action.payload)
      setLocalStorage(state)
    },
    update_user_info: (state, {payload}) => {
        state[payload.current_index] = payload.user
        setLocalStorage(state)
    },
    delete_invalid_user: (state, {payload}) => {
        state.splice(payload.current_index, 1)
    },
    fetch_user: (state, action) => {
        return state
    },
  },
})

//actions
export const { init_userinfo, fetch_user, update_user_info, delete_invalid_user } = userInfoReducer.actions

export const initUserInfo = (payload) => (dispatch) => {
    dispatch(init_userinfo(payload))   
}

export const updateUserInfo = (payload) => (dispatch) => {
    dispatch(update_user_info(payload))
}

export const deleteInvalidUser= (payload) => (dispatch) => {
    dispatch(delete_invalid_user(payload))
}

export const fetchUserInfo = (payload) => (dispatch) => {
    dispatch(fetch_user(payload))
}

export const getState = (state) => state

export const getUserInfo = (state) => state.user_info

export default userInfoReducer.reducer