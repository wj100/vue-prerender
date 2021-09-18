/* eslint-disable */
import { Modal } from './modal'
import { openRegisterSucModal } from './registerSuccess'
import { Util } from './util'

let getContent = function() {
	return `<div class="register-next-form-wrapper">
                <div class="wrapper-header">您还可以继续完善信息，以便为您有针对性的匹配产品顾问</div>
                <div class="wrapper-body">
                    <div class="item item-staff-size clearfix">
                        <h2>人员规模：</h2>
                        <ul>
                            <li data-min="0" data-max="49">0～49人</li>
                            <li data-min="50" data-max="99">50～99人</li>
                            <li data-min="100" data-max="199">100～199人</li>
                            <li data-min="200" data-max="499">200～499人</li>
                            <li data-min="500">500人以上</li>
                        </ul>
                    </div>
                    <div class="item item-mail-brand" style="margin-top: 80px;">
                        <div class="select">请选择原邮箱品牌</div>
                        <ul>
                            <li class="title">请选择邮箱品牌</li>
                            <li data-value="Buy_QQ">腾讯企业邮箱</li>
                            <li data-value="Buy_WanWang">阿里企业邮箱</li>
                            <li data-value="Buy_263">263企业邮箱</li>
                            <li data-value="Buy_YingShi">coremail论客</li>
                            <li data-value="Buy_ZhongQiDongLi">中企动力</li>
                            <li data-value="Buy_ZhongZiYuan">中资源</li>
                            <li data-value="Buy_35">35互联</li>
                            <li data-value="Buy_21cn">21cn</li>
                            <li data-value="Buy_XinLang">新浪</li>
                            <li data-value="Buy_XinWang">新网</li>
                            <li data-value="Exchange">自建-Exchange</li>
                            <li data-value="Lotus">自建-IBM Lotus</li>
                            <li data-value="Buy_YiYou">自建-亿邮</li>
                            <li data-value="Qita">自建-其他</li>
                            <li data-value="FreeMail">免费个人邮</li>
                            <li data-value="Null">无</li>
                        </ul>
                    </div>
                    <div class="item item-plan-2">
                        <input type="text" placeholder="请输入联系人姓名，方便我们称呼您"/>
                        <label></label>
                    </div>
                    <div class="item item-favorites clearfix">
                        <h2>您希望了解的产品功能（可多选）：</h2>
                        <label><input type="checkbox" value="1">邮箱容量</label>
                        <label><input type="checkbox" value="2">收发管控</label>
                        <label><input type="checkbox" value="3">垃圾邮件拦截</label>
                        <label class="except"><input type="checkbox" value="4">邮箱客户端</label>
                        <label class="except"><input type="checkbox" value="5" class="checkbox-other">其它</label>
                        <textarea placeholder="请填写"></textarea>
                    </div>
                </div>
                <div class="wrapper-footer">
                    <a href="javascript:;" class="js-submit">立即提交</a>
                </div>
            </div>`
}

