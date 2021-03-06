import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Button from '../packages/Button'

storiesOf('Button', module)
  .addWithInfo('with text child', () => (
    <Button>
      This is a button
    </Button>
  ))
