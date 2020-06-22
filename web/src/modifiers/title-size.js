export function withTitleSize (classes, props) {
  if (props.is4) {
    classes.push('is-4')
  } else if (props.is6) {
    classes.push('is-6')
  }

  return classes
}

export const titleSizeModifiers = Object.freeze([
  'is4',
  'is6',
])
