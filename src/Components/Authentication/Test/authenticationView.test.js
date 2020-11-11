import { createShallow, createMount } from "@material-ui/core/test-utils";
import LoginForm from "../LoginForm";
import SignUpForm from "../SignUpForm";
import AuthenticationView from "../AuthenticationView";

describe("Sign In component", () => {
  let shallow;
  let mount;

  beforeAll(() => {
    shallow = createShallow({ dive: true });
    mount = createMount({ dive: true });
  });

  it("Authentication renders correctly", () => {
    const wrapper = mount(<AuthenticationView />);
    expect(wrapper).toMatchSnapshot();
  });

  it("When display state is changes, expect to find the correct component", () => {
    //Act
    const wrapper = mount(<AuthenticationView />);
    wrapper.setState({ display: "LogIn" });

    // Assert
    expect(wrapper.contains(<LoginForm />)).toBe(true);
    expect(wrapper.contains(<SignUpForm />)).toBe(false);
    wrapper.setState({ display: "SignUp" });
    expect(wrapper.contains(<LoginForm />)).toBe(false);
    expect(wrapper.contains(<SignUpForm />)).toBe(true);
  });
});
