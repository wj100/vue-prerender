<template>
  <div id="g3">
      <p>注册组件</p>
       <el-button type="primary" @click="gotoRegister">注册页</el-button>
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
    gotoRegister() {
      this.$router.push('/register');
    },
  },
  mounted() {
  }
};
</script>

<style>
#g3 {
  width: 440px;
  height: 100%;
  padding: 60px;
  background-color: #fff;
  right: 0;
  border: 1px solid blue;
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
