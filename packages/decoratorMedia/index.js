'use strict';

const noop = () => {}

function media(matchRule) {
  return function decorator(proto, method, descriptor) {

    const {
      componentDidMount = noop,
      componentWillUnmount = noop,
    } = proto

    let matchMedia, mediaHandler

    // eslint-disable-next-line no-param-reassign
    proto.componentDidMount = function componentDidMountWrapped() {
      componentDidMount.call(this)

      mediaHandler = ({ matches }) => {
        this[method](matches)
      }

      matchMedia = window.matchMedia(matchRule)
      matchMedia.addListener(mediaHandler)
    }

    // eslint-disable-next-line no-param-reassign
    proto.componentWillUnmount = function componentWillUnmountWrapped() {
      componentWillUnmount.call(this)

      matchMedia.removeListener(mediaHandler)
    }
  }
}

module.exports = media
