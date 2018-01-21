function setVisible(e, i) {
    i ? (e.removeClass("tab-hidden"), e.addClass("tab-visible")) : (e.removeClass("tab-visible"), 
    e.addClass("tab-hidden"));
}

function setHomeView() {
    setVisible($(".contact-main"), !1), setVisible($(".bio-main"), !1), setVisible($(".multimedia-main"), !1), 
    setVisible($(".players-wrapper-main"), !1), setVisible($(".home-main"), !0), ShowFooter();
}

function setContactView() {
    setVisible($(".bio-main"), !1), setVisible($(".multimedia-main"), !1), setVisible($(".players-wrapper-main"), !1), 
    setVisible($(".contact-main"), !0), ShowFooter();
}

function SetBioView() {
    setVisible($(".multimedia-main"), !1), setVisible($(".players-wrapper-main"), !1), 
    setVisible($(".contact-main"), !1), setVisible($(".bio-main"), !0), $(".footer").hide();
}

function setAudioView() {
    setVisible($(".bio-main"), !1), setVisible($(".multimedia-main"), !1), setVisible($(".contact-main"), !1), 
    setVisible($(".players-wrapper-main"), !0), $(".footer").hide();
}

function setMultimediaView() {
    setVisible($(".bio-main"), !1), setVisible($(".contact-main"), !1), setVisible($(".players-wrapper-main"), !1), 
    setVisible($(".multimedia-main"), !0), $(".footer").hide();
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
    audioPlaying = i, SetCurrentlyPlaying(e, i, t), i ? e.play() : e.pause();
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

function loadDescription(e, i) {
    $.ajax({
        url: "text/" + i + ".txt",
        dataType: "text",
        success: function(i) {
            e.innerHTML = "<p>" + i + "</p>";
        }
    });
}

function reSizeVideoControls() {
    $("video").each(function() {
        $(this).get(0);
        var e = $(this).siblings(".v-controls");
        $(this).width() > 0 && ($(this).width() > $(window).width() ? e.width($(window).width()) : e.width($(this).width()));
    });
}

var audioPlaying = !1, currentMediaSource = null, currentMediaHolder = null, currentPlayingTitle = "", currentIsVideo = !1, headerLoaded = !1, bgImageLoaded = !1;

$(".home-btn, .mobile-home-btn").on("click", function() {
    closeSideNav(), setHomeView();
}), $(".contact-btn, .mobile-contact-btn").on("click", function() {
    closeSideNav(), setContactView();
}), $(".bio-btn, .mobile-bio-btn").on("click", function() {
    closeSideNav(), SetBioView();
}), $(".multimedia-btn, .mobile-multimedia-btn").on("click", function() {
    closeSideNav(), setMultimediaView(), reSizeVideoControls();
}), $(".left-author").on("click", function() {
    setHomeView();
}), $(".left-author.sub-author").on("click", function() {
    setHomeView();
}), $(".audio-btn").on("click", function() {
    setAudioView();
}), $(".mobile-audio-btn").on("click", function() {
    closeSideNav(), setAudioView();
}), $(".multimedia-main video").on("play", function() {
    $(".multimedia-overlay").addClass("multioverlay-visible");
}), $(".multimedia-main video").on("pause", function() {
    window.innerWidth, $(".multimedia-overlay").removeClass("multioverlay-visible");
}), $(".multimedia-overlay").on("click", function() {
    $(this).removeClass("multioverlay-visible"), $(".multimedia-main video").pause();
}), $(".multimedia-main video").on("click", function() {
    ToggleVideoPlay($(this).siblings(".v-controls").find(".v-buttons"));
}), $(".v-player-main").find(".v-fullscreen-btn").on("click", function() {
    var e = $(this).parent().parent().siblings().get(0);
    e.requestFullscreen ? e.requestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen() : e.msRequestFullscreen && e.msRequestFullscreen();
}), $(".v-player-main").find(".v-buttons").on("click", function() {
    ToggleVideoPlay($(this));
}), $(".footer").find(".play-btn-area").on("click", function() {
    SetFooterPlay($(this).hasClass("footer-play-btn-playing") ? !1 : !0);
}), $(".footer").find(".text-area").on("click", function() {
    currentIsVideo ? setMultimediaView() : setAudioView();
}), $(".player-main").find(".audio-wrapper").on("click", function() {
    var e = $(this).find("audio").get(0), i = $(this).siblings(".info-section").find("#info-title")[0].innerHTML;
    $(this).hasClass("play-btn-playing") ? ($(this).removeClass("play-btn-playing"), 
    $(this).addClass("play-btn-paused"), SetFooterPlay(!1), playMedia(e, !1, i)) : (PauseCurrentMedia(), 
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
    $(".home-video video").get(0).playbackRate = .9, $(".preloader").delay(350).fadeOut("slow"), 
    $(".multimedia-main video").each(function() {
        var e = $(this).get(0), i = $(this).siblings(".v-controls"), t = ($(this).parent().parent(), 
        0), n = i.find(".v-distance-full"), a = i.find(".v-distance-indicator"), o = $(".v-player-main").find(".v-buttons"), s = i.find(".v-info-time");
        addTimeSpans(s);
        var l = s.find("p").children();
        e.addEventListener("loadedmetadata", function() {
            !function() {
                var i = e.duration, n = timeConvert(Math.round(e.duration));
                t = i, l.eq(0).html("00:00"), l.eq(2).html(n);
            }();
        }), e.addEventListener("timeupdate", function() {
            var i = e.currentTime, s = timeConvert(Math.round(i));
            if (l.eq(0).html(s), t > 0) {
                var r = timeToPercent(i, t), d = n.width();
                a.css("width", r / 100 * d);
            }
            i >= t && (e.currentTime = 0, o.trigger("click"));
        });
    });
    var e = 1;
    $("audio").each(function() {
        function i() {
            var e = a.duration, i = timeConvert(Math.round(a.duration));
            m = e, c.eq(0).html("00:00"), c.eq(2).html(i);
        }
        function t() {
            var e = a.buffered, i = timeToPercent(e.end(e.length - 1), m), t = s.width();
            r.css("width", i / 100 * t);
        }
        var n = $(this), a = n.get(0), o = n.parent(), s = o.siblings(".info-section"), l = o.siblings(".distance-indicator"), r = o.siblings(".buffer-indicator"), d = s.children(".info-time");
        addTimeSpans(d);
        var c = d.find("p").children(), u = o.parent().siblings(".player-text")[0], m = 0;
        a.addEventListener("timeupdate", function() {
            var e = a.currentTime, i = timeConvert(Math.round(e));
            if (c.eq(0).html(i), m > 0) {
                var n = timeToPercent(e, m), r = s.width();
                l.css("width", n / 100 * r);
            }
            e >= m && (a.currentTime = 0, o.trigger("click")), t();
        }), a.addEventListener("progress", function() {
            a.buffered.length > 0 && t();
        }), a.addEventListener("loadedmetadata", function() {
            i(), removeLoading(o);
        }), a.readyState > 3 && (i(), removeLoading(o)), loadDescription(u, "track_" + e), 
        e++;
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