import api from '@/services/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setIsLoading } from '@/store/slices/loaderSlice'
import { setErrorSnackbar, setSuccessSnackbar } from '@/store/slices/snackbarSlice'
import { setTopics, setTopicsErrors, setTopic } from '@/store/slices/topicsSlice'

export const getTopicsList = createAsyncThunk('topics/topics',
  async (groupId, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true))
      const response = await api.getTopics(groupId)
      thunkAPI.dispatch(setIsLoading(false))

      thunkAPI.dispatch(setTopics(response))
    } catch (err) {
      thunkAPI.dispatch(setIsLoading(false))
      const errors = err.response.data

      thunkAPI.dispatch(setErrorSnackbar(errors))
    }
  }
)

export const createNewTopic = createAsyncThunk('topics/create',
  async (newTopic, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true))
      await api.createTopic(newTopic)
      thunkAPI.dispatch(setIsLoading(false))

      thunkAPI.dispatch(setSuccessSnackbar({ isOpen: true, message: 'Topic was created successfully' }))
      await thunkAPI.dispatch(getTopicsList(newTopic.group))
    } catch (err) {
      thunkAPI.dispatch(setIsLoading(false))
      const errors = err.response.data

      thunkAPI.dispatch(setTopicsErrors(errors))
      thunkAPI.dispatch(setErrorSnackbar({ detail: 'error' }))
    }
  }
)

export const getTopic = createAsyncThunk('topics/topic',
  async (topicId, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true))
      const response = await api.getTopic(topicId)
      thunkAPI.dispatch(setIsLoading(false))

      thunkAPI.dispatch(setTopic(response))
    } catch (err) {
      thunkAPI.dispatch(setIsLoading(false))

      thunkAPI.dispatch(setErrorSnackbar({ detail: 'error' }))
    }
  }
)

export const editTopic = createAsyncThunk('topics/topicEdit',
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true))
      await api.refactorTopic(payload)
      thunkAPI.dispatch(setIsLoading(false))

      thunkAPI.dispatch(setSuccessSnackbar({ isOpen: true, message: 'Topic was edited successfully' }))
      await thunkAPI.dispatch(getTopicsList(payload.group))
    } catch (err) {
      thunkAPI.dispatch(setIsLoading(false))

      thunkAPI.dispatch(setErrorSnackbar({ detail: 'error' }))
    }
  }
)

export const deleteTopic = createAsyncThunk('topics/deleteTopic',
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true))
      await api.deleteTopic(payload.topicId)
      thunkAPI.dispatch(setIsLoading(false))

      thunkAPI.dispatch(setSuccessSnackbar({ isOpen: true, message: 'Topic was deleted successfully' }))
      await thunkAPI.dispatch(getTopicsList(payload.groupId))
    } catch (err) {
      thunkAPI.dispatch(setIsLoading(false))

      thunkAPI.dispatch(setErrorSnackbar({ detail: 'error' }))
    }
  }
)
