// const printAST = require('ast-pretty-print')
const {
  addTemplateToTemplate,
  addStringToTemplate,
  addQuasiToTemplate,
  addExpressionToTemplate,
  buildDefaultCssProp,
  renameTag,
} = require('./utils')

const propsToOmit = {
  as: true,
}

const propsToUse = {
  font: 'font-family',
  color: 'color',
  size: 'font-size',
  spacing: 'letter-spacing',
  decoration: 'text-decoration'
  // antialiased
  // bold
  // align
  // center
  // ellipsis
  // italic
  // transform
  // underline
  // uppercase
  // weight

}

const booleanProps = {
  center: {
    consequent: 'align-items: center;justify-content: center;',
    alternate: '',
  },
  hidden: {
    consequent: 'display: none;',
    alternate: '',
  },
  inline: {
    consequent: 'display: inline-flex;',
    alternate: '',
  },
  fit: {
    consequent: 'height: 100%;width: 100%;',
    alternate: '',
  },
  absoluteFill: {
    consequent: 'position: absolute;top: 0;right: 0;bottom: 0;left: 0;',
    alternate: '',
  },
}

// from https://bitsofco.de/the-new-system-font-stack/
const defaultCss = 'font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;'

export default function (t, node) {
  function buildProps(node, cssProps) {
    const css = buildDefaultCssProp(t, defaultCss)
    const cssTemplate = css.value.expression
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
        addTemplateToTemplate(cssTemplate, attribute.value.expression)
      }
      else if (name in propsToUse) {
        addCssProp(cssTemplate, attribute, propsToUse[name])
      }
      else if (name in booleanProps) {
        addBooleanProp(cssTemplate, attribute, name, booleanProps[name])
      }
      else if (name === 'grow') {
        addGrowProp(cssTemplate, attribute)
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

      // console.log(printAST(expression));

      if (t.isNumericLiteral(expression)) {
        addStringToTemplate(cssTemplate, `${name}: ${expression.extra.raw};`)
      }
      else if (t.isStringLiteral(expression)) {
        addStringToTemplate(cssTemplate, `${name}: ${expression.value};`)
      }
      else if (t.isIdentifier(expression)) {
        addStringToTemplate(cssTemplate, `${name}: `)
        addQuasiToTemplate(cssTemplate, t.templateElement({raw: ';', cooked: ';'}))
        addExpressionToTemplate(cssTemplate, t.identifier(expression.name))
      }
      else if (t.isTemplateLiteral(expression)) {
        expression.quasis[0].value.cooked = `${name}: ${expression.quasis[0].value.cooked}`
        expression.quasis[0].value.raw = `${name}: ${expression.quasis[0].value.raw}`
        addTemplateToTemplate(cssTemplate, expression)
        addStringToTemplate(cssTemplate, `;`)
      }
      else if (t.isBinaryExpression(expression)) {
        addStringToTemplate(cssTemplate, `${name}: `)
        addExpressionToTemplate(cssTemplate, expression)
        addQuasiToTemplate(cssTemplate, t.templateElement({raw: ';', cooked: ';'}))
      }
      else if (t.isConditionalExpression(expression)) {
        addStringToTemplate(cssTemplate, `${name}: `)
        addExpressionToTemplate(cssTemplate, expression)
        addQuasiToTemplate(cssTemplate, t.templateElement({raw: ';', cooked: ';'}))
      }

    }
    else if (t.isStringLiteral(value)) {
      addStringToTemplate(cssTemplate, `${name}: ${value.value};`)
    }
  }

  function addBooleanProp(cssTemplate, attribute, name, {consequent, alternate}) {
    const { value } = attribute

    if (value === null) {
      addStringToTemplate(cssTemplate, consequent)
    }
    else if (t.isJSXExpressionContainer(value)) {
      const { expression } = value

      if (t.isBooleanLiteral(expression) && expression.value === true) {
        addStringToTemplate(cssTemplate, consequent)
      }
      else if (t.isIdentifier(expression)) {
        addExpressionToTemplate(cssTemplate, t.conditionalExpression(
          t.binaryExpression(
            '===',
            t.identifier(expression.name),
            t.booleanLiteral(true),
          ),
          t.stringLiteral(consequent),
          t.stringLiteral(alternate),
        ))

        addQuasiToTemplate(cssTemplate, t.templateElement({raw: '', cooked: ''}))
      }
    }
  }

  function addGrowProp(cssTemplate, attribute) {
    const { value } = attribute

    if (value === null) {
      addStringToTemplate(cssTemplate, 'flex-grow: 1;')
    }
    else if (t.isJSXExpressionContainer(value)) {
      const { expression } = value

      if (t.isNumericLiteral(expression)) {
        addStringToTemplate(cssTemplate, `flex-grow: ${expression.extra.raw};`)
      }
      else if (t.isStringLiteral(expression)) {
        addStringToTemplate(cssTemplate, `flex-grow: ${expression.value};`)
      }
      else if (t.isIdentifier(expression)) {
        addStringToTemplate(cssTemplate, `flex-grow: `)
        addQuasiToTemplate(cssTemplate, t.templateElement({raw: ';', cooked: ';'}))
        addExpressionToTemplate(cssTemplate, t.identifier(expression.name))
      }
    }
    else if (t.isStringLiteral(value)) {
      addStringToTemplate(cssTemplate, `flex-grow: ${value.value};`)
    }
  }

  renameTag(node, 'span')
  node.openingElement.attributes = buildProps(node)
}
