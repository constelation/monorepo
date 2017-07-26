// const printAST = require('ast-pretty-print')
const convertFlex = require('./flex').default
const convertSpace = require('./space').default

export default function (babel) {
  const { types: t } = babel;

  return {
    name: "ast-transform", // not required
    visitor: {
      JSXElement(path) {
        const element = path.node && path.node.openingElement && path.node.openingElement.name

        if (!element) {
          return
        }

        switch (element.name) {
          case 'view':
          case 'col':
          case 'row':
          case 'flex':
            convertFlex(t, path.node, element.name)
            break
          case 'space':
            convertSpace(t, path.node, element.name)
            break
          case 'text':
            break
        }
      }
    }
  };
}
