import axios from "axios";

import { getUser } from "../authentication.js";

function resolvePromiseOnSimulate() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

const setUp = () => {
  axios.get.mockResolvedValue({
    data: {
      token: "someMockToken",
      email: "someEmail",
    },
  });
};

describe("Get User", () => {
  it("Returns JWS token when the sign in is successful", async () => {
    // Arrange
    setUp();

    // Act
    const response = await getUser();

    // Assert
    expect(response.email).toEqual("someEmail");
  });
});
