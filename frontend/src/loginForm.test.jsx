import SignIn from './components/SignIn';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';


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
  // it('should call the onSubmit function when the submit button is clicked', () => {
  //   const onSuccess = jest.fn();
  //   const wrapper = shallow(<SignIn onSuccess={onSuccess} />);
  //   const form = wrapper.find('[data-testid="login-form"]');
  //   const emailInput = form.find('input[name="email"]');
  //   const passwordInput = form.find('input[name="password"]');
  //   const submitButton = form.find('button');

  //   // simulate form input change
  //   emailInput.simulate('change', { target: { name: 'email', value: 'test@example.com' } });
  //   passwordInput.simulate('change', { target: { name: 'password', value: 'password123' } });

  //   // simulate form submit
  //   form.simulate('submit', { preventDefault: noop });
  //   expect(onSuccess).toHaveBeenCalledTimes(1);
  // })
});
