/* eslint-disable */
export var Util = {
	getChinese: function(strValue) {
		if (strValue != null && strValue != '') {
			var reg = /[\u4e00-\u9fa5]/g
			return strValue.match(reg).join('')
		} else return ''
	},
	dateFormat: function(date, fmt) {
		var o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'h+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds(),
			'q+': Math.floor((date.getMonth() + 3) / 3),
			S: date.getMilliseconds(),
		}
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
		}
		for (var k in o) {
			if (new RegExp('(' + k + ')').test(fmt)) {
				fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
			}
		}
		return fmt
	},
	fGetQuerySearch: function(name) {
		var sUrl = window.location.search.substr(1)
		var r = sUrl.match(new RegExp('(^|&)' + name + '=([^&]*)(&|$)'))
		return r == null ? null : decodeURI(r[2])
	},
	getQueryHash: function(name) {
		var sUrl = window.location.hash.substr(1)
		var r = sUrl.match(new RegExp('(^|&)' + name + '=([^&]*)(&|$)'))
		return r == null ? null : decodeURI(r[2])
	},
	setCookie: function(name, value, days) {
		var exp = new Date()
		days = days || 30
		exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
		document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
	},
	getCookie: function(name) {
		var strCookie = document.cookie
		var arr = strCookie.split(';')
		for (var i = 0; i < arr.length; i++) {
			var t = arr[i].split('=')
			if (t[0].trim() == name) {
				return t[1]
			}
		}
		return null
	},
	fCheckBrowser: function() {
		var ua = navigator.userAgent.toLowerCase()
		var types = ['ipad', 'iphone os', 'android', 'ucweb', 'windows ce', 'windows mobile']
		var match = false
		for (var i = 0; i < types.length; i++) {
			if (ua.indexOf(types[i]) != -1) {
				match = true
				break
			}
		}
		return match
	},
	/* 返回输入字符字符长度，中文算两个字符 */
	strlen(str, limit) {
		var len = 0
		var limitIndex = 0
		for (var i = 0; i < str.length; i++) {
			var c = str.charCodeAt(i)
			if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
				len++
			} else {
				len += 2
			}
			if (len > limit) {
				limitIndex = i
				break
			}
		}
		return { len: len, limitIndex: limitIndex }
	},
	isInViewPortOfOne(el) {
		const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
		const offsetTop = el.offsetTop
		const scrollTop = document.documentElement.scrollTop
		const top = offsetTop - scrollTop
		return top <= viewPortHeight
	},
}
export class Track {
	constructor(tracker) {
		this.tracker = tracker
	}
	getValue($dom, type) {
		let val
		if (type === 'account') {
			val =
				$($dom.parents()[1])
					.next()
					.find('.year-num')
					.val()
					.replace(/[^0-9]/g, '') || 1
		}
		if (type === 'year') {
			val =
				$($dom.parents()[1])
					.prev()
					.find('.account-num')
					.val()
					.replace(/[^0-9]/g, '') || 1
		}
		return Number(val)
	}
	PriceTrack($dom, type, num, op) {
		let [year_num, account_num] = [0, 0]
		if (type === 'year') {
			year_num = op ? (op === 'plus' ? num + 1 : num - 1) : num
			account_num = this.getValue($dom, type)
		}
		if (type === 'account') {
			account_num = op ? (op === 'plus' ? num + 1 : num - 1) : num
			year_num = this.getValue($dom, type)
		}
		this.tracker.track('click_query_price', { year_num, account_num })
	}
}
