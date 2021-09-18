<template>
  <div class="register">
    <Header></Header>
    <div id="register">
      <div v-if="showBlock==='step'" class="step-block flex-col-center" v-cloak>
        <div class="reg-step">
          <el-steps :active="stepActive" space="200px" align-center>
            <el-step title="完成"></el-step>
            <el-step :title="step2Title"></el-step>
            <el-step title="配置密码"></el-step>
          </el-steps>
        </div>
        <p v-show="stepActive===2&&Number(formStep2.hasDomain)" class="reg-info">您的信息将被严格保密</p>
        <el-form
          v-if="stepActive===2"
          ref="formStep2"
          class="formStep2"
          :model="formStep2"
          :rules="formRules"
          @submit.native.prevent
          label-width="97px"
        >
          <el-form-item class="formStep2__hasdomain" label="是否有域名:">
            <el-radio-group v-model.trim="formStep2.hasDomain">
              <el-radio label="1">有域名</el-radio>
              <el-radio label="0">没有域名</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="Number(formStep2.hasDomain)"
            class="formStep2__domain"
            prop="domain"
            label="域名:"
          >
            <el-input
              v-model.trim="formStep2.domain"
              @keyup.enter.native="onSubmitStep2('formStep2')"
              placeholder="请输入所拥有的域名，如example.com"
            ></el-input>
          </el-form-item>
          <div v-else class="formStep2__domain--p">
            <p>没有域名无法使用免费企业邮箱</p>
            <p>试用专业版，网易帮你解决域名难题</p>
          </div>
          <el-button
            class="formStep2__btn"
            type="primary"
            @click="onSubmitStep2('formStep2')"
            :loading="btnLoading"
          >{{step2btn}}</el-button>
          <p class="formStep2__agreement" v-show="!Number(formStep2.hasDomain)">
            提交即代表同意
            <a target="_blank" href="https://qiye.163.com/html/service.html">《网易企业邮箱服务条款》</a>
            和
            <a target="_blank" href="http://gb.corp.163.com/gb/legal.html">《隐私政策》</a>
          </p>
        </el-form>
        <el-form
          v-if="stepActive===3"
          ref="formStep3"
          class="formStep3"
          :model="formStep3"
          :rules="formRules"
          label-width="97px"
        >
          <el-form-item class="formStep3__account" prop="adminAccount" label="管理员帐号:">
            <el-input v-model.trim="formStep3.adminAccount" placeholder="请输入登录的邮箱帐号">
              <!-- <template > -->
              <el-tooltip
                class="item"
                effect="dark"
                :content="`@${formStep2.domain}`"
                placement="right"
                slot="append"
              >
                <!-- <el-button style="width: 80px;">后缀<i class="el-icon-question"></i></el-button> -->
                <el-button style="width: 130px;padding: 0;">{{handlerDomain}}</el-button>
              </el-tooltip>
              <!-- </template> -->
            </el-input>
            <p class="account-tips">管理员帐号用来创建和管理企业邮箱</p>
          </el-form-item>

          <el-form-item prop="adminPass" label="管理员密码:">
            <el-input v-model.trim="formStep3.adminPass" type="password" placeholder="请输入登录的密码"></el-input>
          </el-form-item>

          <el-form-item prop="surePass" label="确认密码:">
            <el-input v-model.trim="formStep3.surePass" type="password" placeholder="请再次输入登录的密码"></el-input>
          </el-form-item>

          <el-form-item prop="eMail" label="联系邮箱:">
            <el-input v-model.trim="formStep3.eMail" placeholder="请输入联系邮箱用于后续重要信息发送"></el-input>
          </el-form-item>

          <div class="formStep3__btns">
            <el-button @click="prevStep">上一步</el-button>
            <el-button @click="finish('formStep3')" type="primary" :loading="btnLoading">完成</el-button>
          </div>
        </el-form>
      </div>
      <div v-if="showBlock==='thanks'" class="thanks-block flex-col-start" v-cloak>
        <h1>感谢选择网易企业邮箱</h1>
        <p>您的专属顾问会在2小时内与您联系，及时为您服务！</p>
        <p>可拨打{{askPhone}}，咨询开通进展</p>
        <div class="border-t" v-if="eid">
          <p class="mt24">您还可以继续完善信息，以便为您提供匹配得产品顾问</p>
          <p class="mt20">人员规模:</p>
          <el-radio-group
            class="thanks-block__companySize mt14"
            v-model="formThanks.companySize"
            @change="companySizeChange"
          >
            <!-- eslint-disable-next-line vue/valid-v-for -->
            <el-radio v-for="(item,index) in peopleOption" :label="index" border>{{item}}</el-radio>
          </el-radio-group>
          <el-select
            class="thank-block__oldEmail mt24"
            v-model="formThanks.oldEmail"
            placeholder="请选择原邮箱品牌"
          >
            <el-option v-for="(value, key) in oldOptions" :key="key" :label="value" :value="key"></el-option>
          </el-select>
          <p class="mt20">您希望了解的产品功能（可多选）</p>
          <el-checkbox-group class="thank-block__feat mt10" v-model="formThanks.featCheckList">
            <el-checkbox v-for="(item,index) in featOption" :key="index" :label="index">{{item}}</el-checkbox>
            <input
              v-show="showOtherInput"
              class="thank-block__feat-other"
              v-model="formThanks.featOther"
              type="text"
            />
          </el-checkbox-group>
        </div>

        <el-button class="thanks-block__btn" type="primary" @click="gotoIndex()">返回首页</el-button>
      </div>
      <div v-if="showBlock==='success'" class="success-block flex-col-start" v-cloak>
        <h1>恭喜您，已成功创建企业邮箱！</h1>
        <h1>帐号：{{formStep3.adminAccount}}@{{formStep2.domain}}</h1>
        <div class="sucess__checkService">
          <p>
            除
            <span>免费企业邮箱服务</span>外，您还需要以下哪些支持？
          </p>
          <el-checkbox-group class="checkService-group" v-model="serviceCheckList">
            <el-checkbox v-for="(item,index) in servicesOption" :key="index" :label="index">{{item}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <el-button type="primary" @click="openEmail">开启邮箱</el-button>
      </div>
    </div>
    <footer>
      <p>
        <a href="http://gb.corp.163.com/gb/home.shtml" target="_blank">关于网易</a>&nbsp;-&nbsp;
        <a href="http://help.mail.163.com/service.html" target="_blank">客户服务</a>&nbsp;-&nbsp;
        <a href="http://gb.corp.163.com/gb/legal.html" target="_blank">隐私服务</a>
      </p>
      <p>
        <a href="http://beian.miit.gov.cn/state/outPortal/loginPortal.action" target="_blank">
          ICP备案
          粤B2-20090191-18
        </a> -
        <a href="javascript:;">信用中国</a> -
        <a href="javascript:;">增值电信业务经营许可证：浙B2-20161040，B1.B2-20180288</a> 杭州网易竹邮科技有限公司 @版权所有
        <a
          class="item-center"
          style="margin-left: 4px;"
          href="https://ss.knet.cn/verifyseal.dll?sn=e12051044010020841301459&ct=df&pa=151131"
          target="_blank"
        >
          <img class="footer-content-image7" src="http://mimg.127.net/logo/knet.png" alt="可信网站" />
        </a>
      </p>
    </footer>
  </div>
</template>
<script>
// function getQueryString(name) {
//   let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
//   let r = decodeURIComponent(window.location.search).substr(1).match(reg);
//   if (r != null) {
//     return unescape(r[2]);
//   }
//   return null;
// }
function getCompanySiza(n) {
  if (n === undefined || n === null || n === '') {
    return { begin: '', end: '' };
  }
  const option = ['0-49', '50-99', '100-199', '200-499', '500-'];
  return {
    begin: option[n].split('-')[0],
    end: option[n].split('-')[1],
  };
}
function handleFavorites(arr, descr) {
  if (arr.length === 0) {
    return '';
  }
  const res = arr.map((item) => ({ id: item + 1 }));
  if (arr.includes(4)) {
    const index = res.findIndex((item) => item.id === 5);
    res[index].descr = descr;
  }
  return encodeURIComponent(JSON.stringify(res));
}
// @ is an alias to /src
import Header from '@/components/Header.vue';

export default {
  name: 'Register',
  components: {
    Header,
  },
  data() {
    const checkSurePass = (rule, value, callback) => {
      if (value === this.formStep3.adminPass) {
        return callback();
      }
      callback(new Error('两次输入的密码不一致'));
    };
    return {
      btnLoading: false,
      eid: '',
      peopleOption: ['0-49', '50-99', '100-199', '200-499', '500以上'],
      oldOptions: {
        Buy_XinLang: '新浪',
        Buy_263: '263企业邮箱',
        Buy_ZhongQiDongLi: '中企动力',
        Buy_ZhongZiYuan: '中资源',
        Null: '无',
        Buy_WanWang: '阿里企业邮箱',
        Buy_YiYou: '自建-亿邮',
        FreeMail: '免费个人邮',
        Lotus: '自建-IBM Lotus',
        Buy_QQ: '腾讯企业邮箱',
        Buy_21cn: '21cn',
        Buy_XinWang: '新网',
        Exchange: '自建-Exchange',
        Buy_35: '35互联',
        Buy_YingShi: 'coremail论客',
        Qita: '自建-其他',
      },
      featOption: ['邮箱容量', '收发管控', '垃圾邮件拦截', '邮箱客户端', '其他'],
      servicesOption: ['官网建站', '公众号/小程序建设', 'OA系统', '网站安全', '在线文档', '客户管理系统', 'SEO推广', '企业网盘', '外贸软件', '财税软件'],
      serviceCheckList: [],
      successAccount: '',
      askPhone: '',
      showBlock: 'step', // step  thanks  success
      stepActive: 2,
      formStep2: {
        hasDomain: '1',
        domain: '',
      },
      formStep3: {
        adminAccount: '',
        adminPass: '',
        surePass: '',
        eMail: '',
      },
      formThanks: {
        oldEmail: '',
        companySize: '',
        featCheckList: [],
        featOther: '',
      },
      formRules: {
        domain: [
          {
            required: true,
            message: '请输入域名',
            trigger: 'blur',
          },
          {
            pattern: /^([a-zA-Z\d][a-zA-Z\d-_]+\.)+[a-zA-Z\d-_][^ ]*$/,
            message: '域名格式有误',
            trigger: 'blur',
          },
        ],
        adminAccount: [
          {
            required: true,
            message: '请输入管理员帐号',
            trigger: 'blur',
          },
          {
            pattern: /^(\w){2,50}$/,
            message: '帐号应为2-50个字符，不包含空格',
            trigger: 'blur',
          },
        ],
        adminPass: [
          {
            required: true,
            message: '请输入管理员密码',
            trigger: 'blur',
          },
          {
            pattern: /^(\w|.){6,20}$/,
            message: '长度为6-20个字符，不包含空格',
            trigger: 'blur',
          },
        ],
        surePass: [
          { validator: checkSurePass, trigger: 'blur' },
          {
            required: true,
            message: '请再次输入密码',
            trigger: 'blur',
          },
        ],
        eMail: [
          {
            required: true,
            message: '请输入联系邮箱',
            trigger: 'blur',
          },
          {
            pattern: /^[a-zA-Z0-9_-]+(\.?[a-zA-Z0-9_-]+)+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '邮箱格式不正确',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  computed: {
    handlerDomain() {
      if (this.formStep2.domain.length < 11) {
        return '@' + this.formStep2.domain;
      }
      return this.formStep2.domain ? '@' + this.formStep2.domain.slice(0, 6) + '...' : '';
    },
    showOtherInput() {
      return this.formThanks.featCheckList.includes(4);
    },
    step2btn() {
      return Number(this.formStep2.hasDomain) ? '下一步' : '同意协议并立即试用';
    },
    step2Title() {
      if (this.stepActive === 3) {
        return '已完成';
      }
      if (this.stepActive === 2) {
        return '进行中';
      }
      return '';
    },
  },
  methods: {
    openEmail() {
      //DATracker.track('ym163_register', { target: 'Completion', desc: '开启邮箱' })
      sessionStorage.removeItem('register_info');
      if (this.eid) {
        // const p = {
        // 	eid: this.eid,
        // 	user_demand: this.serviceCheckList.join(),
        // }
        // $api.userDemand(p).then(res => {
        // 	if (res.resultCode === 200) {
        // 		location.search = ''
        // 		location.href = 'https://qiye.163.com/login/?from=ym'
        // 	}
        // })
      } else {
        location.href = 'https://qiye.163.com/login/?from=ym';
      }
    },
    prevStep() {
      this.stepActive = 2;
      this.$refs['formStep3'].clearValidate();
    },
    finish(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //DATracker.track('ym163_register', { target: 'Entrance', desc: '完成注册' })
          this.btnLoading = true;
          // const p = {
          // 	domain: this.formStep2.domain,
          // 	reg_mobile: this.reg_mobile,
          // 	org_name: this.org_name,
          // 	admin_account_name: this.formStep3.adminAccount,
          // 	admin_pass: this.formStep3.adminPass,
          // 	safe_email: this.formStep3.eMail,
          // 	code: this.code,
          // }
          // $api.regDomain(p).then(res => {
          // 	if (res.resultCode === 200 || res.resultCode === 407 || res.resultCode === 403) {
          // 		this.eid = (res.data && res.data.eid) || ''
          // 		this.showBlock = 'success'
          // 		this.btnLoading = false
          // 	} else {
          // 		this.$message.error(res.msg || '网络异常，请刷新重试')
          // 		this.btnLoading = false
          // 	}
          // })
        } else {
          return false;
        }
      });
    },
    gotoIndex() {
      const n = this.formThanks.companySize;
      const p = {
        eid: this.eid,
        staffRangeBegin: getCompanySiza(n).begin, //规模
        staffRangeEnd: getCompanySiza(n).end,
        originalSystem: this.formThanks.oldEmail === '' ? 'Null' : this.formThanks.oldEmail, //后端要'Null'
        favorites: handleFavorites(this.formThanks.featCheckList, this.formThanks.featOther),
      };
      // eslint-disable-next-line no-unused-vars
      let sendFlag = false;
      if (p.staffRangeBegin || p.originalSystem !== 'Null' || p.favorites) {
        sendFlag = true;
      }
      // this.eid && sendFlag && $api.regappend(p)
      //DATracker.track('ym163_register', { target: 'Profession', desc: '返回首页' })
      sessionStorage.removeItem('register_info');
      location.href = '/';
    },
    onSubmitStep2(formName) {
      if (!Number(this.formStep2.hasDomain)) {
        //DATracker.track('ym163_register', { target: 'Acc&Pwd_1', desc: '配置帐号密码_无域名' })
        this.btnLoading = true;
        /* 立即试用 */
        // const p = {
        // 	mobile: this.reg_mobile,
        // 	name: this.org_name,
        // 	code: this.code,
        // 	inputFrom: 'ymyreg'
        // }
        // $api.tryUse(p).then(res => {
        // 	if (res.code === 200 || res.code === 407 || res.code === 403) {
        // 		//注册成功
        // 		this.showBlock = 'thanks'
        // 		this.askPhone = (res.agent && res.agent.tel) || '95-163-188'
        // 		this.eid = res.eid || ''
        // 		this.btnLoading = false
        // 	} else {
        // 		this.$message.error(res.desc || '网络异常，请刷新重试')
        // 		this.btnLoading = false
        // 	}
        // })
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.btnLoading = true;
            //DATracker.track('ym163_register', { target: 'Acc&Pwd_2', desc: '配置帐号密码_有域名' })
            /* 域名检验 */
            // const p = {
            // 	domain: this.formStep2.domain,
            // }
            // $api.checkDomain(p).then(res => {
            // 	if (res.resultCode === 200) {
            // 		this.stepActive = 3
            // 		this.btnLoading = false
            // 	} else {
            // 		this.$message.error(res.msg)
            // 		this.formStep2.domain = ''
            // 		this.btnLoading = false
            // 	}
            // })
          } else {
            return false;
          }
        });
      }
    },
  },
  //   beforeCreate() {
  //     function str2Obj(str) {
  //       let obj = {};
  //       str &&
  //         str.split('&').forEach((item) => {
  //           obj[item.split('=')[0]] = item.split('=')[1];
  //         });
  //       return obj;
  //     }
  //     // let reg_mobile = getQueryString('mobile')
  //     // let org_name = getQueryString('name')
  //     // let code = getQueryString('code')
  //     /* 注册页拦截 */
  //     const phone = getQueryString('phone');
  //     const company = getQueryString('company');
  //     const code = getQueryString('code');
  //     const info = str2Obj(sessionStorage.getItem('register_info'));
  //     if (phone === info.phone && company === info.company && code === info.code) {
  //       this.reg_mobile = phone;
  //       this.org_name = company;
  //       this.code = code;
  //     } else {
  //       location.href = '/';
  //     }
  //   },
};
</script>
<style lang="less">
@import '../assets/css/register.less';
</style>
