

!function(a) {
    "use strict";
    var b = function(b, c) {
        this.options = c;
        this.$element = a(b).delegate('[data-dismiss="modal"]', "click.dismiss.modal", a.proxy(this.hide, this));
        this.options.remote && this.$element.find(".modal-body").load(this.options.remote);
    };
    b.prototype = {
        constructor: b,
        toggle: function() {
            return this[!this.isShown ? "show" : "hide"]();
        },
        show: function() {
            var b = this, c = a.Event("show");
            this.$element.trigger(c);
            if (this.isShown || c.isDefaultPrevented()) return;
            this.isShown = true;
            this.escape();
            this.backdrop(function() {
                var c = a.support.transition && b.$element.hasClass("fade");
                if (!b.$element.parent().length) {
                    b.$element.appendTo(document.body);
                }
                b.$element.show();
                if (c) {
                    b.$element[0].offsetWidth;
                }
                b.$element.addClass("in").attr("aria-hidden", false);
                b.enforceFocus();
                c ? b.$element.one(a.support.transition.end, function() {
                    b.$element.focus().trigger("shown");
                }) : b.$element.focus().trigger("shown");
            });
        },
        hide: function(b) {
            b && b.preventDefault();
            var c = this;
            b = a.Event("hide");
            this.$element.trigger(b);
            if (!this.isShown || b.isDefaultPrevented()) return;
            this.isShown = false;
            this.escape();
            a(document).off("focusin.modal");
            this.$element.removeClass("in").attr("aria-hidden", true);
            a.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal();
        },
        enforceFocus: function() {
            var b = this;
            a(document).on("focusin.modal", function(a) {
                if (b.$element[0] !== a.target && !b.$element.has(a.target).length) {
                    b.$element.focus();
                }
            });
        },
        escape: function() {
            var a = this;
            if (this.isShown && this.options.keyboard) {
                this.$element.on("keyup.dismiss.modal", function(b) {
                    b.which == 27 && a.hide();
                });
            } else if (!this.isShown) {
                this.$element.off("keyup.dismiss.modal");
            }
        },
        hideWithTransition: function() {
            var b = this, c = setTimeout(function() {
                b.$element.off(a.support.transition.end);
                b.hideModal();
            }, 500);
            this.$element.one(a.support.transition.end, function() {
                clearTimeout(c);
                b.hideModal();
            });
        },
        hideModal: function() {
            var a = this;
            this.$element.hide();
            this.backdrop(function() {
                a.removeBackdrop();
                a.$element.trigger("hidden");
            });
        },
        removeBackdrop: function() {
            this.$backdrop && this.$backdrop.remove();
            this.$backdrop = null;
        },
        backdrop: function(b) {
            var c = this, d = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var e = a.support.transition && d;
                this.$backdrop = a('<div class="modal-backdrop ' + d + '" />').appendTo(document.body);
                this.$backdrop.click(this.options.backdrop == "static" ? a.proxy(this.$element[0].focus, this.$element[0]) : a.proxy(this.hide, this));
                if (e) this.$backdrop[0].offsetWidth;
                this.$backdrop.addClass("in");
                if (!b) return;
                e ? this.$backdrop.one(a.support.transition.end, b) : b();
            } else if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass("in");
                a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, b) : b();
            } else if (b) {
                b();
            }
        }
    };
   
    a.fn.modal.defaults = {
        backdrop: true,
        keyboard: true,
        show: true
    };
    a.fn.modal.Constructor = b;
    a.fn.modal.noConflict = function() {
        a.fn.modal = c;
        return this;
    };
    a(document).on("click.modal.data-api", '[data-toggle="modal"]', function(b) {
        var c = a(this), d = c.attr("href"), e = a(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, "")), f = e.data("modal") ? "toggle" : a.extend({
            remote: !/#/.test(d) && d
        }, e.data(), c.data());
        b.preventDefault();
        e.modal(f).one("hide", function() {
            c.focus();
        });
    });
}(window.jQuery);

(function(a, b, c) {
    a.fn.backstretch = function(d, e) {
        (d === c || 0 === d.length) && a.error("No images were supplied for Backstretch");
        0 === a(b).scrollTop() && b.scrollTo(0, 0);
        return this.each(function() {
            var b = a(this), c = b.data("backstretch");
            if (c) {
                if ("string" == typeof d && "function" == typeof c[d]) {
                    c[d](e);
                    return;
                }
                e = a.extend(c.options, e);
                c.destroy(!0);
            }
            c = new f(this, d, e);
            b.data("backstretch", c);
        });
    };
    a.backstretch = function(b, c) {
        return a("body").backstretch(b, c).data("backstretch");
    };
    a.expr[":"].backstretch = function(b) {
        return a(b).data("backstretch") !== c;
    };
    a.fn.backstretch.defaults = {
        centeredX: !0,
        centeredY: !0,
        duration: 5e3,
        fade: 0
    };
    var d = {
        left: 0,
        top: 0,
        overflow: "hidden",
        margin: 0,
        padding: 0,
        height: "100%",
        width: "100%",
        zIndex: -999999
    }, e = {
        position: "absolute",
        display: "none",
        margin: 0,
        padding: 0,
        border: "none",
        width: "auto",
        height: "auto",
        maxHeight: "none",
        maxWidth: "none",
        zIndex: -999999
    }, f = function(c, e, f) {
        this.options = a.extend({}, a.fn.backstretch.defaults, f || {});
        this.images = a.isArray(e) ? e : [ e ];
        a.each(this.images, function() {
            a("<img />")[0].src = this;
        });
        this.isBody = c === document.body;
        this.$container = a(c);
        this.$root = this.isBody ? g ? a(b) : a(document) : this.$container;
        c = this.$container.children(".backstretch").first();
        this.$wrap = c.length ? c : a('<div class="backstretch"></div>').css(d).appendTo(this.$container);
        this.isBody || (c = this.$container.css("position"), e = this.$container.css("zIndex"), 
        this.$container.css({
            position: "static" === c ? "relative" : c,
            zIndex: "auto" === e ? 0 : e,
            background: "none"
        }), this.$wrap.css({
            zIndex: -999998
        }));
        this.$wrap.css({
            position: this.isBody && g ? "fixed" : "absolute"
        });
        this.index = 0;
        this.show(this.index);
        a(b).on("resize.backstretch", a.proxy(this.resize, this)).on("orientationchange.backstretch", a.proxy(function() {
            this.isBody && 0 === b.pageYOffset && (b.scrollTo(0, 1), this.resize());
        }, this));
    };
    f.prototype = {
        resize: function() {
            try {
                var a = {
                    left: 0,
                    top: 0
                }, c = this.isBody ? this.$root.width() : this.$root.innerWidth(), d = c, e = this.isBody ? b.innerHeight ? b.innerHeight : this.$root.height() : this.$root.innerHeight(), f = d / this.$img.data("ratio"), g;
                f >= e ? (g = (f - e) / 2, this.options.centeredY && (a.top = "-" + g + "px")) : (f = e, 
                d = f * this.$img.data("ratio"), g = (d - c) / 2, this.options.centeredX && (a.left = "-" + g + "px"));
                this.$wrap.css({
                    width: c,
                    height: e
                }).find("img:not(.deleteable)").css({
                    width: d,
                    height: f
                }).css(a);
            } catch (h) {}
            return this;
        },
        show: function(b) {
            if (!(Math.abs(b) > this.images.length - 1)) {
                var c = this, d = c.$wrap.find("img").addClass("deleteable"), f = {
                    relatedTarget: c.$container[0]
                };
                c.$container.trigger(a.Event("backstretch.before", f), [ c, b ]);
                this.index = b;
                clearInterval(c.interval);
                c.$img = a("<img />").css(e).bind("load", function(e) {
                    var g = this.width || a(e.target).width();
                    e = this.height || a(e.target).height();
                    a(this).data("ratio", g / e);
                    a(this).fadeIn(c.options.speed || c.options.fade, function() {
                        d.remove();
                        c.paused || c.cycle();
                        a([ "after", "show" ]).each(function() {
                            c.$container.trigger(a.Event("backstretch." + this, f), [ c, b ]);
                        });
                    });
                    c.resize();
                }).appendTo(c.$wrap);
                c.$img.attr("src", c.images[b]);
                return c;
            }
        },
        next: function() {
            return this.show(this.index < this.images.length - 1 ? this.index + 1 : 0);
        },
        prev: function() {
            return this.show(0 === this.index ? this.images.length - 1 : this.index - 1);
        },
        pause: function() {
            this.paused = !0;
            return this;
        },
        resume: function() {
            this.paused = !1;
            this.next();
            return this;
        },
        cycle: function() {
            1 < this.images.length && (clearInterval(this.interval), this.interval = setInterval(a.proxy(function() {
                this.paused || this.next();
            }, this), this.options.duration));
            return this;
        },
        destroy: function(c) {
            a(b).off("resize.backstretch orientationchange.backstretch");
            clearInterval(this.interval);
            c || this.$wrap.remove();
            this.$container.removeData("backstretch");
        }
    };
    var g, h = navigator.userAgent, i = navigator.platform, j = h.match(/AppleWebKit\/([0-9]+)/), j = !!j && j[1], k = h.match(/Fennec\/([0-9]+)/), k = !!k && k[1], l = h.match(/Opera Mobi\/([0-9]+)/), m = !!l && l[1], n = h.match(/MSIE ([0-9]+)/), n = !!n && n[1];
    g = !((-1 < i.indexOf("iPhone") || -1 < i.indexOf("iPad") || -1 < i.indexOf("iPod")) && j && 534 > j || b.operamini && "[object OperaMini]" === {}.toString.call(b.operamini) || l && 7458 > m || -1 < h.indexOf("Android") && j && 533 > j || k && 6 > k || "palmGetResource" in b && j && 534 > j || -1 < h.indexOf("MeeGo") && -1 < h.indexOf("NokiaBrowser/8.5.0") || n && 6 >= n);
})(jQuery, window);

!function(a) {
    var b = {}, c = {
        mode: "horizontal",
        slideSelector: "",
        infiniteLoop: !0,
        hideControlOnEnd: !1,
        speed: 500,
        easing: null,
        slideMargin: 0,
        startSlide: 0,
        randomStart: !1,
        captions: !1,
        ticker: !1,
        tickerHover: !1,
        adaptiveHeight: !1,
        adaptiveHeightSpeed: 500,
        video: !1,
        useCSS: !0,
        preloadImages: "visible",
        responsive: !0,
        touchEnabled: !0,
        swipeThreshold: 50,
        oneToOneTouch: !0,
        preventDefaultSwipeX: !0,
        preventDefaultSwipeY: !1,
        pager: !0,
        pagerType: "full",
        pagerShortSeparator: " / ",
        pagerSelector: null,
        buildPager: null,
        pagerCustom: null,
        controls: !0,
        nextText: "Next",
        prevText: "Prev",
        nextSelector: null,
        prevSelector: null,
        autoControls: !1,
        startText: "Start",
        stopText: "Stop",
        autoControlsCombine: !1,
        autoControlsSelector: null,
        auto: !1,
        pause: 4e3,
        autoStart: !0,
        autoDirection: "next",
        autoHover: !1,
        autoDelay: 0,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 0,
        slideWidth: 0,
        onSliderLoad: function() {},
        onSlideBefore: function() {},
        onSlideAfter: function() {},
        onSlideNext: function() {},
        onSlidePrev: function() {}
    };
    a.fn.bxSlider = function(d) {
        if (0 == this.length) return this;
        if (this.length > 1) return this.each(function() {
            a(this).bxSlider(d);
        }), this;
        var e = {}, f = this;
        b.el = this;
        var g = a(window).width(), h = a(window).height(), j = function() {
            e.settings = a.extend({}, c, d), e.settings.slideWidth = parseInt(e.settings.slideWidth), 
            e.children = f.children(e.settings.slideSelector), e.children.length < e.settings.minSlides && (e.settings.minSlides = e.children.length), 
            e.children.length < e.settings.maxSlides && (e.settings.maxSlides = e.children.length), 
            e.settings.randomStart && (e.settings.startSlide = Math.floor(Math.random() * e.children.length)), 
            e.active = {
                index: e.settings.startSlide
            }, e.carousel = e.settings.minSlides > 1 || e.settings.maxSlides > 1, e.carousel && (e.settings.preloadImages = "all"), 
            e.minThreshold = e.settings.minSlides * e.settings.slideWidth + (e.settings.minSlides - 1) * e.settings.slideMargin, 
            e.maxThreshold = e.settings.maxSlides * e.settings.slideWidth + (e.settings.maxSlides - 1) * e.settings.slideMargin, 
            e.working = !1, e.controls = {}, e.interval = null, e.animProp = "vertical" == e.settings.mode ? "top" : "left", 
            e.usingCSS = e.settings.useCSS && "fade" != e.settings.mode && function() {
                var a = document.createElement("div"), b = [ "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective" ];
                for (var c in b) if (void 0 !== a.style[b[c]]) return e.cssPrefix = b[c].replace("Perspective", "").toLowerCase(), 
                e.animProp = "-" + e.cssPrefix + "-transform", !0;
                return !1;
            }(), "vertical" == e.settings.mode && (e.settings.maxSlides = e.settings.minSlides), 
            f.data("origStyle", f.attr("style")), f.children(e.settings.slideSelector).each(function() {
                a(this).data("origStyle", a(this).attr("style"));
            }), k();
        }, k = function() {
            f.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'), e.viewport = f.parent(), 
            e.loader = a('<div class="bx-loading" />'), e.viewport.prepend(e.loader), f.css({
                width: "horizontal" == e.settings.mode ? 100 * e.children.length + 215 + "%" : "auto",
                position: "relative"
            }), e.usingCSS && e.settings.easing ? f.css("-" + e.cssPrefix + "-transition-timing-function", e.settings.easing) : e.settings.easing || (e.settings.easing = "swing"), 
            q(), e.viewport.css({
                width: "100%",
                overflow: "hidden",
                position: "relative"
            }), e.viewport.parent().css({
                maxWidth: o()
            }), e.settings.pager || e.viewport.parent().css({
                margin: "0 auto 0px"
            }), e.children.css({
                "float": "horizontal" == e.settings.mode ? "left" : "none",
                listStyle: "none",
                position: "relative"
            }), e.children.css("width", p()), "horizontal" == e.settings.mode && e.settings.slideMargin > 0 && e.children.css("marginRight", e.settings.slideMargin), 
            "vertical" == e.settings.mode && e.settings.slideMargin > 0 && e.children.css("marginBottom", e.settings.slideMargin), 
            "fade" == e.settings.mode && (e.children.css({
                position: "absolute",
                zIndex: 0,
                display: "none"
            }), e.children.eq(e.settings.startSlide).css({
                zIndex: 50,
                display: "block"
            })), e.controls.el = a('<div class="bx-controls" />'), e.settings.captions && z(), 
            e.active.last = e.settings.startSlide == r() - 1, e.settings.video && f.fitVids();
            var b = e.children.eq(e.settings.startSlide);
            "all" == e.settings.preloadImages && (b = e.children), e.settings.ticker ? e.settings.pager = !1 : (e.settings.pager && w(), 
            e.settings.controls && x(), e.settings.auto && e.settings.autoControls && y(), (e.settings.controls || e.settings.autoControls || e.settings.pager) && e.viewport.after(e.controls.el)), 
            l(b, m);
        }, l = function(b, c) {
            var d = b.find("img, iframe").length;
            if (0 == d) return c(), void 0;
            var e = 0;
            b.find("img, iframe").each(function() {
                a(this).is("img") && a(this).attr("src", a(this).attr("src") + "?timestamp=" + new Date().getTime()), 
                a(this).load(function() {
                    setTimeout(function() {
                        ++e == d && c();
                    }, 0);
                });
            });
        }, m = function() {
            if (e.settings.infiniteLoop && "fade" != e.settings.mode && !e.settings.ticker) {
                var b = "vertical" == e.settings.mode ? e.settings.minSlides : e.settings.maxSlides, c = e.children.slice(0, b).clone().addClass("bx-clone"), d = e.children.slice(-b).clone().addClass("bx-clone");
                f.append(c).prepend(d);
            }
            e.loader.remove(), t(), "vertical" == e.settings.mode && (e.settings.adaptiveHeight = !0), 
            e.viewport.height(n()), f.redrawSlider(), e.settings.onSliderLoad(e.active.index), 
            e.initialized = !0, e.settings.responsive && a(window).bind("resize", Q), e.settings.auto && e.settings.autoStart && J(), 
            e.settings.ticker && K(), e.settings.pager && F(e.settings.startSlide), e.settings.controls && I(), 
            e.settings.touchEnabled && !e.settings.ticker && M();
        }, n = function() {
            var b = 0, c = a();
            if ("vertical" == e.settings.mode || e.settings.adaptiveHeight) if (e.carousel) {
                var d = 1 == e.settings.moveSlides ? e.active.index : e.active.index * s();
                for (c = e.children.eq(d), i = 1; i <= e.settings.maxSlides - 1; i++) c = d + i >= e.children.length ? c.add(e.children.eq(i - 1)) : c.add(e.children.eq(d + i));
            } else c = e.children.eq(e.active.index); else c = e.children;
            return "vertical" == e.settings.mode ? (c.each(function() {
                b += a(this).outerHeight();
            }), e.settings.slideMargin > 0 && (b += e.settings.slideMargin * (e.settings.minSlides - 1))) : b = Math.max.apply(Math, c.map(function() {
                return a(this).outerHeight(!1);
            }).get()), b;
        }, o = function() {
            var a = "100%";
            return e.settings.slideWidth > 0 && (a = "horizontal" == e.settings.mode ? e.settings.maxSlides * e.settings.slideWidth + (e.settings.maxSlides - 1) * e.settings.slideMargin : e.settings.slideWidth), 
            a;
        }, p = function() {
            var a = e.settings.slideWidth, b = e.viewport.width();
            return 0 == e.settings.slideWidth || e.settings.slideWidth > b && !e.carousel || "vertical" == e.settings.mode ? a = b : e.settings.maxSlides > 1 && "horizontal" == e.settings.mode && (b > e.maxThreshold || b < e.minThreshold && (a = (b - e.settings.slideMargin * (e.settings.minSlides - 1)) / e.settings.minSlides)), 
            a;
        }, q = function() {
            var a = 1;
            if ("horizontal" == e.settings.mode && e.settings.slideWidth > 0) if (e.viewport.width() < e.minThreshold) a = e.settings.minSlides; else if (e.viewport.width() > e.maxThreshold) a = e.settings.maxSlides; else {
                var b = e.children.first().width();
                a = Math.floor(e.viewport.width() / b);
            } else "vertical" == e.settings.mode && (a = e.settings.minSlides);
            return a;
        }, r = function() {
            var a = 0;
            if (e.settings.moveSlides > 0) if (e.settings.infiniteLoop) a = e.children.length / s(); else for (var b = 0, c = 0; b < e.children.length; ) ++a, 
            b = c + q(), c += e.settings.moveSlides <= q() ? e.settings.moveSlides : q(); else a = Math.ceil(e.children.length / q());
            return a;
        }, s = function() {
            return e.settings.moveSlides > 0 && e.settings.moveSlides <= q() ? e.settings.moveSlides : q();
        }, t = function() {
            if (e.children.length > e.settings.maxSlides && e.active.last && !e.settings.infiniteLoop) {
                if ("horizontal" == e.settings.mode) {
                    var a = e.children.last(), b = a.position();
                    u(-(b.left - (e.viewport.width() - a.width())), "reset", 0);
                } else if ("vertical" == e.settings.mode) {
                    var c = e.children.length - e.settings.minSlides, b = e.children.eq(c).position();
                    u(-b.top, "reset", 0);
                }
            } else {
                var b = e.children.eq(e.active.index * s()).position();
                e.active.index == r() - 1 && (e.active.last = !0), void 0 != b && ("horizontal" == e.settings.mode ? u(-b.left, "reset", 0) : "vertical" == e.settings.mode && u(-b.top, "reset", 0));
            }
        }, u = function(a, b, c, d) {
            if (e.usingCSS) {
                var g = "vertical" == e.settings.mode ? "translate3d(0, " + a + "px, 0)" : "translate3d(" + a + "px, 0, 0)";
                f.css("-" + e.cssPrefix + "-transition-duration", c / 1e3 + "s"), "slide" == b ? (f.css(e.animProp, g), 
                f.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                    f.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), G();
                })) : "reset" == b ? f.css(e.animProp, g) : "ticker" == b && (f.css("-" + e.cssPrefix + "-transition-timing-function", "linear"), 
                f.css(e.animProp, g), f.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                    f.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), u(d.resetValue, "reset", 0), 
                    L();
                }));
            } else {
                var h = {};
                h[e.animProp] = a, "slide" == b ? f.animate(h, c, e.settings.easing, function() {
                    G();
                }) : "reset" == b ? f.css(e.animProp, a) : "ticker" == b && f.animate(h, speed, "linear", function() {
                    u(d.resetValue, "reset", 0), L();
                });
            }
        }, v = function() {
            for (var b = "", c = r(), d = 0; c > d; d++) {
                var f = "";
                e.settings.buildPager && a.isFunction(e.settings.buildPager) ? (f = e.settings.buildPager(d), 
                e.pagerEl.addClass("bx-custom-pager")) : (f = d + 1, e.pagerEl.addClass("bx-default-pager")), 
                b += '<div class="bx-pager-item"><a href="" data-slide-index="' + d + '" class="bx-pager-link">' + f + "</a></div>";
            }
            e.pagerEl.html(b);
        }, w = function() {
            e.settings.pagerCustom ? e.pagerEl = a(e.settings.pagerCustom) : (e.pagerEl = a('<div class="bx-pager" />'), 
            e.settings.pagerSelector ? a(e.settings.pagerSelector).html(e.pagerEl) : e.controls.el.addClass("bx-has-pager").append(e.pagerEl), 
            v()), e.pagerEl.delegate("a", "click", E);
        }, x = function() {
            e.controls.next = a('<a class="bx-next" href="">' + e.settings.nextText + "</a>"), 
            e.controls.prev = a('<a class="bx-prev" href="">' + e.settings.prevText + "</a>"), 
            e.controls.next.bind("click", A), e.controls.prev.bind("click", B), e.settings.nextSelector && a(e.settings.nextSelector).append(e.controls.next), 
            e.settings.prevSelector && a(e.settings.prevSelector).append(e.controls.prev), e.settings.nextSelector || e.settings.prevSelector || (e.controls.directionEl = a('<div class="bx-controls-direction" />'), 
            e.controls.directionEl.append(e.controls.prev).append(e.controls.next), e.controls.el.addClass("bx-has-controls-direction").append(e.controls.directionEl));
        }, y = function() {
            e.controls.start = a('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + e.settings.startText + "</a></div>"), 
            e.controls.stop = a('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + e.settings.stopText + "</a></div>"), 
            e.controls.autoEl = a('<div class="bx-controls-auto" />'), e.controls.autoEl.delegate(".bx-start", "click", C), 
            e.controls.autoEl.delegate(".bx-stop", "click", D), e.settings.autoControlsCombine ? e.controls.autoEl.append(e.controls.start) : e.controls.autoEl.append(e.controls.start).append(e.controls.stop), 
            e.settings.autoControlsSelector ? a(e.settings.autoControlsSelector).html(e.controls.autoEl) : e.controls.el.addClass("bx-has-controls-auto").append(e.controls.autoEl), 
            H(e.settings.autoStart ? "stop" : "start");
        }, z = function() {
            e.children.each(function() {
                var b = a(this).find("img:first").attr("title");
                void 0 != b && ("" + b).length && a(this).append('<div class="bx-caption"><span>' + b + "</span></div>");
            });
        }, A = function(a) {
            e.settings.auto && f.stopAuto(), f.goToNextSlide(), a.preventDefault();
        }, B = function(a) {
            e.settings.auto && f.stopAuto(), f.goToPrevSlide(), a.preventDefault();
        }, C = function(a) {
            f.startAuto(), a.preventDefault();
        }, D = function(a) {
            f.stopAuto(), a.preventDefault();
        }, E = function(b) {
            e.settings.auto && f.stopAuto();
            var c = a(b.currentTarget), d = parseInt(c.attr("data-slide-index"));
            d != e.active.index && f.goToSlide(d), b.preventDefault();
        }, F = function(b) {
            var c = e.children.length;
            return "short" == e.settings.pagerType ? (e.settings.maxSlides > 1 && (c = Math.ceil(e.children.length / e.settings.maxSlides)), 
            e.pagerEl.html(b + 1 + e.settings.pagerShortSeparator + c), void 0) : (e.pagerEl.find("a").removeClass("active"), 
            e.pagerEl.each(function(c, d) {
                a(d).find("a").eq(b).addClass("active");
            }), void 0);
        }, G = function() {
            if (e.settings.infiniteLoop) {
                var a = "";
                0 == e.active.index ? a = e.children.eq(0).position() : e.active.index == r() - 1 && e.carousel ? a = e.children.eq((r() - 1) * s()).position() : e.active.index == e.children.length - 1 && (a = e.children.eq(e.children.length - 1).position()), 
                "horizontal" == e.settings.mode ? u(-a.left, "reset", 0) : "vertical" == e.settings.mode && u(-a.top, "reset", 0);
            }
            e.working = !1, e.settings.onSlideAfter(e.children.eq(e.active.index), e.oldIndex, e.active.index);
        }, H = function(a) {
            e.settings.autoControlsCombine ? e.controls.autoEl.html(e.controls[a]) : (e.controls.autoEl.find("a").removeClass("active"), 
            e.controls.autoEl.find("a:not(.bx-" + a + ")").addClass("active"));
        }, I = function() {
            1 == r() ? (e.controls.prev.addClass("disabled"), e.controls.next.addClass("disabled")) : !e.settings.infiniteLoop && e.settings.hideControlOnEnd && (0 == e.active.index ? (e.controls.prev.addClass("disabled"), 
            e.controls.next.removeClass("disabled")) : e.active.index == r() - 1 ? (e.controls.next.addClass("disabled"), 
            e.controls.prev.removeClass("disabled")) : (e.controls.prev.removeClass("disabled"), 
            e.controls.next.removeClass("disabled")));
        }, J = function() {
            e.settings.autoDelay > 0 ? setTimeout(f.startAuto, e.settings.autoDelay) : f.startAuto(), 
            e.settings.autoHover && f.hover(function() {
                e.interval && (f.stopAuto(!0), e.autoPaused = !0);
            }, function() {
                e.autoPaused && (f.startAuto(!0), e.autoPaused = null);
            });
        }, K = function() {
            var b = 0;
            if ("next" == e.settings.autoDirection) f.append(e.children.clone().addClass("bx-clone")); else {
                f.prepend(e.children.clone().addClass("bx-clone"));
                var c = e.children.first().position();
                b = "horizontal" == e.settings.mode ? -c.left : -c.top;
            }
            u(b, "reset", 0), e.settings.pager = !1, e.settings.controls = !1, e.settings.autoControls = !1, 
            e.settings.tickerHover && !e.usingCSS && e.viewport.hover(function() {
                f.stop();
            }, function() {
                var b = 0;
                e.children.each(function() {
                    b += "horizontal" == e.settings.mode ? a(this).outerWidth(!0) : a(this).outerHeight(!0);
                });
                var c = e.settings.speed / b, d = "horizontal" == e.settings.mode ? "left" : "top", g = c * (b - Math.abs(parseInt(f.css(d))));
                L(g);
            }), L();
        }, L = function(a) {
            speed = a ? a : e.settings.speed;
            var b = {
                left: 0,
                top: 0
            }, c = {
                left: 0,
                top: 0
            };
            "next" == e.settings.autoDirection ? b = f.find(".bx-clone").first().position() : c = e.children.first().position();
            var d = "horizontal" == e.settings.mode ? -b.left : -b.top, g = "horizontal" == e.settings.mode ? -c.left : -c.top, h = {
                resetValue: g
            };
            u(d, "ticker", speed, h);
        }, M = function() {
            e.touch = {
                start: {
                    x: 0,
                    y: 0
                },
                end: {
                    x: 0,
                    y: 0
                }
            }, e.viewport.bind("touchstart", N);
        }, N = function(a) {
            if (e.working) a.preventDefault(); else {
                e.touch.originalPos = f.position();
                var b = a.originalEvent;
                e.touch.start.x = b.changedTouches[0].pageX, e.touch.start.y = b.changedTouches[0].pageY, 
                e.viewport.bind("touchmove", O), e.viewport.bind("touchend", P);
            }
        }, O = function(a) {
            var b = a.originalEvent, c = Math.abs(b.changedTouches[0].pageX - e.touch.start.x), d = Math.abs(b.changedTouches[0].pageY - e.touch.start.y);
            if (3 * c > d && e.settings.preventDefaultSwipeX ? a.preventDefault() : 3 * d > c && e.settings.preventDefaultSwipeY && a.preventDefault(), 
            "fade" != e.settings.mode && e.settings.oneToOneTouch) {
                var f = 0;
                if ("horizontal" == e.settings.mode) {
                    var g = b.changedTouches[0].pageX - e.touch.start.x;
                    f = e.touch.originalPos.left + g;
                } else {
                    var g = b.changedTouches[0].pageY - e.touch.start.y;
                    f = e.touch.originalPos.top + g;
                }
                u(f, "reset", 0);
            }
        }, P = function(a) {
            e.viewport.unbind("touchmove", O);
            var b = a.originalEvent, c = 0;
            if (e.touch.end.x = b.changedTouches[0].pageX, e.touch.end.y = b.changedTouches[0].pageY, 
            "fade" == e.settings.mode) {
                var d = Math.abs(e.touch.start.x - e.touch.end.x);
                d >= e.settings.swipeThreshold && (e.touch.start.x > e.touch.end.x ? f.goToNextSlide() : f.goToPrevSlide(), 
                f.stopAuto());
            } else {
                var d = 0;
                "horizontal" == e.settings.mode ? (d = e.touch.end.x - e.touch.start.x, c = e.touch.originalPos.left) : (d = e.touch.end.y - e.touch.start.y, 
                c = e.touch.originalPos.top), !e.settings.infiniteLoop && (0 == e.active.index && d > 0 || e.active.last && 0 > d) ? u(c, "reset", 200) : Math.abs(d) >= e.settings.swipeThreshold ? (0 > d ? f.goToNextSlide() : f.goToPrevSlide(), 
                f.stopAuto()) : u(c, "reset", 200);
            }
            e.viewport.unbind("touchend", P);
        }, Q = function() {
            var b = a(window).width(), c = a(window).height();
            (g != b || h != c) && (g = b, h = c, f.redrawSlider());
        };
        return f.goToSlide = function(b, c) {
            if (!e.working && e.active.index != b) if (e.working = !0, e.oldIndex = e.active.index, 
            e.active.index = 0 > b ? r() - 1 : b >= r() ? 0 : b, e.settings.onSlideBefore(e.children.eq(e.active.index), e.oldIndex, e.active.index), 
            "next" == c ? e.settings.onSlideNext(e.children.eq(e.active.index), e.oldIndex, e.active.index) : "prev" == c && e.settings.onSlidePrev(e.children.eq(e.active.index), e.oldIndex, e.active.index), 
            e.active.last = e.active.index >= r() - 1, e.settings.pager && F(e.active.index), 
            e.settings.controls && I(), "fade" == e.settings.mode) e.settings.adaptiveHeight && e.viewport.height() != n() && e.viewport.animate({
                height: n()
            }, e.settings.adaptiveHeightSpeed), e.children.filter(":visible").fadeOut(e.settings.speed).css({
                zIndex: 0
            }), e.children.eq(e.active.index).css("zIndex", 51).fadeIn(e.settings.speed, function() {
                a(this).css("zIndex", 50), G();
            }); else {
                e.settings.adaptiveHeight && e.viewport.height() != n() && e.viewport.animate({
                    height: n()
                }, e.settings.adaptiveHeightSpeed);
                var d = 0, g = {
                    left: 0,
                    top: 0
                };
                if (!e.settings.infiniteLoop && e.carousel && e.active.last) if ("horizontal" == e.settings.mode) {
                    var h = e.children.eq(e.children.length - 1);
                    g = h.position(), d = e.viewport.width() - h.outerWidth();
                } else {
                    var i = e.children.length - e.settings.minSlides;
                    g = e.children.eq(i).position();
                } else if (e.carousel && e.active.last && "prev" == c) {
                    var j = 1 == e.settings.moveSlides ? e.settings.maxSlides - s() : (r() - 1) * s() - (e.children.length - e.settings.maxSlides), h = f.children(".bx-clone").eq(j);
                    g = h.position();
                } else if ("next" == c && 0 == e.active.index) g = f.find("> .bx-clone").eq(e.settings.maxSlides).position(), 
                e.active.last = !1; else if (b >= 0) {
                    var k = b * s();
                    g = e.children.eq(k).position();
                }
                if ("undefined" != typeof g) {
                    var l = "horizontal" == e.settings.mode ? -(g.left - d) : -g.top;
                    u(l, "slide", e.settings.speed);
                }
            }
        }, f.goToNextSlide = function() {
            if (e.settings.infiniteLoop || !e.active.last) {
                var a = parseInt(e.active.index) + 1;
                f.goToSlide(a, "next");
            }
        }, f.goToPrevSlide = function() {
            if (e.settings.infiniteLoop || 0 != e.active.index) {
                var a = parseInt(e.active.index) - 1;
                f.goToSlide(a, "prev");
            }
        }, f.startAuto = function(a) {
            e.interval || (e.interval = setInterval(function() {
                "next" == e.settings.autoDirection ? f.goToNextSlide() : f.goToPrevSlide();
            }, e.settings.pause), e.settings.autoControls && 1 != a && H("stop"));
        }, f.stopAuto = function(a) {
            e.interval && (clearInterval(e.interval), e.interval = null, e.settings.autoControls && 1 != a && H("start"));
        }, f.getCurrentSlide = function() {
            return e.active.index;
        }, f.getSlideCount = function() {
            return e.children.length;
        }, f.redrawSlider = function() {
            e.children.add(f.find(".bx-clone")).outerWidth(p()), e.viewport.css("height", n()), 
            e.settings.ticker || t(), e.active.last && (e.active.index = r() - 1), e.active.index >= r() && (e.active.last = !0), 
            e.settings.pager && !e.settings.pagerCustom && (v(), F(e.active.index));
        }, f.destroySlider = function() {
            e.initialized && (e.initialized = !1, a(".bx-clone", this).remove(), e.children.each(function() {
                void 0 != a(this).data("origStyle") ? a(this).attr("style", a(this).data("origStyle")) : a(this).removeAttr("style");
            }), void 0 != a(this).data("origStyle") ? this.attr("style", a(this).data("origStyle")) : a(this).removeAttr("style"), 
            a(this).unwrap().unwrap(), e.controls.el && e.controls.el.remove(), e.controls.next && e.controls.next.remove(), 
            e.controls.prev && e.controls.prev.remove(), e.pagerEl && e.pagerEl.remove(), a(".bx-caption", this).remove(), 
            e.controls.autoEl && e.controls.autoEl.remove(), clearInterval(e.interval), e.settings.responsive && a(window).unbind("resize", Q));
        }, f.reloadSlider = function(a) {
            void 0 != a && (d = a), f.destroySlider(), j();
        }, j(), this;
    };
}(jQuery);

