const dev = require('./config/webpack.config.dev')
const common = require('./config/webpack.config.common')
const prod = require('./config/webpack.config.prod')
const merge = require("webpack-merge");

module.exports = config => {
	let commons = common(config)
	if (config.mode === 'development') {
		return merge(commons, dev)
	}
	return merge(commons, prod)
}