export const apiUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000'
    : 'somethingURL'

export const LOCAL_STORAGE_KEY = 'token'
