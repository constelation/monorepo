import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Video from '../packages/Video/index.js'
// import Text from '../packages/Text/dist/Text.native.js'

storiesOf('Video', module)
  .addWithInfo('plays a video', () => (
    <Video src='http://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4' />
  ))
  .addWithInfo('source child', () => (
    <Video muted >
      <source src='http://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4' type='video/mp4' />
    </Video>
  ))
  .addWithInfo('has controls and muted', () => (
    <Video src='http://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4' controls muted />
  ))
  .addWithInfo('repeat', () => (
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
