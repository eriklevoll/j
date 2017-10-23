function setVisible(e, i) {
    i ? (e.removeClass("tab-hidden"), e.addClass("tab-visible")) : (e.removeClass("tab-visible"), 
    e.addClass("tab-hidden"));
}

function setHomeView() {
    setVisible($(".contact-main"), !1), setVisible($(".bio-main"), !1), setVisible($(".multimedia-main"), !1), 
    setVisible($(".players-wrapper-main"), !1), setVisible($(".home-main"), !0);
}

function setContactView() {
    setVisible($(".home-main"), !1), setVisible($(".bio-main"), !1), setVisible($(".multimedia-main"), !1), 
    setVisible($(".players-wrapper-main"), !1), setVisible($(".contact-main"), !0);
}

function SetBioView() {
    setVisible($(".home-main"), !1), setVisible($(".multimedia-main"), !1), setVisible($(".players-wrapper-main"), !1), 
    setVisible($(".contact-main"), !1), setVisible($(".bio-main"), !0);
}

function setAudioView() {
    setVisible($(".home-main"), !1), setVisible($(".bio-main"), !1), setVisible($(".multimedia-main"), !1), 
    setVisible($(".contact-main"), !1), setVisible($(".players-wrapper-main"), !0);
}

function setMultimediaView() {
    setVisible($(".home-main"), !1), setVisible($(".bio-main"), !1), setVisible($(".contact-main"), !1), 
    setVisible($(".players-wrapper-main"), !1), setVisible($(".multimedia-main"), !0);
}

function closeSideNav() {
    var e = $(".header-overlay-buttons");
    if (!e.hasClass("menu-hidden")) {
        var i = $(".header-ham-wrap");
        e.removeClass("menu-visible"), e.addClass("menu-hidden"), i.removeClass("ham-open"), 
        i.addClass("ham-closed");
    }
}

function playMedia(e, i) {
    audioPlaying = i, i ? e.play() : e.pause();
}

function setPlayPosition(e, i, n) {
    var t = clickPosToPercent(e, i), a = n.duration;
    n.currentTime = t / 100 * a;
}

function timeConvert(e) {
    var i = "";
    if (e < 60) i = "00:", e < 10 && (i += "0"), i += e; else {
        var n = Math.floor(e / 60), t = e - 60 * n;
        n < 10 && (i += "0"), i += n + ":", t < 10 && (i += "0"), i += t;
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
        $(this).siblings(".v-controls").width($(this).width());
    });
}

var audioPlaying = !1, currentAudioSource;

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
    $(this).addClass("v-buttons-paused"), playMedia(e, !1)) : ($(this).removeClass("v-buttons-paused"), 
    $(this).addClass("v-buttons-playing"), e.currentTime <= 0 && (e.currentTime = .05), 
    playMedia(e, !0));
}), $(".player-main").find(".audio-wrapper").on("click", function() {
    var e = $(this).find("audio").get(0);
    $(this).hasClass("play-btn-playing") ? ($(this).removeClass("play-btn-playing"), 
    $(this).addClass("play-btn-paused"), playMedia(e, !1)) : ($(this).removeClass("play-btn-paused"), 
    $(this).addClass("play-btn-playing"), e.currentTime <= 0 && (e.currentTime = .05), 
    playMedia(e, !0));
}), $(".player-main").find(".info-section").on("click", function(e) {
    var i = $(this).width();
    setPlayPosition(e.pageX - $(this).offset().left, i, $(this).siblings().find("audio").get(0));
}), $(".player-main").find(".distance-indicator").on("click", function(e) {
    var i = $(this).siblings(".info-section"), n = $(this).siblings().find("audio").get(0), t = i.width();
    setPlayPosition(e.pageX - i.offset().left, t, n);
}), $(".player-main").find(".buffer-indicator").on("click", function(e) {
    var i = $(this).siblings(".info-section"), n = $(this).siblings().find("audio").get(0), t = i.width();
    setPlayPosition(e.pageX - i.offset().left, t, n);
}), $(window).on("load", function() {
    $(".status").fadeOut(), $(".preloader").delay(350).fadeOut("slow");
}), window.addEventListener("resize", function(e) {
    reSizeVideoControls();
}), $(document).ready(function() {
    $("video").each(function() {
        $(this).get(0), $(this).siblings(".v-controls");
    });
    var e = 1;
    $("audio").each(function() {
        function i() {
            var e = a.duration, i = timeConvert(Math.round(a.duration));
            m = e, c.eq(0).html("00:00"), c.eq(2).html(i);
        }
        function n() {
            var e = a.buffered, i = timeToPercent(e.end(e.length - 1), m), n = o.width();
            d.css("width", i / 100 * n);
        }
        var t = $(this), a = t.get(0), s = t.parent(), o = s.siblings(".info-section"), l = s.siblings(".distance-indicator"), d = s.siblings(".buffer-indicator"), r = o.children(".info-time");
        addTimeSpans(r);
        var c = r.find("p").children(), u = s.parent().siblings(".player-text")[0], m = 0;
        a.addEventListener("timeupdate", function() {
            var e = a.currentTime, i = timeConvert(Math.round(e));
            if (c.eq(0).html(i), m > 0) {
                var t = timeToPercent(e, m), d = o.width();
                l.css("width", t / 100 * d);
            }
            e >= m && (a.currentTime = 0, s.trigger("click")), n();
        }), a.addEventListener("progress", function() {
            a.buffered.length > 0 && n();
        }), a.addEventListener("loadedmetadata", function() {
            i(), removeLoading(s);
        }), a.readyState > 3 && (i(), removeLoading(s)), loadDescription(u, "track_" + e), 
        e++;
    });
}), $(".header-ham-wrap").on("click", function() {
    var e = $(".header-overlay-buttons");
    e.hasClass("menu-hidden") ? (e.removeClass("menu-hidden"), e.addClass("menu-visible"), 
    $(this).removeClass("ham-closed"), $(this).addClass("ham-open")) : (e.removeClass("menu-visible"), 
    e.addClass("menu-hidden"), $(this).removeClass("ham-open"), $(this).addClass("ham-closed"));
});