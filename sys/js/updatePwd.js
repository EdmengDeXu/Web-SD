var _id;
var _pwd;

$(init);

function init() {
  _id = cookie('id')
  _pwd = cookie('password')
  $('body').on('click', '#saveBtn', doSave);
}

function doSave(e) {
  var oldPwd = $('#oldPwd').val()
  var newPwd = $('#newPwd').val()
  var cnfPwd = $('#cnfPwd').val()
  $('.form-group').removeClass('has-error')

  if (_pwd != oldPwd) {
    notifyInfo('输入旧密码有误！')
    $('.form-op').addClass('has-error')
  }else if (newPwd == "") {
    notifyInfo('请输入密码！')
    $('.form-new').addClass('has-error')
  }else if (newPwd != cnfPwd) {
    notifyInfo('两次输入密码不匹配！')
    $('.form-cnf').addClass('has-error')
  }else {
    data = {
      oldPassword: oldPwd,
      password: newPwd
    }
    promiseData('POST',URL_SELL_PASSWD,JSON.stringify(data), cbSave)
  }
}

function cbSave(e) {
  if (e.code == 0) {
    notifyInfo(MSG_UPDATE_SUCCESS)
  } else if (e.code == 99 ) {
    notifyInfo(e.message);
  } else if (e.code == -1) {
    relogin();
  }
}