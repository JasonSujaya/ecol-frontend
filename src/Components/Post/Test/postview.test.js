import axios from "axios";
import { shallow, mount } from "enzyme";
import { get_post_feed } from "../post";

import PostView from "../PostView.js";

const runAllPromises = () => new Promise(setImmediate);
function tick() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

const setUp = () => {
  axios.get.mockResolvedValue({
    data: [
      {
        bookmarks: 0,
        category: 1,
        content: "Here is a post",
        id: 1,
        images: [],
        post_bookmarkslist: [],
        post_comments: [],
        tag: [],
        title: "My First Album",
        user: 1,
      },
      {
        bookmarks: 0,
        category: 1,
        content: "This is another post",
        id: 2,
        images: [],
        post_bookmarkslist: [],
        post_comments: [],
        tag: [],
        title: "My Latest Album",
        user: 1,
      },
    ],
  });
};

describe("Post View Component", () => {
  it("PostView renders correctly when promise is not resolved", () => {
    // Arrange
    setUp();

    //Act
    const wrapper = mount(<PostView />);

    //Assert
    expect(wrapper).toMatchSnapshot();
  });

  it("PostView renders correctly when promise is resolved", async () => {
    // Arrange
    setUp();

    //Act
    const wrapper = mount(<PostView />);
    await runAllPromises();
    wrapper.update();

    //Assert
    expect(wrapper).toMatchSnapshot();
  });
  it("Returns the title of the first post should be correct", async () => {
    // Arrange
    setUp();

    // Act
    const title = await get_post_feed();

    // Assert
    expect(title[0].title).toEqual("My First Album");
  });

  it("Renders loading when promise is not resolved", () => {
    // Arrange
    setUp();

    //Act
    const wrapper = mount(<PostView />);

    //Assert
    expect(wrapper.find(".loading")).toHaveLength(1);
  });

  it("Renders posttitleview component correctly when promise is resolved", async () => {
    // Arrange
    setUp();
    const wrapper = await mount(<PostView />);

    //Act
    await runAllPromises();
    wrapper.update();

    //Assert
    expect(wrapper.find(".postTitleBox")).toHaveLength(2);
    expect(wrapper.find(".postTitle").first().text()).toContain(
      "My Latest Album"
    );
    expect(wrapper.find(".postTitle").at(2).text()).toContain("My First Album");
  });
});
