import { Button, Modal, Box, FormControl, InputLabel, OutlinedInput } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { joinGroup } from '@/store/actions/groupsActions'

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

const CreateGroup = ({ open, setOpen }) => {
  const dispatch = useDispatch()

  const [code, setCode] = useState('')

  const handleClose = () => setOpen(false)

  const handleCode = (e) => {
    setCode(e.currentTarget.value)
  }

  const handleCancel = () => {
    handleClose()
  }

  const handleSave = () => {
    dispatch(joinGroup(code))
    handleClose()
  }

  return <div>
    <Modal
      open={open}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <FormControl variant='outlined' className='w-full'>
          <InputLabel htmlFor='code'>Code</InputLabel>
          <OutlinedInput
            label='Code'
            id='code'
            value={code}
            onChange={handleCode}
          />
        </FormControl>

        <div className='flex justify-between pt-5'>
          <Button color='info' onClick={handleCancel}>Cancel</Button>
          <Button color='success' onClick={handleSave}>Join</Button>
        </div>
      </Box>
    </Modal>
  </div>
}

CreateGroup.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
}

export default CreateGroup