import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getTopicsList, editTopic, getTopic, createNewTopic } from '@/store/actions/topicsActions'
import { Button } from '@mui/material'
import CreateTopic from '@/components/groups/CreateTopic'
import DeleteTopic from '@/components/groups/DeleteTopic'
import { setInitialTopicValues } from '@/store/slices/topicsSlice'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import TopicDetails from '../groups/TopicDetails'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const Topics = ({ groupId }) => {
  const dispatch = useDispatch()

  const topics = useSelector(state => state.topics.topics)
  const profile = useSelector(state => state.auth.profile)

  const [activeTopic, setActiveTopic] = useState(null)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const handleActiveTopic = (topic) => {
    setActiveTopic(topic)
  }

  const topicsList = () => {
    return topics.map((topic) => {
      const isAbleEdit = topic.author.id === profile.id || profile.is_staff
      return <div
        key={topic.id}
        className='p-2 bg-slate-200 cursor-pointer flex justify-center py-0'
      >
        <span className='grow py-3' onClick={() => handleActiveTopic(topic)}>
          {topic.title}
        </span>
        {
          isAbleEdit &&
          <div className='flex items-center bg-slate-200'>
            <EditIcon onClick={() => handleOpenEditModal(topic.id)} />
            <DeleteIcon onClick={() => handleOpenDeleteModal(topic.id)} />
          </div>
        }
      </div>
    })
  }

  const handleOpenDeleteModal = (groupId) => {
    dispatch(getTopic(groupId))
    setOpenDeleteModal(true)
  }

  const handleOpenCreateModal = () => {
    dispatch(setInitialTopicValues())
    setOpenCreateModal(true)
  }

  const handleOpenEditModal = (groupId) => {
    dispatch(getTopic(groupId))
    setOpenEditModal(true)
  }

  const handleCreateGroup = (data) => {
    dispatch(createNewTopic(data))
  }

  const handleEditGroup = (data) => {
    dispatch(editTopic(data))
  }

  useEffect(() => {
    setActiveTopic(null)
    dispatch(getTopicsList(groupId))
  }, [groupId])

  return <>
    <CreateTopic groupId={groupId} handleSubmit={handleEditGroup} open={openEditModal} setOpen={setOpenEditModal} action='edit' />
    <CreateTopic groupId={groupId} handleSubmit={handleCreateGroup} open={openCreateModal} setOpen={setOpenCreateModal} action='create' />
    <DeleteTopic groupId={groupId} open={openDeleteModal} setOpen={setOpenDeleteModal} />
    {
      activeTopic
        ? <>
          <Button onClick={() => handleActiveTopic(null)}><ArrowBackIcon /></Button>
          <TopicDetails topic={activeTopic} />
        </>
        : <div className='flex flex-col gap-4'>
          <Button onClick={handleOpenCreateModal}>Create new topic</Button>
          {topics && topicsList()}
        </div>
    }
  </>
}

Topics.propTypes = {
  groupId: PropTypes.number
}

export default Topics
