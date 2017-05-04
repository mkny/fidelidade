import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'




const createBroker = (WrappedComponent) => {
	const connected = (Component) => connect()(Component)

	class ConnectedBroker extends React.Component {
		static childContextTypes = {
			_lxbroker: PropTypes.object
		};

		getChildContext(){
			return {
				_lxbroker: {
					get: () => this.getData(),
					post: () => this.postData(),
				}
			}
		}

		postData(){
			this.props.dispatch({
				type: 'post here'
			})
		}

		getData(){
			this.props.dispatch({
				type: 'get here'
			})
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

export default createBroker