import { shallow, mount } from "enzyme";

import HeaderView from "../HeaderView";
describe("Header Component", () => {
  it("Show the email account name when user is logged in", () => {
    // Arrange
    const loggedInTrueMock = jest.fn(true);
    const wrapper = shallow(
      <HeaderView
        loggedInTrue={loggedInTrueMock}
        user={{ email: "emailHere" }}
      />
    );

    //Assert
    expect(wrapper.find(".currentUserEmail")).toHaveLength(1);
  });
  it("Button text is logout when user is logged in ", () => {
    // Arrange
    const wrapper = shallow(<HeaderView loggedInTrue={true} />);

    //Assert
    expect(wrapper.find(".buttonLogout")).toHaveLength(1);
  });

  it("Button text is login when user is logged out ", () => {
    // Arrange
    const wrapper = shallow(<HeaderView loggedInTrue={false} />);

    //Assert
    expect(wrapper.find(".buttonLogin")).toHaveLength(1);
  });
});
