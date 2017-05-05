import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { create, read, update, del } from './actions'


const superBrokerHOC = (WrappedComponent) => {
	const connected = (Component) => connect()(Component)

	class ConnectedBroker extends React.Component {
		static childContextTypes = {
			_lxbroker: PropTypes.object
		};

		getChildContext(){
			return {
				_lxbroker: {
					create: (...args) => this.dispatcher(create, ...args),
					read: (...args) => this.dispatcher(read, ...args),
					update: (...args) => this.dispatcher(update, ...args),
					del: (...args) => this.dispatcher(del, ...args),
				}
			}
		}

		dispatcher(action, ...args){
			const data = action(...args);
			data && this.props.dispatch(data);
		}

		render() {
			const { dispatch, ...rest } = this.props

			return <WrappedComponent
				{...rest}
				/>
		}
	}

	return connected(ConnectedBroker)
}

export default superBrokerHOC