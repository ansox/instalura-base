import { setCookie, destroyCookie } from 'nookies';
import isStagingEnv from '../../infra/env/isStangingEnv';

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

const BASE_URL = isStagingEnv
  ? 'https://instalura-api.vercel.app'
  : 'https://instalura-api.vercel.app';

const loginService = {
  async login({ username, password }, setCookieModule = setCookie, HttpClientModule = HttpClient) {
    return HttpClientModule(`${BASE_URL}/api/login`, {
      method: 'POST',
      body: {
        username,
        password,
      },
    })
      .then((response) => {
        const { token } = response.data;

        const hasToken = Boolean(token);
        if (!hasToken) {
          throw new Error('Failed to login');
        }

        setCookieModule(null, 'APP_TOKEN', token, {
          path: '/',
          maxAge: 30 * 24 * 60 * 60,
        });

        return {
          token,
        };
      });
  },

  async logout(destroyCookieModule = destroyCookie) {
    destroyCookieModule(null, 'APP_TOKEN');
  },

};

export default loginService;
