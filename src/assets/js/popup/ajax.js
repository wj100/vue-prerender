/* eslint-disable */
export var qiye_url = {
	price: '//services.qiye.163.com/service/admin/price/?v=3',
	vip: '//services.qiye.163.com/service/admin/register/?v=3&qiyemail=1',
	dstrib: '//services.qiye.163.com/service/admin/agent/?v=3',
	epl: '//services.qiye.163.com/service/admin/agentemployee/?v=3',
	feedback: '//services.qiye.163.com/service/admin/feedback/',
	auto: '//services.qiye.163.com/service/official/queryCorpName',
	registerCode: '//services.qiye.163.com/service/official/cooperationSendCode',
	cooperation: '//services.qiye.163.com/service/official/cooperation',
}

export var QIYE_RUL = {
	queryDomainCount: '//services.qiye.163.com/service/official/queryDomainCount',
	sendCode: '//services.qiye.163.com/service/official/sendCode',
	register: '//services.qiye.163.com/service/official/register/',
	agentJoinSendCode: '//services.qiye.163.com/service/official/agentJoinSendCode',
	agentJoin: '//services.qiye.163.com/service/official/agentJoin',
}

window.response = {
	execute: function(txt) {
		if (this.callback) {
			var obj = {
				responseText: txt,
			}
			this.callback(obj)
		}
		XMLHttp.running = false
		this.callback = null
	},
	callback: null,
}

export var XMLHttp = {
	running: false,
	sendReq: function(url, callback, encodeUrl) {
		if (this.running) {
			return
		}
		this.running = true

		url += '&t=' + new Date().valueOf()

		var head = document.getElementsByTagName('head')[0] || document.documentElement,
			script = document.createElement('script')
		script.type = 'text/javascript'
		response.callback = callback
		url = url.replace(/([^\?]+\?[^\?]+)\?(\.*)/, '$1&$2')
		if (encodeUrl) {
			url = encodeURI(url)
		}
		script.src = url

		head.insertBefore(script, head.firstChild)

		setTimeout(function() {
			head.removeChild(script)
		}, 10000)
	},
}
