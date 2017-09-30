function setVisible(e, t) {
    t ? (e.removeClass("tab-hidden"), e.addClass("tab-visible")) : (e.removeClass("tab-visible"),
    e.addClass("tab-hidden"));
}

function setHomeView() {
    setVisible($(".contact-main"), !1), setVisible($(".home-main"), !0);
}

function setContactView() {
    setVisible($(".home-main"), !1), setVisible($(".contact-main"), !0);
}

$(".home-btn").on("click", function() {
    setHomeView();
}), $(".contact-btn").on("click", function() {
    setContactView();
}), $(".left-author").on("click", function() {
    setHomeView();
}), $(".left-author.sub-author").on("click", function() {
    setHomeView();
}), $(document).ready(function() {
    var e = window.location.href;
    if (-1 != e.indexOf("#")) {
        var t = e.split("/"), i = t[t.length - 1];
        console.log(e), console.log(i);
    }
});
