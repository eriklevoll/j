function setVisibleBlock(e, i) {
    i ? (e.removeClass("tab-hidden"), e.addClass("tab-visible-block")) : (e.removeClass("tab-visible-block"), 
    e.addClass("tab-hidden"));
}

function setVisible(e, i) {
    i ? (e.removeClass("tab-hidden"), e.addClass("tab-visible")) : (e.removeClass("tab-visible"), 
    e.addClass("tab-hidden"));
}

function setHomeView() {
    setVisible($(".contact-main"), !1), setVisible($(".bio-main"), !1), setVisible($(".multimedia-main"), !1), 
    setVisibleBlock($(".players-wrapper-main"), !1), setVisible($(".performances-main"), !1), 
    setVisible($(".home-main"), !0), ShowFooter();
}

function setContactView() {
    setVisible($(".bio-main"), !1), setVisible($(".multimedia-main"), !1), setVisibleBlock($(".players-wrapper-main"), !1), 
    setVisible($(".performances-main"), !1), setVisible($(".contact-main"), !0), ShowFooter();
}

function SetBioView() {
    setVisible($(".multimedia-main"), !1), setVisibleBlock($(".players-wrapper-main"), !1), 
    setVisible($(".contact-main"), !1), setVisible($(".performances-main"), !1), setVisible($(".bio-main"), !0), 
    $(".footer").hide();
}

function setAudioView() {
    setVisible($(".bio-main"), !1), setVisible($(".multimedia-main"), !1), setVisible($(".contact-main"), !1), 
    setVisible($(".performances-main"), !1), setVisibleBlock($(".players-wrapper-main"), !0), 
    $(".footer").hide();
}

function setMultimediaView() {
    setVisible($(".bio-main"), !1), setVisible($(".contact-main"), !1), setVisibleBlock($(".players-wrapper-main"), !1), 
    setVisible($(".performances-main"), !1), setVisible($(".multimedia-main"), !0), 
    $(".footer").hide();
}

function setPerformancesView() {
    setVisible($(".bio-main"), !1), setVisible($(".multimedia-main"), !1), setVisible($(".contact-main"), !1), 
    setVisibleBlock($(".players-wrapper-main"), !1), setVisible($(".performances-main"), !0), 
    $(".footer").hide();
}

function closeSideNav() {
    var e = $(".header-overlay-buttons");
    if (!e.hasClass("menu-hidden")) {
        var i = $(".header-ham-wrap");
        e.removeClass("menu-visible"), e.addClass("menu-hidden"), i.removeClass("ham-open"), 
        i.addClass("ham-closed");
    }
}

function ShowFooter() {
    null != currentMediaSource && $(".footer").show();
}

function playMedia(e, i, t) {
    SetCurrentlyPlaying(e, audioPlaying = i, t), i ? e.play() : e.pause();
}

function SetCurrentlyPlaying(e, i, t) {
    currentPlayingTitle = t;
    var n = $(".footer").find("#footer-title")[0];
    $(".footer").find(".footer-play-btn")[0];
    n.innerHTML = t;
}

function ToggleVideoPlay(e) {
    var i = e.parent(), t = i.siblings().get(0), n = i.find("#v-info-title")[0].innerHTML;
    $(e).hasClass("v-buttons-playing") ? ($(e).removeClass("v-buttons-playing"), $(e).addClass("v-buttons-paused"), 
    SetFooterPlay(!1), playMedia(t, !1, n)) : (PauseCurrentMedia(), $(e).removeClass("v-buttons-paused"), 
    $(e).addClass("v-buttons-playing"), t.currentTime <= 0 && (t.currentTime = .05), 
    currentMediaSource = t, currentMediaHolder = e, SetFooterPlay(!0), playMedia(t, !0, n), 
    currentIsVideo = !0);
}

function SetFooterPlay(e) {
    var i = $(".footer").find(".play-btn-area")[0];
    e ? ($(i).removeClass("footer-play-btn-paused"), $(i).addClass("footer-play-btn-playing"), 
    PlayCurrentMedia()) : ($(i).removeClass("footer-play-btn-playing"), $(i).addClass("footer-play-btn-paused"), 
    PauseCurrentMedia());
}

function PauseCurrentMedia() {
    if (null != currentMediaHolder) {
        var e = "play-btn";
        currentIsVideo && (e = "v-buttons"), currentMediaHolder.removeClass(e + "-playing"), 
        currentMediaHolder.addClass(e + "-paused"), playMedia(currentMediaSource, !1, currentPlayingTitle);
    }
}

function PlayCurrentMedia() {
    if (null != currentMediaHolder) {
        var e = "play-btn";
        currentIsVideo && (e = "v-buttons"), currentMediaHolder.removeClass(e + "-paused"), 
        currentMediaHolder.addClass(e + "-playing"), playMedia(currentMediaSource, !0, currentPlayingTitle);
    }
}

