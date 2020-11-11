import axios from "axios";

export const login = async (_email, _password) => {
  const user = {
    username: _email,
    password: _password,
  };

  const response = await axios.post(
    `http://127.0.0.1:8000/api/user/login/`,
    user,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const formsNotEmpty = (_email, _password) => {
  if (_email.length != 0 && _password.length != 0) {
    return true;
  } else {
    return false;
  }
};
