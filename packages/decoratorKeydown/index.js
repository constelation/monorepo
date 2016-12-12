/*
 * Component uses event.key to match keypresses.
 * See https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
 */

'use strict';

const noop = () => {}

function keydown(...args) {
  let key

  // @decorator
  if (args.length === 3) {
    key = null

    return decorator(...args)
  }
  // @decorator('Escape')
  else {
    key = args[0]

    return decorator
  }

  function decorator(proto, method, descriptor) {
    const {
      componentDidMount = noop,
      componentWillUnmount = noop,
    } = proto

    let handler

    // eslint-disable-next-line no-param-reassign
    proto.componentDidMount = function componentDidMountWrapped() {
      componentDidMount.call(this)

      handler = (e) => {
        if (key === null) {
          // no key specified, so send them all through
          return this[method](e)
        }
        else if (e.key === key) {
          // found a match for key, so send it through
          this[method](e)
        }
        // else do nothing
      }

      window.addEventListener('keydown', handler)
    }

    // eslint-disable-next-line no-param-reassign
    proto.componentWillUnmount = function componentWillUnmountWrapped() {
      componentWillUnmount.call(this)

      window.removeEventListener('keydown', handler)
    }
  }
}

module.exports = keydown
