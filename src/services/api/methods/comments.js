import axios from '@/services/api/config'
import { getFormDataFrobObj } from '@/services/api/helper'

const getComments = (topicId) => {
  return axios.get(`comments/?topic=${topicId}`).then(response => response.data)
}

const getComment = (commentId) => {
  return axios.get(`comments/${commentId}`).then(response => response.data)
}

const createComment = (commentDetails) => {
  return axios.post('comments/', getFormDataFrobObj(commentDetails)).then(response => response.data)
}

const refactorComment = (commentDetails) => {
  return axios.put(`comments/${commentDetails.id}/`, getFormDataFrobObj(commentDetails)).then(response => response.data)
}

const deleteComment = (commentId) => {
  return axios.delete(`comments/${commentId}/`).then(response => response.data)
}

export default {
  getComments,
  getComment,
  createComment,
  refactorComment,
  deleteComment
}