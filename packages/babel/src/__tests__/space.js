// src/__tests__/index-test.js
const babel = require('babel-core');
const plugin = require('../');

const options = { plugins: ["syntax-jsx", plugin.default] }

const defaultCss = 'flex-grow: 0;flex-shrink: 0;'

it('default space', () => {
  var input = `<space />`;
  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultCss + '`} />;')
})

it('size string', () => {
  var input = `<space size='10px'/>`;
  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultCss + 'flex-basis: 10px;`} />;')
})

it('size expression string', () => {
  var input = `<space size={'10px'}/>`;
  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultCss + 'flex-basis: 10px;`} />;')
})

it('size expression identifier', () => {
  var input = `<space size={someVar}/>`;
  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultCss + 'flex-basis: ${someVar};`} />;')
})

it('size expression templateLiteral', () => {
  var input = `<space size={\`\${someVar}px\`}/>`;
  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultCss + 'flex-basis: ${someVar}px;`} />;')
})

it('size expression conditionalExpression', () => {
  var input = `<space size={\`\${someVar ? true : false}\`}/>`;
  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultCss + 'flex-basis: ${someVar ? true : false};`} />;')
})
