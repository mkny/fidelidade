import React from 'react'
import _ from 'lodash'


class LxPaginationPager extends React.Component {

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

	/**
	 * Executa a acao do botao
	 * @param  {int} id Numero da pagina
	 * @return {void}
	 */
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

	/**
	 * Retorna o objeto react
	 * @return {React.Component} Render
	 */
	render(){
		// const { currentPage, pagesInRange, totalPages } = this.props;

		return <ul className="pagination pagination-sm pull-right">
			{this.buildPrev()}
			{this.buildPages()}
			{this.buildNext()}
		</ul>;
	}
}

const LxPagination = (props) => {
	const { totalPages, currentPage, pagesInRange } = props;
	
	// Verifica se existem paginas
	if(totalPages === 0){
		return null;
	}

	return totalPages && <LxPaginationPager
		currentPage={ currentPage }
		totalPages={ totalPages }
		pagesInRange={ pagesInRange }
		onClick={ props.onClickPage }

		/>
}


// class LxPagination extends React.Component {

// 	render(){
// 		const { totalPages, currentPage, pagesInRange } = this.props;
		
		
// 		// Verifica se existem paginas
// 		if(totalPages === 0){
// 			return null;
// 		}

// 		return totalPages && <LxPaginationPager
// 			currentPage={ currentPage }
// 			totalPages={ totalPages }
// 			pagesInRange={ pagesInRange }
// 			onClick={ this.props.onClickPage }

// 			/>
// 	}
// }

LxPagination.propTypes = {
	onClickPage: React.PropTypes.func.isRequired
}

LxPagination.defaultProps = {
	pagesInRange: 6
}

export default LxPagination;