export const registerNext = function(data) {
	let modal = new Modal({
		title: '',
		width: 900,
		content: getContent(),
		customClassName: 'register-next-modal',
		onClose: function() {
			openRegisterSucModal(data)
			window.DATracker.track('close_register', { target: '弹窗-提交补充信息' })
		},
		onOk: function() {
			openRegisterSucModal(data)
		},
		hasFooter: false,
	})

	let $modal = $('.register-next-modal')

	/* 人员规模 */
	$modal.find('.item-staff-size li').click(function() {
		let $this = $(this)
		if ($this.hasClass('active')) {
			return
		} else {
			$this
				.addClass('active')
				.siblings()
				.removeClass('active')
			window.DATracker.track('input_content', { type: '企业规模', value: $this.html() })
		}
	})

	/* 联系人姓名 */
	$modal.find('.item-plan-2 input').blur(function() {
		if ($(this).val() != '') {
			window.DATracker.track('input_content', { type: '联系人', value: $(this).val() })
		}
	})

	/* 原邮箱选择 */
	$modal.find('.item-mail-brand').click(function() {
		$(this).toggleClass('active')
	})

	$modal.find('.item-mail-brand li').click(function(e) {
		let $this = $(this)
		if ($this.hasClass('active') || $(e.target).hasClass('title')) {
			return
		} else {
			$this
				.addClass('active')
				.siblings()
				.removeClass('active')
			$this
				.parents('.item-mail-brand')
				.addClass('onselect')
				.find('.select')
				.html($this.html())
				.attr('data-value', $this.attr('data-value'))
			window.DATracker.track('input_content', { type: '原邮箱厂商', value: $this.html() })
		}
	})

	$modal.find('.item-favorites input').click(function() {
		let $this = $(this)
		let value = ''
		let $textarea = $('.register-next-modal .item-favorites textarea')
		let textareaValue = ''
		$modal.find('.item-favorites input:checked').each(function(index, element) {
			value +=
				',' +
				$(element)
					.parent()
					.text()
			if ($(element).hasClass('checkbox-other')) {
				textareaValue = $textarea.val()
			}
		})
		value = value.substring(1)

		if ($this.hasClass('checkbox-other')) {
			if ($this.is(':checked')) {
				textareaValue = $textarea.val()
				$textarea.css('visibility', 'visible')
				$textarea.focus()
			} else {
				$textarea.css('visibility', 'hidden')
			}
		}
		window.DATracker.track('input_content', { type: '关注的邮箱功能', value: value, textareaValue: textareaValue })
	})

	$modal.find('textarea').on('input propertychange', function() {
		let $this = $(this)
		let value = $this.val()
		let str = Util.strlen(value, 400)
		if (str.len > 400) {
			console.log(value.substring(0, str.limitIndex))
			$this.val(value.substring(0, str.limitIndex))
		}
	})

	$modal.find('textarea').on('blur', function() {
		let $textarea = $('.register-next-modal .item-favorites textarea')
		let value = ''
		let textareaValue = ''
		$modal.find('.item-favorites input:checked').each(function(index, element) {
			value +=
				',' +
				$(element)
					.parent()
					.text()
			if ($(element).hasClass('checkbox-other')) {
				textareaValue = $textarea.val()
			}
		})
		window.DATracker.track('input_content', { type: '关注的邮箱功能', value: value, textareaValue: textareaValue })
	})

	$modal.find('.js-submit').click(function() {
		let $this = $(this)
		$this.attr('disabled', true)
		let params = {}

		params.eid = data.eid

		params.staffRangeBegin = $modal.find('.item-staff-size li.active').attr('data-min') || ''
		let staffRangeEnd = $modal.find('.item-staff-size li.active').attr('data-max') || ''
		if (staffRangeEnd) {
			params.staffRangeEnd = staffRangeEnd
		}

		let contactName = $modal.find('.item-plan-2 input').val()
		if (contactName) {
			params.contactName = contactName
		}

		params.originalSystem = $modal.find('.select').attr('data-value') || 'Null'

		let favorites = []
		$modal.find('.item-favorites input:checked').each(function(index, element) {
			if ($(element).val() == 5) {
				favorites.push({ id: '5', descr: $modal.find('textarea').val() })
			} else {
				favorites.push({ id: $(element).val() })
			}
		})
		params.favorites = JSON.stringify(favorites)

		$.ajax({
			url: '//services.qiye.163.com/service/official/regappend/',
			data: params,
			dataType: 'jsonp',
			timeout: 10000,
			jsonp: 'jsonpcallback',
			success: function(res) {
				window.DATracker.track('click_btn_supplement')
				if (res.code === 200) {
					modal.ok()
				} else {
				}
			},
			error: function(e) {
				if (e.statusText === 'timeout') {
				}
			},
			complete: function() {
				$this.attr('disabled', false)
			},
		})
	})

	return modal
}
