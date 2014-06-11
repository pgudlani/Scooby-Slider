var page_now, k, l;

$('#paginated ul li').each(function(index){
    $(this).data('index',index);
    var div_data = '#'+$(this).data('div');
    $(div_data).hide();
});

(function(){
  // Paginated scroll
    l =new KineticScroll(document.getElementById('paginated'), {
    vertical: false,
    horizontal: true,
    horizontalBar: false,
    paginated: true,
    onPageCountChange: function(pageCount, currentPage) {
      k = currentPage;
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

var data_shown = '#'+$('#paginated ul').data('div');

$(document).on('pageChange', function(){
  page_now = $('#paginated ul li:nth-child('+(k+1)+')').data('index');
//----------------------    div data shown part starts

  var data_div = '#'+$('#paginated ul li:nth-child('+(k+1)+')').data('div');
  console.log(data_div);
  console.log(page_now);
  $(data_shown).html($(data_div).html());

});



