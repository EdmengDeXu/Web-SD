$(init)

function init() {

  initStatus();
  $('[data-button]').on('click', function(e) {
    var pageName = $(this).data('button') + '.html'
    $("#mainframe", parent.document.body).attr("src", pageName);
  });

}

function initStatus() {
  promise('GET', URL_BUY_INFO, null, cbInitStatus, null);
}

function cbInitStatus(e) {
  let approveState = parseInt(e.approveState);
  let bankCardState = parseInt(e.bankcardState);
  let jingdongState = parseInt(e.jingdongList[0] && e.jingdongList[0].approve >=0? e.jingdongList[0].approve : -1);
  let taobaoState = parseInt(e.taobaoList[0] && e.taobaoList[0].approve >=0 ? e.taobaoList[0].approve : -1);

  toggleBindStatus('taobao', taobaoState);
  toggleBindStatus('id-card', approveState);
  toggleBindStatus('jingdong', jingdongState);
  toggleBindStatus('bank-card', bankCardState);
}

function toggleBindStatus(id, status) {
  if ([0, 1].includes(status)) {
    $(`#${id} .task-status`).removeClass('status-no-bind').text(AUDIT_STATUS[status]);
    $(`#${id} a`).removeClass('btn-outline').text(AUDIT_STATUS[status]);
  } else if (status === 2) {
    $(`#${id} .task-status`).text(AUDIT_STATUS[status]);
    $(`#${id} a`).text(AUDIT_STATUS[status]);
  }
}
