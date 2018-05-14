var _listshop;
var _id;

$(init);

function init() {
  initList();

  $('body').on('click', '.del-shop', doDelShop);
  $('body').on('click', '.save-shop', doSaveShop);
  $('body').on('click', '.edit-shop', doEditShop);
}


function initList() {
  var id = parseInt($.cookie('id'));
  promiseData('GET', '/users/shoper_shops/' + id, null, cbListShop);
}


function cbListShop(e) {
  console.log(e);
  if (e.code == 0) {
    _listshop = e.data;
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($("#shopTmpl").render(e));
  } else if (e.code == -1) {
    relogin();
  }
}

function doDelShop() {
  var sid = $(this).attr('id')
  msgbox("请确认是否要删除店铺！","取消","确定",cbDel)

  function cbDel(e) {
    if (!e) {
      promiseData('GET', '/users/shop_del/' + sid, null, cbDelShop);
    }
  }
}

function cbDelShop(e) {
  console.log(e);
  if (e.code == 0) {
    initList()
  } else if (e.code == -1) {
    relogin();
  }
}


function doEditShop() {
  index = $(this).data('index');
  _id = $(this).data('id');

  $('#shop_name').val(_listshop[index].name);
  $('#shop_addr').val(_listshop[index].address);

  $("#shop-province").find("option[value='" + _listshop[index].addressProvince + "']").attr("selected",true);
  $("#shop-province").trigger("change");
  $("#shop-city").find("option[value='" + _listshop[index].addressCity + "']").attr("selected",true);
  $("#shop-city").trigger("change");
  $("#shop-county").find("option[value='" + _listshop[index].addressCounty + "']").attr("selected",true);

  $("#shop-businesstype").find("option[value='" + _listshop[index].businesstype + "']").attr("selected",true);
  $("#shop-businesstype").trigger("change");
  $("#shop-subtype").find("option[value='" + _listshop[index].subtype + "']").attr("selected",true);

 
}

function cbEditShop(e) {
  console.log(e);

  if (e.code == 0) {
    $("#basic .close").click()
    notifyInfo("更新数据成功！")
    initList()
  } else if (e.code == -1) {
    relogin();
  }

  
}

function doSaveShop() {
   obj = {
    id: _id,
    name: $('#shop_name').val(),
    address: $('#shop_addr').val(),
    businesstype: $('#shop-businesstype').val(),
    subtype: $('#shop-subtype').val(),
    addressProvince: $('#shop-province').val(),
    addressCity: $('#shop-city').val(),
    addressCounty: $('#shop-county').val()
  }

  promiseData('POST', '/users/shop_update/', JSON.stringify(obj), cbEditShop);
}