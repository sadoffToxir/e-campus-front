import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGroupsList, createNewGroup, getGroup, editGroup } from '@/store/actions/groupsActions'
import styles from './Groups.module.scss'
import { Typography, Button } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import CreateGroup from '@/components/groups/CreateGroup'
import DeleteGroup from '@/components/groups/DeleteGroup'
import JoinGroup from '@/components/groups/JoinGroup'
import { setInitialGroupValues } from '@/store/slices/groupsSLice'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import GroupDetails from '../../components/groups/GroupDetails'
import Topics from '../../components/topics/Topics'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const Groups = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const groups = useSelector(state => state.groups.groups)
  const profile = useSelector(state => state.auth.profile)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openJoinModal, setOpenJoinModal] = useState(false)

  const [activeGroup, setActiveGroup] = useState(null)
  const [isDetails, setIsDetails] = useState(false)

  const handleActiveGroup = (group) => {
    setIsDetails(false)
    navigate(`/groups/${group.id}`)
  }

  const handleOpenDeleteModal = (groupId) => {
    dispatch(getGroup(groupId))
    setOpenDeleteModal(true)
  }

  const handleOpenCreateModal = () => {
    dispatch(setInitialGroupValues())
    setOpenCreateModal(true)
  }

  const handleOpenEditModal = (groupId) => {
    dispatch(getGroup(groupId))
    setOpenEditModal(true)
  }

  const handleCreateGroup = (data) => {
    dispatch(createNewGroup(data))
  }

  const handleEditGroup = (data) => {
    dispatch(editGroup(data))
  }

  const handleOpenDetails = () => {
    setIsDetails(true)
  }

  const handleCloseDetails = () => {
    setIsDetails(false)
  }
  const groupsElementsList = groups ? groups.map((group) => {
    const backgroundColor = activeGroup && activeGroup.id === group.id ? 'bg-slate-300' : 'bg-slate-200'

    return <div
      key={group.id}
      className={`p-2 ${backgroundColor} hover:bg-slate-300 cursor-pointer flex justify-center py-0`}
    >
      <span className='grow py-3' onClick={() => handleActiveGroup(group)}>
        {group.name}
      </span>
      {
        profile && profile.is_staff &&
        <div className='flex items-center bg-slate-200'>
          <EditIcon onClick={() => handleOpenEditModal(group.id)} />
          <DeleteIcon onClick={() => handleOpenDeleteModal(group.id)} />
        </div>
      }
    </div>
  }) : null

  useEffect(() => {
    dispatch(getGroupsList())
  }, [])

  useEffect(() => {
    const groupId = location.pathname.split('/')[2]
    const group = groups && groups.find((group) => group.id === +groupId)

    setActiveGroup(group)
  }, [location, groups])

  return <div className='flex h-full bg-white'>
    <div className={`w-[30%] text-center text-lg ${styles.itemsListColumn} flex flex-col`}>
      <CreateGroup handleSubmit={handleEditGroup} open={openEditModal} setOpen={setOpenEditModal} action='edit' />
      <CreateGroup handleSubmit={handleCreateGroup} open={openCreateModal} setOpen={setOpenCreateModal} action='create' />
      <DeleteGroup open={openDeleteModal} setOpen={setOpenDeleteModal} />
      <JoinGroup open={openJoinModal} setOpen={setOpenJoinModal} />

      <div className='h-20 flex flex-row p-4 justify-between items-center'>
        <Typography variant='h5' className='h-fit grow'>
          Groups
        </Typography>
        <Button variant='outlined' onClick={() => setOpenJoinModal(true)}>Join <AddIcon /></Button>
      </div>
      <div className='bg-slate-100 grow'>
        {groupsElementsList}
        {
          profile && profile.is_staff && <>
            <Button onClick={handleOpenCreateModal}>Create new group</Button>
          </>
        }
      </div>
    </div>
    <div className='grow flex flex-col'>
      <Typography variant='h5' className='py-4 text-center h-16 flex'>
        {
          activeGroup && isDetails && <Button className='px-4' onClick={handleCloseDetails}><ArrowBackIcon /></Button>
        }
        <span className='grow' onClick={handleOpenDetails}>{activeGroup && activeGroup.name}</span>
      </Typography>
      <div className='bg-slate-300 h-max grow'>
        <div className='mx-3 my-2 bg-white px-5 py-3'>
          {
            activeGroup ? isDetails ? <GroupDetails group={activeGroup} /> : <Topics groupId={activeGroup.id} /> : null
          }
        </div>
      </div>
    </div >
  </div >
}

export default Groups