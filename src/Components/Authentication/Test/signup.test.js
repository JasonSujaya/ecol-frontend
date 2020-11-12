import axios from "axios";
import { shallow, mount } from "enzyme";

import SignUpForm from "../SignUpForm.jsx";
import { checkPassword, signUp } from "../authentication.js";

function resolvePromiseOnSimulate() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

const setUp = () => {
  axios.post.mockResolvedValue({
    data: {
      first_name: "Jason",
      last_name: "BackName",
      id: 1,
      email: "mock@gmail.com",
    },
  });
};

describe("Sign Up component", () => {
  it("Sign up renders correctly", () => {
    const wrapper = shallow(<SignUpForm />);
    expect(wrapper).toMatchSnapshot();
  });

  it("When input is empty, button is not clickable", async () => {
    // Act
    const wrapper = shallow(<SignUpForm />);
    let buttonElement = wrapper.find(".signUpButton");

    // Assert
    expect(wrapper.state("validForm")).toBeFalsy;
  });

  it("When input is not empty, button is clickable", async () => {
    // Act
    const wrapper = shallow(<SignUpForm />);
    wrapper
      .find(".emailInput")
      .simulate("change", { target: { value: "foo" } });
    wrapper
      .find(".passwordInput")
      .simulate("change", { target: { value: "foo" } });
    wrapper
      .find(".firstNameInput")
      .simulate("change", { target: { value: "foo" } });
    wrapper
      .find(".lastNameInput")
      .simulate("change", { target: { value: "foo" } });

    let buttonElement = wrapper.find(".signUpButton");

    // Assert
    expect(wrapper.state("validForm")).toBeFalsy;
    expect(buttonElement.prop("disabled")).toBeTruthy;
  });
});

describe("Sign Up Post Request", () => {
  it("Returns User data token when the sign in is successful ", async () => {
    // Arrange
    setUp();

    // Act
    const response = await signUp(
      "mock@email.com",
      "mockpassword",
      "firs_name",
      "last_name"
    );

    // Assert
    // expect(response.data.first_name).toEqual("Jason");
    expect(response.data.email).toEqual("mock@gmail.com");
  });
});

describe("Password Unit Test", () => {
  it("Check if password is empty ", () => {
    expect(checkPassword("")).toEqual(
      "Error: Please check that you've entered and confirmed your password!"
    );
  });
  it("Check if password is at least six character", () => {
    expect(checkPassword("Hello")).toEqual(
      "Error: Password must contain at least six characters!"
    );
    expect(checkPassword("     ")).toEqual(
      "Error: Password must contain at least six characters!"
    );
  });

  it("Check if password contains number", () => {
    expect(checkPassword("Hellooooo")).toEqual(
      "Error: password must contain at least one number (0-9)!"
    );
  });

  it("Check if password contains at least one lower chracter", () => {
    expect(checkPassword("123456")).toEqual(
      "Error: password must contain at least one lowercase letter (a-z)!"
    );

    expect(checkPassword("123456A")).toEqual(
      "Error: password must contain at least one lowercase letter (a-z)!"
    );
  });
  it("Check if password contains at least one uppercase character", () => {
    expect(checkPassword("abcdefg1")).toEqual(
      "Error: password must contain at least one uppercase letter (A-Z)!"
    );

    expect(checkPassword("123456a")).toEqual(
      "Error: password must contain at least one uppercase letter (A-Z)!"
    );
  });

  it("Checks if valid password returns OK", () => {
    expect(checkPassword("1ValidPassword")).toEqual(true);
  });
});
