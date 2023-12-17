import { useEffect, useState } from 'react'
import { Card, CardContent, Container, Button, Typography, Input, Avatar } from '@mui/material'
import api from '@/services/api'
import { useNavigate } from 'react-router-dom'
import { getImageUrl } from '@/utils/image'
import BaseImageUploader from '../../components/base/BaseImageUploader/BaseImageUploader'
import { useDispatch } from 'react-redux'
import { updateProfile } from '@/store/actions/authActions'

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false)
  const [editedValues, setEditedValues] = useState({
    imagePreview: '',
    profileImage: null,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  })

  const [userProfile, setUserProfile] = useState(null)
  const [profileImage, setProfileImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [initialValues, setInitialValues] = useState({})
  const [changesSaved, setChangesSaved] = useState(true)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSaveChanges = () => {
    // Add logic to save all the edited values
    setFirstName(editedValues.firstName)
    setLastName(editedValues.lastName)
    setUsername(editedValues.username)
    setEmail(editedValues.email)
    setPassword(editedValues.password)
    setImagePreview(editedValues.imagePreview)
    setProfileImage(editedValues.profileImage)
    setIsEditing(false)
    setChangesSaved(true)

    const requestPayload = {
      email: editedValues.email,
      first_name: editedValues.firstName,
      last_name: editedValues.lastName,
      username: editedValues.username,
      id: userProfile.id,
    }

    if (getImageUrl(userProfile.photo) !== editedValues.imagePreview) {
      requestPayload.photo = editedValues.profileImage
    }

    dispatch(updateProfile(requestPayload))
  }

  const renderEditableField = (fieldName, label, value) => (
    <Typography variant='h6' className={` ${isEditing ? 'bg-[#D9D9D9]' : 'bg-[#E8E8E8]'} p-2 flex justify-between`}>
      <span>{label}:</span>
      {isEditing ? (
        <Input
          className='w-[30%]'
          type={fieldName === 'password' ? 'password' : 'text'}
          value={editedValues[fieldName]}
          onChange={(e) => setEditedValues((prevValues) => ({ ...prevValues, [fieldName]: e.target.value }))}
        />
      ) : (
        <span>
          {value}
        </span>
      )}
    </Typography>
  )

  const handleProfileImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEditedValues({ ...editedValues, imagePreview: URL.createObjectURL(e.target.files[0]), profileImage: e.target.files[0] })
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Assuming api.getProfile() returns user details
        const userProfile = await api.getProfile()

        setUserProfile(userProfile)

        // Update state with user details
        setFirstName(userProfile.first_name || '')
        setImagePreview(getImageUrl(userProfile.photo))
        setLastName(userProfile.last_name || '')
        setUsername(userProfile.username || '')
        setEmail(userProfile.email || '')
        setPassword(userProfile.password || '') // Assuming you have a password property in the user profile

        // Initialize edited values with current values
        setEditedValues({
          imagePreview: getImageUrl(userProfile.photo),
          profileImage: userProfile.photo,
          firstName: userProfile.first_name || '',
          lastName: userProfile.last_name || '',
          username: userProfile.username || '',
          email: userProfile.email || '',
          password: userProfile.password || '',
        })

        // Save initial values for comparison
        setInitialValues({
          firstName: userProfile.first_name || '',
          imagePreview: getImageUrl(userProfile.photo),
          profileImage: userProfile.photo,
          lastName: userProfile.last_name || '',
          username: userProfile.username || '',
          email: userProfile.email || '',
          password: userProfile.password || '',
        })
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }

    fetchProfile()
  }, [])

  // Check if there are changes to enable/disable the Save Changes button
  useEffect(() => {
    const hasChanges =
      editedValues.firstName !== initialValues.firstName ||
      editedValues.imagePreview !== initialValues.imagePreview ||
      editedValues.lastName !== initialValues.lastName ||
      editedValues.username !== initialValues.username ||
      editedValues.email !== initialValues.email ||
      editedValues.password !== initialValues.password

    setChangesSaved(!hasChanges)
  }, [editedValues, initialValues])

  return (
    <Container maxWidth='lg'>
      <Card>
        <CardContent className='flex flex-col gap-[30px]' sx={{ padding: '50px' }}>
          <Typography variant='h4'>
            User Profile
          </Typography>
          <div className='flex justify-center'>
            {
              isEditing
                ? <BaseImageUploader handleChange={handleProfileImage} />
                : <Avatar src={imagePreview} alt='User' className='rounded-full' sx={{ height: '150px', width: '150px' }} />
            }
          </div>
          <div className='flex flex-col gap-2'>
            {renderEditableField('firstName', 'First Name', firstName)}
            {renderEditableField('lastName', 'Last Name', lastName)}
            {renderEditableField('username', 'Username', username)}
            {renderEditableField('email', 'Email', email)}
          </div>
          <div className='flex justify-end gap-[20px]'>
            {isEditing && (
              <>
                <Button variant='contained' onClick={() => handleSaveChanges()}>
                  Save Changes
                </Button>
                <Button variant='contained' onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </>
            )}
            {!isEditing && (
              <Button variant='contained' onClick={() => handleEdit()} disabled={isEditing}>
                Edit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Profile