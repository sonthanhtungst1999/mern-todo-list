import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext, useMemo } from 'react'
import axios from 'axios'
import { AuthContext } from '../contexts/authContext'
import setAuthToken from '../utils/setAuthToken'
import { apiUrl, LOCAL_STORAGE_KEY } from '../contexts/constants'

const LoginForm = () => {
  //useContext
  const navigate = useNavigate()
  const { auth, loginUser } = useContext(AuthContext)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const { username, password } = loginForm

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const loginData = await loginUser(loginForm)
      if (loginData.success) {
        navigate('/dashboard')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Form className='my-3 w-25' onSubmit={handleLogin}>
        <Form.Group className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Username'
            name='username'
            onChange={(e) =>
              setLoginForm((preState) => ({
                ...preState,
                username: e.target.value,
              }))
            }
            required
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            onChange={(e) =>
              setLoginForm((preState) => ({
                ...preState,
                password: e.target.value,
              }))
            }
            required
          />
        </Form.Group>
        <Button variant='success' type='submit'>
          Login
        </Button>
      </Form>
      <p>
        Don't have an account?
        <Link to='/register'>
          <Button variant='secondary' size='sm' className='mx-2'>
            Register
          </Button>
        </Link>
      </p>
    </>
  )
}

export default LoginForm
