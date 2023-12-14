import api from '@/services/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setIsLoading } from '@/store/slices/loaderSlice'
import { setErrorSnackbar, setSuccessSnackbar } from '@/store/slices/snackbarSlice'
import { setGroups, setGroupsErrors, setGroup } from '@/store/slices/groupsSlice'

export const getGroupsList = createAsyncThunk('groups/groups',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true))
      const response = await api.getGroups()
      thunkAPI.dispatch(setIsLoading(false))

      thunkAPI.dispatch(setGroups(response))
    } catch (err) {
      thunkAPI.dispatch(setIsLoading(false))
      const errors = err.response.data

      thunkAPI.dispatch(setErrorSnackbar(errors))
    }
  }
)

export const createNewGroup = createAsyncThunk('groups/create',
  async (newGroup, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true))
      await api.createGroup(newGroup)
      thunkAPI.dispatch(setIsLoading(false))

      thunkAPI.dispatch(setSuccessSnackbar({ isOpen: true, message: 'Group was created successfully' }))
      await thunkAPI.dispatch(getGroupsList())
    } catch (err) {
      thunkAPI.dispatch(setIsLoading(false))
      const errors = err.response.data

      thunkAPI.dispatch(setGroupsErrors(errors))
      thunkAPI.dispatch(setErrorSnackbar({ detail: 'error' }))
    }
  }
)

export const getGroup = createAsyncThunk('groups/group',
  async (groupId, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true))
      const response = await api.getGroup(groupId)
      thunkAPI.dispatch(setIsLoading(false))

      thunkAPI.dispatch(setGroup(response))
    } catch (err) {
      thunkAPI.dispatch(setIsLoading(false))

      thunkAPI.dispatch(setErrorSnackbar({ detail: 'error' }))
    }
  }
)

export const editGroup = createAsyncThunk('groups/groupEdit',
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true))
      await api.refactorGroup(payload)
      thunkAPI.dispatch(setIsLoading(false))

      thunkAPI.dispatch(setSuccessSnackbar({ isOpen: true, message: 'Group was edited successfully' }))
      await thunkAPI.dispatch(getGroupsList())
    } catch (err) {
      thunkAPI.dispatch(setIsLoading(false))

      thunkAPI.dispatch(setErrorSnackbar({ detail: 'error' }))
    }
  }
)

export const deleteGroup = createAsyncThunk('groups/deleteGroup',
  async (groupId, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true))
      await api.deleteGroup(groupId)
      thunkAPI.dispatch(setIsLoading(false))

      thunkAPI.dispatch(setSuccessSnackbar({ isOpen: true, message: 'Group was deleted successfully' }))
      await thunkAPI.dispatch(getGroupsList())
    } catch (err) {
      thunkAPI.dispatch(setIsLoading(false))

      thunkAPI.dispatch(setErrorSnackbar({ detail: 'error' }))
    }
  }
)

export const joinGroup = createAsyncThunk('groups/joinGroup',
  async (joinCode, thunkAPI) => {
    try {
      thunkAPI.dispatch(setIsLoading(true))
      await api.joinGroup(joinCode)
      thunkAPI.dispatch(setIsLoading(false))

      thunkAPI.dispatch(setSuccessSnackbar({ isOpen: true, message: 'You joined a new group successfully' }))
      await thunkAPI.dispatch(getGroupsList())
    } catch (err) {
      const errors = err.response.data
      thunkAPI.dispatch(setIsLoading(false))

      thunkAPI.dispatch(setErrorSnackbar(errors))
    }
  }
)
