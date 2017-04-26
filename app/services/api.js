import { schema, normalizr } from 'normalizr';
import 'isomorphic-fetch';
import reqwest from 'reqwest';

const API_ROOT = 'http://localhost:8080';

function callApi({ endpoint, _schema, method = 'GET', data, token }) {
  // const fullUrl = __SERVER__ ? `${API_ROOT}${endpoint}` : endpoint;
  const fullUrl = `${API_ROOT}${endpoint}`;
  let request;
  // let config;
  if (method === 'GET') {
    const headers = {};
    if (token) {
      headers['X-Authorization'] = `Bearer ${token}`;
    }
    request = new Request(fullUrl, {
      method,
      headers: new Headers(headers),
    });
    // config = {
    //   url: fullUrl,
    //   method,
    //   headers,
    // };
  } else {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['X-Authorization'] = `Bearer ${token}`;
    }
    request = new Request(fullUrl, {
      method,
      headers: new Headers(headers),
      body: data ? JSON.stringify(data) : '',
    });
  }
  //   config = {
  //     url: fullUrl,
  //     method,
  //     headers,
  //     data: data ? data : {},
  //   };
  // }
  // return reqwest(config).then((resp) => {
  //   console.log(resp);
  //   return resp;
  // });
  return fetch(request)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      // 如果指定了 schema，在请求成功的情况，则默认存在 data 数据项
      if (_schema) {
        // 如果存在 data.items，则为数组（且含有 total）
        if (json.data.items) {
          // console.log(normalize(json.data.items, [_schema]));
          const total = json.data.total;
          return {
            ...normalize(json.data.items, _schema),
            total,
          };
        }
        // 否则为单个数据实体
        return normalize(json.data, _schema);
      }

      // 如果不指定 schema，则返回原 json 数据
      return json;
    })
    .then(
      response => ({ response }),
      error => ({ error: error.message || 'Something bad happened' }),
    );
}

export const login = (username, password) => callApi({
  endpoint: '/v1/auth/login/',
  method: 'POST',
  data: {
    username,
    password,
  },
});

export const register = (username, password, email) => callApi({
  endpoint: '/v1/user/reg/',
  method: 'PUT',
  data: {
    username,
    password,
    email,
  },
});

export const changepassword = (oldpassword, newpassword, token) => callApi({
  endpoint: '/v1/user/psw',
  method: 'POST',
  token,
  data: {
    oldPassword: oldpassword,
    newPassword: newpassword,
  },
});


export const fetchProgram = (id, token) => callApi({
  endpoint: `/v1/program/detail/${id}/`,
  token,
});

export const fetchAllPrograms = (token) => callApi({
  endpoint: '/v1/program/all/',
  token,
});

export const addProgram = (newProgram, token) => callApi({
  endpoint: '/v1/program/',
  method: 'PUT',
  data: newProgram,
  token,
});

export const updateProgram = (updatedProgram) => callApi({
  endpoint: '/v1/program/',
  method: 'POST',
  data: updatedProgram,
  token,
});

