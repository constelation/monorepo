'use strict';

import subscribeUIEvent from 'subscribe-ui-event'

const noop = () => {}

function scroll(...args) {
  let options

  // @decorator
  if (args.length === 3) {
    options = null

    return decorator(...args)
  }
  // @decorator(optionsObject)
  else {
    options = {
      throttle: args[0].throttle,
      enableScrollInfo: args[0].passInfo,
      useRAF: args[0].throttle === 'RAF',
    }

    return decorator
  }

  function decorator(proto, method, descriptor) {
    const {
      componentDidMount = noop,
      componentWillUnmount = noop,
    } = proto

    let subscription

    // eslint-disable-next-line no-param-reassign
    proto.componentDidMount = function componentDidMountWrapped() {
      componentDidMount.call(this)

      subscription = subscribeUIEvent.subscribe('scroll', (e, { scroll }) => {
        this[method](e, scroll)
      }, options)
    }

    // eslint-disable-next-line no-param-reassign
    proto.componentWillUnmount = function componentWillUnmountWrapped() {
      componentWillUnmount.call(this)

      subscription.unsubscribe()
    }
  }
}

module.exports = scroll
