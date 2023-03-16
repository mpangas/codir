import { render } from '@testing-library/react';
import React from 'react';
import App from './App';
import Login from './Pages/Signup'
import jest from 'jest'
import Signup from './Pages/Signup';

test('test', () => {
    expect(true).toBe(true);
})

test('button rendering', () => {
  const { getByTestId } = render(<App/>);
  const buttonElement = getByTestId('my-button');
  expect(buttonElement).toBeInTheDocument();
})

