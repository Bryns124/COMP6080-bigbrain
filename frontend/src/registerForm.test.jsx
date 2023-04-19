import SignUp from './components/SignUp';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';


const noop = () => {}
configure({ adapter: new Adapter() });
describe('RegisterForm', () => {
  it('should render a register form', () => {
    const wrapper = shallow(<SignUp onSubmit={noop} />);
    const form = wrapper.find('form');
    expect(form).toHaveLength(1);
    
  });
  it('should have inputs for email, password and name', () => {
    const wrapper = shallow(<SignUp onSubmit={noop} />);
    const inputs = wrapper.find('input');
    const password = inputs.find('[type="password"]');
    const email = inputs.find('[type="email"]');
    const name = inputs.find('[type="text"]');
    expect(inputs).toHaveLength(3);
    expect(password.prop('name')).toBe('password');
    expect(email.prop('name')).toBe('email');
    expect(name.prop('name')).toBe('name');
  })
});
