module.exports = {
	page: {
		title: 'Sistemas'
	},
	actions: {
		create: '',
		read: {
			module: 'sistemas-erp-controller',
			action: 'findPaginatedOrderUsingGET_2',
			limit: 3,
			// order: '+nomeSistemaERP',
			// url: 'http://projetos.net4bizidc.com.br:8080/managerCard/api/v1/sistemas',
		},
		update: '',
		delete: '',
	},
	datagrid: {
		datasource: [],
		pagination: {

		},
		headers: [{
			field: 'codSistemaERP',
			trans: '#',
			sortable: true,
		}, {
			field: 'nomeSistemaERP',
			trans: 'Nome',
			sortable: true,
		}, {
			field: 'urlWebServiceERP',
			trans: 'URL WS',
			sortable: true,
		}, {
			field: 'nomeInterfaceERP',
			trans: 'Interface ERP',
			sortable: true,
		}, {
			field: 'actions',
			trans: 'Ações',
		}],
		buttons: [{
			name: 'edit',
			trans: 'Editar',
			action: '/edit?id=%s'
		}, {
			name: 'delete',
			trans: 'Excluir',
			action: '/remove?id=%s'
		}]
	}
};