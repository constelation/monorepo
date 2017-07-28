// const printAST = require('ast-pretty-print')

export function buildDefaultCssProp(t, css) {
  return t.jSXAttribute(
    t.jSXIdentifier('css'),
    t.jSXExpressionContainer(
      t.templateLiteral(
        [
          t.templateElement({
            raw: css,
            cooked: css,
          })
        ],
        [],
      )
    )
  )
}

export function addTemplateToTemplate(target, template) {
  if (template.expressions.length > 0) {
    if (target.expressions.length === target.quasis.length) {
      // safe to just push these
      target.expressions.push(...template.expressions)
      target.quasis.push(...template.quasis)
    }
    else {
      target.expressions.push(...template.expressions)

      // concate the first quasi, then push on the rest
      addStringToTemplate(target, template.quasis[0].value.raw)
      target.quasis.push(...template.quasis.slice(1))
    }
  }
  else {
    addStringToTemplate(target, template.quasis[0].value.raw)
  }
}

export function addStringToTemplate(template, str) {
  const last = template.quasis.length - 1

  template.quasis[last].value.raw = template.quasis[last].value.raw + str
  template.quasis[last].value.cooked = template.quasis[last].value.cooked + str
}

export function addQuasiToTemplate(template, quasi) {
  template.quasis.push(quasi)
}

export function addExpressionToTemplate(template, expression) {
  template.expressions.push(expression)
}

export function renameTag(node, defaultTag = 'div') {
  let tagName = defaultTag

  if (node.openingElement.attributes != null) {
    const name = node.openingElement.attributes.find(prop => {
      return prop.name && prop.name.name === 'as'
    })

    if (name !== undefined) {
      const val = name.value.value || name.value.expression.value

      if (val != null) {
        tagName = val
      }
      else {
        console.log('invalid `as` value. No variables allowed.')
      }
    }
  }

  node.openingElement.name.name = tagName

  if (node.closingElement) {
    node.closingElement.name.name = tagName
  }
}
