// React-ize
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { Provider } from 'react-redux';

// Redux-Store configs
import store from './store'

// System routes
import Routes from './routes'

// Final invoke
ReactDOM.render(
	<Provider store={store}>
		{Routes}
	</Provider>,
  document.getElementById('root')
);

/**
 * Pros decorators funcionarem, necessario colocar em
 *
 * \node_modules\react-scripts\config\webpack.config.dev.js
 * 
	module.loaders[loader: 'babel'].query.plugins: ['transform-decorators-legacy']
 */