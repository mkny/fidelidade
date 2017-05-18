import React from 'react'
import _ from 'lodash'

import { useBroker } from './../ducks/linx/lxbroker2/LxBroker'

import AdminBox from './layout/admin-box'

// import LxForm from './../components/lxform'
import { withForm, LxForm } from './../components/lxform2'

// const formatter = ( input, extra, props ) => {
// 	console.log('tpl', {input, extra, props})

// }

class TplUsabrokerForm extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			form: null
		}
	}

	componentWillMount(){
		const { create } = _.at(this.props, 'route.config.actions')[0];
		const { form } = _.at(this.props, 'route.config')[0];

		this.props._lxbroker.doSwagger(create).then(sw => {
			const { properties } = _.at(sw, 'spec.definitions.Pet')[0];
			const fields = _.merge(properties, form.fields);

			this.setState({form: {...form, fields}})
		})
	}

	render(){
		// console.log(this.state.form)
		return <div className="content">
			<div className="row">
				<div className="col-md-12">
					<AdminBox header="LxForm">
						<LxForm
							type="add"

							submitButtonClass="btn btn-success"
							defaultFieldClassName="form-control"
							defaultFieldLabel={true}

							{...this.state.form}

							// formatter={{field: formatter}}

							// fields={this.state.form && this.state.form.fields}
							
							// fields={[
							// 	'Nome','Sobrenome'
							// ]}

							// fields={{
							// 	username: {
							// 		label: 'Usuário'
							// 	},
							// 	password: {
							// 		label: 'Senha',
							// 		props: {
							// 			type: 'password'
							// 		}
							// 	},
							// }}

							/>
					</AdminBox>
				</div>
			</div>
		</div>
	}
}

TplUsabrokerForm = withForm(TplUsabrokerForm)

TplUsabrokerForm = useBroker(TplUsabrokerForm)

export default TplUsabrokerForm