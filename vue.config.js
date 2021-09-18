const PrerenderSPAPlugin = require('prerender-spa-plugin')
const webpack = require('webpack')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const path = require('path')
module.exports = {
	configureWebpack: () => {
		if (process.env.NODE_ENV !== 'production') return
		return {
			plugins: [
				new PrerenderSPAPlugin({
					// 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
					staticDir: path.join(__dirname, 'dist'),
					routes: ['/', '/Home', '/register'],
					renderer: new Renderer({
						inject: {
							foo: 'bar',
						},
						headless: false,
						renderAfterDocumentEvent: 'render-event',
					}),
				}),
				new webpack.ProvidePlugin({
					$: 'jquery',
					jQuery: 'jquery',
					'windows.jQuery': 'jquery',
				}),
			],
		}
	},
	/* loader */
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'less',
			patterns: [
				path.resolve(__dirname, 'src/assets/css/global.less'),
				path.resolve(__dirname, 'src/assets/css/reset.less'),
			],
		},
	},
}
