function setVisible(i, e) {
    e ? (i.removeClass("tab-hidden"), i.addClass("tab-visible")) : (i.removeClass("tab-visible"), 
    i.addClass("tab-hidden"));
}

function setHomeView() {
    setVisible($(".contact-main"), !1), setVisible($(".bio-main"), !1), setVisible($(".multimedia-main"), !1), 
    setVisible($(".players-wrapper-main"), !1), setVisible($(".home-main"), !0), $(".home-video").find("video").css("opacity", "0.2"), 
    $(".home-video").find("video").css("filter", "hue-rotate(0deg)");
}

function setContactView() {
    setVisible($(".bio-main"), !1), setVisible($(".multimedia-main"), !1), setVisible($(".players-wrapper-main"), !1), 
    setVisible($(".contact-main"), !0), $(".home-video").find("video").css("opacity", "0.2"), 
    $(".home-video").find("video").css("filter", "hue-rotate(90deg)");
}

function SetBioView() {
    setVisible($(".multimedia-main"), !1), setVisible($(".players-wrapper-main"), !1), 
    setVisible($(".contact-main"), !1), setVisible($(".bio-main"), !0), $(".home-video").find("video").css("opacity", "0.2"), 
    $(".home-video").find("video").css("filter", "hue-rotate(180deg)");
}

function setAudioView() {
    setVisible($(".bio-main"), !1), setVisible($(".multimedia-main"), !1), setVisible($(".contact-main"), !1), 
    setVisible($(".players-wrapper-main"), !0), $(".home-video").find("video").css("opacity", "0"), 
    $(".home-video").find("video").css("filter", "hue-rotate(270deg)");
}

function setMultimediaView() {
    setVisible($(".bio-main"), !1), setVisible($(".contact-main"), !1), setVisible($(".players-wrapper-main"), !1), 
    setVisible($(".multimedia-main"), !0), $(".home-video").find("video").css("opacity", "0"), 
    $(".home-video").find("video").css("filter", "hue-rotate(-60deg)");
}

function closeSideNav() {
    var i = $(".header-overlay-buttons");
    if (!i.hasClass("menu-hidden")) {
        var e = $(".header-ham-wrap");
        i.removeClass("menu-visible"), i.addClass("menu-hidden"), e.removeClass("ham-open"), 
        e.addClass("ham-closed");
    }
}

function playMedia(i, e) {
    audioPlaying = e, e ? i.play() : i.pause();
}

function setPlayPosition(i, e, t) {
    var n = clickPosToPercent(i, e), s = t.duration;
    t.currentTime = n / 100 * s;
}

function timeConvert(i) {
    var e = "";
    if (i < 60) e = "00:", i < 10 && (e += "0"), e += i; else {
        var t = Math.floor(i / 60), n = i - 60 * t;
        t < 10 && (e += "0"), e += t + ":", n < 10 && (e += "0"), e += n;
    }
    return e;
}

function timeToPercent(i, e) {
    return i / e * 100;
}

function clickPosToPercent(i, e) {
    return i / e * 100;
}

function removeLoading(i) {
    i.hasClass("play-btn-loading") && (i.removeClass("play-btn-loading"), i.addClass("play-btn-paused"));
}

function addTimeSpans(i) {
    i.html("<p> <span>--:--</span><span> / </span><span>--:--</span> </p>");
}

function checkIE() {
    var i = null != new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(navigator.userAgent) && parseFloat(RegExp.$1), e = "-ms-scroll-limit" in document.documentElement.style && "-ms-ime-align" in document.documentElement.style;
    return !(!i && !e);
}

function loadDescription(i, e) {
    $.ajax({
        url: "text/" + e + ".txt",
        dataType: "text",
        success: function(e) {
            i.innerHTML = "<p>" + e + "</p>";
        }
    });
}

