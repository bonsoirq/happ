export function withRatio (classes, props) {
  if (props.is3by1) {
    classes.push('is-3by1')
  }

  return classes
}

export const ratioModifiers = Object.freeze([
  'is3by1',
])
