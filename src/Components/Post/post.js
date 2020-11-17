import axios from "axios";

export const get_post_feed = async () => {
  const response = await axios.get(
    `https://ecole-heroku.herokuapp.com/api/post-api/post-manager/`
  );
  const data = response.data;
  return data;
};

export const get_category = async () => {
  const response = await axios.get(
    `https://ecole-heroku.herokuapp.com/api/post-api/post-category/`
  );
  return response;
};

export const create = async (_title, _content, _category) => {
  const user = {
    title: _title,
    content: _content,
    category: _category,
    tag: [
      {
        tag_id: 1,
      },
    ],
    images: [],
  };

  const response = await axios
    .post(
      `https://ecole-heroku.herokuapp.com/api/post-api/post-manager/`,
      user,
      {
        headers: {
          authorization: `Token ${localStorage.token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    .then()
    .catch((err) => console.log("Response body", err.response.data));
  console.log("Triggered");
  console.log(response);

  return response;
};

export const getCategoryName = (inputId) => {
  if (inputId == 1) {
    return "Category1";
  } else if (inputId == 2) {
    return "Category2";
  }
};
