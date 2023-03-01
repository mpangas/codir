import jest from 'jest'

describe('Login', () => {
  it('shows a login button', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('button[id="loginbox"]').click();
  });
});

describe('Sign up', () => {
  it('shows a sign up button', () => {
    cy.visit('http://localhost:3000/signup');
    cy.get('button[id="signupbox"]').click();
  });
});

describe('Sign up testing submit', () => {
  it('should allow signing up for the wesbite to be possible with correct inputs', () => {
    cy.visit('http://localhost:3000/signup');
    cy.get('input[id="emailbox"]').type('test@test.com');
    cy.get('input[id="usernamebox"]').type('test');
    cy.get('input[id="passwordbox"]').type('testpassword');
  });
});