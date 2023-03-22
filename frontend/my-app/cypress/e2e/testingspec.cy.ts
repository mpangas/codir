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
  it('should allow signing up for the wesbite to be possible with correct inputs and redirect to the login page to continue', () => {
    cy.visit('http://localhost:3000/signup');
    cy.get('input[id="emailbox"]').type('newtest2@newtest2.com');
    cy.get('input[id="usernamebox"]').type('newtest2');
    cy.get('input[id="passwordbox"]').type('newtest2');
    cy.get('button[id="signupbox"]').click()
  });
});

describe('Login tests', () => {
  it('should login to the account', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[label="Username"]').type('apples');
    cy.get('input[label="Password"]').type('apples123');
    cy.get('button[id="loginbox"]').click()
  });
});