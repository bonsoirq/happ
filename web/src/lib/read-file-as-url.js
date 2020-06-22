export function readFileAsURL(file) {
  return new Promise(resolve => {
    const fileReader = new FileReader()
    fileReader.addEventListener('load', e => resolve(e.target.result))
    fileReader.readAsDataURL(file)
  })
}
