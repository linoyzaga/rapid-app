const axios = require('axios');
const headers = {
  'content-type': 'application/json',
};

function handleSessions(promise) {
  return promise.catch((error) => {
    if (error.response.status === 401) document.location.href = '/login';
    else {
      console.log('API Error: ', error);
      throw error;
    }
  });
}

class API {
  static login(username, password) {
    const opts = {
      method: 'post',
      headers,
      url: '/api/auth/login',
      data: {
        username,
        password,
      },
    };

    return handleSessions(axios(opts));
  }
}

module.exports = API;
