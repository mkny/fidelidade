import React from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import _ from 'lodash'
// import LxTable from '/node_modules/react-lx-table'

import { lxbroker } from './../ducks/linx/lxbroker2/LxBroker'

class Index extends React.Component {
	componentWillMount(){
		const { _lxbroker } = this.props;
		const url = 'https://randomuser.me/api';
		const params = {
			results: 3,
			seed: 'linxcard',
			page: 1
		};

		_lxbroker.read({url},params)
	}


	loading(){
		return <div className="overlay"><i className="fa fa-refresh fa-spin"></i></div>
	}

	render(){
		const props = this.props;
		// console.log(props)

		return <section className="content">
			<div className="row">
				<div className="col-md-12">
					<div className="box">
						<div className="box-header">
							<h4>Hello broker</h4>
						</div>

						<div className="box-body table-responsive">
							<p>Hi ;) - is loading? ({ props.loading ? 'yes':'no' })</p>
							{props.table && <p>There is {props.table.datasource.length} results ready to manipulate</p>}
						</div>
						<div className="box-footer"></div>
						{props.loading && this.loading()}
					</div>
				</div>
			</div>
		</section>
	}
}

Index = connect((state, ownProps) => {
	const { status } = state.broker;//data
	const { read } = _.at(ownProps, 'route.config.actions')[0];

	if(read.normalize){
		return {
			loading: status !== 'ok',
			...read.normalize(state, read)
		}
	}

	return {}
})(Index)

Index = lxbroker(Index)

export default Index;