(function(a) {
    a.fn.clearField = function(b) {
        b = jQuery.extend({
            blurClass: "clearFieldBlurred",
            activeClass: "clearFieldActive",
            attribute: "rel",
            value: ""
        }, b);
        return a(this).each(function() {
            var c = a(this);
            b.value = c.val();
            if (c.attr(b.attribute) == undefined) {
                c.attr(b.attribute, c.val()).addClass(b.blurClass);
            } else {
                b.value = c.attr(b.attribute);
            }
            c.focus(function() {
                if (c.val() == c.attr(b.attribute)) {
                    c.val("").removeClass(b.blurClass).addClass(b.activeClass);
                }
            });
            c.blur(function() {
                if (c.val() == "") {
                    c.val(c.attr(b.attribute)).removeClass(b.activeClass).addClass(b.blurClass);
                }
            });
        });
    };
})(jQuery);

(function(a, b) {
    "use strict";
    var c = "3.0.2";
    function d(b) {
        if (a.fn.cycle.debug) e(b);
    }
    function e() {
        if (window.console && console.log) console.log("[cycle] " + Array.prototype.join.call(arguments, " "));
    }
    a.expr[":"].paused = function(a) {
        return a.cyclePause;
    };
    a.fn.cycle = function(b, c) {
        var f = {
            s: this.selector,
            c: this.context
        };
        if (this.length === 0 && b != "stop") {
            if (!a.isReady && f.s) {
                e("DOM not ready, queuing slideshow");
                a(function() {
                    a(f.s, f.c).cycle(b, c);
                });
                return this;
            }
            e("terminating; zero elements found by selector" + (a.isReady ? "" : " (DOM not ready)"));
            return this;
        }
        return this.each(function() {
            var h = g(this, b, c);
            if (h === false) return;
            h.updateActivePagerLink = h.updateActivePagerLink || a.fn.cycle.updateActivePagerLink;
            if (this.cycleTimeout) clearTimeout(this.cycleTimeout);
            this.cycleTimeout = this.cyclePause = 0;
            this.cycleStop = 0;
            var i = a(this);
            var k = h.slideExpr ? a(h.slideExpr, this) : i.children();
            var l = k.get();
            if (l.length < 2) {
                e("terminating; too few slides: " + l.length);
                return;
            }
            var m = j(i, k, l, h, f);
            if (m === false) return;
            var p = m.continuous ? 10 : o(l[m.currSlide], l[m.nextSlide], m, !m.backwards);
            if (p) {
                p += m.delay || 0;
                if (p < 10) p = 10;
                d("first timeout: " + p);
                this.cycleTimeout = setTimeout(function() {
                    n(l, m, 0, !h.backwards);
                }, p);
            }
        });
    };
    function f(b, c, d) {
        var e = a(b).data("cycle.opts");
        if (!e) return;
        var f = !!b.cyclePause;
        if (f && e.paused) e.paused(b, e, c, d); else if (!f && e.resumed) e.resumed(b, e, c, d);
    }
    function g(c, d, g) {
        if (c.cycleStop === b) c.cycleStop = 0;
        if (d === b || d === null) d = {};
        if (d.constructor == String) {
            switch (d) {
              case "destroy":
              case "stop":
                var h = a(c).data("cycle.opts");
                if (!h) return false;
                c.cycleStop++;
                if (c.cycleTimeout) clearTimeout(c.cycleTimeout);
                c.cycleTimeout = 0;
                if (h.elements) a(h.elements).stop();
                a(c).removeData("cycle.opts");
                if (d == "destroy") i(c, h);
                return false;

              case "toggle":
                c.cyclePause = c.cyclePause === 1 ? 0 : 1;
                k(c.cyclePause, g, c);
                f(c);
                return false;

              case "pause":
                c.cyclePause = 1;
                f(c);
                return false;

              case "resume":
                c.cyclePause = 0;
                k(false, g, c);
                f(c);
                return false;

              case "prev":
              case "next":
                h = a(c).data("cycle.opts");
                if (!h) {
                    e('options not found, "prev/next" ignored');
                    return false;
                }
                if (typeof g == "string") h.oneTimeFx = g;
                a.fn.cycle[d](h);
                return false;

              default:
                d = {
                    fx: d
                };
            }
            return d;
        } else if (d.constructor == Number) {
            var j = d;
            d = a(c).data("cycle.opts");
            if (!d) {
                e("options not found, can not advance slide");
                return false;
            }
            if (j < 0 || j >= d.elements.length) {
                e("invalid slide index: " + j);
                return false;
            }
            d.nextSlide = j;
            if (c.cycleTimeout) {
                clearTimeout(c.cycleTimeout);
                c.cycleTimeout = 0;
            }
            if (typeof g == "string") d.oneTimeFx = g;
            n(d.elements, d, 1, j >= d.currSlide);
            return false;
        }
        return d;
        function k(b, c, d) {
            if (!b && c === true) {
                var f = a(d).data("cycle.opts");
                if (!f) {
                    e("options not found, can not resume");
                    return false;
                }
                if (d.cycleTimeout) {
                    clearTimeout(d.cycleTimeout);
                    d.cycleTimeout = 0;
                }
                n(f.elements, f, 1, !f.backwards);
            }
        }
    }
    function h(b, c) {
        if (!a.support.opacity && c.cleartype && b.style.filter) {
            try {
                b.style.removeAttribute("filter");
            } catch (d) {}
        }
    }
    function i(b, c) {
        if (c.next) a(c.next).unbind(c.prevNextEvent);
        if (c.prev) a(c.prev).unbind(c.prevNextEvent);
        if (c.pager || c.pagerAnchorBuilder) a.each(c.pagerAnchors || [], function() {
            this.unbind().remove();
        });
        c.pagerAnchors = null;
        a(b).unbind("mouseenter.cycle mouseleave.cycle");
        if (c.destroy) c.destroy(c);
    }
    function j(c, d, g, i, j) {
        var o;
        var s = a.extend({}, a.fn.cycle.defaults, i || {}, a.metadata ? c.metadata() : a.meta ? c.data() : {});
        var t = a.isFunction(c.data) ? c.data(s.metaAttr) : null;
        if (t) s = a.extend(s, t);
        if (s.autostop) s.countdown = s.autostopCount || g.length;
        var u = c[0];
        c.data("cycle.opts", s);
        s.$cont = c;
        s.stopCount = u.cycleStop;
        s.elements = g;
        s.before = s.before ? [ s.before ] : [];
        s.after = s.after ? [ s.after ] : [];
        if (!a.support.opacity && s.cleartype) s.after.push(function() {
            h(this, s);
        });
        if (s.continuous) s.after.push(function() {
            n(g, s, 0, !s.backwards);
        });
        k(s);
        if (!a.support.opacity && s.cleartype && !s.cleartypeNoBg) r(d);
        if (c.css("position") == "static") c.css("position", "relative");
        if (s.width) c.width(s.width);
        if (s.height && s.height != "auto") c.height(s.height);
        if (s.startingSlide !== b) {
            s.startingSlide = parseInt(s.startingSlide, 10);
            if (s.startingSlide >= g.length || s.startSlide < 0) s.startingSlide = 0; else o = true;
        } else if (s.backwards) s.startingSlide = g.length - 1; else s.startingSlide = 0;
        if (s.random) {
            s.randomMap = [];
            for (var v = 0; v < g.length; v++) s.randomMap.push(v);
            s.randomMap.sort(function(a, b) {
                return Math.random() - .5;
            });
            if (o) {
                for (var w = 0; w < g.length; w++) {
                    if (s.startingSlide == s.randomMap[w]) {
                        s.randomIndex = w;
                    }
                }
            } else {
                s.randomIndex = 1;
                s.startingSlide = s.randomMap[1];
            }
        } else if (s.startingSlide >= g.length) s.startingSlide = 0;
        s.currSlide = s.startingSlide || 0;
        var x = s.startingSlide;
        d.css({
            position: "absolute",
            top: 0,
            left: 0
        }).hide().each(function(b) {
            var c;
            if (s.backwards) c = x ? b <= x ? g.length + (b - x) : x - b : g.length - b; else c = x ? b >= x ? g.length - (b - x) : x - b : g.length - b;
            a(this).css("z-index", c);
        });
        a(g[x]).css("opacity", 1).show();
        h(g[x], s);
        if (s.fit) {
            if (!s.aspect) {
                if (s.width) d.width(s.width);
                if (s.height && s.height != "auto") d.height(s.height);
            } else {
                d.each(function() {
                    var b = a(this);
                    var c = s.aspect === true ? b.width() / b.height() : s.aspect;
                    if (s.width && b.width() != s.width) {
                        b.width(s.width);
                        b.height(s.width / c);
                    }
                    if (s.height && b.height() < s.height) {
                        b.height(s.height);
                        b.width(s.height * c);
                    }
                });
            }
        }
        if (s.center && (!s.fit || s.aspect)) {
            d.each(function() {
                var b = a(this);
                b.css({
                    "margin-left": s.width ? (s.width - b.width()) / 2 + "px" : 0,
                    "margin-top": s.height ? (s.height - b.height()) / 2 + "px" : 0
                });
            });
        }
        if (s.center && !s.fit && !s.slideResize) {
            d.each(function() {
                var b = a(this);
                b.css({
                    "margin-left": s.width ? (s.width - b.width()) / 2 + "px" : 0,
                    "margin-top": s.height ? (s.height - b.height()) / 2 + "px" : 0
                });
            });
        }
        var y = (s.containerResize || s.containerResizeHeight) && c.innerHeight() < 1;
        if (y) {
            var z = 0, A = 0;
            for (var B = 0; B < g.length; B++) {
                var C = a(g[B]), D = C[0], E = C.outerWidth(), F = C.outerHeight();
                if (!E) E = D.offsetWidth || D.width || C.attr("width");
                if (!F) F = D.offsetHeight || D.height || C.attr("height");
                z = E > z ? E : z;
                A = F > A ? F : A;
            }
            if (s.containerResize && z > 0 && A > 0) c.css({
                width: z + "px",
                height: A + "px"
            });
            if (s.containerResizeHeight && A > 0) c.css({
                height: A + "px"
            });
        }
        var G = false;
        if (s.pause) c.bind("mouseenter.cycle", function() {
            G = true;
            this.cyclePause++;
            f(u, true);
        }).bind("mouseleave.cycle", function() {
            if (G) this.cyclePause--;
            f(u, true);
        });
        if (l(s) === false) return false;
        var H = false;
        i.requeueAttempts = i.requeueAttempts || 0;
        d.each(function() {
            var b = a(this);
            this.cycleH = s.fit && s.height ? s.height : b.height() || this.offsetHeight || this.height || b.attr("height") || 0;
            this.cycleW = s.fit && s.width ? s.width : b.width() || this.offsetWidth || this.width || b.attr("width") || 0;
            if (b.is("img")) {
                var c = this.cycleH === 0 && this.cycleW === 0 && !this.complete;
                if (c) {
                    if (j.s && s.requeueOnImageNotLoaded && ++i.requeueAttempts < 100) {
                        e(i.requeueAttempts, " - img slide not loaded, requeuing slideshow: ", this.src, this.cycleW, this.cycleH);
                        setTimeout(function() {
                            a(j.s, j.c).cycle(i);
                        }, s.requeueTimeout);
                        H = true;
                        return false;
                    } else {
                        e("could not determine size of image: " + this.src, this.cycleW, this.cycleH);
                    }
                }
            }
            return true;
        });
        if (H) return false;
        s.cssBefore = s.cssBefore || {};
        s.cssAfter = s.cssAfter || {};
        s.cssFirst = s.cssFirst || {};
        s.animIn = s.animIn || {};
        s.animOut = s.animOut || {};
        d.not(":eq(" + x + ")").css(s.cssBefore);
        a(d[x]).css(s.cssFirst);
        if (s.timeout) {
            s.timeout = parseInt(s.timeout, 10);
            if (s.speed.constructor == String) s.speed = a.fx.speeds[s.speed] || parseInt(s.speed, 10);
            if (!s.sync) s.speed = s.speed / 2;
            var I = s.fx == "none" ? 0 : s.fx == "shuffle" ? 500 : 250;
            while (s.timeout - s.speed < I) s.timeout += s.speed;
        }
        if (s.easing) s.easeIn = s.easeOut = s.easing;
        if (!s.speedIn) s.speedIn = s.speed;
        if (!s.speedOut) s.speedOut = s.speed;
        s.slideCount = g.length;
        s.currSlide = s.lastSlide = x;
        if (s.random) {
            if (++s.randomIndex == g.length) s.randomIndex = 0;
            s.nextSlide = s.randomMap[s.randomIndex];
        } else if (s.backwards) s.nextSlide = s.startingSlide === 0 ? g.length - 1 : s.startingSlide - 1; else s.nextSlide = s.startingSlide >= g.length - 1 ? 0 : s.startingSlide + 1;
        if (!s.multiFx) {
            var J = a.fn.cycle.transitions[s.fx];
            if (a.isFunction(J)) J(c, d, s); else if (s.fx != "custom" && !s.multiFx) {
                e("unknown transition: " + s.fx, "; slideshow terminating");
                return false;
            }
        }
        var K = d[x];
        if (!s.skipInitializationCallbacks) {
            if (s.before.length) s.before[0].apply(K, [ K, K, s, true ]);
            if (s.after.length) s.after[0].apply(K, [ K, K, s, true ]);
        }
        if (s.next) a(s.next).bind(s.prevNextEvent, function() {
            return p(s, 1);
        });
        if (s.prev) a(s.prev).bind(s.prevNextEvent, function() {
            return p(s, 0);
        });
        if (s.pager || s.pagerAnchorBuilder) q(g, s);
        m(s, g);
        return s;
    }
    function k(b) {
        b.original = {
            before: [],
            after: []
        };
        b.original.cssBefore = a.extend({}, b.cssBefore);
        b.original.cssAfter = a.extend({}, b.cssAfter);
        b.original.animIn = a.extend({}, b.animIn);
        b.original.animOut = a.extend({}, b.animOut);
        a.each(b.before, function() {
            b.original.before.push(this);
        });
        a.each(b.after, function() {
            b.original.after.push(this);
        });
    }
    function l(b) {
        var c, f, g = a.fn.cycle.transitions;
        if (b.fx.indexOf(",") > 0) {
            b.multiFx = true;
            b.fxs = b.fx.replace(/\s*/g, "").split(",");
            for (c = 0; c < b.fxs.length; c++) {
                var h = b.fxs[c];
                f = g[h];
                if (!f || !g.hasOwnProperty(h) || !a.isFunction(f)) {
                    e("discarding unknown transition: ", h);
                    b.fxs.splice(c, 1);
                    c--;
                }
            }
            if (!b.fxs.length) {
                e("No valid transitions named; slideshow terminating.");
                return false;
            }
        } else if (b.fx == "all") {
            b.multiFx = true;
            b.fxs = [];
            for (var i in g) {
                if (g.hasOwnProperty(i)) {
                    f = g[i];
                    if (g.hasOwnProperty(i) && a.isFunction(f)) b.fxs.push(i);
                }
            }
        }
        if (b.multiFx && b.randomizeEffects) {
            var j = Math.floor(Math.random() * 20) + 30;
            for (c = 0; c < j; c++) {
                var k = Math.floor(Math.random() * b.fxs.length);
                b.fxs.push(b.fxs.splice(k, 1)[0]);
            }
            d("randomized fx sequence: ", b.fxs);
        }
        return true;
    }
    function m(b, c) {
        b.addSlide = function(d, e) {
            var f = a(d), g = f[0];
            if (!b.autostopCount) b.countdown++;
            c[e ? "unshift" : "push"](g);
            if (b.els) b.els[e ? "unshift" : "push"](g);
            b.slideCount = c.length;
            if (b.random) {
                b.randomMap.push(b.slideCount - 1);
                b.randomMap.sort(function(a, b) {
                    return Math.random() - .5;
                });
            }
            f.css("position", "absolute");
            f[e ? "prependTo" : "appendTo"](b.$cont);
            if (e) {
                b.currSlide++;
                b.nextSlide++;
            }
            if (!a.support.opacity && b.cleartype && !b.cleartypeNoBg) r(f);
            if (b.fit && b.width) f.width(b.width);
            if (b.fit && b.height && b.height != "auto") f.height(b.height);
            g.cycleH = b.fit && b.height ? b.height : f.height();
            g.cycleW = b.fit && b.width ? b.width : f.width();
            f.css(b.cssBefore);
            if (b.pager || b.pagerAnchorBuilder) a.fn.cycle.createPagerAnchor(c.length - 1, g, a(b.pager), c, b);
            if (a.isFunction(b.onAddSlide)) b.onAddSlide(f); else f.hide();
        };
    }
    a.fn.cycle.resetState = function(b, c) {
        c = c || b.fx;
        b.before = [];
        b.after = [];
        b.cssBefore = a.extend({}, b.original.cssBefore);
        b.cssAfter = a.extend({}, b.original.cssAfter);
        b.animIn = a.extend({}, b.original.animIn);
        b.animOut = a.extend({}, b.original.animOut);
        b.fxFn = null;
        a.each(b.original.before, function() {
            b.before.push(this);
        });
        a.each(b.original.after, function() {
            b.after.push(this);
        });
        var d = a.fn.cycle.transitions[c];
        if (a.isFunction(d)) d(b.$cont, a(b.elements), b);
    };
    function n(c, e, f, g) {
        var h = e.$cont[0], i = c[e.currSlide], j = c[e.nextSlide];
        if (f && e.busy && e.manualTrump) {
            d("manualTrump in go(), stopping active transition");
            a(c).stop(true, true);
            e.busy = 0;
            clearTimeout(h.cycleTimeout);
        }
        if (e.busy) {
            d("transition active, ignoring new tx request");
            return;
        }
        if (h.cycleStop != e.stopCount || h.cycleTimeout === 0 && !f) return;
        if (!f && !h.cyclePause && !e.bounce && (e.autostop && --e.countdown <= 0 || e.nowrap && !e.random && e.nextSlide < e.currSlide)) {
            if (e.end) e.end(e);
            return;
        }
        var k = false;
        if ((f || !h.cyclePause) && e.nextSlide != e.currSlide) {
            k = true;
            var l = e.fx;
            i.cycleH = i.cycleH || a(i).height();
            i.cycleW = i.cycleW || a(i).width();
            j.cycleH = j.cycleH || a(j).height();
            j.cycleW = j.cycleW || a(j).width();
            if (e.multiFx) {
                if (g && (e.lastFx === b || ++e.lastFx >= e.fxs.length)) e.lastFx = 0; else if (!g && (e.lastFx === b || --e.lastFx < 0)) e.lastFx = e.fxs.length - 1;
                l = e.fxs[e.lastFx];
            }
            if (e.oneTimeFx) {
                l = e.oneTimeFx;
                e.oneTimeFx = null;
            }
            a.fn.cycle.resetState(e, l);
            if (e.before.length) a.each(e.before, function(a, b) {
                if (h.cycleStop != e.stopCount) return;
                b.apply(j, [ i, j, e, g ]);
            });
            var m = function() {
                e.busy = 0;
                a.each(e.after, function(a, b) {
                    if (h.cycleStop != e.stopCount) return;
                    b.apply(j, [ i, j, e, g ]);
                });
                if (!h.cycleStop) {
                    q();
                }
            };
            d("tx firing(" + l + "); currSlide: " + e.currSlide + "; nextSlide: " + e.nextSlide);
            e.busy = 1;
            if (e.fxFn) e.fxFn(i, j, e, m, g, f && e.fastOnEvent); else if (a.isFunction(a.fn.cycle[e.fx])) a.fn.cycle[e.fx](i, j, e, m, g, f && e.fastOnEvent); else a.fn.cycle.custom(i, j, e, m, g, f && e.fastOnEvent);
        } else {
            q();
        }
        if (k || e.nextSlide == e.currSlide) {
            var p;
            e.lastSlide = e.currSlide;
            if (e.random) {
                e.currSlide = e.nextSlide;
                if (++e.randomIndex == c.length) {
                    e.randomIndex = 0;
                    e.randomMap.sort(function(a, b) {
                        return Math.random() - .5;
                    });
                }
                e.nextSlide = e.randomMap[e.randomIndex];
                if (e.nextSlide == e.currSlide) e.nextSlide = e.currSlide == e.slideCount - 1 ? 0 : e.currSlide + 1;
            } else if (e.backwards) {
                p = e.nextSlide - 1 < 0;
                if (p && e.bounce) {
                    e.backwards = !e.backwards;
                    e.nextSlide = 1;
                    e.currSlide = 0;
                } else {
                    e.nextSlide = p ? c.length - 1 : e.nextSlide - 1;
                    e.currSlide = p ? 0 : e.nextSlide + 1;
                }
            } else {
                p = e.nextSlide + 1 == c.length;
                if (p && e.bounce) {
                    e.backwards = !e.backwards;
                    e.nextSlide = c.length - 2;
                    e.currSlide = c.length - 1;
                } else {
                    e.nextSlide = p ? 0 : e.nextSlide + 1;
                    e.currSlide = p ? c.length - 1 : e.nextSlide - 1;
                }
            }
        }
        if (k && e.pager) e.updateActivePagerLink(e.pager, e.currSlide, e.activePagerClass);
        function q() {
            var a = 0, b = e.timeout;
            if (e.timeout && !e.continuous) {
                a = o(c[e.currSlide], c[e.nextSlide], e, g);
                if (e.fx == "shuffle") a -= e.speedOut;
            } else if (e.continuous && h.cyclePause) a = 10;
            if (a > 0) h.cycleTimeout = setTimeout(function() {
                n(c, e, 0, !e.backwards);
            }, a);
        }
    }
    a.fn.cycle.updateActivePagerLink = function(b, c, d) {
        a(b).each(function() {
            a(this).children().removeClass(d).eq(c).addClass(d);
        });
    };
    function o(a, b, c, e) {
        if (c.timeoutFn) {
            var f = c.timeoutFn.call(a, a, b, c, e);
            while (c.fx != "none" && f - c.speed < 250) f += c.speed;
            d("calculated timeout: " + f + "; speed: " + c.speed);
            if (f !== false) return f;
        }
        return c.timeout;
    }
    a.fn.cycle.next = function(a) {
        p(a, 1);
    };
    a.fn.cycle.prev = function(a) {
        p(a, 0);
    };
    function p(b, c) {
        var d = c ? 1 : -1;
        var e = b.elements;
        var f = b.$cont[0], g = f.cycleTimeout;
        if (g) {
            clearTimeout(g);
            f.cycleTimeout = 0;
        }
        if (b.random && d < 0) {
            b.randomIndex--;
            if (--b.randomIndex == -2) b.randomIndex = e.length - 2; else if (b.randomIndex == -1) b.randomIndex = e.length - 1;
            b.nextSlide = b.randomMap[b.randomIndex];
        } else if (b.random) {
            b.nextSlide = b.randomMap[b.randomIndex];
        } else {
            b.nextSlide = b.currSlide + d;
            if (b.nextSlide < 0) {
                if (b.nowrap) return false;
                b.nextSlide = e.length - 1;
            } else if (b.nextSlide >= e.length) {
                if (b.nowrap) return false;
                b.nextSlide = 0;
            }
        }
        var h = b.onPrevNextEvent || b.prevNextClick;
        if (a.isFunction(h)) h(d > 0, b.nextSlide, e[b.nextSlide]);
        n(e, b, 1, c);
        return false;
    }
    function q(b, c) {
        var d = a(c.pager);
        a.each(b, function(e, f) {
            a.fn.cycle.createPagerAnchor(e, f, d, b, c);
        });
        c.updateActivePagerLink(c.pager, c.startingSlide, c.activePagerClass);
    }
    a.fn.cycle.createPagerAnchor = function(b, c, e, g, h) {
        var i;
        if (a.isFunction(h.pagerAnchorBuilder)) {
            i = h.pagerAnchorBuilder(b, c);
            d("pagerAnchorBuilder(" + b + ", el) returned: " + i);
        } else i = '<a href="#">' + (b + 1) + "</a>";
        if (!i) return;
        var j = a(i);
        if (j.parents("body").length === 0) {
            var k = [];
            if (e.length > 1) {
                e.each(function() {
                    var b = j.clone(true);
                    a(this).append(b);
                    k.push(b[0]);
                });
                j = a(k);
            } else {
                j.appendTo(e);
            }
        }
        h.pagerAnchors = h.pagerAnchors || [];
        h.pagerAnchors.push(j);
        var l = function(c) {
            c.preventDefault();
            h.nextSlide = b;
            var d = h.$cont[0], e = d.cycleTimeout;
            if (e) {
                clearTimeout(e);
                d.cycleTimeout = 0;
            }
            var f = h.onPagerEvent || h.pagerClick;
            if (a.isFunction(f)) f(h.nextSlide, g[h.nextSlide]);
            n(g, h, 1, h.currSlide < b);
        };
        if (/mouseenter|mouseover/i.test(h.pagerEvent)) {
            j.hover(l, function() {});
        } else {
            j.bind(h.pagerEvent, l);
        }
        if (!/^click/.test(h.pagerEvent) && !h.allowPagerClickBubble) j.bind("click.cycle", function() {
            return false;
        });
        var m = h.$cont[0];
        var o = false;
        if (h.pauseOnPagerHover) {
            j.hover(function() {
                o = true;
                m.cyclePause++;
                f(m, true, true);
            }, function() {
                if (o) m.cyclePause--;
                f(m, true, true);
            });
        }
    };
    a.fn.cycle.hopsFromLast = function(a, b) {
        var c, d = a.lastSlide, e = a.currSlide;
        if (b) c = e > d ? e - d : a.slideCount - d; else c = e < d ? d - e : d + a.slideCount - e;
        return c;
    };
    function r(b) {
        d("applying clearType background-color hack");
        function c(a) {
            a = parseInt(a, 10).toString(16);
            return a.length < 2 ? "0" + a : a;
        }
        function e(b) {
            for (;b && b.nodeName.toLowerCase() != "html"; b = b.parentNode) {
                var d = a.css(b, "background-color");
                if (d && d.indexOf("rgb") >= 0) {
                    var e = d.match(/\d+/g);
                    return "#" + c(e[0]) + c(e[1]) + c(e[2]);
                }
                if (d && d != "transparent") return d;
            }
            return "#ffffff";
        }
        b.each(function() {
            a(this).css("background-color", e(this));
        });
    }
    a.fn.cycle.commonReset = function(b, c, d, e, f, g) {
        a(d.elements).not(b).hide();
        if (typeof d.cssBefore.opacity == "undefined") d.cssBefore.opacity = 1;
        d.cssBefore.display = "block";
        if (d.slideResize && e !== false && c.cycleW > 0) d.cssBefore.width = c.cycleW;
        if (d.slideResize && f !== false && c.cycleH > 0) d.cssBefore.height = c.cycleH;
        d.cssAfter = d.cssAfter || {};
        d.cssAfter.display = "none";
        a(b).css("zIndex", d.slideCount + (g === true ? 1 : 0));
        a(c).css("zIndex", d.slideCount + (g === true ? 0 : 1));
    };
    a.fn.cycle.custom = function(b, c, d, e, f, g) {
        var h = a(b), i = a(c);
        var j = d.speedIn, k = d.speedOut, l = d.easeIn, m = d.easeOut;
        i.css(d.cssBefore);
        if (g) {
            if (typeof g == "number") j = k = g; else j = k = 1;
            l = m = null;
        }
        var n = function() {
            i.animate(d.animIn, j, l, function() {
                e();
            });
        };
        h.animate(d.animOut, k, m, function() {
            h.css(d.cssAfter);
            if (!d.sync) n();
        });
        if (d.sync) n();
    };
    a.fn.cycle.transitions = {
        fade: function(b, c, d) {
            c.not(":eq(" + d.currSlide + ")").css("opacity", 0);
            d.before.push(function(b, c, d) {
                a.fn.cycle.commonReset(b, c, d);
                d.cssBefore.opacity = 0;
            });
            d.animIn = {
                opacity: 1
            };
            d.animOut = {
                opacity: 0
            };
            d.cssBefore = {
                top: 0,
                left: 0
            };
        }
    };
    a.fn.cycle.ver = function() {
        return c;
    };
    a.fn.cycle.defaults = {
        activePagerClass: "activeSlide",
        after: null,
        allowPagerClickBubble: false,
        animIn: null,
        animOut: null,
        aspect: false,
        autostop: 0,
        autostopCount: 0,
        backwards: false,
        before: null,
        center: null,
        cleartype: !a.support.opacity,
        cleartypeNoBg: false,
        containerResize: 1,
        containerResizeHeight: 0,
        continuous: 0,
        cssAfter: null,
        cssBefore: null,
        delay: 0,
        easeIn: null,
        easeOut: null,
        easing: null,
        end: null,
        fastOnEvent: 0,
        fit: 0,
        fx: "fade",
        fxFn: null,
        height: "auto",
        manualTrump: true,
        metaAttr: "cycle",
        next: null,
        nowrap: 0,
        onPagerEvent: null,
        onPrevNextEvent: null,
        pager: null,
        pagerAnchorBuilder: null,
        pagerEvent: "click.cycle",
        pause: 0,
        pauseOnPagerHover: 0,
        prev: null,
        prevNextEvent: "click.cycle",
        random: 0,
        randomizeEffects: 1,
        requeueOnImageNotLoaded: true,
        requeueTimeout: 250,
        rev: 0,
        shuffle: null,
        skipInitializationCallbacks: false,
        slideExpr: null,
        slideResize: 1,
        speed: 1e3,
        speedIn: null,
        speedOut: null,
        startingSlide: b,
        sync: 1,
        timeout: 4e3,
        timeoutFn: null,
        updateActivePagerLink: null,
        width: null
    };
})(jQuery);

