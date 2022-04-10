import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const RegisterForm = () => {
  return (
    <>
      <Form className='my-3 w-25'>
        <Form.Group className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Username'
            name='username'
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Control
            type='password'
            placeholder='Cofirm password'
            name='confirmPassword'
            required
          />
        </Form.Group>
        <Button variant='success' type='submit'>
          Login
        </Button>
      </Form>
      <p>
        Already have an account?
        <Link to='/login'>
          <Button variant='secondary' size='sm' className='mx-2'>
            Login
          </Button>
        </Link>
      </p>
    </>
  )
}

export default RegisterForm
