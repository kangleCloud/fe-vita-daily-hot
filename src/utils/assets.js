const normalizeBaseUrl = (baseUrl = "/") => {
  const normalizedBaseUrl = baseUrl.trim() || "/";
  const withLeadingSlash = normalizedBaseUrl.startsWith("/")
    ? normalizedBaseUrl
    : `/${normalizedBaseUrl}`;

  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
};

export const getPublicAssetUrl = (path = "") => {
  const baseUrl = normalizeBaseUrl(import.meta.env.BASE_URL);
  const normalizedPath = path.replace(/^\/+/, "");

  return `${baseUrl}${normalizedPath}`;
};
