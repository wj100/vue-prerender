/* eslint-disable */
var zIndex = 100000

/* extend */
function extend() {
	for (var i = 1; i < arguments.length; i++) {
		for (var key in arguments[i]) {
			if (arguments[i].hasOwnProperty(key)) {
				arguments[0][key] = arguments[i][key]
			}
		}
	}
	return arguments[0]
}
/* constructor */
export function Modal(options) {
	var that = this
	var defaults = {
		zIndex: zIndex++,
		width: 576,
		height: '',
		title: '提示',
		content: '',
		customClassName: '',
		hasFooter: true,
		onOpen: function() {},
		onOk: function() {},
		onClose: function() {},
		beforeClose: function() {
			return true
		},
		buttons: [
			{
				label: '取消',
				className: 'modal-cancel-btn',
				action: function() {
					that.close()
				},
			},
			{
				label: '确定',
				className: 'modal-ok-btn',
				action: function() {
					that.close()
				},
			},
		],
		hasMask: true,
	}
	that.mask = null
	if (!this.modal) {
		this.closeBtn = null
		this.opts = extend({}, defaults, options)
		if (typeof this.opts.width === 'number') {
			this.opts.width += 'px'
		}
		this.init()
	}
}
Modal.visableCount = 0
Modal.prototype.init = function() {
	_render.call(this)
	_bindEvents.call(this)
	this.setContent()
	Modal.visableCount++
	this.opts.onOpen()
}
Modal.prototype.open = function() {}

Modal.prototype.resize = function() {}

Modal.prototype.destroy = function() {
	_unbindEvents.call(this)
	this.mask = null
	this.modal = null
}

Modal.prototype.close = function() {
	if (!this.opts.beforeClose()) return
	var body = document.getElementsByTagName('body')[0]
	this.modal.parentNode.removeChild(this.modal)
	this.mask.parentNode.removeChild(this.mask)
	this.opts.onClose()
	Modal.visableCount--
	if (Modal.visableCount == 0) {
		setStyle(body, 'overflow: inherit')
	}
	this.destroy()
}

Modal.prototype.ok = function() {
	var body = document.getElementsByTagName('body')[0]
	this.modal.parentNode.removeChild(this.modal)
	this.mask.parentNode.removeChild(this.mask)
	this.opts.onOk()
	Modal.visableCount--
	if (Modal.visableCount == 0) {
		setStyle(body, 'overflow: inherit')
	}
	this.destroy()
}

Modal.prototype.hide = function() {
	Modal.visableCount--
	setStyle(this.modal, 'display: none')
}

Modal.prototype.show = function() {
	Modal.visableCount++
	setStyle(this.modal, 'display: block')
}

Modal.prototype.setContent = function() {
	if (typeof this.opts.content === 'string') {
		this.modalBody.innerHTML = this.opts.content
	} else if (this.opts.content.nodeType) {
		this.modalBody.appendChild(this.opts.content)
	}
}

function _render() {
	var body = document.getElementsByTagName('body')[0]
	var customClassName = this.opts.customClassName ? ' ' + this.opts.customClassName : ''
	var conCss = 'width:' + this.opts.width + ';' + (this.opts.height ? 'height:' + this.opts.height + 'px;' : '')
	this.modalContent = createEle('div', 'modal-content' + customClassName)
	_renderHeader.apply(this)
	_renderBody.apply(this)
	_renderFooter.apply(this)
	this.closeBtn = createEle('button', 'modal-close')
	this.closeBtn.innerHTML =
		'<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">\
    <path d="M1.01692 15.7818C1.16335 15.9282 1.40076 15.9282 1.5472 15.7818L7.98489 9.34273L14.4301 15.7886C14.5766 15.9351 14.814 15.9351 14.9604 15.7886L15.7559 14.9931C15.9023 14.8466 15.9023 14.6092 15.7559 14.4627L9.31058 8.01676L15.7652 1.56081C15.9116 1.41435 15.9116 1.17689 15.7652 1.03042L14.9698 0.234846C14.8233 0.0883845 14.5859 0.0883846 14.4395 0.234846L7.98482 6.69087L1.53715 0.242521C1.39071 0.0960666 1.15328 0.0960666 1.00685 0.242521L0.211392 1.03806C0.0649527 1.18451 0.0649528 1.42196 0.211392 1.56842L6.65914 8.01683L0.221508 14.4558C0.0750766 14.6023 0.0750766 14.8397 0.221508 14.9862L1.01692 15.7818Z" fill="#ACB3B8"/>\
    </svg>'
	this.closeBtn.setAttribute('aria-label', 'Close')
	this.modalContent.appendChild(this.closeBtn)
	setStyle(this.modalContent, conCss)
	this.modal = createEle('div', 'modal-wrapper')
	this.mask = createEle('div', 'modal-mask')
	setStyle(this.mask, 'z-index:' + (this.opts.zIndex - 1) + ';')
	this.modal.appendChild(this.modalContent)
	setStyle(this.modal, 'z-index:' + this.opts.zIndex + ';')
	body.appendChild(this.mask)
	body.appendChild(this.modal)
	setStyle(body, 'overflow: hidden')
}

function _renderHeader() {
	if (this.opts.title) {
		this.modalHeader = createEle('div', 'modal-header')
		this.modalHeader.innerHTML = this.opts.title
		this.modalContent.appendChild(this.modalHeader)
	}
}
function _renderBody() {
	this.modalBody = createEle('div', 'modal-body')
	this.modalContent.appendChild(this.modalBody)
}
function _renderFooter() {
	var that = this
	if (that.opts.hasFooter) {
		that.modalFooter = createEle('div', 'modal-footer')
		if (that.opts.buttons instanceof Array) {
			var buttons = that.opts.buttons
			for (var i = 0; i < buttons.length; i++) {
				;(function innerFn(i) {
					var clsName = buttons[i].className ? 'modal-ft-btn ' + buttons[i].className : 'modal-ft-btn'
					var btnItem = createEle('button', clsName, buttons[i].label)
					if (buttons[i].action) {
						btnItem.onclick = function() {
							buttons[i].action()
						}
					}
					that.modalFooter.appendChild(btnItem)
				})(i)
			}
		}
		that.modalContent.appendChild(this.modalFooter)
	}
}

function createEle(tag, cls, text) {
	var ele = document.createElement(tag)
	if (cls) {
		ele.className = cls
	}
	if (text) {
		ele.innerHTML = text
	}
	return ele
}

function setStyle(node, strCss) {
	function endsWith(str, suffix) {
		var l = str.length - suffix.length
		return l >= 0 && str.indexOf(suffix, l) == l
	}
	var sty = node.style,
		cssText = sty.cssText
	if (!endsWith(cssText, ';')) {
		cssText += ';'
	}
	sty.cssText = cssText + strCss
}

function _bindEvents() {
	var that = this
	that.closeBtn.onclick = function() {
		that.close()
	}
}

function _unbindEvents() {
	this.closeBtn.onclick = null
}
