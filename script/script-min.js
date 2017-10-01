function setVisible(i, n) {
    n ? (i.removeClass("tab-hidden"), i.addClass("tab-visible")) : (i.removeClass("tab-visible"), 
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

function playAudio(i, n) {
    audioPlaying = n, n ? i.play() : i.pause();
}

function setPlayPosition(i, n, t) {
    var e = clickPosToPercent(i, n), a = t.duration;
    t.currentTime = e / 100 * a;
}

function timeConvert(i) {
    var n = "";
    if (i < 60) n = "00:", i < 10 && (n += "0"), n += i; else {
        var t = Math.floor(i / 60), e = i - 60 * t;
        t < 10 && (n += "0"), n += t + ":", e < 10 && (n += "0"), n += e;
    }
    return n;
}

function timeToPercent(i, n) {
    return i / n * 100;
}

function clickPosToPercent(i, n) {
    return i / n * 100;
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
    var n = $(this).width();
    setPlayPosition(i.pageX - $(this).offset().left, n, $(this).siblings().find("audio").get(0));
}), $(".player-main").find(".distance-indicator").on("click", function(i) {
    var n = $(this).siblings(".info-section"), t = $(this).siblings().find("audio").get(0), e = n.width();
    setPlayPosition(i.pageX - n.offset().left, e, t);
}), $(".player-main").find(".buffer-indicator").on("click", function(i) {
    var n = $(this).siblings(".info-section"), t = $(this).siblings().find("audio").get(0), e = n.width();
    setPlayPosition(i.pageX - n.offset().left, e, t);
}), $(document).ready(function() {
    $("audio").each(function() {
        function i() {
            var i = e.duration, n = timeConvert(Math.round(e.duration));
            r = i, d.eq(0).html("00:00"), d.eq(2).html(n), removeLoading(a);
        }
        function n() {
            var i = e.buffered, n = timeToPercent(i.end(i.length - 1), r), t = s.width();
            l.css("width", n / 100 * t);
        }
        var t = $(this), e = t.get(0), a = t.parent(), s = a.siblings(".info-section"), o = a.siblings(".distance-indicator"), l = a.siblings(".buffer-indicator"), c = s.children(".info-time");
        addTimeSpans(c);
        var d = c.find("p").children(), r = 0;
        e.addEventListener("timeupdate", function() {
            var i = e.currentTime, t = timeConvert(Math.round(i));
            if (d.eq(0).html(t), r > 0) {
                var l = timeToPercent(i, r), c = s.width();
                o.css("width", l / 100 * c);
            }
            i >= r && (e.currentTime = 0, a.trigger("click")), n();
        }), e.addEventListener("progress", function() {
            e.buffered.length > 0 && n();
        }), e.addEventListener("loadedmetadata", function() {
            i();
        }), e.addEventListener("canplay", function() {
            i();
        }), e.readyState > 3 && i();
    });
});