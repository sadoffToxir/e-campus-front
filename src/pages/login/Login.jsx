import { useEffect, useState } from 'react'
import { Card, CardContent, Container, Button, Typography, IconButton, InputAdornment, OutlinedInput, FormControl, InputLabel } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '@/store/actions/authActions'
import style from './Login.module.scss'
import { useNavigate } from 'react-router-dom'
import { removeLoginErrors } from '@/store/slices/authSlice'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isAuth = useSelector(state => state.auth.isAuth)
  const errors = useSelector(state => state.auth.errors)

  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleUsername = (e) => {
    dispatch(removeLoginErrors())
    setUsername(e.currentTarget.value)
  }

  const handlePassword = (e) => {
    dispatch(removeLoginErrors())
    setPassword(e.currentTarget.value)
  }

  const handleLogin = async () => {
    dispatch(login({
      username_email: username,
      password: password
    }))
  }

  useEffect(() => {
    if (isAuth) navigate('/profile')
  }, [isAuth])

  return (
    <Container maxWidth='xs' className='mt-52'>
      <Card sx={{ minWidth: 275 }}>
        <CardContent className='flex gap-8 flex-col items-center'>
          <div className='text-center my-4'>
            <Typography variant='h4' className={style.title}>Login</Typography>
            <Typography>Sign in to your account</Typography>
          </div>
          <FormControl variant='outlined' className='w-full' >
            <InputLabel htmlFor='username'>Username/Email</InputLabel>
            <OutlinedInput
              label='Username/Email'
              id='username'
              error={!!errors.login}
              value={username}
              onChange={handleUsername}
            />
            {
              errors.login && errors.login.username_email && <Typography className='text-red-600'>
                {errors.login.username_email.join('')}
              </Typography>
            }
          </FormControl>
          <FormControl variant='outlined' className='w-full'>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <OutlinedInput
              id='password'
              error={!!errors.login}
              label='Password'
              value={password}
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
              errors.login && errors.login.password && <Typography className='text-red-600'>
                {errors.login.password.join('')}
              </Typography>
            }
          </FormControl>
          {
            errors.login && <Typography className='text-red-600'>
              {errors.login.detail}
            </Typography>
          }
          <div className='w-full'>
            <Button variant='contained' className='w-full' onClick={handleLogin}>Login</Button>
          </div>
          <Button className='w-full' href='/register'>Register New Account</Button>
        </CardContent>
      </Card>
    </Container >
  )
}

export default LoginPage
