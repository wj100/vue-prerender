<template>
  <div id="g3">
    <p class="g3-title">注册免费企业邮</p>
    <el-form class="g3-form" :rules="rules" ref="form" :model="form">
      <el-form-item prop="company">
        <el-input class="g3-form__company" v-model.trim="form.company" placeholder="请输入企业（团体）名称"></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input placeholder="请在此输入手机号" v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item class="g3-form__code" prop="code">
        <el-input placeholder="请输入验证码" v-model.trim="form.code">
          <template slot="append">
            <span v-if="countDown">{{countDown}}S后再试</span>
            <span v-else @click="getValidateCode">获取验证码</span>
          </template>
        </el-input>
      </el-form-item>
      <el-button
        type="primary"
        class="g3-form__submit"
        @click="onSubmit('form')"
        :loading="btnLoading"
      >{{btnLoading?'信息提交中':'同意协议并注册'}}</el-button>
    </el-form>
    <p class="g3-agreement">
      提交即代表同意
      <a target="_blank" href="https://qiye.163.com/html/service.html">《网易企业邮箱服务条款》</a>
      和
      <a target="_blank" href="http://gb.corp.163.com/gb/legal.html">《隐</a>
      <a target="_blank" href="http://gb.corp.163.com/gb/legal.html">私政策》</a>
    </p>
  </div>
</template>
<script>
export default {
  name: 'registerBox',
  data() {
    return {
      btnLoading: false,
      countDown: 0,
      YDvalidate: '',
      captchaIns: null,
      form: {
        company: '',
        phone: '',
        code: '',
      },
      rules: {
        company: [
          {
            required: true,
            message: '请输入公司名称',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 30,
            message: '长度在 3 到 30 个字符',
            trigger: 'blur',
          },
          {
            // eslint-disable-next-line no-useless-escape
            pattern: /^[^\=|^\s]+$/,
            message: '不能包含特殊字符',
            trigger: 'blur',
          },
          // {
          // 	pattern: /^[^\s]+$/,
          // 	message: '不能包含空格',
          // 	trigger: 'blur',
          // },
        ],
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur',
          },
          {
            pattern: /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/,
            message: '请输入正确手机号',
            trigger: 'blur',
          },
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur',
          },
          {
            min: 6,
            max: 6,
            message: '请输入正确验证码',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    handleGetCode(res) {
      if (res.resultCode === 200) {
        this.$message.success('验证码发送成功');
        this.countDown = 60;
        const c = setInterval(() => {
          if (this.countDown === 1) {
            clearInterval(c);
            this.captchaIns.refresh();
          }
          this.countDown -= 1;
        }, 1000);
      } else if (res.resultCode === 308) {
        this.captchaIns && this.captchaIns.popUp();
      } else {
        this.$message.error(res.msg || '网络异常，请刷新重试');
      }
    },
    getValidateCode() {
      this.$refs['form'].validateField('phone', (error) => {
        if (!error) {
          //   const params = { mobile: this.form.phone };
          //   $api.getCode(params).then((res) => {
          //     this.handleGetCode(res);
          //   });
        }
      });
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //DATracker.track('ym163_register', { target: 'Verification', desc: '同意协议并注册' });
          //   const params = {
          //     mobile: this.form.phone,
          //     corpName: this.form.company,
          //     code: this.form.code,
          //   };
          this.btnLoading = true;
          //   $api.agreeReg(params).then((res) => {
          //     this.btnLoading = false;
          //     if (res.resultCode === 200) {
          //       const { phone, company, code } = this.form;
          //       const us = `phone=${phone}&company=${company}&code=${code}`;
          //       location.href = '/register.html?' + encodeURIComponent(us);
          //       /* 本地存储传参 */
          //       sessionStorage.setItem('register_info', us);
          //     } else {
          //       this.$message.error(res.msg);
          //     }
          //   });
          // location.pathname='/register.html'
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    onSuccess() {
      this.msg = 'login success';
    },
    onFail() {
      this.msg = '';
    },
    onRefresh() {
      this.msg = '';
    },
  },
  mounted() {
    //     initNECaptcha(
    //       {
    //         element: '#g3',
    //         captchaId: '2e95e41aa7b041ebbd57071dee39b51e',
    //         width: '320px',
    //         mode: 'popup',
    //         onVerify: (err, data) => {
    //           if (err) return; // 当验证失败时，内部会自动refresh方法，无需手动再调用一次
    //           // 点击登录按钮后可调用服务端接口，以下为伪代码，仅作示例用
    //           const params = {
    //             mobile: this.form.phone,
    //             NECaptchaValidate: data.validate,
    //           };
    //           $api.getCode(params).then((res) => {
    //             // this.captchaIns.refresh()
    //             this.handleGetCode(res);
    //           });
    //         },
    //       },
    //       (onload = (instance) => {
    //         this.captchaIns = instance;
    //       }),
    //       (onerror = (err) => {
    //         console.warn(err);
    //       })
    //     );
  },
};
</script>

<style>
#g3 {
  width: 440px;
  height: 100%;
  padding: 60px;
  background-color: #fff;
  right: 0;
}

.g3-title {
  font-family: PingFang SC;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  color: #666666;
}
/* form表单 */

.g3-form {
  margin-top: 30px;
}

.g3-form .el-form-item {
  margin-bottom: 20px;
}

.g3-form .el-input__inner {
  height: 48px;
}

.g3-form__code .el-input-group__append {
  color: #2c70ff;
  background-color: #fff;
}

.g3-form__code .el-input-group__append:hover {
  cursor: pointer;
  opacity: 0.9;
}

.g3-form__code .el-input-group__append:active {
  opacity: 0.5;
}

.g3-form__submit {
  margin-top: 4px;
  width: 100%;
  height: 54px;
  font-size: 16px;
}

.g3-form__submit:hover {
  opacity: 0.9;
  cursor: pointer;
}
/* .g3-form input::placeholder{
        color: #868686;
        font-size: 14px;
    } */

.g3-agreement {
  width: 322px;
  margin-top: 16px;
  font-size: 14px;
  line-height: 28px;
  color: #676b70;
}

.g3-agreement a {
  white-space: nowrap;
  color: #155bd4;
}
</style>
