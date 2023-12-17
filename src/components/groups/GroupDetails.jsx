import { Typography } from '@mui/material'
import BaseUserChip from '@/components/base/baseUserChip/BaseUserChip'
import BaseUserCard from '@/components/base/baseUserCard/BaseUserCard'
import { unixToIsoDate } from '@/utils/date'
import PropTypes from 'prop-types'

const GroupDetails = ({ group }) => {
  return <>
    <div className='flex flex-col flex-wrap gap-2'>
      <Typography className='flex justify-between' variant='h6' sx={{ backgroundColor: '#E8E8E8', padding: '4px 10px' }}>
        <span>Name:</span> <span>{group.name}</span>
      </Typography>
      <Typography className='flex justify-between' variant='h6' sx={{ backgroundColor: '#E8E8E8', padding: '4px 10px' }}>
        <span>Creation date:</span> <span>{unixToIsoDate(group.created_at)}</span>
      </Typography>
      <Typography className='flex justify-between' variant='h6' sx={{ backgroundColor: '#E8E8E8', padding: '4px 10px' }}>
        <span>Description:</span> <span>{group.description}</span>
      </Typography>
      <Typography className='flex justify-between' variant='h6' sx={{ backgroundColor: '#E8E8E8', padding: '4px 10px' }}>
        <span>Join Code:</span> <span>{group.join_code}</span>
      </Typography>
      <Typography className='flex justify-between items-center' variant='h6' sx={{ backgroundColor: '#E8E8E8', padding: '4px 10px' }}>
        <span>Owner:</span>

        <BaseUserCard user={group.owner} />
      </Typography>
    </div>
    <div>
      <Typography variant='h5' sx={{ margin: '20px 0 10px' }}>
        Members:
      </Typography>
      <div className='flex gap-3'>
        {
          group.members.map(member => {
            return <div key={member.id}><BaseUserChip user={member} /></div>
          })
        }
      </div>
    </div>
  </>
}

GroupDetails.propTypes = {
  group: PropTypes.object,
}

export default GroupDetails