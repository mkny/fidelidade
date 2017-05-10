import axios from 'axios'
import swagger from 'swagger-client'

// Swagger implementation (check package.json later)
// import path from 'path'
// import isAbsoluteUrl from 'is-absolute-url'

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

export const doSwagger = (config={}) => {
	config.spec = config.url
	delete config.url
	// if(!config.url && !config.spec){
	// 	throw Error('No Specification found')
	// }

	swagger(config).then(sw => {
		console.log(sw)
		// cb(sw);
	})
}




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
 * @param  {object} pathProps     Configuracao de conexao com o servidor
 * @param  {string} pathProps.url     Url ou caminho local para o arquivo json (swagger) OU Url do webservice (axios)
 * @param  {string} pathProps.module     Modulo a ser tratado (swagger)
 * @param  {string} pathProps.method     Acao dentro do modulo (swagger)
 * @param  {object} requestParams Parametros do request
 * @param  {object} config        Configuracoes que sao repassadas para os motores
 * @return {void}               Dispara para o Redux
 */
export const read = (pathProps, requestParams, config={}) => dsp => {
	let { url } = pathProps;
	const { module, method } = pathProps;

	if(typeof pathProps === 'string'){
		url = pathProps;
	}
	
	if(module && method){
		// use swagger

		config[(typeof url === 'string') ? 'url':'spec'] = url;
		
		swagger(config).then(sw => {
			try {
				dsp({
					type: BROKE_SWAGGER,
					payload: sw.apis[module][method](requestParams)
				})
			} catch(e) {
				console.log(sw.apis, e)
			}
		})

		
	} else {
		// use axios
		config['params'] = requestParams

		// brok'ng
		dsp({
			type: BROKE_AXIOS,
			payload: axios.get(url, config)
		})
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
