import Cookies from 'js-cookie'
import fetchApi from './fetchApi'

const testData = {
  email: 'test@afrostream.tv',
  password: '123456'
}

function setToken(data) {
  Cookies.set('token', data.access_token)
  return data
}

function signIn({ email, password } = {}) {
  return fetchApi({
    endpoint: '/auth/signin',
    method: 'POST',
    body: {
      email: email || testData.email,
      password: password || testData.password
    }
  }).then(setToken)
}

function signOut() {
  Cookies.remove('token')
}

function get() {
  return fetchApi({
    endpoint: '/api/users/me'
  })
}

const User = { signIn, signOut, get };
window.User = User
export default User;