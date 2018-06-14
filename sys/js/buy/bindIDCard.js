let rules = {
  name: {
    required: !0,
  },
  idCard: {
    required: !0
  },
}
let status = parseInt(cookie('approveState'));
let idCardImgInfo = ['身份证正面', '身份证背面'];

$(init);

function init() {
  initBindInfo();

  $('body').on('click', '#returnBtn', doReturn);

}

function doReturn() {
  goto('newTask.html')
}

function doSave(data) {
  
  let obj = {
    name: $('#name').val(),
    idcard: $('#id-card').val(),
  };
  for (let i = 1; i <= 2; i++) {
    let key = `idcardpng${i}`;
    obj[key] = $(`#id-card-ipt${i}`).attr('picurl');
    (!obj[key] && status === 2) ? obj[key] = cookie(key) : null;
    if (!obj[key]) {
      return errorInfo(`缺少${idCardImgInfo[i-1]}`);
    }
  }
  promiseData('POST', URL_BUY_BIND_ID_CARD, JSON.stringify(obj), cbBind);
}
function cbBind(e) {
  if (e.code === 0) {
    initUserInfo();
    alertBox(MSG_BIND_SUCCESS, ()=>{ goto("newTask.html") })
  } else if (e.code==99) {
    notifyInfo(e.message);
  } else if (e.code==-1) {
    relogin();
  };
}

async function initBindInfo() {
  // status = -1
  console.log(status)
  if ( status == -1 || status == null) {
    //未绑定
    $('.container').append(await renderTmpl(TMPL_BUY_BIND_IDCARD, {
      list:[1,1],
      imgInfo: idCardImgInfo,
      status: -1,
    }));
  } else {
    // 待审核或审核通过 显示已经绑定表单
    $(".container").append(await renderTmpl(TMPL_BUY_BIND_IDCARD, {
      name: cookie('name'),
      idCard: cookie('idcard'),
      idImg: [ cookie('idcardpng1'),cookie('idcardpng2') ],
      status: status,
      list: [1,1],
      imgInfo: idCardImgInfo,
      type: status !== 2 ? "disabled" : null,
      statusText: AUDIT_STATUS[status],
      imgPrefix: IMG_PREFIX
    }) );
  }
  $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
  $("#form-bind").validate({
    rules: rules,
    submitHandler: (e) => { doSave() }
  })
}