function setPlayPosition(e, i, t) {
    var n = clickPosToPercent(e, i), a = t.duration;
    t.currentTime = n / 100 * a;
}

function setVideoPlayPosition(e, i, t) {
    var n = clickPosToPercent(e, i), a = t.duration;
    t.currentTime = n / 100 * a;
    var o = $(t).siblings(".v-controls"), s = o.find(".v-distance-indicator"), l = o.find(".v-distance-full").width();
    s.css("width", n / 100 * l);
}

function timeConvert(e) {
    var i = "";
    if (e < 60) i = "00:", e < 10 && (i += "0"), i += e; else {
        var t = Math.floor(e / 60), n = e - 60 * t;
        t < 10 && (i += "0"), i += t + ":", n < 10 && (i += "0"), i += n;
    }
    return i;
}

function timeToPercent(e, i) {
    return e / i * 100;
}

function clickPosToPercent(e, i) {
    return e / i * 100;
}

function removeLoading(e) {
    e.hasClass("play-btn-loading") && (e.removeClass("play-btn-loading"), e.addClass("play-btn-paused"));
}

function addTimeSpans(e) {
    e.html("<p> <span>--:--</span><span> / </span><span>--:--</span> </p>");
}

function checkIE() {
    var e = null != new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(navigator.userAgent) && parseFloat(RegExp.$1), i = "-ms-scroll-limit" in document.documentElement.style && "-ms-ime-align" in document.documentElement.style;
    return !(!e && !i);
}

function reSizeVideoControls() {
    $("video").each(function() {
        $(this).get(0);
        var e = $(this).siblings(".v-controls");
        0 < $(this).width() && ($(this).width() > $(window).width() ? e.width($(window).width()) : e.width($(this).width()));
    });
}

var audioPlaying = !1, currentMediaSource = null, currentMediaHolder = null, currentPlayingTitle = "", currentIsVideo = !1, headerLoaded = !1, bgImageLoaded = !1;

$(".home-btn, .mobile-home-btn").on("click", function() {
    closeSideNav(), setHomeView();
}), $(".contact-btn, .mobile-contact-btn").on("click", function() {
    closeSideNav(), setContactView();
}), $(".bio-btn, .mobile-bio-btn").on("click", function() {
    closeSideNav(), SetBioView();
}), $(".audio-btn, .mobile-audio-btn").on("click", function() {
    closeSideNav(), setAudioView();
}), $(".performances-btn, .mobile-performances-btn").on("click", function() {
    closeSideNav(), setPerformancesView();
}), $(".multimedia-btn, .mobile-multimedia-btn").on("click", function() {
    closeSideNav(), setMultimediaView(), reSizeVideoControls();
}), $(".left-author").on("click", function() {
    setHomeView();
}), $(".left-author.sub-author").on("click", function() {
    setHomeView();
}), $(".multimedia-main video").on("click", function() {
    $(this).siblings(".v-controls").find(".v-buttons");
}), $(".v-player-main").find(".v-fullscreen-btn").on("click", function() {
    var e = $(this).parent().siblings().get(0);
    e.requestFullscreen ? e.requestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen() : e.msRequestFullscreen && e.msRequestFullscreen();
}), $(".v-player-main").find(".v-buttons").on("click", function() {
    ToggleVideoPlay($(this));
}), $(".footer").find(".play-btn-area").on("click", function() {
    $(this).hasClass("footer-play-btn-playing") ? SetFooterPlay(!1) : SetFooterPlay(!0);
}), $(".footer").find(".text-area").on("click", function() {
    currentIsVideo ? setMultimediaView() : setAudioView();
}), $(".player-main").find(".audio-wrapper").on("click", function() {
    var e = $(this).find("audio").get(0), i = $(this).siblings(".info-section").find("#info-title")[0].innerHTML;
    $(this).hasClass("play-btn-playing") ? ($(this).removeClass("play-btn-playing"), 
    $(this).addClass("play-btn-paused"), SetFooterPlay(!1), playMedia(e, !1, i)) : $(this).hasClass("play-btn-paused") && (PauseCurrentMedia(), 
    $(this).removeClass("play-btn-paused"), $(this).addClass("play-btn-playing"), e.currentTime <= 0 && (e.currentTime = .05), 
    currentMediaSource = e, currentMediaHolder = $(this), SetFooterPlay(!0), playMedia(e, !0, i), 
    currentIsVideo = !1);
}), $(".player-main").find(".info-section").on("click", function(e) {
    var i = $(this).width();
    setPlayPosition(e.pageX - $(this).offset().left, i, $(this).siblings().find("audio").get(0));
}), $(".player-main").find(".distance-indicator").on("click", function(e) {
    var i = $(this).siblings(".info-section"), t = $(this).siblings().find("audio").get(0), n = i.width();
    setPlayPosition(e.pageX - i.offset().left, n, t);
}), $(".player-main").find(".buffer-indicator").on("click", function(e) {
    var i = $(this).siblings(".info-section"), t = $(this).siblings().find("audio").get(0), n = i.width();
    setPlayPosition(e.pageX - i.offset().left, n, t);
}), $(".v-player-main").find(".v-info-section").on("click", function(e) {
    var i = $(this).width();
    setVideoPlayPosition(e.pageX - $(this).offset().left, i, $(this).parent().siblings("video").get(0));
}), window.addEventListener("resize", function(e) {
    reSizeVideoControls();
});

