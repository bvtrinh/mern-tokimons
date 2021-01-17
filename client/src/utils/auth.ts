export const checkAuth = () => {
  const expiry = localStorage.getItem("expiry");
  if (expiry && Date.now() < parseFloat(expiry)) {
    return true;
  } else {
    clearAuth();
    return false;
  }
};

export const setAuth = (expiry: string, firstName: string) => {
  localStorage.setItem("expiry", expiry);
  localStorage.setItem("firstName", firstName);
};

export const clearAuth = () => {
  localStorage.removeItem("expiry");
  localStorage.removeItem("firstName");
};
