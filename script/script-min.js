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

function loadDescription(i, e) {
    $.ajax({
        url: "text/" + e + ".txt",
        dataType: "text",
        success: function(e) {
            i.html(e);
        }
    });
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
}), $(".audio-btn").on({
    mouseover: function() {
        $(this).hasClass("audio-main-hover") || $(this).addClass("audio-main-hover");
    },
    mouseleave: function() {
        $(this).removeClass("audio-main-hover");
    },
    click: function() {}
}), $(".audio-btn h3#audio-sub-one").on("click", function() {
    $(".audio-btn").removeClass("audio-main-hover"), setAudioView();
}), $(".mobile-audio-btn").on("click", function() {
    closeSideNav(), setAudioView();
}), $(".player-main").find(".audio-wrapper").on("click", function() {
    var i = $(this).find("audio").get(0);
    $(this).hasClass("play-btn-playing") ? ($(this).removeClass("play-btn-playing"), 
    $(this).addClass("play-btn-paused"), playAudio(i, !1)) : ($(this).removeClass("play-btn-paused"), 
    $(this).addClass("play-btn-playing"), i.currentTime <= 0 && (i.currentTime = .05), 
    playAudio(i, !0));
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
    var i = 1;
    $("audio").each(function() {
        function e() {
            var i = t.duration, e = timeConvert(Math.round(t.duration));
            m = i, c.eq(0).html("00:00"), c.eq(2).html(e);
        }
        function n() {
            var i = t.buffered, e = timeToPercent(i.end(i.length - 1), m), n = o.width();
            l.css("width", e / 100 * n);
        }
        var a = $(this), t = a.get(0), s = a.parent(), o = s.siblings(".info-section"), d = s.siblings(".distance-indicator"), l = s.siblings(".buffer-indicator"), r = o.children(".info-time");
        addTimeSpans(r);
        var c = r.find("p").children(), u = s.parent().siblings(".player-text").find("p").eq(0), m = 0;
        t.addEventListener("timeupdate", function() {
            var i = t.currentTime, e = timeConvert(Math.round(i));
            if (c.eq(0).html(e), m > 0) {
                var a = timeToPercent(i, m), l = o.width();
                d.css("width", a / 100 * l);
            }
            i >= m && (t.currentTime = 0, s.trigger("click")), n();
        }), t.addEventListener("progress", function() {
            t.buffered.length > 0 && n();
        }), t.addEventListener("loadedmetadata", function() {
            e(), removeLoading(s);
        }), t.readyState > 3 && (e(), removeLoading(s)), loadDescription(u, "track_" + i), 
        i++;
    });
}), $(".header-ham-wrap").on("click", function() {
    var i = $(".header-overlay-buttons");
    i.hasClass("menu-hidden") ? (i.removeClass("menu-hidden"), i.addClass("menu-visible"), 
    $(this).removeClass("ham-closed"), $(this).addClass("ham-open")) : (i.removeClass("menu-visible"), 
    i.addClass("menu-hidden"), $(this).removeClass("ham-open"), $(this).addClass("ham-closed"));
});