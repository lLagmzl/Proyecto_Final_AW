import { API_BASE, fetchJson, saveToken, clearToken, authHeaders, getToken } from "./api.js";

// Registro
export async function registerUser({ name, email, itsonId, password }) {
  const body = { name, email, itsonId, password };
  return await fetchJson(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// Login
console.log("AUTH.JS SE IMPORTÓ CORRECTAMENTE");
export async function loginUser({ email, password }) {
  console.log("login ejecuto");
  const res = await fetchJson(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (res.token) saveToken(res.token);
  return res;
}

// Logout (cliente)
export function logoutAndRedirect(to = "/index.html") {
  clearToken();
  window.location.href = to;
}

import { getToken } from "./api.js";

// Si no hay token manda al login
export function protectRoute(redirectTo = "/index.html") {
  const token = getToken();

  if (!token) {
    console.warn("No hay token, redirigiendo al login...");
    window.location.href = redirectTo;
    return false;
  }

  return true;
}

// Valida token 
export async function ensureLoggedInOrRedirect(redirectTo = "/index.html") {
  const token = getToken();
  if (!token) {
    window.location.href = redirectTo;
    return false;
  }
  try {
    const res = await fetch(`${API_BASE}/projects`, {
      method: "GET",
      headers: authHeaders(),
    });
    if (res.status === 401 || res.status === 403) {
      logoutAndRedirect(redirectTo);
      return false;
    }
    return true;
  } catch (err) {
    logoutAndRedirect(redirectTo);
    return false;
  }
}