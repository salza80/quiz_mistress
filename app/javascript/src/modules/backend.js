
var backend = {
  path: '/api/'
};

backend.getPath = function(url){
  return backend.path.concat(url);
};

backend.status = function(response) {
  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
};

backend.json = function(response) {
  return response.json();
};

backend.error = function(response) {};

backend.fetch = function(url) {
  return fetch(backend.getPath(url), {credentials: 'include'})
  .then(backend.status)
  .then(backend.json)
  .then(function(data) {
    return Promise.resolve(data);
  }).catch(backend.error);
};
backend.updateJSON = function(url, jsonData) {
  return fetch(backend.getPath(url), {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token' : QM.CONST.CSRF_TOKEN
    },
    body: JSON.stringify(jsonData)
  })
  .then(backend.json)
  .then(function (data) {
    return Promise.resolve(data);
  }).catch(backend.error);
}; 
backend.postJSON = function(url, jsonData) {
  return fetch(backend.getPath(url), {
    credentials: 'include',
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token' : QM.CONST.CSRF_TOKEN
    },
    body: JSON.stringify(jsonData)
  })
  .then(backend.json)
  .then(function (data) {
    return Promise.resolve(data);
  }).catch(backend.error);
}; 

backend.delete = function(url, jsonData) {
  return fetch(backend.getPath(url), {
    credentials: 'include',
    method: 'delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token' :  QM.CONST.CSRF_TOKEN
    },
    body: JSON.stringify(jsonData)
  })
  .then(backend.status)
  .then(backend.json)
  .then(function(data) {
    return Promise.resolve(data);
  }).catch(backend.error);
};

module.exports = backend;
