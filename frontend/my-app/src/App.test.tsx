import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import App from './App';
import Login from './Pages/Login'
import Signup from './Pages/Signup';
import jest from 'jest'


test('test', () => {
    expect(true).toBe(true);
})

test('displays error message when username is not entered', async () => {
  const setUsername = jest.fn();
  const { getByLabelText, getByText } = render(<Login setUsername={(username: string) => console.log(username)} />);
  const usernameInput = getByLabelText('Username');
  const passwordInput = getByLabelText('Password');
  const loginButton = getByText('LOGIN');

  fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
  fireEvent.click(loginButton);

  const errorMsg = await getByText('You must enter a username.');
  expect(errorMsg).toBeInTheDocument();
});
