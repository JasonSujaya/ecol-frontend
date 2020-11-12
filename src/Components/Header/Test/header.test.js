import axios from "axios";
import { shallow, mount } from "enzyme";
import { get_post_feed } from "../postview";

import PostView from "../PostView.jsx";

describe("Header Component", () => {
  it("Show the email account name when user is logged in", () => {
    // Arrange
    const wrapper = shallow(<PostView />);
    localStorage.token = "TokenExist";

    //Assert
    expect(wrapper.find(".currentUserEmail")).toHaveLength(1);
  });
  it("Button text is logout when user is logged in ", () => {
    // Arrange
    const wrapper = shallow(<PostView />);
    localStorage.token = "TokenExist";

    //Assert
    expect(wrapper.find(".buttonLogout")).toHaveLength(1);
  });
});
