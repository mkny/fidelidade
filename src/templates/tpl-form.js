import React, { Component } from 'react'
import { connect } from 'react-redux'

import { reduxForm, Field } from 'redux-form'
import { config } from './../ducks/linx/lxswagger'
import { LxInput } from './../components/lxform'
import _ from 'lodash'

const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)

class Form extends Component {
	constructor(props){
		super(props);

		this.state = {
			fields: []
		}
	}
// {
// 				return <Field
// 					component={LxInput}
// 					name={keyField}
// 					className="form-control"
// 					/>
// 			}
// 			<Field
									// component={LxInput}
									// name="raspberry"

									// label="Nome"
									// className="form-control"
									// estado="error"

									// />
	componentWillMount(){
		this.buildFields()
	}

	buildFields(){
		config(a => {
			this.setState({...this.state, fields: _.map(a.spec.definitions.SistemaERP.properties, (itemField, keyField) => ({key: keyField, type: itemField.type}))});
		});
	}

	handleHSubmit(data){
		console.log(data)
	}

	validator(){
		console.log('runner')
		return undefined;
	}

	renderField({ input, label, type, meta: { touched, error, warning } }){
		// xabanaia
		return (
		  <div>
		    <label>{label}</label>
		    <div>
		      <input {...input} placeholder={label} type={type}/>
		      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
		    </div>
		  </div>
		)
	}

	render(){
		const { handleSubmit, reset } = this.props;
		// pristine, submitting
		
		

		return <section className="content">
			<div className="row">
				<div className="col-md-12">
					<div className="box">
						<div className="box-header">
							<h3 className="box-title">hello</h3>
						</div>
						<form onSubmit={ handleSubmit((data) => this.handleHSubmit(data)) }>
							<div className="box-body table-responsive">
								{this.state.fields.length && this.state.fields.map((itemF, keyF) => <Field
									key={keyF}
									
									component={LxInput}
									name={itemF.key}
									
									label={itemF.key}
									validate={[minValue18]}
									className="form-control"
									/>)}

								<button type="submit">Byes!</button>
								<button type="button" onClick={reset}>Reset</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>

	}
}

Form = reduxForm({
	form: `form-${(new Date()).getTime()}`
})(Form);

Form = connect(state => (dsp) => ({
	
}), {config})(Form);

export default Form;