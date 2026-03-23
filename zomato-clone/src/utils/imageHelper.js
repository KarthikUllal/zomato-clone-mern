const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const getImageUrl = (path) => {
  if (!path) return "";
  return path.startsWith("http")
    ? path
    : `${BASE_URL}/${path}`;
};