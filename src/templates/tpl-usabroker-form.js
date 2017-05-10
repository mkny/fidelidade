import React from 'react'
import _ from 'lodash'

import { lxbroker, doSwagger } from './../ducks/linx/lxbroker2/LxBroker'

import AdminBox from './layout/admin-box'

class TplUsabrokerForm extends React.Component {
	constructor(props){
		super(props)
		
		const { create } = _.at(this.props, 'route.config.actions')[0]
		this.state = {
			create
		}
	}

	componentWillMount(){
		// Everyday i'm brok'n
		// this.props._lxbroker.create()
		this.createme(this.props._lxbroker.doSwagger(this.state.create))
			

		// const a = this.props.route.config
		// console.log()
	}

	createme(b){
		console.log('cm', b)
	}

	render(){
		
		

		// doSwagger(a => {
		// 	console.log(a)
		// });
		// console.log(create)
		// console.log(this.props.route.config.actions.create)
		
		return <div className="content">
			<div className="row">
				<div className="col-md-12">
					<AdminBox header="LxForm">
						<p>This is a box! :)</p>
					</AdminBox>
				</div>
			</div>
		</div>
	}
}

TplUsabrokerForm = lxbroker(TplUsabrokerForm)

export default TplUsabrokerForm

