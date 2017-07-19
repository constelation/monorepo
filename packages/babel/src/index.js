export default function (babel) {
  const { types: t } = babel;

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
  width: true,
  height: true,
  padding: true,
  margin: true,
}

const defaultCss = 'display: flex;flex-direction: column;position: relative;'

function buildDefaultCssProp() {
  return {
    type: 'JSXAttribute',
    name: {
      type: 'JSXIdentifier',
      name: 'css',
    },
    value: {
      type: "JSXExpressionContainer",
      expression: {
        type: "TemplateLiteral",
        expressions: [],
        quasis: [
          {
            type: 'TemplateElement',
            value: {
              raw: defaultCss,
              cooked: defaultCss,
            },
            //            tail: true
          }
        ],
      },
    }
  }
}

function buildCssProp(attribute) {
  const name = attribute.name.name
  let value
  switch (attribute.value.type) {
    case 'JSXExpressionContainer': {
      if (attribute.value.expression.type === 'NumericLiteral') {
        value = attribute.value.expression.extra.raw + 'px'
      }
      else if (attribute.value.expression.type === 'StringLiteral') {
        value = attribute.value.expression.value
      }
      break
    }
    case 'StringLiteral': {
      value = attribute.value.value
      break
    }
  }
  //   console.log(value)
  //  if (attribute.value.type
  //  const value = attribute.value.value

  return {
    type: 'TemplateElement',
    value: {
      raw: `${name}: ${value};`,
      cooked: `${name}: ${value};`,
    },
  }
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
      //      props[0].value.expression.quasis[0].tail = false
      props[0].value.expression.quasis.push(...attribute.value.expression.quasis)
    }
    else if (name in propsToUse) {
      //      props[0].value.expression.quasis[0].tail = false
      props[0].value.expression.quasis.push(buildCssProp(attribute))

      //            props[0].value.expression.quasis[0].value.raw = props[0].value.expression.quasis[0].value.raw + buildCssProp(attribute);
      //      props[0].value.expression.quasis[0].value.cooked = props[0].value.expression.quasis[0].value.cooked + buildCssProp(attribute);
    }
    else {
      props.push(attribute)
    }

  })


  return props
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
