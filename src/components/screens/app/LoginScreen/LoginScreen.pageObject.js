export default class LoginScreenPageObject {
  constructor(cy) {
    this.cy = cy;

    this.cy.visit('/app/login');
  }

  fillLoginForm({ username, password }) {
    this.cy.get('#formCadastro input[name=usuario]').type(username);
    this.cy.get('#formCadastro input[name=senha]').type(password);
    return this;
  }

  submitLoginForm() {
    this.cy.get('#formCadastro button[type=submit]').click();
    return this;
  }

  checkUrl() {
    this.cy.wait('@useLogin')
      .then((intercept) => {
        const { token } = intercept.response.body.data;
        this.cy.getCookie('APP_TOKEN')
          .should('exist')
          .and('have.property', 'value', token);
      });
  }
}
