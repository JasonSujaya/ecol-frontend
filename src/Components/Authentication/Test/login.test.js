import axios from "axios";
import { shallow, mount } from "enzyme";

import LoginForm from "../LoginForm";
import { login, formsNotEmpty } from "../authentication.js";

function resolvePromiseOnSimulate() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

const setUp = () => {
  axios.post.mockResolvedValue({
    data: {
      token: "someMockTokenHere",
    },
  });
};

describe("Login function", () => {
  it("Returns JWS token when the sign in is successful", async () => {
    // Arrange
    setUp();

    // Act
    const response = await login("mock@email.com", "mockpassword");

    // Assert
    expect(response.data.token).toEqual("someMockTokenHere");
  });

  it("Expect function to throw error when email and/or password is inputted", () => {
    // Arrange
    setUp();

    // Act & Assert
    expect(() => {
      formsNotEmpty("", "");
    }).toBeFalsy;

    expect(() => {
      formsNotEmpty("Hello@gmail.com", "");
    }).toBeFalsy;

    expect(() => {
      formsNotEmpty("", "Password");
    }).toBeFalsy;
  });
});

describe("Sign In component", () => {
  it("Sign in renders correctly", () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper).toMatchSnapshot();
  });

  it("When input is empty, button is not clickable", async () => {
    // Act
    const wrapper = shallow(<LoginForm />);
    let buttonElement = wrapper.find(".signInButton");

    // Assert
    expect(wrapper.state("validForm")).toBeFalsy;
    expect(buttonElement.prop("disabled")).toBeTruthy;
  });

  it("When input is not empty, button is clickable", async () => {
    // Act
    const wrapper = shallow(<LoginForm />);
    wrapper
      .find(".emailInput")
      .simulate("change", { target: { value: "foo" } });
    wrapper
      .find(".passwordInput")
      .simulate("change", { target: { value: "foo" } });
    let buttonElement = wrapper.find(".signInButton");
    wrapper.update();

    // Assert
    expect(wrapper.state("validForm")).toBeTruthy;
    expect(buttonElement.prop("disabled")).toBeFalsy;
  });

  it("Reset the input form when sign in is successfull", async () => {
    // Arrange
    setUp();

    // Act
    const wrapper = mount(<LoginForm />);
    wrapper.find(".signInButton").at(1).simulate("click");
    await resolvePromiseOnSimulate();
    wrapper.update();

    // Assert
    expect(wrapper.state("email")).toEqual("");
    expect(wrapper.state("password")).toEqual("");
  });

  it("Email don't reset when password is empty", async () => {
    // Arrange
    axios.post.mockRejectedValue(new Error("Async error"));
    // setUp();

    // Act
    const wrapper = mount(<LoginForm />);
    wrapper.setState({ email: "wrong@gmail.com", password: "wrong" });
    wrapper.find(".signInButton").at(1).simulate("click");
    await resolvePromiseOnSimulate();
    wrapper.update();

    // Asserterror
    await expect(wrapper.state("email")).toEqual("wrong@gmail.com");
    await expect(wrapper.state("password")).toEqual("wrong");
  });

  it("Render error when email & password don't match/exist", async () => {
    // Arrange
    axios.post.mockRejectedValue(new Error("Async error"));
    // setUp();

    // Act
    const wrapper = mount(<LoginForm />);
    wrapper.setState({
      email: "wrong@gmail.com",
      password: "wrong",
      validForm: true,
    });
    wrapper.find(".signInButton").at(1).simulate("click");
    await resolvePromiseOnSimulate();
    wrapper.update();

    // Assert
    await expect(wrapper.state("error")).toEqual(true);
    await expect(wrapper.find(".loginError")).toHaveLength(1);
  });
});
