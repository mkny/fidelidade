// Components
import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import Sprintf from 'sprintf-js';

import LxPagination from './pagination';

/**
 * ### TODO ###
 * 
 * 1 - retirar o marcador de ordenacao dos campos, quando o componente atualizar
 * 2 - resolver bug de quando o componente carrega, o botao de paginacao nao funciona
 		depois do primeiro clique vai de boa
 * 
 */

/**
 * Componente LxTable
 */
class LxTable extends React.Component {

	constructor(props){
		super(props);
		
		const currentPage = props.currentPage || 1;

		this.state = {
			...props,
			currentPage: currentPage,
			pageIndex: this.getPageIndex(currentPage)
			
		};

		this.handleClickPage = this.handleClickPage.bind(this);
	}

	/**
	 * Utilizado pra atualizar os campos, quando ocorre atualizacao no redux
	 * (isso ta causando o bug todo[2])
	 * @param  {object} nextProps
	 * @return {void}
	 */
	componentWillReceiveProps(nextProps){
		this.setState({...this.state, ...nextProps});
	}

	/**
	 * Recupera o pageIndex
	 * @param  {int} page Pagina atual representativa
	 * @return {int}      Offset
	 */
	getPageIndex(page){
		return page-1 < 0 ? 0:page-1;
	}

	/**
	 * Tratamento para campo object / array
	 * @param  {mixed} data Campo nao-formatado
	 * @return {object}      Formata no padrao de objeto
	 */
	fieldKey(data){
		if(typeof data !== 'object'){
			return {field: data};
		}

		return data;
	}

	/**
	 * Retorna o campo formatado com o formato especificado (sprintf-js)
	 * @param  {string|object} content Conteudo
	 * @param  {string} format  Formato para escrita
	 * @return {string}         Texto formatado
	 */
	field(content, format){
		const emptyValue = '~ none ~';

		// Verifica se e um objeto composto
		if(typeof content !== 'object'){
			return content || emptyValue;
		}

		// Armazena em json para facilitar a construcao do campo
		const contents = {contents: content};

		// strFormatPieces e usado quando sao varias partes para formar uma string
		let strFormatPieces = [];

		// strFormat e usado para armazenar o formato
		let strFormat = format?format:_.map(content, (key, item) =>  {
			if(isNaN(item)){
				return '%(contents.'+item+')s'
			} else {
				strFormatPieces.push(_.map(key, (key2, item2) => {
					return `%(contents[${item}].${item2})s `
				}).join(''));
			}
		}).join(' ');

		if(strFormatPieces.length){
			strFormat = strFormatPieces.join('-');
		}

		try {
			return Sprintf.sprintf(strFormat, contents);
		} catch(e){
			console.log(strFormat);
		}
	}
	

	/**
	 * Busca os cabecalhos da tabela
	 * @return {array} Cabecalhos
	 */
	getHeaders(){
		const { datasource } = this.state;
		let headers = this.props.headers || [];
		
		if(headers && headers.length){
			
		} else if(datasource.length){
			headers = _.keys(datasource[0]).map((item) => { return { field: item } });
		} else {
			headers = [];
		}

		return headers;
	}

	/**
	 * Handler do clique no cabecalho
	 * @param  {object} event Evento do click
	 * @return {void}       Dispara a acao
	 */
	handleClickHeader(event) {
		const header = event.target;
		const parent = header.parentNode;
		
		// Armazena informacoes da coluna e a cardinalidade
		const columnName = header.getAttribute('data-column');
		const columnCard = (header.getAttribute('data-order-card') || 'desc') === 'desc'?'asc':'desc';

		// Setta o order-card no campo, para fazer o oposto depois
		header.setAttribute('data-order-card', (columnCard === 'asc' ? 'asc':'desc'));

		// Para corrigir a listagem, coloquei pra sempre alinhar o primeiro campo, como uma ordem basica
		// Acho que isso bugou ;D
		// const columnZero = parent.childNodes[0].getAttribute('data-column');

		// Remove os outros order's (estetica)
		parent.childNodes.forEach((i) => {
			if(i !== header){i.removeAttribute('data-order-card')}
		});

		if(this.props.dynamic){
			this.columnOrderDynamic(columnName, columnCard);
		} else {
			// Comment do bug ;D
			// this.columnOrderFixed(columnZero, 'asc');
			this.columnOrderFixed(columnName, columnCard);
		}
	}


	/**
	 * Ordenação dos registros (dinamicos)
	 * @param  {string} key  Chave de ordenação
	 * @param  {string} card Cardinalidade (asc / desc)
	 * @return {void}
	 */
	columnOrderDynamic(key, card){
		if(this.props.onClickOrder){
			this.props.onClickOrder(key, card);
		} else {
			throw Error('Component should have onClickOrder property!')
		}
	}

	/**
	 * Ordenação dos registros (fixos)
	 * @param  {string} key  Chave de ordenação
	 * @param  {string} card Cardinalidade (asc / desc)
	 * @return {void}
	 */
	columnOrderFixed(key, card){
		const { datasource } = this.state;

		let newDataSource = datasource.sort((a,b) => {
			const keya = this.field(a[key]);
			const keyb = this.field(b[key]);

			return (keya > keyb) ? 1 : ((keyb > keya) ? -1 : 0)
		});

		if(card === 'desc'){
			newDataSource = newDataSource.reverse();
		}

		this.setState({ datasource: newDataSource });
	}

