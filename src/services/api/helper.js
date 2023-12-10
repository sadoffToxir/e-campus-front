export const getFormDataFrobObj = (obj) => {
  const formData = new FormData()

  for (let key in obj) {
    formData.append(key, obj[key])
  }

  return formData
}