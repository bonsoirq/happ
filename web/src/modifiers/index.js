export default function addModifiers(baseClass, props) {
  const classes = [baseClass]
  if (props.isPrimary) {
    classes.push('is-primary')
  }
  if (props.isDanger) {
    classes.push('is-danger')
  }
  if (props.isLoading) {
    classes.push('is-loading')
  }
  if (props.is4) {
    classes.push('is-4')
  }
  if (props.is6) {
    classes.push('is-6')
  }
  return classes.join(' ')
}

export const modifiers = Object.freeze([
  'isPrimary',
  'isDanger',
  'isLoading',
  'is4',
  'is6'
])
