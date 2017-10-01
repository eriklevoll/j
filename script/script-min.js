function setVisible(i, n) {
    n ? (i.removeClass("tab-hidden"), i.addClass("tab-visible")) : (i.removeClass("tab-visible"), 
    i.addClass("tab-hidden"));
}

function setHomeView() {
    console.log("yes3"), setVisible($(".contact-main"), !1), setVisible($(".players-wrapper-main"), !1), 
    setVisible($(".home-main"), !0);
}

function setContactView() {
    console.log("yes2"), setVisible($(".home-main"), !1), setVisible($(".players-wrapper-main"), !1), 
    setVisible($(".contact-main"), !0);
}

function setAudioView() {
    console.log("yes"), setVisible($(".home-main"), !1), setVisible($(".contact-main"), !1), 
    setVisible($(".players-wrapper-main"), !0);
}

function playAudio(i, n) {
    audioPlaying = n, n ? i.play() : i.pause();
}

function timeConvert(i) {
    var n = "";
    if (i < 60) n = "00:", i < 10 && (n += "0"), n += i; else {
        var e = Math.floor(i / 60), t = i - 60 * e;
        e < 10 && (n += "0"), n += e + ":", t < 10 && (n += "0"), n += t;
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
    i.removeClass("play-btn-loading"), i.addClass("play-btn-paused");
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
    var n = $(this).offset(), e = $(this).width(), t = clickPosToPercent(i.pageX - n.left, e), a = $(this).siblings().find("audio").get(0), o = a.duration;
    a.currentTime = t / 100 * o;
}), $(".player-main").find(".distance-indicator").on("click", function(i) {
    var n = $(this).siblings(".info-section"), e = n.offset(), t = n.width(), a = clickPosToPercent(i.pageX - e.left, t), o = n.siblings().find("audio").get(0), s = o.duration;
    o.currentTime = a / 100 * s;
}), $(document).ready(function() {
    var i = window.location.href;
    if (-1 != i.indexOf("#")) {
        var n = i.split("/"), e = n[n.length - 1];
        console.log(i), console.log(e);
    }
    $("audio").each(function() {
        var i = $(this), n = i.get(0), e = i.parent(), t = e.siblings(".info-section"), a = e.siblings(".distance-indicator"), o = t.children(".info-time");
        addTimeSpans(o);
        var s = o.find("p").children(), l = 0;
        n.addEventListener("timeupdate", function() {
            var i = n.currentTime, o = timeConvert(Math.round(i));
            if (s.eq(0).html(o), l > 0) {
                var c = timeToPercent(i, l), r = t.width();
                a.css("width", c / 100 * r);
            }
            i >= l && (n.currentTime = 0, e.trigger("click"));
        }), n.addEventListener("canplay", function() {
            var i = n.duration, t = timeConvert(Math.round(n.duration));
            l = i, s.eq(0).html("00:00"), s.eq(2).html(t), removeLoading(e);
        });
    });
});