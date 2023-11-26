import { useState } from 'react'
import { Container, TextField, Button, Typography } from '@mui/material'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login', { username, password })
  }

  return (
    <Container maxWidth='xs'>
      <Typography variant='h4' component='h1' gutterBottom>
        Login
      </Typography>
      <TextField
        label='Username'
        fullWidth
        placeholder='username or email'
        margin='normal'
        variant='outlined'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label='Password'
        fullWidth
        margin='normal'
        variant='outlined'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        fullWidth
        variant='contained'
        color='primary'
        onClick={handleLogin}
      >
        Log In
      </Button>
    </Container>
  )
}

export default LoginPage
