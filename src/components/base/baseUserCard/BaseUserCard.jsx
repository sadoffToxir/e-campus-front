import { useState } from 'react'
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { getImageUrl } from '@/utils/image'
import { Avatar, MenuItem, Button } from '@mui/material'
import Menu from '@mui/material/Menu'

const BaseUserCard = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return <div>
    <Button
      id='demo-positioned-button'
      aria-controls={open ? 'demo-positioned-menu' : undefined}
      aria-haspopup='true'
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
    >
      <Avatar src={getImageUrl(user.photo)} />
    </Button>
    <Menu
      id='demo-positioned-menu'
      aria-labelledby='demo-positioned-button'
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <MenuItem onMouseOut={handleClose} className='z-[10]'>
        <Card sx={{ maxWidth: 345, border: '', zIndex: '100' }}>
          <CardActionArea>
            <CardMedia
              component='img'
              className='h-[345px]'
              image={getImageUrl(user.photo)}
              alt='green iguana'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {user.username}
              </Typography>
              <Typography variant='body2' color='text.secondary' className='flex flex-col'>
                <span>First Name: {user.first_name}</span>
                <span>Last Name: {user.last_name}</span>
                <span>Email: {user.email}</span>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </MenuItem>
    </Menu>
  </div>
}

BaseUserCard.propTypes = {
  user: PropTypes.object
}

export default BaseUserCard
