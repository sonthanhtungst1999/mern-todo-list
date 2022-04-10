import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { apiUrl, LOCAL_STORAGE_KEY } from './constants'
import setAuthToken from '../utils/setAuthToken'
//Context
const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    authLoading: true,
    isAuthenticated: false,
    user: null,
  })

  const loginUser = async (userForm) => {
    try {
      let response = await axios.post(`${apiUrl}/api/user/login`, userForm)
      //Success user and save token on localStorage
      if (response.data.success)
        localStorage.setItem(LOCAL_STORAGE_KEY, response.data.accessToken)
      return response.data
    } catch (err) {
      if (err.response.data) return err.response.data
      else return { success: false, message: err }
    }
  }

  //check user is valid
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_KEY]) {
      console.log('Co token')
      setAuthToken(localStorage[LOCAL_STORAGE_KEY])
    } //set token into request header
    try {
      const response = await axios.get(`${apiUrl}/api/user`)
      if (response.data.success) {
        setAuth({
          ...auth,
          authLoading: false,
          isAuthenticated: true,
          user: response.data.user,
        })
      }
    } catch (err) {
      localStorage.removeItem(LOCAL_STORAGE_KEY)
      setAuthToken(null) //remove token of header
      setAuth({
        authLoading: false,
        isAuthenticated: false,
        user: null,
      })
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  const authContextData = { auth, loginUser }

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
