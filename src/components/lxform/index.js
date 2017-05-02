import React, { Component } from 'react';

import _ from 'lodash';
// import $ from 'jquery';

// import { connect } from 'react-redux'


// @connect()
// @reduxForm(props => ({
//   form: 'Form'
//   // initialState: {
//   //   firstname: props.user.getIn('user', 'firstname'),
//   //   lastname: props.user.getIn('user', 'lastname'),
//   // },
// }))


class Fieldset extends Component {
	render(){
		return <fieldset>
			{this.props.title?<legend>{this.props.title}</legend>:null}
			{this.props.children}
		</fieldset>
	}
}

class Input extends Component {
	getFieldState() {

		let indField;
		const { estado } = this.props;

		if( estado === 'error' ){
			indField = 'error';
		}
		if( estado === 'warning' ){
			indField = 'warning';
		}
		if( estado === 'success' ){
			indField = 'success';
		}

		return indField ? 'has-'+indField:'';
	}

	render(){
		// const { meta, input, props, ...newProps } = this.props;
		// console.log(newProps)
	

		const classNameBlock = 'form-group '+ this.getFieldState();

		const { label, description } = this.props;
		const { className, placeholder, disabled, readOnly, autoFocus, maxLength, autoComplete } = this.props;

		let b = {
			className,
			placeholder,
			disabled,
			readOnly,
			autoFocus,
			maxLength,
			autoComplete
		}



		
		
		return <div className={classNameBlock}>
			{ label ? <label>{ label }</label>:null}
			<input
				{...this.props.input}
				// {_.pull(...this.props, (key) => key === 'meta')}
				// {...newProps}
				{...b}
				

				/>
			{description?<span className="help-block">{description}</span>:null}
		</div>
	}
}

// Input.propTypes = {
// 	name: React.PropTypes.string.isRequired,
// 	type: React.PropTypes.oneOf([
// 		'checkbox',
// 		'button',
// 		'color',
// 		'date',
// 		'datetime',
// 		'datetime-local',
// 		'email',
// 		'file',
// 		'hidden',
// 		// 'image (submit - com src)',
// 		'month',
// 		'number',
// 		'password',
// 		'radio',
// 		'range',
// 		'reset',
// 		'search',
// 		'tel',
// 		'text',
// 		'time',
// 		'url',
// 		'week',

// 		])
// };



module.exports = {
	// LxForm: reduxForm({form: 'dataform'})(Form),
	LxInput: Input,
	LxFieldset: Fieldset,
}