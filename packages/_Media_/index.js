'use strict';

var React = require('react')

/*
 * Example:
 *
 * <_Media_ matches='(min-width: 1024px)' onChange={this.handleMatch} />
 *
 */
class _Media_ extends React.Component {

  // May want to remove this in the future and dynamically modify subscriptions if a prop changes
  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    this.media = window.matchMedia(this.props.matches)
    this.media.addListener(this.handleMedia)
  }

  componentWillUnmount() {
    this.media.removeListener(this.handleMedia)
  }

  handleMedia = ({ matches }) => {
    this.props.onChange(matches)
  }

  render() {
    return null
  }
}

module.exports = _Media_
