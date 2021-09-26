$(document).ready(function () {
  var loginData = {
    // 数据
    loginType: 'sms',
    passwordDom: $('.login-page .password'),
    passwordFormDom: $('.login-page .password-login-form'),
    smsDom: $('.login-page .sms'),
    smsFormDom: $('.login-page .sms-login-form'),
    loginBtnDom: $('.login-page .login-btn button'),
    phoneNumberInputDom: $('.login-page .sms-login-form .phone input'),
    smsInputDom: $('.login-page .sms-login-form .code input'),
    codeTipDom: $('.login-page .sms-login-form .code .tip'),

    // 方法
    /**
     * 设置登录方式
     * @param type
     */
    setLoginType: function (type) {
      if (type === 'password') {
        this.loginType = 'password';

        this.passwordDom.addClass('active');
        this.smsDom.removeClass('active');

        this.passwordFormDom.show();
        this.smsFormDom.hide();
      } else if (type === 'sms') {
        this.loginType = 'sms';

        this.smsDom.addClass('active');
        this.passwordDom.removeClass('active');

        this.smsFormDom.show();
        this.passwordFormDom.hide();
      }
    },

    /**
     * 登录
     */
    login: function () {
      // 密码登录
      if (this.loginType === 'password') {
        // TODO
      } else if (this.loginType === 'sms') {
        var phoneNumber = this.phoneNumberInputDom.val();
        var sms = this.smsInputDom.val();

        if (!phoneNumber || !/^[1]([3-9])[0-9]{9}$/.test(phoneNumber)) {
          $.message({
            message: '请先输入正确的手机号',
            type: 'error',
          });

          return;
        }

        if (!sms || !sms.trim()) {
          $.message({
            message: '请先输入验证码',
            type: 'error',
          });

          return;
        }

        // TODO 登录
      }
    },

    /**
     * 验证码
     */
    getCode: function () {
      var phoneNumber = this.phoneNumberInputDom.val();

      if (!phoneNumber || !/^[1]([3-9])[0-9]{9}$/.test(phoneNumber)) {
        $.message({
          message: '请先输入正确的手机号',
          type: 'error',
        });

        return;
      }

      // TODO 获取验证码
    },
  };

  // 设置默认登录方式
  loginData.setLoginType(loginData.loginType);

  // 切换密码登录
  loginData.passwordDom.on('click', function () {
    loginData.setLoginType('password');
  });

  // 切换短信登录
  loginData.smsDom.on('click', function () {
    loginData.setLoginType('sms');
  });

  // 登录
  loginData.loginBtnDom.on('click', function () {
    loginData.login();
  });

  // 获取验证码
  loginData.codeTipDom.on('click', function () {
    loginData.getCode();
  });
});
