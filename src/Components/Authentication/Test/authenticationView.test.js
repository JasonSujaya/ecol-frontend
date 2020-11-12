// import { createShallow, createMount } from "@material-ui/core/test-utils";
import { shallow, mount } from "enzyme";
import AuthenticationView from "../AuthenticationView";

describe("Sign In component", () => {
  it("Authentication renders correctly", () => {
    const wrapper = mount(<AuthenticationView />);
    expect(wrapper).toMatchSnapshot();
  });

  it("When display state is login, expect to login component", () => {
    //Arrange
    const wrapper = shallow(<AuthenticationView />);

    // Act
    wrapper.setState({ display: "LogIn" });

    // Assert
    expect(wrapper.find("#loginForm")).toHaveLength(1);
  });

  it("When display state is signup, expect to signUp component", () => {
    //Arrange
    const wrapper = shallow(<AuthenticationView />);

    // Act
    wrapper.setState({ display: "SignUp" });

    // Assert
    expect(wrapper.find("#signUpForm")).toHaveLength(1);
  });

  it("On login expect local storage token to be saved", () => {
    // Arrange
    const historyMock = { push: jest.fn() };
    const wrapper = mount(<AuthenticationView history={historyMock} />);
    const instance = wrapper.instance();

    // Act
    instance.onSuccesfullAuthentication("mockTokenValue");

    // Assert
    expect(localStorage.token).toEqual("mockTokenValue");
  });

  it("On login, expect to navigate to landing", () => {
    // Arrange
    const historyMock = { push: jest.fn() };
    const wrapper = mount(<AuthenticationView history={historyMock} />);
    const instance = wrapper.instance();

    // Act
    instance.onSuccesfullAuthentication("mockTokenValue");

    // Assert
    expect(historyMock.push.mock.calls[0]).toEqual(["/"]);
  });
});
