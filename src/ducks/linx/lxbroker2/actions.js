import axios from 'axios'
// import swagger from 'swagger-client'
// The CRUD
import {
	BROKE_AXIOS,
	// BROKE_AXIOS_W8,
	// BROKE_AXIOS_NO,
	// BROKE_AXIOS_OK,
	BROKE_SWAGGER,
	// BROKE_SWAGGER_W8,
	// BROKE_SWAGGER_NO,
	// BROKE_SWAGGER_OK,
} from './actionTypes'

/**
 * Metodo para fazer o create
 * 
 * @return {void}
 */
export const create = () => {
	console.log('create');
}

/**
 * Metodo para fazer o read
 * 
 * @return {void}
 */
export const read = (pathProps, requestParams, config={}) => {
	let { url, module, method } = pathProps;

	if(typeof pathProps === 'string'){
		url = pathProps;
	}
	
	if(module && method){
		// use swagger
		
		return { type: BROKE_SWAGGER }
	} else {
		// use axios
		config['params'] = requestParams

		// brok'ng
		return {
			type: BROKE_AXIOS,
			payload: axios.get(url, config)
		}
	}
}

/**
 * Metodo para fazer o update
 * 
 * @return {void}
 */
export const update = () => {
	console.log('update');
}

/**
 * Metodo para fazer o delete
 * 
 * @return {void}
 */
export const del = () => {
	console.log('del');
}
