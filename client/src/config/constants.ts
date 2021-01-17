// Get refresh token every 13m
export const REFRESH_TIME = 1000 * 60 * 13;

// Range for validation lengths
export const MIN_LEN = 2;
export const MAX_LEN = 32;

export const MIN_PASS_LEN = 6;
export const MAX_PASS_LEN = 32;

export const LOGIN_INITIAL_VALUES = {
  email: "",
  password: "",
};

export const SIGNUP_INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
