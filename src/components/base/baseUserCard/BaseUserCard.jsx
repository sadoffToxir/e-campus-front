import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { getImageUrl } from '@/utils/image'

const BaseUserCard = ({ user }) => {
  return <Card sx={{ maxWidth: 345 }}>
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
}

BaseUserCard.propTypes = {
  user: PropTypes.object
}

export default BaseUserCard