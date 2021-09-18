/* eslint-disable */
import { validator } from './validator'
import { codeCountDown } from './countDown'
import { LoopSetter } from './LoopSetter'
import { Modal } from './modal'
// import { htmlOject } from './tongji';
import { registerNext } from './registerNext'
import { autoSearch } from './autoComplete'
import { QIYE_RUL } from './ajax'

let ModalForm
let ModalCodeDown
let ModalRegSubmitBtnLoopSetter
let ModalRegFormVal
let registerModal
let phoneflag = false

/* 获取免费试用弹窗关闭前提示内容 */
function getBeforeCloseContent() {
	let dom = document.createElement('div')
	dom.innerHTML = `<div class="before-close-dialog">
                    <h3><i></i>确定退出吗？</h3>
                    <p>完善信息即可体验更安全、专业的企业邮箱服务，确定退出？</p>
                    <div class="before-close-dialog-opt">
                        <a class="opt-close" href="javascript:;">退出</a><a class="opt-back" href="javascript:;">再看看</a>
                    </div>
               </div>`
	$(dom)
		.find('.opt-close')
		.on('click', function() {
			registerModal.ok()
			window.DATracker.track('open_Second_confirmation_page', { target: '退出' })
		})

	$(dom)
		.find('.opt-back')
		.on('click', function() {
			$('#modal_reg_form').show()
			$('.register-form-wrapper .before-close-dialog').hide()
			window.DATracker.track('open_Second_confirmation_page', { target: '再看看' })
		})
	return window.isShowBeforeCloseDialog == 1 ? dom : ''
}

/* 获取免费试用弹窗内容 */
function getRegisterContent(isPdf) {
	var registerDom = document.createElement('div')
	registerDom.className = 'register-form-wrapper'
	registerDom.innerHTML =
		'<div>' +
		'    <div class="register-form-tip">' +
		(isPdf
			? '<p class="pdf">下载报告</p>'
			: '<p>100万+企业客户口碑见证<br>现在开通试用，立享<span>买3年送3年</span></p>') +
		'    </div>' +
		'    <form id="modal_reg_form" onsubmit="return!1">' +
		'        <div class="form-item">' +
		'            <div class="form-item-box">' +
		'                <div class="form-item-input">' +
		'                    <input type="text" class="input modalRegName" autocomplete="off" id="modalRegName" name="name" placeholder="请输入完整的公司/单位名称"/>' +
		'                    <label class="form-item-label form-item-label-cname">' +
		(isPdf ? '<em>*</em>公司名称' : '') +
		'</label>' +
		'                    <ul></ul>' +
		'                </div>' +
		'            </div>' +
		'        </div>' +
		'        <div class="form-item">' +
		'            <div class="form-item-box">' +
		'                <div class="form-item-input">' +
		'                    <input type="text" class="input" id="modalRegMobile" autocomplete="off" name="mobile" placeholder="11位手机号"/>' +
		'                    <label class="form-item-label form-item-label-pname">' +
		(isPdf ? '<em>*</em>联系手机' : '') +
		'</label>' +
		'                </div>' +
		'            </div>' +
		'        </div>' +
		'        <div class="form-item form-code-item">' +
		'            <div class="form-item-box">' +
		'                <div class="form-item-input">' +
		'                    <input type="text" class="input" id="modalRegCode" autocomplete="off" name="code" placeholder="请输入验证码"/>' +
		'                    <label class="form-item-label form-item-label-sname">' +
		(isPdf ? '<em>*</em>验证码' : '') +
		'</label>' +
		'                </div>' +
		'                <div class="form-item-code">' +
		'                    <button class="get-modal-codeBtn" type="button" disabled>获取验证码</button>' +
		'                </div>' +
		'            </div>' +
		'        </div>' +
		'        <div class="form-item register-item-ct">' +
		'            <div class="form-item-box">' +
		'                <div class="form-item-input">' +
		'                    <label class="rf--label">' +
		'                        <input class="rf--radio" type="checkbox" id="modalRegAgreement"/>' +
		'                        <span class="rf--checkbox rf--radioInput"></span>' +
		'                    </label>' +
		'                    同意<a href="https://qiye.163.com/html/service.html" target="_blank" class="agreement-emitter" id="agreement-emitter">“网易企业邮箱服务条款”</a>和<a href="http://gb.corp.163.com/gb/legal.html" target="_blank">“隐私相关政策”</a>' +
		'                </div>' +
		'            </div>' +
		'        </div>' +
		'        <div class="form-item">' +
		'            <div class="form-item-box">' +
		'                <div class="form-item-input">' +
		'                    <button class="form-submit-btn ' +
		(isPdf ? 'form-submit-pdf-btn' : '') +
		'" type="submit" id="modalRegSubmitBtn" disabled>' +
		(isPdf ? '下载报告并免费体验邮箱' : '立即开通') +
		'</button>' +
		'                </div>' +
		'        </div>' +
		'    </form>' +
		'</div>'
	$(registerDom)
		.find('>div')
		.append(getBeforeCloseContent())
	ModalCodeDown = codeCountDown({ emitterBtn: registerDom.getElementsByClassName('get-modal-codeBtn')[0] })
	ModalRegSubmitBtnLoopSetter = new LoopSetter(registerDom.getElementsByClassName('form-submit-btn')[0])

	//企业联想
	if (!isPdf) new autoSearch(registerDom.getElementsByClassName('modalRegName')[0])
	return {
		content: registerDom,
		form: registerDom.getElementsByTagName('form')[0],
		modalCodeBtn: registerDom.getElementsByClassName('get-modal-codeBtn')[0],
		submitBtn: registerDom.getElementsByClassName('form-submit-btn')[0],
	}
}

