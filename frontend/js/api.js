
const API_BASE =
  `${window.location.protocol}//${window.location.hostname}:5000/api`;

async function api(path, options = {}) {
  const token = localStorage.getItem("stock_token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(API_BASE + path, {
    ...options,
    headers
  });

  let data = {};

  try {
    data = await response.json();
  } catch (e) {
    console.error("Invalid JSON response:", e);
  }

  return data;
}