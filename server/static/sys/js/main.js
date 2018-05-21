$(init)

function init() {
  var h = $(document).height();
  $("iframe").height(h - 50);

  $('[data-button]').on('click', function(e) {
    var platform = $(this).data('platform')
    var pageName = $(this).data('button') + '.html';
    platform ? pageName += `?platform=${platform}` : null;

    $("#mainframe", parent.document.body).attr("src", pageName);
  });


  $('#exitBtn').on('click', function(e) {
      location.href = 'index.html'
  });


}