(function(a) {
    "use strict";
    a.fn.cycle.transitions.none = function(b, c, d) {
        d.fxFn = function(b, c, d, e) {
            a(c).show();
            a(b).hide();
            e();
        };
    };
    a.fn.cycle.transitions.fadeout = function(b, c, d) {
        c.not(":eq(" + d.currSlide + ")").css({
            display: "block",
            opacity: 1
        });
        d.before.push(function(b, c, d, e, f, g) {
            a(b).css("zIndex", d.slideCount + (g !== true ? 1 : 0));
            a(c).css("zIndex", d.slideCount + (g !== true ? 0 : 1));
        });
        d.animIn.opacity = 1;
        d.animOut.opacity = 0;
        d.cssBefore.opacity = 1;
        d.cssBefore.display = "block";
        d.cssAfter.zIndex = 0;
    };
    a.fn.cycle.transitions.scrollUp = function(b, c, d) {
        b.css("overflow", "hidden");
        d.before.push(a.fn.cycle.commonReset);
        var e = b.height();
        d.cssBefore.top = e;
        d.cssBefore.left = 0;
        d.cssFirst.top = 0;
        d.animIn.top = 0;
        d.animOut.top = -e;
    };
    a.fn.cycle.transitions.scrollDown = function(b, c, d) {
        b.css("overflow", "hidden");
        d.before.push(a.fn.cycle.commonReset);
        var e = b.height();
        d.cssFirst.top = 0;
        d.cssBefore.top = -e;
        d.cssBefore.left = 0;
        d.animIn.top = 0;
        d.animOut.top = e;
    };
    a.fn.cycle.transitions.scrollLeft = function(b, c, d) {
        b.css("overflow", "hidden");
        d.before.push(a.fn.cycle.commonReset);
        var e = b.width();
        d.cssFirst.left = 0;
        d.cssBefore.left = e;
        d.cssBefore.top = 0;
        d.animIn.left = 0;
        d.animOut.left = 0 - e;
    };
    a.fn.cycle.transitions.scrollRight = function(b, c, d) {
        b.css("overflow", "hidden");
        d.before.push(a.fn.cycle.commonReset);
        var e = b.width();
        d.cssFirst.left = 0;
        d.cssBefore.left = -e;
        d.cssBefore.top = 0;
        d.animIn.left = 0;
        d.animOut.left = e;
    };
    a.fn.cycle.transitions.scrollHorz = function(b, c, d) {
        b.css("overflow", "hidden").width();
        d.before.push(function(b, c, d, e) {
            if (d.rev) e = !e;
            a.fn.cycle.commonReset(b, c, d);
            d.cssBefore.left = e ? c.cycleW - 1 : 1 - c.cycleW;
            d.animOut.left = e ? -b.cycleW : b.cycleW;
        });
        d.cssFirst.left = 0;
        d.cssBefore.top = 0;
        d.animIn.left = 0;
        d.animOut.top = 0;
    };
    a.fn.cycle.transitions.scrollVert = function(b, c, d) {
        b.css("overflow", "hidden");
        d.before.push(function(b, c, d, e) {
            if (d.rev) e = !e;
            a.fn.cycle.commonReset(b, c, d);
            d.cssBefore.top = e ? 1 - c.cycleH : c.cycleH - 1;
            d.animOut.top = e ? b.cycleH : -b.cycleH;
        });
        d.cssFirst.top = 0;
        d.cssBefore.left = 0;
        d.animIn.top = 0;
        d.animOut.left = 0;
    };
    a.fn.cycle.transitions.slideX = function(b, c, d) {
        d.before.push(function(b, c, d) {
            a(d.elements).not(b).hide();
            a.fn.cycle.commonReset(b, c, d, false, true);
            d.animIn.width = c.cycleW;
        });
        d.cssBefore.left = 0;
        d.cssBefore.top = 0;
        d.cssBefore.width = 0;
        d.animIn.width = "show";
        d.animOut.width = 0;
    };
    a.fn.cycle.transitions.slideY = function(b, c, d) {
        d.before.push(function(b, c, d) {
            a(d.elements).not(b).hide();
            a.fn.cycle.commonReset(b, c, d, true, false);
            d.animIn.height = c.cycleH;
        });
        d.cssBefore.left = 0;
        d.cssBefore.top = 0;
        d.cssBefore.height = 0;
        d.animIn.height = "show";
        d.animOut.height = 0;
    };
    a.fn.cycle.transitions.shuffle = function(b, c, d) {
        var e, f = b.css("overflow", "visible").width();
        c.css({
            left: 0,
            top: 0
        });
        d.before.push(function(b, c, d) {
            a.fn.cycle.commonReset(b, c, d, true, true, true);
        });
        if (!d.speedAdjusted) {
            d.speed = d.speed / 2;
            d.speedAdjusted = true;
        }
        d.random = 0;
        d.shuffle = d.shuffle || {
            left: -f,
            top: 15
        };
        d.els = [];
        for (e = 0; e < c.length; e++) d.els.push(c[e]);
        for (e = 0; e < d.currSlide; e++) d.els.push(d.els.shift());
        d.fxFn = function(b, c, d, e, f) {
            if (d.rev) f = !f;
            var g = f ? a(b) : a(c);
            a(c).css(d.cssBefore);
            var h = d.slideCount;
            g.animate(d.shuffle, d.speedIn, d.easeIn, function() {
                var c = a.fn.cycle.hopsFromLast(d, f);
                for (var i = 0; i < c; i++) {
                    if (f) d.els.push(d.els.shift()); else d.els.unshift(d.els.pop());
                }
                if (f) {
                    for (var j = 0, k = d.els.length; j < k; j++) a(d.els[j]).css("z-index", k - j + h);
                } else {
                    var l = a(b).css("z-index");
                    g.css("z-index", parseInt(l, 10) + 1 + h);
                }
                g.animate({
                    left: 0,
                    top: 0
                }, d.speedOut, d.easeOut, function() {
                    a(f ? this : b).hide();
                    if (e) e();
                });
            });
        };
        a.extend(d.cssBefore, {
            display: "block",
            opacity: 1,
            top: 0,
            left: 0
        });
    };
    a.fn.cycle.transitions.turnUp = function(b, c, d) {
        d.before.push(function(b, c, d) {
            a.fn.cycle.commonReset(b, c, d, true, false);
            d.cssBefore.top = c.cycleH;
            d.animIn.height = c.cycleH;
            d.animOut.width = c.cycleW;
        });
        d.cssFirst.top = 0;
        d.cssBefore.left = 0;
        d.cssBefore.height = 0;
        d.animIn.top = 0;
        d.animOut.height = 0;
    };
    a.fn.cycle.transitions.turnDown = function(b, c, d) {
        d.before.push(function(b, c, d) {
            a.fn.cycle.commonReset(b, c, d, true, false);
            d.animIn.height = c.cycleH;
            d.animOut.top = b.cycleH;
        });
        d.cssFirst.top = 0;
        d.cssBefore.left = 0;
        d.cssBefore.top = 0;
        d.cssBefore.height = 0;
        d.animOut.height = 0;
    };
    a.fn.cycle.transitions.turnLeft = function(b, c, d) {
        d.before.push(function(b, c, d) {
            a.fn.cycle.commonReset(b, c, d, false, true);
            d.cssBefore.left = c.cycleW;
            d.animIn.width = c.cycleW;
        });
        d.cssBefore.top = 0;
        d.cssBefore.width = 0;
        d.animIn.left = 0;
        d.animOut.width = 0;
    };
    a.fn.cycle.transitions.turnRight = function(b, c, d) {
        d.before.push(function(b, c, d) {
            a.fn.cycle.commonReset(b, c, d, false, true);
            d.animIn.width = c.cycleW;
            d.animOut.left = b.cycleW;
        });
        a.extend(d.cssBefore, {
            top: 0,
            left: 0,
            width: 0
        });
        d.animIn.left = 0;
        d.animOut.width = 0;
    };
    a.fn.cycle.transitions.zoom = function(b, c, d) {
        d.before.push(function(b, c, d) {
            a.fn.cycle.commonReset(b, c, d, false, false, true);
            d.cssBefore.top = c.cycleH / 2;
            d.cssBefore.left = c.cycleW / 2;
            a.extend(d.animIn, {
                top: 0,
                left: 0,
                width: c.cycleW,
                height: c.cycleH
            });
            a.extend(d.animOut, {
                width: 0,
                height: 0,
                top: b.cycleH / 2,
                left: b.cycleW / 2
            });
        });
        d.cssFirst.top = 0;
        d.cssFirst.left = 0;
        d.cssBefore.width = 0;
        d.cssBefore.height = 0;
    };
    a.fn.cycle.transitions.fadeZoom = function(b, c, d) {
        d.before.push(function(b, c, d) {
            a.fn.cycle.commonReset(b, c, d, false, false);
            d.cssBefore.left = c.cycleW / 2;
            d.cssBefore.top = c.cycleH / 2;
            a.extend(d.animIn, {
                top: 0,
                left: 0,
                width: c.cycleW,
                height: c.cycleH
            });
        });
        d.cssBefore.width = 0;
        d.cssBefore.height = 0;
        d.animOut.opacity = 0;
    };
    a.fn.cycle.transitions.blindX = function(b, c, d) {
        var e = b.css("overflow", "hidden").width();
        d.before.push(function(b, c, d) {
            a.fn.cycle.commonReset(b, c, d);
            d.animIn.width = c.cycleW;
            d.animOut.left = b.cycleW;
        });
        d.cssBefore.left = e;
        d.cssBefore.top = 0;
        d.animIn.left = 0;
        d.animOut.left = e;
    };
    a.fn.cycle.transitions.blindY = function(b, c, d) {
        var e = b.css("overflow", "hidden").height();
        d.before.push(function(b, c, d) {
            a.fn.cycle.commonReset(b, c, d);
            d.animIn.height = c.cycleH;
            d.animOut.top = b.cycleH;
        });
        d.cssBefore.top = e;
        d.cssBefore.left = 0;
        d.animIn.top = 0;
        d.animOut.top = e;
    };
    a.fn.cycle.transitions.blindZ = function(b, c, d) {
        var e = b.css("overflow", "hidden").height();
        var f = b.width();
        d.before.push(function(b, c, d) {
            a.fn.cycle.commonReset(b, c, d);
            d.animIn.height = c.cycleH;
            d.animOut.top = b.cycleH;
        });
        d.cssBefore.top = e;
        d.cssBefore.left = f;
        d.animIn.top = 0;
        d.animIn.left = 0;
        d.animOut.top = e;
        d.animOut.left = f;
    };
    a.fn.cycle.transitions.growX = function(b, c, d) {
        d.before.push(function(b, c, d) {
            a.fn.cycle.commonReset(b, c, d, false, true);
            d.cssBefore.left = this.cycleW / 2;
            d.animIn.left = 0;
            d.animIn.width = this.cycleW;
            d.animOut.left = 0;
        });
        d.cssBefore.top = 0;
        d.cssBefore.width = 0;
    };
    a.fn.cycle.transitions.growY = function(b, c, d) {
        d.before.push(function(b, c, d) {
            a.fn.cycle.commonReset(b, c, d, true, false);
            d.cssBefore.top = this.cycleH / 2;
            d.animIn.top = 0;
            d.animIn.height = this.cycleH;
            d.animOut.top = 0;
        });
        d.cssBefore.height = 0;
        d.cssBefore.left = 0;
    };
    a.fn.cycle.transitions.curtainX = function(b, c, d) {
        d.before.push(function(b, c, d) {
            a.fn.cycle.commonReset(b, c, d, false, true, true);
            d.cssBefore.left = c.cycleW / 2;
            d.animIn.left = 0;
            d.animIn.width = this.cycleW;
            d.animOut.left = b.cycleW / 2;
            d.animOut.width = 0;
        });
        d.cssBefore.top = 0;
        d.cssBefore.width = 0;
    };
    a.fn.cycle.transitions.curtainY = function(b, c, d) {
        d.before.push(function(b, c, d) {
            a.fn.cycle.commonReset(b, c, d, true, false, true);
            d.cssBefore.top = c.cycleH / 2;
            d.animIn.top = 0;
            d.animIn.height = c.cycleH;
            d.animOut.top = b.cycleH / 2;
            d.animOut.height = 0;
        });
        d.cssBefore.height = 0;
        d.cssBefore.left = 0;
    };
    a.fn.cycle.transitions.cover = function(b, c, d) {
        var e = d.direction || "left";
        var f = b.css("overflow", "hidden").width();
        var g = b.height();
        d.before.push(function(b, c, d) {
            a.fn.cycle.commonReset(b, c, d);
            d.cssAfter.display = "";
            if (e == "right") d.cssBefore.left = -f; else if (e == "up") d.cssBefore.top = g; else if (e == "down") d.cssBefore.top = -g; else d.cssBefore.left = f;
        });
        d.animIn.left = 0;
        d.animIn.top = 0;
        d.cssBefore.top = 0;
        d.cssBefore.left = 0;
    };
    a.fn.cycle.transitions.uncover = function(b, c, d) {
        var e = d.direction || "left";
        var f = b.css("overflow", "hidden").width();
        var g = b.height();
        d.before.push(function(b, c, d) {
            a.fn.cycle.commonReset(b, c, d, true, true, true);
            if (e == "right") d.animOut.left = f; else if (e == "up") d.animOut.top = -g; else if (e == "down") d.animOut.top = g; else d.animOut.left = -f;
        });
        d.animIn.left = 0;
        d.animIn.top = 0;
        d.cssBefore.top = 0;
        d.cssBefore.left = 0;
    };
    a.fn.cycle.transitions.toss = function(b, c, d) {
        var e = b.css("overflow", "visible").width();
        var f = b.height();
        d.before.push(function(b, c, d) {
            a.fn.cycle.commonReset(b, c, d, true, true, true);
            if (!d.animOut.left && !d.animOut.top) a.extend(d.animOut, {
                left: e * 2,
                top: -f / 2,
                opacity: 0
            }); else d.animOut.opacity = 0;
        });
        d.cssBefore.left = 0;
        d.cssBefore.top = 0;
        d.animIn.left = 0;
    };
    a.fn.cycle.transitions.wipe = function(b, c, d) {
        var e = b.css("overflow", "hidden").width();
        var f = b.height();
        d.cssBefore = d.cssBefore || {};
        var g;
        if (d.clip) {
            if (/l2r/.test(d.clip)) g = "rect(0px 0px " + f + "px 0px)"; else if (/r2l/.test(d.clip)) g = "rect(0px " + e + "px " + f + "px " + e + "px)"; else if (/t2b/.test(d.clip)) g = "rect(0px " + e + "px 0px 0px)"; else if (/b2t/.test(d.clip)) g = "rect(" + f + "px " + e + "px " + f + "px 0px)"; else if (/zoom/.test(d.clip)) {
                var h = parseInt(f / 2, 10);
                var i = parseInt(e / 2, 10);
                g = "rect(" + h + "px " + i + "px " + h + "px " + i + "px)";
            }
        }
        d.cssBefore.clip = d.cssBefore.clip || g || "rect(0px 0px 0px 0px)";
        var j = d.cssBefore.clip.match(/(\d+)/g);
        var k = parseInt(j[0], 10), l = parseInt(j[1], 10), m = parseInt(j[2], 10), n = parseInt(j[3], 10);
        d.before.push(function(b, c, d) {
            if (b == c) return;
            var g = a(b), h = a(c);
            a.fn.cycle.commonReset(b, c, d, true, true, false);
            d.cssAfter.display = "block";
            var i = 1, j = parseInt(d.speedIn / 13, 10) - 1;
            (function o() {
                var a = k ? k - parseInt(i * (k / j), 10) : 0;
                var b = n ? n - parseInt(i * (n / j), 10) : 0;
                var c = m < f ? m + parseInt(i * ((f - m) / j || 1), 10) : f;
                var d = l < e ? l + parseInt(i * ((e - l) / j || 1), 10) : e;
                h.css({
                    clip: "rect(" + a + "px " + d + "px " + c + "px " + b + "px)"
                });
                i++ <= j ? setTimeout(o, 13) : g.css("display", "none");
            })();
        });
        a.extend(d.cssBefore, {
            display: "block",
            opacity: 1,
            top: 0,
            left: 0
        });
        d.animIn = {
            left: 0
        };
        d.animOut = {
            left: 0
        };
    };
})(jQuery);

(function(a) {
    "use strict";
    a.fn.fitVids = function(b) {
        var c = {
            customSelector: null
        };
        if (!document.getElementById("fit-vids-style")) {
            var d = document.createElement("div"), e = document.getElementsByTagName("base")[0] || document.getElementsByTagName("script")[0];
            d.className = "fit-vids-style";
            d.id = "fit-vids-style";
            d.style.display = "none";
            d.innerHTML = "&shy;<style>                 .fluid-width-video-wrapper {                   width: 100%;                                position: relative;                         padding: 0;                              }                                                                                       .fluid-width-video-wrapper iframe,          .fluid-width-video-wrapper object,          .fluid-width-video-wrapper embed {             position: absolute;                         top: 0;                                     left: 0;                                    width: 100%;                                height: 100%;                            }                                         </style>";
            e.parentNode.insertBefore(d, e);
        }
        if (b) {
            a.extend(c, b);
        }
        return this.each(function() {
            var b = [ "iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed" ];
            if (c.customSelector) {
                b.push(c.customSelector);
            }
            var d = a(this).find(b.join(","));
            d = d.not("object object");
            d.each(function() {
                var b = a(this);
                if (this.tagName.toLowerCase() === "embed" && b.parent("object").length || b.parent(".fluid-width-video-wrapper").length) {
                    return;
                }
                var c = this.tagName.toLowerCase() === "object" || b.attr("height") && !isNaN(parseInt(b.attr("height"), 10)) ? parseInt(b.attr("height"), 10) : b.height(), d = !isNaN(parseInt(b.attr("width"), 10)) ? parseInt(b.attr("width"), 10) : b.width(), e = c / d;
                if (!b.attr("id")) {
                    var f = "fitvid" + Math.floor(Math.random() * 999999);
                    b.attr("id", f);
                }
                b.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", e * 100 + "%");
                b.removeAttr("height").removeAttr("width");
            });
        });
    };
})(jQuery);

var Handlebars = {};

