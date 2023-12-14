import PropTypes from 'prop-types'
import { Avatar } from '@mui/material'
import { getImageUrl } from '@/utils/image'

const BaseUserChip = (props) => {
  return <div className='bg-zinc-100 flex items-center w-fit rounded-full'>
    <Avatar sx={{ height: '60px', width: '60px' }} className='p-1' src={getImageUrl(props.user.photo)} />
    <span className='px-3 '>{props.user.username}</span>
  </div>
}

BaseUserChip.propTypes = {
  user: PropTypes.shape({
    photo: PropTypes.string,  // Assuming 'photo' can be optional
    first_name: PropTypes.string.isRequired,  // 'name' is required
    username: PropTypes.string.isRequired,  // 'name' is required
  }).isRequired,
}

export default BaseUserChip
