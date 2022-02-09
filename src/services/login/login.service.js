import { setCookie, destroyCookie } from 'nookies';

async function HttpClient(url, { headers, body, ...options }) {
  return fetch(url, {
    ...options,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Não foi possível fazer o login');
    });
}

const loginService = {
  async login({ username, password }) {
    return HttpClient('https://instalura-api.vercel.app/api/login', {
      method: 'POST',
      body: {
        username,
        password,
      },
    })
      .then((response) => {
        const { token } = response.data;
        setCookie(null, 'APP_TOKEN', token, {
          path: '/',
          maxAge: 30 * 24 * 60 * 60,
        });

        return {
          token,
        };
      });
  },

  logout() {
    destroyCookie('APP_TOKEN');
  },

};

export default loginService;
