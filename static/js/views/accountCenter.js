// dialog 是异步加载进来的，要等到 dialog 加载完毕之后才执行去获取 dialog 中的 DOM 节点
$(document).on('dialogLoaded', function () {
  var accountCenterData = {
    replacePhoneDom: $('.account-center-page .replace-phone'),
    replacePhoneSubmitDom: $('.replace-phone-dialog .submit'),

    // 更换手机号表单
    originalPhoneInputDom: $('.replace-phone-dialog .original-phone input'),
    newPhoneInputDom: $('.replace-phone-dialog .new-phone input'),
    verificationCodeInputDom: $('.replace-phone-dialog .verification-code input'),

    modifyPasswordDom: $('.account-center-page .modify-password'),
    modifyPasswordSubmitDom: $('.modify-password-dialog .submit'),

    // 更换手机号表单
    originalPasswordInputDom: $('.modify-password-dialog .original-password input'),
    newPasswordInputDom: $('.modify-password-dialog .new-password input'),
    confirmPasswordInputDom: $('.modify-password-dialog .confirm-password input'),

    replacePhoneDialog: function () {
      layer.open({
        title: '更换手机号',
        type: 1,
        content: $('.replace-phone-dialog'),
        move: false,
      });
    },

    modifyPasswordDialog: function () {
      layer.open({
        title: '修改密码',
        type: 1,
        content: $('.modify-password-dialog'),
        move: false,
      });
    },

    replacePhoneSubmit: function () {
      var originalPhone = this.originalPhoneInputDom.val();
      var newPhone = this.newPhoneInputDom.val();
      var verificationCode = this.verificationCodeInputDom.val();

      if (!originalPhone || !/^[1]([3-9])[0-9]{9}$/.test(originalPhone)) {
        $.message({
          message: '请先输入正确的原手机号',
          type: 'error',
        });

        return;
      }

      if (!newPhone || !/^[1]([3-9])[0-9]{9}$/.test(newPhone)) {
        $.message({
          message: '请先输入正确的新手机号',
          type: 'error',
        });

        return;
      }

      if (!verificationCode || !verificationCode.trim()) {
        $.message({
          message: '请先输入验证码',
          type: 'error',
        });

        return;
      }

      // TODO 提交
    },

    modifyPasswordSubmit: function () {
      var originalPassword = this.originalPasswordInputDom.val();
      var newPassword = this.newPasswordInputDom.val();
      var confirmPassword = this.confirmPasswordInputDom.val();

      if (!originalPassword) {
        $.message({
          message: '请先输入原密码',
          type: 'error',
        });

        return;
      }

      if (!newPassword) {
        $.message({
          message: '请先输入新密码',
          type: 'error',
        });

        return;
      }

      if (!confirmPassword) {
        $.message({
          message: '请再次输入新密码',
          type: 'error',
        });

        return;
      }

      if (newPassword !== confirmPassword) {
        $.message({
          message: '新密码输入不一致',
          type: 'error',
        });

        return;
      }

      // TODO 提交
    },
  };

  // 更换手机号
  accountCenterData.replacePhoneDom.on('click', function () {
    accountCenterData.replacePhoneDialog();
  });

  // 更换手机号提交
  accountCenterData.replacePhoneSubmitDom.on('click', function () {
    accountCenterData.replacePhoneSubmit();
  });

  // 修改密码
  accountCenterData.modifyPasswordDom.on('click', function () {
    accountCenterData.modifyPasswordDialog();
  });

  // 修改密码提交
  accountCenterData.modifyPasswordSubmitDom.on('click', function () {
    accountCenterData.modifyPasswordSubmit();
  });
});
