/**
 * Aqui vou colocar os reducers de componentes (de pacotes)
 */
import { combineReducers } from 'redux'

// Components begin

// Redux Form
import { reducer as form } from 'redux-form'

// Ducks
import * as ducks from './../ducks'

// Components end


export default combineReducers({
	...ducks,
	form
});


