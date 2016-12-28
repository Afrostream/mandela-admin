import Cookies from 'js-cookie'
import fetchApi from './fetchApi'

const testData = {
  email: 'test@afrostream.tv',
  password: '123456'
}

function setToken(data) {
  console.log('User Data :', data)
  Cookies.set('token', data.access_token)
  return data
}

function userLogger(data) {
  console.log('USER :', data)
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

function get() {
  return fetchApi({
    endpoint: '/api/users/me'
  }).then(userLogger);
}

const User = { signIn, get };
window.User = User
export default User;