function setVisible(i, n) {
    n ? (i.removeClass("tab-hidden"), i.addClass("tab-visible")) : (i.removeClass("tab-visible"), 
    i.addClass("tab-hidden"));
}

function setHomeView() {
    setVisible($(".contact-main"), !1), setVisible($(".home-main"), !0);
}

function setContactView() {
    setVisible($(".home-main"), !1), setVisible($(".contact-main"), !0);
}

function playAudio(i, n) {
    audioPlaying = n, n ? i.play() : i.pause();
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

function percentToTime(i, n) {}

function addTimeSpans(i) {
    i.html("<p> <span>00:00</span><span> / </span><span></span> </p>");
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
}), $(".player-main").find(".audio-wrapper").on("click", function() {
    var i = $(this).find("audio").get(0);
    $(this).hasClass("play-btn-playing") ? ($(this).removeClass("play-btn-playing"), 
    $(this).addClass("play-btn-paused"), playAudio(i, !1)) : ($(this).removeClass("play-btn-paused"), 
    $(this).addClass("play-btn-playing"), playAudio(i, !0));
}), $(".player-main").find(".info-section").on("click", function(i) {
    var n = $(this).offset(), t = $(this).width(), e = clickPosToPercent(i.pageX - n.left, t), a = $(this).siblings().find("audio").get(0), o = a.duration;
    a.currentTime = e / 100 * o;
}), $(".player-main").find(".distance-indicator").on("click", function(i) {
    var n = $(this).siblings(".info-section"), t = n.offset(), e = n.width(), a = clickPosToPercent(i.pageX - t.left, e), o = n.siblings().find("audio").get(0), s = o.duration;
    o.currentTime = a / 100 * s;
}), $(document).ready(function() {
    var i = window.location.href;
    if (-1 != i.indexOf("#")) {
        var n = i.split("/"), t = n[n.length - 1];
        console.log(i), console.log(t);
    }
    $("audio").each(function() {
        var i = $(this), n = i.get(0), t = i.parent(), e = t.siblings(".info-section"), a = t.siblings(".distance-indicator"), o = e.children(".info-time");
        addTimeSpans(o);
        var s = o.find("p").children(), c = 0;
        n.addEventListener("timeupdate", function() {
            var i = n.currentTime, o = timeConvert(Math.round(i));
            if (s.eq(0).html(o), c > 0) {
                var r = timeToPercent(i, c), l = e.width();
                a.css("width", r / 100 * l);
            }
            i >= c && (n.currentTime = 0, t.trigger("click"));
        }), n.addEventListener("loadedmetadata", function() {
            var i = n.duration, t = timeConvert(Math.round(n.duration));
            c = i, s.eq(2).html(t);
        });
    });
});