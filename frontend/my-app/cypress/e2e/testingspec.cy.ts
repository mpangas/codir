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
    cy.get('input[type="username"]').type('testing');
    cy.get('input[type="password"]').type('testing');
    cy.get('button[id="loginbox"]').click()
    cy.get('.MuiButton-root').contains("DASHBOARD").click() 
    cy.url().should('include', 'http://localhost:3000/dashboard')
    cy.get('h1').should('contain', 'DASHBOARD')
  });
});

describe('Login and browse navigation', () => {
  it('should login to the account then navigate to browse page', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[type="username"]').type('testing');
    cy.get('input[type="password"]').type('testing');
    cy.get('button[id="loginbox"]').click()
    cy.get('.MuiButton-root').contains("BROWSE").click() 
    cy.url().should('include', 'http://localhost:3000/browse')
    cy.contains('Browse Tutorials').should('exist')
  });
});

describe('Login and about page navigation', () => {
  it('should login to the account then navigate to about  page', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[type="username"]').type('testing');
    cy.get('input[type="password"]').type('testing');
    cy.get('button[id="loginbox"]').click()
    cy.get('.MuiButton-root').contains("ABOUT US").click() 
    cy.url().should('include', 'http://localhost:3000/about')
    cy.get('h1').should('contain', 'About Us')
  });
});


// describe('Login and preferences navigation', () => {
//   it('should login to the account then navigate to preferences page', () => {
//     cy.visit('http://localhost:3000/login');
//     cy.get('input[type="username"]').type('testing');
//     cy.get('input[type="password"]').type('testing');
//     cy.get('button[id="loginbox"]').click()
//     cy.get('.MuiButton-root').contains("PREFERENCES").click() 
//     cy.url().should('include', 'http://localhost:3000/preferences')
//     cy.contains('Personal Preferences').should('exist')
//   });
// });

describe('Submit tutorial button functionality', () => {
  it('The submit tutorial button should be able to be clicked on and show the necessary text and functionality', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[type="username"]').type('testing');
    cy.get('input[type="password"]').type('testing');
    cy.get('button[id="loginbox"]').click()
    cy.get('.MuiButton-root').contains("BROWSE").click() 
    cy.get('.MuiButton-root').contains("SUBMIT TUTORIAL").click() 
    cy.contains('Find a great tutorial? Enter the details below!').should('exist')
  });
});

