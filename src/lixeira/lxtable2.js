import React, { Component } from 'react';
// import { Link } from 'react-router';

import Sprintf from 'sprintf-js';
import _ from 'lodash';

/**
 * Componente de tabulação de dados
 * 
 */
class LxTable extends Component {
	constructor(props){
		super(props);

		this.state = {
			headers: props.headers,
			datasource: props.datasource,
			pagination: props.pagination,
			isDebug: true,
		}
	}

	dbg(data){
		if(this.state.isDebug){
			console.info(data);
		}
	}

	/**
	 * [componentDidUpdate description]
	 * @return {void}
	 */
	componentDidUpdate(){
		// Ao atualizar o objeto, ele verifica se o mesmo possui headers
		// Caso nao possua, ele ira pegar os cabecalhos do objeto datasource
		if(!this.state.headers.length && this.state.datasource.length){
			this.setState({headers: this.getHeaders()});
			this.dbg('Setting headers...');
		}

		// Update datasource
		if(!_.isEqual(this.state.datasource, this.props.datasource)){
			this.setState({datasource: this.props.datasource});
			this.dbg('Setting datasource...');
		}

		// Update pagination
		if(!_.isEqual(this.state.pagination, this.props.pagination)){
			this.setState({pagination: this.props.pagination});
			this.dbg('Setting pagination...');
		}
	}

	/**
	 * Retorna os headers
	 * 
	 * @return {array} Array de headers
	 */
	getHeaders(){
		this.dbg('Getting headers...');
		let { headers, buttons, datasource } = this.props;

		// Faz a verificacao se nao existem headers, porem exista datasource
		if(!headers.length && datasource.length){
			// Extrai no formado necessario
			headers = _.keys(datasource[0]).map(hn => {
				return { field: hn, sortable: true }
			});	
		}

		// Se existem botoes, mas nao esta passando o indice 'actions'
		if(buttons && !_.filter(headers, {field: 'actions'}).length){
			headers.push({
				field: 'actions'
			});
		}

		return headers;
	}

	/**
	 * Constroi o cabeçalho
	 * 
	 * @return {string} Header construido
	 */
	buildHeader(){
		this.dbg('Building headers...');
		const { headers } = this.state;

		if(!headers.length){
			// throw new Error('Sem cabeçalhos!');
			return null;
		}
		
		// Retorna os headers constuidos
		return <tr>
			{headers.map((item, index) => {
				const isSortable = item.sortable || true;
				const columnName = item.field;
				const text = item['trans'] || item.field;

				return <th
					key={index}
					data-sortable={isSortable}
					onClick={this.handleHeaderClick.bind(this)}
					data-column={columnName}
					>{text}</th>
			})}
		</tr>
	}

	/**
	 * Constrói o rodapé
	 * 
	 * @return {string} Footer construído
	 */
	buildFooter(){
		const { headers } = this.state;

		const footer = this.props.footer || headers;
		if(footer.length !== headers.length){
			throw Error('Footers length different of Headers length');
		}

		if(!footer.length){
			return null;
		}

		return <tr>
			{footer.map((item, index) => {
				const text = item['trans'] || item.field;
				return <th key={index}>{text}</th>
			})}
		</tr>
	}

	/**
	 * Retorna o corpo da tabela
	 * @param  {integer} pageNumber Numero da pagina a ser montada (usado em listagem fixa)
	 * @return {void}
	 */
	buildBody(){
		const { headers, datasource, pagination } = this.state;
		const { buttons, fixed } = this.props;

		let rows = datasource.map((itemRow, indexRow) => 
			<tr data-row={indexRow} key={indexRow}>
				{headers.map((itemHd, indexHd) => {
					// Coluna de valores
					let column;
					if(itemHd.field === 'actions'){
						// Construcao dos botoes

						column = <td key={indexHd} data-column-name={itemHd.field} data-sortable={false}>
							<div className="btn-group">
								{buttons.map((itemBt, indexBt) => {
									// let text = itemBt.trans || itemBt.name;
									let text = itemBt.trans ;
									let link = Sprintf.sprintf(itemBt.action, indexRow);

									return <a key={indexBt} className={itemBt.classNameHref} href={link}>
									{itemBt.icon ? <i className={itemBt.icon}></i>:null} {text}
									</a>
								})}
							</div>
						</td>
					} else {
						// Construcao de texto simples
						column = <td key={indexHd} data-column-name={itemHd.field} data-column-content={this.fieldFormatted(itemRow[itemHd.field], itemHd.format)}>
							{this.fieldFormatted(itemRow[itemHd.field], itemHd.format)}
						</td>
					}

					return column;
				})}
			</tr>
		)
		
		// Faz a paginacao, quando o datasource é fixo
		if(fixed){

			const { currentPage, totalItemCountPerPage } = pagination;
			// Busca o indice de pageNumber, no array
			const indice = (currentPage-1 < 0) ? 0:currentPage-1;

			// Recupera a quantidade de itens por pagina (para a pgainacao)
			const totalPerPage = totalItemCountPerPage;

			// Substitui as linhas, pelas linhas limitadas pelo totalItemCountPerPage, no indice solicitado
			rows = _.chunk(rows, totalPerPage)[indice];
		}

		// Retorna as linhas
		return rows;
	}

