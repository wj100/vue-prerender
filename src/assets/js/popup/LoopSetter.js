/* eslint-disable */
/**
 * 登记按钮文案提示
 * @param { element } ele
 */
export function LoopSetter(ele) {
	this.txt = '信息提交中'
	this.ele = ele
	this.oleText = ''
	this.timer = null
	this.run = false
	this.oleText = this.ele.innerHTML
}
LoopSetter.prototype.init = function(ele) {}
LoopSetter.prototype.start = function(txt) {
	var that = this
	var dot = '...'
	var idx = 0
	if (!that.timer) {
		that.ele.innerHTML = that.txt + dot
	} else {
		that.clear()
	}
	this.run = true
	that.timer = setInterval(function() {
		that.ele.innerHTML = that.txt + dot.slice(idx)
		idx < 3 ? idx++ : (idx = 0)
	}, 500)
}
LoopSetter.prototype.clear = function() {
	var that = this
	this.run = false
	this.ele.innerHTML = that.oleText
	window.clearInterval(that.timer)
}
