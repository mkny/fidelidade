// import json from './'
// const json = 'http://projetos.net4bizidc.com.br:8080/hello/v2/api-docs';
const json = require('./swagger-ita.json');// (fidelidade)


module.exports = {
	page: {

	},
	defaults: {
		url: 'pathtojson',
	},
	actions: {
		create: {
			url: json,
			module: 'pet-controller',
			method: 'saveUsingPOST_1',
		},
		read: {
			url : json,
			module : 'pet-controller',
			method : 'listUsingGET_1',
			params: {
				size: 10,
				// size: 100,
			},
			normalize: (state, config) => {
				const { data } = state.broker;

				if(!data) {
					return {}
				}

				return {
					table: {
						datasource : data.content,
						pager: {
							currentPage: data.number+1,
							totalRecords: data.totalElements,
							totalRecordsPerPage: data.size,
							totalRecordsInPage: data.numberOfElements,
							totalPages: Math.ceil(data.totalElements / data.size),
						}
					}
				}
			}
		},
		update: '',
		del: '',
	},
	form: {
		submitButton: true,
		submitButtonText: "Salvar",
		resetButton: false,
		resetButtonText: "Limpar",
		defaultFieldLabel: false,
		defaultFieldClassName: 'form-control',

		fields: {
			id: {
				// label: '#',
				props: {
					type: 'hidden',
					placeholder: '#id',
				}
			},
			nome: {
				label: 'Nome',
				props: {
					placeholder: 'Nomes',
				}
			},
			tag: {
				add: false,
				edit: false,
				label: 'Tags',
				props: {
					placeholder: 'Tags',
				}
			}
		}
	},
	// form: [{
	// 	field: 'tag',
	// 	add: true,
	// 	edit: false,
	// }],
	// datagrid: {
	// 	datasource: [],
	// 	pagination: {},
	// 	headers: [
	// 		// {field: 'field_name', trans: 'Transalation', sortable: false, format: '%(contents.nomePessoa)s'}
	// 	],
	// 	buttons: [
	// 		// {name: 'edit',className: 'btn btn-info',action: '/edit?id=%s',icon: 'fa-pencil-square-o',// trans: 'Editar',}
	// 	]
	// }

}


// first
// last
// number
// numberOfElements
// size
// sort
// totalElements
// totalPages