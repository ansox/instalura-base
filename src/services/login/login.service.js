import { setCookie, destroyCookie } from 'nookies';
import isStagingEnv from '../../infra/env/isStangingEnv';
import HttpClient from '../../infra/http/HttpClient';

export const LOGIN_COOKIE_APP_TOKEN = 'APP_TOKEN';

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

        setCookieModule(null, LOGIN_COOKIE_APP_TOKEN, token, {
          path: '/',
          maxAge: 30 * 24 * 60 * 60,
        });

        return {
          token,
        };
      });
  },

  async logout(ctx, destroyCookieModule = destroyCookie) {
    destroyCookieModule(ctx, LOGIN_COOKIE_APP_TOKEN, { path: '/' });
  },

};

export default loginService;
