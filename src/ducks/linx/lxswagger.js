// Quack! This is a duck. https://github.com/erikras/ducks-modular-redux
import Swagger from 'swagger-client'
import _ from 'lodash'

import json from './../../config/swagger.json'
// const url = 'http://petstore.swagger.io/v2/swagger.json';
// const url = 'http://projetos.net4bizidc.com.br:8080/managerCard/v2/api-docs';

const GET = 'swagger/GET';
const GET_PENDING = 'swagger/GET_PENDING';
const GET_FULFILLED = 'swagger/GET_FULFILLED';

export const swag = callback => {

	Swagger({
		// url
		spec: json
	}).then((jx) => {
		return callback(jx.apis);
	})
}

export const config = callback => {
	Swagger({
		// url
		spec: json
	}).then(obj => {
		callback(obj);
	})
}

export const get = (module, method, opts) => (dsp) => {
	opts = _.mapValues(opts, (o) => {
		return o.toString()
	});
	
	if(!module || !method){
		throw Error(`Campo vazio ${module} or ${method}`)
	}


	swag((api) => {
		try {
			dsp({
				type: GET,
				payload: api[module][method](opts)
			});
		} catch (e){
			console.warn('Something went wrong: ', api, module, method, opts, e);
		}
		
	});
	
}

const reducer = (state, action) => {
	switch(action.type) {
		case GET_FULFILLED: {
			const { obj } = action.payload;
			return {...state, isLoading: false, data: obj}
		}
		case GET_PENDING:{
			return {...state, isLoading: true}
		}
		default:
			return {...state}
	}
}

export default reducer;