var bgVideo = $(".home-video").find("video");

window.addEventListener("mousemove", function(e) {
    var i = $(window).width() - 250 - e.pageX, t = e.pageY - 40, n = $(".header-nav").find(".ghost-nav");
    setTimeout(function() {
        n.each(function() {
            $(this).css("left", .01 * i + 5), $(this).css("top", 10 - .015 * t - 2);
        });
    }, 100);
}), $(document).ready(function() {
    $(".footer").hide();
    checkIE();
    $(".home-video video").get(0).playbackRate = .9, $(".preloader").delay(350).fadeOut("slow"), 
    $(".multimedia-main video").each(function() {
        function e() {
            var e = a.duration, i = timeConvert(Math.round(a.duration));
            o = e, d.eq(0).html("00:00"), d.eq(2).html(i);
        }
        var a = $(this).get(0), i = $(this).siblings(".v-controls"), o = ($(this).parent().parent(), 
        0), s = i.find(".v-distance-full"), l = i.find(".v-distance-indicator"), r = $(".v-player-main").find(".v-buttons"), t = i.find(".v-info-time");
        addTimeSpans(t);
        var d = t.find("p").children();
        a.addEventListener("loadedmetadata", function() {
            e();
        }), 2 <= a.readyState && e(), a.addEventListener("timeupdate", function() {
            var e = a.currentTime, i = timeConvert(Math.round(e));
            if (d.eq(0).html(i), 0 < o) {
                var t = timeToPercent(e, o), n = s.width();
                l.css("width", t / 100 * n);
            }
            o <= e && (a.currentTime = 0, r.trigger("click"));
        });
    }), $("audio").each(function() {
        function e() {
            var e = o.duration, i = timeConvert(Math.round(o.duration));
            c = e, d.eq(0).html("00:00"), d.eq(2).html(i);
        }
        function a() {
            var e = o.buffered, i = timeToPercent(e.end(e.length - 1), c), t = l.width();
            n.css("width", i / 100 * t);
        }
        var i = $(this), o = i.get(0), s = i.parent(), l = s.siblings(".info-section"), r = s.siblings(".distance-indicator"), n = s.siblings(".buffer-indicator"), t = l.children(".info-time");
        addTimeSpans(t);
        var d = t.find("p").children(), c = (s.parent().siblings(".player-text"), 0);
        o.addEventListener("timeupdate", function() {
            var e = o.currentTime, i = timeConvert(Math.round(e));
            if (d.eq(0).html(i), 0 < c) {
                var t = timeToPercent(e, c), n = l.width();
                r.css("width", t / 100 * n);
            }
            c <= e && (o.currentTime = 0, s.trigger("click")), a();
        }), o.addEventListener("progress", function() {
            0 < o.buffered.length && a();
        }), o.addEventListener("loadedmetadata", function() {
            e(), removeLoading(s);
        }), 2 <= o.readyState && (e(), removeLoading(s));
    });
}), $(".header-ham-wrap").on("click", function() {
    var e = $(".header-overlay-buttons");
    e.hasClass("menu-hidden") ? (e.removeClass("menu-hidden"), e.addClass("menu-visible"), 
    $(this).removeClass("ham-closed"), $(this).addClass("ham-open")) : (e.removeClass("menu-visible"), 
    e.addClass("menu-hidden"), $(this).removeClass("ham-open"), $(this).addClass("ham-closed"));
});

var homeVideo = $(".home-video video").get(0), vidPlaceholder = $(".home-main").find(".video-placeholder");

homeVideo.addEventListener("play", function() {
    vidPlaceholder.delay(100).fadeOut(2e3);
}), homeVideo.addEventListener("canplay", function() {
    vidPlaceholder.delay(100).fadeOut(2e3);
}), homeVideo.addEventListener("canplaythrough", function() {
    vidPlaceholder.delay(100).fadeOut(2e3);
});