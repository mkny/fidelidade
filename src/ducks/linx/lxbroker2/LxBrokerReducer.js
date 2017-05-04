import {
	// BROKE_AXIOS,
	BROKE_AXIOS_W8,
	BROKE_AXIOS_NO,
	BROKE_AXIOS_OK,
	// BROKE_SWAGGER,
	BROKE_SWAGGER_W8,
	BROKE_SWAGGER_NO,
	BROKE_SWAGGER_OK,
} from './LxBrokerActionTypes'
/**
 * Reducer ;)
 * 
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
	// return {...state}
}

export default reducer;