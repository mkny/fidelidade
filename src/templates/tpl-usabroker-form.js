import React from 'react'
import _ from 'lodash'

import { useBroker } from './../ducks/linx/lxbroker2/LxBroker'

import AdminBox from './layout/admin-box'

import LxForm from './../components/lxform'

const renderField = (fields) => {
	let field;
	const { info } = fields
	const { props } = info

	field = <div className="form-group">
		<label htmlFor={info.name}>{info.name}</label>
		<input
			className="form-control"
			{...fields.input}

			{...props}
			/>
	</div>

	return field
}

class TplUsabrokerForm extends React.Component {
	constructor(props){
		super(props)
		
		const { create } = _.at(this.props, 'route.config.actions')[0]
		const { form } = _.at(this.props, 'route.config')[0]

		this.state = {
			create,
			form,
		}
	}

	componentWillMount(){
		// Everyday i'm brok'n
		// this.props._lxbroker.create()
		// const { method, module } = this.state.create;
		
		// # randevous
		// const { form } = _.at(this.props, 'route.config')[0]

		this.props._lxbroker.doSwagger(this.state.create).then(sw => {
			// const fnc = sw.apis[module][method]
			let fields = sw.spec.definitions.Pet.properties;
			
			// Colocar o sort dos elementos ;)
			_.forEach(fields, (value, key) => {
				fields[key] = {
					...value,
					name: key,
					add: true,
					edit: true,
				}
			})

			fields = _.merge({}, fields, this.state.form.fields);

			const newState = _.merge({}, this.state, {form: { fields }})

			this.setState(newState);
		})
	}



	render(){
		
		return <div className="content">
			<div className="row">
				<div className="col-md-12">
					<AdminBox header="LxForm">
						<LxForm
							type="add"
							templateField={renderField}

							{...this.state.form}

							/>
					</AdminBox>
				</div>
			</div>
		</div>
	}
}

TplUsabrokerForm = useBroker(TplUsabrokerForm)

export default TplUsabrokerForm
