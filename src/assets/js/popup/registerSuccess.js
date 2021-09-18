import {Modal} from './modal';

/* 注册成功弹窗 */
export const openRegisterSucModal = function(res) {
    var dom = document.createElement('div');

dom.innerHTML = `<div class="modal-content-body"><h2>感谢选择网易企业邮箱</h2>
                <p>您的专属顾问会在<span class="blue">2小时</span>内与您联系，及时为您服务<br>
                可拨打<span class="red">${res.agent?res.agent.tel:'95-163-188'}</span>，咨询开通进展。</p>
                <div class="border"></div>
                <div class="bg">恭喜您！信息提交成功</div></div>              
`
    new Modal({
        title: '',
        width: 900,
        content: dom,
        customClassName: 'register-success-modal',
        onClose: function () {
            window.DATracker.track('close_register',{target:'弹窗-注册成功提醒'});
        },
        hasFooter: false
    });
}