import SignIn from './components/SignIn';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react';
// import { render, fireEvent, getByRole, debug } from '@testing-library/react';

const noop = () => {}
configure({ adapter: new Adapter() });
describe('LoginForm', () => {
  it('should render a login form', () => {
    const wrapper = shallow(<SignIn onSubmit={noop} />);
    const form = wrapper.find('form');
    expect(form).toHaveLength(1);
  });
  it('should have inputs for email and password', () => {
    const wrapper = shallow(<SignIn onSubmit={noop} />);
    const inputs = wrapper.find('input');
    const password = inputs.find('[type="password"]');
    const email = inputs.find('[type="email"]');
    expect(inputs).toHaveLength(2);
    expect(password.prop('name')).toBe('password');
    expect(email.prop('name')).toBe('email');
  })
  it('should call the onSubmit function when the submit button is clicked', () => {
    const mockToken = {
      token: ''
    };

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockToken)
    }));

    beforeEach(() => {
      fetch.mockClear();
    });
    fetch.mockResponseOnce(mockToken);
    expect(fetch).toHaveBeenCalledTimes(1);
  })
});
