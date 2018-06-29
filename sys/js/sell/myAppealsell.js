let _id;
let pageData = Object.assign({}, PAGE_DATA);
// pageData.pageSize= 1
$(init);

function init() {
  initList(pageData);
  $('body').on('click', '.detail-appeal', doDetail);
  $('body').on('click', '.m-close', doClose);
  $('body').on('click', '.b-close', doClose);
}

function initList() {
  let param = Object.assign(pageData, {type:1});
  promiseTmpl('GET', '/tmpl/buy/myappeal.tmpl', ['/complains_list', encodeQuery(param)].join('?'),null, cbList)
}


function cbList(r, e) {
  let ret = e;
  _listtask = ret.data;
  ret.imgPrefix = IMG_PREFIX;
  Object.assign(ret, pageData);
  totalPages = Math.ceil(ret.total/pageData.pageSize);
  $(".portlet-body .u-wrap").remove();
  $(".portlet-body").prepend($.templates(r).render(ret, rdHelper));
  if ($('.table-pg').text() == '') initPage(totalPages);

  $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
}





function doDetail() {
  var obj = {
    buyerTaskId: $(this).data("tid")
  }
  promiseTmpl('GET', '/tmpl/buy/appeal_detail.tmpl', ['/get_complain_detail', encodeQuery(obj)].join('?') ,null, cbDetail)
}

function cbDetail(r, e) {
  let ret = e;
  ret.data.imgPrefix = IMG_PREFIX;
  $(".g-detail").empty();
  $(".g-detail").append($.templates(r).render(ret.data, rdHelper));
  $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
  $(".g-detail").show();
}





function initPage(totalPages) {
  $('.portlet-body .table-pg').twbsPagination({
    totalPages: totalPages || 1,
    onPageClick: function(event, page) {
      pageData.pageIndex = page - 1;
    }
  })
}


function doClose() {
  $('.g-detail').hide()
}