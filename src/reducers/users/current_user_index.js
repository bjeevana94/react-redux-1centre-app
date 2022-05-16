import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'
// import { updateCurrentUserIndex } from './current_user_reducer'

export const currentIndexSlice = createSlice({
  name: 'current_user_index',
  initialState: {
      value: -1
  },
  reducers: {
    set_currentIndex: (state, action) => {
      state.value = action.payload
      Object.assign({}, state)
    }
  },
})

export const { set_currentIndex} = currentIndexSlice.actions

export const setCurrentIndex = (index) => async (dispatch) => {
    await dispatch(set_currentIndex(index))
}

export const getCurrentindex = (state) => _.get(state, 'current_index.value', -1)

export default currentIndexSlice.reducer
