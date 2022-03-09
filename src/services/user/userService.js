import isStagingEnv from '../../infra/env/isStangingEnv';
import HttpClient from '../../infra/http/HttpClient';
import authService from '../auth/authService';

const BASE_URL = isStagingEnv
  ? 'https://instalura-api.vercel.app'
  : 'https://instalura-api.vercel.app';

const userService = {
  async getProfilePage(ctx) {
    const url = `${BASE_URL}/api/users/posts`;
    const token = await authService(ctx).getToken();
    const response = await HttpClient(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      user: {
        totalLikes: 100,
      },
      posts: response.data,
    };
  },
};

export default userService;
