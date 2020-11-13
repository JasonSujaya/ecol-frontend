import axios from "axios";

export const create = (_title, _content, _category) => {
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

  axios
    .post(`http://127.0.0.1:8000/api/post-api/post-manager/`, user, {
      headers: {
        authorization: "Token 2842fcb42b45c2751fdefeba1f3edeee61784534",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((res) => console.log(res))
    .catch((err) => console.log("Response body", err.response.data));

  console.log("signin");
};
