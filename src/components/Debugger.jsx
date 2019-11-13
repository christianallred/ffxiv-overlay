import React, { Component } from 'react'

export default class Debugger extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      const css ={
        overflowY:'scroll',
        maxHeight:'250px',
        height: '500px',
      }
      return ( <pre style={css}>{JSON.stringify(this.props.data, null,2)}</pre>);
    }
  }
  