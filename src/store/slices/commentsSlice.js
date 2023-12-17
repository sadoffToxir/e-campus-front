import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  comments: null,
  errors: null
}

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload
    },
    setCommentsErrors: (state, action) => {
      state.errors = action.payload
    },
    removeCommentsErrors: (state) => {
      state.errors = null
    }
  },
})

export const { setComments, setCommentsErrors, removeCommentsErrors } = commentsSlice.actions

export default commentsSlice.reducer