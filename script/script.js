var audioPlaying = false;
var currentAudioSource;

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
  setVisible($('.players-wrapper-main'), false);
  setVisible($('.home-main'), true);
}

function setContactView() {
  setVisible($('.home-main'), false);
  setVisible($('.players-wrapper-main'), false);
  setVisible($('.contact-main'), true);
}

function setAudioView() {
  setVisible($('.home-main'), false);
  setVisible($('.contact-main'), false);
  setVisible($('.players-wrapper-main'), true);
}

function closeSideNav() {
  var overlay = $('.header-overlay-buttons');
  if (overlay.hasClass('menu-hidden')) { return; }
  // var overlayButtons = $('.header-overlay-buttons');
  var ham = $('.header-ham-wrap');
  overlay.removeClass('menu-visible');
  // overlayButtons.removeClass('menu-visible');
  overlay.addClass('menu-hidden');
  // overlayButtons.addClass('menu-hidden');
  ham.removeClass('ham-open');
  ham.addClass('ham-closed');
}

$('.home-btn, .mobile-home-btn').on('click', function(){
  closeSideNav();
  setHomeView();
});

$('.contact-btn, .mobile-contact-btn').on('click', function(){
  closeSideNav();
  setContactView();
});

$('.left-author').on('click', function(){
  setHomeView();
});

$('.left-author.sub-author').on('click', function(){
  setHomeView();
});

$('.audio-btn h3#audio-sub-one').on('click', function(){
  setAudioView();
});

$('.mobile-audio-btn').on('click', function(){
  closeSideNav();
  setAudioView();
});

function playAudio(source, play) {
  audioPlaying = play;
  if (play) {
    source.play();
  } else {
    source.pause();
  }
}

$('.player-main').find('.audio-wrapper').on('click', function() {
  var source = $(this).find('audio').get(0);
  if($(this).hasClass('play-btn-loading')) {
    source.currentTime = 0;
  }
  else if($(this).hasClass('play-btn-playing')) {
    $(this).removeClass('play-btn-playing');
    $(this).addClass('play-btn-paused');
    playAudio(source, false);
  }
  else
  {
    $(this).removeClass('play-btn-paused');
    $(this).addClass('play-btn-playing');
    playAudio(source, true);
  }
});

function setPlayPosition(relX, width, audio) {
  var percent = clickPosToPercent(relX, width);
  var duration = audio.duration;
  audio.currentTime = percent / 100 * duration;
}

$('.player-main').find('.info-section').on('click', function(e) {
  var width = $(this).width();
  var relX = e.pageX - $(this).offset().left;
  var audio = $(this).siblings().find('audio').get(0);
  setPlayPosition(relX, width, audio);
});

$('.player-main').find('.distance-indicator').on('click', function(e) {
  var info = $(this).siblings('.info-section');
  var audio = $(this).siblings().find('audio').get(0);
  var width = info.width();
  var relX = e.pageX - info.offset().left;
  setPlayPosition(relX, width, audio);
});

$('.player-main').find('.buffer-indicator').on('click', function(e) {
  var info = $(this).siblings('.info-section');
  var audio = $(this).siblings().find('audio').get(0);
  var width = info.width();
  var relX = e.pageX - info.offset().left;
  setPlayPosition(relX, width, audio);
});

function timeConvert(inputTime) {
  var convertedTime = "";
  if (inputTime < 60) {
    convertedTime = "00:";
    if (inputTime < 10) { convertedTime += "0"; }
    convertedTime += inputTime;
  } else {
    var minutes = Math.floor(inputTime / 60);
    var seconds = (inputTime - minutes * 60);

    if (minutes < 10) { convertedTime += "0"; }
    convertedTime += minutes + ":";

    if (seconds < 10) { convertedTime += "0" }
    convertedTime += seconds;
  }
  return convertedTime
}

function timeToPercent(current, end) {
  return current / end * 100;
}

function clickPosToPercent(current, end) {
  return current / end * 100;
}

function removeLoading(source) {
  if (source.hasClass('play-btn-loading')) {
    source.removeClass('play-btn-loading');
    source.addClass('play-btn-paused');
  }
}

function addTimeSpans(source) {
  source.html('<p> <span>--:--</span><span> / </span><span>--:--</span> </p>')
}

$(document).ready(function(){
  // var pathName = window.location.href;
  //
  // if(pathName.indexOf('#') != -1) {
  //   var split = pathName.split('/');
  //   var last = split[split.length-1];
  //   console.log(pathName);
  //   console.log(last);
  // }

  $('audio').each(function() {
    var sourceElement = $(this);
    var source = sourceElement.get(0);
    var parent = sourceElement.parent();
    var info = parent.siblings('.info-section');
    var distance = parent.siblings('.distance-indicator');
    var bufferIndicator = parent.siblings('.buffer-indicator');
    var infoTime = info.children('.info-time');
    addTimeSpans(infoTime);
    var time = infoTime.find('p').children();
    var endDuration = 0.0;

    function setMetaData() {
      var dur = source.duration;
      var endTime = timeConvert(Math.round(source.duration));
      endDuration = dur;
      time.eq(0).html("00:00");
      time.eq(2).html(endTime);
    }

    function setBufferDistance() {
      var buffer = source.buffered;
      // var bufferStart = buffer.start(buffer.length-1);
      var bufferEnd = buffer.end(buffer.length-1);
      // var percentStart = timeToPercent(bufferStart, endDuration);
      var percentEnd = timeToPercent(bufferEnd, endDuration);
      var maxWidth = info.width();
      // bufferIndicator.css('left', percentStart / 100 * maxWidth);
      bufferIndicator.css('width', percentEnd / 100 * maxWidth);
    }

    source.addEventListener("timeupdate",function(){
      var current = source.currentTime;
      var roundTime = Math.round(current);
      var convertedTime = timeConvert(roundTime);
      time.eq(0).html(convertedTime);

      if (endDuration > 0) {
        var percent = timeToPercent(current, endDuration);
        var maxWidth = info.width()
        distance.css('width', percent / 100 * maxWidth);
      }

      if (current >= endDuration) {
        source.currentTime = 0;
        parent.trigger('click');
      }

      setBufferDistance();
    });

    source.addEventListener('progress', function() {
      var buffer = source.buffered;
      if (buffer.length > 0) {
        setBufferDistance();
      }
    });

    source.addEventListener('loadedmetadata', function() {
      setMetaData();
    });

    source.addEventListener('canplay', function() {
      setMetaData();
      removeLoading(parent);
    });

    if (source.readyState > 3) {
      setMetaData();
      removeLoading(parent);
    }
  });
});

$('.header-ham-wrap').on('click', function() {
  var overlay = $('.header-overlay-buttons');
  // var overlayButtons = $('.header-overlay-buttons');
  if (overlay.hasClass('menu-hidden')) {
    overlay.removeClass('menu-hidden');
    // overlayButtons.removeClass('menu-hidden');
    overlay.addClass('menu-visible');
    // overlayButtons.addClass('menu-visible');
    $(this).removeClass('ham-closed');
    $(this).addClass('ham-open');
    // $('body').css('overflow','hidden');
  } else {
    overlay.removeClass('menu-visible');
    // overlayButtons.removeClass('menu-visible');
    overlay.addClass('menu-hidden');
    // overlayButtons.addClass('menu-hidden');
    $(this).removeClass('ham-open');
    $(this).addClass('ham-closed');
    // $('body').css('overflow','scroll');
  }
});


// loadstart
// durationchange
// loadedmetadata
// loadeddata
// progress
// canplay
// canplaythrough
