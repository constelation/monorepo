import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import BackgroundImage from '../packages/BackgroundImage'
import Col from '../packages/Col'

storiesOf('BackgroundImage', module)
  .add('without children', () => (
    <BackgroundImage
      src='https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150'
      width={350}
      height={150}
    />
  ))
  .add('with children', () => (
    <BackgroundImage
      src='https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150'
      width={350}
      height={150}
    >
      I am child text
    </BackgroundImage>
  ))
  .add('with maxWidth', () => (
    <BackgroundImage
      src='https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150'
      width={350}
      maxWidth={150}
      height={150}
    />
  ))
  .add('with Col centered child', () => (
    <BackgroundImage
      src='https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150'
      width={350}
      height={150}
    >
      <Col
        justifyContent='center'
        alignItems='center'
        height='100%'
      >
        I am child text
      </Col>
    </BackgroundImage>
  ))
