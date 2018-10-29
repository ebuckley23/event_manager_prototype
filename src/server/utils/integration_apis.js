const got = require('got');

// function baseOptions(options = {}) {
//   const {headers = {}, body = null} = options;

//   if (body) {
//     options.body = JSON.stringify(body)
//   }
//   return {
//     ...options,
//     headers: {
//       'Content-Type': 'application/json',
//       ...headers
//     }
//   }
// }

async function baseFetch(url, options = {}) {
  let {headers = {}, body = null} = options;
  if (body) options.body = JSON.stringify(body);
  headers = {
    ...headers,
    'Content-Type': 'application/json'
  }

  options.headers = headers;
  options.json = true;
  return await got(url, {...options});
}

async function eventbrite_api(url, options = {}) {
  let {headers = {}} = options;
  headers = {
    ...headers,
    Authorization: `Bearer ${process.env.EVENTBRITE_AUTH_TOKEN}`
  };
  options.baseUrl = process.env.EVENTBRITE_API;
  options.headers = headers;
  const res = await baseFetch(url, options);
  return await res.body;
}

module.exports.eventbrite_api = eventbrite_api;