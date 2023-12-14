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

const CreateGroup = ({ handleSubmit, open, setOpen, action }) => {
  const dispatch = useDispatch()

  const errors = useSelector(state => state.groups.errors)
  const group = useSelector(state => state.groups.group)

  const [name, setName] = useState(group.name)
  const [description, setDescription] = useState(group.description)

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
    handleSubmit({ name, description, id: group.id })
  }

  useEffect(() => {
    setName(group.name)
    setDescription(group.description)
  }, [group])

  return <div>
    <Modal
      open={open}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          {action[0].toUpperCase() + action.slice(1)} a new group
        </Typography>
        <Box id='modal-modal-description' sx={{ m: '20px 0' }} className='flex flex-col gap-4'>
          <FormControl variant='outlined' className='w-full'>
            <InputLabel htmlFor='name'>Name</InputLabel>
            <OutlinedInput
              label='Name'
              id='name'
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
            <InputLabel htmlFor='description'>Description</InputLabel>
            <OutlinedInput
              label='Description'
              id='description'
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

CreateGroup.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  action: PropTypes.string
}

export default CreateGroup