	/**
	 * Handler do click no cabeçalho
	 * 
	 * @param  {object} event Evento disparador
	 * @return {void}
	 */
	handleHeaderClick(event){
		const header = event.target;
		const parent = header.parentNode;


		// Verifica se o campo permite ordenacao, antes de qualquer coisa
		if(!(header.getAttribute('data-sortable') === 'true'? true:false)){
			return;
		}

		// Armazena informacoes da coluna e a cardinalidade
		const columnName = header.getAttribute('data-column');
		const columnCard = (header.getAttribute('data-order-card') || 'desc') === 'desc'?'asc':'desc';

		// Setta o order-card no campo, para fazer o oposto depois
		header.setAttribute('data-order-card', (columnCard === 'asc' ? 'asc':'desc'));

		// Para corrigir a listagem, coloquei pra sempre alinhar o primeiro campo, como uma ordem basica
		const columnZero = parent.childNodes[0].getAttribute('data-column');

		// Remove os outros order's (estetica)
		parent.childNodes.forEach(function(i){
			if(i !== header){
				i.removeAttribute('data-order-card');
			}
		})

		if(this.props.fixed){
			this.columnOrderFixed(columnZero, 'asc');
			this.columnOrderFixed(columnName, columnCard);
		} else {
			this.columnOrderDynamic(columnName, columnCard);
		}
	}

