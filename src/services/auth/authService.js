import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import loginService, { LOGIN_COOKIE_APP_TOKEN } from '../login/login.service';
import HttpClient from '../../infra/http/HttpClient';
import isStagingEnv from '../../infra/env/isStangingEnv';

const BASE_URL = isStagingEnv
  ? 'https://instalura-api.vercel.app'
  : 'https://instalura-api.vercel.app';

const authService = (ctx) => {
  const cookies = parseCookies(ctx);
  const token = cookies[LOGIN_COOKIE_APP_TOKEN];

  return {
    async getToken() {
      return token;
    },

    async hasActiveSession() {
      return HttpClient(`${BASE_URL}/api/auth`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(({ data }) => {
          if (data.authenticated) {
            return true;
          }

          loginService.logout(ctx);
          return false;
        })
        .catch(() => {
          loginService.logout(ctx);
          return false;
        });
    },
    async getSession() {
      const session = jwt.decode(token);
      return session.user;
    },
  };
};

export default authService;
