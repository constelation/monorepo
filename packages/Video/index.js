var React = require('react')

class Video extends React.PureComponent {
  state = {
    autoPlay: !this.props.paused,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.paused && !nextProps.paused) {
      this.node.play()
    }
    else if (!this.props.paused && nextProps.paused) {
      this.node.pause()
    }
  }

  setRef = (node) => {
    this.node = node

    if (this.props.refNode) {
      this.props.refNode(node)
    }
  }

  render() {
    const { refNode, repeat, ...propsToPass } = this.props

    if (repeat) {
      propsToPass.loop = repeat
    }

    propsToPass.ref = this.setRef
    propsToPass.autoPlay = this.state.autoPlay

    // Use refNode pattern to pass back the DOM's node
    // if (refNode) {
      // propsToPass.ref = refNode
    // }

    return React.createElement('video', propsToPass)
  }
}

module.exports = Video