/* 设置验证规则 */
function getModalRegFormVal() {
	let rules = validator({
		form: 'modal_reg_form',
		async: true,
		submitFn: function(form, params) {
			fetchRegistResult(form, ModalRegSubmitBtnLoopSetter, params)
		},
	})
		.add({
			target: 'modalRegName',
			rule_type: 'require',
			tips: '请输入完整的公司/单位名称',
			error: '请输入完整的公司/单位名称',
			afterBlur: function(opts, val, hasError) {
				window.DATracker.track('input_content', { type: '公司名称', value: val })
			},
		})
		.add({
			target: 'modalRegMobile',
			rule_type: 'mobile',
			tips: '请输入正确的手机号码',
			error: '请输入正确的手机号码',
			afterBlur: function(opts, val, hasError) {
				var that = this
				window.DATracker.track('input_content', { type: '联系手机', value: val })
				if (!hasError) {
					queryDomainCount(that, opts, val)
				}
			},
		})
		.add({
			target: 'modalRegCode',
			rule_type: 'require',
			error: '请输入短信验证码',
			afterBlur: function(opts, val, hasError) {
				window.DATracker.track('input_content', { type: '验证码', value: val })
			},
		})
		.add({
			target: 'modalRegAgreement',
			rule_type: 'agreement',
			afterChange: function(opts, hasError) {
				if (hasError) {
					$('#modalRegSubmitBtn').attr('disabled', true)
				} else {
					window.DATracker.track('check_agreement')
					$('#modalRegSubmitBtn').attr('disabled', false)
				}
			},
		})
	return rules
}

/**
 * 查询手机号码已开通域名数量
 * @param { Validator } scope
 * @param { Object } opts
 * @param { String } val
 */
function queryDomainCount(scope, opts, val) {
	phoneflag = false
	scope.addAsyncError({
		target: opts.target,
		error: '正在验证手机号码...',
	})
	scope.ajaxCount++
	$.ajax({
		url: QIYE_RUL.queryDomainCount,
		dataType: 'jsonp',
		timeout: 5000,
		data: { mobile: val },
		jsonp: 'jsonpcallback',
		success: function(res) {
			scope.ajaxCount--
			if (res.code == 200) {
				phoneflag = true
				$('.get-modal-codeBtn').attr('disabled', false)
				scope.removeAsyncError({
					target: opts.target,
				})
			} else {
				$('.get-modal-codeBtn').attr('disabled', true)
				var o = { target: opts.target, error: res.desc }
				scope.addAsyncError(o)
			}
		},
		error: function(e) {
			$('.get-modal-codeBtn').attr('disabled', true)
			scope.removeAsyncError({
				target: opts.target,
			})
		},
		complete: function() {
			scope.ajaxCount--
		},
	})
}

/**
 * 登记
 * @param { form } LS
 * @param { LoopSetter } LS
 * @param { String } params
 * @param { Function } cb   提交登记信息后的回调函数，不在弹窗显示信息
 */
