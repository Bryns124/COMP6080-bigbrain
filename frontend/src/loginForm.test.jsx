import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignIn from './components/SignIn';
import { getByTestId, render } from '@testing-library/react';

describe('Login', () => {
  it('displays the login form', () => {
    const { getByTestId } = render(
      <Router>
        <SignIn />
      </Router>
    );
    expect(getByTestId('login-form')).toBeInTheDocument();
  });
});