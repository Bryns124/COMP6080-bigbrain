import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignUp from './components/SignUp';
import { getByTestId, render } from '@testing-library/react';

describe('Register', () => {
  it('displays the register form', () => {
    const { getByTestId } = render(
      <Router>
        <SignUp />
      </Router>
    );
    expect(getByTestId('register-form')).toBeInTheDocument();
  });
  // it('triggers register button when clicked', () => {
  //   const SignUp = jest.fn();
  //   const { getByText } = render(<Button onClick={SignUp} />);
  //   userEvent.click(screen.getByRole())
  // })
});

