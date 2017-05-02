// Redux-ize
import { applyMiddleware, createStore } from 'redux'

// Middlewares
import { createLogger as logger } from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

// Import reducers
import reducer from './reducers'

const middleware = applyMiddleware(
	promise(),
	thunk,
	logger()
	);

export default createStore(reducer, middleware);