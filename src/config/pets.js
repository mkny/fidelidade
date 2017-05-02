import _ from 'lodash'

// const ds = (a) => {
// 	console.log(a)
// }

const config = {
	page: {
		title: 'Pets'
	},
	actions: {
		create: '',
		read: {
			module: 'pet',
			action: 'findPetsByStatus',
			limit: 10,
			// order: '+nomeSistemaERP',
			url: 'http://petstore.swagger.io/v2/swagger.json',
			params: {
				status: 'sold'
			},
			normalize: (state, config) => {
				// console.log('shapan')
				
				const { limit } = config;
				const { data } = state.broker;

				if(!data) {
					return {}
				}
				
				return {
					// isLoading: isLoading,
					table: { datasource : data },
					pager: {
						currentPage: 1,
						totalRecords: data.length,
						totalRecordsPerPage: limit,
						totalRecordsPage: data.length,
						totalPages: Math.ceil(data.length / limit),
					}
				}
			}
		},
		update: '',
		del: {
			url: 'http://petstore.swagger.io/v2/swagger.json',
			module: 'pet',
			action: 'deletePet',
		},
	},
	datagrid: {
		datasource: [],
		pagination: {},
		headers: [{
			field: 'id',
			width: '10%'
		},{
			field: 'name',
			width: '60%'
		},{
			field: 'status',
			width: '10%'
		},{
			field: 'actions',
			width: '20%'
		}],
		buttons: [{
			name: 'edit',
			className: 'btn btn-info btn-sm',
			action: '/edit?id=%s',
			icon: 'fa-pencil-square-o',
		}, {
			name: 'delete',
			className: 'btn btn-danger btn-sm',
			action: id => {
				
				// const { del } = config.actions;
				// const { broke } = require('./../ducks/linx/lxbroker')
				
				// _.update(del, 'params.petId', () => id)

				// let a = broke('delete', del)
				// console.log(a(ds))

			},
			icon: 'fa-ban',
		}]
	},
};

module.exports = config;