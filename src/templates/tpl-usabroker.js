import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import {Link} from 'react-router'




import LxTable from 'react-lx-table'

import { lxbroker } from './../ducks/linx/lxbroker2/LxBroker'

import AdminBox from './layout/admin-box'

class Index extends React.Component {
	constructor(props){
		super(props);

		const { read } = _.at(props, 'route.config.actions')[0];

		this.state = {
			read,
			table: {
				datasource: []
			}
		}

		this.handleClickPage = this.handleClickPage.bind(this);
		this.handleClickOrder = this.handleClickOrder.bind(this);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.table){
			this.setState({table: nextProps.table})
		}
	}

	componentWillMount(){
		this.reload()
	}

	handleClickPage(number){
		_.update(this.state, 'read.params.page', o => number-1)

		this.reload()
	}

	handleClickOrder(elmt, card){
		const field = `${elmt},${card}`;

		_.update(this.state, 'read.params.sort', o => field );

		// Ao ordenar, volta pro 0
		return this.handleClickPage(1);
	}

	reload(){
		const { read : { url, module, method, params } } = this.state;

		this.props._lxbroker.read({url, module, method}, params)
	}


	loading(){
		return <div className="overlay"><i className="fa fa-refresh fa-spin"></i></div>
	}

	render(){
		const props = this.props;
		const { table, table: { datasource } } = this.state;
		const { location: { pathname }, status } = props

		const head = <div>
			<h4>Hello broker</h4>
			<div className="btn-group">
				<Link to={pathname+'/add'} className="btn btn-default">New</Link>
				<button className="btn btn-primary" type="button" onClick={() => this.reload()}>Refresh</button>
			</div>
		</div>
							
		return <section className="content">
			<div className="row">
				<div className="col-md-12">
					<AdminBox header={head} isLoading={status === 'waiting'} className="table-responsive">

						<p>There is {(table.pager && table.pager.totalRecords) || (datasource && datasource.length)} results ready to manipulate</p>

						<LxTable
							dynamic

							className="table table-stripped"
							classNamePager="pagination pagination-sm pull-right"

							datasource={datasource}

							{...table.pager}

							onClickPage={this.handleClickPage}
							onClickOrder={this.handleClickOrder}
							/>

						{status === 'nok' && <h4>An error was found!</h4>}
					</AdminBox>
				</div>
			</div>
		</section>
	}
}

Index = connect((state, ownProps) => {
	const { status, read } = {...state.broker,..._.at(ownProps, 'route.config.actions')[0]}
	
	let jsonReturn = {}
	
	if(read.normalize){
		jsonReturn = {
			status,
			...read.normalize(state, read)
		}
	}

	return jsonReturn;
})(Index)

Index = lxbroker(Index)

export default Index;


