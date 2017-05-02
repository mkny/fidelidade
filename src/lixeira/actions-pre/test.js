import React, { Component } from 'react'

import context from './testdecorator'

var contextTypes = {
    print: React.PropTypes.func.isRequired
}

var myContext = {
    print: (m) => (m)
}

@context(contextTypes, myContext)
class Teste extends Component {
	render(){
		return <h1>Hello</h1>
	}
}

export default Teste;