describe('languages drop down menu functionality', () => {
  it('ensure all the necessary options are visible on the languages drop down menu on the browse page', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[type="username"]').type('testing');
    cy.get('input[type="password"]').type('testing');
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

describe('technologies drop down menu functionality', () => {
  it('ensure all the necessary options are visible on the technologies drop down menu on the browse page', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[type="username"]').type('testing');
    cy.get('input[type="password"]').type('testing');
    cy.get('button[id="loginbox"]').click()
    cy.get('.MuiButton-root').contains("BROWSE").click() 
    cy.get('.MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input').contains("All Technologies").click()
    cy.contains('.NET').should('exist')
    cy.contains('Angular').should('exist')
    cy.contains('Angular.js').should('exist')
    cy.contains('Ansible').should('exist')
    cy.contains('ASP.NET').should('exist')
    cy.contains('Blazor').should('exist')
    cy.contains('Cloud Computing').should('exist')
    cy.contains('CouchDB').should('exist')
    cy.contains('Django').should('exist')
    cy.contains('Docker').should('exist')
    cy.contains('DynamoDB').should('exist')
    cy.contains('Express').should('exist')
    cy.contains('FastAPI').should('exist')
    cy.contains('Flask').should('exist')
    cy.contains('Flutter').should('exist')
    cy.contains('Git').should('exist')
    cy.contains('GitHub').should('exist')
    cy.contains('GitLab').should('exist')
    cy.contains('Homebrew').should('exist')
    cy.contains('jQuery').should('exist')
    cy.contains('Kubernetes').should('exist')
    cy.contains('Laravel').should('exist')
    cy.contains('MariaDB').should('exist')
    cy.contains('Microsoft SQL Server').should('exist')
    cy.contains('MongoDB').should('exist')
    cy.contains('MySQL').should('exist')
    cy.contains('Next.js').should('exist')
    cy.contains('Node.js').should('exist')
    cy.contains('npm').should('exist')
    cy.contains('NumPy').should('exist')
    cy.contains('Nuxt.js').should('exist')
    cy.contains('Oracle').should('exist')
    cy.contains('Pandas').should('exist')
    cy.contains('PostgreSQL').should('exist')
    cy.contains('PyTorch').should('exist')
    cy.contains('Qt').should('exist')
    cy.contains('React Native').should('exist')
    cy.contains('React.js').should('exist')
    cy.contains('Redis').should('exist')
    cy.contains('Ruby on Rails').should('exist')
    cy.contains('SQLite').should('exist')
    cy.contains('Spring').should('exist')
    cy.contains('Svelte').should('exist')
    cy.contains('Terraform').should('exist')
    cy.contains('TensorFlow').should('exist')
    cy.contains('Unity 3D').should('exist')
    cy.contains('Unreal Engine').should('exist')
    cy.contains('Vue.js').should('exist')
    cy.contains('Yarn').should('exist')
  });
});


describe('skill levels drop down menu functionality', () => {
  it('ensure all the necessary options are visible on the skill levels drop down menu on the browse page', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[type="username"]').type('testing');
    cy.get('input[type="password"]').type('testing');
    cy.get('button[id="loginbox"]').click()
    cy.get('.MuiButton-root').contains("BROWSE").click() 
    cy.get('.MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input').contains("All Skill Levels").click()
    cy.contains('Beginner').should('exist')
    cy.contains('Intermediate').should('exist')
    cy.contains('Advanced').should('exist')
  });
});

describe('learning styles drop down menu functionality', () => {
  it('ensure all the necessary options are visible on the learning styles drop down menu on the browse page', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[type="username"]').type('testing');
    cy.get('input[type="password"]').type('testing');
    cy.get('button[id="loginbox"]').click()
    cy.get('.MuiButton-root').contains("BROWSE").click() 
    cy.get('.MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input').contains("All Learning Styles").click()
    cy.contains('Text Tutorials').should('exist')
    cy.contains('Video Tutorials').should('exist')
    cy.contains('Interactive Tutorials').should('exist')
  });
});

describe('Submit tutorial button functionality on preferences page', () => {
  it('The submit tutorial button should be able to be clicked on the preferences page and should redirect to the dashboard', () => {
    cy.visit('http://localhost:3000/signup');
    cy.get('input[id="emailbox"]').type('brandnew0001@brand.com');
    cy.get('input[type="username"]').type('brandnew000001');
    cy.get('input[type="password"]').type('brandnew000001');
    cy.get('button[id="signupbox"]').click()
    cy.get('.MuiButton-root').contains("SUBMIT").click() 
    cy.contains('Go to Browse to add favorites!').should('exist')
  });
});

describe('Browse hyperlink validity', () => {
  it('Makes sure that the clicking on the text "Browse" in the Dashboard page redirects to the browse page', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[type="username"]').type('testing');
    cy.get('input[type="password"]').type('testing');
    cy.get('button[id="loginbox"]').click()
    cy.get('.MuiButton-root').contains("DASHBOARD").click() 
    cy.contains("Browse").click() 
    cy.contains('Browse Tutorials').should('exist')
  });
});

describe('Preferences hyperlink validity', () => {
  it('Makes sure that the clicking on the text "Preferences" in the Dashboard page redirects to the preferences page', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[type="username"]').type('testing');
    cy.get('input[type="password"]').type('testing');
    cy.get('button[id="loginbox"]').click()
    cy.get('.MuiButton-root').contains("DASHBOARD").click() 
    cy.contains("Preferences").click() 
    cy.contains('Personal Preferences').should('exist')
  });
});

describe('Sign up button to preferences page', () => {
  it('As soon as a user signs up they will be redirected to the preferences page', () => {
    cy.visit('http://localhost:3000/signup');
    cy.get('input[id="emailbox"]').type('brandnew5551@brand.com');
    cy.get('input[type="username"]').type('brandnew555551');
    cy.get('input[type="password"]').type('brandnew555551');
    cy.get('button[id="signupbox"]').click()
    cy.contains('Personal Preferences').should('exist')
  });
});



