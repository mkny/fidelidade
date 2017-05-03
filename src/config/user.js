module.exports = {
	page: {
		title: 'Usuários'
	},
	actions: {
		create: '',
		read: {
			normalize: (state, config) => {
				// console.log('lyali')
				
				const { limit } = config;
				const { data } = state.broker;

				if(!data || !data.results) {
					return {}
				}


				return {
					// isLoading: isLoading,
					table: { datasource : data.results },
					pager: {
						// currentPage: data.info.page,
						totalRecords: data.info.results,
						totalRecordsPerPage: limit,
						totalRecordsInPage: data.results.length,
						totalPages: Math.ceil(data.info.results / limit),
					}
				}
			},
			// module: 'sistemas-erp-controller',
			// action: 'findPaginatedOrderUsingGET_2',
			// order: '+nomeSistemaERP',
			limit: 12,
			url: 'https://randomuser.me/api/?seed=linxcard',
			// limit: {
			// 	key: 'results',
			// 	value: 30
			// },
			params: {
				results: 300
			}
		},
		update: '',
		delete: '',
	},
	datagrid: {
		headers: [{
			field: 'nat',
			width: '10%',
		},{
			field: 'email',
			width: '60%',
		},{
			field: 'name',
			format: '%(contents.title)s. %(contents.last)s, %(contents.first)s ',
			width: '30%',
		}]
	},
	form: {
		
	}
};