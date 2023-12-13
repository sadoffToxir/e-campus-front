import React, { useEffect, useState } from 'react'
import { Card, CardContent, Container, Button, Typography, InputLabel, InputAdornment, OutlinedInput, FormControl } from '@mui/material'
import api from '@/services/api'
import { useNavigate } from 'react-router-dom'
import SaveIcon from '@mui/icons-material/Save'
import CoreAppBar from '@/components/core/appbar/CoreAppBar.jsx'

const Profile = () => {
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false)
  const [editedValues, setEditedValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  })
  const [photo, setPhoto] = useState(
    'https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F211227135008-02-the-batman-trailer.jpg'
  )
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

    setIsEditing(false)
    setChangesSaved(true)
  }

  const renderEditableField = (fieldName, label, value) => (
    <Typography variant='h6'>
      {label}:{' '}
      {isEditing ? (
        <FormControl variant='outlined'>
          <InputLabel htmlFor={`edited${fieldName}`}>{label}</InputLabel>
          <OutlinedInput
            label={label}
            id={`edited${fieldName}`}
            type={fieldName === 'password' ? 'password' : 'text'}
            value={editedValues[fieldName]}
            onChange={(e) => setEditedValues((prevValues) => ({ ...prevValues, [fieldName]: e.target.value }))}
          />
        </FormControl>
      ) : (
        <span color='#3399ff'>
          {value}
        </span>
      )}
    </Typography>
  )

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Assuming api.getProfile() returns user details
        const userProfile = await api.getProfile()

        // Update state with user details
        setFirstName(userProfile.first_name || '')
        setLastName(userProfile.last_name || '')
        setUsername(userProfile.username || '')
        setEmail(userProfile.email || '')
        setPassword(userProfile.password || '') // Assuming you have a password property in the user profile

        // Initialize edited values with current values
        setEditedValues({
          firstName: userProfile.first_name || '',
          lastName: userProfile.last_name || '',
          username: userProfile.username || '',
          email: userProfile.email || '',
          password: userProfile.password || '',
        })

        // Save initial values for comparison
        setInitialValues({
          firstName: userProfile.first_name || '',
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
      editedValues.lastName !== initialValues.lastName ||
      editedValues.username !== initialValues.username ||
      editedValues.email !== initialValues.email ||
      editedValues.password !== initialValues.password

    setChangesSaved(!hasChanges)
  }, [editedValues, initialValues])

  return (
    <Container maxWidth='lg'>
      <Card>
        <CardContent>
          <Typography variant='h4' style={{ padding: '20px' }}>
            User Profile
          </Typography>
          <div className='w-[100px] h-[100px]'>
            <img src={photo} alt='User' className='rounded-full w-full h-full' />
          </div>
          <div className='flex flex-col gap-2'>
            {renderEditableField('firstName', 'First Name', firstName)}
            {renderEditableField('lastName', 'Last Name', lastName)}
            {renderEditableField('username', 'Username', username)}
            {renderEditableField('email', 'Email', email)}
            {renderEditableField('password', 'Password', '********')}
            {/* Add other details as needed */}
          </div>
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
        </CardContent>
      </Card>
    </Container>
  )
}

export default Profile
