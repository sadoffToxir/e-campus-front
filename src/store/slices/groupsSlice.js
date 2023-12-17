import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  groups: null,
  group: { name: '', description: '' },
  errors: null
}

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload
    },
    setGroup: (state, action) => {
      state.group = action.payload
    },
    setInitialGroupValues: (state) => {
      state.group = { name: '', description: '' }
    },
    setGroupsErrors: (state, action) => {
      console.log
      state.errors = action.payload
    },
    removeGroupsErrors: (state) => {
      state.errors = null
    }
  },
})

export const { setGroups, setGroupsErrors, setInitialGroupValues, setGroup, removeGroupsErrors } = groupsSlice.actions

export default groupsSlice.reducer