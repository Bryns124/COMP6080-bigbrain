import SignIn from './components/SignIn';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render, fireEvent, getByRole, debug } from '@testing-library/react';

function fetchPosts() {
  const request = axios.get(`${WORDPRESS_URL}`);
  return {
      type: FETCH_POSTS,
      payload: request
  }
}

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
    // const dummyData = {
    //   email: "dummy@email.com",
    //   password: "password"
    // }
    // const inputs = wrapper.find('input');
    const mockToken = {
      token: ""
    };

    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(mockToken)
    }));

    beforeEach(() => {
      fetch.mockClear();
    });
    fetch.mockResponseOnce(mockToken);
    expect(fetch).toHaveBeenCalledTimes(1);
    // const mockOnSubmit = jest.fn();
    // const { getByRole } = render(<SignIn onSuccess={mockOnSubmit} />);

    // const signInButton = getByRole('button');
    // expect(signInButton).toBeInTheDocument();
    // // fireEvent.click(signInButton);

    // expect(mockOnSubmit).toHaveBeenCalled();
  })
});
