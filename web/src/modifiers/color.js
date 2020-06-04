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
  return classes.join(' ')
}

export const modifiers = Object.freeze([
  'isPrimary',
  'isDanger',
  'isLoading',
])
