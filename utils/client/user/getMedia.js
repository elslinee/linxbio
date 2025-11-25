export const getMedia = (filename) => {
  if (!filename) return null;

  if (filename.startsWith("http")) return filename;

  const base = process.env.NEXT_PUBLIC_SITE_URL;

  return `${base}${filename}`;
};
