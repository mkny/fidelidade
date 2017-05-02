import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import _ from 'lodash'

// import LxTable from './../components/lxtable'
// import LxTable from '/node_modules/react-lx-table'
// const LxTable = require('react-lx-table')
import LxTable from 'react-lx-table'

import { broke } from './../ducks/linx/lxbroker'

class Index extends React.Component {
	constructor(props) {
		super(props);



		this.state = {
			cfg: {},
			table: {...props.table},
			pager: {...props.pager},
			isLoading: props.isLoading
		}

		// this.handleGetResults = this.handleGetResults.bind(this);
		// this.handleChangePage = this.handleChangePage.bind(this);
		// this.handleChangeOrder = this.handleChangeOrder.bind(this);
		// this.handleChangeLimit = this.handleChangeLimit.bind(this);
	}

	componentDidUpdate(){
		if(!_.isEqual(this.props.route.config, this.state.cfg)){
			this.load();
		}
	}

	componentWillMount(){
		this.load();
	}

	load(){
		this.setState({
			cfg: this.props.route.config,
			isLoading: true
		});

		this.handleGetResults();
	}

	handleGetResults () {
		const { read } = _.at(this.props, 'route.config.actions')[0];
		// const { url, limit, module, action, order, offset } = read;
		
		this.props.dispatch(broke('get', read));
		

		// if(module){
		// 	this.props.dispatch(swaggerGet(module, action, {limit: limit||10, offset: offset||0, order: order||''}));
		// } else if(url){
		// 	this.props.dispatch(broke(read))
		// 	// console.log(this.props)
		// 	// this.props.dispatch({
		// 	// 	type: '@@broke/axios/GET',
		// 	// 	payload: axios.get(url)
		// 	// })
		// } else {
		// 	throw Error('Not found nothing')
		// }

	}

	// handleChangeLimit(limiter){
	// 	let limit = limiter.target.value || 5;

	// 	this.setState(_.update({...this.state}, 'cfg.actions.read.limit', () => limit));
	// 	this.setState(_.update({...this.state}, 'pager.totalRecordsPerPage', () => limit));
	// 	this.setState(_.update({...this.state}, 'cfg.actions.read.offset', () => 0));

	// 	// this.handleGetResults();
	// }

	// handleChangePage(pageNumber){
	// 	this.setState(_.update({...this.state}, 'cfg.actions.read.offset', () => pageNumber-1));
	// 	this.handleGetResults();
	// }

	// handleChangeOrder(field, card){
	// 	this.setState(_.update({...this.state}, 'cfg.actions.read.order', () => (card === 'asc'?'+':'-')+field));
	// 	this.handleGetResults();
	// }

	handleActionDispatcher() {
		// wtf
	}

	loading(){
		return <div className="overlay"><i className="fa fa-refresh fa-spin"></i></div>
	}

	render(){
		// Pager vars
		const { totalRecords, totalRecordsPerPage, currentPage, totalPages } = _.at(this.props, 'pager')[0] || {};

		// Location
		const { pathname } = this.props.location;

		// DS
		const datasource = _.at(this.props,'table.datasource')[0] || [];

		// Loader
		const { isLoading } = this.props;

		const { page, datagrid } = this.state.cfg;

		const pager = {...this.props.pager, ...this.state.pager};

		return <section className="content">
			<div className="row">
				<div className="col-md-12">
					<div className="box">
						<div className="box-header">
							<h4>{page.title}</h4>
						</div>

						<div className="box-body table-responsive">
							<div className="row">
								<div className="col-md-12">
									<div className="btn-group">
										<Link className="btn btn-default" to={`${pathname}/add`}>
											<i className="fa fa-file"></i> New
										</Link>
										<button className="btn btn-info" onClick={this.handleGetResults}>Find</button>
									</div>
								</div>
							</div>
							{datasource.length > 0 && 
								<div className="row">
									<div className="col-md-12">
											<LxTable
												// dynamic
												className="table table-stripped"
												datasource={datasource}
												
												{...pager}
												
												headers={datagrid.headers}
												buttons={datagrid.buttons}
												
												// onChangeLimit={this.handleChangeLimit}
												// onClickPage={this.handleChangePage}
												// onClickOrder={this.handleChangeOrder}
												
											/>
											<p><strong>{currentPage} of {totalPages} ({datasource.length}/{totalRecords}) {totalRecordsPerPage}/page</strong></p>
									</div>
								</div>
							}
						</div>
						<div className="box-footer"></div>
						{isLoading && this.loading()}
					</div>
				</div>
			</div>
		</section>
	}
}

Index = connect((state, props) => {
	let { read } = props.route.config.actions;
	// console.log(check++, read.normalize)

	if(read.normalize){
		return read.normalize(state, read);
	}

	console.log('Missing data? Missing normalize() too.')
	return {}
})(Index);

export default (Index);


