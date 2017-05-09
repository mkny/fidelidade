module.exports = {
	page: {

	},
	defaults: {
		url: 'pathtojson',
	},
	actions: {
		create: '',
		read: {
			url : '',
			module : '',
			method : '',
		},
		update: '',
		del: '',
	},
	datagrid: {
		datasource: [],
		pagination: {},
		headers: [
			// {field: 'field_name', trans: 'Transalation', sortable: false, format: '%(contents.nomePessoa)s'}
		],
		buttons: [
			// {name: 'edit',className: 'btn btn-info',action: '/edit?id=%s',icon: 'fa-pencil-square-o',// trans: 'Editar',}
		]
	}

}