function fetchRegistResult(form, LS, params, cb) {
	if (!LS.run) {
		LS.start()
		const deviceUdid = window.DATracker && window.DATracker.persistence.props.deviceUdid
		params += `&regPlan=2&inputFrom=ymytop&deviceUdid=${deviceUdid}`
		$.ajax({
			url: QIYE_RUL.register + '?' + params,
			dataType: 'jsonp',
			timeout: 10000,
			jsonp: 'jsonpcallback',
			success: function(res) {
				let phone = $('#modalRegMobile').val()
				if (res.code === 200) {
					if ($(ModalForm.submitBtn).hasClass('form-submit-pdf-btn')) {
						//   pdfDownload();
					}
					registerModal.ok()
					registerNext(res)
				} else if (res.code == 403 || res.code == 407) {
					showErrorModal({
						type: 'suc',
						msg: '<div class="submit-tip">恭喜您！信息提交成功<br>我司将第一时间与您取得联系</div>',
					})
				} else {
					var mTarget = ''
					if (res.code === 401 && res.key !== 'code') {
						res.key = 'code'
					}
					for (var i = 0; i < form.items.length; i++) {
						var reg = new RegExp(res['key'], 'i')
						if (!/contactname/i.test(form.items[i]) && reg.test(form.items[i])) {
							mTarget = form.items[i]
							break
						}
					}
					if (res.helpLink) {
						$(form.form)
							.find('.extra-tips')
							.show()
					} else {
						$(form.form)
							.find('.extra-tips')
							.hide()
					}
					if (mTarget) {
						form.showErrorTip({ target: mTarget, error: res.desc })
					} else {
						showErrorModal({ type: 'warn', msg: res.desc })
					}
				}
				if (window.DATracker) {
					window.DATracker.track('click_register', {
						page: '免费邮官网',
						target: window._target,
						desc: res.desc || '',
						phone: phone,
						eid: res.eid || '',
					})
				}
			},
			error: function(e) {
				if (e.statusText === 'timeout') {
					showErrorModal({ type: 'warn', msg: '系统繁忙注册超时，请稍后再试' })
				}
				window.DATracker.track('click_register', {
					page: '免费邮官网',
					target: window._target,
					desc: e.statusText,
				})
			},
			complete: function() {
				LS.clear()
			},
		})
	}
}

/**
 * 获取手机验证码
 * @param { Validator } vF
 * @param { Object } cD
 * @param { String } val
 * @param { String } type
 */
function sendCode(vF, cD, val, type) {
	var tarStr = type !== 'modal' ? 'regMobile' : 'modalRegMobile'
	$.ajax({
		url: QIYE_RUL.sendCode,
		dataType: 'jsonp',
		timeout: 5000,
		data: { mobile: val },
		jsonp: 'jsonpcallback',
		success: function(res) {
			vF.hideTip({ target: tarStr })
			if (res.code !== 200) {
				cD.clear()
				window.DATracker.track('get_sms_code', { desc: res.desc })
				vF.addAsyncError({ target: tarStr, error: res.desc })
			} else {
				window.DATracker.track('get_sms_code', { desc: '发送成功' })
				vF.removeAsyncError({ target: tarStr })
			}
		},
		error: function(e) {
			window.DATracker.track('get_sms_code', { desc: e.statusText })
			vF.removeAsyncError({ target: tarStr })
			cD.clear()
		},
	})
}

/* 失败弹窗 */
function showErrorModal(o) {
	var ts = ['suc', 'info', 'warn', 'fail']
	var cls = ts.indexOf(o.type) > -1 ? ' info_icon_' + o.type : ''
	var con =
		'<div class="popContent">' +
		'<div class="info_icon ' +
		cls +
		'"></div>' +
		'<div class="layer_msg " style="text-align: center">' +
		o.msg +
		'</div>' +
		'</div>'

	new Modal({
		title: o.title || '',
		width: 400,
		content: con,
		hasFooter: false,
	})
}

var Register = {
	init: function() {
		console.log($('[data-try-target]'), 999)
		$('[data-try-target]').on('click', function() {
			alert()
			var $this = $(this)
			let url = window.location.origin + window.location.pathname
			let target = $this.attr('data-try-target') || ''
			window.isShowBeforeCloseDialog = 0
			let htmlKey = url.replace(/http(.*)\/(.*).(html|htm)/, '$2')
			htmlKey = htmlKey != url ? htmlKey : 'index'
			let page = '免费邮官网'
			window._target = target
			window.DATracker.track('click_btn_register', { page: page, target: target })

			let isPdf = $this.hasClass('pdf-download')
			if (isPdf) {
			}
			ModalForm = getRegisterContent(isPdf)
			registerModal = new Modal({
				title: '',
				width: 900,
				content: ModalForm.content,
				customClassName: isPdf ? 'register-modal register-pdf-modal' : 'register-modal',
				onOpen: function() {
					ModalRegFormVal = getModalRegFormVal()
					ModalForm.modalCodeBtn.onclick = function() {
						if (!ModalCodeDown.run) {
							var val = document.getElementById('modalRegMobile').value
							if (/^[1-9]\d{10}$/.test(val)) {
								if (phoneflag) {
									ModalCodeDown.start()
									sendCode(ModalRegFormVal, ModalCodeDown, val, 'modal')
								}
							} else {
								ModalRegFormVal.showErrorTip({ target: 'modalRegMobile', error: '请输入正确的手机号码' })
							}
						}
					}
				},
				beforeClose: function() {
					if (window.isShowBeforeCloseDialog == 1 && $('#modal_reg_form').css('display') == 'block') {
						$('#modal_reg_form').hide()
						$('.register-form-wrapper .before-close-dialog').show()
						return false
					}
					return true
				},
				onClose: function() {
					window.DATracker.track('close_register', { target: '弹窗-提交必填信息' })
				},
				hasFooter: false,
			})
		})
	},
}
console.log(32333)
Register.init()
