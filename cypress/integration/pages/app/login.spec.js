/// <reference types="cypress" />

import LoginScreenPageObject from '../../../../src/components/screens/app/LoginScreen/LoginScreen.pageObject';

describe('/pages/app/login', () => {
  describe('when fill and submit a form login request', () => {
    it('go to the profile page', () => {
      cy.intercept('https://instalura-api.vercel.app/api/login').as('useLogin');

      const loginScreen = new LoginScreenPageObject(cy);

      loginScreen
        .fillLoginForm({
          username: 'anso',
          password: 'senhasegura',
        })
        .submitLoginForm()
        .checkUrl();
    });
  });
});
