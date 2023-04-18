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
    cy.contains('Browse Tutorials').should('exist')
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


describe('Login and preferences navigation', () => {
  it('should login to the account then navigate to preferences page', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[type="username"]').type('sample');
    cy.get('input[type="password"]').type('sample');
    cy.get('button[id="loginbox"]').click()
    cy.get('.MuiButton-root').contains("PREFERENCES").click() 
    cy.url().should('include', 'http://localhost:3000/preferences')
    cy.contains('Search Preferences').should('exist')
  });
});

describe('Submit tutorial button functionality', () => {
  it('The submit tutorial button should be able to be clicked on and show the necessary text and functionality', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[type="username"]').type('sample');
    cy.get('input[type="password"]').type('sample');
    cy.get('button[id="loginbox"]').click()
    cy.get('.MuiButton-root').contains("BROWSE").click() 
    cy.get('.MuiButton-root').contains("SUBMIT TUTORIAL").click() 
    cy.contains('Find a great tutorial? Enter the details below!').should('exist')
  });
});

describe('first drop down menu functionality', () => {
  it('ensure all the necessary options are visible on the first drop down menu on the browse page', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[type="username"]').type('sample');
    cy.get('input[type="password"]').type('sample');
    cy.get('button[id="loginbox"]').click()
    cy.get('.MuiButton-root').contains("BROWSE").click() 
    cy.get('.MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input').contains("All Languages").click()
    cy.contains('Assembly').should('exist')
    cy.contains('Bash/Shell').should('exist')
    cy.contains('C').should('exist')
    cy.contains('C#').should('exist')
    cy.contains('C++').should('exist')
    cy.contains('COBOL').should('exist')
    cy.contains('Dart').should('exist')
    cy.contains('Elixir').should('exist')
    cy.contains('F#').should('exist')
    cy.contains('Fortran').should('exist')
    cy.contains('Go').should('exist')
    cy.contains('Groovy').should('exist')
    cy.contains('Haskell').should('exist')
    cy.contains('HTML/CSS').should('exist')
    cy.contains('Java').should('exist')
    cy.contains('JavaScript').should('exist')
    cy.contains('Julia').should('exist')
    cy.contains('Kotlin').should('exist')
    cy.contains('Lua').should('exist')
    cy.contains('MATLAB').should('exist')
    cy.contains('OCaml').should('exist')
    cy.contains('Perl').should('exist')
    cy.contains('PHP').should('exist')
    cy.contains('PowerShell').should('exist')
    cy.contains('Python').should('exist')
    cy.contains('R').should('exist')
    cy.contains('Ruby').should('exist')
    cy.contains('Rust').should('exist')
    cy.contains('Scala').should('exist')
    cy.contains('SQL').should('exist')
    cy.contains('Swift').should('exist')
    cy.contains('TypeScript').should('exist')
    cy.contains('VBA').should('exist')
  });
});