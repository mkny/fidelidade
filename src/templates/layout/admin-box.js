import React from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router'

class AdminBox extends React.Component {

	loader() {
		return <div className="overlay"><i className="fa fa-refresh fa-spin"></i></div>
	}

	render() {
		const {
			header,
			className,
			children,
			footer,
			isLoading,
			color
		} = this.props;

		return <div className={`box ${color && 'box-'+color}`}>
			<div className="box-header">{typeof header === 'string' ? <h3>{header}</h3>:header}</div>
			<div className={`box-body ${className ? className:''}`}>{children}</div>
			<div className="box-footer">

				{footer}
			</div>
			{isLoading && this.loader()}
		</div>

	}
}

AdminBox.defaultProps = {
	header : '',
	footer : '',
}

AdminBox.propTypes = {
	color: PropTypes.oneOf([
		'primary',
		'success',
		'info',
		'danger',
		'warning'
	])
}

export default withRouter(AdminBox)