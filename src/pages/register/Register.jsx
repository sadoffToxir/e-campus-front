import { useEffect, useState } from 'react'
import { Card, CardContent, Container, Button, Typography, IconButton, InputAdornment, OutlinedInput, FormControl, InputLabel } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeRegisterErrors } from '@/store/slices/authSlice'
import { register } from '@/store/actions/authActions'
import BaseImageUploader from '@/components/base/baseImageUploader/BaseImageUploader'

const RegisterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isAuth = useSelector(state => state.auth.isAuth)
  const errors = useSelector(state => state.auth.errors)

  const [profileImage, setProfileImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [firstName, setFistName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

  const handleProfileImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0])
      setImagePreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleFirstName = (e) => {
    setFistName(e.currentTarget.value)
  }
  const handleLastName = (e) => {
    setLastName(e.currentTarget.value)
  }
  const handleUsername = (e) => {
    dispatch(removeRegisterErrors())
    setUsername(e.currentTarget.value)
  }
  const handleEmail = (e) => {
    dispatch(removeRegisterErrors())
    setEmail(e.currentTarget.value)
  }
  const handlePassword = (e) => {
    dispatch(removeRegisterErrors())
    setPassword(e.currentTarget.value)
  }
  const handlePasswordConfirmation = (e) => {
    dispatch(removeRegisterErrors())
    setPasswordConfirmation(e.currentTarget.value)
  }

  const handleRegister = async () => {
    const credentials = {
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    }

    if (profileImage) credentials.photo = profileImage
    await dispatch(register(credentials))
  }

  // Showing password
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleClickShowPasswordConfirmation = () => setShowPasswordConfirmation((show) => !show)

  const handleMouseDownPasswordConfirmation = (event) => {
    event.preventDefault()
  }

  useEffect(() => {
    if (isAuth) navigate('/profile')
  }, [isAuth])

  return (
    <Container maxWidth='xs' className='mt-52'>
      <Card sx={{ minWidth: 275 }}>
        <CardContent className='flex gap-8 flex-col items-center'>
          <div className='text-center my-4'>
            <Typography variant='h4'>Register</Typography>
            <Typography>Register new account</Typography>
          </div>
          <img src={imagePreview} />
          <BaseImageUploader handleChange={handleProfileImage} />
          <FormControl variant='outlined' className='w-full' >
            <InputLabel htmlFor='firstName'>First Name</InputLabel>
            <OutlinedInput
              label='First Name'
              id='firstName'
              value={firstName}
              onChange={handleFirstName}
            />
          </FormControl>
          <FormControl variant='outlined' className='w-full'>
            <InputLabel htmlFor='lastName'>Last Name</InputLabel>
            <OutlinedInput
              label='Last Name'
              id='lastName'
              value={lastName}
              onChange={handleLastName}
            />
          </FormControl>
          <FormControl variant='outlined' className='w-full'>
            <InputLabel htmlFor='username'>Username</InputLabel>
            <OutlinedInput
              label='Username'
              id='username'
              error={!!errors.register && !!errors.register.username}
              value={username}
              onChange={handleUsername}
            />
            {
              errors.register && errors.register.username && <Typography className='text-red-600'>
                {errors.register.username.join('')}
              </Typography>
            }
          </FormControl>
          <FormControl variant='outlined' className='w-full'>
            <InputLabel htmlFor='email'>Email</InputLabel>
            <OutlinedInput
              id='email'
              label='Email'
              error={!!errors.register && !!errors.register.email}
              value={email}
              onChange={handleEmail}
            />
            {
              errors.register && errors.register.email && <Typography className='text-red-600'>
                {errors.register.email.join('')}
              </Typography>
            }
          </FormControl>
          <FormControl variant='outlined' className='w-full'>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <OutlinedInput
              id='password'
              label='Password'
              value={password}
              error={!!errors.register && !!errors.register.password}
              onChange={handlePassword}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {
              errors.register && errors.register.password && <Typography className='text-red-600'>
                {errors.register.password.join('')}
              </Typography>
            }
          </FormControl>
          <FormControl variant='outlined' className='w-full'>
            <InputLabel htmlFor='passwordConfirmation'>Password Confirmation</InputLabel>
            <OutlinedInput
              label='Password Confirmation'
              id='passwordConfirmation'
              value={passwordConfirmation}
              error={!!errors.register && !!errors.register.password_confirmation}
              onChange={handlePasswordConfirmation}
              type={showPasswordConfirmation ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPasswordConfirmation}
                    onMouseDown={handleMouseDownPasswordConfirmation}
                  >
                    {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {
              errors.register && errors.register.password_confirmation && <Typography className='text-red-600'>
                {errors.register.password_confirmation.join('')}
              </Typography>
            }
          </FormControl>
          <div className='w-full'>
            <Button variant='contained' className='w-full' onClick={handleRegister}>Register</Button>
          </div>
          <Button className='w-full' href='/login'>Log into existing account</Button>
        </CardContent>
      </Card>
    </Container >
  )
}

export default RegisterPage
