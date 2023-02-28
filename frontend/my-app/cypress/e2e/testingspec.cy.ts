import jest from 'jest'

describe('Login', () => {
  it('shows a login button', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('button[id="loginbox"]').click();
  });
});

describe('Sign Up', () => {
  it('shows a sign up button', () => {
    cy.visit('http://localhost:3000/signup');
    cy.get('button[id="signupbox"]').click();
  });
});