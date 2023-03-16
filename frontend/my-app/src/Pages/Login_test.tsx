import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from './Login';

test('test', () => {
    expect(true).toBe(true);
})

describe('Login Button', () => {
    it('renders correctly', () => {
        const { getByTestId } = render(<Login setUsername={function (username: string): void {
            throw new Error('Function not implemented.');
        } } />);
        expect(getByTestId('loginbox')).toBeInTheDocument();
      });
});
