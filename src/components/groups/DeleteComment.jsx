import { Button, Modal, Box, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteComment } from '../../store/actions/commentsActions'

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

const DeleteComment = ({ comment, open, handleClose, topicId }) => {
  const dispatch = useDispatch()

  const handleCancel = () => {
    handleClose()
  }

  const handleSave = () => {
    dispatch(deleteComment({ commentId: comment.id, topicId }))
    handleClose()
  }

  return comment && <div>
    <Modal
      open={open}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Delete comment
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          Do you want to delete comment {comment.text}
        </Typography>

        <div className='flex justify-between pt-5'>
          <Button color='info' onClick={handleCancel}>Cancel</Button>
          <Button color='error' onClick={handleSave}>Delete</Button>
        </div>
      </Box>
    </Modal>
  </div>
}

DeleteComment.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  topicId: PropTypes.number,
  comment: PropTypes.object
}

export default DeleteComment