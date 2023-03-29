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
    cy.get('input[type="username"]').type('apples');
    cy.get('input[type="password"]').type('apples123');
    cy.get('button[id="loginbox"]').click()
  });
});

describe('Login and dashboard navigation', () => {
  it('should login to the account then navigate to dashboard page', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[type="username"]').type('sample');
    cy.get('input[type="password"]').type('sample');
    cy.get('button[id="loginbox"]').click()
    cy.get('.MuiButton-root').contains("DASHBOARD").click() 
    cy.url().should('include', 'http://localhost:3000/dashboard')
    cy.get('h1').should('contain', 'DASHBOARD')
  });
});

describe('Login and browse navigation', () => {
  it('should login to the account then navigate to browse page', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[type="username"]').type('sample');
    cy.get('input[type="password"]').type('sample');
    cy.get('button[id="loginbox"]').click()
    cy.get('.MuiButton-root').contains("BROWSE").click() 
    cy.url().should('include', 'http://localhost:3000/browse')
    cy.get('h1').should('contain', 'Browse')
  });
});

describe('Login and about page navigation', () => {
  it('should login to the account then navigate to about  page', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[type="username"]').type('sample');
    cy.get('input[type="password"]').type('sample');
    cy.get('button[id="loginbox"]').click()
    cy.get('.MuiButton-root').contains("ABOUT US").click() 
    cy.url().should('include', 'http://localhost:3000/about')
    cy.get('h1').should('contain', 'About Us')
  });
});

describe('Login and about test navigation', () => {
  it('should login to the account then navigate to test  page', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[type="username"]').type('sample');
    cy.get('input[type="password"]').type('sample');
    cy.get('button[id="loginbox"]').click()
    cy.get('.MuiButton-root').contains("TEST").click() 
    cy.url().should('include', 'http://localhost:3000/test')
    cy.get('h1').should('contain', 'TEST')
  });
});