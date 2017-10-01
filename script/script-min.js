function setVisible(i, t) {
    t ? (i.removeClass("tab-hidden"), i.addClass("tab-visible")) : (i.removeClass("tab-visible"), 
    i.addClass("tab-hidden"));
}

function setHomeView() {
    setVisible($(".contact-main"), !1), setVisible($(".home-main"), !0);
}

function setContactView() {
    setVisible($(".home-main"), !1), setVisible($(".contact-main"), !0);
}

function playAudio(i, t) {
    audioPlaying = t, t ? i.play() : i.pause();
}

function timeConvert(i) {
    var t = "";
    if (i < 60) t = "00:", i < 10 && (t += "0"), t += i; else {
        var e = Math.floor(i / 60), n = i - 60 * e;
        e < 10 && (t += "0"), t += e + ":", n < 10 && (t += "0"), t += n;
    }
    return t;
}

function timeToPercent(i, t) {
    return i / t * 100;
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
}), $(document).ready(function() {
    var i = window.location.href;
    if (-1 != i.indexOf("#")) {
        var t = i.split("/"), e = t[t.length - 1];
        console.log(i), console.log(e);
    }
    $("audio").each(function() {
        var i = $(this), t = i.get(0), e = i.parent(), n = e.siblings(".info-section"), a = e.siblings(".distance-indicator"), o = n.children(".info-time").find("p").children(), s = 0;
        t.addEventListener("timeupdate", function() {
            var i = t.currentTime, e = timeConvert(Math.round(i));
            if (o.eq(0).html(e), s > 0) {
                var n = timeToPercent(i, s);
                a.css("width", n + "%");
            }
        }), t.addEventListener("loadedmetadata", function() {
            var i = t.duration, e = timeConvert(Math.round(t.duration));
            s = i, o.eq(2).html(e);
        });
    });
});