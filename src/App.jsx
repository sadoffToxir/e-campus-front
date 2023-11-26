import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/login/Login'

function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<Navigate to='/' replace />} />
        <Route path='/login' element={<LoginPage />} />
        <Route index element={<Navigate to='/' replace />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  )
}

export default App
