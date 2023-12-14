export const getImageUrl = (imagePath) => {
  return import.meta.env.VITE_BASE_URL + imagePath
}