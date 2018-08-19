
const path = '/api/'

const getPath = (url) => (path.concat(url))

const responseStatus = (response) => {
  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
};

const jsonResponse = (response) => (response.json())

const errorResponse = (response) => { console.log(response)}

export const apiFetch = (url) => (
  fetch(getPath(url), {credentials: 'include'})
  .then(responseStatus)
  .then(jsonResponse)
  .then((data) => (Promise.resolve(data))
  ).catch(errorResponse)
)

export const apiUpdate = (url, jsonData) => (
  fetch(getPath(url), {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token' : QM.CONST.CSRF_TOKEN
    },
    body: JSON.stringify(jsonData)
  })
  .then(jsonResponse)
  .then((data) => (Promise.resolve(data))
  ).catch(errorResponse)
)

export const apiPost = (url, jsonData) => (
  fetch(getPath(url), {
    credentials: 'include',
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token' : QM.CONST.CSRF_TOKEN
    },
    body: JSON.stringify(jsonData)
  })
  .then(jsonResponse)
  .then((data) => (Promise.resolve(data))
  ).catch(errorResponse)
)

export const apiDelete = (url, jsonData) => (
  fetch(getPath(url), {
    credentials: 'include',
    method: 'delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token' :  QM.CONST.CSRF_TOKEN
    },
    body: JSON.stringify(jsonData)
  })
  .then(jsonResponse)
  .then((data) => (Promise.resolve(data))
  ).catch(errorResponse)
)
