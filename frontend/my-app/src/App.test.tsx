import { render, fireEvent, getByTestId } from '@testing-library/react';
import React from 'react';
import App from './App';
import Login from './Pages/Login'
import Signup from './Pages/Signup';
import Header from './components/Header'
import { jest } from '@jest/globals';
import { MemoryRouter } from 'react-router';
import { shallow } from 'enzyme';


test('sample test', () => {
  expect(true).toBe(true);
})

test('logo header exists', async () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Header username={''} setUsername={(username: string) => console.log(username)} />
    </MemoryRouter>
  );
  const logoPic = getByTestId('logoPicture');
  expect(logoPic).toBeInTheDocument();
});

test('login button header exists', async () => {
  const { getByText } = render(
    <MemoryRouter>
      <Header username={''} setUsername={(username: string) => console.log(username)} />
    </MemoryRouter>
  );
  const loginHeader = getByText('Log In');
  expect(loginHeader).toBeInTheDocument();
});

test('signup button header exists', async () => {
  const { getByText } = render(
    <MemoryRouter>
      <Header username={''} setUsername={(username: string) => console.log(username)} />
    </MemoryRouter>
  );
  const signupHeader = getByText('Sign Up');
  expect(signupHeader).toBeInTheDocument();
});

test('prints error message if there is no username entered (login screen)', async () => {
  const { getByLabelText, getByText } = render(
    <MemoryRouter>
      <Login setUsername={(username: string) => console.log(username)} />
    </MemoryRouter>
  );

  const passwordInput = getByLabelText('Password');
  const loginButton = getByText('LOGIN');

  fireEvent.change(passwordInput, { target: { value: 'testpass' } });
  fireEvent.click(loginButton);

  const errorMsg = await getByText('You must enter a username.');
  expect(errorMsg).toBeInTheDocument();
});

test('prints error message if there is no password entered (login screen)', async () => {
  const { getByLabelText, getByText } = render(
    <MemoryRouter>
      <Login setUsername={(username: string) => console.log(username)} />
    </MemoryRouter>
  );

  const usernameInput = getByLabelText('Username');
  const loginButton = getByText('LOGIN');

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.click(loginButton);

  const errorMsg = await getByText('You must enter a password.');
  expect(errorMsg).toBeInTheDocument();
});

test('prints error message if there is no email entered (signup screen)', async () => {
  const { getByLabelText, getByText } = render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );

  const usernameInput =  getByLabelText('Username');
  const passwordInput = getByLabelText('Password');
  const signupButton = getByText('SIGN UP');

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpass' } });
  fireEvent.click(signupButton);

  const errorMsg = await getByText('You must enter a email.');
  expect(errorMsg).toBeInTheDocument();
});

test('prints error message if there is no username entered (signup screen)', async () => {
  const { getByLabelText, getByText } = render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );

  const emailInput =  getByLabelText('Email');
  const passwordInput = getByLabelText('Password');
  const signupButton = getByText('SIGN UP');

  fireEvent.change(emailInput, { target: { value: 'testemail' } });
  fireEvent.change(passwordInput, { target: { value: 'testpass' } });
  fireEvent.click(signupButton);

  const errorMsg = await getByText('You must enter a username.');
  expect(errorMsg).toBeInTheDocument();
});

test('prints error message if there is no password entered (signup screen)', async () => {
  const { getByLabelText, getByText } = render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );

  const emailInput =  getByLabelText('Email');
  const usernameInput =  getByLabelText('Username');
  const signupButton = getByText('SIGN UP');

  fireEvent.change(emailInput, { target: { value: 'testemail' } });
  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.click(signupButton);

  const errorMsg = await getByText('You must enter a password.');
  expect(errorMsg).toBeInTheDocument();
});

test('prints error message if the email format is incorrect (signup screen)', async () => {
  const { getByLabelText, getByText } = render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );

  const emailInput =  getByLabelText('Email');
  const usernameInput =  getByLabelText('Username');
  const passwordInput = getByLabelText('Password');
  const signupButton = getByText('SIGN UP');

  fireEvent.change(emailInput, { target: { value: 'testemail' } });
  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpass' } });
  fireEvent.click(signupButton);

  const errorMsg = await getByText('Email address should adhere to this format: example@example.com');
  expect(errorMsg).toBeInTheDocument();
});

test('prints error message if the username format is incorrect (signup screen)', async () => {
  const { getByLabelText, getByText } = render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );

  const emailInput =  getByLabelText('Email');
  const usernameInput =  getByLabelText('Username');
  const passwordInput = getByLabelText('Password');
  const signupButton = getByText('SIGN UP');

  fireEvent.change(emailInput, { target: { value: 'testemail@email.com' } });
  fireEvent.change(usernameInput, { target: { value: 'testu' } });
  fireEvent.change(passwordInput, { target: { value: 'testpass' } });
  fireEvent.click(signupButton);

  const errorMsg = await getByText('The username must contain only alphanumeric and 6-20 characters.');
  expect(errorMsg).toBeInTheDocument();
});

test('prints error message if the password format is incorrect (signup screen)', async () => {
  const { getByLabelText, getByText } = render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );

  const emailInput =  getByLabelText('Email');
  const usernameInput =  getByLabelText('Username');
  const passwordInput = getByLabelText('Password');
  const signupButton = getByText('SIGN UP');

  fireEvent.change(emailInput, { target: { value: 'testemail@email.com' } });
  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testp' } });
  fireEvent.click(signupButton);

  const errorMsg = await getByText('The password should contain 6-20 characters.');
  expect(errorMsg).toBeInTheDocument();
});