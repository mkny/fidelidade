import React from 'react'
import PropTypes from 'prop-types'

import createBroker from './createBroker'


const broker = bbb => (WrappedComponent) => {
	class LxBrokerReal extends React.Component {
		static contextTypes = {
			_lxbroker: PropTypes.object
		};

		render(){
			// const props = {...this.props}
			const props = {...this.props, ...this.context}

			return <WrappedComponent
					{...props}
					/>
		}
	}

	return createBroker(LxBrokerReal);
}

export default (broker)