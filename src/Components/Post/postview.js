import axios from "axios";

export const get_post_feed = async () => {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/post-api/post-manager/`
  );
  const data = response.data;
  return data;
};
