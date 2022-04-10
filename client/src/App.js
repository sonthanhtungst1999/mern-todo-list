import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './components/views/Auth'
import Dashboard from './components/views/Dashboard'
import { AuthContextProvider } from './components/contexts/authContext'

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Auth authRoute='login' />} />
          <Route path='/register' element={<Auth authRoute='register' />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App
