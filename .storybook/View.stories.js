import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { style, merge } from 'glamor'
import View from '../packages/View'
import Style_ from '../packages/Style_'

let mono = style({
  width: '50px'
})

let bolder = style({
  height: '50px'
})

storiesOf('View', module)
  // .add('with children divs', () => (
  //   <View height='500px' style={style}>
  //     <div style={{height: 20, backgroundColor: 'red'}} />
  //     <div style={{height: 20, backgroundColor: 'green'}} />
  //     <div style={{height: 20, backgroundColor: 'blue'}} />
  //   </View>
  // ))
  // .add('with children flex=1 Views', () => (
  //   <View height='500px' style={style}>
  //     <View flex={1} style={{backgroundColor: 'red'}} />
  //     <View flex={1} style={{backgroundColor: 'green'}} />
  //     <View flex={1} style={{backgroundColor: 'blue'}} />
  //   </View>
  // ))
.add('inline style div', () => {
  var divStyle = {height: 50, width: 50, backgroundColor:'red'}
  class Perf extends React.Component {
  state = {
    isVisible: false,
  }

  componentDidMount() {
    window.performance.mark("startFoo");

    this.setState({isVisible: true}, () => {
      window.performance.mark("endFoo");
      window.performance.measure("durationFoo", "startFoo", "endFoo");
    })
  }

  render() {
    return (
        this.state.isVisible
        ? (
          <div style={divStyle} />
        )
      : null
    )
  }
  }
  return <Perf />
})
.add('div glamor', () => {
  class Perf extends React.Component {
  state = {
    isVisible: false,
  }

  componentDidMount() {
    window.performance.mark("startFoo");

    this.setState({isVisible: true}, () => {
      window.performance.mark("endFoo");
      window.performance.measure("durationFoo", "startFoo", "endFoo");
    })
  }

  render() {
    return (
        this.state.isVisible
        ? (
          <div {...merge(mono, bolder)} />
        )
      : null
    )
  }
  }
  return <Perf />
})
.add('single View', () => {
  class Perf extends React.Component {
  state = {
    isVisible: false,
  }

  componentDidMount() {
    window.performance.mark("startFoo");

    this.setState({isVisible: true}, () => {
      window.performance.mark("endFoo");
      window.performance.measure("durationFoo", "startFoo", "endFoo");
    })
  }

  render() {
    return (
        this.state.isVisible
        ? (
          <View width='50px' height='50px' />
        )
      : null
    )
  }
  }
  return <Perf />
})
.add('single with Style_', () => {
  class Perf extends React.Component {
  state = {
    isVisible: false,
  }

  componentDidMount() {
    window.performance.mark("startFoo");

    this.setState({isVisible: true}, () => {
      window.performance.mark("endFoo");
      window.performance.measure("durationFoo", "startFoo", "endFoo");
    })
  }

  render() {
    return (
        this.state.isVisible
        ? (
          <Style_ backgroundColor='red'>
            <View width='50px' height='50px'/>
          </Style_>
        )
      : null
    )
  }
  }
  return <Perf />
})
.add('single View with background', () => {
  class Perf extends React.Component {
  state = {
    isVisible: false,
  }

  componentDidMount() {
    window.performance.mark("startFoo");

    this.setState({isVisible: true}, () => {
      window.performance.mark("endFoo");
      window.performance.measure("durationFoo", "startFoo", "endFoo");
    })
  }

  render() {
    return (
        this.state.isVisible
        ? (
            <View width='50px' height='50px' backgroundColor='red'/>
        )
      : null
    )
  }
  }
  return <Perf />
})

  .add('View and Style', () => {
    class Perf extends React.Component {
    state = {
      isVisible: false,
    }

    componentDidMount() {
      window.performance.mark("startFoo");

      this.setState({isVisible: true}, () => {
        window.performance.mark("endFoo");
        window.performance.measure("durationFoo", "startFoo", "endFoo");
      })
    }

    // componentDidUpdate(prevProps, prevState, prevContext) {
    //   if (!prevState.isVisible && this.state.isVisible) {
    //     window.performance.mark("endFoo");
    //     window.performance.measure("durationFoo", "startFoo", "endFoo");
    //   }
    // }
    //
    render() {
      return (
          this.state.isVisible
          ? (
            <Style_
              backgroundColor='lightgrey'
              border='1px solid black'
            >
            <View
              height='500px'
              alignHorizontal='right'
              alignVertical='center'
              style={{backgroundColor:'red'}}
            >
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='red'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='green'><View height={40} width={40} /></Style_>
              <Style_ backgroundColor='blue'><View height={40} width={40} /></Style_>
            </View>
          </Style_>
          )
          : null
      )
    }
  }

  return <Perf />
})
//  .add('alignVertical center alignHorizontal right', () => {
//    class Perf extends React.Component {
//      state = {
//        isVisible: false,
//      }
//
//      componentDidMount() {
//        window.performance.mark("startFoo");
//
//        this.setState({isVisible: true}, () => {
//          window.performance.mark("endFoo");
//          window.performance.measure("durationFoo", "startFoo", "endFoo");
//        })
//      }
//
//      // componentDidUpdate(prevProps, prevState, prevContext) {
//      //   if (!prevState.isVisible && this.state.isVisible) {
//      //     window.performance.mark("endFoo");
//      //     window.performance.measure("durationFoo", "startFoo", "endFoo");
//      //   }
//      // }
//      //
//      render() {
//        return (
//            this.state.isVisible
//            ? (
//              <View
//                height='500px'
//                alignHorizontal='right'
//                alignVertical='center'
//                backgroundColor='lightgrey'
//                border='1px solid black'
//              >
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='red' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//                <View height={40} width={40} backgroundColor='green' />
//                <View height={40} width={40} backgroundColor='blue' />
//              </View>
//            )
//            : null
//        )
//      }
//    }
//
//    return <Perf />
//  })
  // .add('console.logs refNode', () => (
  //   <View refNode={node => {console.log(node)}} />
  // ))
  // .add('can handle transitions with style array, choosing the last in the arrays', () => (
  //   <View
  //     height={40}
  //     width={40}
  //     transition='transform 200ms'
  //     style={[
  //       {backgroundColor: 'red'},
  //       {transition: 'opacity 200ms'},
  //       {transition: 'color 200ms'}
  //     ]}
  //   />
  // ))
