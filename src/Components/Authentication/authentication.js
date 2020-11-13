import axios from "axios";

export const storeToken = (token) => {
  localStorage.token = token;
};

export const checkForToken = () => {
  let tokenValue = localStorage.token;
  if (tokenValue != null) {
    if (tokenValue.length != 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

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

export const signUp = async (_email, _first_name, _last_name, _password) => {
  const user = {
    email: _email,
    first_name: _first_name,
    last_name: _last_name,
    password: _password,
  };

  const response = await axios.post(
    `http://127.0.0.1:8000/api/user/profiles/`,
    user,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};

export const inputNotEmpty = (_input) => {
  if (_input.length != 0) {
    return true;
  } else {
    return false;
  }
};

export const checkPassword = (password) => {
  let re = "";
  if (password != "") {
    if (password.length < 6) {
      return "Error: Password must contain at least six characters!";
    }
    re = /[0-9]/;
    if (!re.test(password)) {
      return "Error: password must contain at least one number (0-9)!";
    }
    re = /[a-z]/;
    if (!re.test(password)) {
      return "Error: password must contain at least one lowercase letter (a-z)!";
    }
    re = /[A-Z]/;
    if (!re.test(password)) {
      return "Error: password must contain at least one uppercase letter (A-Z)!";
    }
  } else {
    return "Error: Please check that you've entered and confirmed your password!";
  }

  return true;
};
