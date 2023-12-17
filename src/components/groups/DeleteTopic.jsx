import { Button, Modal, Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTopic } from '@/store/actions/topicsActions'
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

const DeleteTopic = ({ open, setOpen, groupId }) => {
  const dispatch = useDispatch()

  const topic = useSelector(state => state.topics.topic)

  const handleClose = () => setOpen(false)

  const handleCancel = () => {
    handleClose()
  }

  const handleSave = () => {
    dispatch(deleteTopic({ topicId: topic.id, groupId }))
    handleClose()
  }

  return <div>
    <Modal
      open={open}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Delete topic
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          Do you want to delete topic {topic.title}
        </Typography>

        <div className='flex justify-between pt-5'>
          <Button color='info' onClick={handleCancel}>Cancel</Button>
          <Button color='error' onClick={handleSave}>Delete</Button>
        </div>
      </Box>
    </Modal>
  </div>
}

DeleteTopic.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  groupId: PropTypes.number
}

export default DeleteTopic