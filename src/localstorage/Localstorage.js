// src/localstorage/Localstorage.js

// ---------------------
// STORE USER DATA
// ---------------------
const storeAuthToken = (token) => localStorage.setItem("authToken", token);
const storeRefreshToken = (token) => localStorage.setItem("refreshToken", token);
const storeUserName = (name) => localStorage.setItem("userName", name);
const storeUserEmail = (email) => localStorage.setItem("userEmail", email);
const storeUserId = (id) => localStorage.setItem("userId", id);
const storeFullName = (name) => localStorage.setItem("fullName", name);

// ---------------------
// GET USER DATA
// ---------------------
const getAuthToken = () => localStorage.getItem("authToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");
const getUserName = () => localStorage.getItem("userName");
const getUserEmail = () => localStorage.getItem("userEmail");
const getUserId = () => localStorage.getItem("userId");
const getFullName = () => localStorage.getItem("fullName");

// ---------------------
// REMOVE USER DATA
// ---------------------
const removeUser = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userId");
  localStorage.removeItem("fullName");
};

// ---------------------
// EXPORT ALL FUNCTIONS
// ---------------------
export {
  storeAuthToken,
  storeRefreshToken,
  storeUserName,
  storeUserEmail,
  storeUserId,
  storeFullName,
  getAuthToken,
  getRefreshToken,
  getUserName,
  getUserEmail,
  getUserId,
  getFullName,
  removeUser,
};
