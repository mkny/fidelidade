import _ from 'lodash'

module.exports = {

	normalizeField: (fields) => {
		let fieldData = {};

		if(_.isArray(fields)){
			fields.forEach((value, key) => {
				fieldData[value] = {props: {}}
			})
		} else if(_.isObject(fields)){
			fieldData = fields
		}

		return fieldData;
	},

	sanitizeFieldNames: (fields, type) => {
		return _.map(fields, (item, name) => {
			return item.name || (isNaN(name) ? name:item)
		}).filter(o => {
			const item = fields[o];
			return (item && (item[type] === undefined || item[type])) || true
		})
	},

	sleep: ms => new Promise(resolve => setTimeout(resolve, ms))
}