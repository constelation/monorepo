import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Video from '../packages/Video/dist'
// import Text from '../packages/Text/dist/Text.native.js'

storiesOf('Video', module)
  .add('plays a video', () => (
    <Video src='http://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4' />
  ))
  .add('source child', () => (
    <Video muted >
      <source src='http://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4' type='video/mp4' />
    </Video>
  ))
  .add('has controls and muted', () => (
    <Video src='http://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4' controls muted />
  ))
  .add('repeat', () => (
    <Video src='http://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4' controls muted repeat />
  ))
  .add('pauses', () => {
    class PlaysAndPauses extends React.Component {
      state = {
        paused: false
      }

      componentWillMount() {
        setTimeout(() => this.setState( {paused: true} ), 3000)
      }

      render() {
        return (
          <Video
            src='http://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4'
            paused={this.state.paused}
            controls
            muted
          />
        )
      }
    }

    return (
      <PlaysAndPauses />
    )
  })
