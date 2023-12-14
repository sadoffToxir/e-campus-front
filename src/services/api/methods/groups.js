import axios from '@/services/api/config'
import { getFormDataFrobObj } from '@/services/api/helper'

const getGroups = () => {
  return axios.get('groups/').then(response => response.data)
}

const getGroup = (groupId) => {
  return axios.get(`groups/${groupId}`).then(response => response.data)
}

const joinGroup = (joinCode) => {
  return axios.get(`groups/join/?join_code=${joinCode}`).then(response => response.data)
}

const createGroup = (groupDetails) => {
  return axios.post('groups/', getFormDataFrobObj(groupDetails)).then(response => response.data)
}

const refactorGroup = (groupDetails) => {
  return axios.put(`groups/${groupDetails.id}/`, getFormDataFrobObj(groupDetails)).then(response => response.data)
}

const updateGroup = (groupDetails) => {
  return axios.patch(`groups/${groupDetails.id}/`, getFormDataFrobObj(groupDetails)).then(response => response.data)
}

const deleteGroup = (groupId) => {
  return axios.delete(`groups/${groupId}/`).then(response => response.data)
}

export default {
  getGroups,
  getGroup,
  joinGroup,
  createGroup,
  refactorGroup,
  updateGroup,
  deleteGroup
}