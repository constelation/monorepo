// src/__tests__/index-test.js
const babel = require('babel-core');
const plugin = require('../');

const options = { plugins: ["syntax-jsx", plugin.default] }

const defaultCss = 'font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;'

it('default text', () => {
  var input = `<text />`;
  const { code } = babel.transform(input, options)

  expect(code).toBe('<span css={`' + defaultCss + '`} />;')
})

it('handles basic (copied) layout props', () => {
  var input = `<text
    font='arial'
    color='red'
    size={"20px"}
    spacing={'20px'}
    decoration={'underline'}
  />
  `;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<span css={`' + defaultCss + 'font-family: arial;color: red;font-size: 20px;letter-spacing: 20px;text-decoration: underline;`} />;')
})

