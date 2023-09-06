export const getFileExtension = (url: string): string => {
  const parts = url.split(".");
  const extension = parts[parts.length - 1];
  return extension;
};
