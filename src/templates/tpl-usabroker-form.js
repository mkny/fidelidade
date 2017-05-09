import React from 'react'

import { lxbroker } from './../ducks/linx/lxbroker2/LxBroker'

import AdminBox from './layout/admin-box'

class TplUsabrokerForm extends React.Component {
	componentWillMount(){
		const { _lxbroker } = this.props
		

		_lxbroker.create()

		// const a = this.props.route.config
		// console.log(_lxbroker)
	}

	render(){
		return <div className="content">
			<div className="row">
				<div className="col-md-12">
					<AdminBox>
						This is a box! :)
					</AdminBox>
				</div>
			</div>
		</div>
	}
}

TplUsabrokerForm = lxbroker(TplUsabrokerForm)

export default TplUsabrokerForm

