import React from 'react'
// import PropTypes from 'prop-types'
// import PropTypes from 'prop-types'
// import { Link } from 'react-router'
// import { connect } from 'react-redux'
import _ from 'lodash'

// import LxTable from './../components/lxtable'
// import LxTable from '/node_modules/react-lx-table'
// const LxTable = require('react-lx-table')
// import LxTable from 'react-lx-table'

import { broker } from './../ducks/linx/lxbroker2/LxBroker'

class Index extends React.Component {
	render(){
		// console.log(this.context)
		const { _lxbroker } = this.props
		_lxbroker.post()
		_lxbroker.get()

		return <section className="content">
			<div className="row">
				<div className="col-md-12">
					<div className="box">
						<div className="box-header">
							<h4>Hello broker</h4>
						</div>

						<div className="box-body table-responsive">
							<p>Hi ;)</p>
						</div>
						<div className="box-footer"></div>
					</div>
				</div>
			</div>
		</section>
	}
}

// Index = connect((state, props) => {
// 	let { read } = props.route.config.actions;
	

// 	if(read.normalize){
// 		return read.normalize(state, read);
// 	}

// 	console.log('Missing data? Missing normalize() too.')
// 	return {}
// })(Index);

// export default broker('xanaina')(Index);
export default broker()(Index);


