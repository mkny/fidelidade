import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const createForm = WrappedComponent => {
	class Form extends React.Component {
		getChildContext(){
			return {
				templateField: this.props.templateField
			}
		}

		render(){
			const {  fields } = this.props;
			// type,
			// Check Field length
			if(!Object.keys(fields).length){
				return null
			}

			// // Building props
			// const props = {
			// 	...this.props,
			// 	fields: _.filter(fields, o => o[type])
			// };

			
			
			return null

		// // 	return <WrappedComponent
				
		// // 		{...props}

		// // 		/>
		}
	}

	Form.propTypes = {
		type: PropTypes.oneOf(['add', 'edit']).isRequired
	}

	Form.childContextTypes = {
		templateField: PropTypes.func
	}

	return Form;
}

export default createForm