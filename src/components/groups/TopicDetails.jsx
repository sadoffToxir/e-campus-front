import PropTypes from 'prop-types'
import { Typography, OutlinedInput, FormControl, InputLabel } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'
import { useEffect, useState } from 'react'
import { getCommentsList, createNewComment, editComment } from '../../store/actions/commentsActions'
import DeleteComment from '@/components/groups/DeleteComment'
import BaseUserCard from '@/components/base/baseUserCard/BaseUserCard'

const TopicDetails = ({ topic }) => {
  const dispatch = useDispatch()

  const comments = useSelector(state => state.comments.comments)
  const profile = useSelector(state => state.auth.profile)
  const errors = useSelector(state => state.auth.errors)

  const [isEdit, setIsEdit] = useState(null)
  const [comment, setComment] = useState('')
  const [editingComment, setEditingComment] = useState('')
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [deleteComment, setDeleteComment] = useState(null)

  const handleComment = (e) => {
    setComment(e.currentTarget.value)
  }

  const handleNewComment = () => {
    dispatch(createNewComment({ topic: topic.id, text: comment }))
  }

  const handleSetEdit = (commentId) => {
    const editingElement = comments.find(el => el.id === commentId)

    setIsEdit(commentId)
    setEditingComment(editingElement.text)
  }

  const handleCancelEdit = () => {
    setIsEdit(null)
    setEditingComment('')
  }

  const handleSaveEdit = () => {
    const editingElement = comments.find(el => el.id === isEdit)

    dispatch(editComment({ ...editingElement, text: editingComment }))
    setIsEdit(null)
    setEditingComment('')
  }

  const handleDelete = (comment) => {
    console.log('comment', comment)
    setDeleteComment(comment)
    setOpenDeleteModal(true)
  }

  const handleCloseModal = () => {
    setDeleteComment(null)
    setOpenDeleteModal(false)
  }

  useEffect(() => {
    dispatch(getCommentsList(topic.id))
  }, [])

  const commentsList = () => {
    return comments.map((comment) => {
      const isAbleEdit = topic.author.id === profile.id || profile.is_staff
      const isEditing = isEdit === comment.id

      return <div
        key={comment.id}
        className='p-2 bg-slate-200 cursor-pointer flex justify-center py-0'
      >
        <span className='grow py-3'>
          {isEditing
            ? <FormControl variant='outlined' className='w-full grow'>
              <InputLabel htmlFor='editComment'>Comment</InputLabel>
              <OutlinedInput
                label='Comment'
                id='editComment'
                error={!!errors && !!errors.comment}
                value={editingComment}
                onChange={(e) => setEditingComment(e.currentTarget.value)}
              />
              {
                errors && errors.comment && <Typography className='text-red-600'>
                  {errors.comment.join('')}
                </Typography>
              }
            </FormControl>
            : comment.text}
        </span>
        <div className='flex justify-between items-center'>
          <BaseUserCard user={comment.user} />
        </div>
        {
          isAbleEdit &&
          <div className='flex items-center bg-slate-200'>
            {
              isEditing
                ? <>
                  <ClearIcon onClick={handleCancelEdit} />
                  <DoneIcon onClick={handleSaveEdit} />
                </>
                : <>
                  <EditIcon onClick={() => handleSetEdit(comment.id)} />
                  <DeleteIcon onClick={() => handleDelete(comment)} />
                </>
            }
          </div>
        }
      </div>
    })
  }

  return <div>
    <DeleteComment comment={deleteComment} topicId={topic.id} open={openDeleteModal} handleClose={handleCloseModal} />

    <div><Typography variant='h4'>Topic: {topic.title}</Typography></div>
    <div>
      <Typography variant='h6'>Description: {topic.description}</Typography>
    </div>
    <div className='flex flex-col gap-2'>
      {comments && commentsList()}
    </div>
    <div className='mt-4 flex'>
      <FormControl variant='outlined' className='w-full grow'>
        <InputLabel htmlFor='comment'>Comment</InputLabel>
        <OutlinedInput
          label='Comment'
          id='comment'
          error={!!errors && !!errors.comment}
          value={comment}
          onChange={handleComment}
        />
        {
          errors && errors.comment && <Typography className='text-red-600'>
            {errors.comment.join('')}
          </Typography>
        }
      </FormControl>
      <div className='flex items-center px-3'>
        <SendIcon onClick={handleNewComment} />
      </div>
    </div>
  </div>
}

TopicDetails.propTypes = {
  topic: PropTypes.object
}

export default TopicDetails