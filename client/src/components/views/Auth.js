import { useContext } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import LoginForm from '../auth/LoginForm'
import RegisterForm from '../auth/RegisterForm'
import { AuthContext } from '../contexts/authContext'

const Auth = ({ authRoute }) => {
  const navigate = useNavigate()
  const {
    auth: { authLoading, isAuthenticated },
  } = useContext(AuthContext)
  let body

  if (authLoading) {
    body = (
      <div className='d-flex justify-content-center mt-2'>
        <Spinner animation='border' variant='primary' />
      </div>
    )
  } else if (isAuthenticated) {
    return <Navigate to='/dashboard' />
  } else {
    body = (
      <>
        {authRoute === 'login' && <LoginForm />}
        {authRoute === 'register' && <RegisterForm />}
      </>
    )
  }

  return (
    <div className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1>LearnIt</h1>
          {body}
        </div>
      </div>
    </div>
  )
}

export default Auth
