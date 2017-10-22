function setVisible(i, e) {
    e ? (i.removeClass("tab-hidden"), i.addClass("tab-visible")) : (i.removeClass("tab-visible"), 
    i.addClass("tab-hidden"));
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

var audioPlaying = !1, currentAudioSource;

$(".home-btn, .mobile-home-btn").on("click", function() {
    closeSideNav(), setHomeView();
}), $(".contact-btn, .mobile-contact-btn").on("click", function() {
    closeSideNav(), setContactView();
}), $(".bio-btn, .mobile-bio-btn").on("click", function() {
    closeSideNav(), SetBioView();
}), $(".multimedia-btn, .mobile-multimedia-btn").on("click", function() {
    closeSideNav(), setMultimediaView();
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
    var e = $(this).siblings(".info-section"), n = $(this).siblings().find("audio").get(0), t = e.width();
    setPlayPosition(i.pageX - e.offset().left, t, n);
}), $(".player-main").find(".buffer-indicator").on("click", function(i) {
    var e = $(this).siblings(".info-section"), n = $(this).siblings().find("audio").get(0), t = e.width();
    setPlayPosition(i.pageX - e.offset().left, t, n);
}), $(window).on("load", function() {
    $(".status").fadeOut(), $(".preloader").delay(350).fadeOut("slow");
}), $(document).ready(function() {
    var i = 1;
    $("audio").each(function() {
        function e() {
            var i = a.duration, e = timeConvert(Math.round(a.duration));
            u = i, r.eq(0).html("00:00"), r.eq(2).html(e);
        }
        function n() {
            var i = a.buffered, e = timeToPercent(i.end(i.length - 1), u), n = o.width();
            d.css("width", e / 100 * n);
        }
        var t = $(this), a = t.get(0), s = t.parent(), o = s.siblings(".info-section"), l = s.siblings(".distance-indicator"), d = s.siblings(".buffer-indicator"), m = o.children(".info-time");
        addTimeSpans(m);
        var r = m.find("p").children(), c = s.parent().siblings(".player-text")[0], u = 0;
        a.addEventListener("timeupdate", function() {
            var i = a.currentTime, e = timeConvert(Math.round(i));
            if (r.eq(0).html(e), u > 0) {
                var t = timeToPercent(i, u), d = o.width();
                l.css("width", t / 100 * d);
            }
            i >= u && (a.currentTime = 0, s.trigger("click")), n();
        }), a.addEventListener("progress", function() {
            a.buffered.length > 0 && n();
        }), a.addEventListener("loadedmetadata", function() {
            e(), removeLoading(s);
        }), a.readyState > 3 && (e(), removeLoading(s)), loadDescription(c, "track_" + i), 
        i++;
    });
}), $(".header-ham-wrap").on("click", function() {
    var i = $(".header-overlay-buttons");
    i.hasClass("menu-hidden") ? (i.removeClass("menu-hidden"), i.addClass("menu-visible"), 
    $(this).removeClass("ham-closed"), $(this).addClass("ham-open")) : (i.removeClass("menu-visible"), 
    i.addClass("menu-hidden"), $(this).removeClass("ham-open"), $(this).addClass("ham-closed"));
});