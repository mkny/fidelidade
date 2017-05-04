import React from 'react';
import { Router, Route, IndexRoute, browserHistory as history, Redirect  } from 'react-router';

// # Templates
import App from './templates/App';
import Home from './templates/home';
//	// # Dynamic
// import LxCrud from './templates/lxcrud';
// import LxCrudForm from './templates/lxcrudform';

//	// # Dynamic
// # Templates


// import Teste from './actions-pre/test'

// Config Files (para a tela crud)
// # Configs
// import CfgSistema from './config/sistema'
// import CfgCliente from './config/cliente'
// import CfgProduto from './config/produto'
import CfgPets from './config/pets'
import CfgUser from './config/user'
// # Configs




import TplIndex from './templates/tpl-index'
import TplUsabroker from './templates/tpl-usabroker'
// import TplIndex from './templates/tpl-index'
import TplForm from './templates/tpl-form'

const Routes = <Router history={history}>
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		{/*<Route path="cliente">
					<IndexRoute component={TplIndex} config={CfgCliente} />
					<Route path="add" component={LxCrudForm} config={CfgCliente} />
				</Route>
				<Route path="sistema">
					<IndexRoute component={TplIndex} config={CfgSistema} />
					<Route path="add" component={TplForm} config={CfgSistema} />
				</Route>
				<Route path="produto">
					<IndexRoute component={TplIndex} config={CfgProduto} />
					<Route path="add" component={TplForm} config={CfgProduto} />
				</Route>*/}
		<Route path="broker">
			<IndexRoute component={TplUsabroker} config={CfgUser} />
		</Route>
		<Route path="pets">
			<IndexRoute component={TplIndex} config={CfgPets} />
			<Route path="add" component={TplForm} config={CfgPets} />
		</Route>
		<Route path="user">
			<IndexRoute component={TplIndex} config={CfgUser} />
		</Route>
		<Redirect from='*' to='/' />
	</Route>
</Router>

export default Routes;