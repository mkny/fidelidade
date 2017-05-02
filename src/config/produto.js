module.exports = {
	page: {
		title: 'Produto'
	},
	actions: {
		create: '',
		read: {
			module: 'produtos',
			action: 'findPaginatedOrderUsingGET_1',
			limit: 2,
			// order: '',
			// url: 'http://projetos.net4bizidc.com.br:8080/managerCard/api/v1/produtos',
		},
		update: '',
		delete: '',
	},
	datagrid: {
		datasource: [],
		pagination: {},
		headers: [{
			field: 'idProduto',
			trans: '#',
		}, {
			field: 'nomeProduto',
			trans: 'Nome',
		}, {
			field: 'modulos',
			trans: 'Módulos',
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