export async function readFileAsFormData(file, { name = 'file'} = {}) {
  const formData = new FormData()
  formData.set(name, file)
  return formData
}
