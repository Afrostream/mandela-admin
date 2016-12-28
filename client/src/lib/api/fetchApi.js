import Cookies from 'js-cookie'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log('Status Error :', error); // eslint-disable-line no-console
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

function fetchApi({ endpoint, method, headers, body }) {
  return fetch(endpoint, {
    method: method || 'GET',
    headers: Object.assign({}, {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Token': Cookies.get('token')
    }, headers),
    accept: 'application/json',
    body: JSON.stringify( body )
  }).then(checkStatus)
    .then(parseJSON)
}

export default fetchApi;