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
  console.log('yes3');
  setVisible($('.contact-main'), false);
  setVisible($('.players-wrapper-main'), false);
  setVisible($('.home-main'), true);
}

function setContactView() {
  console.log('yes2');
  setVisible($('.home-main'), false);
  setVisible($('.players-wrapper-main'), false);
  setVisible($('.contact-main'), true);
}

function setAudioView() {
  console.log('yes');
  setVisible($('.home-main'), false);
  setVisible($('.contact-main'), false);
  setVisible($('.players-wrapper-main'), true);
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

$('.audio-btn h3#audio-sub-one').on('click', function(){
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
    return;
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

$('.player-main').find('.info-section').on('click', function(e) {
  var offset = $(this).offset();
  var width = $(this).width();
  var relX = e.pageX - offset.left;

  var percent = clickPosToPercent(relX, width);
  var audio = $(this).siblings().find('audio').get(0);
  var duration = audio.duration;
  audio.currentTime = percent / 100 * duration;
});

$('.player-main').find('.distance-indicator').on('click', function(e) {
  var info = $(this).siblings('.info-section');
  var offset = info.offset();
  var width = info.width();
  var relX = e.pageX - offset.left;

  var percent = clickPosToPercent(relX, width);
  var audio = info.siblings().find('audio').get(0);
  var duration = audio.duration;
  audio.currentTime = percent / 100 * duration;
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
  source.removeClass('play-btn-loading');
  source.addClass('play-btn-paused');
}

function addTimeSpans(source) {
  source.html('<p> <span>--:--</span><span> / </span><span>--:--</span> </p>')
}

$(document).ready(function(){
  var pathName = window.location.href;

  if(pathName.indexOf('#') != -1) {
    var split = pathName.split('/');
    var last = split[split.length-1];
    console.log(pathName);
    console.log(last);
  }

  $('audio').each(function() {
    var sourceElement = $(this);
    var source = sourceElement.get(0);
    var parent = sourceElement.parent();
    var info = parent.siblings('.info-section');
    var distance = parent.siblings('.distance-indicator');
    var infoTime = info.children('.info-time');
    addTimeSpans(infoTime);
    var time = infoTime.find('p').children();
    var endDuration = 0.0;


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
    });

    // source.addEventListener('loadedmetadata', function() {
    //   var dur = source.duration;
    //   var endTime = timeConvert(Math.round(source.duration));
    //   endDuration = dur;
    //   time.eq(0).html("00:00");
    //   time.eq(2).html(endTime);
    // });

    source.addEventListener('canplay', function() {
      var dur = source.duration;
      var endTime = timeConvert(Math.round(source.duration));
      endDuration = dur;
      time.eq(0).html("00:00");
      time.eq(2).html(endTime);
      removeLoading(parent);
    });

    if (source.readyState > 3) {
      // console.log('yes');
      removeLoading(parent);
    } else {
      // console.log(source.readyState);
    }
  });
})



// loadstart
// durationchange
// loadedmetadata
// loadeddata
// progress
// canplay
// canplaythrough
