import { withSyntax, syntaxModifiers } from 'modifiers/syntax'
import { withTitleSize, titleSizeModifiers } from 'modifiers/title-size'
import { withRatio, ratioModifiers } from 'modifiers/ratio'
import pipe from 'lib/pipe'

export default function withModifiers(baseClass, props) {
  const classes = pipe(
    [baseClass],
    (classes) => withRatio(classes, props),
    (classes) => withSyntax(classes, props),
    (classes) => withTitleSize(classes, props),
  )

  return classes.join(' ')
}

export const modifiers = Object.freeze([
  ...ratioModifiers,
  ...syntaxModifiers,
  ...titleSizeModifiers,
])
