import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import App from './App';
import Login from './Pages/Login'
import Signup from './Pages/Signup';
import { jest } from '@jest/globals';
import { MemoryRouter } from 'react-router';


test('sample test', () => {
  expect(true).toBe(true);
})

test('prints error message if there is no username entered (login screen)', async () => {
  const setUsername = jest.fn();
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
  const setUsername = jest.fn();
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
  const setUsername = jest.fn();
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
  const setUsername = jest.fn();
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
  const setUsername = jest.fn();
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