	/**
	 * Construtor do Body
	 * @return {object} Body construido
	 */
	buildBody(){
		let { datasource } = this.state;
		const { dynamic, totalRecordsPerPage, currentPage } = this.state;
		const pageIndex = this.getPageIndex(currentPage);
		const headers = this.getHeaders();
		const buttons = this.state.buttons;

		if(!dynamic){
			datasource = _.chunk(datasource, totalRecordsPerPage)[pageIndex] || [];
		}

		return datasource.map((itemRows, keyRows) => {
			return <tr key={keyRows}>{headers.map((itemColumns, keyColumns) => {
				const column = this.fieldKey(itemColumns);
				

				if(column.field === 'actions'){
					return <td key={keyColumns} data-column-name={column.field} data-sortable={false}>
						<div className="btn-group">
							{buttons && buttons.map((itemBt, indexBt) => {
								const text = itemBt.trans;
								// Indica o id do item que sera manipulado
								const link = Sprintf.sprintf(itemBt.action, itemRows[_.keys(itemRows)[0]]);

								return <a key={indexBt} className={itemBt.className} href={link}>
									{itemBt.icon && <i className={`fa ${itemBt.icon}`}></i>} {text}
								</a>
							})}
						</div>
					</td>
				} else {
					return <td key={keyColumns}>{this.field(itemRows[column.field], column.format)}</td>
				}
			})}</tr>
		});
	}

	/**
	 * Construtor do Header
	 * @return {object} Headers construidos
	 */
	buildHeader(){
		const header = this.props.header || this.getHeaders();
		
		const headers = <tr>{header.map((itemHd, keyHd) => {
			const column = this.fieldKey(itemHd);

			const isSortable = column.sortable || true;
			const text = column.trans||column.field;
			const field = column.field;
			const width = column.width || null;

			return <th
				key={keyHd}
				width={width}
				data-column={field}
				data-sortable={isSortable}
				onClick={isSortable?this.handleClickHeader.bind(this):false}
				>{text}</th>
			}
		)}</tr>

		return headers;
	}
	
	/**
	 * Handler de clique na paginacao
	 * @param  {int} pageNumber Numero da pagina
	 * @return {void}            Dispara a acao
	 */
	handleClickPage(pageNumber) {

		if(!this.props.dynamic){
			// Se for fixado
			this.setState({ currentPage: pageNumber });

		} else if(this.props.onClickPage) {
			// Se houver acao de clique do parent
			this.props.onClickPage(pageNumber);

		} else {
			// Se tiver informacao faltante
			console.log('what do i do?', pageNumber);

		}
	}
	
	/**
	 * Construtor do Footer
	 * @return {object} Footers construidos
	 */
	buildFooters() {
		const footer = this.props.footer || this.getHeaders();

		return <tr>{footer.map((itemFt, keyFt) => {
			const column = this.fieldKey(itemFt);
			const text = column.trans||column.field;

			return <th key={keyFt}>{text}</th>
		})}</tr>
	}

	/**
	 * Busca o total de paginas
	 * @return {int} Total de paginas
	 */
	getTotalRecordsPage() {
		const { datasource, totalRecordsPerPage, currentPage } = this.state;
		const pageIndex = this.getPageIndex(currentPage);
		
		if(this.props.dynamic){
			return datasource.length;
		} else {
			return datasource.length? _.chunk(datasource, totalRecordsPerPage)[pageIndex].length:0;
		}
	}

	/**
	 * Renderizador
	 * @return {object} React object
	 */
	render(){
		const { currentPage, totalRecordsPerPage, totalRecords, totalPages } = this.state;
		const totalRecordsPage = this.getTotalRecordsPage();
		
		return <div>
			{totalRecords > totalRecordsPerPage && <LxPagination
				currentPage={currentPage}
				totalRecords={totalRecords}
				totalRecordsPerPage={totalRecordsPerPage}
				totalRecordsPage={totalRecordsPage}
				totalPages={totalPages}

				onClickPage={this.handleClickPage}
				/>}
			<table className={this.props.className}>
				<thead>{this.buildHeader()}</thead>
				<tbody>{this.buildBody()}</tbody>
				<tfoot>{this.buildFooters()}</tfoot>
			</table>
		</div>
	}
}

/**
 * Definicao dos propTypes
 * @type {Object}
 */
LxTable.propTypes = {
	datasource: PropTypes.array.isRequired,
	onClickPage: (props, propName, componentName) => {
		if(props.dynamic && typeof props.onClickPage !== 'function'){
			return new Error(`Ao informar que a tabela é dinamica, necessário informar uma ${propName} para ${componentName}. Validation failed.`);
		}
	},
	onClickOrder: (props, propName, componentName) => {
		if(props.dynamic && typeof props.onClickOrder !== 'function'){
			return new Error(`Ao informar que a tabela é dinamica, necessário informar uma ${propName} para ${componentName}. Validation failed.`);
		}
	}
}

/**
 * Definicao dos defaultProps
 * @type {Object}
 */
LxTable.defaultProps = {
	totalRecordsPerPage: 10,
	currentPage: 1,
	totalRecords: 0,
	totalPages: 0,
}

export default LxTable;