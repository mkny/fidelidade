import React from 'react'
import _ from 'lodash'

import AdminBox from './layout/admin-box'

// Signature pad
import SignaturePad from 'react-signature-pad'

// Qrcode
import QrCode from 'qrcode.react'

// Tabbed content
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// LxTable
import LxTable from 'react-lx-table'

// Chartjs

class Features extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			qrcode: 'http://www.linx.com.br',
			datasource: [],
		}

		this.getQrcode = this.getQrcode.bind(this)
		this.updateQrCode = this.updateQrCode.bind(this)
		this.cleanSignature = this.cleanSignature.bind(this)
		this.getSignature = this.getSignature.bind(this)
	}

	componentWillMount(){
		fetch('https://randomuser.me/api/?results=20&seed=linxcard&inc=gender,name,nat').then(response => {
			response.json().then(data => {
				this.setState({datasource: data.results})
			})
		})
	}

	getQrcode(){
		const down = this.qrcode._canvas.toDataURL();
		if(this.state.qrcode){
			window.open(down);
		} else {
			alert('QR Vazio')
		}
	}

	updateQrCode(event){
		const { value } = event.target;
		
		this.setState({qrcode: value})
	}

	getSignature(){
		if(this.signature.isEmpty()){
			this.refs.signatureMessage.innerHTML = 'Favor assinar!'
		} else {
			const down = this.signature.toDataURL();
			window.open(down);
		}
	}

	cleanSignature(){
		this.refs.signatureMessage.innerHTML = '';
		this.signature.clear();
	}

	render() {
		return <section className="content">
			<div className="row">
				<div className="col-md-6">
					<AdminBox color="warning" header={<h3>Signature feature</h3>}>
						<SignaturePad
							// minWidth={0.3}
							onBegin={() => this.refs.signatureMessage.innerHTML = ''}
							ref={sig => this.signature = sig}
							/>
							<p ref="signatureMessage"></p>
							<div className="btn-group">
								<button className="btn btn-default" type="button" onClick={this.cleanSignature}>Clean</button>
								<button className="btn btn-default" type="button" onClick={this.getSignature}>Get Image</button>
							</div>
					</AdminBox>
					<AdminBox header="Tabbed content">
						<Tabs>
							<TabList>
								<Tab>Title 1</Tab>
								<Tab>Title 2</Tab>
								<Tab>Title 3</Tab>
							</TabList>
							<TabPanel>
								<h2>Any Content 1</h2>
							</TabPanel>
							<TabPanel>
								<h2>Any Content 2</h2>
							</TabPanel>
							<TabPanel>
								<h2>Any Content 3</h2>
							</TabPanel>
						</Tabs>
					</AdminBox>
				</div>
				<div className="col-md-6">
					<AdminBox color="primary" header={<h3>Qr code Generator</h3>}>
						<div className="form-group">
							<input type="text" className="form-control" value={this.state.qrcode} placeholder="Type something here" onChange={this.updateQrCode} />
							<button className="btn btn-default" type="button" onClick={this.getQrcode}>Get QR</button>
						</div>
						<QrCode
							value={this.state.qrcode}
							fgColor="#5b2e90"
							ref={qr => this.qrcode = qr}
							/>
					</AdminBox>
					<AdminBox header="Simple table (LxTable)" className="table-responsive">
						<LxTable
							className="table table-striped"
							classNamePager="pagination pagination-sm"
							totalRecordsPerPage={10}
							totalRecords={20}
							datasource={this.state.datasource}
							/>
					</AdminBox>
				</div>
			</div>
		</section>
	}
}

export default Features