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

function playAudio(i, e) {
    audioPlaying = e, e ? i.play() : i.pause();
}

function setPlayPosition(i, e, n) {
    var t = clickPosToPercent(i, e), a = n.duration;
    n.currentTime = t / 100 * a;
}

function timeConvert(i) {
    var e = "";
    if (i < 60) e = "00:", i < 10 && (e += "0"), e += i; else {
        var n = Math.floor(i / 60), t = i - 60 * n;
        n < 10 && (e += "0"), e += n + ":", t < 10 && (e += "0"), e += t;
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

$(".home-btn").on("click", function() {
    setHomeView();
}), $(".contact-btn").on("click", function() {
    setContactView();
}), $(".left-author").on("click", function() {
    setHomeView();
}), $(".left-author.sub-author").on("click", function() {
    setHomeView();
}), $(".audio-btn h3#audio-sub-one").on("click", function() {
    setAudioView();
}), $(".player-main").find(".audio-wrapper").on("click", function() {
    var i = $(this).find("audio").get(0);
    $(this).hasClass("play-btn-loading") || ($(this).hasClass("play-btn-playing") ? ($(this).removeClass("play-btn-playing"), 
    $(this).addClass("play-btn-paused"), playAudio(i, !1)) : ($(this).removeClass("play-btn-paused"), 
    $(this).addClass("play-btn-playing"), playAudio(i, !0)));
}), $(".player-main").find(".info-section").on("click", function(i) {
    var e = $(this).width();
    setPlayPosition(i.pageX - $(this).offset().left, e, $(this).siblings().find("audio").get(0));
}), $(".player-main").find(".distance-indicator").on("click", function(i) {
    var e = $(this).siblings(".info-section"), n = $(this).siblings().find("audio").get(0), t = e.width();
    setPlayPosition(i.pageX - e.offset().left, t, n);
}), $(".player-main").find(".buffer-indicator").on("click", function(i) {
    var e = $(this).siblings(".info-section"), n = $(this).siblings().find("audio").get(0), t = e.width();
    setPlayPosition(i.pageX - e.offset().left, t, n);
}), $(document).ready(function() {
    $("audio").each(function() {
        function i() {
            var i = t.duration, e = timeConvert(Math.round(t.duration));
            c = i, r.eq(0).html("00:00"), r.eq(2).html(e), removeLoading(a);
        }
        function e() {
            var i = t.buffered, e = timeToPercent(i.end(i.length - 1), c), n = s.width();
            l.css("width", e / 100 * n);
        }
        var n = $(this), t = n.get(0), a = n.parent(), s = a.siblings(".info-section"), o = a.siblings(".distance-indicator"), l = a.siblings(".buffer-indicator"), d = s.children(".info-time");
        addTimeSpans(d);
        var r = d.find("p").children(), c = 0;
        t.addEventListener("timeupdate", function() {
            var i = t.currentTime, n = timeConvert(Math.round(i));
            if (r.eq(0).html(n), c > 0) {
                var l = timeToPercent(i, c), d = s.width();
                o.css("width", l / 100 * d);
            }
            i >= c && (t.currentTime = 0, a.trigger("click")), e();
        }), t.addEventListener("progress", function() {
            t.buffered.length > 0 && e();
        }), t.addEventListener("loadedmetadata", function() {
            i();
        }), t.addEventListener("canplay", function() {
            i();
        }), t.readyState > 3 && i();
    });
}), $(".header-ham-wrap").on("click", function() {
    var i = $(".header-overlay");
    i.hasClass("menu-hidden") ? (i.removeClass("menu-hidden"), i.addClass("menu-visible"), 
    $(this).removeClass("ham-closed"), $(this).addClass("ham-open")) : (i.removeClass("menu-visible"), 
    i.addClass("menu-hidden"), $(this).removeClass("ham-open"), $(this).addClass("ham-closed"));
});