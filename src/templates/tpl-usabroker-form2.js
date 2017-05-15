import React from 'react'
import _ from 'lodash'

import { useBroker } from './../ducks/linx/lxbroker2/LxBroker'

import AdminBox from './layout/admin-box'

// import LxForm from './../components/lxform'
import { withForm, FormBuilder } from './../components/lxform2'

const formatter = (data) => {
	const props = {...data.input, ...data.props}

	// console.log(props)

	const inp = <input
		id={data.input.id || data.input.name}
		type="text"
		{...props}

		/>
	
	if( props.type === 'hidden' ){
		return inp;
	}

	return <div className="form-group">
		{data.label && <label htmlFor={data.input.name}>{data.label}</label>}
		{inp}
	</div>
}



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

			this.setState({
				form: {
					...form,
					fields: _.merge(properties, form.fields)
				}
			})
		})
	}

	render(){
		console.log('building..')
		return <div className="content">
			<div className="row">
				<div className="col-md-12">
					<AdminBox header="LxForm">
						<FormBuilder
							type="add"

							// format={formatter}
							format={{fields: formatter}}
							formdata={this.state.form}
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
