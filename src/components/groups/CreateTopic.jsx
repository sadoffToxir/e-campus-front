import { useEffect, useState } from 'react'
import { Button, Modal, Box, Typography, FormControl, InputLabel, OutlinedInput } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { removeGroupsErrors } from '@/store/slices/groupsSlice'
import PropTypes from 'prop-types'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

const CreateTopic = ({ handleSubmit, open, setOpen, action, groupId }) => {
  const dispatch = useDispatch()

  const errors = useSelector(state => state.groups.errors)
  const topic = useSelector(state => state.topics.topic)

  const [name, setName] = useState(topic.title || '')
  const [description, setDescription] = useState(topic.description || '')

  const handleClose = () => setOpen(false)

  const handleName = (e) => {
    dispatch(removeGroupsErrors())
    setName(e.currentTarget.value)
  }

  const handleDescription = (e) => {
    dispatch(removeGroupsErrors())
    setDescription(e.currentTarget.value)
  }

  const handleCancel = () => {
    handleClose()
  }

  const handleSave = () => {
    const payload = { title: name, description, group: groupId }
    if (topic.id) {
      payload.id = topic.id
    }
    handleSubmit(payload)
  }

  useEffect(() => {
    setName(topic.title || '')
    setDescription(topic.description || '')
  }, [topic])

  return <div>
    <Modal
      open={open}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          {action[0].toUpperCase() + action.slice(1)} topic
        </Typography>
        <Box id='modal-modal-description' sx={{ m: '20px 0' }} className='flex flex-col gap-4'>
          <FormControl variant='outlined' className='w-full'>
            <InputLabel htmlFor='topicName'>Name</InputLabel>
            <OutlinedInput
              label='Name'
              id='topicName'
              error={!!errors && !!errors.name}
              value={name}
              onChange={handleName}
            />
            {
              errors && errors.name && <Typography className='text-red-600'>
                {errors.name.join('')}
              </Typography>
            }
          </FormControl>
          <FormControl variant='outlined' className='w-full'>
            <InputLabel htmlFor='topicDescription'>Description</InputLabel>
            <OutlinedInput
              label='Description'
              id='topicDescription'
              error={!!errors && !!errors.description}
              value={description}
              onChange={handleDescription}
            />
            {
              errors && errors.description && <Typography className='text-red-600'>
                {errors.description.join('')}
              </Typography>
            }
          </FormControl>
        </Box>
        <div className='flex justify-between'>
          <Button color='info' onClick={handleCancel}>Cancel</Button>
          <Button color='success' onClick={handleSave}>Save</Button>
        </div>
      </Box>
    </Modal>
  </div>
}

CreateTopic.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  action: PropTypes.string,
  groupId: PropTypes.number
}

export default CreateTopic