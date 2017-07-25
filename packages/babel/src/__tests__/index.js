// src/__tests__/index-test.js
const babel = require('babel-core');
// const React = require('react');
const plugin = require('../');

const options = { plugins: ["syntax-jsx", plugin.default] }

const defaultFlexCss = 'display: flex;flex-shrink: 0;align-content: flex-start;position: relative;'
const defaultColCss = 'display: flex;flex-direction: column;flex-shrink: 0;align-content: flex-start;position: relative;'
const defaultRowCss = 'display: flex;flex-direction: row;flex-shrink: 0;align-content: flex-start;position: relative;'

it('default self closing', () => {
  var input = `<view />`;
  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultColCss + '`} />;')
})

it('default col', () => {
  var input = `<col />`;
  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultColCss + '`} />;')
})

it('default row', () => {
  var input = `<row />`;
  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultRowCss + '`} />;')
})

it('default flex', () => {
  var input = `<flex />`;
  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + '`} />;')
})

it('handles flex direction prop', () => {
  var input = `<flex direction={someVar} />`;
  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'flex-direction: ${someVar};`} />;')
})

it('default open', () => {
  var input = `<flex ></flex>`;
  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + '`}></div>;')
})

it('as prop to set tag string', () => {
  var input = `<flex as='nav'/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<nav css={`' + defaultFlexCss + '`} />;')
})

it('as expression prop to set tag string', () => {
  var input = `<flex as={'nav'}/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<nav css={`' + defaultFlexCss + '`} />;')
})

it('width string', () => {
  var input = `<flex width='20px'/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'width: 20px;`} />;')
})

it('width expression string', () => {
  var input = `<flex width={'20px'}/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'width: 20px;`} />;')
})

// it('width expression number', () => {
//   var input = `<flex width={20}/>`;
//
//   const { code } = babel.transform(input, options)
//
//   expect(code).toBe('<div css={`' + defaultFlexCss + 'width: 20px;`} />;')
// })

it('width expression variable', () => {
  var input = `<flex width={variable}/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'width: ${variable};`} />;')
})

it('width expression variable, then height', () => {
  var input = `<flex width={variable} height={'20px'}/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'width: ${variable};height: 20px;`} />;')
})


it('handles basic (copied) layout props', () => {
  var input = `<flex
    width={'20px'}
    height='20px'
    padding={"20px"}
    margin={'20px'}
    zIndex={1}
    shrink={1}
  />
  `;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'width: 20px;height: 20px;padding: 20px;margin: 20px;z-index: 1;flex-shrink: 1;`} />;')
})

it('handles basic (translated) layout props', () => {
  var input = `<flex
    paddingTop={'20px'}
    marginBottom={'20px'}
  />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'padding-top: 20px;margin-bottom: 20px;`} />;')
})

it('handles partial expression props', () => {
  var input = `<flex paddingTop={\`\${someVar}px\`} />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'padding-top: ${someVar}px;`} />;')
})

it('handles partial interpolated expression props', () => {
  var input = `<flex paddingTop={20 + 'px'} />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'padding-top: ${20 + \'px\'};`} />;')
})

it('handles partial string expression props', () => {
  var input = `<flex paddingTop={'20' + 'px'} />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'padding-top: ${\'20\' + \'px\'};`} />;')
})

it('handles binaryExpression props', () => {
  var input = `<flex zIndex={2 + 3} />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'z-index: ${2 + 3};`} />;')
})


it('handles center prop', () => {
  var input = `<flex center />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'align-items: center;justify-content: center;`} />;')
})

it('handles center expression prop (true)', () => {
  var input = `<flex center={true} />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'align-items: center;justify-content: center;`} />;')
})

it('handles center expression prop (false)', () => {
  var input = `<flex center={false} />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + '`} />;')
})

it('handles center variable prop', () => {
  var input = `<flex center={someVar} />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + '${someVar === true ? \"align-items: center;justify-content: center;\" : \"\"}`} />;')
})

it('handles hidden expression prop (true)', () => {
  var input = `<flex hidden={true} />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'display: none;`} />;')
})

it('handles hidden expression prop (false)', () => {
  var input = `<flex hidden={false} />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + '`} />;')
})

it('handles hidden variable prop', () => {
  var input = `<flex hidden={someVar} />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + '${someVar === true ? \"display: none;\" : \"\"}`} />;')
})

it('handles inline prop', () => {
  var input = `<flex inline />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'display: inline-flex;`} />;')
})

it('handles fit prop', () => {
  var input = `<flex fit />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'height: 100%;width: 100%;`} />;')
})

it('handles absoluteFill prop', () => {
  var input = `<flex absoluteFill />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'position: absolute;top: 0;right: 0;bottom: 0;left: 0;`} />;')
})

it('handles grow prop', () => {
  var input = `<flex grow={2} />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'flex-grow: 2;`} />;')
})

it('handles grow boolean prop', () => {
  var input = `<flex grow />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'flex-grow: 1;`} />;')
})

it('handles grow var prop', () => {
  var input = `<flex grow={someVar} />`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'flex-grow: ${someVar};`} />;')
})

it('css prop', () => {
  var input = `<flex css={\`width: 20px;\`}/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'width: 20px;`} />;')
})

it('css prop with height prop', () => {
  var input = `<flex height={'20px'} css={\`width: 20px;\`}/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'height: 20px;width: 20px;`} />;')
})

it('css prop with dynamic height prop', () => {
  var input = `<flex height={someVar} css={\`width: 20px;\`}/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'height: ${someVar};width: 20px;`} />;')
})

it('css prop with dynamic width', () => {
  var input = `<flex css={\`width: \${someVar}px;\`}/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'width: ${someVar}px;`} />;')
})

it('css prop with multiple dynamic attributes', () => {
  var input = `<flex css={\`width: \${someVar}px;height: \${someHeight}px;\`}/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'width: ${someVar}px;height: ${someHeight}px;`} />;')
})

it('css prop with multiple dynamic fields and props', () => {
  var input = `<flex height={someHeight} margin={someMargin} css={\`width: \${someVar}px;padding: \${somePadding}px;\`}/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`' + defaultFlexCss + 'height: ${someHeight};margin: ${someMargin};width: ${someVar}px;padding: ${somePadding}px;`} />;')
})
