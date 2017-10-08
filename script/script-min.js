function setVisible(i, e) {
    e ? (i.removeClass("tab-hidden"), i.addClass("tab-visible")) : (i.removeClass("tab-visible"), 
    i.addClass("tab-hidden"));
}

function setHomeView() {
    setVisible($(".contact-main"), !1), setVisible($(".players-wrapper-main"), !1), 
    setVisible($(".home-main"), !0);
}

function setContactView() {
    setVisible($(".home-main"), !1), setVisible($(".players-wrapper-main"), !1), setVisible($(".contact-main"), !0);
}

function setAudioView() {
    setVisible($(".home-main"), !1), setVisible($(".contact-main"), !1), setVisible($(".players-wrapper-main"), !0);
}

function closeSideNav() {
    var i = $(".header-overlay-buttons");
    if (!i.hasClass("menu-hidden")) {
        var e = $(".header-ham-wrap");
        i.removeClass("menu-visible"), i.addClass("menu-hidden"), e.removeClass("ham-open"), 
        e.addClass("ham-closed");
    }
}

function playAudio(i, e) {
    audioPlaying = e, e ? i.play() : i.pause();
}

function setPlayPosition(i, e, n) {
    var a = clickPosToPercent(i, e), t = n.duration;
    n.currentTime = a / 100 * t;
}

function timeConvert(i) {
    var e = "";
    if (i < 60) e = "00:", i < 10 && (e += "0"), e += i; else {
        var n = Math.floor(i / 60), a = i - 60 * n;
        n < 10 && (e += "0"), e += n + ":", a < 10 && (e += "0"), e += a;
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

var audioPlaying = !1, currentAudioSource;

$(".home-btn, .mobile-home-btn").on("click", function() {
    closeSideNav(), setHomeView();
}), $(".contact-btn, .mobile-contact-btn").on("click", function() {
    closeSideNav(), setContactView();
}), $(".left-author").on("click", function() {
    setHomeView();
}), $(".left-author.sub-author").on("click", function() {
    setHomeView();
}), $(".audio-btn h3#audio-sub-one").on("click", function() {
    setAudioView();
}), $(".mobile-audio-btn").on("click", function() {
    closeSideNav(), setAudioView();
}), $(".player-main").find(".audio-wrapper").on("click", function() {
    var i = $(this).find("audio").get(0);
    $(this).hasClass("play-btn-loading") ? i.currentTime = 0 : $(this).hasClass("play-btn-playing") ? ($(this).removeClass("play-btn-playing"), 
    $(this).addClass("play-btn-paused"), playAudio(i, !1)) : ($(this).removeClass("play-btn-paused"), 
    $(this).addClass("play-btn-playing"), playAudio(i, !0));
}), $(".player-main").find(".info-section").on("click", function(i) {
    var e = $(this).width();
    setPlayPosition(i.pageX - $(this).offset().left, e, $(this).siblings().find("audio").get(0));
}), $(".player-main").find(".distance-indicator").on("click", function(i) {
    var e = $(this).siblings(".info-section"), n = $(this).siblings().find("audio").get(0), a = e.width();
    setPlayPosition(i.pageX - e.offset().left, a, n);
}), $(".player-main").find(".buffer-indicator").on("click", function(i) {
    var e = $(this).siblings(".info-section"), n = $(this).siblings().find("audio").get(0), a = e.width();
    setPlayPosition(i.pageX - e.offset().left, a, n);
}), $(document).ready(function() {
    $("audio").each(function() {
        function i() {
            var i = a.duration, e = timeConvert(Math.round(a.duration));
            c = i, r.eq(0).html("00:00"), r.eq(2).html(e);
        }
        function e() {
            var i = a.buffered, e = timeToPercent(i.end(i.length - 1), c), n = s.width();
            d.css("width", e / 100 * n);
        }
        var n = $(this), a = n.get(0), t = n.parent(), s = t.siblings(".info-section"), o = t.siblings(".distance-indicator"), d = t.siblings(".buffer-indicator"), l = s.children(".info-time");
        addTimeSpans(l);
        var r = l.find("p").children(), c = 0;
        a.addEventListener("timeupdate", function() {
            var i = a.currentTime, n = timeConvert(Math.round(i));
            if (r.eq(0).html(n), c > 0) {
                var d = timeToPercent(i, c), l = s.width();
                o.css("width", d / 100 * l);
            }
            i >= c && (a.currentTime = 0, t.trigger("click")), e();
        }), a.addEventListener("progress", function() {
            a.buffered.length > 0 && e();
        }), a.addEventListener("loadedmetadata", function() {
            i();
        }), a.addEventListener("canplay", function() {
            i(), removeLoading(t);
        }), a.readyState > 3 && (i(), removeLoading(t));
    });
}), $(".header-ham-wrap").on("click", function() {
    var i = $(".header-overlay-buttons");
    i.hasClass("menu-hidden") ? (i.removeClass("menu-hidden"), i.addClass("menu-visible"), 
    $(this).removeClass("ham-closed"), $(this).addClass("ham-open")) : (i.removeClass("menu-visible"), 
    i.addClass("menu-hidden"), $(this).removeClass("ham-open"), $(this).addClass("ham-closed"));
});