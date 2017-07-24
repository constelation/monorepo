export default function (babel) {
  const { types: t } = babel;

  function buildDefaultCssProp() {
    return t.jSXAttribute(
      t.jSXIdentifier('css'),
      t.jSXExpressionContainer(
        t.templateLiteral(
          [
            t.templateElement({
              raw: defaultCss,
              cooked: defaultCss,
            })
          ],
          [],
        )
      )
    )
  }

  function buildProps(node) {
    const css = buildDefaultCssProp()
    const props = [css]

    if (node.openingElement.attributes == null) {
      return props
    }

    node.openingElement.attributes.forEach(attribute => {
      const name = attribute.name.name

      if (name in propsToOmit) {
        return
      }
      else if (name === 'css') {
        addTemplateToTemplate(props[0].value.expression, attribute.value.expression)
      }
      else if (name in propsToUse) {
        addCssProp(props[0].value.expression, attribute, propsToUse[name])
      }
      else {
        props.push(attribute)
      }

    })


    return props
  }

  function addCssProp(cssTemplate, attribute, name) {
    const { value } = attribute

    if (t.isJSXExpressionContainer(value)) {
      const { expression } = value

      if (t.isNumericLiteral(expression)) {
        addStringToTemplate(cssTemplate, `${name}: ${expression.extra.raw}px;`)
      }
      else if (t.isStringLiteral(expression)) {
        addStringToTemplate(cssTemplate, `${name}: ${expression.value};`)
      }
      else if (t.isIdentifier(expression)) {
        addStringToTemplate(cssTemplate, `${name}: `)
        addQuasiToTemplate(cssTemplate, t.templateElement(
          {
            raw: ';',
            cooked: ';',
          }))
        addExpressionToTemplate(cssTemplate, t.identifier(expression.name))
      }
    }
    else if (t.isStringLiteral(value)) {
      addStringToTemplate(cssTemplate, `${name}: ${value.value};`)
    }

    /*
      return {
        type: 'TemplateElement',
        value: {
          raw: `${name}: ${value};`,
          cooked: `${name}: ${value};`,
        },
      }*/
  }


  return {
    name: "ast-transform", // not required
    visitor: {
      JSXElement(path) {

        const isView = looksLike(path, {
          node: {
            openingElement: {
              name: {
                name: 'view',
              }
            }
          },
        })

        if (!isView) {
          return
        }

        renameTag(path.node)
        const props = buildProps(path.node)

        path.node.openingElement.attributes = props

      }
    }
  };
}

const propsToOmit = {
  as: true,
}

const propsToUse = {
  width: 'width',
  height: 'height',
  padding: 'padding',
  paddingTop: 'padding-top',
  paddingRight: 'padding-right',
  paddingBottom: 'padding-bottom',
  paddingLeft: 'padding-left',
  margin: 'margin',
  marginTop: 'margin-top',
  marginRight: 'margin-right',
  marginBottom: 'margin-bottom',
  marginLeft: 'margin-left',
}

const defaultCss = 'display: flex;flex-direction: column;position: relative;'

function addTemplateToTemplate(target, template) {
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

function addStringToTemplate(template, str) {
  const last = template.quasis.length - 1

  template.quasis[last].value.raw = template.quasis[last].value.raw + str
  template.quasis[last].value.cooked = template.quasis[last].value.cooked + str
}

function addQuasiToTemplate(template, quasi) {
  template.quasis.push(quasi)
}

function addExpressionToTemplate(template, expression) {
  template.expressions.push(expression)
}

function renameTag(node) {
  let tagName = 'div'

  if (node.openingElement.attributes != null) {
    const name = node.openingElement.attributes.find(prop => {
      return prop.name.name === 'as'
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

function looksLike(a, b) {
  return (
    a &&
    b &&
    Object.keys(b).every(bKey => {
      const bVal = b[bKey]
      const aVal = a[bKey]
      if (typeof bVal === 'function') {
        return bVal(aVal)
      }
      return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal)
    })
  )
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val)
}
