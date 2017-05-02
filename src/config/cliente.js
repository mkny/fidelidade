module.exports = {
	page: {
		title: 'Clientes'
	},
	actions: {
		create: '',
		read: {
			module: 'clientes',
			action: 'findPaginatedUsingGET_1',
			limit: 5,
			// order: '+nomeSistemaERP',
			// url: 'http://projetos.net4bizidc.com.br:8080/managerCard/api/v1/clientes',
		},
		update: '',
		delete: '',
	},
	datagrid: {
		datasource: [],
		pagination: {},
		headers: [{
			field: 'idCliente',
			sortable: true,
			trans: '#'
		}, {
			field: 'pessoa',
			sortable: true,
			trans: 'Nome',
			format: '%(contents.nomePessoa)s',
		}, {
			field: 'pessoa',
			sortable: true,
			trans: 'CNPJ',
			format: '%(contents.numCnpjCpf)s',
		}, {
			//   field: "desNomeServidor",
			//   sortable: true,
			//   trans: 'Server'
			// },{
			//   field: "nomeBanco",
			//   sortable: true,
			// },{
			//   field: "prefixoCartao",
			//   sortable: true,
			// },{
			//   field: "sistemaErp",
			//   sortable: true,
			//   format: "%(contents.nomeSistemaERP)s",
			// },{
			// field: 'produtos',
			// },{
			field: 'actions'
		}],
		buttons: [{
			name: 'edit',
			className: 'btn btn-info',
			action: '/edit?id=%s',
			icon: 'fa-pencil-square-o',
			// trans: 'Editar',
		}, {
			name: 'delete',
			className: 'btn btn-danger',
			action: '/remove?id=%s',
			icon: 'fa-ban',
			// trans: 'Excluir',
		}]
	},
	// form: {
	//   fields: [{
	//     idCliente: {
	//       add: true,
	//     }
	//   }],
	// },

};