	/**
	 * Ordenação dos registros (fixos)
	 * @param  {string} key  Chave de ordenação
	 * @param  {string} card Cardinalidade (asc / desc)
	 * @return {void}
	 */
	columnOrderFixed(key, card){
		const { datasource } = this.props;

		let newDataSource = datasource.sort((a,b) => {
			const keya = this.fieldFormatted(a[key]);
			const keyb = this.fieldFormatted(b[key]);

			return (keya > keyb) ? 1 : ((keyb > keya) ? -1 : 0)
		});

		if(card === 'desc'){
			newDataSource = newDataSource.reverse();
		}


		this.setState({ datasource: newDataSource });
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
		}
	}

	/**
	 * Retorna o campo formatado com o formato especificado (sprintf-js)
	 * @param  {string|object} content Conteudo
	 * @param  {string} format  Formato para escrita
	 * @return {string}         Texto formatado
	 */
	fieldFormatted(content, format){
		// Verifica se e um objeto composto
		if(typeof content !== 'object'){
			return content;
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
	 * Acao de trocar de pagina (ao clicar)
	 * 
	 * @param  {integer} pageNumber Numero da pagina clicada
	 * @return {void}
	 */
	handleClickPage(pageNumber){
		if(this.props.fixed){
			// Se for fixado
			this.setState(_.merge(this.state, {pagination: { currentPage: pageNumber }}))
		} else if(this.props.onClickPage) {
			// Se houver acao de clique do parent
			this.props.onClickPage(pageNumber);
		} else {
			// Se tiver informacao faltante
			console.log('what do i do?', pageNumber);
		}
	}

	/**
	 * Retorna o objeto construído
	 * 
	 * @return {string} LxTable
	 */
	render(){
		
		if(this.state.datasource.length === 0){
			if(this.props.emptyText !== undefined){
				return <h3>{this.props.emptyText}</h3>
			} else {
				return <h3>- empty -</h3>
			}

		}

		return <div>
			<LxPagination
				{...this.state.pagination}
				onClickPage={this.handleClickPage.bind(this)}
				/>
			<table className={this.props.className}>
				<thead>
					{this.buildHeader()}
				</thead>
				<tbody>
					{this.buildBody(this.state.pagination.currentPage)}
				</tbody>
				<tfoot>
					{this.buildFooter()}
				</tfoot>
			</table>
		</div>
	}
}

LxTable.propTypes = {
	onClickPage: (props, propName, componentName) => {
		if(!props.fixed && typeof props.onClickPage !== 'function'){
			return new Error(`Ao informar que a tabela é dinamica, necessário informar uma ${propName} para ${componentName}. Validation failed.`);
		}
	},
	onClickOrder: (props, propName, componentName) => {
		if(!props.fixed && typeof props.onClickOrder !== 'function'){
			return new Error(`Ao informar que a tabela é dinamica, necessário informar uma ${propName} para ${componentName}. Validation failed.`);
		}
	}
}

LxTable.defaultProps = {
	fixed: false,// Indicador de ordenacao dinamica
	buttons: [],// Array de botoes a serem inseridos na listagem
	headers: [],// Cabeçalhos de itens
	datasource: [], // Coleção de itens
	onClickOrder: null,
	onClickPage: null,
	pagination: {
		currentPage: 1 // pagina atual
	} // Objeto de paginação
};

class LxPagination extends Component {

	/**
	 * Retorna objeto construido
	 * 
	 * @return {string}
	 */
	render(){
		const { totalItemCount, totalItemCountPerPage, currentPage, pagesInRange } = this.props;

		const totalPages = Math.ceil(this.props.totalPages || totalItemCount / totalItemCountPerPage);

		const currentItemCount = 0;

		if(isNaN(currentPage)){
			return null;
		}

		return <div>
			<p>In this page: { currentItemCount }</p>
			<p>Total rows: { totalItemCount }</p>
			<p>{ currentPage } of { totalPages }</p>



			<LxPaginationPager
				currentPage={ currentPage }
				totalPages={ totalPages }
				pagesInRange={ pagesInRange }
				onClick={ this.props.onClickPage }

				/>
		</div>
	}
}

LxPagination.defaultProps = {
	pagesInRange: 6, // Quantidade de itens no range
	currentPage: 0, // pagina atual
	currentItemCount: 0, // Itens na pagina
	totalPages: 0, // Total de paginas
	totalItemCountPerPage: 10, // Total max de itens por pagina
	totalItemCount: 0, // Total de itens disponiveis
	// prevPage: null, // pagina anterior
	// nextPage: null, // proxima pagina
	// firstItemNumber: null, // Offset do primeiro item da pagina
	// lastItemNumber: null // Offset do ultimo item da pagina
}

class LxPaginationPager extends Component {

	/**
	 * Obtem o range para o intervalo de paginas
	 * @param  {integer} valRef     Pagina atual
	 * @param  {integer} rangeMax Valor masimo de pagina
	 * @return {array}          Range numerico
	 */
	rangeFromPage(valRef, rangeLength, valLimit){
		// Preestabelece o minimo sendo 50% do range
		let rangeMin = (valRef - Math.ceil((rangeLength/2)))
		rangeMin = rangeMin < 1 ? 1:rangeMin;
		let rangeFinal = rangeMin+(Math.ceil(rangeLength))
		rangeFinal = (rangeFinal > valLimit ? valLimit+1:rangeFinal)
		let rangeRelative = ((rangeFinal-rangeMin)-rangeLength);
		rangeRelative = rangeRelative > 0 ? 0:rangeRelative;
		let minimum = rangeRelative+rangeMin < 1 ? 1:rangeRelative+rangeMin;
		let maximum = rangeFinal < 0 ? 0:rangeFinal;


		let range_exp = _.range(minimum, maximum);

		return range_exp;
	}

	handleClick(id){
		if(this.props.currentPage !== id){
			this.props.onClick(id);
		}
	}

	/**
	 * Constrói o botão de anterior
	 * @return {void}
	 */
	buildPrev(){
		const { currentPage } = this.props;

		if(currentPage <= 1){
			return null;
		}

		return <li>
			<a href="#" onClick={() => this.handleClick(currentPage - 1)}>&laquo;</a>
		</li>
	}

	/**
	 * Constrói o botão de posterior
	 * @return {void}
	 */
	buildNext(){
		const { currentPage, totalPages } = this.props;
		
		if(!totalPages || currentPage === totalPages){

			return null;
		}

		return <li>
			<a href="#" onClick={() => this.handleClick(currentPage + 1)}>&raquo;</a>
		</li>
	}

	/**
	 * Constrói os itens de paginação
	 * 
	 * @return {string}
	 */
	buildPages(){
		const { currentPage, pagesInRange, totalPages } = this.props;

		// Constroi o range de paginas
		const range = this.rangeFromPage(currentPage, pagesInRange, totalPages);

		if(range.length === 1){
			return null;
		}

		return range.map((item, index) => {
			let isPageAtual = item === currentPage ? true:false;
			
			return <li key={index} className={isPageAtual ? 'active':''}>
				<a href="#" onClick={() => this.handleClick(item)}>{item}</a>
			</li>
		})
	}

	render(){
		return <ul className="pagination pagination-sm no-margin pull-right">
			{this.buildPrev()}
			{this.buildPages()}
			{this.buildNext()}
		</ul>
	}
}

export default LxTable;