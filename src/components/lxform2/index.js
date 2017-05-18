import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { reduxForm, Fields } from 'redux-form'
// SubmissionError
import Util from './util'

export const withForm = WrappedComponent => {
	return class extends React.Component {
		render() {
			return <WrappedComponent
				{...this.props}
				/>
		}
	}
}

const simpleRender = (inputProps, extraRest, counter=0) => {
	// Build Field
	let inputField;

	switch(inputProps.input.type){
		case 'textarea':
			inputField = <textarea {...inputProps.input}></textarea>
		break;
		case 'select':
			inputField = <select key={counter++} {...inputProps.input}>
				{extraRest.options.map((optV, optK) => <option key={optK} value={optV.value}>{optV.text}</option>)}
			</select>
		break;
		// case 'radio':
		// 	inputField = extraRest.options.map((optV, optK) => <div key={optK} className="radio">
		// 		<label><input type="radio" id={`opt-${optV.value}`} value={optV.value} {...inputProps.input} />{optV.text}</label>
		// 	</div>)
		// break;
		default:
			inputField = <input type="text" {...inputProps.input} />		
		break;
	}

	if(['hidden'].includes(inputProps.input.type)){
		return inputField;
	}

	// if(['radio'].includes(inputProps.input.type)){
	// 	return <div key={counter++} className="form-group">{inputField}</div>
	// }


	// Build field with format
	return <div
		key={counter++}
		className="form-group">
		{extraRest.label && <label htmlFor={inputProps.input.name}>{extraRest.label}</label>}
		{inputField}
	</div>
}

const preBuildField = (data) => {
	if(!Object.keys(data).length){
		return null
	}

	let counter = 0;

	const inputs = data.names.map(o => {
		const { props, ...extraRest } =  data.extra[o];
		let inputProps = _.merge(data[o], {input : props})
		
		// Check input className and defaultFieldClassName
		if(!inputProps.input.className){
			inputProps.input.className = data.defaults.defaultFieldClassName
		}

		// Check input (label|placeholder) and defaultFieldLabel
		if(!extraRest.label && !inputProps.input.placeholder && data.defaults.defaultFieldLabel){
			inputProps.input.placeholder = inputProps.input.name;
		}



		// Check field Id
		inputProps.input.id = inputProps.input.id || inputProps.input.name;

		// Add key counter
		inputProps.input.key = counter++;

		// Field renderer
		const customRender = _.at(data, 'defaults.formatter.field')[0];

		return (customRender || simpleRender)(inputProps, extraRest, counter++)
	})

	return <div>{inputs}</div>
}

class LxForm extends React.Component {
	handleSubmit(values) {
		return Util.sleep(1000).then(() => {
			console.log('Submitted: ', values)
		})
	}

	render(){
		const {
			handleSubmit, reset, pristine, submitting,

			resetButton, resetButtonClass, resetButtonText,
			submitButton, submitButtonClass, submitButtonText,

			// formatter,

			fields, type, ...restFormData
		} = this.props;

		// field related
		const normFields = Util.normalizeField(fields);
		const fieldNames = Util.sanitizeFieldNames(normFields, type)
		
		return <form onSubmit={handleSubmit(this.handleSubmit)}>
			<Fields
				component={preBuildField}
				names={ fieldNames }

				extra={ normFields }
				defaults={ restFormData }
				/>

			<div className="btn-group">
				{resetButton && <button
					disabled={pristine || submitting}
					className={resetButtonClass}
					type="button"
					onClick={reset}
				>{resetButtonText}</button>}

				{(submitButton === undefined || submitButton) && <button
					disabled={pristine || submitting}
					className={submitButtonClass}
					type="submit"
				>{submitButtonText || "Submit"}</button>}
			</div>
		</form>
	}
}

LxForm.propTypes = {
	type: PropTypes.oneOf([
		'add',
		'edit'
	])
}

LxForm = reduxForm({
	form: 'form-id-'
})(LxForm)

export { LxForm }