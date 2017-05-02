import axios from 'axios';
// CRUD

module.exports ={
	create: () => {

	},
	read: (url, page=1, perPage=2, order) => {
		let qs = {
			limit: perPage,
			offset: page-1
		};
		if(order){
			qs['order'] = order;
		}
		return {
			type: 'GET_DATASET',
			payload: axios.get(url, {params: qs})
		}
	},
	update: () => {

	},
	delete: () => {

	}
}

