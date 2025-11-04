const API_URL = "http://localhost:3000";

export default function api(pathOrEndpoint, options = {}) {
  let defaultHeaders = {
    "Content-Type": "application/json",
  };
  const token = localStorage.getItem("token");
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }
  options = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };
  return fetch(`${API_URL}${pathOrEndpoint}`, options);
}
