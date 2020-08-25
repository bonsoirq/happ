export default function ellipsize(text, limit) {
  if (text.length > limit) {
    return `${text.substring(0, limit)}...`
  } else {
    return text
  }
}
