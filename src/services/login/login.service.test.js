import loginService from './login.service';

const token = 'fake-token';

async function HttpClientError() {
  return {
    data: {
    },
    err: {
      message: 'Failed to login',
    },
  };
}

async function HttpClient() {
  return {
    data: {
      token,
    },
  };
}

const setCookie = jest.fn();

const destroyCookie = jest.fn();

describe('loginService', () => {
  describe('login()', () => {
    describe('when user try to login', () => {
      describe('and succeed', () => {
        test('store its token', async () => {
          const loginServiceResponse = await loginService.login({
            username: 'name',
            password: 'password',
          }, setCookie, HttpClient);

          expect(setCookie).toHaveBeenCalledWith(null, 'APP_TOKEN', token, {
            path: '/',
            maxAge: 30 * 24 * 60 * 60,
          });

          expect(loginServiceResponse).toEqual({ token });
        });
      });

      describe('and it fails', () => {
        test('throws an error', async () => {
          await expect(loginService.login({
            username: 'name',
            password: 'password',
          }, setCookie, HttpClientError))
            .rejects
            .toThrow('Failed to login');
        });
      });
    });
  });

  describe('logout()', () => {
    describe('when user try to logout and succeed', () => {
      test('remove its token', async () => {
        await loginService.logout(null, destroyCookie);

        expect(destroyCookie).toHaveBeenCalledWith(null, 'APP_TOKEN');
      });
    });
  });
});
