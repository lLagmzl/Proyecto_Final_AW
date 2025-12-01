export const API_BASE = "https://portfolio-api-three-black.vercel.app/api/v1";

// Se obtiene el token
export function getToken() {
  return localStorage.getItem("authToken");
}

// Guarda el token
export function saveToken(token) {
  localStorage.setItem("authToken", token);
}

// Borrar el token (logout)
export function clearToken() {
  localStorage.removeItem("authToken");
}

export async function fetchJson(url, options = {}) {
  const res = await fetch(url, options);
  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await res.json() : null;
  if (!res.ok) {
    const msg = data?.message || data?.error || res.statusText || "Error en la petición";
    const err = new Error(msg);
    err.status = res.status;
    err.payload = data;
    throw err;
  }
  return data;
}

export function authHeaders(extra = {}) {
  const token = getToken();
  const baseHeaders = token ? { "auth-token": token } : {};
  return { ...baseHeaders, ...extra };
}