import React from 'react'
import PropTypes from 'prop-types'
import superBrokerHOC from './createBrokerHOC'

const connectedBroker = (WrappedComponent) => {
	class LxBrokerReal extends React.Component {
		static contextTypes = {
			_lxbroker: PropTypes.object
		};

		render(){
			const props = {...this.props, ...this.context}

			return <WrappedComponent
				{...props}
				/>
		}
	}

	return superBrokerHOC(LxBrokerReal)
}

export default connectedBroker