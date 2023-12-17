import axios from '@/services/api/config'
import { getFormDataFrobObj } from '@/services/api/helper'

const getTopics = (groupId) => {
  return axios.get(`topics/?group=${groupId}`).then(response => response.data)
}

const getTopic = (topicId) => {
  return axios.get(`topics/${topicId}`).then(response => response.data)
}

const createTopic = (topicDetails) => {
  return axios.post('topics/', getFormDataFrobObj(topicDetails)).then(response => response.data)
}

const refactorTopic = (topicDetails) => {
  return axios.put(`topics/${topicDetails.id}/`, getFormDataFrobObj(topicDetails)).then(response => response.data)
}

const deleteTopic = (topicId) => {
  return axios.delete(`topics/${topicId}/`).then(response => response.data)
}

export default {
  getTopics,
  getTopic,
  createTopic,
  refactorTopic,
  deleteTopic
}