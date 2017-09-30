function setVisible(item, visible) {
  if (visible) {
    item.removeClass('tab-hidden');
    item.addClass('tab-visible');
  }
  else {
    item.removeClass('tab-visible');
    item.addClass('tab-hidden');
  }
}

function setHomeView() {
  setVisible($('.contact-main'), false);
  setVisible($('.home-main'), true);
}

function setContactView() {
  setVisible($('.home-main'), false);
  setVisible($('.contact-main'), true);
}

$('.home-btn').on('click', function(){
  setHomeView();
});

$('.contact-btn').on('click', function(){
  setContactView();
});

$('.left-author').on('click', function(){
  setHomeView();
});

$('.left-author.sub-author').on('click', function(){
  setHomeView();
});

$('.player-main').find('.play-pause-wrapper').on('click', function() {
  if($(this).hasClass('play-btn-playing')) {
    $(this).removeClass('play-btn-playing');
    $(this).addClass('play-btn-paused');
  }
  else
  {
    $(this).removeClass('play-btn-paused');
    $(this).addClass('play-btn-playing');
  }
});

$(document).ready(function(){
  var pathName = window.location.href;

  if(pathName.indexOf('#') == -1) {
     return;
  }

  var split = pathName.split('/');
  var last = split[split.length-1];
  console.log(pathName);
  console.log(last);
})
