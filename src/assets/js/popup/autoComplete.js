/* eslint-disable */
import { qiye_url, XMLHttp } from './ajax'
export function autoSearch(dom) {
	this.value = $(dom).val()
	this.ele = $(dom)
	this.init()
}

/* 初始化生成下拉框 */
autoSearch.prototype.init = function() {
	var that = this

	var $ul = $(that.ele)
		.parent()
		.find('ul')
	$ul.on('click', 'li', function(e) {
		$(that.ele).val($(this).text())
		$ul.hide()
		e.stopPropagation()
	})

	$(that.ele).on('focus input propertychange', function(e) {
		that.getData()
		e.stopPropagation()
	})
}

autoSearch.prototype.getData = debounce(function() {
	var that = this
	var value = that.ele.val()
	if (value != '') {
		let url = qiye_url.auto + '?name=' + value
		$.ajax({
			url: url,
			dataType: 'jsonp',
			timeout: 10000,
			jsonp: 'jsonpcallback',
			success: function(res) {
				that.dataCallback(res)
			},
		})
	} else {
		$(that.ele)
			.parent()
			.find('ul')
			.hide()
	}
}, 300)

autoSearch.prototype.dataCallback = function(res) {
	var that = this
	var value = that.ele.val()
	var $ul = $(that.ele)
		.parent()
		.find('ul')
	if (res.code == '200' && res.data.length > 0) {
		$ul.html('')
		res.data.forEach(item => {
			var liHtml = item.replace(value, '<span>' + value + '</span>')
			$ul.append('<li>' + liHtml + '</li>')
		})
		$ul.show()
	} else {
		$ul.hide()
	}
}

function debounce(fn, delay) {
	/* 维护一个 timer */
	var timer = null

	return function() {
		/* 通过 ‘this’ 和 ‘arguments’ 获取函数的作用域和变量 */
		var context = this
		var args = arguments

		clearTimeout(timer)
		timer = setTimeout(function() {
			fn.apply(context, args)
		}, delay)
	}
}
