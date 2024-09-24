const isLocal =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1';
export const baseUrl = isLocal
  ? import.meta.env.VITE_BASE_URL_LOCAL
  : import.meta.env.VITE_BASE_URL;
