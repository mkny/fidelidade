import React from 'react'

import Table from './../components/lxtable'

import { connect } from 'react-redux'
import { Link } from 'react-router'

import _ from 'lodash'
import $ from 'jquery'



@connect(() => {
	return {}
})
class Index extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			cfg: {},
			table: {
				datasource: []
			},
			pager: {},
			isLoading: false
		}

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
			// ...this.state,
			cfg: this.props.route.config,
			isLoading: true
		});

		// $.getJSON('https://randomuser.me/api/?results='+total+'&seed=linxcard', (d) => {
		// 	this.setState({...this.state, table: { datasource : d.results }, isLoading: false})
		// })
		// console.log()
		this.getResults();
	}

	getResults(page=1){

		const { read } = this.props.route.config.page;
		// const { order } = this.state.cfg.page.read;
		
		const cfg = read;//_.at(this.state, 'cfg.page.read')[0] || 
		const {totalRecordsPerPage, order, url} = cfg;

		let config = {};
		config['limit'] = 3;
		config['order'] = order;
		config['totalRecordsPerPage'] = totalRecordsPerPage;
		config['offset'] = page-1 < 0? 0:page-1;

		$.getJSON(url, config, (d) => {
			this.setState({
				...this.state,
				table: { datasource : d.content },
				pager: {
					currentPage: d.number+1,
					totalRecords: d.totalElements,
					totalRecordsPerPage: d.size,
					totalRecordsPage: d.numberOfElements,
					totalPages: Math.ceil(d.totalElements / d.size),
				},
				isLoading: false
			});
		})
	}

	handleClickPage(pageNumber){
		const newState = _.assign({}, this.state);
		const order = _.at(newState, 'cfg.page.read.order');

		_.update(newState, 'cfg.page.read.page', () => {
			return pageNumber;
		});

		this.setState(newState);

		this.getResults(pageNumber, order);
	}

	handleClickOrder(field, card) {
		const order = (card === 'asc'?'+':'-')+field


		const newState = _.assign({}, this.state);
		const page = _.at(newState, 'cfg.page.read.page');

		_.update(newState, 'cfg.page.read.order', () => {
			return order;
		});

		this.setState(newState);

		this.getResults(page, order);
	}

	loading(){
		return <div className="overlay"><i className="fa fa-refresh fa-spin"></i></div>
	}

	render(){
		const { isLoading, table, pager, cfg } = this.state;
		const { currentPage, totalRecordsPerPage, totalRecords, totalPages } = pager;
		const { datasource } = table;
		const { pathname } = this.props.location;
		
		return <section className="content">
			<div className="row">
				<div className="col-md-12">
					<div className="box">
						<div className="box-header">
							<h4>{cfg.page.title}</h4>
						</div>
						<div className="box-body table-responsive">
							<div className="btn-group">
								<Link className="btn btn-default" to={`${pathname}/add`}>
									<i className="fa fa-file"></i> Novo
								</Link>
							</div>

							<p><strong>{totalRecords} registers</strong></p>
							<p><strong>{datasource.length} registers in this page</strong></p>
							<p><strong>{totalRecordsPerPage} registers per page</strong></p>
							<p><strong>{currentPage} of {totalPages}</strong></p>
							<Table
								dynamic
								
								className="table table-stripped"

								// pager={pager}

								currentPage={currentPage}
								totalRecordsPerPage={totalRecordsPerPage}
								totalRecords={totalRecords}
								totalPages={totalPages}

								datasource={datasource}
								onClickOrder={this.handleClickOrder.bind(this)}
								onClickPage={this.handleClickPage.bind(this)}

								headers={cfg.datagrid.headers}
								buttons={cfg.datagrid.buttons}
								/>
						</div>
						{isLoading && this.loading()}
						<div className="box-footer"></div>
					</div>
				</div>
			</div>
		</section>
	}
}



export default Index;