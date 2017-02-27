import 'react-native'
import React from 'react'
import View from '../index.native.js'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <View />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('default alignItems=stretch', () => {
  const view = renderer.create(
    <View />
  ).toJSON();

  expect(view.props.style.alignItems).toBe('stretch')
});

test('default horizontal alignItems=flex-start', () => {
  const view = renderer.create(
    <View horizontal />
  ).toJSON();

  expect(view.props.style.alignItems).toBe('flex-start')
});

test('alignVertical and alignHorizontal', () => {
  const view = renderer.create(
    <View
      alignVertical='top'
      alignHorizontal='right'
    />
  ).toJSON();

  expect(view.props.style.justifyContent).toBe('flex-start')
  expect(view.props.style.alignItems).toBe('flex-end')
});

test('horizontal alignVertical and alignHorizontal', () => {
  const horizontalView = renderer.create(
    <View
      horizontal
      alignVertical='top'
      alignHorizontal='right'
    />
  ).toJSON();

  expect(horizontalView.props.style.alignItems).toBe('flex-start')
  expect(horizontalView.props.style.justifyContent).toBe('flex-end')
});
