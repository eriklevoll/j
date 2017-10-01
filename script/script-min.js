function setVisible(e, i) {
    i ? (e.removeClass("tab-hidden"), e.addClass("tab-visible")) : (e.removeClass("tab-visible"), 
    e.addClass("tab-hidden"));
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
    var e = $(".header-overlay");
    if (!e.hasClass("menu-hidden")) {
        var i = $(".header-overlay-buttons"), n = $(".header-ham-wrap");
        e.removeClass("menu-visible"), i.removeClass("menu-visible"), e.addClass("menu-hidden"), 
        i.addClass("menu-hidden"), n.removeClass("ham-open"), n.addClass("ham-closed");
    }
}

function playAudio(e, i) {
    audioPlaying = i, i ? e.play() : e.pause();
}

function setPlayPosition(e, i, n) {
    var a = clickPosToPercent(e, i), s = n.duration;
    n.currentTime = a / 100 * s;
}

function timeConvert(e) {
    var i = "";
    if (e < 60) i = "00:", e < 10 && (i += "0"), i += e; else {
        var n = Math.floor(e / 60), a = e - 60 * n;
        n < 10 && (i += "0"), i += n + ":", a < 10 && (i += "0"), i += a;
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
    var e = $(this).find("audio").get(0);
    $(this).hasClass("play-btn-loading") ? e.currentTime = 0 : $(this).hasClass("play-btn-playing") ? ($(this).removeClass("play-btn-playing"), 
    $(this).addClass("play-btn-paused"), playAudio(e, !1)) : ($(this).removeClass("play-btn-paused"), 
    $(this).addClass("play-btn-playing"), playAudio(e, !0));
}), $(".player-main").find(".info-section").on("click", function(e) {
    var i = $(this).width();
    setPlayPosition(e.pageX - $(this).offset().left, i, $(this).siblings().find("audio").get(0));
}), $(".player-main").find(".distance-indicator").on("click", function(e) {
    var i = $(this).siblings(".info-section"), n = $(this).siblings().find("audio").get(0), a = i.width();
    setPlayPosition(e.pageX - i.offset().left, a, n);
}), $(".player-main").find(".buffer-indicator").on("click", function(e) {
    var i = $(this).siblings(".info-section"), n = $(this).siblings().find("audio").get(0), a = i.width();
    setPlayPosition(e.pageX - i.offset().left, a, n);
}), $(document).ready(function() {
    $("audio").each(function() {
        function e() {
            var e = a.duration, i = timeConvert(Math.round(a.duration));
            c = e, r.eq(0).html("00:00"), r.eq(2).html(i);
        }
        function i() {
            var e = a.buffered, i = timeToPercent(e.end(e.length - 1), c), n = t.width();
            d.css("width", i / 100 * n);
        }
        var n = $(this), a = n.get(0), s = n.parent(), t = s.siblings(".info-section"), o = s.siblings(".distance-indicator"), d = s.siblings(".buffer-indicator"), l = t.children(".info-time");
        addTimeSpans(l);
        var r = l.find("p").children(), c = 0;
        a.addEventListener("timeupdate", function() {
            var e = a.currentTime, n = timeConvert(Math.round(e));
            if (r.eq(0).html(n), c > 0) {
                var d = timeToPercent(e, c), l = t.width();
                o.css("width", d / 100 * l);
            }
            e >= c && (a.currentTime = 0, s.trigger("click")), i();
        }), a.addEventListener("progress", function() {
            a.buffered.length > 0 && i();
        }), a.addEventListener("loadedmetadata", function() {
            e();
        }), a.addEventListener("canplay", function() {
            e(), removeLoading(s);
        }), a.readyState > 3 && (e(), removeLoading(s));
    });
}), $(".header-ham-wrap").on("click", function() {
    var e = $(".header-overlay"), i = $(".header-overlay-buttons");
    e.hasClass("menu-hidden") ? (e.removeClass("menu-hidden"), i.removeClass("menu-hidden"), 
    e.addClass("menu-visible"), i.addClass("menu-visible"), $(this).removeClass("ham-closed"), 
    $(this).addClass("ham-open")) : (e.removeClass("menu-visible"), i.removeClass("menu-visible"), 
    e.addClass("menu-hidden"), i.addClass("menu-hidden"), $(this).removeClass("ham-open"), 
    $(this).addClass("ham-closed"));
});