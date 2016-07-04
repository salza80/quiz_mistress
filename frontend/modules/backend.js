
var backend = {
  path: '/api/'
};

backend.getPath = function(url){
  return this.path.concat(url);
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
  return fetch(this.getPath(url), {credentials: 'include'})
  .then(this.status)
  .then(this.json)
  .then(function(data) {
    return Promise.resolve(data);
  }).catch(this.error);
};

backend.postJSON = function(url, jsonData) {
  return fetch(this.getPath(url), {
    credentials: 'include',
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token' : ZQP.CONST.CSRF_TOKEN
    },
    body: JSON.stringify(jsonData)
  })
  .then(this.json)
  .then(function (data) {
    return Promise.resolve(data);
  }).catch(this.error);
}; 

backend.delete = function(url, jsonData) {
  return fetch(this.getPath(url), {
    credentials: 'include',
    method: 'delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token' :  ZQP.CONST.CSRF_TOKEN
    },
    body: JSON.stringify(jsonData)
  })
  .then(this.status)
  .then(this.json)
  .then(function(data) {
    return Promise.resolve(data);
  }).catch(this.error);
};

module.exports = backend;
