// import json from './../config/swagger.json'
import _ from 'lodash'

const LOAD = 'fidelidade/swagger/LOAD';

// console.log(json.paths['/api/v1/sistemas'].post.parameters[0].schema['$ref'])
// console.log(json.definitions.SistemaERP.properties) key => type
// 

let json;

const method = (tag) => {
	let a = json.paths;
	console.log(a);
}

const fields = (path, method) => {
	const params = json.paths[path][method].parameters;

	return (params.map(def => defs(def.schema['$ref'])))[0];
}

const defs = (defSpec) => {
	defSpec = defSpec.replace('#/definitions/', '')

	const spec = json.definitions[defSpec].properties;

	return _.keys(spec).map((item) => {
		return { key: item, type: spec[item].type }
	})
}

const apidata = {}



const LxSwagger = (config, callback) => {
	json = config.file;//require(file);
	// json.definitions;
	// const a = fields('/api/v1/sistemas', 'post');
	// console.log(a)
	// console.log(json)
	method('sistemas');
	// console.log(json)

	// callback(apidata);

}


const reducer = (state = {}, action) => {
	switch (action.type) {
		case LOAD:
			console.log('herewego')
			return {
				data: 'xabanaia'
			}
		default:
			return {...state}
	}
}

// Action Creators
export const load = data => ({ type: LOAD, data })

export default reducer