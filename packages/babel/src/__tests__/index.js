// src/__tests__/index-test.js
const babel = require('babel-core');
// const React = require('react');
const plugin = require('../');

const options = { plugins: ["syntax-jsx", plugin.default] }

it('default self closing', () => {
  var input = `<view />`;
  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;`} />;')
})

it('default open', () => {
  var input = `<view ></view>`;
  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;`}></div>;')
})

it('as prop to set tag string', () => {
  var input = `<view as='nav'/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<nav css={`display: flex;flex-direction: column;position: relative;`} />;')
})

it('as expression prop to set tag string', () => {
  var input = `<view as={'nav'}/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<nav css={`display: flex;flex-direction: column;position: relative;`} />;')
})

it('width string', () => {
  var input = `<view width='20px'/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;width: 20px;`} />;')
})

it('width expression string', () => {
  var input = `<view width={'20px'}/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;width: 20px;`} />;')
})

it('width expression number', () => {
  var input = `<view width={20}/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;width: 20px;`} />;')
})

it('width expression variable', () => {
  var input = `<view width={variable}/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;width: ${variable};`} />;')
})

it('width expression variable, then height', () => {
  var input = `<view width={variable} height={20}/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;width: ${variable};height: 20px;`} />;')
})


it('handles basic (copied) layout props', () => {
  var input = `<view
    width={20}
    height={20}
    padding={20}
    margin={20}
  />
  `;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;width: 20px;height: 20px;padding: 20px;margin: 20px;`} />;')
})

it('handles basic (translated) layout props', () => {
  var input = `<view
    paddingTop={20}
    marginBottom={20}
  />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;padding-top: 20px;margin-bottom: 20px;`} />;')
})

it('css prop', () => {
  var input = `<view css={\`width: 20px;\`}/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;width: 20px;`} />;')
})

it('css prop with height prop', () => {
  var input = `<view height={20} css={\`width: 20px;\`}/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;height: 20px;width: 20px;`} />;')
})

it('css prop with dynamic height prop', () => {
  var input = `<view height={someVar} css={\`width: 20px;\`}/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;height: ${someVar};width: 20px;`} />;')
})

it('css prop with dynamic width', () => {
  var input = `<view css={\`width: \${someVar}px;\`}/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;width: ${someVar}px;`} />;')
})

it('css prop with multiple dynamic attributes', () => {
  var input = `<view css={\`width: \${someVar}px;height: \${someHeight}px;\`}/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;width: ${someVar}px;height: ${someHeight}px;`} />;')
})

it('css prop with multiple dynamic fields and props', () => {
  var input = `<view height={someHeight} margin={someMargin} css={\`width: \${someVar}px;padding: \${somePadding}px;\`}/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;height: ${someHeight};margin: ${someMargin};width: ${someVar}px;padding: ${somePadding}px;`} />;')
})
