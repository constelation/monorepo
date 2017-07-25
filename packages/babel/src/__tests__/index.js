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

it('handles center prop', () => {
  var input = `<view center />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;align-items: center;justify-content: center;`} />;')
})

it('handles center expression prop (true)', () => {
  var input = `<view center={true} />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;align-items: center;justify-content: center;`} />;')
})

it('handles center expression prop (false)', () => {
  var input = `<view center={false} />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;`} />;')
})

it('handles center variable prop', () => {
  var input = `<view center={someVar} />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;${someVar === true ? \"align-items: center;justify-content: center;\" : \"\"}`} />;')
})

it('handles hidden expression prop (true)', () => {
  var input = `<view hidden={true} />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;display: none;`} />;')
})

it('handles hidden expression prop (false)', () => {
  var input = `<view hidden={false} />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;`} />;')
})

it('handles hidden variable prop', () => {
  var input = `<view hidden={someVar} />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;${someVar === true ? \"display: none;\" : \"\"}`} />;')
})

it('handles inline prop', () => {
  var input = `<view inline />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;display: inline-flex;`} />;')
})

it('handles fit prop', () => {
  var input = `<view fit />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;height: 100%;width: 100%;`} />;')
})

it('handles absoluteFill prop', () => {
  var input = `<view absoluteFill />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;position: absolute;top: 0;right: 0;bottom: 0;left: 0;`} />;')
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
