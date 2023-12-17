import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  topics: null,
  topic: { name: '', description: '' },
  errors: null
}

export const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    setTopics: (state, action) => {
      state.topics = action.payload
    },
    setTopic: (state, action) => {
      state.topic = action.payload
    },
    setInitialTopicValues: (state) => {
      state.topic = { name: '', description: '' }
    },
    setTopicsErrors: (state, action) => {
      state.errors = action.payload
    },
    removeTopicsErrors: (state) => {
      state.errors = null
    }
  },
})

export const { setTopics, setTopicsErrors, setInitialTopicValues, setTopic, removeTopicsErrors } = topicsSlice.actions

export default topicsSlice.reducer