var page_now, k, l;

$('#paginated ul li').each(function(index){
    $(this).data('index',index);
});

(function(){
  // Paginated scroll
    l =new KineticScroll(document.getElementById('paginated'), {
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
      jQuery(document).trigger('pageChange');
    },
    onCurrentPageChange: function(currentPage) {
      k = currentPage;
      jQuery(document).trigger('pageChange');
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
          }, 200, function(){
           jQuery(document).trigger('pageChange');
        });
    }
    else
    {
        $('#paginated ul').clearQueue().finish();
        $('#paginated ul').animate({
            left: + slideWidth
          }, 200, function(){
            $('#paginated ul li:last-child').prependTo('#paginated ul');
            $('#paginated ul').css('left', '');
            jQuery(document).trigger('pageChange');
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
          }, 200, function(){
           jQuery(document).trigger('pageChange');
        });
    }
    else
    {
        $('#paginated ul').clearQueue().finish();
        $('#paginated ul').animate({
            left: - slideWidth
        }, 200, function () {
            $('#paginated ul li:first-child').appendTo('#paginated ul');
            $('#paginated ul').css('left', '');
            jQuery(document).trigger('pageChange');
        });
    }
};


$(document).keydown(function(e){
    if(e.which==37) moveLeft();
    else if(e.which==39) moveRight();
});

$(document).on('pageChange', function(){
  page_now = $('#paginated ul li:nth-child('+(k+1)+')').data('index');
  console.log(page_now);
  pages = document.querySelectorAll('#pager > span');
  Array.prototype.slice.apply(pages).forEach(function(page) {
    page.className = '';
  });
  pages[page_now].className = 'current';
});

var data_shown = '#'+$('#paginated ul').data('div');


