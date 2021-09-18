<template>
  <div class="home">
    <Header msg="头部" />
    <div class="main-banner">
      <div class="slogan-box">
        <h1>免费开通公司专属域名邮箱</h1>
      </div>
      <div class="register-box">
        <RegisterBox />
      </div>
    </div>
    <section class="reason">
      <h1 class="section-title">为什么要使用网易免费企业邮箱</h1>
      <p class="section-subtitle">免费为企业提供专属域名后缀的邮箱，对内提升企业内部协同及管理效率，对外提升企业专业商务形象，助力企业快速发展。</p>
      <div class="reason__box">
        <div class="reason__box--card flex card-effect">
          <img src="../assets/image/icon0.png" alt />
          <h1>专业企业形象</h1>
          <p>创建“个性帐号@企业自主域名”的邮箱帐号，适用于专业的商务沟通。</p>
        </div>
        <div class="reason__box--card flex card-effect">
          <img src="../assets/image/icon1.png" alt />
          <h1>团队内部管理</h1>
          <p>管理后台可对成员帐号进行统一维护和管理，成员离职后帐号可回收。</p>
        </div>
        <div class="reason__box--card flex card-effect">
          <img src="../assets/image/icon2.png" alt />
          <h1>高效沟通协同</h1>
          <p>收发高速稳定，邮件列表实现快速群发，企业通讯录实现内部沟通“一秒找人”。</p>
        </div>
        <div class="reason__box--card flex card-effect">
          <img src="../assets/image/icon3.png" alt />
          <h1>信息安全防护</h1>
          <p>企业级反垃圾能力，安全数据防护，保障企业数据资产安全。</p>
        </div>
      </div>
      <a
        href="javascript:void(0)"
        class="reason-create button-hover focusform"
        role="customButton"
        data-free-creat="功能介绍"
      >立即创建</a>
    </section>
    <section class="edition">
      <h1 class="section-title">多版本邮箱满足不同企业需求</h1>
      <p class="section-subtitle">免费版供只有简单收发需求和专属域名需求的企业客户免费使用</p>
      <div class="edition__table">
        <div class="edition__table--title">
          <div class="edition__table--title-feat item-center b-left">功能特权</div>
          <div class="edition__table--title-base item-center flex">
            <div>
              <p>免费版</p>
              <p hidden>
                <span>0</span>元免费试用
              </p>
            </div>
            <i></i>
            <a
              href="javascript:void(0)"
              role="customButton"
              class="button-hover f14 focusform"
              data-free-creat="表格内立即创建"
            >立即创建</a>
          </div>
          <div class="edition__table--title-pro item-center">
            <div>
              <p>专业版</p>
              <p hidden>
                <span>0.29</span>元/用户/天
              </p>
            </div>
            <i></i>
            <!-- todo 弹窗 -->
            <span
              data-try-target="表格内免费试用"
              role="customButton"
              class="button-hover f14 try-use"
            >立即试用</span>
          </div>
        </div>
        <div class="edition__table--account">
          <span class="b-left">帐号</span>
          <span>帐号上限</span>
          <span>50</span>
          <span class="bgc-g">无上限，可能需要申请</span>
        </div>
        <div class="edition__table--capacity">
          <span class="bgc-g b-left">容量</span>
          <span class="bgc-g">邮箱容量</span>
          <span class="bgc-g">单个帐号3G</span>
          <span>无限容量</span>
        </div>
        <div class="edition__table--mailbox no-border">
          <div class="edition__table--col-title b-left">
            <span class="t-span">邮箱</span>
            <span class="t-span">-</span>
            <span class="t-span">商务交流</span>
          </div>
          <div>
            <span>邮件翻译</span>
            <span>域名赠送</span>
            <span>个性化群发</span>
            <span>发信上限</span>
            <span>邮件附件</span>
            <span>邮件删除</span>
            <span>邮件列表</span>
            <span>企业通讯录</span>
            <span>已读未读</span>
            <span>邮件备份</span>
            <span>邮件归档</span>
            <span>邮件加密</span>
            <span>隔离邮件转移</span>
            <span>自动转发</span>
            <span>来信分类</span>
            <span>邮件撤回</span>
          </div>
          <div>
            <span>
              <img src="../assets/image/no.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/no.svg" type="image/svg+xml" />
            </span>
            <span>30</span>
            <span>对外100封/天/帐号</span>
            <span>普通附件50M，不支持超大附件</span>
            <span>个人帐号自主删除邮箱内邮件</span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/no.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/no.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/no.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/no.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
          </div>
          <div class="bgc-g">
            <span>中英</span>
            <span>赠送试用域名</span>
            <span>500</span>
            <span>对外200封/天/帐号</span>
            <span>普通附件100M，超大附件16G</span>
            <span>管理员按需删除企业内邮件（30天内）</span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
          </div>
        </div>
        <div class="edition__table--mail">
          <div class="edition__table--col-title b-left bgc-g">
            <span class="t-span">邮件</span>
            <span class="t-span">-</span>
            <span class="t-span">收发管控</span>
          </div>
          <div class="bgc-g">
            <span>邮件审核</span>
            <span>收信过滤</span>
            <span>灵活收发机制</span>
            <span>收信黑白名单</span>
          </div>
          <div class="bgc-g">
            <span>
              <img src="../assets/image/no.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/no.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/no.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/no.svg" type="image/svg+xml" />
            </span>
          </div>
          <div>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>成员收发权限、成员收信过滤</span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
          </div>
        </div>
        <div class="edition__table--calendar">
          <div class="edition__table--col-title b-left">日历</div>
          <div>
            <span>日历-多端同步</span>
            <span>订阅日历</span>
            <span>日历-会议室功能</span>
          </div>
          <div>
            <span>
              <img src="../assets/image/no.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/no.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/no.svg" type="image/svg+xml" />
            </span>
          </div>
          <div class="bgc-g">
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
          </div>
        </div>
        <div class="edition__table--pan">
          <div class="edition__table--col-title b-left bgc-g">网盘</div>
          <div class="bgc-g">
            <span>企业网盘</span>
            <span>个人网盘</span>
          </div>
          <div class="bgc-g">
            <span>
              <img src="../assets/image/no.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/no.svg" type="image/svg+xml" />
            </span>
          </div>
          <div>
            <span>50G</span>
            <span>5G/人</span>
          </div>
        </div>
        <div class="edition__table--safe">
          <div class="edition__table--col-title b-left">帐号安全</div>
          <div>
            <span>IP登录限制</span>
            <span>异地登录提醒</span>
            <span>强制修改密码</span>
          </div>
          <div>
            <span>
              <img src="../assets/image/no.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/no.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/no.svg" type="image/svg+xml" />
            </span>
          </div>
          <div class="bgc-g">
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
          </div>
        </div>
        <div class="edition__table--control">
          <span class="b-left bgc-g">权限管控</span>
          <span class="bgc-g">自定义管理员</span>
          <span class="bgc-g">
            <img src="../assets/image/no.svg" type="image/svg+xml" />
          </span>
          <span>
            <img src="../assets/image/yes.svg" type="image/svg+xml" />
          </span>
        </div>
        <div class="edition__table--log">
          <span class="b-left">日志</span>
          <span>丰富日志</span>
          <span>
            <img src="../assets/image/no.svg" type="image/svg+xml" />
          </span>
          <span class="bgc-g">
            <img src="../assets/image/yes.svg" type="image/svg+xml" />
          </span>
        </div>
        <div class="edition__table--other">
          <div class="edition__table--col-title b-left bgc-g">其他</div>
          <div class="bgc-g">
            <span>换肤</span>
            <span>登录页设置</span>
            <span>启动页设置</span>
            <span>自定义内页logo</span>
            <span>企业内部公告</span>
            <span class="special-span">
              <span>全端可控客户端，无需服务</span>
              <span>器配置，无广告</span>
            </span>
          </div>
          <div class="bgc-g">
            <span>
              <img src="../assets/image/no.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/no.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/no.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/no.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/no.svg" type="image/svg+xml" />
            </span>
          </div>
          <div>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
            <span>
              <img src="../assets/image/yes.svg" type="image/svg+xml" />
            </span>
          </div>
        </div>
        <div class="edition__table--service b-bottom">
          <span class="b-left">服务</span>
          <span>服务时效</span>
          <span>3个工作日</span>
          <span class="bgc-g special-span">
            <span>
              7*16h
              实时响应：热线客服、在线客服
            </span>
            <span>
              7*16h
              2h内响应：邮件工单
            </span>
            <span>
              7*24h
              实时响应：智能机器人
            </span>
            <span>
              1V1 服务Plus
              （按企业定制付费）
            </span>
          </span>
        </div>
      </div>
    </section>
    <div class="blue flex">
      <h1 class="blue-title">24年专注邮箱领域，持续领跑同行</h1>
      <div class="bule-main flex">
        <p>
          <span>100万+</span>
          <span>合作企业</span>
        </p>
        <i></i>
        <p>
          <span>1000+项</span>
          <span>专业功能</span>
        </p>
        <i></i>
        <p>
          <span>24年</span>
          <span>邮箱运营经验</span>
        </p>
        <i></i>
        <p>
          <span>90%+</span>
          <span>产品好评率</span>
        </p>
      </div>
      <a
        href="javascript:void(0)"
        class="blue-create button-hover focusform"
        role="customButton"
        data-free-creat="24年...立即创建"
      >立即创建</a>
    </div>
    <footer>
      <div class="footer-content">
        <p>
          <a href="http://gb.corp.163.com/gb/home.shtml" target="_blank">关于网易</a>&nbsp;-&nbsp;
          <a href="http://help.mail.163.com/service.html" target="_blank">客户服务</a>&nbsp;-&nbsp;
          <a href="http://gb.corp.163.com/gb/legal.html" target="_blank">隐私服务</a>
        </p>
        <div>
          <p>
            <a href="http://beian.miit.gov.cn/state/outPortal/loginPortal.action" target="_blank">
              ICP备案
              粤B2-20090191-18
            </a> -
            <a href="javascript:;">信用中国</a> -
            <a href="javascript:;">增值电信业务经营许可证：浙B2-20161040，B1.B2-20180288</a> 杭州网易竹邮科技有限公司 @版权所有
          </p>
          <!-- <a class="item-center"
                        href="https://ss.knet.cn/verifyseal.dll?sn=e12051044010020841301459&ct=df&pa=151131"
                        target="_blank">
                        <img class="footer-content-image6" src="../assets/image/image6.png" alt="可信网站">
          </a>-->
          <a
            class="item-center"
            style="margin-left: 4px;"
            href="https://ss.knet.cn/verifyseal.dll?sn=e12051044010020841301459&ct=df&pa=151131"
            target="_blank"
          >
            <img class="footer-content-image7" src="http://mimg.127.net/logo/knet.png" alt="可信网站" />
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import RegisterBox from '@/components/RegisterBox.vue';

export default {
  name: 'Home',
  components: {
    Header,
    RegisterBox,
  },
  methods: {
    gotoRegister() {
      alert();
      this.$router.push('/register');
    },
  },
};
</script>
<style lang='less' scoped>
@import '../assets/css/home.less';
.register-box {
  width: 1200px;
  height: 520px;
  position: absolute;
  // width: 440px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: flex-end;
}
</style>
