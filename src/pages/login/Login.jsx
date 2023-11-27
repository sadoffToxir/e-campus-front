import { useState } from 'react'
import { Card, CardContent, Container, Button, TextField, Typography, IconButton, InputAdornment, Input } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import style from './Login.module.scss'
import { login } from '@/services/api/auth'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)

  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleUsername = (e) => {
    setUsername(e.currentTarget.value)
  }

  const handlePassword = (e) => {
    setPassword(e.currentTarget.value)
  }

  const handleLogin = () => {
    login({
      username_email: username,
      password: password
    })
  }

  return (
    <Container maxWidth='xs' className='mt-52'>
      <Card sx={{ minWidth: 275 }}>
        <CardContent className='flex gap-8 flex-col items-center'>
          <div className='text-center my-4'>
            <Typography variant='h4' className={style.title}>Login</Typography>
            <Typography>Sign in to your account</Typography>
          </div>
          <TextField value={username} onChange={handleUsername} label='Username/Email' placeholder='Username or Email' className='w-full' />
          <Input
            value={password}
            label='Password'
            className='w-full'
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
          <div className='w-full'>
            <Button variant='contained' className='w-full' onClick={handleLogin}>Login</Button>
            <Typography className='text-center'>Forgot my password</Typography>
          </div>
          <Button className='w-full'>Register New Account</Button>
        </CardContent>
      </Card>
    </Container >
  )
}

export default LoginPage
