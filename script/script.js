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
  // var source = $(this > 'audio');
  if($(this).hasClass('play-btn-playing')) {
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
    var time = infoTime.find('p').children();
    var endDuration = 0.0;

    source.addEventListener("timeupdate",function(){
      var current = source.currentTime;
      var roundTime = Math.round(current);
      var convertedTime = timeConvert(roundTime);
      time.eq(0).html(convertedTime);

      if (endDuration > 0) {
        var percent = timeToPercent(current, endDuration);
        distance.css('width', percent + "%");
      }
    });

    source.addEventListener('loadedmetadata', function() {
      var dur = source.duration;
      var endTime = timeConvert(Math.round(source.duration));
      endDuration = dur;
      time.eq(2).html(endTime);
    });
  });
})
