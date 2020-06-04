export default function pipe(value, ...funcs) {
  const [head, ...tail] = funcs
  if (tail.length === 0) {
    return head(value)
  }
  return pipe(head(value), ...tail)
}
