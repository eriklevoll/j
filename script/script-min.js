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
    setVisible($(".contact-main"), !1), setVisible($(".bio-main"), !0), ShowFooter();
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

function SetFooterPlay(e) {
    var i = $(".footer").find(".play-btn-area")[0];
    e ? ($(i).removeClass("footer-play-btn-paused"), $(i).addClass("footer-play-btn-playing"), 
    PlayCurrentMedia()) : ($(i).removeClass("footer-play-btn-playing"), $(i).addClass("footer-play-btn-paused"), 
    PauseCurrentMedia());
}

function PauseCurrentMedia() {
    null != currentMediaHolder && (currentMediaHolder.removeClass("play-btn-playing"), 
    currentMediaHolder.addClass("play-btn-paused"), playMedia(currentMediaSource, !1, currentPlayingTitle));
}

function PlayCurrentMedia() {
    null != currentMediaHolder && (currentMediaHolder.removeClass("play-btn-paused"), 
    currentMediaHolder.addClass("play-btn-playing"), playMedia(currentMediaSource, !0, currentPlayingTitle));
}

function setPlayPosition(e, i, t) {
    var n = clickPosToPercent(e, i), a = t.duration;
    t.currentTime = n / 100 * a;
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

var audioPlaying = !1, currentMediaSource = null, currentMediaHolder = null, currentPlayingTitle = "";

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
}), $(".audio-btn").on({
    click: function() {
        setAudioView();
    }
}), $(".mobile-audio-btn").on("click", function() {
    closeSideNav(), setAudioView();
}), $(".multimedia-main video").on("play", function() {
    $(".header-ham-wrap").hide(), $(".multimedia-overlay").addClass("multioverlay-visible");
}), $(".multimedia-main video").on("pause", function() {
    window.innerWidth <= 1e3 && $(".header-ham-wrap").show(), $(".multimedia-overlay").removeClass("multioverlay-visible");
}), $(".multimedia-overlay").on("click", function() {
    $(this).removeClass("multioverlay-visible"), $(".multimedia-main video").pause();
}), $(".multimedia-main video").on("click", function() {
    var e = $(this)[0];
    e.paused ? e.play() : e.pause();
}), $(".v-player-main").find(".v-fullscreen-btn").on("click", function() {
    var e = $(this).parent().parent().siblings().get(0);
    e.requestFullscreen ? e.requestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen() : e.msRequestFullscreen && e.msRequestFullscreen();
}), $(".v-player-main").find(".v-buttons").on("click", function() {
    var e = $(this).parent().siblings().get(0);
    $(this).hasClass("v-buttons-playing") ? ($(this).removeClass("v-buttons-playing"), 
    $(this).addClass("v-buttons-paused"), SetFooterPlay(!1), playMedia(e, !1, title)) : ($(this).removeClass("v-buttons-paused"), 
    $(this).addClass("v-buttons-playing"), e.currentTime <= 0 && (e.currentTime = .05), 
    SetFooterPlay(!0), playMedia(e, !0, title));
}), $(".footer").find(".play-btn-area").on("click", function() {
    SetFooterPlay($(this).hasClass("footer-play-btn-playing") ? !1 : !0);
}), $(".footer").find(".text-area").on("click", function() {
    setAudioView();
}), $(".player-main").find(".audio-wrapper").on("click", function() {
    var e = $(this).find("audio").get(0), i = $(this).siblings(".info-section").find("#info-title")[0].innerHTML;
    $(this).hasClass("play-btn-playing") ? ($(this).removeClass("play-btn-playing"), 
    $(this).addClass("play-btn-paused"), SetFooterPlay(!1), playMedia(e, !1, i)) : (PauseCurrentMedia(), 
    $(this).removeClass("play-btn-paused"), $(this).addClass("play-btn-playing"), e.currentTime <= 0 && (e.currentTime = .05), 
    currentMediaSource = e, currentMediaHolder = $(this), SetFooterPlay(!0), playMedia(e, !0, i));
}), $(".player-main").find(".info-section").on("click", function(e) {
    var i = $(this).width();
    setPlayPosition(e.pageX - $(this).offset().left, i, $(this).siblings().find("audio").get(0));
}), $(".player-main").find(".distance-indicator").on("click", function(e) {
    var i = $(this).siblings(".info-section"), t = $(this).siblings().find("audio").get(0), n = i.width();
    setPlayPosition(e.pageX - i.offset().left, n, t);
}), $(".player-main").find(".buffer-indicator").on("click", function(e) {
    var i = $(this).siblings(".info-section"), t = $(this).siblings().find("audio").get(0), n = i.width();
    setPlayPosition(e.pageX - i.offset().left, n, t);
}), $(window).on("load", function() {
    $(".status").fadeOut(), $(".preloader").delay(350).fadeOut("slow");
}), window.addEventListener("resize", function(e) {
    reSizeVideoControls();
});

var bgVideo = $(".home-video").find("video");

window.addEventListener("mousemove", function(e) {
    var i = $(window).width() - 250 - e.pageX, t = e.pageY - 40;
    $(".header-nav").find(".ghost-nav").each(function() {
        $(this).css("left", .01 * i + 5), $(this).css("top", 10 - .015 * t - 2);
    });
}), $(document).ready(function() {
    $(".footer").hide(), $("video").each(function() {
        $(this).get(0), $(this).siblings(".v-controls"), $(this).parent().parent();
        $(".home-video video").get(0).playbackRate = .9;
    });
    var e = 1;
    $("audio").each(function() {
        function i() {
            var e = a.duration, i = timeConvert(Math.round(a.duration));
            m = e, u.eq(0).html("00:00"), u.eq(2).html(i);
        }
        function t() {
            var e = a.buffered, i = timeToPercent(e.end(e.length - 1), m), t = s.width();
            r.css("width", i / 100 * t);
        }
        var n = $(this), a = n.get(0), o = n.parent(), s = o.siblings(".info-section"), l = o.siblings(".distance-indicator"), r = o.siblings(".buffer-indicator"), d = s.children(".info-time");
        addTimeSpans(d);
        var u = d.find("p").children(), c = o.parent().siblings(".player-text")[0], m = 0;
        a.addEventListener("timeupdate", function() {
            var e = a.currentTime, i = timeConvert(Math.round(e));
            if (u.eq(0).html(i), m > 0) {
                var n = timeToPercent(e, m), r = s.width();
                l.css("width", n / 100 * r);
            }
            e >= m && (a.currentTime = 0, o.trigger("click")), t();
        }), a.addEventListener("progress", function() {
            a.buffered.length > 0 && t();
        }), a.addEventListener("loadedmetadata", function() {
            i(), removeLoading(o);
        }), a.readyState > 3 && (i(), removeLoading(o)), loadDescription(c, "track_" + e), 
        e++;
    });
}), $(".header-ham-wrap").on("click", function() {
    var e = $(".header-overlay-buttons");
    e.hasClass("menu-hidden") ? (e.removeClass("menu-hidden"), e.addClass("menu-visible"), 
    $(this).removeClass("ham-closed"), $(this).addClass("ham-open")) : (e.removeClass("menu-visible"), 
    e.addClass("menu-hidden"), $(this).removeClass("ham-open"), $(this).addClass("ham-closed"));
});