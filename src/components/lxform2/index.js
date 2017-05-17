import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { reduxForm, Fields } from 'redux-form'
// SubmissionError

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const withForm = WrappedComponent => {
	return class extends React.Component {
		render() {
			return <WrappedComponent
					{...this.props}
					/>
		}
	}
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
		if(!extraRest.label && !inputProps.input.placeholder){
			if(data.defaults.defaultFieldLabel){
				inputProps.input.placeholder = inputProps.input.name;
			}
		}

		// Build Field
		let inputField;


		// // Check hidden field
		// if(inputProps.input.type === 'hidden'){
		// 	return inputField;
		// } else {
		// 	counter++;
		// }
		
		switch(inputProps.input.type){
			case 'textarea':
				inputField = <textarea key={counter++} {...inputProps.input}></textarea>
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
				inputField = <input type="text" key={counter++} id={inputProps.input.id || inputProps.input.name} {...inputProps.input} />		
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
	})

	// console.info(a)

	// return null
	return <div>{inputs}</div>
}





class FormBuilder extends React.Component {
	handleSubmit(values) {
		return sleep(1000).then(() => {
			console.log('here me')
	// 		// simulate server latency
	// 		if (!['john', 'paul', 'george', 'ringo'].includes(values.username)) {
	// 			throw new SubmissionError({
	// 				username: 'User does not exist',
	// 				_error: 'Login failed!'
	// 			})
	// 		} else if (values.password !== 'redux-form') {
	// 			throw new SubmissionError({
	// 				password: 'Wrong password',
	// 				_error: 'Login failed!'
	// 			})
	// 		} else {
	// 			window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
	// 		}
		})
	}

	render(){
		const { formdata } = this.props

		if(!formdata || !Object.keys(formdata).length){
			return null
		}

		const {
			handleSubmit,
			reset,
			pristine,
			submitting,
		} = this.props

		const {
			resetButton, resetButtonClass, resetButtonText,
			submitButton, submitButtonClass, submitButtonText,
			...restFormData
		} = formdata;

		let { fields } = formdata;

		// field related
		const { type } = this.props

		const fieldNames = _.map(fields, (item, name) => {
			return item.name || name
		}).filter(o => {
			return fields[o][type] === undefined || fields[o][type]
		})

		

		// const fieldValues = {
		// 	nome: [1,2]
		// }



		return <form onSubmit={handleSubmit(this.handleSubmit)}>
			<Fields
				component={preBuildField}
				// component={format && format.fields ? format.fields : "input"}
				names={ fieldNames }
				// values={ fieldValues }

				extra={ fields }
				defaults={restFormData}
				/>

			<div className="btn-group">
				{resetButton && <button
					disabled={pristine || submitting}
					className={resetButtonClass}
					type="button"
					onClick={reset}
				>{resetButtonText}</button>}

				{submitButton && <button
					disabled={pristine || submitting}
					className={submitButtonClass}
					type="submit"
				>{submitButtonText}</button>}
			</div>
		</form>
	}
}

FormBuilder.propTypes = {
	type: PropTypes.oneOf(['add', 'edit'])
}

FormBuilder = reduxForm({
	form: 'form-id-'
})(FormBuilder)

export { FormBuilder }

// {_.map(fields, (item, key) => {
// 	if(!(typeof item[type] === 'undefined' ? true:item[type])){
// 		return null;
// 	}
	
// 	const props = _.merge(item, { props : { className: rest.defaultFieldClassName } });

// 	return <Field
// 		key={counter++}
// 		component={format && format.fields ? format.fields : "input"}

// 		name={key}

// 		{...props.props}


// 		props={format && props}

// 		/>
// })}