(function(a, b) {
    a.VERSION = "1.0.0";
    a.COMPILER_REVISION = 4;
    a.REVISION_CHANGES = {
        1: "<= 1.0.rc.2",
        2: "== 1.0.0-rc.3",
        3: "== 1.0.0-rc.4",
        4: ">= 1.0.0"
    };
    a.helpers = {};
    a.partials = {};
    var c = Object.prototype.toString, d = "[object Function]", e = "[object Object]";
    a.registerHelper = function(b, d, f) {
        if (c.call(b) === e) {
            if (f || d) {
                throw new a.Exception("Arg not supported with multiple helpers");
            }
            a.Utils.extend(this.helpers, b);
        } else {
            if (f) {
                d.not = f;
            }
            this.helpers[b] = d;
        }
    };
    a.registerPartial = function(b, d) {
        if (c.call(b) === e) {
            a.Utils.extend(this.partials, b);
        } else {
            this.partials[b] = d;
        }
    };
    a.registerHelper("helperMissing", function(a) {
        if (arguments.length === 2) {
            return b;
        } else {
            throw new Error("Missing helper: '" + a + "'");
        }
    });
    a.registerHelper("blockHelperMissing", function(b, e) {
        var f = e.inverse || function() {}, g = e.fn;
        var h = c.call(b);
        if (h === d) {
            b = b.call(this);
        }
        if (b === true) {
            return g(this);
        } else if (b === false || b == null) {
            return f(this);
        } else if (h === "[object Array]") {
            if (b.length > 0) {
                return a.helpers.each(b, e);
            } else {
                return f(this);
            }
        } else {
            return g(b);
        }
    });
    a.K = function() {};
    a.createFrame = Object.create || function(b) {
        a.K.prototype = b;
        var c = new a.K();
        a.K.prototype = null;
        return c;
    };
    a.logger = {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3,
        level: 3,
        methodMap: {
            0: "debug",
            1: "info",
            2: "warn",
            3: "error"
        },
        log: function(b, c) {
            if (a.logger.level <= b) {
                var d = a.logger.methodMap[b];
                if (typeof console !== "undefined" && console[d]) {
                    console[d].call(console, c);
                }
            }
        }
    };
    a.log = function(b, c) {
        a.logger.log(b, c);
    };
    a.registerHelper("each", function(b, e) {
        var f = e.fn, g = e.inverse;
        var h = 0, i = "", j;
        var k = c.call(b);
        if (k === d) {
            b = b.call(this);
        }
        if (e.data) {
            j = a.createFrame(e.data);
        }
        if (b && typeof b === "object") {
            if (b instanceof Array) {
                for (var l = b.length; h < l; h++) {
                    if (j) {
                        j.index = h;
                    }
                    i = i + f(b[h], {
                        data: j
                    });
                }
            } else {
                for (var m in b) {
                    if (b.hasOwnProperty(m)) {
                        if (j) {
                            j.key = m;
                        }
                        i = i + f(b[m], {
                            data: j
                        });
                        h++;
                    }
                }
            }
        }
        if (h === 0) {
            i = g(this);
        }
        return i;
    });
    a.registerHelper("if", function(b, e) {
        var f = c.call(b);
        if (f === d) {
            b = b.call(this);
        }
        if (!b || a.Utils.isEmpty(b)) {
            return e.inverse(this);
        } else {
            return e.fn(this);
        }
    });
    a.registerHelper("unless", function(b, c) {
        return a.helpers["if"].call(this, b, {
            fn: c.inverse,
            inverse: c.fn
        });
    });
    a.registerHelper("with", function(b, e) {
        var f = c.call(b);
        if (f === d) {
            b = b.call(this);
        }
        if (!a.Utils.isEmpty(b)) return e.fn(b);
    });
    a.registerHelper("log", function(b, c) {
        var d = c.data && c.data.level != null ? parseInt(c.data.level, 10) : 1;
        a.log(d, b);
    });
    var f = function() {
        var a = {
            trace: function d() {},
            yy: {},
            symbols_: {
                error: 2,
                root: 3,
                program: 4,
                EOF: 5,
                simpleInverse: 6,
                statements: 7,
                statement: 8,
                openInverse: 9,
                closeBlock: 10,
                openBlock: 11,
                mustache: 12,
                partial: 13,
                CONTENT: 14,
                COMMENT: 15,
                OPEN_BLOCK: 16,
                inMustache: 17,
                CLOSE: 18,
                OPEN_INVERSE: 19,
                OPEN_ENDBLOCK: 20,
                path: 21,
                OPEN: 22,
                OPEN_UNESCAPED: 23,
                CLOSE_UNESCAPED: 24,
                OPEN_PARTIAL: 25,
                partialName: 26,
                params: 27,
                hash: 28,
                dataName: 29,
                param: 30,
                STRING: 31,
                INTEGER: 32,
                BOOLEAN: 33,
                hashSegments: 34,
                hashSegment: 35,
                ID: 36,
                EQUALS: 37,
                DATA: 38,
                pathSegments: 39,
                SEP: 40,
                $accept: 0,
                $end: 1
            },
            terminals_: {
                2: "error",
                5: "EOF",
                14: "CONTENT",
                15: "COMMENT",
                16: "OPEN_BLOCK",
                18: "CLOSE",
                19: "OPEN_INVERSE",
                20: "OPEN_ENDBLOCK",
                22: "OPEN",
                23: "OPEN_UNESCAPED",
                24: "CLOSE_UNESCAPED",
                25: "OPEN_PARTIAL",
                31: "STRING",
                32: "INTEGER",
                33: "BOOLEAN",
                36: "ID",
                37: "EQUALS",
                38: "DATA",
                40: "SEP"
            },
            productions_: [ 0, [ 3, 2 ], [ 4, 2 ], [ 4, 3 ], [ 4, 2 ], [ 4, 1 ], [ 4, 1 ], [ 4, 0 ], [ 7, 1 ], [ 7, 2 ], [ 8, 3 ], [ 8, 3 ], [ 8, 1 ], [ 8, 1 ], [ 8, 1 ], [ 8, 1 ], [ 11, 3 ], [ 9, 3 ], [ 10, 3 ], [ 12, 3 ], [ 12, 3 ], [ 13, 3 ], [ 13, 4 ], [ 6, 2 ], [ 17, 3 ], [ 17, 2 ], [ 17, 2 ], [ 17, 1 ], [ 17, 1 ], [ 27, 2 ], [ 27, 1 ], [ 30, 1 ], [ 30, 1 ], [ 30, 1 ], [ 30, 1 ], [ 30, 1 ], [ 28, 1 ], [ 34, 2 ], [ 34, 1 ], [ 35, 3 ], [ 35, 3 ], [ 35, 3 ], [ 35, 3 ], [ 35, 3 ], [ 26, 1 ], [ 26, 1 ], [ 26, 1 ], [ 29, 2 ], [ 21, 1 ], [ 39, 3 ], [ 39, 1 ] ],
            performAction: function e(a, b, c, d, e, f, g) {
                var h = f.length - 1;
                switch (e) {
                  case 1:
                    return f[h - 1];
                    break;

                  case 2:
                    this.$ = new d.ProgramNode([], f[h]);
                    break;

                  case 3:
                    this.$ = new d.ProgramNode(f[h - 2], f[h]);
                    break;

                  case 4:
                    this.$ = new d.ProgramNode(f[h - 1], []);
                    break;

                  case 5:
                    this.$ = new d.ProgramNode(f[h]);
                    break;

                  case 6:
                    this.$ = new d.ProgramNode([], []);
                    break;

                  case 7:
                    this.$ = new d.ProgramNode([]);
                    break;

                  case 8:
                    this.$ = [ f[h] ];
                    break;

                  case 9:
                    f[h - 1].push(f[h]);
                    this.$ = f[h - 1];
                    break;

                  case 10:
                    this.$ = new d.BlockNode(f[h - 2], f[h - 1].inverse, f[h - 1], f[h]);
                    break;

                  case 11:
                    this.$ = new d.BlockNode(f[h - 2], f[h - 1], f[h - 1].inverse, f[h]);
                    break;

                  case 12:
                    this.$ = f[h];
                    break;

                  case 13:
                    this.$ = f[h];
                    break;

                  case 14:
                    this.$ = new d.ContentNode(f[h]);
                    break;

                  case 15:
                    this.$ = new d.CommentNode(f[h]);
                    break;

                  case 16:
                    this.$ = new d.MustacheNode(f[h - 1][0], f[h - 1][1]);
                    break;

                  case 17:
                    this.$ = new d.MustacheNode(f[h - 1][0], f[h - 1][1]);
                    break;

                  case 18:
                    this.$ = f[h - 1];
                    break;

                  case 19:
                    this.$ = new d.MustacheNode(f[h - 1][0], f[h - 1][1], f[h - 2][2] === "&");
                    break;

                  case 20:
                    this.$ = new d.MustacheNode(f[h - 1][0], f[h - 1][1], true);
                    break;

                  case 21:
                    this.$ = new d.PartialNode(f[h - 1]);
                    break;

                  case 22:
                    this.$ = new d.PartialNode(f[h - 2], f[h - 1]);
                    break;

                  case 23:
                    break;

                  case 24:
                    this.$ = [ [ f[h - 2] ].concat(f[h - 1]), f[h] ];
                    break;

                  case 25:
                    this.$ = [ [ f[h - 1] ].concat(f[h]), null ];
                    break;

                  case 26:
                    this.$ = [ [ f[h - 1] ], f[h] ];
                    break;

                  case 27:
                    this.$ = [ [ f[h] ], null ];
                    break;

                  case 28:
                    this.$ = [ [ f[h] ], null ];
                    break;

                  case 29:
                    f[h - 1].push(f[h]);
                    this.$ = f[h - 1];
                    break;

                  case 30:
                    this.$ = [ f[h] ];
                    break;

                  case 31:
                    this.$ = f[h];
                    break;

                  case 32:
                    this.$ = new d.StringNode(f[h]);
                    break;

                  case 33:
                    this.$ = new d.IntegerNode(f[h]);
                    break;

                  case 34:
                    this.$ = new d.BooleanNode(f[h]);
                    break;

                  case 35:
                    this.$ = f[h];
                    break;

                  case 36:
                    this.$ = new d.HashNode(f[h]);
                    break;

                  case 37:
                    f[h - 1].push(f[h]);
                    this.$ = f[h - 1];
                    break;

                  case 38:
                    this.$ = [ f[h] ];
                    break;

                  case 39:
                    this.$ = [ f[h - 2], f[h] ];
                    break;

                  case 40:
                    this.$ = [ f[h - 2], new d.StringNode(f[h]) ];
                    break;

                  case 41:
                    this.$ = [ f[h - 2], new d.IntegerNode(f[h]) ];
                    break;

                  case 42:
                    this.$ = [ f[h - 2], new d.BooleanNode(f[h]) ];
                    break;

                  case 43:
                    this.$ = [ f[h - 2], f[h] ];
                    break;

                  case 44:
                    this.$ = new d.PartialNameNode(f[h]);
                    break;

                  case 45:
                    this.$ = new d.PartialNameNode(new d.StringNode(f[h]));
                    break;

                  case 46:
                    this.$ = new d.PartialNameNode(new d.IntegerNode(f[h]));
                    break;

                  case 47:
                    this.$ = new d.DataNode(f[h]);
                    break;

                  case 48:
                    this.$ = new d.IdNode(f[h]);
                    break;

                  case 49:
                    f[h - 2].push({
                        part: f[h],
                        separator: f[h - 1]
                    });
                    this.$ = f[h - 2];
                    break;

                  case 50:
                    this.$ = [ {
                        part: f[h]
                    } ];
                    break;
                }
            },
            table: [ {
                3: 1,
                4: 2,
                5: [ 2, 7 ],
                6: 3,
                7: 4,
                8: 6,
                9: 7,
                11: 8,
                12: 9,
                13: 10,
                14: [ 1, 11 ],
                15: [ 1, 12 ],
                16: [ 1, 13 ],
                19: [ 1, 5 ],
                22: [ 1, 14 ],
                23: [ 1, 15 ],
                25: [ 1, 16 ]
            }, {
                1: [ 3 ]
            }, {
                5: [ 1, 17 ]
            }, {
                5: [ 2, 6 ],
                7: 18,
                8: 6,
                9: 7,
                11: 8,
                12: 9,
                13: 10,
                14: [ 1, 11 ],
                15: [ 1, 12 ],
                16: [ 1, 13 ],
                19: [ 1, 19 ],
                20: [ 2, 6 ],
                22: [ 1, 14 ],
                23: [ 1, 15 ],
                25: [ 1, 16 ]
            }, {
                5: [ 2, 5 ],
                6: 20,
                8: 21,
                9: 7,
                11: 8,
                12: 9,
                13: 10,
                14: [ 1, 11 ],
                15: [ 1, 12 ],
                16: [ 1, 13 ],
                19: [ 1, 5 ],
                20: [ 2, 5 ],
                22: [ 1, 14 ],
                23: [ 1, 15 ],
                25: [ 1, 16 ]
            }, {
                17: 23,
                18: [ 1, 22 ],
                21: 24,
                29: 25,
                36: [ 1, 28 ],
                38: [ 1, 27 ],
                39: 26
            }, {
                5: [ 2, 8 ],
                14: [ 2, 8 ],
                15: [ 2, 8 ],
                16: [ 2, 8 ],
                19: [ 2, 8 ],
                20: [ 2, 8 ],
                22: [ 2, 8 ],
                23: [ 2, 8 ],
                25: [ 2, 8 ]
            }, {
                4: 29,
                6: 3,
                7: 4,
                8: 6,
                9: 7,
                11: 8,
                12: 9,
                13: 10,
                14: [ 1, 11 ],
                15: [ 1, 12 ],
                16: [ 1, 13 ],
                19: [ 1, 5 ],
                20: [ 2, 7 ],
                22: [ 1, 14 ],
                23: [ 1, 15 ],
                25: [ 1, 16 ]
            }, {
                4: 30,
                6: 3,
                7: 4,
                8: 6,
                9: 7,
                11: 8,
                12: 9,
                13: 10,
                14: [ 1, 11 ],
                15: [ 1, 12 ],
                16: [ 1, 13 ],
                19: [ 1, 5 ],
                20: [ 2, 7 ],
                22: [ 1, 14 ],
                23: [ 1, 15 ],
                25: [ 1, 16 ]
            }, {
                5: [ 2, 12 ],
                14: [ 2, 12 ],
                15: [ 2, 12 ],
                16: [ 2, 12 ],
                19: [ 2, 12 ],
                20: [ 2, 12 ],
                22: [ 2, 12 ],
                23: [ 2, 12 ],
                25: [ 2, 12 ]
            }, {
                5: [ 2, 13 ],
                14: [ 2, 13 ],
                15: [ 2, 13 ],
                16: [ 2, 13 ],
                19: [ 2, 13 ],
                20: [ 2, 13 ],
                22: [ 2, 13 ],
                23: [ 2, 13 ],
                25: [ 2, 13 ]
            }, {
                5: [ 2, 14 ],
                14: [ 2, 14 ],
                15: [ 2, 14 ],
                16: [ 2, 14 ],
                19: [ 2, 14 ],
                20: [ 2, 14 ],
                22: [ 2, 14 ],
                23: [ 2, 14 ],
                25: [ 2, 14 ]
            }, {
                5: [ 2, 15 ],
                14: [ 2, 15 ],
                15: [ 2, 15 ],
                16: [ 2, 15 ],
                19: [ 2, 15 ],
                20: [ 2, 15 ],
                22: [ 2, 15 ],
                23: [ 2, 15 ],
                25: [ 2, 15 ]
            }, {
                17: 31,
                21: 24,
                29: 25,
                36: [ 1, 28 ],
                38: [ 1, 27 ],
                39: 26
            }, {
                17: 32,
                21: 24,
                29: 25,
                36: [ 1, 28 ],
                38: [ 1, 27 ],
                39: 26
            }, {
                17: 33,
                21: 24,
                29: 25,
                36: [ 1, 28 ],
                38: [ 1, 27 ],
                39: 26
            }, {
                21: 35,
                26: 34,
                31: [ 1, 36 ],
                32: [ 1, 37 ],
                36: [ 1, 28 ],
                39: 26
            }, {
                1: [ 2, 1 ]
            }, {
                5: [ 2, 2 ],
                8: 21,
                9: 7,
                11: 8,
                12: 9,
                13: 10,
                14: [ 1, 11 ],
                15: [ 1, 12 ],
                16: [ 1, 13 ],
                19: [ 1, 19 ],
                20: [ 2, 2 ],
                22: [ 1, 14 ],
                23: [ 1, 15 ],
                25: [ 1, 16 ]
            }, {
                17: 23,
                21: 24,
                29: 25,
                36: [ 1, 28 ],
                38: [ 1, 27 ],
                39: 26
            }, {
                5: [ 2, 4 ],
                7: 38,
                8: 6,
                9: 7,
                11: 8,
                12: 9,
                13: 10,
                14: [ 1, 11 ],
                15: [ 1, 12 ],
                16: [ 1, 13 ],
                19: [ 1, 19 ],
                20: [ 2, 4 ],
                22: [ 1, 14 ],
                23: [ 1, 15 ],
                25: [ 1, 16 ]
            }, {
                5: [ 2, 9 ],
                14: [ 2, 9 ],
                15: [ 2, 9 ],
                16: [ 2, 9 ],
                19: [ 2, 9 ],
                20: [ 2, 9 ],
                22: [ 2, 9 ],
                23: [ 2, 9 ],
                25: [ 2, 9 ]
            }, {
                5: [ 2, 23 ],
                14: [ 2, 23 ],
                15: [ 2, 23 ],
                16: [ 2, 23 ],
                19: [ 2, 23 ],
                20: [ 2, 23 ],
                22: [ 2, 23 ],
                23: [ 2, 23 ],
                25: [ 2, 23 ]
            }, {
                18: [ 1, 39 ]
            }, {
                18: [ 2, 27 ],
                21: 44,
                24: [ 2, 27 ],
                27: 40,
                28: 41,
                29: 48,
                30: 42,
                31: [ 1, 45 ],
                32: [ 1, 46 ],
                33: [ 1, 47 ],
                34: 43,
                35: 49,
                36: [ 1, 50 ],
                38: [ 1, 27 ],
                39: 26
            }, {
                18: [ 2, 28 ],
                24: [ 2, 28 ]
            }, {
                18: [ 2, 48 ],
                24: [ 2, 48 ],
                31: [ 2, 48 ],
                32: [ 2, 48 ],
                33: [ 2, 48 ],
                36: [ 2, 48 ],
                38: [ 2, 48 ],
                40: [ 1, 51 ]
            }, {
                21: 52,
                36: [ 1, 28 ],
                39: 26
            }, {
                18: [ 2, 50 ],
                24: [ 2, 50 ],
                31: [ 2, 50 ],
                32: [ 2, 50 ],
                33: [ 2, 50 ],
                36: [ 2, 50 ],
                38: [ 2, 50 ],
                40: [ 2, 50 ]
            }, {
                10: 53,
                20: [ 1, 54 ]
            }, {
                10: 55,
                20: [ 1, 54 ]
            }, {
                18: [ 1, 56 ]
            }, {
                18: [ 1, 57 ]
            }, {
                24: [ 1, 58 ]
            }, {
                18: [ 1, 59 ],
                21: 60,
                36: [ 1, 28 ],
                39: 26
            }, {
                18: [ 2, 44 ],
                36: [ 2, 44 ]
            }, {
                18: [ 2, 45 ],
                36: [ 2, 45 ]
            }, {
                18: [ 2, 46 ],
                36: [ 2, 46 ]
            }, {
                5: [ 2, 3 ],
                8: 21,
                9: 7,
                11: 8,
                12: 9,
                13: 10,
                14: [ 1, 11 ],
                15: [ 1, 12 ],
                16: [ 1, 13 ],
                19: [ 1, 19 ],
                20: [ 2, 3 ],
                22: [ 1, 14 ],
                23: [ 1, 15 ],
                25: [ 1, 16 ]
            }, {
                14: [ 2, 17 ],
                15: [ 2, 17 ],
                16: [ 2, 17 ],
                19: [ 2, 17 ],
                20: [ 2, 17 ],
                22: [ 2, 17 ],
                23: [ 2, 17 ],
                25: [ 2, 17 ]
            }, {
                18: [ 2, 25 ],
                21: 44,
                24: [ 2, 25 ],
                28: 61,
                29: 48,
                30: 62,
                31: [ 1, 45 ],
                32: [ 1, 46 ],
                33: [ 1, 47 ],
                34: 43,
                35: 49,
                36: [ 1, 50 ],
                38: [ 1, 27 ],
                39: 26
            }, {
                18: [ 2, 26 ],
                24: [ 2, 26 ]
            }, {
                18: [ 2, 30 ],
                24: [ 2, 30 ],
                31: [ 2, 30 ],
                32: [ 2, 30 ],
                33: [ 2, 30 ],
                36: [ 2, 30 ],
                38: [ 2, 30 ]
            }, {
                18: [ 2, 36 ],
                24: [ 2, 36 ],
                35: 63,
                36: [ 1, 64 ]
            }, {
                18: [ 2, 31 ],
                24: [ 2, 31 ],
                31: [ 2, 31 ],
                32: [ 2, 31 ],
                33: [ 2, 31 ],
                36: [ 2, 31 ],
                38: [ 2, 31 ]
            }, {
                18: [ 2, 32 ],
                24: [ 2, 32 ],
                31: [ 2, 32 ],
                32: [ 2, 32 ],
                33: [ 2, 32 ],
                36: [ 2, 32 ],
                38: [ 2, 32 ]
            }, {
                18: [ 2, 33 ],
                24: [ 2, 33 ],
                31: [ 2, 33 ],
                32: [ 2, 33 ],
                33: [ 2, 33 ],
                36: [ 2, 33 ],
                38: [ 2, 33 ]
            }, {
                18: [ 2, 34 ],
                24: [ 2, 34 ],
                31: [ 2, 34 ],
                32: [ 2, 34 ],
                33: [ 2, 34 ],
                36: [ 2, 34 ],
                38: [ 2, 34 ]
            }, {
                18: [ 2, 35 ],
                24: [ 2, 35 ],
                31: [ 2, 35 ],
                32: [ 2, 35 ],
                33: [ 2, 35 ],
                36: [ 2, 35 ],
                38: [ 2, 35 ]
            }, {
                18: [ 2, 38 ],
                24: [ 2, 38 ],
                36: [ 2, 38 ]
            }, {
                18: [ 2, 50 ],
                24: [ 2, 50 ],
                31: [ 2, 50 ],
                32: [ 2, 50 ],
                33: [ 2, 50 ],
                36: [ 2, 50 ],
                37: [ 1, 65 ],
                38: [ 2, 50 ],
                40: [ 2, 50 ]
            }, {
                36: [ 1, 66 ]
            }, {
                18: [ 2, 47 ],
                24: [ 2, 47 ],
                31: [ 2, 47 ],
                32: [ 2, 47 ],
                33: [ 2, 47 ],
                36: [ 2, 47 ],
                38: [ 2, 47 ]
            }, {
                5: [ 2, 10 ],
                14: [ 2, 10 ],
                15: [ 2, 10 ],
                16: [ 2, 10 ],
                19: [ 2, 10 ],
                20: [ 2, 10 ],
                22: [ 2, 10 ],
                23: [ 2, 10 ],
                25: [ 2, 10 ]
            }, {
                21: 67,
                36: [ 1, 28 ],
                39: 26
            }, {
                5: [ 2, 11 ],
                14: [ 2, 11 ],
                15: [ 2, 11 ],
                16: [ 2, 11 ],
                19: [ 2, 11 ],
                20: [ 2, 11 ],
                22: [ 2, 11 ],
                23: [ 2, 11 ],
                25: [ 2, 11 ]
            }, {
                14: [ 2, 16 ],
                15: [ 2, 16 ],
                16: [ 2, 16 ],
                19: [ 2, 16 ],
                20: [ 2, 16 ],
                22: [ 2, 16 ],
                23: [ 2, 16 ],
                25: [ 2, 16 ]
            }, {
                5: [ 2, 19 ],
                14: [ 2, 19 ],
                15: [ 2, 19 ],
                16: [ 2, 19 ],
                19: [ 2, 19 ],
                20: [ 2, 19 ],
                22: [ 2, 19 ],
                23: [ 2, 19 ],
                25: [ 2, 19 ]
            }, {
                5: [ 2, 20 ],
                14: [ 2, 20 ],
                15: [ 2, 20 ],
                16: [ 2, 20 ],
                19: [ 2, 20 ],
                20: [ 2, 20 ],
                22: [ 2, 20 ],
                23: [ 2, 20 ],
                25: [ 2, 20 ]
            }, {
                5: [ 2, 21 ],
                14: [ 2, 21 ],
                15: [ 2, 21 ],
                16: [ 2, 21 ],
                19: [ 2, 21 ],
                20: [ 2, 21 ],
                22: [ 2, 21 ],
                23: [ 2, 21 ],
                25: [ 2, 21 ]
            }, {
                18: [ 1, 68 ]
            }, {
                18: [ 2, 24 ],
                24: [ 2, 24 ]
            }, {
                18: [ 2, 29 ],
                24: [ 2, 29 ],
                31: [ 2, 29 ],
                32: [ 2, 29 ],
                33: [ 2, 29 ],
                36: [ 2, 29 ],
                38: [ 2, 29 ]
            }, {
                18: [ 2, 37 ],
                24: [ 2, 37 ],
                36: [ 2, 37 ]
            }, {
                37: [ 1, 65 ]
            }, {
                21: 69,
                29: 73,
                31: [ 1, 70 ],
                32: [ 1, 71 ],
                33: [ 1, 72 ],
                36: [ 1, 28 ],
                38: [ 1, 27 ],
                39: 26
            }, {
                18: [ 2, 49 ],
                24: [ 2, 49 ],
                31: [ 2, 49 ],
                32: [ 2, 49 ],
                33: [ 2, 49 ],
                36: [ 2, 49 ],
                38: [ 2, 49 ],
                40: [ 2, 49 ]
            }, {
                18: [ 1, 74 ]
            }, {
                5: [ 2, 22 ],
                14: [ 2, 22 ],
                15: [ 2, 22 ],
                16: [ 2, 22 ],
                19: [ 2, 22 ],
                20: [ 2, 22 ],
                22: [ 2, 22 ],
                23: [ 2, 22 ],
                25: [ 2, 22 ]
            }, {
                18: [ 2, 39 ],
                24: [ 2, 39 ],
                36: [ 2, 39 ]
            }, {
                18: [ 2, 40 ],
                24: [ 2, 40 ],
                36: [ 2, 40 ]
            }, {
                18: [ 2, 41 ],
                24: [ 2, 41 ],
                36: [ 2, 41 ]
            }, {
                18: [ 2, 42 ],
                24: [ 2, 42 ],
                36: [ 2, 42 ]
            }, {
                18: [ 2, 43 ],
                24: [ 2, 43 ],
                36: [ 2, 43 ]
            }, {
                5: [ 2, 18 ],
                14: [ 2, 18 ],
                15: [ 2, 18 ],
                16: [ 2, 18 ],
                19: [ 2, 18 ],
                20: [ 2, 18 ],
                22: [ 2, 18 ],
                23: [ 2, 18 ],
                25: [ 2, 18 ]
            } ],
            defaultActions: {
                17: [ 2, 1 ]
            },
            parseError: function f(a, b) {
                throw new Error(a);
            },
            parse: function g(a) {
                var b = this, c = [ 0 ], d = [ null ], e = [], f = this.table, g = "", h = 0, i = 0, j = 0, k = 2, l = 1;
                this.lexer.setInput(a);
                this.lexer.yy = this.yy;
                this.yy.lexer = this.lexer;
                this.yy.parser = this;
                if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
                var m = this.lexer.yylloc;
                e.push(m);
                var n = this.lexer.options && this.lexer.options.ranges;
                if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
                function o(a) {
                    c.length = c.length - 2 * a;
                    d.length = d.length - a;
                    e.length = e.length - a;
                }
                function p() {
                    var a;
                    a = b.lexer.lex() || 1;
                    if (typeof a !== "number") {
                        a = b.symbols_[a] || a;
                    }
                    return a;
                }
                var q, r, s, t, u, v, w = {}, x, y, z, A;
                while (true) {
                    s = c[c.length - 1];
                    if (this.defaultActions[s]) {
                        t = this.defaultActions[s];
                    } else {
                        if (q === null || typeof q == "undefined") {
                            q = p();
                        }
                        t = f[s] && f[s][q];
                    }
                    if (typeof t === "undefined" || !t.length || !t[0]) {
                        var B = "";
                        if (!j) {
                            A = [];
                            for (x in f[s]) if (this.terminals_[x] && x > 2) {
                                A.push("'" + this.terminals_[x] + "'");
                            }
                            if (this.lexer.showPosition) {
                                B = "Parse error on line " + (h + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + A.join(", ") + ", got '" + (this.terminals_[q] || q) + "'";
                            } else {
                                B = "Parse error on line " + (h + 1) + ": Unexpected " + (q == 1 ? "end of input" : "'" + (this.terminals_[q] || q) + "'");
                            }
                            this.parseError(B, {
                                text: this.lexer.match,
                                token: this.terminals_[q] || q,
                                line: this.lexer.yylineno,
                                loc: m,
                                expected: A
                            });
                        }
                    }
                    if (t[0] instanceof Array && t.length > 1) {
                        throw new Error("Parse Error: multiple actions possible at state: " + s + ", token: " + q);
                    }
                    switch (t[0]) {
                      case 1:
                        c.push(q);
                        d.push(this.lexer.yytext);
                        e.push(this.lexer.yylloc);
                        c.push(t[1]);
                        q = null;
                        if (!r) {
                            i = this.lexer.yyleng;
                            g = this.lexer.yytext;
                            h = this.lexer.yylineno;
                            m = this.lexer.yylloc;
                            if (j > 0) j--;
                        } else {
                            q = r;
                            r = null;
                        }
                        break;

                      case 2:
                        y = this.productions_[t[1]][1];
                        w.$ = d[d.length - y];
                        w._$ = {
                            first_line: e[e.length - (y || 1)].first_line,
                            last_line: e[e.length - 1].last_line,
                            first_column: e[e.length - (y || 1)].first_column,
                            last_column: e[e.length - 1].last_column
                        };
                        if (n) {
                            w._$.range = [ e[e.length - (y || 1)].range[0], e[e.length - 1].range[1] ];
                        }
                        v = this.performAction.call(w, g, i, h, this.yy, t[1], d, e);
                        if (typeof v !== "undefined") {
                            return v;
                        }
                        if (y) {
                            c = c.slice(0, -1 * y * 2);
                            d = d.slice(0, -1 * y);
                            e = e.slice(0, -1 * y);
                        }
                        c.push(this.productions_[t[1]][0]);
                        d.push(w.$);
                        e.push(w._$);
                        z = f[c[c.length - 2]][c[c.length - 1]];
                        c.push(z);
                        break;

                      case 3:
                        return true;
                    }
                }
                return true;
            }
        };
        var b = function() {
            var a = {
                EOF: 1,
                parseError: function b(a, b) {
                    if (this.yy.parser) {
                        this.yy.parser.parseError(a, b);
                    } else {
                        throw new Error(a);
                    }
                },
                setInput: function(a) {
                    this._input = a;
                    this._more = this._less = this.done = false;
                    this.yylineno = this.yyleng = 0;
                    this.yytext = this.matched = this.match = "";
                    this.conditionStack = [ "INITIAL" ];
                    this.yylloc = {
                        first_line: 1,
                        first_column: 0,
                        last_line: 1,
                        last_column: 0
                    };
                    if (this.options.ranges) this.yylloc.range = [ 0, 0 ];
                    this.offset = 0;
                    return this;
                },
                input: function() {
                    var a = this._input[0];
                    this.yytext += a;
                    this.yyleng++;
                    this.offset++;
                    this.match += a;
                    this.matched += a;
                    var b = a.match(/(?:\r\n?|\n).*/g);
                    if (b) {
                        this.yylineno++;
                        this.yylloc.last_line++;
                    } else {
                        this.yylloc.last_column++;
                    }
                    if (this.options.ranges) this.yylloc.range[1]++;
                    this._input = this._input.slice(1);
                    return a;
                },
                unput: function(a) {
                    var b = a.length;
                    var c = a.split(/(?:\r\n?|\n)/g);
                    this._input = a + this._input;
                    this.yytext = this.yytext.substr(0, this.yytext.length - b - 1);
                    this.offset -= b;
                    var d = this.match.split(/(?:\r\n?|\n)/g);
                    this.match = this.match.substr(0, this.match.length - 1);
                    this.matched = this.matched.substr(0, this.matched.length - 1);
                    if (c.length - 1) this.yylineno -= c.length - 1;
                    var e = this.yylloc.range;
                    this.yylloc = {
                        first_line: this.yylloc.first_line,
                        last_line: this.yylineno + 1,
                        first_column: this.yylloc.first_column,
                        last_column: c ? (c.length === d.length ? this.yylloc.first_column : 0) + d[d.length - c.length].length - c[0].length : this.yylloc.first_column - b
                    };
                    if (this.options.ranges) {
                        this.yylloc.range = [ e[0], e[0] + this.yyleng - b ];
                    }
                    return this;
                },
                more: function() {
                    this._more = true;
                    return this;
                },
                less: function(a) {
                    this.unput(this.match.slice(a));
                },
                pastInput: function() {
                    var a = this.matched.substr(0, this.matched.length - this.match.length);
                    return (a.length > 20 ? "..." : "") + a.substr(-20).replace(/\n/g, "");
                },
                upcomingInput: function() {
                    var a = this.match;
                    if (a.length < 20) {
                        a += this._input.substr(0, 20 - a.length);
                    }
                    return (a.substr(0, 20) + (a.length > 20 ? "..." : "")).replace(/\n/g, "");
                },
                showPosition: function() {
                    var a = this.pastInput();
                    var b = new Array(a.length + 1).join("-");
                    return a + this.upcomingInput() + "\n" + b + "^";
                },
                next: function() {
                    if (this.done) {
                        return this.EOF;
                    }
                    if (!this._input) this.done = true;
                    var a, b, c, d, e, f;
                    if (!this._more) {
                        this.yytext = "";
                        this.match = "";
                    }
                    var g = this._currentRules();
                    for (var h = 0; h < g.length; h++) {
                        c = this._input.match(this.rules[g[h]]);
                        if (c && (!b || c[0].length > b[0].length)) {
                            b = c;
                            d = h;
                            if (!this.options.flex) break;
                        }
                    }
                    if (b) {
                        f = b[0].match(/(?:\r\n?|\n).*/g);
                        if (f) this.yylineno += f.length;
                        this.yylloc = {
                            first_line: this.yylloc.last_line,
                            last_line: this.yylineno + 1,
                            first_column: this.yylloc.last_column,
                            last_column: f ? f[f.length - 1].length - f[f.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + b[0].length
                        };
                        this.yytext += b[0];
                        this.match += b[0];
                        this.matches = b;
                        this.yyleng = this.yytext.length;
                        if (this.options.ranges) {
                            this.yylloc.range = [ this.offset, this.offset += this.yyleng ];
                        }
                        this._more = false;
                        this._input = this._input.slice(b[0].length);
                        this.matched += b[0];
                        a = this.performAction.call(this, this.yy, this, g[d], this.conditionStack[this.conditionStack.length - 1]);
                        if (this.done && this._input) this.done = false;
                        if (a) return a; else return;
                    }
                    if (this._input === "") {
                        return this.EOF;
                    } else {
                        return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                            text: "",
                            token: null,
                            line: this.yylineno
                        });
                    }
                },
                lex: function c() {
                    var a = this.next();
                    if (typeof a !== "undefined") {
                        return a;
                    } else {
                        return this.lex();
                    }
                },
                begin: function d(a) {
                    this.conditionStack.push(a);
                },
                popState: function e() {
                    return this.conditionStack.pop();
                },
                _currentRules: function f() {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                },
                topState: function() {
                    return this.conditionStack[this.conditionStack.length - 2];
                },
                pushState: function g(a) {
                    this.begin(a);
                }
            };
            a.options = {};
            a.performAction = function h(a, b, c, d) {
                var e = d;
                switch (c) {
                  case 0:
                    b.yytext = "\\";
                    return 14;
                    break;

                  case 1:
                    if (b.yytext.slice(-1) !== "\\") this.begin("mu");
                    if (b.yytext.slice(-1) === "\\") b.yytext = b.yytext.substr(0, b.yyleng - 1), this.begin("emu");
                    if (b.yytext) return 14;
                    break;

                  case 2:
                    return 14;
                    break;

                  case 3:
                    if (b.yytext.slice(-1) !== "\\") this.popState();
                    if (b.yytext.slice(-1) === "\\") b.yytext = b.yytext.substr(0, b.yyleng - 1);
                    return 14;
                    break;

                  case 4:
                    b.yytext = b.yytext.substr(0, b.yyleng - 4);
                    this.popState();
                    return 15;
                    break;

                  case 5:
                    return 25;
                    break;

                  case 6:
                    return 16;
                    break;

                  case 7:
                    return 20;
                    break;

                  case 8:
                    return 19;
                    break;

                  case 9:
                    return 19;
                    break;

                  case 10:
                    return 23;
                    break;

                  case 11:
                    return 22;
                    break;

                  case 12:
                    this.popState();
                    this.begin("com");
                    break;

                  case 13:
                    b.yytext = b.yytext.substr(3, b.yyleng - 5);
                    this.popState();
                    return 15;
                    break;

                  case 14:
                    return 22;
                    break;

                  case 15:
                    return 37;
                    break;

                  case 16:
                    return 36;
                    break;

                  case 17:
                    return 36;
                    break;

                  case 18:
                    return 40;
                    break;

                  case 19:
                    break;

                  case 20:
                    this.popState();
                    return 24;
                    break;

                  case 21:
                    this.popState();
                    return 18;
                    break;

                  case 22:
                    b.yytext = b.yytext.substr(1, b.yyleng - 2).replace(/\\"/g, '"');
                    return 31;
                    break;

                  case 23:
                    b.yytext = b.yytext.substr(1, b.yyleng - 2).replace(/\\'/g, "'");
                    return 31;
                    break;

                  case 24:
                    return 38;
                    break;

                  case 25:
                    return 33;
                    break;

                  case 26:
                    return 33;
                    break;

                  case 27:
                    return 32;
                    break;

                  case 28:
                    return 36;
                    break;

                  case 29:
                    b.yytext = b.yytext.substr(1, b.yyleng - 2);
                    return 36;
                    break;

                  case 30:
                    return "INVALID";
                    break;

                  case 31:
                    return 5;
                    break;
                }
            };
            a.rules = [ /^(?:\\\\(?=(\{\{)))/, /^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|$)))/, /^(?:[\s\S]*?--\}\})/, /^(?:\{\{>)/, /^(?:\{\{#)/, /^(?:\{\{\/)/, /^(?:\{\{\^)/, /^(?:\{\{\s*else\b)/, /^(?:\{\{\{)/, /^(?:\{\{&)/, /^(?:\{\{!--)/, /^(?:\{\{![\s\S]*?\}\})/, /^(?:\{\{)/, /^(?:=)/, /^(?:\.(?=[}\/ ]))/, /^(?:\.\.)/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}\}\})/, /^(?:\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=[}\s]))/, /^(?:false(?=[}\s]))/, /^(?:-?[0-9]+(?=[}\s]))/, /^(?:[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.]))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:$)/ ];
            a.conditions = {
                mu: {
                    rules: [ 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31 ],
                    inclusive: false
                },
                emu: {
                    rules: [ 3 ],
                    inclusive: false
                },
                com: {
                    rules: [ 4 ],
                    inclusive: false
                },
                INITIAL: {
                    rules: [ 0, 1, 2, 31 ],
                    inclusive: true
                }
            };
            return a;
        }();
        a.lexer = b;
        function c() {
            this.yy = {};
        }
        c.prototype = a;
        a.Parser = c;
        return new c();
    }();
    a.Parser = f;
    a.parse = function(b) {
        if (b.constructor === a.AST.ProgramNode) {
            return b;
        }
        a.Parser.yy = a.AST;
        return a.Parser.parse(b);
    };
    a.AST = {};
    a.AST.ProgramNode = function(b, c) {
        this.type = "program";
        this.statements = b;
        if (c) {
            this.inverse = new a.AST.ProgramNode(c);
        }
    };
    a.AST.MustacheNode = function(a, b, c) {
        this.type = "mustache";
        this.escaped = !c;
        this.hash = b;
        var d = this.id = a[0];
        var e = this.params = a.slice(1);
        var f = this.eligibleHelper = d.isSimple;
        this.isHelper = f && (e.length || b);
    };
    a.AST.PartialNode = function(a, b) {
        this.type = "partial";
        this.partialName = a;
        this.context = b;
    };
    a.AST.BlockNode = function(b, c, d, e) {
        var f = function(b, c) {
            if (b.original !== c.original) {
                throw new a.Exception(b.original + " doesn't match " + c.original);
            }
        };
        f(b.id, e);
        this.type = "block";
        this.mustache = b;
        this.program = c;
        this.inverse = d;
        if (this.inverse && !this.program) {
            this.isInverse = true;
        }
    };
    a.AST.ContentNode = function(a) {
        this.type = "content";
        this.string = a;
    };
    a.AST.HashNode = function(a) {
        this.type = "hash";
        this.pairs = a;
    };
    a.AST.IdNode = function(b) {
        this.type = "ID";
        var c = "", d = [], e = 0;
        for (var f = 0, g = b.length; f < g; f++) {
            var h = b[f].part;
            c += (b[f].separator || "") + h;
            if (h === ".." || h === "." || h === "this") {
                if (d.length > 0) {
                    throw new a.Exception("Invalid path: " + c);
                } else if (h === "..") {
                    e++;
                } else {
                    this.isScoped = true;
                }
            } else {
                d.push(h);
            }
        }
        this.original = c;
        this.parts = d;
        this.string = d.join(".");
        this.depth = e;
        this.isSimple = b.length === 1 && !this.isScoped && e === 0;
        this.stringModeValue = this.string;
    };
    a.AST.PartialNameNode = function(a) {
        this.type = "PARTIAL_NAME";
        this.name = a.original;
    };
    a.AST.DataNode = function(a) {
        this.type = "DATA";
        this.id = a;
    };
    a.AST.StringNode = function(a) {
        this.type = "STRING";
        this.original = this.string = this.stringModeValue = a;
    };
    a.AST.IntegerNode = function(a) {
        this.type = "INTEGER";
        this.original = this.integer = a;
        this.stringModeValue = Number(a);
    };
    a.AST.BooleanNode = function(a) {
        this.type = "BOOLEAN";
        this.bool = a;
        this.stringModeValue = a === "true";
    };
    a.AST.CommentNode = function(a) {
        this.type = "comment";
        this.comment = a;
    };
    var g = [ "description", "fileName", "lineNumber", "message", "name", "number", "stack" ];
    a.Exception = function(a) {
        var b = Error.prototype.constructor.apply(this, arguments);
        for (var c = 0; c < g.length; c++) {
            this[g[c]] = b[g[c]];
        }
    };
    a.Exception.prototype = new Error();
    a.SafeString = function(a) {
        this.string = a;
    };
    a.SafeString.prototype.toString = function() {
        return this.string.toString();
    };
    var h = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    };
    var i = /[&<>"'`]/g;
    var j = /[&<>"'`]/;
    var k = function(a) {
        return h[a] || "&amp;";
    };
    a.Utils = {
        extend: function(a, b) {
            for (var c in b) {
                if (b.hasOwnProperty(c)) {
                    a[c] = b[c];
                }
            }
        },
        escapeExpression: function(b) {
            if (b instanceof a.SafeString) {
                return b.toString();
            } else if (b == null || b === false) {
                return "";
            }
            b = b.toString();
            if (!j.test(b)) {
                return b;
            }
            return b.replace(i, k);
        },
        isEmpty: function(a) {
            if (!a && a !== 0) {
                return true;
            } else if (c.call(a) === "[object Array]" && a.length === 0) {
                return true;
            } else {
                return false;
            }
        }
    };
    var l = a.Compiler = function() {};
    var m = a.JavaScriptCompiler = function() {};
    l.prototype = {
        compiler: l,
        disassemble: function() {
            var a = this.opcodes, b, c = [], d, e;
            for (var f = 0, g = a.length; f < g; f++) {
                b = a[f];
                if (b.opcode === "DECLARE") {
                    c.push("DECLARE " + b.name + "=" + b.value);
                } else {
                    d = [];
                    for (var h = 0; h < b.args.length; h++) {
                        e = b.args[h];
                        if (typeof e === "string") {
                            e = '"' + e.replace("\n", "\\n") + '"';
                        }
                        d.push(e);
                    }
                    c.push(b.opcode + " " + d.join(" "));
                }
            }
            return c.join("\n");
        },
        equals: function(a) {
            var b = this.opcodes.length;
            if (a.opcodes.length !== b) {
                return false;
            }
            for (var c = 0; c < b; c++) {
                var d = this.opcodes[c], e = a.opcodes[c];
                if (d.opcode !== e.opcode || d.args.length !== e.args.length) {
                    return false;
                }
                for (var f = 0; f < d.args.length; f++) {
                    if (d.args[f] !== e.args[f]) {
                        return false;
                    }
                }
            }
            b = this.children.length;
            if (a.children.length !== b) {
                return false;
            }
            for (c = 0; c < b; c++) {
                if (!this.children[c].equals(a.children[c])) {
                    return false;
                }
            }
            return true;
        },
        guid: 0,
        compile: function(a, b) {
            this.children = [];
            this.depths = {
                list: []
            };
            this.options = b;
            var c = this.options.knownHelpers;
            this.options.knownHelpers = {
                helperMissing: true,
                blockHelperMissing: true,
                each: true,
                "if": true,
                unless: true,
                "with": true,
                log: true
            };
            if (c) {
                for (var d in c) {
                    this.options.knownHelpers[d] = c[d];
                }
            }
            return this.program(a);
        },
        accept: function(a) {
            return this[a.type](a);
        },
        program: function(a) {
            var b = a.statements, c;
            this.opcodes = [];
            for (var d = 0, e = b.length; d < e; d++) {
                c = b[d];
                this[c.type](c);
            }
            this.isSimple = e === 1;
            this.depths.list = this.depths.list.sort(function(a, b) {
                return a - b;
            });
            return this;
        },
        compileProgram: function(a) {
            var b = new this.compiler().compile(a, this.options);
            var c = this.guid++, d;
            this.usePartial = this.usePartial || b.usePartial;
            this.children[c] = b;
            for (var e = 0, f = b.depths.list.length; e < f; e++) {
                d = b.depths.list[e];
                if (d < 2) {
                    continue;
                } else {
                    this.addDepth(d - 1);
                }
            }
            return c;
        },
        block: function(a) {
            var b = a.mustache, c = a.program, d = a.inverse;
            if (c) {
                c = this.compileProgram(c);
            }
            if (d) {
                d = this.compileProgram(d);
            }
            var e = this.classifyMustache(b);
            if (e === "helper") {
                this.helperMustache(b, c, d);
            } else if (e === "simple") {
                this.simpleMustache(b);
                this.opcode("pushProgram", c);
                this.opcode("pushProgram", d);
                this.opcode("emptyHash");
                this.opcode("blockValue");
            } else {
                this.ambiguousMustache(b, c, d);
                this.opcode("pushProgram", c);
                this.opcode("pushProgram", d);
                this.opcode("emptyHash");
                this.opcode("ambiguousBlockValue");
            }
            this.opcode("append");
        },
        hash: function(a) {
            var b = a.pairs, c, d;
            this.opcode("pushHash");
            for (var e = 0, f = b.length; e < f; e++) {
                c = b[e];
                d = c[1];
                if (this.options.stringParams) {
                    if (d.depth) {
                        this.addDepth(d.depth);
                    }
                    this.opcode("getContext", d.depth || 0);
                    this.opcode("pushStringParam", d.stringModeValue, d.type);
                } else {
                    this.accept(d);
                }
                this.opcode("assignToHash", c[0]);
            }
            this.opcode("popHash");
        },
        partial: function(a) {
            var b = a.partialName;
            this.usePartial = true;
            if (a.context) {
                this.ID(a.context);
            } else {
                this.opcode("push", "depth0");
            }
            this.opcode("invokePartial", b.name);
            this.opcode("append");
        },
        content: function(a) {
            this.opcode("appendContent", a.string);
        },
        mustache: function(a) {
            var b = this.options;
            var c = this.classifyMustache(a);
            if (c === "simple") {
                this.simpleMustache(a);
            } else if (c === "helper") {
                this.helperMustache(a);
            } else {
                this.ambiguousMustache(a);
            }
            if (a.escaped && !b.noEscape) {
                this.opcode("appendEscaped");
            } else {
                this.opcode("append");
            }
        },
        ambiguousMustache: function(a, b, c) {
            var d = a.id, e = d.parts[0], f = b != null || c != null;
            this.opcode("getContext", d.depth);
            this.opcode("pushProgram", b);
            this.opcode("pushProgram", c);
            this.opcode("invokeAmbiguous", e, f);
        },
        simpleMustache: function(a) {
            var b = a.id;
            if (b.type === "DATA") {
                this.DATA(b);
            } else if (b.parts.length) {
                this.ID(b);
            } else {
                this.addDepth(b.depth);
                this.opcode("getContext", b.depth);
                this.opcode("pushContext");
            }
            this.opcode("resolvePossibleLambda");
        },
        helperMustache: function(a, b, c) {
            var d = this.setupFullMustacheParams(a, b, c), e = a.id.parts[0];
            if (this.options.knownHelpers[e]) {
                this.opcode("invokeKnownHelper", d.length, e);
            } else if (this.options.knownHelpersOnly) {
                throw new Error("You specified knownHelpersOnly, but used the unknown helper " + e);
            } else {
                this.opcode("invokeHelper", d.length, e);
            }
        },
        ID: function(a) {
            this.addDepth(a.depth);
            this.opcode("getContext", a.depth);
            var b = a.parts[0];
            if (!b) {
                this.opcode("pushContext");
            } else {
                this.opcode("lookupOnContext", a.parts[0]);
            }
            for (var c = 1, d = a.parts.length; c < d; c++) {
                this.opcode("lookup", a.parts[c]);
            }
        },
        DATA: function(b) {
            this.options.data = true;
            if (b.id.isScoped || b.id.depth) {
                throw new a.Exception("Scoped data references are not supported: " + b.original);
            }
            this.opcode("lookupData");
            var c = b.id.parts;
            for (var d = 0, e = c.length; d < e; d++) {
                this.opcode("lookup", c[d]);
            }
        },
        STRING: function(a) {
            this.opcode("pushString", a.string);
        },
        INTEGER: function(a) {
            this.opcode("pushLiteral", a.integer);
        },
        BOOLEAN: function(a) {
            this.opcode("pushLiteral", a.bool);
        },
        comment: function() {},
        opcode: function(a) {
            this.opcodes.push({
                opcode: a,
                args: [].slice.call(arguments, 1)
            });
        },
        declare: function(a, b) {
            this.opcodes.push({
                opcode: "DECLARE",
                name: a,
                value: b
            });
        },
        addDepth: function(a) {
            if (isNaN(a)) {
                throw new Error("EWOT");
            }
            if (a === 0) {
                return;
            }
            if (!this.depths[a]) {
                this.depths[a] = true;
                this.depths.list.push(a);
            }
        },
        classifyMustache: function(a) {
            var b = a.isHelper;
            var c = a.eligibleHelper;
            var d = this.options;
            if (c && !b) {
                var e = a.id.parts[0];
                if (d.knownHelpers[e]) {
                    b = true;
                } else if (d.knownHelpersOnly) {
                    c = false;
                }
            }
            if (b) {
                return "helper";
            } else if (c) {
                return "ambiguous";
            } else {
                return "simple";
            }
        },
        pushParams: function(a) {
            var b = a.length, c;
            while (b--) {
                c = a[b];
                if (this.options.stringParams) {
                    if (c.depth) {
                        this.addDepth(c.depth);
                    }
                    this.opcode("getContext", c.depth || 0);
                    this.opcode("pushStringParam", c.stringModeValue, c.type);
                } else {
                    this[c.type](c);
                }
            }
        },
        setupMustacheParams: function(a) {
            var b = a.params;
            this.pushParams(b);
            if (a.hash) {
                this.hash(a.hash);
            } else {
                this.opcode("emptyHash");
            }
            return b;
        },
        setupFullMustacheParams: function(a, b, c) {
            var d = a.params;
            this.pushParams(d);
            this.opcode("pushProgram", b);
            this.opcode("pushProgram", c);
            if (a.hash) {
                this.hash(a.hash);
            } else {
                this.opcode("emptyHash");
            }
            return d;
        }
    };
    var n = function(a) {
        this.value = a;
    };
    m.prototype = {
        nameLookup: function(a, b) {
            if (/^[0-9]+$/.test(b)) {
                return a + "[" + b + "]";
            } else if (m.isValidJavaScriptVariableName(b)) {
                return a + "." + b;
            } else {
                return a + "['" + b + "']";
            }
        },
        appendToBuffer: function(a) {
            if (this.environment.isSimple) {
                return "return " + a + ";";
            } else {
                return {
                    appendToBuffer: true,
                    content: a,
                    toString: function() {
                        return "buffer += " + a + ";";
                    }
                };
            }
        },
        initializeBuffer: function() {
            return this.quotedString("");
        },
        namespace: "Handlebars",
        compile: function(b, c, d, e) {
            this.environment = b;
            this.options = c || {};
            a.log(a.logger.DEBUG, this.environment.disassemble() + "\n\n");
            this.name = this.environment.name;
            this.isChild = !!d;
            this.context = d || {
                programs: [],
                environments: [],
                aliases: {}
            };
            this.preamble();
            this.stackSlot = 0;
            this.stackVars = [];
            this.registers = {
                list: []
            };
            this.compileStack = [];
            this.inlineStack = [];
            this.compileChildren(b, c);
            var f = b.opcodes, g;
            this.i = 0;
            for (r = f.length; this.i < r; this.i++) {
                g = f[this.i];
                if (g.opcode === "DECLARE") {
                    this[g.name] = g.value;
                } else {
                    this[g.opcode].apply(this, g.args);
                }
            }
            return this.createFunctionContext(e);
        },
        nextOpcode: function() {
            var a = this.environment.opcodes;
            return a[this.i + 1];
        },
        eat: function() {
            this.i = this.i + 1;
        },
        preamble: function() {
            var a = [];
            if (!this.isChild) {
                var b = this.namespace;
                var c = "helpers = this.merge(helpers, " + b + ".helpers);";
                if (this.environment.usePartial) {
                    c = c + " partials = this.merge(partials, " + b + ".partials);";
                }
                if (this.options.data) {
                    c = c + " data = data || {};";
                }
                a.push(c);
            } else {
                a.push("");
            }
            if (!this.environment.isSimple) {
                a.push(", buffer = " + this.initializeBuffer());
            } else {
                a.push("");
            }
            this.lastContext = 0;
            this.source = a;
        },
        createFunctionContext: function(b) {
            var c = this.stackVars.concat(this.registers.list);
            if (c.length > 0) {
                this.source[1] = this.source[1] + ", " + c.join(", ");
            }
            if (!this.isChild) {
                for (var d in this.context.aliases) {
                    if (this.context.aliases.hasOwnProperty(d)) {
                        this.source[1] = this.source[1] + ", " + d + "=" + this.context.aliases[d];
                    }
                }
            }
            if (this.source[1]) {
                this.source[1] = "var " + this.source[1].substring(2) + ";";
            }
            if (!this.isChild) {
                this.source[1] += "\n" + this.context.programs.join("\n") + "\n";
            }
            if (!this.environment.isSimple) {
                this.source.push("return buffer;");
            }
            var e = this.isChild ? [ "depth0", "data" ] : [ "Handlebars", "depth0", "helpers", "partials", "data" ];
            for (var f = 0, g = this.environment.depths.list.length; f < g; f++) {
                e.push("depth" + this.environment.depths.list[f]);
            }
            var h = this.mergeSource();
            if (!this.isChild) {
                var i = a.COMPILER_REVISION, j = a.REVISION_CHANGES[i];
                h = "this.compilerInfo = [" + i + ",'" + j + "'];\n" + h;
            }
            if (b) {
                e.push(h);
                return Function.apply(this, e);
            } else {
                var k = "function " + (this.name || "") + "(" + e.join(",") + ") {\n  " + h + "}";
                a.log(a.logger.DEBUG, k + "\n\n");
                return k;
            }
        },
        mergeSource: function() {
            var a = "", c;
            for (var d = 0, e = this.source.length; d < e; d++) {
                var f = this.source[d];
                if (f.appendToBuffer) {
                    if (c) {
                        c = c + "\n    + " + f.content;
                    } else {
                        c = f.content;
                    }
                } else {
                    if (c) {
                        a += "buffer += " + c + ";\n  ";
                        c = b;
                    }
                    a += f + "\n  ";
                }
            }
            return a;
        },
        blockValue: function() {
            this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
            var a = [ "depth0" ];
            this.setupParams(0, a);
            this.replaceStack(function(b) {
                a.splice(1, 0, b);
                return "blockHelperMissing.call(" + a.join(", ") + ")";
            });
        },
        ambiguousBlockValue: function() {
            this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
            var a = [ "depth0" ];
            this.setupParams(0, a);
            var b = this.topStack();
            a.splice(1, 0, b);
            a[a.length - 1] = "options";
            this.source.push("if (!" + this.lastHelper + ") { " + b + " = blockHelperMissing.call(" + a.join(", ") + "); }");
        },
        appendContent: function(a) {
            this.source.push(this.appendToBuffer(this.quotedString(a)));
        },
        append: function() {
            this.flushInline();
            var a = this.popStack();
            this.source.push("if(" + a + " || " + a + " === 0) { " + this.appendToBuffer(a) + " }");
            if (this.environment.isSimple) {
                this.source.push("else { " + this.appendToBuffer("''") + " }");
            }
        },
        appendEscaped: function() {
            this.context.aliases.escapeExpression = "this.escapeExpression";
            this.source.push(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"));
        },
        getContext: function(a) {
            if (this.lastContext !== a) {
                this.lastContext = a;
            }
        },
        lookupOnContext: function(a) {
            this.push(this.nameLookup("depth" + this.lastContext, a, "context"));
        },
        pushContext: function() {
            this.pushStackLiteral("depth" + this.lastContext);
        },
        resolvePossibleLambda: function() {
            this.context.aliases.functionType = '"function"';
            this.replaceStack(function(a) {
                return "typeof " + a + " === functionType ? " + a + ".apply(depth0) : " + a;
            });
        },
        lookup: function(a) {
            this.replaceStack(function(b) {
                return b + " == null || " + b + " === false ? " + b + " : " + this.nameLookup(b, a, "context");
            });
        },
        lookupData: function(a) {
            this.push("data");
        },
        pushStringParam: function(a, b) {
            this.pushStackLiteral("depth" + this.lastContext);
            this.pushString(b);
            if (typeof a === "string") {
                this.pushString(a);
            } else {
                this.pushStackLiteral(a);
            }
        },
        emptyHash: function() {
            this.pushStackLiteral("{}");
            if (this.options.stringParams) {
                this.register("hashTypes", "{}");
                this.register("hashContexts", "{}");
            }
        },
        pushHash: function() {
            this.hash = {
                values: [],
                types: [],
                contexts: []
            };
        },
        popHash: function() {
            var a = this.hash;
            this.hash = b;
            if (this.options.stringParams) {
                this.register("hashContexts", "{" + a.contexts.join(",") + "}");
                this.register("hashTypes", "{" + a.types.join(",") + "}");
            }
            this.push("{\n    " + a.values.join(",\n    ") + "\n  }");
        },
        pushString: function(a) {
            this.pushStackLiteral(this.quotedString(a));
        },
        push: function(a) {
            this.inlineStack.push(a);
            return a;
        },
        pushLiteral: function(a) {
            this.pushStackLiteral(a);
        },
        pushProgram: function(a) {
            if (a != null) {
                this.pushStackLiteral(this.programExpression(a));
            } else {
                this.pushStackLiteral(null);
            }
        },
        invokeHelper: function(a, b) {
            this.context.aliases.helperMissing = "helpers.helperMissing";
            var c = this.lastHelper = this.setupHelper(a, b, true);
            var d = this.nameLookup("depth" + this.lastContext, b, "context");
            this.push(c.name + " || " + d);
            this.replaceStack(function(a) {
                return a + " ? " + a + ".call(" + c.callParams + ") " + ": helperMissing.call(" + c.helperMissingParams + ")";
            });
        },
        invokeKnownHelper: function(a, b) {
            var c = this.setupHelper(a, b);
            this.push(c.name + ".call(" + c.callParams + ")");
        },
        invokeAmbiguous: function(a, b) {
            this.context.aliases.functionType = '"function"';
            this.pushStackLiteral("{}");
            var c = this.setupHelper(0, a, b);
            var d = this.lastHelper = this.nameLookup("helpers", a, "helper");
            var e = this.nameLookup("depth" + this.lastContext, a, "context");
            var f = this.nextStack();
            this.source.push("if (" + f + " = " + d + ") { " + f + " = " + f + ".call(" + c.callParams + "); }");
            this.source.push("else { " + f + " = " + e + "; " + f + " = typeof " + f + " === functionType ? " + f + ".apply(depth0) : " + f + "; }");
        },
        invokePartial: function(a) {
            var b = [ this.nameLookup("partials", a, "partial"), "'" + a + "'", this.popStack(), "helpers", "partials" ];
            if (this.options.data) {
                b.push("data");
            }
            this.context.aliases.self = "this";
            this.push("self.invokePartial(" + b.join(", ") + ")");
        },
        assignToHash: function(a) {
            var b = this.popStack(), c, d;
            if (this.options.stringParams) {
                d = this.popStack();
                c = this.popStack();
            }
            var e = this.hash;
            if (c) {
                e.contexts.push("'" + a + "': " + c);
            }
            if (d) {
                e.types.push("'" + a + "': " + d);
            }
            e.values.push("'" + a + "': (" + b + ")");
        },
        compiler: m,
        compileChildren: function(a, b) {
            var c = a.children, d, e;
            for (var f = 0, g = c.length; f < g; f++) {
                d = c[f];
                e = new this.compiler();
                var h = this.matchExistingProgram(d);
                if (h == null) {
                    this.context.programs.push("");
                    h = this.context.programs.length;
                    d.index = h;
                    d.name = "program" + h;
                    this.context.programs[h] = e.compile(d, b, this.context);
                    this.context.environments[h] = d;
                } else {
                    d.index = h;
                    d.name = "program" + h;
                }
            }
        },
        matchExistingProgram: function(a) {
            for (var b = 0, c = this.context.environments.length; b < c; b++) {
                var d = this.context.environments[b];
                if (d && d.equals(a)) {
                    return b;
                }
            }
        },
        programExpression: function(a) {
            this.context.aliases.self = "this";
            if (a == null) {
                return "self.noop";
            }
            var b = this.environment.children[a], c = b.depths.list, d;
            var e = [ b.index, b.name, "data" ];
            for (var f = 0, g = c.length; f < g; f++) {
                d = c[f];
                if (d === 1) {
                    e.push("depth0");
                } else {
                    e.push("depth" + (d - 1));
                }
            }
            return (c.length === 0 ? "self.program(" : "self.programWithDepth(") + e.join(", ") + ")";
        },
        register: function(a, b) {
            this.useRegister(a);
            this.source.push(a + " = " + b + ";");
        },
        useRegister: function(a) {
            if (!this.registers[a]) {
                this.registers[a] = true;
                this.registers.list.push(a);
            }
        },
        pushStackLiteral: function(a) {
            return this.push(new n(a));
        },
        pushStack: function(a) {
            this.flushInline();
            var b = this.incrStack();
            if (a) {
                this.source.push(b + " = " + a + ";");
            }
            this.compileStack.push(b);
            return b;
        },
        replaceStack: function(a) {
            var b = "", c = this.isInline(), d;
            if (c) {
                var e = this.popStack(true);
                if (e instanceof n) {
                    d = e.value;
                } else {
                    var f = this.stackSlot ? this.topStackName() : this.incrStack();
                    b = "(" + this.push(f) + " = " + e + "),";
                    d = this.topStack();
                }
            } else {
                d = this.topStack();
            }
            var g = a.call(this, d);
            if (c) {
                if (this.inlineStack.length || this.compileStack.length) {
                    this.popStack();
                }
                this.push("(" + b + g + ")");
            } else {
                if (!/^stack/.test(d)) {
                    d = this.nextStack();
                }
                this.source.push(d + " = (" + b + g + ");");
            }
            return d;
        },
        nextStack: function() {
            return this.pushStack();
        },
        incrStack: function() {
            this.stackSlot++;
            if (this.stackSlot > this.stackVars.length) {
                this.stackVars.push("stack" + this.stackSlot);
            }
            return this.topStackName();
        },
        topStackName: function() {
            return "stack" + this.stackSlot;
        },
        flushInline: function() {
            var a = this.inlineStack;
            if (a.length) {
                this.inlineStack = [];
                for (var b = 0, c = a.length; b < c; b++) {
                    var d = a[b];
                    if (d instanceof n) {
                        this.compileStack.push(d);
                    } else {
                        this.pushStack(d);
                    }
                }
            }
        },
        isInline: function() {
            return this.inlineStack.length;
        },
        popStack: function(a) {
            var b = this.isInline(), c = (b ? this.inlineStack : this.compileStack).pop();
            if (!a && c instanceof n) {
                return c.value;
            } else {
                if (!b) {
                    this.stackSlot--;
                }
                return c;
            }
        },
        topStack: function(a) {
            var b = this.isInline() ? this.inlineStack : this.compileStack, c = b[b.length - 1];
            if (!a && c instanceof n) {
                return c.value;
            } else {
                return c;
            }
        },
        quotedString: function(a) {
            return '"' + a.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"';
        },
        setupHelper: function(a, b, c) {
            var d = [];
            this.setupParams(a, d, c);
            var e = this.nameLookup("helpers", b, "helper");
            return {
                params: d,
                name: e,
                callParams: [ "depth0" ].concat(d).join(", "),
                helperMissingParams: c && [ "depth0", this.quotedString(b) ].concat(d).join(", ")
            };
        },
        setupParams: function(a, b, c) {
            var d = [], e = [], f = [], g, h, i;
            d.push("hash:" + this.popStack());
            h = this.popStack();
            i = this.popStack();
            if (i || h) {
                if (!i) {
                    this.context.aliases.self = "this";
                    i = "self.noop";
                }
                if (!h) {
                    this.context.aliases.self = "this";
                    h = "self.noop";
                }
                d.push("inverse:" + h);
                d.push("fn:" + i);
            }
            for (var j = 0; j < a; j++) {
                g = this.popStack();
                b.push(g);
                if (this.options.stringParams) {
                    f.push(this.popStack());
                    e.push(this.popStack());
                }
            }
            if (this.options.stringParams) {
                d.push("contexts:[" + e.join(",") + "]");
                d.push("types:[" + f.join(",") + "]");
                d.push("hashContexts:hashContexts");
                d.push("hashTypes:hashTypes");
            }
            if (this.options.data) {
                d.push("data:data");
            }
            d = "{" + d.join(",") + "}";
            if (c) {
                this.register("options", d);
                b.push("options");
            } else {
                b.push(d);
            }
            return b.join(", ");
        }
    };
    var o = ("break else new var" + " case finally return void" + " catch for switch while" + " continue function this with" + " default if throw" + " delete in try" + " do instanceof typeof" + " abstract enum int short" + " boolean export interface static" + " byte extends long super" + " char final native synchronized" + " class float package throws" + " const goto private transient" + " debugger implements protected volatile" + " double import public let yield").split(" ");
    var p = m.RESERVED_WORDS = {};
    for (var q = 0, r = o.length; q < r; q++) {
        p[o[q]] = true;
    }
    m.isValidJavaScriptVariableName = function(a) {
        if (!m.RESERVED_WORDS[a] && /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(a)) {
            return true;
        }
        return false;
    };
    a.precompile = function(b, c) {
        if (b == null || typeof b !== "string" && b.constructor !== a.AST.ProgramNode) {
            throw new a.Exception("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + b);
        }
        c = c || {};
        if (!("data" in c)) {
            c.data = true;
        }
        var d = a.parse(b);
        var e = new l().compile(d, c);
        return new m().compile(e, c);
    };
    a.compile = function(c, d) {
        if (c == null || typeof c !== "string" && c.constructor !== a.AST.ProgramNode) {
            throw new a.Exception("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + c);
        }
        d = d || {};
        if (!("data" in d)) {
            d.data = true;
        }
        var e;
        function f() {
            var e = a.parse(c);
            var f = new l().compile(e, d);
            var g = new m().compile(f, d, b, true);
            return a.template(g);
        }
        return function(a, b) {
            if (!e) {
                e = f();
            }
            return e.call(this, a, b);
        };
    };
    a.VM = {
        template: function(b) {
            var c = {
                escapeExpression: a.Utils.escapeExpression,
                invokePartial: a.VM.invokePartial,
                programs: [],
                program: function(b, c, d) {
                    var e = this.programs[b];
                    if (d) {
                        e = a.VM.program(b, c, d);
                    } else if (!e) {
                        e = this.programs[b] = a.VM.program(b, c);
                    }
                    return e;
                },
                merge: function(b, c) {
                    var d = b || c;
                    if (b && c) {
                        d = {};
                        a.Utils.extend(d, c);
                        a.Utils.extend(d, b);
                    }
                    return d;
                },
                programWithDepth: a.VM.programWithDepth,
                noop: a.VM.noop,
                compilerInfo: null
            };
            return function(d, e) {
                e = e || {};
                var f = b.call(c, a, d, e.helpers, e.partials, e.data);
                var g = c.compilerInfo || [], h = g[0] || 1, i = a.COMPILER_REVISION;
                if (h !== i) {
                    if (h < i) {
                        var j = a.REVISION_CHANGES[i], k = a.REVISION_CHANGES[h];
                        throw "Template was precompiled with an older version of Handlebars than the current runtime. " + "Please update your precompiler to a newer version (" + j + ") or downgrade your runtime to an older version (" + k + ").";
                    } else {
                        throw "Template was precompiled with a newer version of Handlebars than the current runtime. " + "Please update your runtime to a newer version (" + g[1] + ").";
                    }
                }
                return f;
            };
        },
        programWithDepth: function(a, b, c) {
            var d = Array.prototype.slice.call(arguments, 3);
            var e = function(a, e) {
                e = e || {};
                return b.apply(this, [ a, e.data || c ].concat(d));
            };
            e.program = a;
            e.depth = d.length;
            return e;
        },
        program: function(a, b, c) {
            var d = function(a, d) {
                d = d || {};
                return b(a, d.data || c);
            };
            d.program = a;
            d.depth = 0;
            return d;
        },
        noop: function() {
            return "";
        },
        invokePartial: function(c, d, e, f, g, h) {
            var i = {
                helpers: f,
                partials: g,
                data: h
            };
            if (c === b) {
                throw new a.Exception("The partial " + d + " could not be found");
            } else if (c instanceof Function) {
                return c(e, i);
            } else if (!a.compile) {
                throw new a.Exception("The partial " + d + " could not be compiled when running in runtime-only mode");
            } else {
                g[d] = a.compile(c, {
                    data: h !== b
                });
                return g[d](e, i);
            }
        }
    };
    a.template = a.VM.template;
})(Handlebars);

(function(a) {
    a.fn.hoverIntent = function(b, c, d) {
        var e = {
            interval: 100,
            sensitivity: 7,
            timeout: 0
        };
        if (typeof b === "object") {
            e = a.extend(e, b);
        } else if (a.isFunction(c)) {
            e = a.extend(e, {
                over: b,
                out: c,
                selector: d
            });
        } else {
            e = a.extend(e, {
                over: b,
                out: b,
                selector: c
            });
        }
        var f, g, h, i;
        var j = function(a) {
            f = a.pageX;
            g = a.pageY;
        };
        var k = function(b, c) {
            c.hoverIntent_t = clearTimeout(c.hoverIntent_t);
            if (Math.abs(h - f) + Math.abs(i - g) < e.sensitivity) {
                a(c).off("mousemove.hoverIntent", j);
                c.hoverIntent_s = 1;
                return e.over.apply(c, [ b ]);
            } else {
                h = f;
                i = g;
                c.hoverIntent_t = setTimeout(function() {
                    k(b, c);
                }, e.interval);
            }
        };
        var l = function(a, b) {
            b.hoverIntent_t = clearTimeout(b.hoverIntent_t);
            b.hoverIntent_s = 0;
            return e.out.apply(b, [ a ]);
        };
        var m = function(b) {
            var c = jQuery.extend({}, b);
            var d = this;
            if (d.hoverIntent_t) {
                d.hoverIntent_t = clearTimeout(d.hoverIntent_t);
            }
            if (b.type == "mouseenter") {
                h = c.pageX;
                i = c.pageY;
                a(d).on("mousemove.hoverIntent", j);
                if (d.hoverIntent_s != 1) {
                    d.hoverIntent_t = setTimeout(function() {
                        k(c, d);
                    }, e.interval);
                }
            } else {
                a(d).off("mousemove.hoverIntent", j);
                if (d.hoverIntent_s == 1) {
                    d.hoverIntent_t = setTimeout(function() {
                        l(c, d);
                    }, e.timeout);
                }
            }
        };
        return this.on({
            "mouseenter.hoverIntent": m,
            "mouseleave.hoverIntent": m
        }, e.selector);
    };
})(jQuery);

!function(a) {
    function b(a, b, c) {
        c = (c || 0) - 1;
        for (var d = a.length; ++c < d; ) if (a[c] === b) return c;
        return -1;
    }
    function c(a, c) {
        var d = typeof c;
        if (a = a.k, "boolean" == d || c == q) return a[c];
        "number" != d && "string" != d && (d = "object");
        var e = "number" == d ? c : w + c;
        return a = a[d] || (a[d] = {}), "object" == d ? a[e] && -1 < b(a[e], c) ? 0 : -1 : a[e] ? 0 : -1;
    }
    function d(a) {
        var b = this.k, c = typeof a;
        if ("boolean" == c || a == q) b[a] = p; else {
            "number" != c && "string" != c && (c = "object");
            var d = "number" == c ? a : w + a, e = b[c] || (b[c] = {});
            "object" == c ? (e[d] || (e[d] = [])).push(a) == this.b.length && (b[c] = r) : e[d] = p;
        }
    }
    function e(a) {
        return a.charCodeAt(0);
    }
    function f(a, b) {
        var c = a.m, d = b.m;
        if (a = a.l, b = b.l, a !== b) {
            if (a > b || typeof a == "undefined") return 1;
            if (a < b || typeof b == "undefined") return -1;
        }
        return c < d ? -1 : 1;
    }
    function g(a) {
        var b = -1, c = a.length, e = j();
        e["false"] = e["null"] = e["true"] = e.undefined = r;
        var f = j();
        for (f.b = a, f.k = e, f.push = d; ++b < c; ) f.push(a[b]);
        return e.object === false ? (l(f), q) : f;
    }
    function h(a) {
        return "\\" + Y[a];
    }
    function i() {
        return s.pop() || [];
    }
    function j() {
        return t.pop() || {
            b: q,
            k: q,
            l: q,
            "false": r,
            m: 0,
            leading: r,
            maxWait: 0,
            "null": r,
            number: q,
            object: q,
            push: q,
            string: q,
            trailing: r,
            "true": r,
            undefined: r,
            n: q
        };
    }
    function k(a) {
        a.length = 0, s.length < y && s.push(a);
    }
    function l(a) {
        var b = a.k;
        b && l(b), a.b = a.k = a.l = a.object = a.number = a.string = a.n = q, t.length < y && t.push(a);
    }
    function m(a, b, c) {
        b || (b = 0), typeof c == "undefined" && (c = a ? a.length : 0);
        var d = -1;
        c = c - b || 0;
        for (var e = Array(0 > c ? 0 : c); ++d < c; ) e[d] = a[b + d];
        return e;
    }
    function n(d) {
        function s(a) {
            if (!a || nc.call(a) != T) return r;
            var b = a.valueOf, c = typeof b == "function" && (c = ic(b)) && ic(c);
            return c ? a == c || ic(a) == c : hb(a);
        }
        function t(a, b, c) {
            if (!a || !X[typeof a]) return a;
            b = b && typeof c == "undefined" ? b : bb.createCallback(b, c);
            for (var d = -1, e = X[typeof a] && Cc(a), f = e ? e.length : 0; ++d < f && (c = e[d], 
            !(b(a[c], c, a) === false)); ) ;
            return a;
        }
        function y(a, b, c) {
            var d;
            if (!a || !X[typeof a]) return a;
            b = b && typeof c == "undefined" ? b : bb.createCallback(b, c);
            for (d in a) if (b(a[d], d, a) === false) break;
            return a;
        }
        function Y(a, b, c) {
            var d, e = a, f = e;
            if (!e) return f;
            for (var g = arguments, h = 0, i = typeof c == "number" ? 2 : g.length; ++h < i; ) if ((e = g[h]) && X[typeof e]) for (var j = -1, k = X[typeof e] && Cc(e), l = k ? k.length : 0; ++j < l; ) d = k[j], 
            "undefined" == typeof f[d] && (f[d] = e[d]);
            return f;
        }
        function Z(a, b, c) {
            var d, e = a, f = e;
            if (!e) return f;
            var g = arguments, h = 0, i = typeof c == "number" ? 2 : g.length;
            if (3 < i && "function" == typeof g[i - 2]) var j = bb.createCallback(g[--i - 1], g[i--], 2); else 2 < i && "function" == typeof g[i - 1] && (j = g[--i]);
            for (;++h < i; ) if ((e = g[h]) && X[typeof e]) for (var k = -1, l = X[typeof e] && Cc(e), m = l ? l.length : 0; ++k < m; ) d = l[k], 
            f[d] = j ? j(f[d], e[d]) : e[d];
            return f;
        }
        function _(a) {
            var b, c = [];
            if (!a || !X[typeof a]) return c;
            for (b in a) jc.call(a, b) && c.push(b);
            return c;
        }
        function bb(a) {
            return a && typeof a == "object" && !Bc(a) && jc.call(a, "__wrapped__") ? a : new cb(a);
        }
        function cb(a) {
            this.__wrapped__ = a;
        }
        function db(a, b, c, d) {
            function e() {
                var d = arguments, j = g ? this : b;
                return f || (a = b[h]), c.length && (d = d.length ? (d = yc.call(d), i ? d.concat(c) : c.concat(d)) : c), 
                this instanceof e ? (j = ob(a.prototype) ? pc(a.prototype) : {}, d = a.apply(j, d), 
                ob(d) ? d : j) : a.apply(j, d);
            }
            var f = nb(a), g = !c, h = b;
            if (g) {
                var i = d;
                c = b;
            } else if (!f) {
                if (!d) throw new $b();
                b = a;
            }
            return e;
        }
        function eb(a) {
            return Dc[a];
        }
        function fb() {
            var a = (a = bb.indexOf) === Gb ? b : a;
            return a;
        }
        function gb(a) {
            return function(b, c, d, e) {
                return typeof c != "boolean" && c != q && (e = d, d = e && e[c] === b ? o : c, c = r), 
                d != q && (d = bb.createCallback(d, e)), a(b, c, d, e);
            };
        }
        function hb(a) {
            var b, c;
            return a && nc.call(a) == T && (b = a.constructor, !nb(b) || b instanceof b) ? (y(a, function(a, b) {
                c = b;
            }), c === o || jc.call(a, c)) : r;
        }
        function ib(a) {
            return Ec[a];
        }
        function jb(a, b, c, d, e, f) {
            var g = a;
            if (typeof b != "boolean" && b != q && (d = c, c = b, b = r), typeof c == "function") {
                if (c = typeof d == "undefined" ? c : bb.createCallback(c, d, 1), g = c(g), typeof g != "undefined") return g;
                g = a;
            }
            if (d = ob(g)) {
                var h = nc.call(g);
                if (!W[h]) return g;
                var j = Bc(g);
            }
            if (!d || !b) return d ? j ? m(g) : Z({}, g) : g;
            switch (d = zc[h], h) {
              case P:
              case Q:
                return new d(+g);

              case S:
              case V:
                return new d(g);

              case U:
                return d(g.source, E.exec(g));
            }
            h = !e, e || (e = i()), f || (f = i());
            for (var l = e.length; l--; ) if (e[l] == a) return f[l];
            return g = j ? d(g.length) : {}, j && (jc.call(a, "index") && (g.index = a.index), 
            jc.call(a, "input") && (g.input = a.input)), e.push(a), f.push(g), (j ? xb : t)(a, function(a, d) {
                g[d] = jb(a, b, c, o, e, f);
            }), h && (k(e), k(f)), g;
        }
        function kb(a) {
            var b = [];
            return y(a, function(a, c) {
                nb(a) && b.push(c);
            }), b.sort();
        }
        function lb(a) {
            for (var b = -1, c = Cc(a), d = c.length, e = {}; ++b < d; ) {
                var f = c[b];
                e[a[f]] = f;
            }
            return e;
        }
        function mb(a, b, c, d, e, f) {
            var g = c === v;
            if (typeof c == "function" && !g) {
                c = bb.createCallback(c, d, 2);
                var h = c(a, b);
                if (typeof h != "undefined") return !!h;
            }
            if (a === b) return 0 !== a || 1 / a == 1 / b;
            var j = typeof a, l = typeof b;
            if (a === a && (!a || "function" != j && "object" != j) && (!b || "function" != l && "object" != l)) return r;
            if (a == q || b == q) return a === b;
            if (l = nc.call(a), j = nc.call(b), l == N && (l = T), j == N && (j = T), l != j) return r;
            switch (l) {
              case P:
              case Q:
                return +a == +b;

              case S:
                return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;

              case U:
              case V:
                return a == Zb(b);
            }
            if (j = l == O, !j) {
                if (jc.call(a, "__wrapped__") || jc.call(b, "__wrapped__")) return mb(a.__wrapped__ || a, b.__wrapped__ || b, c, d, e, f);
                if (l != T) return r;
                var l = a.constructor, m = b.constructor;
                if (l != m && (!nb(l) || !(l instanceof l && nb(m) && m instanceof m))) return r;
            }
            for (m = !e, e || (e = i()), f || (f = i()), l = e.length; l--; ) if (e[l] == a) return f[l] == b;
            var n = 0, h = p;
            if (e.push(a), f.push(b), j) {
                if (l = a.length, n = b.length, h = n == a.length, !h && !g) return h;
                for (;n--; ) if (j = l, m = b[n], g) for (;j-- && !(h = mb(a[j], m, c, d, e, f)); ) ; else if (!(h = mb(a[n], m, c, d, e, f))) break;
                return h;
            }
            return y(b, function(b, g, i) {
                return jc.call(i, g) ? (n++, h = jc.call(a, g) && mb(a[g], b, c, d, e, f)) : void 0;
            }), h && !g && y(a, function(a, b, c) {
                return jc.call(c, b) ? h = -1 < --n : void 0;
            }), m && (k(e), k(f)), h;
        }
        function nb(a) {
            return typeof a == "function";
        }
        function ob(a) {
            return !(!a || !X[typeof a]);
        }
        function pb(a) {
            return typeof a == "number" || nc.call(a) == S;
        }
        function qb(a) {
            return typeof a == "string" || nc.call(a) == V;
        }
        function rb(a, b, c) {
            var d = arguments, e = 0, f = 2;
            if (!ob(a)) return a;
            if (c === v) var g = d[3], h = d[4], j = d[5]; else {
                var l = p, h = i(), j = i();
                typeof c != "number" && (f = d.length), 3 < f && "function" == typeof d[f - 2] ? g = bb.createCallback(d[--f - 1], d[f--], 2) : 2 < f && "function" == typeof d[f - 1] && (g = d[--f]);
            }
            for (;++e < f; ) (Bc(d[e]) ? xb : t)(d[e], function(b, c) {
                var d, e, f = b, i = a[c];
                if (b && ((e = Bc(b)) || s(b))) {
                    for (f = h.length; f--; ) if (d = h[f] == b) {
                        i = j[f];
                        break;
                    }
                    if (!d) {
                        var k;
                        g && (f = g(i, b), k = typeof f != "undefined") && (i = f), k || (i = e ? Bc(i) ? i : [] : s(i) ? i : {}), 
                        h.push(b), j.push(i), k || (i = rb(i, b, v, g, h, j));
                    }
                } else g && (f = g(i, b), typeof f == "undefined" && (f = b)), typeof f != "undefined" && (i = f);
                a[c] = i;
            });
            return l && (k(h), k(j)), a;
        }
        function sb(a) {
            for (var b = -1, c = Cc(a), d = c.length, e = Rb(d); ++b < d; ) e[b] = a[c[b]];
            return e;
        }
        function tb(a, b, c) {
            var d = -1, e = fb(), f = a ? a.length : 0, g = r;
            return c = (0 > c ? uc(0, f + c) : c) || 0, f && typeof f == "number" ? g = -1 < (qb(a) ? a.indexOf(b, c) : e(a, b, c)) : t(a, function(a) {
                return ++d < c ? void 0 : !(g = a === b);
            }), g;
        }
        function ub(a, b, c) {
            var d = p;
            b = bb.createCallback(b, c), c = -1;
            var e = a ? a.length : 0;
            if (typeof e == "number") for (;++c < e && (d = !!b(a[c], c, a)); ) ; else t(a, function(a, c, e) {
                return d = !!b(a, c, e);
            });
            return d;
        }
        function vb(a, b, c) {
            var d = [];
            b = bb.createCallback(b, c), c = -1;
            var e = a ? a.length : 0;
            if (typeof e == "number") for (;++c < e; ) {
                var f = a[c];
                b(f, c, a) && d.push(f);
            } else t(a, function(a, c, e) {
                b(a, c, e) && d.push(a);
            });
            return d;
        }
        function wb(a, b, c) {
            b = bb.createCallback(b, c), c = -1;
            var d = a ? a.length : 0;
            if (typeof d != "number") {
                var e;
                return t(a, function(a, c, d) {
                    return b(a, c, d) ? (e = a, r) : void 0;
                }), e;
            }
            for (;++c < d; ) {
                var f = a[c];
                if (b(f, c, a)) return f;
            }
        }
        function xb(a, b, c) {
            var d = -1, e = a ? a.length : 0;
            if (b = b && typeof c == "undefined" ? b : bb.createCallback(b, c), typeof e == "number") for (;++d < e && b(a[d], d, a) !== false; ) ; else t(a, b);
            return a;
        }
        function yb(a, b, c) {
            var d = -1, e = a ? a.length : 0;
            if (b = bb.createCallback(b, c), typeof e == "number") for (var f = Rb(e); ++d < e; ) f[d] = b(a[d], d, a); else f = [], 
            t(a, function(a, c, e) {
                f[++d] = b(a, c, e);
            });
            return f;
        }
        function zb(a, b, c) {
            var d = -1 / 0, f = d;
            if (!b && Bc(a)) {
                c = -1;
                for (var g = a.length; ++c < g; ) {
                    var h = a[c];
                    h > f && (f = h);
                }
            } else b = !b && qb(a) ? e : bb.createCallback(b, c), xb(a, function(a, c, e) {
                c = b(a, c, e), c > d && (d = c, f = a);
            });
            return f;
        }
        function Ab(a, b) {
            var c = -1, d = a ? a.length : 0;
            if (typeof d == "number") for (var e = Rb(d); ++c < d; ) e[c] = a[c][b];
            return e || yb(a, b);
        }
        function Bb(a, b, c, d) {
            if (!a) return c;
            var e = 3 > arguments.length;
            b = bb.createCallback(b, d, 4);
            var f = -1, g = a.length;
            if (typeof g == "number") for (e && (c = a[++f]); ++f < g; ) c = b(c, a[f], f, a); else t(a, function(a, d, f) {
                c = e ? (e = r, a) : b(c, a, d, f);
            });
            return c;
        }
        function Cb(a, b, c, d) {
            var e = a ? a.length : 0, f = 3 > arguments.length;
            if (typeof e != "number") var g = Cc(a), e = g.length;
            return b = bb.createCallback(b, d, 4), xb(a, function(d, h, i) {
                h = g ? g[--e] : --e, c = f ? (f = r, a[h]) : b(c, a[h], h, i);
            }), c;
        }
        function Db(a, b, c) {
            var d;
            b = bb.createCallback(b, c), c = -1;
            var e = a ? a.length : 0;
            if (typeof e == "number") for (;++c < e && !(d = b(a[c], c, a)); ) ; else t(a, function(a, c, e) {
                return !(d = b(a, c, e));
            });
            return !!d;
        }
        function Eb(a) {
            var d = -1, e = fb(), f = a ? a.length : 0, h = fc.apply(_b, yc.call(arguments, 1)), i = [], j = f >= x && e === b;
            if (j) {
                var k = g(h);
                k ? (e = c, h = k) : j = r;
            }
            for (;++d < f; ) k = a[d], 0 > e(h, k) && i.push(k);
            return j && l(h), i;
        }
        function Fb(a, b, c) {
            if (a) {
                var d = 0, e = a.length;
                if (typeof b != "number" && b != q) {
                    var f = -1;
                    for (b = bb.createCallback(b, c); ++f < e && b(a[f], f, a); ) d++;
                } else if (d = b, d == q || c) return a[0];
                return m(a, 0, vc(uc(0, d), e));
            }
        }
        function Gb(a, c, d) {
            if (typeof d == "number") {
                var e = a ? a.length : 0;
                d = 0 > d ? uc(0, e + d) : d || 0;
            } else if (d) return d = Ib(a, c), a[d] === c ? d : -1;
            return a ? b(a, c, d) : -1;
        }
        function Hb(a, b, c) {
            if (typeof b != "number" && b != q) {
                var d = 0, e = -1, f = a ? a.length : 0;
                for (b = bb.createCallback(b, c); ++e < f && b(a[e], e, a); ) d++;
            } else d = b == q || c ? 1 : uc(0, b);
            return m(a, d);
        }
        function Ib(a, b, c, d) {
            var e = 0, f = a ? a.length : e;
            for (c = c ? bb.createCallback(c, d, 1) : Ob, b = c(b); e < f; ) d = e + f >>> 1, 
            c(a[d]) < b ? e = d + 1 : f = d;
            return e;
        }
        function Jb(a) {
            for (var b = -1, c = a ? zb(Ab(a, "length")) : 0, d = Rb(0 > c ? 0 : c); ++b < c; ) d[b] = Ab(a, b);
            return d;
        }
        function Kb(a, b) {
            for (var c = -1, d = a ? a.length : 0, e = {}; ++c < d; ) {
                var f = a[c];
                b ? e[f] = b[c] : e[f[0]] = f[1];
            }
            return e;
        }
        function Lb(a, b) {
            return Ac.fastBind || oc && 2 < arguments.length ? oc.call.apply(oc, arguments) : db(a, b, yc.call(arguments, 2));
        }
        function Mb(a, b, c) {
            function d() {
                ec(m), ec(n), j = 0, m = n = q;
            }
            function e() {
                var b = o && (!s || 1 < j);
                d(), b && (l !== false && (k = new Tb()), h = a.apply(i, g));
            }
            function f() {
                d(), (o || l !== b) && (k = new Tb(), h = a.apply(i, g));
            }
            var g, h, i, j = 0, k = 0, l = r, m = q, n = q, o = p;
            if (b = uc(0, b || 0), c === p) var s = p, o = r; else ob(c) && (s = c.leading, 
            l = "maxWait" in c && uc(b, c.maxWait || 0), o = "trailing" in c ? c.trailing : o);
            return function() {
                if (g = arguments, i = this, j++, ec(n), l === false) s && 2 > j && (h = a.apply(i, g)); else {
                    var c = new Tb();
                    !m && !s && (k = c);
                    var d = l - (c - k);
                    0 < d ? m || (m = mc(f, d)) : (ec(m), m = q, k = c, h = a.apply(i, g));
                }
                return b !== l && (n = mc(e, b)), h;
            };
        }
        function Nb(a) {
            var b = yc.call(arguments, 1);
            return mc(function() {
                a.apply(o, b);
            }, 1);
        }
        function Ob(a) {
            return a;
        }
        function Pb(a) {
            xb(kb(a), function(b) {
                var c = bb[b] = a[b];
                bb.prototype[b] = function() {
                    var a = this.__wrapped__, b = [ a ];
                    return kc.apply(b, arguments), b = c.apply(bb, b), a && typeof a == "object" && a === b ? this : new cb(b);
                };
            });
        }
        function Qb() {
            return this.__wrapped__;
        }
        d = d ? ab.defaults(a.Object(), d, ab.pick(a, M)) : a;
        var Rb = d.Array, Sb = d.Boolean, Tb = d.Date, Ub = d.Function, Vb = d.Math, Wb = d.Number, Xb = d.Object, Yb = d.RegExp, Zb = d.String, $b = d.TypeError, _b = [], ac = Xb.prototype, bc = d._, cc = Yb("^" + Zb(ac.valueOf).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/valueOf|for [^\]]+/g, ".+?") + "$"), dc = Vb.ceil, ec = d.clearTimeout, fc = _b.concat, gc = Vb.floor, hc = Ub.prototype.toString, ic = cc.test(ic = Xb.getPrototypeOf) && ic, jc = ac.hasOwnProperty, kc = _b.push, lc = d.setImmediate, mc = d.setTimeout, nc = ac.toString, oc = cc.test(oc = nc.bind) && oc, pc = cc.test(pc = Xb.create) && pc, qc = cc.test(qc = Rb.isArray) && qc, rc = d.isFinite, sc = d.isNaN, tc = cc.test(tc = Xb.keys) && tc, uc = Vb.max, vc = Vb.min, wc = d.parseInt, xc = Vb.random, yc = _b.slice, Vb = cc.test(d.attachEvent), Vb = oc && !/\n|true/.test(oc + Vb), zc = {};
        zc[O] = Rb, zc[P] = Sb, zc[Q] = Tb, zc[R] = Ub, zc[T] = Xb, zc[S] = Wb, zc[U] = Yb, 
        zc[V] = Zb, cb.prototype = bb.prototype;
        var Ac = bb.support = {};
        Ac.fastBind = oc && !Vb, bb.templateSettings = {
            escape: /<%-([\s\S]+?)%>/g,
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: F,
            variable: "",
            imports: {
                _: bb
            }
        };
        var Bc = qc, Cc = tc ? function(a) {
            return ob(a) ? tc(a) : [];
        } : _, Dc = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }, Ec = lb(Dc), Sb = gb(function Gc(a, b, c) {
            for (var d = -1, e = a ? a.length : 0, f = []; ++d < e; ) {
                var g = a[d];
                c && (g = c(g, d, a)), Bc(g) ? kc.apply(f, b ? g : Gc(g)) : f.push(g);
            }
            return f;
        }), Fc = gb(function(a, d, e) {
            var f = -1, h = fb(), j = a ? a.length : 0, m = [], n = !d && j >= x && h === b, o = e || n ? i() : m;
            if (n) {
                var p = g(o);
                p ? (h = c, o = p) : (n = r, o = e ? o : (k(o), m));
            }
            for (;++f < j; ) {
                var p = a[f], q = e ? e(p, f, a) : p;
                (d ? !f || o[o.length - 1] !== q : 0 > h(o, q)) && ((e || n) && o.push(q), m.push(p));
            }
            return n ? (k(o.b), l(o)) : e && k(o), m;
        });
        return Vb && $ && typeof lc == "function" && (Nb = Lb(lc, d)), lc = 8 == wc(H + "08") ? wc : function(a, b) {
            return wc(qb(a) ? a.replace(I, "") : a, b || 0);
        }, bb.after = function(a, b) {
            return 1 > a ? b() : function() {
                return 1 > --a ? b.apply(this, arguments) : void 0;
            };
        }, bb.assign = Z, bb.at = function(a) {
            for (var b = -1, c = fc.apply(_b, yc.call(arguments, 1)), d = c.length, e = Rb(d); ++b < d; ) e[b] = a[c[b]];
            return e;
        }, bb.bind = Lb, bb.bindAll = function(a) {
            for (var b = 1 < arguments.length ? fc.apply(_b, yc.call(arguments, 1)) : kb(a), c = -1, d = b.length; ++c < d; ) {
                var e = b[c];
                a[e] = Lb(a[e], a);
            }
            return a;
        }, bb.bindKey = function(a, b) {
            return db(a, b, yc.call(arguments, 2), v);
        }, bb.compact = function(a) {
            for (var b = -1, c = a ? a.length : 0, d = []; ++b < c; ) {
                var e = a[b];
                e && d.push(e);
            }
            return d;
        }, bb.compose = function() {
            var a = arguments;
            return function() {
                for (var b = arguments, c = a.length; c--; ) b = [ a[c].apply(this, b) ];
                return b[0];
            };
        }, bb.countBy = function(a, b, c) {
            var d = {};
            return b = bb.createCallback(b, c), xb(a, function(a, c, e) {
                c = Zb(b(a, c, e)), jc.call(d, c) ? d[c]++ : d[c] = 1;
            }), d;
        }, bb.createCallback = function(a, b, c) {
            if (a == q) return Ob;
            var d = typeof a;
            if ("function" != d) {
                if ("object" != d) return function(b) {
                    return b[a];
                };
                var e = Cc(a);
                return function(b) {
                    for (var c = e.length, d = r; c-- && (d = mb(b[e[c]], a[e[c]], v)); ) ;
                    return d;
                };
            }
            return typeof b == "undefined" || G && !G.test(hc.call(a)) ? a : 1 === c ? function(c) {
                return a.call(b, c);
            } : 2 === c ? function(c, d) {
                return a.call(b, c, d);
            } : 4 === c ? function(c, d, e, f) {
                return a.call(b, c, d, e, f);
            } : function(c, d, e) {
                return a.call(b, c, d, e);
            };
        }, bb.debounce = Mb, bb.defaults = Y, bb.defer = Nb, bb.delay = function(a, b) {
            var c = yc.call(arguments, 2);
            return mc(function() {
                a.apply(o, c);
            }, b);
        }, bb.difference = Eb, bb.filter = vb, bb.flatten = Sb, bb.forEach = xb, bb.forIn = y, 
        bb.forOwn = t, bb.functions = kb, bb.groupBy = function(a, b, c) {
            var d = {};
            return b = bb.createCallback(b, c), xb(a, function(a, c, e) {
                c = Zb(b(a, c, e)), (jc.call(d, c) ? d[c] : d[c] = []).push(a);
            }), d;
        }, bb.initial = function(a, b, c) {
            if (!a) return [];
            var d = 0, e = a.length;
            if (typeof b != "number" && b != q) {
                var f = e;
                for (b = bb.createCallback(b, c); f-- && b(a[f], f, a); ) d++;
            } else d = b == q || c ? 1 : b || d;
            return m(a, 0, vc(uc(0, e - d), e));
        }, bb.intersection = function(a) {
            for (var d = arguments, e = d.length, f = -1, h = i(), j = -1, m = fb(), n = a ? a.length : 0, o = [], p = i(); ++f < e; ) {
                var q = d[f];
                h[f] = m === b && (q ? q.length : 0) >= x && g(f ? d[f] : p);
            }
            a: for (;++j < n; ) {
                var r = h[0], q = a[j];
                if (0 > (r ? c(r, q) : m(p, q))) {
                    for (f = e, (r || p).push(q); --f; ) if (r = h[f], 0 > (r ? c(r, q) : m(d[f], q))) continue a;
                    o.push(q);
                }
            }
            for (;e--; ) (r = h[e]) && l(r);
            return k(h), k(p), o;
        }, bb.invert = lb, bb.invoke = function(a, b) {
            var c = yc.call(arguments, 2), d = -1, e = typeof b == "function", f = a ? a.length : 0, g = Rb(typeof f == "number" ? f : 0);
            return xb(a, function(a) {
                g[++d] = (e ? b : a[b]).apply(a, c);
            }), g;
        }, bb.keys = Cc, bb.map = yb, bb.max = zb, bb.memoize = function(a, b) {
            function c() {
                var d = c.cache, e = w + (b ? b.apply(this, arguments) : arguments[0]);
                return jc.call(d, e) ? d[e] : d[e] = a.apply(this, arguments);
            }
            return c.cache = {}, c;
        }, bb.merge = rb, bb.min = function(a, b, c) {
            var d = 1 / 0, f = d;
            if (!b && Bc(a)) {
                c = -1;
                for (var g = a.length; ++c < g; ) {
                    var h = a[c];
                    h < f && (f = h);
                }
            } else b = !b && qb(a) ? e : bb.createCallback(b, c), xb(a, function(a, c, e) {
                c = b(a, c, e), c < d && (d = c, f = a);
            });
            return f;
        }, bb.omit = function(a, b, c) {
            var d = fb(), e = typeof b == "function", f = {};
            if (e) b = bb.createCallback(b, c); else var g = fc.apply(_b, yc.call(arguments, 1));
            return y(a, function(a, c, h) {
                (e ? !b(a, c, h) : 0 > d(g, c)) && (f[c] = a);
            }), f;
        }, bb.once = function(a) {
            var b, c;
            return function() {
                return b ? c : (b = p, c = a.apply(this, arguments), a = q, c);
            };
        }, bb.pairs = function(a) {
            for (var b = -1, c = Cc(a), d = c.length, e = Rb(d); ++b < d; ) {
                var f = c[b];
                e[b] = [ f, a[f] ];
            }
            return e;
        }, bb.partial = function(a) {
            return db(a, yc.call(arguments, 1));
        }, bb.partialRight = function(a) {
            return db(a, yc.call(arguments, 1), q, v);
        }, bb.pick = function(a, b, c) {
            var d = {};
            if (typeof b != "function") for (var e = -1, f = fc.apply(_b, yc.call(arguments, 1)), g = ob(a) ? f.length : 0; ++e < g; ) {
                var h = f[e];
                h in a && (d[h] = a[h]);
            } else b = bb.createCallback(b, c), y(a, function(a, c, e) {
                b(a, c, e) && (d[c] = a);
            });
            return d;
        }, bb.pluck = Ab, bb.range = function(a, b, c) {
            a = +a || 0, c = +c || 1, b == q && (b = a, a = 0);
            var d = -1;
            b = uc(0, dc((b - a) / c));
            for (var e = Rb(b); ++d < b; ) e[d] = a, a += c;
            return e;
        }, bb.reject = function(a, b, c) {
            return b = bb.createCallback(b, c), vb(a, function(a, c, d) {
                return !b(a, c, d);
            });
        }, bb.rest = Hb, bb.shuffle = function(a) {
            var b = -1, c = a ? a.length : 0, d = Rb(typeof c == "number" ? c : 0);
            return xb(a, function(a) {
                var c = gc(xc() * (++b + 1));
                d[b] = d[c], d[c] = a;
            }), d;
        }, bb.sortBy = function(a, b, c) {
            var d = -1, e = a ? a.length : 0, g = Rb(typeof e == "number" ? e : 0);
            for (b = bb.createCallback(b, c), xb(a, function(a, c, e) {
                var f = g[++d] = j();
                f.l = b(a, c, e), f.m = d, f.n = a;
            }), e = g.length, g.sort(f); e--; ) a = g[e], g[e] = a.n, l(a);
            return g;
        }, bb.tap = function(a, b) {
            return b(a), a;
        }, bb.throttle = function(a, b, c) {
            var d = p, e = p;
            return c === false ? d = r : ob(c) && (d = "leading" in c ? c.leading : d, e = "trailing" in c ? c.trailing : e), 
            c = j(), c.leading = d, c.maxWait = b, c.trailing = e, a = Mb(a, b, c), l(c), a;
        }, bb.times = function(a, b, c) {
            a = -1 < (a = +a) ? a : 0;
            var d = -1, e = Rb(a);
            for (b = bb.createCallback(b, c, 1); ++d < a; ) e[d] = b(d);
            return e;
        }, bb.toArray = function(a) {
            return a && typeof a.length == "number" ? m(a) : sb(a);
        }, bb.transform = function(a, b, c, d) {
            var e = Bc(a);
            return b = bb.createCallback(b, d, 4), c == q && (e ? c = [] : (d = a && a.constructor, 
            c = ob(d && d.prototype) ? pc(d && d.prototype) : {})), (e ? xb : t)(a, function(a, d, e) {
                return b(c, a, d, e);
            }), c;
        }, bb.union = function(a) {
            return Bc(a) || (arguments[0] = a ? yc.call(a) : _b), Fc(fc.apply(_b, arguments));
        }, bb.uniq = Fc, bb.unzip = Jb, bb.values = sb, bb.where = vb, bb.without = function(a) {
            return Eb(a, yc.call(arguments, 1));
        }, bb.wrap = function(a, b) {
            return function() {
                var c = [ a ];
                return kc.apply(c, arguments), b.apply(this, c);
            };
        }, bb.zip = function(a) {
            return a ? Jb(arguments) : [];
        }, bb.zipObject = Kb, bb.collect = yb, bb.drop = Hb, bb.each = xb, bb.extend = Z, 
        bb.methods = kb, bb.object = Kb, bb.select = vb, bb.tail = Hb, bb.unique = Fc, Pb(bb), 
        bb.chain = bb, bb.prototype.chain = function() {
            return this;
        }, bb.clone = jb, bb.cloneDeep = function(a, b, c) {
            return jb(a, p, b, c);
        }, bb.contains = tb, bb.escape = function(a) {
            return a == q ? "" : Zb(a).replace(K, eb);
        }, bb.every = ub, bb.find = wb, bb.findIndex = function(a, b, c) {
            var d = -1, e = a ? a.length : 0;
            for (b = bb.createCallback(b, c); ++d < e; ) if (b(a[d], d, a)) return d;
            return -1;
        }, bb.findKey = function(a, b, c) {
            var d;
            return b = bb.createCallback(b, c), t(a, function(a, c, e) {
                return b(a, c, e) ? (d = c, r) : void 0;
            }), d;
        }, bb.has = function(a, b) {
            return a ? jc.call(a, b) : r;
        }, bb.identity = Ob, bb.indexOf = Gb, bb.isArguments = function(a) {
            return nc.call(a) == N;
        }, bb.isArray = Bc, bb.isBoolean = function(a) {
            return a === p || a === false || nc.call(a) == P;
        }, bb.isDate = function(a) {
            return a ? typeof a == "object" && nc.call(a) == Q : r;
        }, bb.isElement = function(a) {
            return a ? 1 === a.nodeType : r;
        }, bb.isEmpty = function(a) {
            var b = p;
            if (!a) return b;
            var c = nc.call(a), d = a.length;
            return c == O || c == V || c == N || c == T && typeof d == "number" && nb(a.splice) ? !d : (t(a, function() {
                return b = r;
            }), b);
        }, bb.isEqual = mb, bb.isFinite = function(a) {
            return rc(a) && !sc(parseFloat(a));
        }, bb.isFunction = nb, bb.isNaN = function(a) {
            return pb(a) && a != +a;
        }, bb.isNull = function(a) {
            return a === q;
        }, bb.isNumber = pb, bb.isObject = ob, bb.isPlainObject = s, bb.isRegExp = function(a) {
            return a ? typeof a == "object" && nc.call(a) == U : r;
        }, bb.isString = qb, bb.isUndefined = function(a) {
            return typeof a == "undefined";
        }, bb.lastIndexOf = function(a, b, c) {
            var d = a ? a.length : 0;
            for (typeof c == "number" && (d = (0 > c ? uc(0, d + c) : vc(c, d - 1)) + 1); d--; ) if (a[d] === b) return d;
            return -1;
        }, bb.mixin = Pb, bb.noConflict = function() {
            return d._ = bc, this;
        }, bb.parseInt = lc, bb.random = function(a, b) {
            a == q && b == q && (b = 1), a = +a || 0, b == q ? (b = a, a = 0) : b = +b || 0;
            var c = xc();
            return a % 1 || b % 1 ? a + vc(c * (b - a + parseFloat("1e-" + ((c + "").length - 1))), b) : a + gc(c * (b - a + 1));
        }, bb.reduce = Bb, bb.reduceRight = Cb, bb.result = function(a, b) {
            var c = a ? a[b] : o;
            return nb(c) ? a[b]() : c;
        }, bb.runInContext = n, bb.size = function(a) {
            var b = a ? a.length : 0;
            return typeof b == "number" ? b : Cc(a).length;
        }, bb.some = Db, bb.sortedIndex = Ib, bb.template = function(a, b, c) {
            var d = bb.templateSettings;
            a || (a = ""), c = Y({}, c, d);
            var e, f = Y({}, c.imports, d.imports), d = Cc(f), f = sb(f), g = 0, i = c.interpolate || J, j = "__p+='", i = Yb((c.escape || J).source + "|" + i.source + "|" + (i === F ? D : J).source + "|" + (c.evaluate || J).source + "|$", "g");
            a.replace(i, function(b, c, d, f, i, k) {
                return d || (d = f), j += a.slice(g, k).replace(L, h), c && (j += "'+__e(" + c + ")+'"), 
                i && (e = p, j += "';" + i + ";__p+='"), d && (j += "'+((__t=(" + d + "))==null?'':__t)+'"), 
                g = k + b.length, b;
            }), j += "';\n", i = c = c.variable, i || (c = "obj", j = "with(" + c + "){" + j + "}"), 
            j = (e ? j.replace(z, "") : j).replace(A, "$1").replace(B, "$1;"), j = "function(" + c + "){" + (i ? "" : c + "||(" + c + "={});") + "var __t,__p='',__e=_.escape" + (e ? ",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}" : ";") + j + "return __p}";
            try {
                var k = Ub(d, "return " + j).apply(o, f);
            } catch (l) {
                throw l.source = j, l;
            }
            return b ? k(b) : (k.source = j, k);
        }, bb.unescape = function(a) {
            return a == q ? "" : Zb(a).replace(C, ib);
        }, bb.uniqueId = function(a) {
            var b = ++u;
            return Zb(a == q ? "" : a) + b;
        }, bb.all = ub, bb.any = Db, bb.detect = wb, bb.findWhere = wb, bb.foldl = Bb, bb.foldr = Cb, 
        bb.include = tb, bb.inject = Bb, t(bb, function(a, b) {
            bb.prototype[b] || (bb.prototype[b] = function() {
                var b = [ this.__wrapped__ ];
                return kc.apply(b, arguments), a.apply(bb, b);
            });
        }), bb.first = Fb, bb.last = function(a, b, c) {
            if (a) {
                var d = 0, e = a.length;
                if (typeof b != "number" && b != q) {
                    var f = e;
                    for (b = bb.createCallback(b, c); f-- && b(a[f], f, a); ) d++;
                } else if (d = b, d == q || c) return a[e - 1];
                return m(a, uc(0, e - d));
            }
        }, bb.take = Fb, bb.head = Fb, t(bb, function(a, b) {
            bb.prototype[b] || (bb.prototype[b] = function(b, c) {
                var d = a(this.__wrapped__, b, c);
                return b == q || c && typeof b != "function" ? d : new cb(d);
            });
        }), bb.VERSION = "1.3.1", bb.prototype.toString = function() {
            return Zb(this.__wrapped__);
        }, bb.prototype.value = Qb, bb.prototype.valueOf = Qb, xb([ "join", "pop", "shift" ], function(a) {
            var b = _b[a];
            bb.prototype[a] = function() {
                return b.apply(this.__wrapped__, arguments);
            };
        }), xb([ "push", "reverse", "sort", "unshift" ], function(a) {
            var b = _b[a];
            bb.prototype[a] = function() {
                return b.apply(this.__wrapped__, arguments), this;
            };
        }), xb([ "concat", "slice", "splice" ], function(a) {
            var b = _b[a];
            bb.prototype[a] = function() {
                return new cb(b.apply(this.__wrapped__, arguments));
            };
        }), bb;
    }
    var o, p = !0, q = null, r = !1, s = [], t = [], u = 0, v = {}, w = +new Date() + "", x = 75, y = 40, z = /\b__p\+='';/g, A = /\b(__p\+=)''\+/g, B = /(__e\(.*?\)|\b__t\))\+'';/g, C = /&(?:amp|lt|gt|quot|#39);/g, D = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, E = /\w*$/, F = /<%=([\s\S]+?)%>/g, G = (G = /\bthis\b/) && G.test(n) && G, H = " 	\f ﻿\n\r\u2028\u2029 ᠎             　", I = RegExp("^[" + H + "]*0+(?=.$)"), J = /($^)/, K = /[&<>"']/g, L = /['\n\r\t\u2028\u2029\\]/g, M = "Array Boolean Date Function Math Number Object RegExp String _ attachEvent clearTimeout isFinite isNaN parseInt setImmediate setTimeout".split(" "), N = "[object Arguments]", O = "[object Array]", P = "[object Boolean]", Q = "[object Date]", R = "[object Function]", S = "[object Number]", T = "[object Object]", U = "[object RegExp]", V = "[object String]", W = {};
    W[R] = r, W[N] = W[O] = W[P] = W[Q] = W[S] = W[T] = W[U] = W[V] = p;
    var X = {
        "boolean": r,
        "function": p,
        object: p,
        number: r,
        string: r,
        undefined: r
    }, Y = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "	": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, Z = X[typeof exports] && exports, $ = X[typeof module] && module && module.exports == Z && module, _ = X[typeof global] && global;
    !_ || _.global !== _ && _.window !== _ || (a = _);
    var ab = n();
    typeof define == "function" && typeof define.amd == "object" && define.amd ? (a._ = ab, 
    define(function() {
        return ab;
    })) : Z && !Z.nodeType ? $ ? ($.exports = ab)._ = ab : Z._ = ab : a._ = ab;
}(this);

var responsiveNav = function(a, b) {
    var c = !!a.getComputedStyle;
    a.getComputedStyle || (a.getComputedStyle = function(a) {
        this.el = a;
        this.getPropertyValue = function(b) {
            var c = /(\-([a-z]){1})/g;
            "float" === b && (b = "styleFloat");
            c.test(b) && (b = b.replace(c, function(a, b, c) {
                return c.toUpperCase();
            }));
            return a.currentStyle[b] ? a.currentStyle[b] : null;
        };
        return this;
    });
    var d, e, f, g = b.documentElement, h = b.getElementsByTagName("head")[0], i = b.createElement("style"), j = !1, k = function(a, b, c, d) {
        if ("addEventListener" in a) try {
            a.addEventListener(b, c, d);
        } catch (e) {
            if ("object" === typeof c && c.handleEvent) a.addEventListener(b, function(a) {
                c.handleEvent.call(c, a);
            }, d); else throw e;
        } else "attachEvent" in a && ("object" === typeof c && c.handleEvent ? a.attachEvent("on" + b, function() {
            c.handleEvent.call(c);
        }) : a.attachEvent("on" + b, c));
    }, l = function(a, b, c, d) {
        if ("removeEventListener" in a) try {
            a.removeEventListener(b, c, d);
        } catch (e) {
            if ("object" === typeof c && c.handleEvent) a.removeEventListener(b, function(a) {
                c.handleEvent.call(c, a);
            }, d); else throw e;
        } else "detachEvent" in a && ("object" === typeof c && c.handleEvent ? a.detachEvent("on" + b, function() {
            c.handleEvent.call(c);
        }) : a.detachEvent("on" + b, c));
    }, m = function(a, b) {
        for (var c in b) a.setAttribute(c, b[c]);
    }, n = function(a, b) {
        a.className += " " + b;
        a.className = a.className.replace(/(^\s*)|(\s*$)/g, "");
    }, o = function(a, b) {
        a.className = a.className.replace(RegExp("(\\s|^)" + b + "(\\s|$)"), " ").replace(/(^\s*)|(\s*$)/g, "");
    }, p = function(a, c) {
        var f;
        this.options = {
            animate: !0,
            transition: 400,
            label: "Menu",
            insert: "after",
            customToggle: "",
            openPos: "relative",
            jsClass: "js",
            init: function() {},
            open: function() {},
            close: function() {}
        };
        for (f in c) this.options[f] = c[f];
        n(g, this.options.jsClass);
        this.wrapperEl = a.replace("#", "");
        if (b.getElementById(this.wrapperEl)) this.wrapper = b.getElementById(this.wrapperEl); else throw Error("The nav element you are trying to select doesn't exist");
        f = this.wrapper;
        for (var h = this.wrapper.firstChild; null !== h && 1 !== h.nodeType; ) h = h.nextSibling;
        f.inner = h;
        e = this.options;
        d = this.wrapper;
        this._init(this);
    };
    p.prototype = {
        destroy: function() {
            this._removeStyles();
            o(d, "closed");
            o(d, "opened");
            d.removeAttribute("style");
            d.removeAttribute("aria-hidden");
            q = d = null;
            l(a, "load", this, !1);
            l(a, "resize", this, !1);
            l(f, "mousedown", this, !1);
            l(f, "touchstart", this, !1);
            l(f, "touchend", this, !1);
            l(f, "keyup", this, !1);
            l(f, "click", this, !1);
            e.customToggle ? f.removeAttribute("aria-hidden") : f.parentNode.removeChild(f);
        },
        toggle: function() {
            j ? (o(d, "opened"), n(d, "closed"), m(d, {
                "aria-hidden": "true"
            }), e.animate ? setTimeout(function() {
                d.style.position = "absolute";
            }, e.transition + 10) : d.style.position = "absolute", j = !1, e.close()) : (o(d, "closed"), 
            n(d, "opened"), d.style.position = e.openPos, m(d, {
                "aria-hidden": "false"
            }), j = !0, e.open());
        },
        handleEvent: function(b) {
            b = b || a.event;
            switch (b.type) {
              case "mousedown":
                this._onmousedown(b);
                break;

              case "touchstart":
                this._ontouchstart(b);
                break;

              case "touchend":
                this._ontouchend(b);
                break;

              case "keyup":
                this._onkeyup(b);
                break;

              case "click":
                this._onclick(b);
                break;

              case "load":
                this._transitions(b);
                this._resize(b);
                break;

              case "resize":
                this._resize(b);
            }
        },
        _init: function() {
            n(d, "closed");
            this._createToggle();
            k(a, "load", this, !1);
            k(a, "resize", this, !1);
            k(f, "mousedown", this, !1);
            k(f, "touchstart", this, !1);
            k(f, "touchend", this, !1);
            k(f, "keyup", this, !1);
            k(f, "click", this, !1);
        },
        _createStyles: function() {
            i.parentNode || h.appendChild(i);
        },
        _removeStyles: function() {
            i.parentNode && i.parentNode.removeChild(i);
        },
        _createToggle: function() {
            if (e.customToggle) {
                var a = e.customToggle.replace("#", "");
                if (b.getElementById(a)) f = b.getElementById(a); else throw Error("The custom nav toggle you are trying to select doesn't exist");
            } else a = b.createElement("a"), a.innerHTML = e.label, m(a, {
                href: "#",
                id: "nav-toggle"
            }), "after" === e.insert ? d.parentNode.insertBefore(a, d.nextSibling) : d.parentNode.insertBefore(a, d), 
            f = b.getElementById("nav-toggle");
        },
        _preventDefault: function(a) {
            a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : a.returnValue = !1;
        },
        _onmousedown: function(b) {
            var c = b || a.event;
            3 === c.which || 2 === c.button || (this._preventDefault(b), this.toggle(b));
        },
        _ontouchstart: function(a) {
            f.onmousedown = null;
            this._preventDefault(a);
            this.toggle(a);
        },
        _ontouchend: function() {
            var a = this;
            d.addEventListener("click", a._preventDefault, !0);
            setTimeout(function() {
                d.removeEventListener("click", a._preventDefault, !0);
            }, e.transition);
        },
        _onkeyup: function(b) {
            13 === (b || a.event).keyCode && this.toggle(b);
        },
        _onclick: function(a) {
            this._preventDefault(a);
        },
        _transitions: function() {
            if (e.animate) {
                var a = d.style, b = "max-height " + e.transition + "ms";
                a.WebkitTransition = b;
                a.MozTransition = b;
                a.OTransition = b;
                a.transition = b;
            }
        },
        _calcHeight: function() {
            var a = "#" + this.wrapperEl + ".opened{max-height:" + d.inner.offsetHeight + "px}";
            c && (i.innerHTML = a);
        },
        _resize: function() {
            "none" !== a.getComputedStyle(f, null).getPropertyValue("display") ? (m(f, {
                "aria-hidden": "false"
            }), d.className.match(/(^|\s)closed(\s|$)/) && (m(d, {
                "aria-hidden": "true"
            }), d.style.position = "absolute"), this._createStyles(), this._calcHeight()) : (m(f, {
                "aria-hidden": "true"
            }), m(d, {
                "aria-hidden": "false"
            }), d.style.position = e.openPos, this._removeStyles());
            e.init();
        }
    };
    var q;
    return function(a, b) {
        q || (q = new p(a, b));
        return q;
    };
}(window, document);

(function(a) {
    a.tooltipsy = function(b, c) {
        this.options = c;
        this.$el = a(b);
        this.title = this.$el.attr("title") || "";
        this.$el.attr("title", "");
        this.random = parseInt(Math.random() * 1e4);
        this.ready = false;
        this.shown = false;
        this.width = 0;
        this.height = 0;
        this.delaytimer = null;
        this.$el.data("tooltipsy", this);
        this.init();
    };
    a.tooltipsy.prototype = {
        init: function() {
            var b = this, c, d = b.$el, e = d[0];
            b.settings = c = a.extend({}, b.defaults, b.options);
            c.delay = +c.delay;
            if (typeof c.content === "function") {
                b.readify();
            }
            if (c.showEvent === c.hideEvent && c.showEvent === "click") {
                d.toggle(function(a) {
                    if (c.showEvent === "click" && e.tagName == "A") {
                        a.preventDefault();
                    }
                    if (c.delay > 0) {
                        b.delaytimer = window.setTimeout(function() {
                            b.show(a);
                        }, c.delay);
                    } else {
                        b.show(a);
                    }
                }, function(a) {
                    if (c.showEvent === "click" && e.tagName == "A") {
                        a.preventDefault();
                    }
                    window.clearTimeout(b.delaytimer);
                    b.delaytimer = null;
                    b.hide(a);
                });
            } else {
                d.bind(c.showEvent, function(a) {
                    if (c.showEvent === "click" && e.tagName == "A") {
                        a.preventDefault();
                    }
                    b.delaytimer = window.setTimeout(function() {
                        b.show(a);
                    }, c.delay || 0);
                }).bind(c.hideEvent, function(a) {
                    if (c.showEvent === "click" && e.tagName == "A") {
                        a.preventDefault();
                    }
                    window.clearTimeout(b.delaytimer);
                    b.delaytimer = null;
                    b.hide(a);
                });
            }
        },
        show: function(b) {
            if (this.ready === false) {
                this.readify();
            }
            var c = this, d = c.settings, e = c.$tipsy, f = c.$el, g = f[0], h = c.offset(g);
            if (c.shown === false) {
                if (function(a) {
                    var b = 0, c;
                    for (c in a) {
                        if (a.hasOwnProperty(c)) {
                            b++;
                        }
                    }
                    return b;
                }(d.css) > 0) {
                    c.$tip.css(d.css);
                }
                c.width = e.outerWidth();
                c.height = e.outerHeight();
            }
            if (d.alignTo === "cursor" && b) {
                var i = [ b.clientX + d.offset[0], b.clientY + d.offset[1] ];
                if (i[0] + c.width > a(window).width()) {
                    var j = {
                        top: i[1] + "px",
                        right: i[0] + "px",
                        left: "auto"
                    };
                } else {
                    var j = {
                        top: i[1] + "px",
                        left: i[0] + "px",
                        right: "auto"
                    };
                }
            } else {
                var i = [ function() {
                    if (d.offset[0] < 0) {
                        return h.left - Math.abs(d.offset[0]) - c.width;
                    } else {
                        if (d.offset[0] === 0) {
                            return h.left - (c.width - f.outerWidth()) / 2;
                        } else {
                            return h.left + f.outerWidth() + d.offset[0];
                        }
                    }
                }(), function() {
                    if (d.offset[1] < 0) {
                        return h.top - Math.abs(d.offset[1]) - c.height;
                    } else {
                        if (d.offset[1] === 0) {
                            return h.top - (c.height - c.$el.outerHeight()) / 2;
                        } else {
                            return h.top + c.$el.outerHeight() + d.offset[1];
                        }
                    }
                }() ];
            }
            e.css({
                top: i[1] + "px",
                left: i[0] + "px"
            });
            c.settings.show(b, e.stop(true, true));
        },
        hide: function(a) {
            var b = this;
            if (b.ready === false) {
                return;
            }
            if (a && a.relatedTarget === b.$tip[0]) {
                b.$tip.bind("mouseleave", function(a) {
                    if (a.relatedTarget === b.$el[0]) {
                        return;
                    }
                    b.settings.hide(a, b.$tipsy.stop(true, true));
                });
                return;
            }
            b.settings.hide(a, b.$tipsy.stop(true, true));
        },
        readify: function() {
            this.ready = true;
            this.$tipsy = a('<div id="tooltipsy' + this.random + '" style="position:fixed;z-index:2147483647;display:none">').appendTo("body");
            this.$tip = a('<div class="' + this.settings.className + '">').appendTo(this.$tipsy);
            this.$tip.data("rootel", this.$el);
            var b = this.$el;
            var c = this.$tip;
            this.$tip.html(this.settings.content != "" ? typeof this.settings.content == "string" ? this.settings.content : this.settings.content(b, c) : this.title);
        },
        offset: function(a) {
            return this.$el[0].getBoundingClientRect();
        },
        destroy: function() {
            if (this.$tipsy) {
                this.$tipsy.remove();
                a.removeData(this.$el, "tooltipsy");
            }
        },
        defaults: {
            alignTo: "element",
            offset: [ 0, -1 ],
            content: "",
            show: function(a, b) {
                b.fadeIn(100);
            },
            hide: function(a, b) {
                b.fadeOut(100);
            },
            css: {},
            className: "tooltipsy",
            delay: 200,
            showEvent: "mouseenter",
            hideEvent: "mouseleave"
        }
    };
    a.fn.tooltipsy = function(b) {
        return this.each(function() {
            new a.tooltipsy(this, b);
        });
    };
})(jQuery);

(function(a) {
    a.fn.touchwipe = function(b) {
        var c = {
            min_move_x: 20,
            min_move_y: 20,
            wipeLeft: function() {},
            wipeRight: function() {},
            wipeUp: function() {},
            wipeDown: function() {},
            preventDefaultEvents: true
        };
        if (b) a.extend(c, b);
        this.each(function() {
            var a;
            var b;
            var d = false;
            function e() {
                this.removeEventListener("touchmove", f);
                a = null;
                d = false;
            }
            function f(f) {
                if (c.preventDefaultEvents) {
                    f.preventDefault();
                }
                if (d) {
                    var g = f.touches[0].pageX;
                    var h = f.touches[0].pageY;
                    var i = a - g;
                    var j = b - h;
                    if (Math.abs(i) >= c.min_move_x) {
                        e();
                        if (i > 0) {
                            c.wipeLeft(f);
                        } else {
                            c.wipeRight(f);
                        }
                    } else if (Math.abs(j) >= c.min_move_y) {
                        e();
                        if (j > 0) {
                            c.wipeDown(f);
                        } else {
                            c.wipeUp(f);
                        }
                    }
                }
            }
            function g(c) {
                if (c.touches.length == 1) {
                    a = c.touches[0].pageX;
                    b = c.touches[0].pageY;
                    d = true;
                    this.addEventListener("touchmove", f, false);
                }
            }
            if ("ontouchstart" in document.documentElement) {
                this.addEventListener("touchstart", g, false);
            }
        });
        return this;
    };
})(jQuery);

(function(a) {
    a.transit = {
        version: "0.9.9",
        propertyMap: {
            marginLeft: "margin",
            marginRight: "margin",
            marginBottom: "margin",
            marginTop: "margin",
            paddingLeft: "padding",
            paddingRight: "padding",
            paddingBottom: "padding",
            paddingTop: "padding"
        },
        enabled: true,
        useTransitionEnd: false
    };
    var b = document.createElement("div");
    var c = {};
    function d(a) {
        if (a in b.style) {
            return a;
        }
        var c = [ "Moz", "Webkit", "O", "ms" ];
        var d = a.charAt(0).toUpperCase() + a.substr(1);
        if (a in b.style) {
            return a;
        }
        for (var e = 0; e < c.length; ++e) {
            var f = c[e] + d;
            if (f in b.style) {
                return f;
            }
        }
    }
    function e() {
        b.style[c.transform] = "";
        b.style[c.transform] = "rotateY(90deg)";
        return b.style[c.transform] !== "";
    }
    var f = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
    c.transition = d("transition");
    c.transitionDelay = d("transitionDelay");
    c.transform = d("transform");
    c.transformOrigin = d("transformOrigin");
    c.transform3d = e();
    var g = {
        transition: "transitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd",
        WebkitTransition: "webkitTransitionEnd",
        msTransition: "MSTransitionEnd"
    };
    var h = c.transitionEnd = g[c.transition] || null;
    for (var i in c) {
        if (c.hasOwnProperty(i) && typeof a.support[i] === "undefined") {
            a.support[i] = c[i];
        }
    }
    b = null;
    a.cssEase = {
        _default: "ease",
        "in": "ease-in",
        out: "ease-out",
        "in-out": "ease-in-out",
        snap: "cubic-bezier(0,1,.5,1)",
        easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
        easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
        easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
        easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
        easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
        easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
        easeOutExpo: "cubic-bezier(.19,1,.22,1)",
        easeInOutExpo: "cubic-bezier(1,0,0,1)",
        easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
        easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
        easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
        easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
        easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
        easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
        easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
        easeOutQuint: "cubic-bezier(.23,1,.32,1)",
        easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
        easeInSine: "cubic-bezier(.47,0,.745,.715)",
        easeOutSine: "cubic-bezier(.39,.575,.565,1)",
        easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
        easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
        easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
        easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
    };
    a.cssHooks["transit:transform"] = {
        get: function(b) {
            return a(b).data("transform") || new j();
        },
        set: function(b, d) {
            var e = d;
            if (!(e instanceof j)) {
                e = new j(e);
            }
            if (c.transform === "WebkitTransform" && !f) {
                b.style[c.transform] = e.toString(true);
            } else {
                b.style[c.transform] = e.toString();
            }
            a(b).data("transform", e);
        }
    };
    a.cssHooks.transform = {
        set: a.cssHooks["transit:transform"].set
    };
    if (a.fn.jquery < "1.8") {
        a.cssHooks.transformOrigin = {
            get: function(a) {
                return a.style[c.transformOrigin];
            },
            set: function(a, b) {
                a.style[c.transformOrigin] = b;
            }
        };
        a.cssHooks.transition = {
            get: function(a) {
                return a.style[c.transition];
            },
            set: function(a, b) {
                a.style[c.transition] = b;
            }
        };
    }
    n("scale");
    n("translate");
    n("rotate");
    n("rotateX");
    n("rotateY");
    n("rotate3d");
    n("perspective");
    n("skewX");
    n("skewY");
    n("x", true);
    n("y", true);
    function j(a) {
        if (typeof a === "string") {
            this.parse(a);
        }
        return this;
    }
    j.prototype = {
        setFromString: function(a, b) {
            var c = typeof b === "string" ? b.split(",") : b.constructor === Array ? b : [ b ];
            c.unshift(a);
            j.prototype.set.apply(this, c);
        },
        set: function(a) {
            var b = Array.prototype.slice.apply(arguments, [ 1 ]);
            if (this.setter[a]) {
                this.setter[a].apply(this, b);
            } else {
                this[a] = b.join(",");
            }
        },
        get: function(a) {
            if (this.getter[a]) {
                return this.getter[a].apply(this);
            } else {
                return this[a] || 0;
            }
        },
        setter: {
            rotate: function(a) {
                this.rotate = p(a, "deg");
            },
            rotateX: function(a) {
                this.rotateX = p(a, "deg");
            },
            rotateY: function(a) {
                this.rotateY = p(a, "deg");
            },
            scale: function(a, b) {
                if (b === undefined) {
                    b = a;
                }
                this.scale = a + "," + b;
            },
            skewX: function(a) {
                this.skewX = p(a, "deg");
            },
            skewY: function(a) {
                this.skewY = p(a, "deg");
            },
            perspective: function(a) {
                this.perspective = p(a, "px");
            },
            x: function(a) {
                this.set("translate", a, null);
            },
            y: function(a) {
                this.set("translate", null, a);
            },
            translate: function(a, b) {
                if (this._translateX === undefined) {
                    this._translateX = 0;
                }
                if (this._translateY === undefined) {
                    this._translateY = 0;
                }
                if (a !== null && a !== undefined) {
                    this._translateX = p(a, "px");
                }
                if (b !== null && b !== undefined) {
                    this._translateY = p(b, "px");
                }
                this.translate = this._translateX + "," + this._translateY;
            }
        },
        getter: {
            x: function() {
                return this._translateX || 0;
            },
            y: function() {
                return this._translateY || 0;
            },
            scale: function() {
                var a = (this.scale || "1,1").split(",");
                if (a[0]) {
                    a[0] = parseFloat(a[0]);
                }
                if (a[1]) {
                    a[1] = parseFloat(a[1]);
                }
                return a[0] === a[1] ? a[0] : a;
            },
            rotate3d: function() {
                var a = (this.rotate3d || "0,0,0,0deg").split(",");
                for (var b = 0; b <= 3; ++b) {
                    if (a[b]) {
                        a[b] = parseFloat(a[b]);
                    }
                }
                if (a[3]) {
                    a[3] = p(a[3], "deg");
                }
                return a;
            }
        },
        parse: function(a) {
            var b = this;
            a.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(a, c, d) {
                b.setFromString(c, d);
            });
        },
        toString: function(a) {
            var b = [];
            for (var d in this) {
                if (this.hasOwnProperty(d)) {
                    if (!c.transform3d && (d === "rotateX" || d === "rotateY" || d === "perspective" || d === "transformOrigin")) {
                        continue;
                    }
                    if (d[0] !== "_") {
                        if (a && d === "scale") {
                            b.push(d + "3d(" + this[d] + ",1)");
                        } else {
                            if (a && d === "translate") {
                                b.push(d + "3d(" + this[d] + ",0)");
                            } else {
                                b.push(d + "(" + this[d] + ")");
                            }
                        }
                    }
                }
            }
            return b.join(" ");
        }
    };
    function k(a, b, c) {
        if (b === true) {
            a.queue(c);
        } else {
            if (b) {
                a.queue(b, c);
            } else {
                c();
            }
        }
    }
    function l(b) {
        var c = [];
        a.each(b, function(b) {
            b = a.camelCase(b);
            b = a.transit.propertyMap[b] || a.cssProps[b] || b;
            b = o(b);
            if (a.inArray(b, c) === -1) {
                c.push(b);
            }
        });
        return c;
    }
    function m(b, c, d, e) {
        var f = l(b);
        if (a.cssEase[d]) {
            d = a.cssEase[d];
        }
        var g = "" + q(c) + " " + d;
        if (parseInt(e, 10) > 0) {
            g += " " + q(e);
        }
        var h = [];
        a.each(f, function(a, b) {
            h.push(b + " " + g);
        });
        return h.join(", ");
    }
    a.fn.transition = a.fn.transit = function(b, d, e, f) {
        var g = this;
        var i = 0;
        var j = true;
        if (typeof d === "function") {
            f = d;
            d = undefined;
        }
        if (typeof e === "function") {
            f = e;
            e = undefined;
        }
        if (typeof b.easing !== "undefined") {
            e = b.easing;
            delete b.easing;
        }
        if (typeof b.duration !== "undefined") {
            d = b.duration;
            delete b.duration;
        }
        if (typeof b.complete !== "undefined") {
            f = b.complete;
            delete b.complete;
        }
        if (typeof b.queue !== "undefined") {
            j = b.queue;
            delete b.queue;
        }
        if (typeof b.delay !== "undefined") {
            i = b.delay;
            delete b.delay;
        }
        if (typeof d === "undefined") {
            d = a.fx.speeds._default;
        }
        if (typeof e === "undefined") {
            e = a.cssEase._default;
        }
        d = q(d);
        var l = m(b, d, e, i);
        var n = a.transit.enabled && c.transition;
        var o = n ? parseInt(d, 10) + parseInt(i, 10) : 0;
        if (o === 0) {
            var p = function(a) {
                g.css(b);
                if (f) {
                    f.apply(g);
                }
                if (a) {
                    a();
                }
            };
            k(g, j, p);
            return g;
        }
        var r = {};
        var s = function(d) {
            var e = false;
            var i = function() {
                if (e) {
                    g.unbind(h, i);
                }
                if (o > 0) {
                    g.each(function() {
                        this.style[c.transition] = r[this] || null;
                    });
                }
                if (typeof f === "function") {
                    f.apply(g);
                }
                if (typeof d === "function") {
                    d();
                }
            };
            if (o > 0 && h && a.transit.useTransitionEnd) {
                e = true;
                g.bind(h, i);
            } else {
                window.setTimeout(i, o);
            }
            g.each(function() {
                if (o > 0) {
                    this.style[c.transition] = l;
                }
                a(this).css(b);
            });
        };
        var t = function(a) {
            this.offsetWidth;
            s(a);
        };
        k(g, j, t);
        return this;
    };
    function n(b, d) {
        if (!d) {
            a.cssNumber[b] = true;
        }
        a.transit.propertyMap[b] = c.transform;
        a.cssHooks[b] = {
            get: function(c) {
                var d = a(c).css("transit:transform");
                return d.get(b);
            },
            set: function(c, d) {
                var e = a(c).css("transit:transform");
                e.setFromString(b, d);
                a(c).css({
                    "transit:transform": e
                });
            }
        };
    }
    function o(a) {
        return a.replace(/([A-Z])/g, function(a) {
            return "-" + a.toLowerCase();
        });
    }
    function p(a, b) {
        if (typeof a === "string" && !a.match(/^[\-0-9\.]+$/)) {
            return a;
        } else {
            return "" + a + b;
        }
    }
    function q(b) {
        var c = b;
        if (a.fx.speeds[c]) {
            c = a.fx.speeds[c];
        }
        return p(c, "ms");
    }
    a.transit.getTransitionValue = m;
})(jQuery);

(function(a, b) {
    "use strict";
    function c(a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return a.prop ? a.prop.apply(a, b) : a.attr.apply(a, b);
    }
    function d(a, b, c) {
        var d, e;
        for (d in c) c.hasOwnProperty(d) && (e = d.replace(/ |$/g, b.eventNamespace), a.bind(e, c[d]));
    }
    function e(a, b, c) {
        d(a, c, {
            focus: function() {
                b.addClass(c.focusClass);
            },
            blur: function() {
                b.removeClass(c.focusClass), b.removeClass(c.activeClass);
            },
            mouseenter: function() {
                b.addClass(c.hoverClass);
            },
            mouseleave: function() {
                b.removeClass(c.hoverClass), b.removeClass(c.activeClass);
            },
            "mousedown touchbegin": function() {
                a.is(":disabled") || b.addClass(c.activeClass);
            },
            "mouseup touchend": function() {
                b.removeClass(c.activeClass);
            }
        });
    }
    function f(a, b) {
        a.removeClass(b.hoverClass + " " + b.focusClass + " " + b.activeClass);
    }
    function g(a, b, c) {
        c ? a.addClass(b) : a.removeClass(b);
    }
    function h(a, b, c) {
        var d = "checked", e = b.is(":" + d);
        b.prop ? b.prop(d, e) : e ? b.attr(d, d) : b.removeAttr(d), g(a, c.checkedClass, e);
    }
    function i(a, b, c) {
        g(a, c.disabledClass, b.is(":disabled"));
    }
    function j(a, b, c) {
        switch (c) {
          case "after":
            return a.after(b), a.next();

          case "before":
            return a.before(b), a.prev();

          case "wrap":
            return a.wrap(b), a.parent();
        }
        return null;
    }
    function k(b, d, e) {
        var f, g, h;
        return e || (e = {}), e = a.extend({
            bind: {},
            divClass: null,
            divWrap: "wrap",
            spanClass: null,
            spanHtml: null,
            spanWrap: "wrap"
        }, e), f = a("<div />"), g = a("<span />"), d.autoHide && b.is(":hidden") && "none" === b.css("display") && f.hide(), 
        e.divClass && f.addClass(e.divClass), d.wrapperClass && f.addClass(d.wrapperClass), 
        e.spanClass && g.addClass(e.spanClass), h = c(b, "id"), d.useID && h && c(f, "id", d.idPrefix + "-" + h), 
        e.spanHtml && g.html(e.spanHtml), f = j(b, f, e.divWrap), g = j(b, g, e.spanWrap), 
        i(f, b, d), {
            div: f,
            span: g
        };
    }
    function l(b, c) {
        var d;
        return c.wrapperClass ? (d = a("<span />").addClass(c.wrapperClass), d = j(b, d, "wrap")) : null;
    }
    function m() {
        var b, c, d, e;
        return e = "rgb(120,2,153)", c = a('<div style="width:0;height:0;color:' + e + '">'), 
        a("body").append(c), d = c.get(0), b = window.getComputedStyle ? window.getComputedStyle(d, "").color : (d.currentStyle || d.style || {}).color, 
        c.remove(), b.replace(/ /g, "") !== e;
    }
    function n(b) {
        return b ? a("<span />").text(b).html() : "";
    }
    function o() {
        return navigator.cpuClass && !navigator.product;
    }
    function p() {
        return window.XMLHttpRequest !== void 0 ? !0 : !1;
    }
    function q(a) {
        var b;
        return a[0].multiple ? !0 : (b = c(a, "size"), !b || 1 >= b ? !1 : !0);
    }
    function r() {
        return !1;
    }
    function s(a, b) {
        var c = "none";
        d(a, b, {
            "selectstart dragstart mousedown": r
        }), a.css({
            MozUserSelect: c,
            msUserSelect: c,
            webkitUserSelect: c,
            userSelect: c
        });
    }
    function t(a, b, c) {
        var d = a.val();
        "" === d ? d = c.fileDefaultHtml : (d = d.split(/[\/\\]+/), d = d[d.length - 1]), 
        b.text(d);
    }
    function u(a, b, c) {
        var d, e;
        for (d = [], a.each(function() {
            var a;
            for (a in b) Object.prototype.hasOwnProperty.call(b, a) && (d.push({
                el: this,
                name: a,
                old: this.style[a]
            }), this.style[a] = b[a]);
        }), c(); d.length; ) e = d.pop(), e.el.style[e.name] = e.old;
    }
    function v(a, b) {
        var c;
        c = a.parents(), c.push(a[0]), c = c.not(":visible"), u(c, {
            visibility: "hidden",
            display: "block",
            position: "absolute"
        }, b);
    }
    function w(a, b) {
        return function() {
            a.unwrap().unwrap().unbind(b.eventNamespace);
        };
    }
    var x = !0, y = !1, z = [ {
        match: function(a) {
            return a.is("a, button, :submit, :reset, input[type='button']");
        },
        apply: function(a, b) {
            var g, h, j, l, m;
            return h = b.submitDefaultHtml, a.is(":reset") && (h = b.resetDefaultHtml), l = a.is("a, button") ? function() {
                return a.html() || h;
            } : function() {
                return n(c(a, "value")) || h;
            }, j = k(a, b, {
                divClass: b.buttonClass,
                spanHtml: l()
            }), g = j.div, e(a, g, b), m = !1, d(g, b, {
                "click touchend": function() {
                    var b, d, e, f;
                    m || a.is(":disabled") || (m = !0, a[0].dispatchEvent ? (b = document.createEvent("MouseEvents"), 
                    b.initEvent("click", !0, !0), d = a[0].dispatchEvent(b), a.is("a") && d && (e = c(a, "target"), 
                    f = c(a, "href"), e && "_self" !== e ? window.open(f, e) : document.location.href = f)) : a.click(), 
                    m = !1);
                }
            }), s(g, b), {
                remove: function() {
                    return g.after(a), g.remove(), a.unbind(b.eventNamespace), a;
                },
                update: function() {
                    f(g, b), i(g, a, b), a.detach(), j.span.html(l()).append(a);
                }
            };
        }
    }, {
        match: function(a) {
            return a.is(":checkbox");
        },
        apply: function(a, b) {
            var c, g, j;
            return c = k(a, b, {
                divClass: b.checkboxClass
            }), g = c.div, j = c.span, e(a, g, b), d(a, b, {
                "click touchend": function() {
                    h(j, a, b);
                }
            }), h(j, a, b), {
                remove: w(a, b),
                update: function() {
                    f(g, b), j.removeClass(b.checkedClass), h(j, a, b), i(g, a, b);
                }
            };
        }
    }, {
        match: function(a) {
            return a.is(":file");
        },
        apply: function(b, g) {
            function h() {
                t(b, n, g);
            }
            var l, m, n, p;
            return l = k(b, g, {
                divClass: g.fileClass,
                spanClass: g.fileButtonClass,
                spanHtml: g.fileButtonHtml,
                spanWrap: "after"
            }), m = l.div, p = l.span, n = a("<span />").html(g.fileDefaultHtml), n.addClass(g.filenameClass), 
            n = j(b, n, "after"), c(b, "size") || c(b, "size", m.width() / 10), e(b, m, g), 
            h(), o() ? d(b, g, {
                click: function() {
                    b.trigger("change"), setTimeout(h, 0);
                }
            }) : d(b, g, {
                change: h
            }), s(n, g), s(p, g), {
                remove: function() {
                    return n.remove(), p.remove(), b.unwrap().unbind(g.eventNamespace);
                },
                update: function() {
                    f(m, g), t(b, n, g), i(m, b, g);
                }
            };
        }
    }, {
        match: function(a) {
            if (a.is("input")) {
                var b = (" " + c(a, "type") + " ").toLowerCase(), d = " color date datetime datetime-local email month number password search tel text time url week ";
                return d.indexOf(b) >= 0;
            }
            return !1;
        },
        apply: function(a, b) {
            var d, f;
            return d = c(a, "type"), a.addClass(b.inputClass), f = l(a, b), e(a, a, b), b.inputAddTypeAsClass && a.addClass(d), 
            {
                remove: function() {
                    a.removeClass(b.inputClass), b.inputAddTypeAsClass && a.removeClass(d), f && a.unwrap();
                },
                update: r
            };
        }
    }, {
        match: function(a) {
            return a.is(":radio");
        },
        apply: function(b, g) {
            var j, l, m;
            return j = k(b, g, {
                divClass: g.radioClass
            }), l = j.div, m = j.span, e(b, l, g), d(b, g, {
                "click touchend": function() {
                    a.uniform.update(a(':radio[name="' + c(b, "name") + '"]'));
                }
            }), h(m, b, g), {
                remove: w(b, g),
                update: function() {
                    f(l, g), h(m, b, g), i(l, b, g);
                }
            };
        }
    }, {
        match: function(a) {
            return a.is("select") && !q(a) ? !0 : !1;
        },
        apply: function(b, c) {
            var g, h, j, l;
            return c.selectAutoWidth && v(b, function() {
                l = b.width();
            }), g = k(b, c, {
                divClass: c.selectClass,
                spanHtml: (b.find(":selected:first") || b.find("option:first")).html(),
                spanWrap: "before"
            }), h = g.div, j = g.span, c.selectAutoWidth ? v(b, function() {
                u(a([ j[0], h[0] ]), {
                    display: "block"
                }, function() {
                    var a;
                    a = j.outerWidth() - j.width(), h.width(l + a), j.width(l);
                });
            }) : h.addClass("fixedWidth"), e(b, h, c), d(b, c, {
                change: function() {
                    j.html(b.find(":selected").html()), h.removeClass(c.activeClass);
                },
                "click touchend": function() {
                    var a = b.find(":selected").html();
                    j.html() !== a && b.trigger("change");
                },
                keyup: function() {
                    j.html(b.find(":selected").html());
                }
            }), s(j, c), {
                remove: function() {
                    return j.remove(), b.unwrap().unbind(c.eventNamespace), b;
                },
                update: function() {
                    c.selectAutoWidth ? (a.uniform.restore(b), b.uniform(c)) : (f(h, c), j.html(b.find(":selected").html()), 
                    i(h, b, c));
                }
            };
        }
    }, {
        match: function(a) {
            return a.is("select") && q(a) ? !0 : !1;
        },
        apply: function(a, b) {
            var c;
            return a.addClass(b.selectMultiClass), c = l(a, b), e(a, a, b), {
                remove: function() {
                    a.removeClass(b.selectMultiClass), c && a.unwrap();
                },
                update: r
            };
        }
    }, {
        match: function(a) {
            return a.is("textarea");
        },
        apply: function(a, b) {
            var c;
            return a.addClass(b.textareaClass), c = l(a, b), e(a, a, b), {
                remove: function() {
                    a.removeClass(b.textareaClass), c && a.unwrap();
                },
                update: r
            };
        }
    } ];
    o() && !p() && (x = !1), a.uniform = {
        defaults: {
            activeClass: "active",
            autoHide: !0,
            buttonClass: "button",
            checkboxClass: "checker",
            checkedClass: "checked",
            disabledClass: "disabled",
            eventNamespace: ".uniform",
            fileButtonClass: "action",
            fileButtonHtml: "Choose File",
            fileClass: "uploader",
            fileDefaultHtml: "No file selected",
            filenameClass: "filename",
            focusClass: "focus",
            hoverClass: "hover",
            idPrefix: "uniform",
            inputAddTypeAsClass: !0,
            inputClass: "uniform-input",
            radioClass: "radio",
            resetDefaultHtml: "Reset",
            resetSelector: !1,
            selectAutoWidth: !0,
            selectClass: "selector",
            selectMultiClass: "uniform-multiselect",
            submitDefaultHtml: "Submit",
            textareaClass: "uniform",
            useID: !0,
            wrapperClass: null
        },
        elements: []
    }, a.fn.uniform = function(b) {
        var c = this;
        return b = a.extend({}, a.uniform.defaults, b), y || (y = !0, m() && (x = !1)), 
        x ? (b.resetSelector && a(b.resetSelector).mouseup(function() {
            window.setTimeout(function() {
                a.uniform.update(c);
            }, 10);
        }), this.each(function() {
            var c, d, e, f = a(this);
            if (f.data("uniformed")) return a.uniform.update(f), void 0;
            for (c = 0; z.length > c; c += 1) if (d = z[c], d.match(f, b)) return e = d.apply(f, b), 
            f.data("uniformed", e), a.uniform.elements.push(f.get(0)), void 0;
        })) : this;
    }, a.uniform.restore = a.fn.uniform.restore = function(c) {
        c === b && (c = a.uniform.elements), a(c).each(function() {
            var b, c, d = a(this);
            c = d.data("uniformed"), c && (c.remove(), b = a.inArray(this, a.uniform.elements), 
            b >= 0 && a.uniform.elements.splice(b, 1), d.removeData("uniformed"));
        });
    }, a.uniform.update = a.fn.uniform.update = function(c) {
        c === b && (c = a.uniform.elements), a(c).each(function() {
            var b, c = a(this);
            b = c.data("uniformed"), b && b.update(c, b.options);
        });
    };
})(jQuery);

var HMR = HMR || {};

(function() {
    HMR.sidebarPadding = function() {
        var a = $(".post:first-of-type header"), b = $(".sidebar").width(), c = $('#subscribe-submit input[type="submit"]'), d = $(".sidebar");
        d.css({
            marginTop: "-24px"
        });
        c.addClass("btn btn-read-more");
        if (!!$(".sticky").offset()) {
            var e = $(".sticky").offset().top;
            $(window).scroll(function() {
                var a = $(window).scrollTop();
                if (e < a) {
                    $(".sticky").css({
                        position: "fixed",
                        top: 0,
                        paddingTop: "2em",
                        width: b
                    });
                } else {
                    $(".sticky").css({
                        position: "static",
                        paddingTop: "0",
                        width: ""
                    });
                }
            });
        }
    };
})();

var HMR = HMR || {};

(function() {
    HMR.capabilityBGSlideShow = function() {
        if ($(window).width() > 767) {
            HMR.nav.slideUp();
        }
        var a = $(".slideshow"), b = $(".big_arrow.left"), c = $(".big_arrow.right"), d = $(".gallery-footer");
        var e = 0, f = 0, g = 0, h = 0, i = 0, j = 0;
        d.cycle({
            fx: "fade",
            delay: 1e3,
            speed: 1e3,
            after: function(a, b, c) {
                h = c.currSlide;
                i = h + 1;
                j = h - 1;
                if (h == c.slideCount - 1) {
                    i = 0;
                }
                if (h == 0) {
                    j = c.slideCount - 1;
                }
            }
        });
        a.cycle({
            fx: "fade",
            delay: 1e3,
            speed: 1e3,
            containerResize: false,
            slideResize: false,
            fit: 1,
            after: function(a, b, c) {
                e = c.currSlide;
                f = e + 1;
                g = e - 1;
                if (e == c.slideCount - 1) {
                    f = 0;
                }
                if (e == 0) {
                    g = c.slideCount - 1;
                }
            }
        });
        (function(b) {
            b(window).keyup(function(b) {
                var c = b.which | b.keyCode;
                if (c === 37) {
                    a.cycle(g, "fade");
                    d.cycle(j, "fade");
                    a.cycle("toggle");
                    d.cycle("toggle");
                } else if (c === 39) {
                    a.cycle(f, "fade");
                    d.cycle(i, "fade");
                    a.cycle("toggle");
                    d.cycle("toggle");
                }
            });
        })(jQuery);
        (function(b) {
            b(window).touchwipe({
                wipeLeft: function(b) {
                    b.preventDefault();
                    a.cycle(g, "fade");
                    d.cycle(j, "fade");
                },
                wipeRight: function(b) {
                    b.preventDefault();
                    a.cycle(f, "fade");
                    d.cycle(i, "fade");
                },
                preventDefaultEvents: false
            });
        })(jQuery);
        b.on("click", function() {
            a.cycle(g, "fade");
            d.cycle(j, "fade");
        });
        c.on("click", function() {
            a.cycle(f, "fade");
            d.cycle(i, "fade");
        });
    };
})();

var HMR = HMR || {};

(function() {
    HMR.capabilityDescriptionFades = function() {
        if ($(window).width() > 767) {
            $(".single-capability .meta-box").transition({
                delay: 6e3,
                opacity: 0
            }, 2e3, "ease");
            $(".gallery-title").transition({
                delay: 7e3,
                opacity: 100
            }, 2e3, "ease");
            $(".single-capability .meta-box").hover(function() {
                $(this).transition({
                    opacity: 100
                }, 1e3, "ease");
            }, function() {
                $(this).transition({
                    opacity: 0
                }, 1e3, "ease");
            });
            $(".gallery-title").hover(function() {
                $(".meta-box").transition({
                    opacity: 100
                }, 1e3, "ease");
            }, function() {
                $(".meta-box").transition({
                    opacity: 0
                }, 1e3, "ease");
            });
        }
    };
})();












var HMR = HMR || {};

(function() {
    HMR.pageFading = function() {
        function a() {
            $("body").fadeIn(500);
        }
        window.addEventListener("load", a, false);
        window.addEventListener("unload", a, false);
        $("body").show();
        $(".scrollTop a, .post-type-archive-team a, .back a").click(function(a) {
            var c = a.which === 115 || a.ctrlKey || a.metaKey || a.which === 19 || $(".active.menu-team");
            if (!c) {
                linkLocation = this.href;
                $("body").fadeOut(500, b);
                return false;
            }
        });
        function b() {
            window.location = linkLocation;
        }
    };
})();

var HMR = HMR || {};

(function() {
    HMR.homepageBodyFade = function() {
        $("html").css("background", "none");
    };
})();

var HMR = HMR || {};

(function() {
    HMR.homepageImageViewer = function() {
        var a = {
            fade: 1550,
            duration: 5e3
        };
        var b = $.map(items, function(a) {
            return a.img;
        }), c = $.backstretch(b, a), d = $("body").data("backstretch"), e = $(".big_arrow.left"), f = $(".big_arrow.right");
        $(window).on("backstretch.show", function(a, b) {
            var c = items[b.index].words;
            $(c).transition({
                opacity: 1
            }, 1550);
            $(".backstretch").transition({
                scale: 1.1
            }, 1e4);
            $(".backstretch").transition({
                delay: 500,
                scale: 1
            }, 1e4);
        });
        $(window).on("backstretch.before", function(a, b) {
            $(".img").transition({
                opacity: 0
            }, 1550);
        });
        $(window).on("backstretch.after", function(a, b) {
            b.resize();
        });
        (function(a) {
            a(window).keyup(function(a) {
                var b = a.which | a.keyCode;
                if (b === 37) {
                    c.prev();
                } else if (b === 39) {
                    c.next();
                }
            });
        })(jQuery);
        (function(a) {
            a(window).touchwipe({
                wipeLeft: function(a) {
                    a.preventDefault();
                    c.prev();
                },
                wipeRight: function(a) {
                    a.preventDefault();
                    c.next();
                },
                preventDefaultEvents: false
            });
        })(jQuery);
        e.on("click", function() {
            c.prev();
        });
        f.on("click", function() {
            c.next();
        });
    };
})();







var HMR = HMR || {};

(function() {
    HMR.navMobileVersion = function() {
        var a = responsiveNav("#navbar-mobile", {
            animate: true,
            openPos: "relative",
            transition: 200,
            open: function() {
                $("#nav-toggle").addClass("opened");
            },
            close: function() {
                $("#nav-toggle").removeClass("opened");
            }
        });
    };
})();


var HMR = HMR || {};

(function() {
    HMR.navSlideToggle = function() {
        var a = $(".slideToggle"), b = $(".sub-nav"), c = $(".banner"), d = "30px", e = true;
        a.on("click", function() {
            if (e) {
                g();
            } else {
                f();
            }
        });
        function f() {
            e = true;
            c.slideDown(167);
            b.removeClass("up").addClass("down");
            a.removeClass("slideDown");
            a.addClass("slideUp");
        }
        function g() {
            e = false;
            c.slideUp(167);
            b.removeClass("down").addClass("up");
            a.removeClass("slideUp");
            a.addClass("slideDown");
        }
        HMR.nav.slideUp = g;
        HMR.nav.slideDown = f;
    };
})();






var HMR = window.HMR || {};

HMR.Site = {
    common: {
        init: function() {
            HMR.nav = {};
            HMR.navSlideToggle();
            HMR.navMobileVersion();
            HMR.pageFading();
            $("#s").clearField();
            var a = $(".dropdown-menu");
            var b = $(".dropdown");
            function c() {
                a.css("display", "block").transition({
                    opacity: 1,
                    y: 0
                });
                $("#map_holder").css("z-index", "0");
            }
            function d() {
                a.transition({
                    y: "-10%",
                    opacity: 0
                }, function() {
                    $(this).css("display", "");
                    $("#map_holder").css("z-index", "");
                });
            }
            b.hoverIntent(c, d);
        }
    },
    home: {
        init: function() {
            HMR.homepageImageViewer();
            HMR.homepageBodyFade();
        }
    },
    connect: {
        init: function() {
            HMR.uniform();
            HMR.scrollForm();
            HMR.MapTest();
            $(".pointsOfContact .points:nth-child(4n+5)").addClass("clear");
        }
    },
    single: {
        init: function() {
            var a = $(".post-slider");
            if (a.length) {
                a.bxSlider({
                    adaptiveHeight: true
                });
            }
            HMR.sidebarPadding();
            $(".type-post").fitVids();
            if ($(".single-capability").length) {
                HMR.capabilityBGSlideShow();
                HMR.capabilityDescriptionFades();
                $(".menu-capabilities").addClass("active");
                $(".menu-blog").removeClass("active");
            }
            if ($(".single-team").length) {
                $(".menu li.menu-our-team").addClass("active");
                $(".menu-hmr").addClass("active");
                $(".menu-blog").removeClass("active");
                $(window).bind("hashchange", function() {});
            }
            if ($(".single-post").length) {
                $("html").css("background-color", "#fff");
            }
        }
    },
    page: {
        init: function() {
            HMR.subNavFixes();
            HMR.conditionals();
            if ($("body.web").length) {
                $(".nav li.menu-media").addClass("active");
            }
            if ($("body.video").length) {
                $(".nav li.menu-media").addClass("active");
            }
            if ($("body.clients").length) {
                $(".nav li.menu-hmr").addClass("active");
            }
            if ($("body.venues").length) {
                $(".nav li.menu-hmr").addClass("active");
            }
            if ($("body.about").length) {
                $(".nav li.menu-hmr").addClass("active");
            }
            if ($("body.social-and-gala").length) {
                $(".nav li.menu-gallery").addClass("active");
            }
            if ($("body.celebrations").length) {
                $(".nav li.menu-gallery").addClass("active");
            }
            if ($("body.corporate").length) {
                $(".nav li.menu-gallery").addClass("active");
            }
            if ($(".gform_fields").length) {
                HMR.uniform();
                HMR.scrollForm();
                HMR.MapTest();
                $(".pointsOfContact .points:nth-child(4n+5)").addClass("clear");
            }
        }
    },
    blog: {
        init: function() {
            HMR.sidebarPadding();
            $(".type-post").fitVids();
            $("html").css("background-color", "#fff");
        }
    },
    search: {
        init: function() {
            $("html").css("background-color", "#fff");
        }
    },
    author: {
        init: function() {
            $("html").css("background-color", "#fff");
        }
    },
    archive: {
        init: function() {
            HMR.conditionals();
            HMR.sidebarPadding();
            $(".type-post").fitVids();
            if ($(".category").length) {
                $("html").css("background-color", "#fff");
            }
        }
    },
    about: {
        init: function() {}
    }
};

var UTIL = {
    fire: function(a, b, c) {
        var d = HMR.Site;
        b = b === undefined ? "init" : b;
        if (a !== "" && d[a] && typeof d[a][b] === "function") {
            d[a][b](c);
        }
    },
    loadEvents: function() {
        UTIL.fire("common");
        $.each(document.body.className.replace(/-/g, "_").split(/\s+/), function(a, b) {
            UTIL.fire(b);
        });
        UTIL.fire("common", "finalize");
    }
};

$(document).ready(UTIL.loadEvents);