function reSizeVideoControls() {
    $("video").each(function() {
        $(this).get(0);
        var i = $(this).siblings(".v-controls");
        $(this).width() > 0 && ($(this).width() > $(window).width() ? i.width($(window).width()) : i.width($(this).width()));
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
    var i = $(this)[0];
    i.paused ? i.play() : i.pause();
}), $(".v-player-main").find(".v-fullscreen-btn").on("click", function() {
    var i = $(this).parent().parent().siblings().get(0);
    i.requestFullscreen ? i.requestFullscreen() : i.mozRequestFullScreen ? i.mozRequestFullScreen() : i.webkitRequestFullscreen ? i.webkitRequestFullscreen() : i.msRequestFullscreen && i.msRequestFullscreen();
}), $(".v-player-main").find(".v-buttons").on("click", function() {
    var i = $(this).parent().siblings().get(0);
    $(this).hasClass("v-buttons-playing") ? ($(this).removeClass("v-buttons-playing"), 
    $(this).addClass("v-buttons-paused"), playMedia(i, !1)) : ($(this).removeClass("v-buttons-paused"), 
    $(this).addClass("v-buttons-playing"), i.currentTime <= 0 && (i.currentTime = .05), 
    playMedia(i, !0));
}), $(".player-main").find(".audio-wrapper").on("click", function() {
    var i = $(this).find("audio").get(0);
    $(this).hasClass("play-btn-playing") ? ($(this).removeClass("play-btn-playing"), 
    $(this).addClass("play-btn-paused"), playMedia(i, !1)) : ($(this).removeClass("play-btn-paused"), 
    $(this).addClass("play-btn-playing"), i.currentTime <= 0 && (i.currentTime = .05), 
    playMedia(i, !0));
}), $(".player-main").find(".info-section").on("click", function(i) {
    var e = $(this).width();
    setPlayPosition(i.pageX - $(this).offset().left, e, $(this).siblings().find("audio").get(0));
}), $(".player-main").find(".distance-indicator").on("click", function(i) {
    var e = $(this).siblings(".info-section"), t = $(this).siblings().find("audio").get(0), n = e.width();
    setPlayPosition(i.pageX - e.offset().left, n, t);
}), $(".player-main").find(".buffer-indicator").on("click", function(i) {
    var e = $(this).siblings(".info-section"), t = $(this).siblings().find("audio").get(0), n = e.width();
    setPlayPosition(i.pageX - e.offset().left, n, t);
}), $(window).on("load", function() {
    $(".status").fadeOut(), $(".preloader").delay(350).fadeOut("slow");
}), window.addEventListener("resize", function(i) {
    reSizeVideoControls();
}), $(document).ready(function() {
    $("video").each(function() {
        var i = $(this).get(0), e = $(this).siblings(".v-controls");
        i.addEventListener("resize", function(i) {
            $(this).width() > $(window).width() ? e.width($(window).width()) : e.width($(this).width());
        });
    });
    var i = 1;
    $("audio").each(function() {
        function e() {
            var i = s.duration, e = timeConvert(Math.round(s.duration));
            m = i, c.eq(0).html("00:00"), c.eq(2).html(e);
        }
        function t() {
            var i = s.buffered, e = timeToPercent(i.end(i.length - 1), m), t = o.width();
            d.css("width", e / 100 * t);
        }
        var n = $(this), s = n.get(0), a = n.parent(), o = a.siblings(".info-section"), l = a.siblings(".distance-indicator"), d = a.siblings(".buffer-indicator"), r = o.children(".info-time");
        addTimeSpans(r);
        var c = r.find("p").children(), u = a.parent().siblings(".player-text")[0], m = 0;
        s.addEventListener("timeupdate", function() {
            var i = s.currentTime, e = timeConvert(Math.round(i));
            if (c.eq(0).html(e), m > 0) {
                var n = timeToPercent(i, m), d = o.width();
                l.css("width", n / 100 * d);
            }
            i >= m && (s.currentTime = 0, a.trigger("click")), t();
        }), s.addEventListener("progress", function() {
            s.buffered.length > 0 && t();
        }), s.addEventListener("loadedmetadata", function() {
            e(), removeLoading(a);
        }), s.readyState > 3 && (e(), removeLoading(a)), loadDescription(u, "track_" + i), 
        i++;
    });
}), $(".header-ham-wrap").on("click", function() {
    var i = $(".header-overlay-buttons");
    i.hasClass("menu-hidden") ? (i.removeClass("menu-hidden"), i.addClass("menu-visible"), 
    $(this).removeClass("ham-closed"), $(this).addClass("ham-open")) : (i.removeClass("menu-visible"), 
    i.addClass("menu-hidden"), $(this).removeClass("ham-open"), $(this).addClass("ham-closed"));
});