import React, {Component} from 'react';
import $ from 'jquery';
// import LxForm from '../components/lxform';
import Lx, { LxInput as Inp } from '../components/lxform';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

const data = {  // used to populate "account" reducer when "Load" is clicked
  firstName: 'Jane',
  lastName: 'Doe',
  age: '42',
  sex: 'female',
  employed: true,
  favoriteColor: 'Blue',
  bio: 'Born to write amazing Redux code.'
}

import { load as loadAccount } from './../actions-pre/actionredux'


@reduxForm({
	form: `form-${(new Date()).getTime()}`
})
@connect(state => {
	return {};
    // initialValues: state.account.data // pull initial values from account reducer
  },
  {loads: loadAccount}// bind account loading action creator
)
class Formulario extends Component {
	render(){
		const { handleSubmit, loads, pristine, reset, submitting } = this.props;
		// console.log(loads)

		return (
			<form onSubmit={ handleSubmit(values => console.log(values)) }>
				<div className="box-body table-responsive">
					<Lx.LxFieldset title="Dados">
						<button type="button" onClick={() => loads(data)}>hardware</button>
						<Field
							component={Inp}

							id="abacate"
							name="nomeSistemaERP"


							label="Nome"
							description="Google that"

							className="form-control"
							
							estado="error"

							value="Marcony Neves"
							// placeholder="Nome"
							// disabled
							// readOnly
							// autoFocus
							// maxLength="12"
							// autoComplete="off"

						/>
						<Field component={Inp}

							estado="warning"
							label="Interface ERP"
							name="nomeInterfaceERP"
							className="form-control"
							placeholder="Interface"
						/>
						<Field component={Inp}

							estado="success"
							label="URL WS"
							name="urlWebServiceERP"
							className="form-control"
							placeholder="URL"
							// type="url"
						/>
					</Lx.LxFieldset>
				</div>
				<div className="box-footer">
					<button className="btn btn-info" type="button" onClick={reset}>Reset</button>
					<button disabled={pristine || submitting} className="btn btn-warning" type="submit">Send</button>
				</div>
			</form>
		)
	}
}

// FormData = reduxForm({form: 'dataform'})(FormData);

class LxCrudForm extends Component {
	constructor(props){
		super(props);

		this.state = {
			conf: props.conf
		}
	}

	onSubmitHandler(data){
		// console.log(data);
		const urlWS = 'http://projetos.net4bizidc.com.br:8080/managerCard/api/v1/sistemas';
		// $.post('http://projetos.net4bizidc.com.br:8080/managerCard/api/v1/sistemas', JSON.stringify(data), (dt) => {
		// 	console.log(dt)
		// })
		$.ajax({
			type: "POST",
			url: urlWS,
			data: JSON.stringify(data),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(dt){
				// dt.code
				console.log(dt)
			},
			failure: function(errMsg) {
				alert(errMsg);
			}
		});
	}

	render(){
		// console.log(FormData)
		return <section className="content">
			<div className="row">
				<div className="col-md-12">
					<div className="box">
						<div className="box-header">
							<h3 className="box-title">{this.state.conf.title}</h3>
						</div>
						<Formulario />
					</div>
				</div>
			</div>
		</section>
	}
}

LxCrudForm.defaultProps = {
	conf: {
		title: 'Formulário'
	}
}

export default LxCrudForm;
// export default reduxForm({
// 	form: 'myform'
// })(LxCrudForm);