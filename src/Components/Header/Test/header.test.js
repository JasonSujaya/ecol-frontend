import axios from "axios";
import { shallow, mount } from "enzyme";

import HeaderView from "../HeaderView";
describe("Header Component", () => {
  it("Show the email account name when user is logged in", () => {
    // Arrange
    const wrapper = shallow(<HeaderView />);
    localStorage.token = "TokenExist";

    //Assert
    expect(wrapper.find(".currentUserEmail")).toHaveLength(1);
  });
  it("Button text is logout when user is logged in ", () => {
    // Arrange
    const wrapper = shallow(<HeaderView />);
    localStorage.token = "TokenExist";

    //Assert
    expect(wrapper.find(".buttonLogout")).toHaveLength(1);
  });
});
