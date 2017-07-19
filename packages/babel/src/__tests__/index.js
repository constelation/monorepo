// src/__tests__/index-test.js
const babel = require('babel-core');
const plugin = require('../');

const options = { plugins: ["syntax-jsx", plugin.default] }

// var example = `
// class MyComponent extends React.Component {
//   render() {
//     return (
//       <view />
//     )
//   }
// }
// `;


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

it('css prop', () => {
  var input = `<view css={\`width: 20px;\`}/>`;

  const { code } = babel.transform(input, options)

  expect(code).toBe('<div css={`display: flex;flex-direction: column;position: relative;width: 20px;`} />;')
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

// import pluginTester from 'babel-plugin-tester'
// import plugin from '../'

// pluginTester({
//   plugin: plugin,
//   snapshot: false,
//   babelOptions: {
//     presets: ["es2015", "stage-2", "react"],
//   },

//   tests: {
//     // the key is the title
//     // the value is the code that is unchanged (because `snapshot: false`)
//     // test title will be: `1. does not change code with no identifiers`
//     'does not change code with no identifiers': '"hello";',

//     // test title will be: `2. changes this code`
//     'changes this code': {
//       // input to the plugin
//       code: `
//         class MyComponent extends React.Component {
//           render() {
//             return (
//               <view />
//             )
//           }
//         }
//       `,
//       // expected output
//       output: `
//         class MyComponent extends React.Component {
//           render() {
//             return (
//               <div css={\`display: flex;flex-direction: column;position: relative;\`} />
//             )
//           }
//         }
//       `,
//     },
//   },
// })
//       // code: `
//       //   class MyComponent extends React.Component {
//       //     render() {
//       //       return (
//       //         <view as={'nav'} />
//       //       )
//       //     }
//       //   }
//       // `,
