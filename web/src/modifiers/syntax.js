export function withSyntax (classes, props) {
  if (props.isPrimary) {
    classes.push('is-primary')
  } else if (props.isInfo) {
    classes.push('is-info')
  } else if (props.isDanger) {
    classes.push('is-danger')
  }

  if (props.isLoading) {
    classes.push('is-loading')
  }

  return classes
}

export const syntaxModifiers = Object.freeze([
  'isPrimary',
  'isInfo',
  'isDanger',
  'isLoading',
])
