export const SALT_ROUNDS = 10;

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 100;

export const MIN_LEN = 2;
export const MAX_LEN = 32;

export const MIN_LEN_PASS = 8;
export const MAX_LEN_PASS = 20;

// access token expires in 15min
export const JWT_ACCESS_EXPIRY_TIME = "15";
export const JWT_REFRESH_EXPIRY_TIME = "1d";

// refresh token expires in 1day
export const ACCESS_COOKIE_EXPIRY_TIME = 1000 * 60 * 60 * 15;
export const REFRESH_COOKIE_EXPIRY_TIME = 1000 * 60 * 60 * 24;
export const REFRESH_MONGO_EXPIRY_TIME = 3600 * 24;
