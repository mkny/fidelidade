import React from 'react'
import _ from 'lodash'
import { reduxForm, Field } from 'redux-form'
// SubmissionError

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

let counter = 0;

export const withForm = WrappedComponent => {
	return class extends React.Component {
		render() {

			return <WrappedComponent

					{...this.props}

					/>
		}
	}
}

class FormBuilder extends React.Component {

	fields(){
		const { formdata : { fields, ...rest }, format, type } = this.props

		return _.map(fields, (item, key) => {
			if(!(typeof item[type] === 'undefined' ? true:item[type])){
				return null;
			}

			const props = _.merge(item, { props : { className: rest.defaultFieldClassName } });

			
			// console.log(props.props)
			// return null
			return <Field
				key={counter++}
				component={format.fields || "input"}

				name={key}

				{...props.props}


				props={props}

				/>
		})
	}

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
			resetButton,
			resetButtonText,
			submitButton,
			submitButtonText,
		} = formdata;

		return <form onSubmit={handleSubmit(this.handleSubmit)}>
			{this.fields()}

			{resetButton &&		<button disabled={pristine || submitting} type="button" onClick={reset}>{resetButtonText}</button>}
			{submitButton &&	<button disabled={pristine || submitting} type="submit">{submitButtonText}</button>}
		</form>
	}
}

FormBuilder = reduxForm({form: 'this-is-form'})(FormBuilder)

export { FormBuilder }
