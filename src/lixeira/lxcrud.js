import React, { Component } from 'react';
import _ from 'lodash';

import { Link } from 'react-router';

import { connect } from 'react-redux';

import actions from './../actions/crudActions'

import LxTable from '../components/lxtable2';

@connect((store, st) => {
	// create,
	// read,
	// update,
	// delete,
	
	let reducer = 'crud';
	if(st.route.reducer){
		reducer = st.route.reducer;
	}

	let ns = _.merge({}, st, {route: {config: {datagrid: store[reducer].read}}})

	return {lx: ns.route.config};
})
class LxCrud extends Component {
	constructor(props){
		super(props);

		const { url, limit, order } = props.lx.page.read;

		this.state = {
			_methods: this.props.lx.actions || actions,
			page: 1,
			url: url,
			limit: limit,
			order: order,
			isLoading: props.lx.datagrid.isLoading
		}


	}

	initialize(){
		const { _methods, url, limit, order, page } = this.state;
		this.props.dispatch(_methods.read(url, page, limit, order));
	}

	componentWIllReceiveProps(){
		console.log('updating...')
	}

	componentDidMount(){
		this.initialize();

	}

	handleClickPage(page){
		const { _methods, url, limit, order } = this.state;

		this.props.dispatch(_methods.read(url, page, limit, order));
	}

	handleClickOrder(field,card){
		const { _methods, url, limit } = this.state;
		const order = (card === 'asc'?'+':'-')+field;

		this.props.dispatch(_methods.read(url, 1, limit, order));
		this.setState({order: order});
	}



    loading(){
		const { isLoading } = this.props.lx.datagrid;

		if(!isLoading){
			return null;
		}

		return <div className="overlay">
			<i className="fa fa-refresh fa-spin"></i>
		</div>
    }

	render(){
		// props.location.pathname;
		const { page, datagrid } = this.props.lx;
		const { headers, datasource, buttons, pagination } = datagrid;
		const { title } = page;
		const { pathname } = this.props.location;

		
		return(
			<section className="content">
				<div className="row">
					<div className="col-md-12">
						<div className="box">
							<div className="box-header">
								<h3 className="box-title">{ title }</h3>
							</div>
							<div className="box-body table-responsive">
								<div className="btn-group">
									<Link className="btn btn-default" to={`${pathname}/add`}>
										<i className="fa fa-file"></i> Novo
									</Link>
								</div>
								<LxTable
									// fixed
									className="table table-hover"
									onClickPage={this.handleClickPage.bind(this)}
									onClickOrder={this.handleClickOrder.bind(this)}
									emptyText="Nada a exibir"
									// {...datagrid}
									buttons={buttons}
									datasource={datasource}

									headers={headers}
									pagination={{...pagination, totalItemCountPerPage: 10 }}
									/>
							</div>

						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default LxCrud;