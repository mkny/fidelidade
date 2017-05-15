import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm} from 'redux-form'

// Field,


class LxForm extends React.Component {
	render(){
		const { handleSubmit, reset, pristine, submitting } = this.props;
		const { fields } = this.props;

		console.log('aa', fields)

		// LxForm Props
		const { submitButton, submitButtonText, resetButton, resetButtonText } = this.props;

		return <div>
			<p>Hear me now</p>
			
			<form onSubmit={handleSubmit}>
				
				
				{submitButton && <button type="submit" disabled={pristine || submitting}>{submitButtonText}</button>}
				{resetButton && <button type="button" disabled={pristine || submitting} onClick={reset}>{resetButtonText}</button>}
			</form>
			
		</div>
	}
}

LxForm.defaultProps = {
	submitButton: true,
	submitButtonText: "Send",
	resetButton: false,
	resetButtonText: "Reset",
}

LxForm.contextTypes = {
	templateField: PropTypes.func
}

LxForm = reduxForm({
	form: 'this-is-a-form'
})(LxForm)

export default LxForm

// {fields.map((o, key) => (
// 					<Field
// 						key={key}

// 						component={this.context.templateField}
// 						info={o}
// 						name={o.name}
// 						/>
// 				))}