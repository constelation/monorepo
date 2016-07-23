import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Image from '../Image'
import Col from '../packages/Col'

storiesOf('Image', module)
  .add('without children', () => (
    <Image src='https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150' />
  ))
  .add('with children', () => (
    <Image
      src='https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150'
      width={350}
      height={150}
    >
      I am child text
    </Image>
  ))
  .add('without children maxWidth', () => (
    <Image
      src='https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150'
      width={350}
      maxWidth={150}
      height={150}
    />
  ))
  .add('with children maxWidth', () => (
    <Image
      src='https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97150&w=350&h=150'
      width={350}
      maxWidth={150}
      height={150}
    >
      I am child text
    </Image>
  ))
  .add('with Col centered child', () => (
    <Image
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
    </Image>
  ))
