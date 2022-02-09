/// <reference types="cypress" />

describe('/pages/app/login', () => {
  it('preenchas os campos e vá para página de perfil', () => {
    cy.intercept('https://instalura-api.vercel.app/api/login').as('useLogin');
    cy.visit('/app/login');
    cy.get('#formCadastro input[name="usuario"]').type('Anso2022-2');
    cy.get('#formCadastro input[name="senha"]').type('senhasegura');
    cy.get('#formCadastro button[type="submit"]').click();
    cy.url().should('include', '/app/profile');

    cy.wait('@useLogin')
      .then((intercept) => {
        const { token } = intercept.response.body.data;
        cy.getCookie('APP_TOKEN')
          .should('exist')
          .and('have.property', 'value', token);
      });
  });
});
