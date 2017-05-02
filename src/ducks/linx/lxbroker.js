// Quack! This is a duck. https://github.com/erikras/ducks-modular-redux
import axios from 'axios'
import swagger from 'swagger-client'

// axios const's
const BROKE_AXIOS =			'@@broker/axios/REQUEST'
const BROKE_AXIOS_W8 =		'@@broker/axios/REQUEST_PENDING'
const BROKE_AXIOS_NO =		'@@broker/axios/REQUEST_REJECTED'
const BROKE_AXIOS_OK =		'@@broker/axios/REQUEST_FULFILLED'

// swagger const's
const BROKE_SWAGGER =		'@@broker/swagger/REQUEST'
const BROKE_SWAGGER_W8 =	'@@broker/swagger/REQUEST_PENDING'
const BROKE_SWAGGER_NO =	'@@broker/swagger/REQUEST_REJECTED'
const BROKE_SWAGGER_OK =	'@@broker/swagger/REQUEST_FULFILLED'

/**
 * The swaggify
 * @param  {string} url   Url para buscar o swagger.json
 * @param  {object} spec) swagger.json em arquivo local
 * @return {void}
 */
const doSwag = (url, spec) => (cb) => {
	let config = {};

	if(url){
		config['url'] = url;
	} else {
		config['spec'] = spec;
	}

	swagger(config).then(jx => {
		cb(jx);
	})
}

/**
 * The Broker
 * @param  {object} {}) Heranca do call
 * @return {void}
 */
export const broke = (method, { url, module, action, params }) => (dsp) => {
	// Falta implementar { limit, offset, order e parametros }
	// 
	if(url && !(action && module)){
		console.info('---- Shooting axios ----')

		// Efetua o dispatch pro axios
		dsp({
			type: BROKE_AXIOS,
			payload: axios[method](url, {params})
		})
	} else if(module && action) {
		console.info('---- Shooting swagger ----')
		let swaggerJson;
		const swaggerUrl = url;

		// Verifica se existe o swagger.json no diretorio de configuracoes
		if(require.context('./../../config', false, /swagger.json/).keys()[0]){
			swaggerJson = require('./../../config/swagger.json');
		}

		// Faz o call do swagger
		doSwag(swaggerUrl, swaggerJson)(api => {
			// console.log(api)
			
			// window.aa = api.apis.pet;
			// console.log('window.aa')

			// Efetua o dispatch do swagger
			dsp({
				type: BROKE_SWAGGER,
				payload: api.apis[module][action](params)
			})
		})
	} else {
		console.info('---- Shooting nothing ----')
	}
}

/**
 * Reducer ;)
 * @param  {object} state  State 
 * @param  {object} action Action
 * @return {object}        Reducing object
 */
const reducer = (state, action) => {
	switch(action.type){
		case BROKE_AXIOS_W8:
		case BROKE_SWAGGER_W8:
			return { status: 'waiting' }
		case BROKE_AXIOS_OK:
			return { status: 'ok', data: action.payload.data }
		case BROKE_AXIOS_NO:
			return { status: 'nok' }
		case BROKE_SWAGGER_OK:
			return { status: 'ok', data: action.payload.obj }
		case BROKE_SWAGGER_NO:
			return { status: 'nok' }
		default:
			return {...state}
	}
}

export default reducer;