import React from 'react'

class AdminBox extends React.Component {

	loader() {
		return <div className="overlay"><i className="fa fa-refresh fa-spin"></i></div>
	}

	render() {
		const { header, className, children, footer, isLoading } = this.props;

		return <div className="box">
			<div className="box-header">{header}</div>
			<div className={`box-body ${className}`}>
				{children}
			</div>
			<div className="box-footer">{footer}</div>
			{isLoading && this.loader()}
		</div>

	}
}

AdminBox.defaultProps = {
	header : '',
	footer : '',
}

export default AdminBox



