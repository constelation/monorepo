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
    font='Arial'
    color='red'
    size={"20px"}
    spacing={'20px'}
    decoration={'underline'}
    weight={100}
    transform={'capitalize'}
  />
  `;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<span css={`' + defaultCss + 'font-family: Arial;color: red;font-size: 20px;letter-spacing: 20px;text-decoration: underline;font-weight: 100;text-transform: capitalize;`} />;')
})

it('handles italic prop', () => {
  var input = `<text italic />`;
  const { code } = babel.transform(input, options)

  expect(code).toBe('<span css={`' + defaultCss + 'font-style: italic;`} />;')
})

it('handles italic prop identifier', () => {
  var input = `<text italic={someVar} />`;
  const { code } = babel.transform(input, options)

  expect(code).toBe('<span css={`' + defaultCss + '${someVar === true ? "font-style: italic;" : ""}`} />;')
})

it('handles bold prop', () => {
  var input = `<text bold />`;
  const { code } = babel.transform(input, options)

  expect(code).toBe('<span css={`' + defaultCss + 'font-weight: bold;`} />;')
})

it('handles uppercase prop', () => {
  var input = `<text uppercase />`;
  const { code } = babel.transform(input, options)

  expect(code).toBe('<span css={`' + defaultCss + 'text-transform: uppercase;`} />;')
})

it('handles antialiased prop', () => {
  var input = `<text antialiased />`;
  const { code } = babel.transform(input, options)

  expect(code).toBe('<span css={`' + defaultCss + '-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;`} />;')
})
