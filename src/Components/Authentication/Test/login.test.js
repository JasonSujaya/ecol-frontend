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
});
