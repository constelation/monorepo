// import 'react-native'
import React from 'react'
import View from '../index.js'
import {shallow} from 'enzyme';
import { render, unmountComponentAtNode } from 'react-dom'
import { cssLabels, rehydrate } from 'glamor'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <View />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
// test('alignsVertical', () => {
//   // render(<View alignVertical='top' />, node, () => {
//   //   expect(childStyle(node).justifyContent).toEqual('flex-start')
//   // })
//
//   cssLabels(true)
//   const Comp = shallow(<View alignVertical='top'/>)
//
//   const className = Object.keys(Comp.prop('className'))[0]
//   console.log(Comp.props());
//     // console.log(rehydrate([className]));
//   // console.log(Comp.prop('className'));
//   // expect(Comp.prop('style').justifyContent).toBe('flex-start')
//   expect(Comp.instance().props.style.justifyContent).toBe('flex-start')
//   cssLabels(false)
//   // expect(tree).toMatchSnapshot();
// });
//
//
// // it('applies the style to a given node', () => {
// //     render(<div {...style({ backgroundColor: 'red' })}/>, node, () => {
// //       expect(childStyle(node).backgroundColor).toEqual('rgb(255, 0, 0)')
// //     })
// //   })
// //
// function childStyle(node, p = null) {
//   return window.getComputedStyle(node.childNodes[0], p)
// }
