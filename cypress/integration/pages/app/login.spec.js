/// <reference types="cypress" />

describe('/pages/app/login', () => {
  it('preenchas os campos e vá para página de perfil', () => {
    cy.visit('/app/login');
    cy.get('#formCadastro input[name="usuario"]').type('usuario');
    cy.get('#formCadastro input[name="senha"]').type('senha');
    cy.get('#formCadastro button[type="submit"]').click();
    cy.url().should('include', '/app/profile');
  });
});
