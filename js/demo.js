var k;
(function(){
  // Paginated scroll
    new KineticScroll(document.getElementById('paginated'), {
    vertical: false,
    horizontal: true,
    horizontalBar: false,
    paginated: true,
    onPageCountChange: function(pageCount, currentPage) {
      var html = '';
      for (var i = 0; i < pageCount; i++) {
        if (i === currentPage) {
          k = i;
          html += '<span class="current"></span>';
        } else {
          html += '<span></span>';
        }
      }
      document.getElementById('pager').innerHTML = html;
    },
    onCurrentPageChange: function(currentPage) {
      pages = document.querySelectorAll('#pager > span');
      Array.prototype.slice.apply(pages).forEach(function(page) {
        page.className = '';
      });
      pages[currentPage].className = 'current';
      k = currentPage;
    }
  });
})();



var slideCount = $('#paginated ul li').length;
var slideWidth = $('#paginated ul li').width();
var slideHeight = $('#paginated ul li').height();
var paginatedUlWidth = slideCount * slideWidth;
        
    

function moveLeft() {
    if(k==0)
    {
        $('#paginated ul').clearQueue().finish();
        $('#paginated ul li:last-child').prependTo('#paginated ul');
        $('#paginated ul').css('left', -500);
        $('#paginated ul').animate({
            left: + 0
        }, 200);
    }
    else
    {
        $('#paginated ul').clearQueue().finish();
        $('#paginated ul').animate({
            left: + slideWidth
          }, 200, function(){
            $('#paginated ul li:last-child').prependTo('#paginated ul');
            $('#paginated ul').css('left', '');
        });
    }
};

function moveRight() {
    if(k==slideCount-1)
    {
        $('#paginated ul').clearQueue().finish();
        $('#paginated ul li:first-child').appendTo('#paginated ul');
        $('#paginated ul').css('left', +500);
        $('#paginated ul').animate({
            left: + 0
        }, 200);
    }
    else
    {
        $('#paginated ul').clearQueue().finish();
        $('#paginated ul').animate({
            left: - slideWidth
        }, 200, function () {
            $('#paginated ul li:first-child').appendTo('#paginated ul');
            $('#paginated ul').css('left', '');
        });
    }
};


$(document).keydown(function(e){
    if(e.which==37) moveLeft();
    else if(e.which==39) moveRight();
});
