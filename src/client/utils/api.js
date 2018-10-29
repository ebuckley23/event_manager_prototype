let authToken = null;

if (typeof (Storage) !== 'undefined') {
  authToken = localStorage.authToken;
}

async function baseFetch(url, options = {}) {
  const {headers = {}, body = null} = options;

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  const req = new Request(url, {
    ...options,
    headers: new Headers({
      'Content-Type': 'application/json',
      ...headers
    })
  });

  return fetch(req).then((res) => {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res;
  });
}

export default function api(url, options) {
  return baseFetch(`/api${url}`, options);
}