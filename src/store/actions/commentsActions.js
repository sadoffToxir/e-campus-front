import api from '@/services/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setIsLoading } from '@/store/slices/loaderSlice'
import { setErrorSnackbar, setSuccessSnackbar } from '@/store/slices/snackbarSlice'
import { setComments, setCommentsErrors } from '@/store/slices/commentsSlice'

export const getCommentsList = createAsyncThunk('comments/comments',
  async (topicId, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true))
      const response = await api.getComments(topicId)
      thunkAPI.dispatch(setIsLoading(false))

      thunkAPI.dispatch(setComments(response))
    } catch (err) {
      thunkAPI.dispatch(setIsLoading(false))
      const errors = err.response.data

      thunkAPI.dispatch(setErrorSnackbar(errors))
    }
  }
)

export const createNewComment = createAsyncThunk('comments/create',
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true))
      await api.createComment(payload)
      thunkAPI.dispatch(setIsLoading(false))

      thunkAPI.dispatch(setSuccessSnackbar({ isOpen: true, message: 'Comment was created successfully' }))
      await thunkAPI.dispatch(getCommentsList(payload.topic))
    } catch (err) {
      thunkAPI.dispatch(setIsLoading(false))
      const errors = err.response.data

      thunkAPI.dispatch(setCommentsErrors(errors))
      thunkAPI.dispatch(setErrorSnackbar({ detail: 'error' }))
    }
  }
)

export const editComment = createAsyncThunk('comments/edit',
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true))
      await api.refactorComment(payload)
      thunkAPI.dispatch(setIsLoading(false))

      thunkAPI.dispatch(setSuccessSnackbar({ isOpen: true, message: 'Comment was edited successfully' }))
      await thunkAPI.dispatch(getCommentsList(payload.topic))
    } catch (err) {
      thunkAPI.dispatch(setIsLoading(false))

      thunkAPI.dispatch(setErrorSnackbar({ detail: 'error' }))
    }
  }
)

export const deleteComment = createAsyncThunk('comments/delete',
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true))
      await api.deleteComment(payload.commentId)
      thunkAPI.dispatch(setIsLoading(false))

      thunkAPI.dispatch(setSuccessSnackbar({ isOpen: true, message: 'Comment was deleted successfully' }))
      await thunkAPI.dispatch(getCommentsList(payload.topicId))
    } catch (err) {
      thunkAPI.dispatch(setIsLoading(false))

      thunkAPI.dispatch(setErrorSnackbar({ detail: 'error' }))
    }
  }
)
