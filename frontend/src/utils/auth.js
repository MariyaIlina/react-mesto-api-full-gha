export const BASE_URL = "http://localhost:3006";

// function makeRequest(url, method, body, token) {
//   const headers = {
//     "Accept": "application/json",
//     "Content-Type": "application/json",
//   };

//   if (token !== undefined) {
//     headers["Authorization"] = `Bearer ${token}`;
//   }

//   const config = {
//     method,
//     headers,
  
//   };

//   if (body !== undefined) {
//     config.body = JSON.stringify(body);
//   }
//   return fetch(`${BASE_URL}${url}`, config)
//   .then((res) => {
//     if (!res.ok) {
//       return Promise.reject(`Ошибка: ${res.status}`);
//     }
//     console.log('res=>!!!', res);
//     return res.json();
//   });
// }

// export const register = (email, password) => {
//   return makeRequest("/signup", "POST", { email, password } );
// };

// export const authorize = (email, password) => {
//   return makeRequest("/signin", "POST", { email, password });
// };

// export const checkToken = (token) => {
//   return makeRequest("/users/me", "GET", undefined, token);
// };
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({email, password})
  })
  .then((response) => {
    return response.json();
  })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    credentials: 'include',
      body: JSON.stringify({email, password})
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err))
  };

  export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    })
    .then(res => res.json())
    .then(data => data)
  }
  
