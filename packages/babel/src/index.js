export default function (babel) {
  const { types: t } = babel;

  //  console.log(babel)

  return {
    name: "ast-transform", // not required
    visitor: {
      JSXElement(path) {
        //        console.log(path)

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

function addCssProp(cssTemplate, attribute, name) {
  switch (attribute.value.type) {
    case 'JSXExpressionContainer': {
      if (attribute.value.expression.type === 'NumericLiteral') {
        addStringToTemplate(cssTemplate, `${name}: ${attribute.value.expression.extra.raw}px;`)
      }
      else if (attribute.value.expression.type === 'StringLiteral') {
        addStringToTemplate(cssTemplate, `${name}: ${attribute.value.expression.value};`)
      }
      else if (attribute.value.expression.type === 'Identifier') {
        addStringToTemplate(cssTemplate, `${name}: `)
        addQuasiToTemplate(cssTemplate, {
          type: 'TemplateElement',
          value: {
            raw: ';',
            cooked: ';',
          },
        })
        addExpressionToTemplate(cssTemplate, {
          type: 'Identifier',
          name: attribute.value.expression.name,
        })
      }
      break
    }
    case 'StringLiteral': {
      addStringToTemplate(cssTemplate, `${name}: ${attribute.value.value};`)
      break
    }
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
      addCssProp(props[0].value.expression, attribute, propsToUse[name])
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
