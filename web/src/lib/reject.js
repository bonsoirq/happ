import clone from "lib/clone";

export default function reject(object, ...fields) {
  const result = clone(object)
  for (const field of fields) {
    delete result[field]
  }
  return result
}
