import { createSlice } from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
    name: "current_user",
    initial_state: {},
    reducers: {
        init_current_user : (state, {payload}) => {
            state = {}
        },
        update_current_user_with_index: (state) => {
            return state
        },
        update_current_user : (state, {payload}) => {
            state = payload
        }
    }
})

export const { init_current_user, update_current_user, update_current_user_with_index} = currentUserSlice.actions

export const initCurrentUser = (payload) => (dispatch) => {
    dispatch(init_current_user(payload))
}

export const updateCurrentUser = (payload) => (dispatch) => {
    dispatch(update_current_user(payload))
}

export const updateCurrentUserIndex = (payload) => (dispatch) => {
    dispatch(update_current_user_with_index(payload))
}

export const getCurrentUser = (state) => state.current_user

export default currentUserSlice.reducer