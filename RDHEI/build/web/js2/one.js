if (typeof YAHOO == "undefined" || !YAHOO) {
    var YAHOO = {}
}
YAHOO.namespace = function () {
    var a = arguments,
        h = null,
        k, m, j;
    for (k = 0; k < a.length; k = k + 1) {
        j = ("" + a[k]).split(".");
        h = YAHOO;
        for (m = (j[0] == "YAHOO") ? 1 : 0; m < j.length; m = m + 1) {
            h[j[m]] = h[j[m]] || {};
            h = h[j[m]]
        }
    }
    return h
};
YAHOO.log = function (g, f, h) {
    var e = YAHOO.widget.Logger;
    if (e && e.log) {
        return e.log(g, f, h)
    } else {
        return false
    }
};
YAHOO.register = function (t, p, q) {
    var b = YAHOO.env.modules,
        s, m, n, o, r;
    if (!b[t]) {
        b[t] = {
            versions: [],
            builds: []
        }
    }
    s = b[t];
    m = q.version;
    n = q.build;
    o = YAHOO.env.listeners;
    s.name = t;
    s.version = m;
    s.build = n;
    s.versions.push(m);
    s.builds.push(n);
    s.mainClass = p;
    for (r = 0; r < o.length; r = r + 1) {
        o[r](s)
    }
    if (p) {
        p.VERSION = m;
        p.BUILD = n
    } else {
        YAHOO.log("mainClass is undefined for module " + t, "warn")
    }
};
YAHOO.env = YAHOO.env || {
    modules: [],
    listeners: []
};
YAHOO.env.getVersion = function (b) {
    return YAHOO.env.modules[b] || null
};
YAHOO.env.parseUA = function (q) {
    var p = function (b) {
        var a = 0;
        return parseFloat(b.replace(/\./g, function () {
                    return (a++ == 1) ? "" : "."
                }))
    }, m = navigator,
        n = {
            ie: 0,
            opera: 0,
            gecko: 0,
            webkit: 0,
            chrome: 0,
            mobile: null,
            air: 0,
            ipad: 0,
            iphone: 0,
            ipod: 0,
            ios: null,
            android: 0,
            webos: 0,
            caja: m && m.cajaVersion,
            secure: false,
            os: null
        }, r = q || (navigator && navigator.userAgent),
        o = window && window.location,
        j = o && o.href,
        k;
    n.secure = j && (j.toLowerCase().indexOf("https") === 0);
    if (r) {
        if ((/windows|win32/i).test(r)) {
            n.os = "windows"
        } else {
            if ((/macintosh/i).test(r)) {
                n.os = "macintosh"
            } else {
                if ((/rhino/i).test(r)) {
                    n.os = "rhino"
                }
            }
        } if ((/KHTML/).test(r)) {
            n.webkit = 1
        }
        k = r.match(/AppleWebKit\/([^\s]*)/);
        if (k && k[1]) {
            n.webkit = p(k[1]);
            if (/ Mobile\//.test(r)) {
                n.mobile = "Apple";
                k = r.match(/OS ([^\s]*)/);
                if (k && k[1]) {
                    k = p(k[1].replace("_", "."))
                }
                n.ios = k;
                n.ipad = n.ipod = n.iphone = 0;
                k = r.match(/iPad|iPod|iPhone/);
                if (k && k[0]) {
                    n[k[0].toLowerCase()] = n.ios
                }
            } else {
                k = r.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/);
                if (k) {
                    n.mobile = k[0]
                }
                if (/webOS/.test(r)) {
                    n.mobile = "WebOS";
                    k = r.match(/webOS\/([^\s]*);/);
                    if (k && k[1]) {
                        n.webos = p(k[1])
                    }
                }
                if (/ Android/.test(r)) {
                    n.mobile = "Android";
                    k = r.match(/Android ([^\s]*);/);
                    if (k && k[1]) {
                        n.android = p(k[1])
                    }
                }
            }
            k = r.match(/Chrome\/([^\s]*)/);
            if (k && k[1]) {
                n.chrome = p(k[1])
            } else {
                k = r.match(/AdobeAIR\/([^\s]*)/);
                if (k) {
                    n.air = k[0]
                }
            }
        }
        if (!n.webkit) {
            k = r.match(/Opera[\s\/]([^\s]*)/);
            if (k && k[1]) {
                n.opera = p(k[1]);
                k = r.match(/Version\/([^\s]*)/);
                if (k && k[1]) {
                    n.opera = p(k[1])
                }
                k = r.match(/Opera Mini[^;]*/);
                if (k) {
                    n.mobile = k[0]
                }
            } else {
                k = r.match(/MSIE\s([^;]*)/);
                if (k && k[1]) {
                    n.ie = p(k[1])
                } else {
                    k = r.match(/Gecko\/([^\s]*)/);
                    if (k) {
                        n.gecko = 1;
                        k = r.match(/rv:([^\s\)]*)/);
                        if (k && k[1]) {
                            n.gecko = p(k[1])
                        }
                    }
                }
            }
        }
    }
    return n
};
YAHOO.env.ua = YAHOO.env.parseUA();
(function () {
    YAHOO.namespace("util", "widget", "example");
    if ("undefined" !== typeof YAHOO_config) {
        var e = YAHOO_config.listener,
            f = YAHOO.env.listeners,
            g = true,
            h;
        if (e) {
            for (h = 0; h < f.length; h++) {
                if (f[h] == e) {
                    g = false;
                    break
                }
            }
            if (g) {
                f.push(e)
            }
        }
    }
})();
YAHOO.lang = YAHOO.lang || {};
(function () {
    var n = YAHOO.lang,
        s = Object.prototype,
        q = "[object Array]",
        k = "[object Function]",
        j = "[object Object]",
        r = [],
        m = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;",
            "`": "&#x60;"
        }, p = ["toString", "valueOf"],
        o = {
            isArray: function (a) {
                return s.toString.apply(a) === q
            },
            isBoolean: function (a) {
                return typeof a === "boolean"
            },
            isFunction: function (a) {
                return (typeof a === "function") || s.toString.apply(a) === k
            },
            isNull: function (a) {
                return a === null
            },
            isNumber: function (a) {
                return typeof a === "number" && isFinite(a)
            },
            isObject: function (a) {
                return (a && (typeof a === "object" || n.isFunction(a))) || false
            },
            isString: function (a) {
                return typeof a === "string"
            },
            isUndefined: function (a) {
                return typeof a === "undefined"
            },
            _IEEnumFix: (YAHOO.env.ua.ie) ? function (b, c) {
                var e, f, a;
                for (e = 0; e < p.length; e = e + 1) {
                    f = p[e];
                    a = c[f];
                    if (n.isFunction(a) && a != s[f]) {
                        b[f] = a
                    }
                }
            } : function () {},
            escapeHTML: function (a) {
                return a.replace(/[&<>"'\/`]/g, function (b) {
                    return m[b]
                })
            },
            extend: function (a, f, b) {
                if (!f || !a) {
                    throw new Error("extend failed, please check that all dependencies are included.")
                }
                var c = function () {}, e;
                c.prototype = f.prototype;
                a.prototype = new c();
                a.prototype.constructor = a;
                a.superclass = f.prototype;
                if (f.prototype.constructor == s.constructor) {
                    f.prototype.constructor = f
                }
                if (b) {
                    for (e in b) {
                        if (n.hasOwnProperty(b, e)) {
                            a.prototype[e] = b[e]
                        }
                    }
                    n._IEEnumFix(a.prototype, b)
                }
            },
            augmentObject: function (g, a) {
                if (!a || !g) {
                    throw new Error("Absorb failed, verify dependencies.")
                }
                var e = arguments,
                    b, f, c = e[2];
                if (c && c !== true) {
                    for (b = 2; b < e.length; b = b + 1) {
                        g[e[b]] = a[e[b]]
                    }
                } else {
                    for (f in a) {
                        if (c || !(f in g)) {
                            g[f] = a[f]
                        }
                    }
                    n._IEEnumFix(g, a)
                }
                return g
            },
            augmentProto: function (a, b) {
                if (!b || !a) {
                    throw new Error("Augment failed, verify dependencies.")
                }
                var e = [a.prototype, b.prototype],
                    c;
                for (c = 2; c < arguments.length; c = c + 1) {
                    e.push(arguments[c])
                }
                n.augmentObject.apply(this, e);
                return a
            },
            dump: function (u, c) {
                var g, e, a = [],
                    v = "{...}",
                    h = "f(){...}",
                    b = ", ",
                    f = " => ";
                if (!n.isObject(u)) {
                    return u + ""
                } else {
                    if (u instanceof Date || ("nodeType" in u && "tagName" in u)) {
                        return u
                    } else {
                        if (n.isFunction(u)) {
                            return h
                        }
                    }
                }
                c = (n.isNumber(c)) ? c : 3;
                if (n.isArray(u)) {
                    a.push("[");
                    for (g = 0, e = u.length; g < e; g = g + 1) {
                        if (n.isObject(u[g])) {
                            a.push((c > 0) ? n.dump(u[g], c - 1) : v)
                        } else {
                            a.push(u[g])
                        }
                        a.push(b)
                    }
                    if (a.length > 1) {
                        a.pop()
                    }
                    a.push("]")
                } else {
                    a.push("{");
                    for (g in u) {
                        if (n.hasOwnProperty(u, g)) {
                            a.push(g + f);
                            if (n.isObject(u[g])) {
                                a.push((c > 0) ? n.dump(u[g], c - 1) : v)
                            } else {
                                a.push(u[g])
                            }
                            a.push(b)
                        }
                    }
                    if (a.length > 1) {
                        a.pop()
                    }
                    a.push("}")
                }
                return a.join("")
            },
            substitute: function (c, b, v, R) {
                var I, J, L, f, H, h, g = [],
                    O, a = c.length,
                    N = "dump",
                    K = " ",
                    M = "{",
                    Q = "}",
                    P, e;
                for (;;) {
                    I = c.lastIndexOf(M, a);
                    if (I < 0) {
                        break
                    }
                    J = c.indexOf(Q, I);
                    if (I + 1 > J) {
                        break
                    }
                    O = c.substring(I + 1, J);
                    f = O;
                    h = null;
                    L = f.indexOf(K);
                    if (L > -1) {
                        h = f.substring(L + 1);
                        f = f.substring(0, L)
                    }
                    H = b[f];
                    if (v) {
                        H = v(f, H, h)
                    }
                    if (n.isObject(H)) {
                        if (n.isArray(H)) {
                            H = n.dump(H, parseInt(h, 10))
                        } else {
                            h = h || "";
                            P = h.indexOf(N);
                            if (P > -1) {
                                h = h.substring(4)
                            }
                            e = H.toString();
                            if (e === j || P > -1) {
                                H = n.dump(H, parseInt(h, 10))
                            } else {
                                H = e
                            }
                        }
                    } else {
                        if (!n.isString(H) && !n.isNumber(H)) {
                            H = "~-" + g.length + "-~";
                            g[g.length] = O
                        }
                    }
                    c = c.substring(0, I) + H + c.substring(J + 1);
                    if (R === false) {
                        a = I - 1
                    }
                }
                for (I = g.length - 1; I >= 0; I = I - 1) {
                    c = c.replace(new RegExp("~-" + I + "-~"), "{" + g[I] + "}", "g")
                }
                return c
            },
            trim: function (b) {
                try {
                    return b.replace(/^\s+|\s+$/g, "")
                } catch (a) {
                    return b
                }
            },
            merge: function () {
                var e = {}, b = arguments,
                    c = b.length,
                    a;
                for (a = 0; a < c; a = a + 1) {
                    n.augmentObject(e, b[a], true)
                }
                return e
            },
            later: function (v, f, h, c, b) {
                v = v || 0;
                f = f || {};
                var e = h,
                    x = c,
                    a, g;
                if (n.isString(h)) {
                    e = f[h]
                }
                if (!e) {
                    throw new TypeError("method undefined")
                }
                if (!n.isUndefined(c) && !n.isArray(x)) {
                    x = [c]
                }
                a = function () {
                    e.apply(f, x || r)
                };
                g = (b) ? setInterval(a, v) : setTimeout(a, v);
                return {
                    interval: b,
                    cancel: function () {
                        if (this.interval) {
                            clearInterval(g)
                        } else {
                            clearTimeout(g)
                        }
                    }
                }
            },
            isValue: function (a) {
                return (n.isObject(a) || n.isString(a) || n.isNumber(a) || n.isBoolean(a))
            }
        };
    n.hasOwnProperty = (s.hasOwnProperty) ? function (b, a) {
        return b && b.hasOwnProperty && b.hasOwnProperty(a)
    } : function (b, a) {
        return !n.isUndefined(b[a]) && b.constructor.prototype[a] !== b[a]
    };
    o.augmentObject(n, o, true);
    YAHOO.util.Lang = n;
    n.augment = n.augmentProto;
    YAHOO.augment = n.augmentProto;
    YAHOO.extend = n.extend
})();
YAHOO.register("yahoo", YAHOO, {
        version: "2.9.0",
        build: "2800"
    });
(function () {
    YAHOO.env._id_counter = YAHOO.env._id_counter || 0;
    var aM = YAHOO.util,
        aG = YAHOO.lang,
        af = YAHOO.env.ua,
        aQ = YAHOO.lang.trim,
        ao = {}, ak = {}, aE = /^t(?:able|d|h)$/i,
        au = /color$/i,
        aH = window.document,
        av = aH.documentElement,
        an = "ownerDocument",
        ae = "defaultView",
        W = "documentElement",
        Y = "compatMode",
        aq = "offsetLeft",
        aC = "offsetTop",
        X = "offsetParent",
        at = "parentNode",
        ag = "nodeType",
        aO = "tagName",
        aD = "scrollLeft",
        aj = "scrollTop",
        aB = "getBoundingClientRect",
        G = "getComputedStyle",
        ar = "currentStyle",
        aF = "CSS1Compat",
        ap = "BackCompat",
        al = "class",
        aL = "className",
        aI = "",
        aP = " ",
        Z = "(?:^|\\s)",
        ah = "(?= |$)",
        ax = "g",
        ac = "position",
        am = "fixed",
        aw = "relative",
        ai = "left",
        ad = "top",
        aa = "medium",
        ab = "borderLeftWidth",
        aA = "borderTopWidth",
        aN = af.opera,
        aJ = af.webkit,
        aK = af.gecko,
        ay = af.ie;
    aM.Dom = {
        CUSTOM_ATTRIBUTES: (!av.hasAttribute) ? {
            "for": "htmlFor",
            "class": aL
        } : {
            htmlFor: "for",
            className: al
        },
        DOT_ATTRIBUTES: {
            checked: true
        },
        get: function (g) {
            var c, j, e, f, a, b, h = null;
            if (g) {
                if (typeof g == "string" || typeof g == "number") {
                    c = g + "";
                    g = aH.getElementById(g);
                    b = (g) ? g.attributes : null;
                    if (g && b && b.id && b.id.value === c) {
                        return g
                    } else {
                        if (g && aH.all) {
                            g = null;
                            j = aH.all[c];
                            if (j && j.length) {
                                for (f = 0, a = j.length; f < a; ++f) {
                                    if (j[f].id === c) {
                                        return j[f]
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (aM.Element && g instanceof aM.Element) {
                        g = g.get("element")
                    } else {
                        if (!g.nodeType && "length" in g) {
                            e = [];
                            for (f = 0, a = g.length; f < a; ++f) {
                                e[e.length] = aM.Dom.get(g[f])
                            }
                            g = e
                        }
                    }
                }
                h = g
            }
            return h
        },
        getComputedStyle: function (b, a) {
            if (window[G]) {
                return b[an][ae][G](b, null)[a]
            } else {
                if (b[ar]) {
                    return aM.Dom.IE_ComputedStyle.get(b, a)
                }
            }
        },
        getStyle: function (b, a) {
            return aM.Dom.batch(b, aM.Dom._getStyle, a)
        },
        _getStyle: function () {
            if (window[G]) {
                return function (b, c) {
                    c = (c === "float") ? c = "cssFloat" : aM.Dom._toCamel(c);
                    var e = b.style[c],
                        a;
                    if (!e) {
                        a = b[an][ae][G](b, null);
                        if (a) {
                            e = a[c]
                        }
                    }
                    return e
                }
            } else {
                if (av[ar]) {
                    return function (b, e) {
                        var f;
                        switch (e) {
                        case "opacity":
                            f = 100;
                            try {
                                f = b.filters["DXImageTransform.Microsoft.Alpha"].opacity
                            } catch (c) {
                                try {
                                    f = b.filters("alpha").opacity
                                } catch (a) {}
                            }
                            return f / 100;
                        case "float":
                            e = "styleFloat";
                        default:
                            e = aM.Dom._toCamel(e);
                            f = b[ar] ? b[ar][e] : null;
                            return (b.style[e] || f)
                        }
                    }
                }
            }
        }(),
        setStyle: function (b, a, c) {
            aM.Dom.batch(b, aM.Dom._setStyle, {
                    prop: a,
                    val: c
                })
        },
        _setStyle: function () {
            if (!window.getComputedStyle && aH.documentElement.currentStyle) {
                return function (a, b) {
                    var e = aM.Dom._toCamel(b.prop),
                        c = b.val;
                    if (a) {
                        switch (e) {
                        case "opacity":
                            if (c === "" || c === null || c === 1) {
                                a.style.removeAttribute("filter")
                            } else {
                                if (aG.isString(a.style.filter)) {
                                    a.style.filter = "alpha(opacity=" + c * 100 + ")";
                                    if (!a[ar] || !a[ar].hasLayout) {
                                        a.style.zoom = 1
                                    }
                                }
                            }
                            break;
                        case "float":
                            e = "styleFloat";
                        default:
                            a.style[e] = c
                        }
                    } else {}
                }
            } else {
                return function (a, b) {
                    var e = aM.Dom._toCamel(b.prop),
                        c = b.val;
                    if (a) {
                        if (e == "float") {
                            e = "cssFloat"
                        }
                        a.style[e] = c
                    } else {}
                }
            }
        }(),
        getXY: function (a) {
            return aM.Dom.batch(a, aM.Dom._getXY)
        },
        _canPosition: function (a) {
            return (aM.Dom._getStyle(a, "display") !== "none" && aM.Dom._inDoc(a))
        },
        _getXY: function (f) {
            var e, h, b, k, c, a, j = Math.round,
                g = false;
            if (aM.Dom._canPosition(f)) {
                b = f[aB]();
                k = f[an];
                e = aM.Dom.getDocumentScrollLeft(k);
                h = aM.Dom.getDocumentScrollTop(k);
                g = [b[ai], b[ad]];
                if (c || a) {
                    g[0] -= a;
                    g[1] -= c
                }
                if ((h || e)) {
                    g[0] += e;
                    g[1] += h
                }
                g[0] = j(g[0]);
                g[1] = j(g[1])
            } else {}
            return g
        },
        getX: function (b) {
            var a = function (c) {
                return aM.Dom.getXY(c)[0]
            };
            return aM.Dom.batch(b, a, aM.Dom, true)
        },
        getY: function (b) {
            var a = function (c) {
                return aM.Dom.getXY(c)[1]
            };
            return aM.Dom.batch(b, a, aM.Dom, true)
        },
        setXY: function (b, c, a) {
            aM.Dom.batch(b, aM.Dom._setXY, {
                    pos: c,
                    noRetry: a
                })
        },
        _setXY: function (g, b) {
            var a = aM.Dom._getStyle(g, ac),
                c = aM.Dom.setStyle,
                h = b.pos,
                f = b.noRetry,
                k = [parseInt(aM.Dom.getComputedStyle(g, ai), 10), parseInt(aM.Dom.getComputedStyle(g, ad), 10)],
                j, e;
            j = aM.Dom._getXY(g);
            if (!h || j === false) {
                return false
            }
            if (a == "static") {
                a = aw;
                c(g, ac, a)
            }
            if (isNaN(k[0])) {
                k[0] = (a == aw) ? 0 : g[aq]
            }
            if (isNaN(k[1])) {
                k[1] = (a == aw) ? 0 : g[aC]
            }
            if (h[0] !== null) {
                c(g, ai, h[0] - j[0] + k[0] + "px")
            }
            if (h[1] !== null) {
                c(g, ad, h[1] - j[1] + k[1] + "px")
            }
            if (!f) {
                e = aM.Dom._getXY(g);
                if ((h[0] !== null && e[0] != h[0]) || (h[1] !== null && e[1] != h[1])) {
                    aM.Dom._setXY(g, {
                            pos: h,
                            noRetry: true
                        })
                }
            }
        },
        setX: function (a, b) {
            aM.Dom.setXY(a, [b, null])
        },
        setY: function (b, a) {
            aM.Dom.setXY(b, [null, a])
        },
        getRegion: function (b) {
            var a = function (e) {
                var c = false;
                if (aM.Dom._canPosition(e)) {
                    c = aM.Region.getRegion(e)
                } else {}
                return c
            };
            return aM.Dom.batch(b, a, aM.Dom, true)
        },
        getClientWidth: function () {
            return aM.Dom.getViewportWidth()
        },
        getClientHeight: function () {
            return aM.Dom.getViewportHeight()
        },
        getElementsByClassName: function (n, g, m, h, e, j) {
            g = g || "*";
            m = (m) ? aM.Dom.get(m) : null || aH;
            if (!m) {
                return []
            }
            var f = [],
                k = m.getElementsByTagName(g),
                b = aM.Dom.hasClass;
            for (var c = 0, a = k.length; c < a; ++c) {
                if (b(k[c], n)) {
                    f[f.length] = k[c]
                }
            }
            if (h) {
                aM.Dom.batch(f, h, e, j)
            }
            return f
        },
        hasClass: function (a, b) {
            return aM.Dom.batch(a, aM.Dom._hasClass, b)
        },
        _hasClass: function (e, a) {
            var b = false,
                c;
            if (e && a) {
                c = aM.Dom._getAttribute(e, aL) || aI;
                if (c) {
                    c = c.replace(/\s+/g, aP)
                }
                if (a.exec) {
                    b = a.test(c)
                } else {
                    b = a && (aP + c + aP).indexOf(aP + a + aP) > -1
                }
            } else {}
            return b
        },
        addClass: function (a, b) {
            return aM.Dom.batch(a, aM.Dom._addClass, b)
        },
        _addClass: function (e, a) {
            var b = false,
                c;
            if (e && a) {
                c = aM.Dom._getAttribute(e, aL) || aI;
                if (!aM.Dom._hasClass(e, a)) {
                    aM.Dom.setAttribute(e, aL, aQ(c + aP + a));
                    b = true
                }
            } else {}
            return b
        },
        removeClass: function (a, b) {
            return aM.Dom.batch(a, aM.Dom._removeClass, b)
        },
        _removeClass: function (f, g) {
            var a = false,
                e, c, b;
            if (f && g) {
                e = aM.Dom._getAttribute(f, aL) || aI;
                aM.Dom.setAttribute(f, aL, e.replace(aM.Dom._getClassRegex(g), aI));
                c = aM.Dom._getAttribute(f, aL);
                if (e !== c) {
                    aM.Dom.setAttribute(f, aL, aQ(c));
                    a = true;
                    if (aM.Dom._getAttribute(f, aL) === "") {
                        b = (f.hasAttribute && f.hasAttribute(al)) ? al : aL;
                        f.removeAttribute(b)
                    }
                }
            } else {}
            return a
        },
        replaceClass: function (c, a, b) {
            return aM.Dom.batch(c, aM.Dom._replaceClass, {
                    from: a,
                    to: b
                })
        },
        _replaceClass: function (g, h) {
            var a, c, f, b = false,
                e;
            if (g && h) {
                c = h.from;
                f = h.to;
                if (!f) {
                    b = false
                } else {
                    if (!c) {
                        b = aM.Dom._addClass(g, h.to)
                    } else {
                        if (c !== f) {
                            e = aM.Dom._getAttribute(g, aL) || aI;
                            a = (aP + e.replace(aM.Dom._getClassRegex(c), aP + f).replace(/\s+/g, aP)).split(aM.Dom._getClassRegex(f));
                            a.splice(1, 0, aP + f);
                            aM.Dom.setAttribute(g, aL, aQ(a.join(aI)));
                            b = true
                        }
                    }
                }
            } else {}
            return b
        },
        generateId: function (b, c) {
            c = c || "yui-gen";
            var a = function (f) {
                if (f && f.id) {
                    return f.id
                }
                var e = c + YAHOO.env._id_counter++;
                if (f) {
                    if (f[an] && f[an].getElementById(e)) {
                        return aM.Dom.generateId(f, e + c)
                    }
                    f.id = e
                }
                return e
            };
            return aM.Dom.batch(b, a, aM.Dom, true) || a.apply(aM.Dom, arguments)
        },
        isAncestor: function (a, c) {
            a = aM.Dom.get(a);
            c = aM.Dom.get(c);
            var b = false;
            if ((a && c) && (a[ag] && c[ag])) {
                if (a.contains && a !== c) {
                    b = a.contains(c)
                } else {
                    if (a.compareDocumentPosition) {
                        b = !! (a.compareDocumentPosition(c) & 16)
                    }
                }
            } else {}
            return b
        },
        inDocument: function (b, a) {
            return aM.Dom._inDoc(aM.Dom.get(b), a)
        },
        _inDoc: function (a, c) {
            var b = false;
            if (a && a[aO]) {
                c = c || a[an];
                b = aM.Dom.isAncestor(c[W], a)
            } else {}
            return b
        },
        getElementsBy: function (f, g, n, k, e, m, h) {
            g = g || "*";
            n = (n) ? aM.Dom.get(n) : null || aH;
            var a = (h) ? null : [],
                j;
            if (n) {
                j = n.getElementsByTagName(g);
                for (var c = 0, b = j.length; c < b; ++c) {
                    if (f(j[c])) {
                        if (h) {
                            a = j[c];
                            break
                        } else {
                            a[a.length] = j[c]
                        }
                    }
                }
                if (k) {
                    aM.Dom.batch(a, k, e, m)
                }
            }
            return a
        },
        getElementBy: function (c, b, a) {
            return aM.Dom.getElementsBy(c, b, a, null, null, null, true)
        },
        batch: function (h, c, f, e) {
            var g = [],
                a = (e) ? f : null;
            h = (h && (h[aO] || h.item)) ? h : aM.Dom.get(h);
            if (h && c) {
                if (h[aO] || h.length === undefined) {
                    return c.call(a, h, f)
                }
                for (var b = 0; b < h.length; ++b) {
                    g[g.length] = c.call(a || h[b], h[b], f)
                }
            } else {
                return false
            }
            return g
        },
        getDocumentHeight: function () {
            var a = (aH[Y] != aF || aJ) ? aH.body.scrollHeight : av.scrollHeight,
                b = Math.max(a, aM.Dom.getViewportHeight());
            return b
        },
        getDocumentWidth: function () {
            var a = (aH[Y] != aF || aJ) ? aH.body.scrollWidth : av.scrollWidth,
                b = Math.max(a, aM.Dom.getViewportWidth());
            return b
        },
        getViewportHeight: function () {
            var b = self.innerHeight,
                a = aH[Y];
            if ((a || ay) && !aN) {
                b = (a == aF) ? av.clientHeight : aH.body.clientHeight
            }
            return b
        },
        getViewportWidth: function () {
            var b = self.innerWidth,
                a = aH[Y];
            if (a || ay) {
                b = (a == aF) ? av.clientWidth : aH.body.clientWidth
            }
            return b
        },
        getAncestorBy: function (b, a) {
            while ((b = b[at])) {
                if (aM.Dom._testElement(b, a)) {
                    return b
                }
            }
            return null
        },
        getAncestorByClassName: function (a, b) {
            a = aM.Dom.get(a);
            if (!a) {
                return null
            }
            var c = function (e) {
                return aM.Dom.hasClass(e, b)
            };
            return aM.Dom.getAncestorBy(a, c)
        },
        getAncestorByTagName: function (a, b) {
            a = aM.Dom.get(a);
            if (!a) {
                return null
            }
            var c = function (e) {
                return e[aO] && e[aO].toUpperCase() == b.toUpperCase()
            };
            return aM.Dom.getAncestorBy(a, c)
        },
        getPreviousSiblingBy: function (b, a) {
            while (b) {
                b = b.previousSibling;
                if (aM.Dom._testElement(b, a)) {
                    return b
                }
            }
            return null
        },
        getPreviousSibling: function (a) {
            a = aM.Dom.get(a);
            if (!a) {
                return null
            }
            return aM.Dom.getPreviousSiblingBy(a)
        },
        getNextSiblingBy: function (b, a) {
            while (b) {
                b = b.nextSibling;
                if (aM.Dom._testElement(b, a)) {
                    return b
                }
            }
            return null
        },
        getNextSibling: function (a) {
            a = aM.Dom.get(a);
            if (!a) {
                return null
            }
            return aM.Dom.getNextSiblingBy(a)
        },
        getFirstChildBy: function (b, c) {
            var a = (aM.Dom._testElement(b.firstChild, c)) ? b.firstChild : null;
            return a || aM.Dom.getNextSiblingBy(b.firstChild, c)
        },
        getFirstChild: function (b, a) {
            b = aM.Dom.get(b);
            if (!b) {
                return null
            }
            return aM.Dom.getFirstChildBy(b)
        },
        getLastChildBy: function (b, c) {
            if (!b) {
                return null
            }
            var a = (aM.Dom._testElement(b.lastChild, c)) ? b.lastChild : null;
            return a || aM.Dom.getPreviousSiblingBy(b.lastChild, c)
        },
        getLastChild: function (a) {
            a = aM.Dom.get(a);
            return aM.Dom.getLastChildBy(a)
        },
        getChildrenBy: function (a, c) {
            var e = aM.Dom.getFirstChildBy(a, c),
                b = e ? [e] : [];
            aM.Dom.getNextSiblingBy(e, function (f) {
                if (!c || c(f)) {
                    b[b.length] = f
                }
                return false
            });
            return b
        },
        getChildren: function (a) {
            a = aM.Dom.get(a);
            if (!a) {}
            return aM.Dom.getChildrenBy(a)
        },
        getDocumentScrollLeft: function (a) {
            a = a || aH;
            return Math.max(a[W].scrollLeft, a.body.scrollLeft)
        },
        getDocumentScrollTop: function (a) {
            a = a || aH;
            return Math.max(a[W].scrollTop, a.body.scrollTop)
        },
        insertBefore: function (a, b) {
            a = aM.Dom.get(a);
            b = aM.Dom.get(b);
            if (!a || !b || !b[at]) {
                return null
            }
            return b[at].insertBefore(a, b)
        },
        insertAfter: function (a, b) {
            a = aM.Dom.get(a);
            b = aM.Dom.get(b);
            if (!a || !b || !b[at]) {
                return null
            }
            if (b.nextSibling) {
                return b[at].insertBefore(a, b.nextSibling)
            } else {
                return b[at].appendChild(a)
            }
        },
        getClientRegion: function () {
            var e = aM.Dom.getDocumentScrollTop(),
                a = aM.Dom.getDocumentScrollLeft(),
                c = aM.Dom.getViewportWidth() + a,
                b = aM.Dom.getViewportHeight() + e;
            return new aM.Region(e, c, b, a)
        },
        setAttribute: function (a, b, c) {
            aM.Dom.batch(a, aM.Dom._setAttribute, {
                    attr: b,
                    val: c
                })
        },
        _setAttribute: function (e, a) {
            var b = aM.Dom._toCamel(a.attr),
                c = a.val;
            if (e && e.setAttribute) {
                if (aM.Dom.DOT_ATTRIBUTES[b] && e.tagName && e.tagName != "BUTTON") {
                    e[b] = c
                } else {
                    b = aM.Dom.CUSTOM_ATTRIBUTES[b] || b;
                    e.setAttribute(b, c)
                }
            } else {}
        },
        getAttribute: function (a, b) {
            return aM.Dom.batch(a, aM.Dom._getAttribute, b)
        },
        _getAttribute: function (a, b) {
            var c;
            b = aM.Dom.CUSTOM_ATTRIBUTES[b] || b;
            if (aM.Dom.DOT_ATTRIBUTES[b]) {
                c = a[b]
            } else {
                if (a && "getAttribute" in a) {
                    if (/^(?:href|src)$/.test(b)) {
                        c = a.getAttribute(b, 2)
                    } else {
                        c = a.getAttribute(b)
                    }
                } else {}
            }
            return c
        },
        _toCamel: function (a) {
            var c = ao;

            function b(f, e) {
                return e.toUpperCase()
            }
            return c[a] || (c[a] = a.indexOf("-") === -1 ? a : a.replace(/-([a-z])/gi, b))
        },
        _getClassRegex: function (a) {
            var b;
            if (a !== undefined) {
                if (a.exec) {
                    b = a
                } else {
                    b = ak[a];
                    if (!b) {
                        a = a.replace(aM.Dom._patterns.CLASS_RE_TOKENS, "\\$1");
                        a = a.replace(/\s+/g, aP);
                        b = ak[a] = new RegExp(Z + a + ah, ax)
                    }
                }
            }
            return b
        },
        _patterns: {
            ROOT_TAG: /^body|html$/i,
            CLASS_RE_TOKENS: /([\.\(\)\^\$\*\+\?\|\[\]\{\}\\])/g
        },
        _testElement: function (b, a) {
            return b && b[ag] == 1 && (!a || a(b))
        },
        _calcBorders: function (e, c) {
            var a = parseInt(aM.Dom[G](e, aA), 10) || 0,
                b = parseInt(aM.Dom[G](e, ab), 10) || 0;
            if (aK) {
                if (aE.test(e[aO])) {
                    a = 0;
                    b = 0
                }
            }
            c[0] += b;
            c[1] += a;
            return c
        }
    };
    var az = aM.Dom[G];
    if (af.opera) {
        aM.Dom[G] = function (a, b) {
            var c = az(a, b);
            if (au.test(b)) {
                c = aM.Dom.Color.toRGB(c)
            }
            return c
        }
    }
    if (af.webkit) {
        aM.Dom[G] = function (a, b) {
            var c = az(a, b);
            if (c === "rgba(0, 0, 0, 0)") {
                c = "transparent"
            }
            return c
        }
    }
    if (af.ie && af.ie >= 8) {
        aM.Dom.DOT_ATTRIBUTES.type = true
    }
})();
YAHOO.util.Region = function (g, f, b, h) {
    this.top = g;
    this.y = g;
    this[1] = g;
    this.right = f;
    this.bottom = b;
    this.left = h;
    this.x = h;
    this[0] = h;
    this.width = this.right - this.left;
    this.height = this.bottom - this.top
};
YAHOO.util.Region.prototype.contains = function (b) {
    return (b.left >= this.left && b.right <= this.right && b.top >= this.top && b.bottom <= this.bottom)
};
YAHOO.util.Region.prototype.getArea = function () {
    return ((this.bottom - this.top) * (this.right - this.left))
};
YAHOO.util.Region.prototype.intersect = function (g) {
    var j = Math.max(this.top, g.top),
        h = Math.min(this.right, g.right),
        b = Math.min(this.bottom, g.bottom),
        k = Math.max(this.left, g.left);
    if (b >= j && h >= k) {
        return new YAHOO.util.Region(j, h, b, k)
    } else {
        return null
    }
};
YAHOO.util.Region.prototype.union = function (g) {
    var j = Math.min(this.top, g.top),
        h = Math.max(this.right, g.right),
        b = Math.max(this.bottom, g.bottom),
        k = Math.min(this.left, g.left);
    return new YAHOO.util.Region(j, h, b, k)
};
YAHOO.util.Region.prototype.toString = function () {
    return ("Region {top: " + this.top + ", right: " + this.right + ", bottom: " + this.bottom + ", left: " + this.left + ", height: " + this.height + ", width: " + this.width + "}")
};
YAHOO.util.Region.getRegion = function (k) {
    var h = YAHOO.util.Dom.getXY(k),
        m = h[1],
        j = h[0] + k.offsetWidth,
        b = h[1] + k.offsetHeight,
        n = h[0];
    return new YAHOO.util.Region(m, j, b, n)
};
YAHOO.util.Point = function (e, c) {
    if (YAHOO.lang.isArray(e)) {
        c = e[1];
        e = e[0]
    }
    YAHOO.util.Point.superclass.constructor.call(this, c, e, c, e)
};
YAHOO.extend(YAHOO.util.Point, YAHOO.util.Region);
(function () {
    var S = YAHOO.util,
        T = "clientTop",
        O = "clientLeft",
        K = "parentNode",
        J = "right",
        x = "hasLayout",
        L = "px",
        z = "opacity",
        I = "auto",
        Q = "borderLeftWidth",
        N = "borderTopWidth",
        E = "borderRightWidth",
        y = "borderBottomWidth",
        B = "visible",
        D = "transparent",
        G = "height",
        P = "width",
        M = "style",
        A = "currentStyle",
        C = /^width|height$/,
        F = /^(\d[.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz|%){1}?/i,
        H = {
            get: function (b, c) {
                var e = "",
                    a = b[A][c];
                if (c === z) {
                    e = S.Dom.getStyle(b, z)
                } else {
                    if (!a || (a.indexOf && a.indexOf(L) > -1)) {
                        e = a
                    } else {
                        if (S.Dom.IE_COMPUTED[c]) {
                            e = S.Dom.IE_COMPUTED[c](b, c)
                        } else {
                            if (F.test(a)) {
                                e = S.Dom.IE.ComputedStyle.getPixel(b, c)
                            } else {
                                e = a
                            }
                        }
                    }
                }
                return e
            },
            getOffset: function (g, c) {
                var j = g[A][c],
                    b = c.charAt(0).toUpperCase() + c.substr(1),
                    f = "offset" + b,
                    h = "pixel" + b,
                    a = "",
                    e;
                if (j == I) {
                    e = g[f];
                    if (e === undefined) {
                        a = 0
                    }
                    a = e;
                    if (C.test(c)) {
                        g[M][c] = e;
                        if (g[f] > e) {
                            a = e - (g[f] - e)
                        }
                        g[M][c] = I
                    }
                } else {
                    if (!g[M][h] && !g[M][c]) {
                        g[M][c] = j
                    }
                    a = g[M][h]
                }
                return a + L
            },
            getBorderWidth: function (a, b) {
                var c = null;
                if (!a[A][x]) {
                    a[M].zoom = 1
                }
                switch (b) {
                case N:
                    c = a[T];
                    break;
                case y:
                    c = a.offsetHeight - a.clientHeight - a[T];
                    break;
                case Q:
                    c = a[O];
                    break;
                case E:
                    c = a.offsetWidth - a.clientWidth - a[O];
                    break
                }
                return c + L
            },
            getPixel: function (f, b) {
                var a = null,
                    e = f[A][J],
                    c = f[A][b];
                f[M][J] = c;
                a = f[M].pixelRight;
                f[M][J] = e;
                return a + L
            },
            getMargin: function (c, a) {
                var b;
                if (c[A][a] == I) {
                    b = 0 + L
                } else {
                    b = S.Dom.IE.ComputedStyle.getPixel(c, a)
                }
                return b
            },
            getVisibility: function (c, a) {
                var b;
                while ((b = c[A]) && b[a] == "inherit") {
                    c = c[K]
                }
                return (b) ? b[a] : B
            },
            getColor: function (b, a) {
                return S.Dom.Color.toRGB(b[A][a]) || D
            },
            getBorderColor: function (e, b) {
                var c = e[A],
                    a = c[b] || c.color;
                return S.Dom.Color.toRGB(S.Dom.Color.toHex(a))
            }
        }, R = {};
    R.top = R.right = R.bottom = R.left = R[P] = R[G] = H.getOffset;
    R.color = H.getColor;
    R[N] = R[E] = R[y] = R[Q] = H.getBorderWidth;
    R.marginTop = R.marginRight = R.marginBottom = R.marginLeft = H.getMargin;
    R.visibility = H.getVisibility;
    R.borderColor = R.borderTopColor = R.borderRightColor = R.borderBottomColor = R.borderLeftColor = H.getBorderColor;
    S.Dom.IE_COMPUTED = R;
    S.Dom.IE_ComputedStyle = H
})();
(function () {
    var h = "toString",
        f = parseInt,
        e = RegExp,
        g = YAHOO.util;
    g.Dom.Color = {
        KEYWORDS: {
            black: "000",
            silver: "c0c0c0",
            gray: "808080",
            white: "fff",
            maroon: "800000",
            red: "f00",
            purple: "800080",
            fuchsia: "f0f",
            green: "008000",
            lime: "0f0",
            olive: "808000",
            yellow: "ff0",
            navy: "000080",
            blue: "00f",
            teal: "008080",
            aqua: "0ff"
        },
        re_RGB: /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,
        re_hex: /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,
        re_hex3: /([0-9A-F])/gi,
        toRGB: function (a) {
            if (!g.Dom.Color.re_RGB.test(a)) {
                a = g.Dom.Color.toHex(a)
            }
            if (g.Dom.Color.re_hex.exec(a)) {
                a = "rgb(" + [f(e.$1, 16), f(e.$2, 16), f(e.$3, 16)].join(", ") + ")"
            }
            return a
        },
        toHex: function (a) {
            a = g.Dom.Color.KEYWORDS[a] || a;
            if (g.Dom.Color.re_RGB.exec(a)) {
                a = [Number(e.$1).toString(16), Number(e.$2).toString(16), Number(e.$3).toString(16)];
                for (var b = 0; b < a.length; b++) {
                    if (a[b].length < 2) {
                        a[b] = "0" + a[b]
                    }
                }
                a = a.join("")
            }
            if (a.length < 6) {
                a = a.replace(g.Dom.Color.re_hex3, "$1$1")
            }
            if (a !== "transparent" && a.indexOf("#") < 0) {
                a = "#" + a
            }
            return a.toUpperCase()
        }
    }
}());
YAHOO.register("dom", YAHOO.util.Dom, {
        version: "2.9.0",
        build: "2800"
    });
YAHOO.util.CustomEvent = function (m, n, g, h, k) {
    this.type = m;
    this.scope = n || window;
    this.silent = g;
    this.fireOnce = k;
    this.fired = false;
    this.firedWith = null;
    this.signature = h || YAHOO.util.CustomEvent.LIST;
    this.subscribers = [];
    if (!this.silent) {}
    var j = "_YUICEOnSubscribe";
    if (m !== j) {
        this.subscribeEvent = new YAHOO.util.CustomEvent(j, this, true)
    }
    this.lastError = null
};
YAHOO.util.CustomEvent.LIST = 0;
YAHOO.util.CustomEvent.FLAT = 1;
YAHOO.util.CustomEvent.prototype = {
    subscribe: function (e, h, g) {
        if (!e) {
            throw new Error("Invalid callback for subscriber to '" + this.type + "'")
        }
        if (this.subscribeEvent) {
            this.subscribeEvent.fire(e, h, g)
        }
        var f = new YAHOO.util.Subscriber(e, h, g);
        if (this.fireOnce && this.fired) {
            this.notify(f, this.firedWith)
        } else {
            this.subscribers.push(f)
        }
    },
    unsubscribe: function (m, j) {
        if (!m) {
            return this.unsubscribeAll()
        }
        var k = false;
        for (var g = 0, h = this.subscribers.length; g < h; ++g) {
            var n = this.subscribers[g];
            if (n && n.contains(m, j)) {
                this._delete(g);
                k = true
            }
        }
        return k
    },
    fire: function () {
        this.lastError = null;
        var m = [],
            k = this.subscribers.length;
        var q = [].slice.call(arguments, 0),
            r = true,
            o, j = false;
        if (this.fireOnce) {
            if (this.fired) {
                return true
            } else {
                this.firedWith = q
            }
        }
        this.fired = true;
        if (!k && this.silent) {
            return true
        }
        if (!this.silent) {}
        var p = this.subscribers.slice();
        for (o = 0; o < k; ++o) {
            var n = p[o];
            if (!n || !n.fn) {
                j = true
            } else {
                r = this.notify(n, q);
                if (false === r) {
                    if (!this.silent) {}
                    break
                }
            }
        }
        return (r !== false)
    },
    notify: function (n, q) {
        var e, k = null,
            o = n.getScope(this.scope),
            j = YAHOO.util.Event.throwErrors;
        if (!this.silent) {}
        if (this.signature == YAHOO.util.CustomEvent.FLAT) {
            if (q.length > 0) {
                k = q[0]
            }
            try {
                e = n.fn.call(o, k, n.obj)
            } catch (m) {
                this.lastError = m;
                if (j) {
                    throw m
                }
            }
        } else {
            try {
                e = n.fn.call(o, this.type, q, n.obj)
            } catch (p) {
                this.lastError = p;
                if (j) {
                    throw p
                }
            }
        }
        return e
    },
    unsubscribeAll: function () {
        var e = this.subscribers.length,
            c;
        for (c = e - 1; c > -1; c--) {
            this._delete(c)
        }
        this.subscribers = [];
        return e
    },
    _delete: function (e) {
        var c = this.subscribers[e];
        if (c) {
            delete c.fn;
            delete c.obj
        }
        this.subscribers.splice(e, 1)
    },
    toString: function () {
        return "CustomEvent: '" + this.type + "', context: " + this.scope
    }
};
YAHOO.util.Subscriber = function (f, e, g) {
    this.fn = f;
    this.obj = YAHOO.lang.isUndefined(e) ? null : e;
    this.overrideContext = g
};
YAHOO.util.Subscriber.prototype.getScope = function (b) {
    if (this.overrideContext) {
        if (this.overrideContext === true) {
            return this.obj
        } else {
            return this.overrideContext
        }
    }
    return b
};
YAHOO.util.Subscriber.prototype.contains = function (e, c) {
    if (c) {
        return (this.fn == e && this.obj == c)
    } else {
        return (this.fn == e)
    }
};
YAHOO.util.Subscriber.prototype.toString = function () {
    return "Subscriber { obj: " + this.obj + ", overrideContext: " + (this.overrideContext || "no") + " }"
};
if (!YAHOO.util.Event) {
    YAHOO.util.Event = function () {
        var o = false,
            n = [],
            k = [],
            u = 0,
            q = [],
            t = 0,
            s = {
                63232: 38,
                63233: 40,
                63234: 37,
                63235: 39,
                63276: 33,
                63277: 34,
                25: 9
            }, r = YAHOO.env.ua.ie,
            p = "focusin",
            m = "focusout";
        return {
            POLL_RETRYS: 500,
            POLL_INTERVAL: 40,
            EL: 0,
            TYPE: 1,
            FN: 2,
            WFN: 3,
            UNLOAD_OBJ: 3,
            ADJ_SCOPE: 4,
            OBJ: 5,
            OVERRIDE: 6,
            CAPTURE: 7,
            lastError: null,
            isSafari: YAHOO.env.ua.webkit,
            webkit: YAHOO.env.ua.webkit,
            isIE: r,
            _interval: null,
            _dri: null,
            _specialTypes: {
                focusin: (r ? "focusin" : "focus"),
                focusout: (r ? "focusout" : "blur")
            },
            DOMReady: false,
            throwErrors: false,
            startInterval: function () {
                if (!this._interval) {
                    this._interval = YAHOO.lang.later(this.POLL_INTERVAL, this, this._tryPreloadAttach, null, true)
                }
            },
            onAvailable: function (e, a, g, f, h) {
                var c = (YAHOO.lang.isString(e)) ? [e] : e;
                for (var b = 0; b < c.length; b = b + 1) {
                    q.push({
                            id: c[b],
                            fn: a,
                            obj: g,
                            overrideContext: f,
                            checkReady: h
                        })
                }
                u = this.POLL_RETRYS;
                this.startInterval()
            },
            onContentReady: function (e, c, b, a) {
                this.onAvailable(e, c, b, a, true)
            },
            onDOMReady: function () {
                this.DOMReadyEvent.subscribe.apply(this.DOMReadyEvent, arguments)
            },
            _addListener: function (g, j, C, c, E, z) {
                if (!C || !C.call) {
                    return false
                }
                if (this._isValidCollection(g)) {
                    var B = true;
                    for (var b = 0, F = g.length; b < F; ++b) {
                        B = this.on(g[b], j, C, c, E) && B
                    }
                    return B
                } else {
                    if (YAHOO.lang.isString(g)) {
                        var e = this.getEl(g);
                        if (e) {
                            g = e
                        } else {
                            this.onAvailable(g, function () {
                                YAHOO.util.Event._addListener(g, j, C, c, E, z)
                            });
                            return true
                        }
                    }
                } if (!g) {
                    return false
                }
                if ("unload" == j && c !== this) {
                    k[k.length] = [g, j, C, c, E];
                    return true
                }
                var h = g;
                if (E) {
                    if (E === true) {
                        h = c
                    } else {
                        h = E
                    }
                }
                var f = function (v) {
                    return C.call(h, YAHOO.util.Event.getEvent(v, g), c)
                };
                var A = [g, j, C, f, h, c, E, z];
                var a = n.length;
                n[a] = A;
                try {
                    this._simpleAdd(g, j, f, z)
                } catch (D) {
                    this.lastError = D;
                    this.removeListener(g, j, C);
                    return false
                }
                return true
            },
            _getType: function (a) {
                return this._specialTypes[a] || a
            },
            addListener: function (a, e, b, g, f) {
                var c = ((e == p || e == m) && !YAHOO.env.ua.ie) ? true : false;
                return this._addListener(a, this._getType(e), b, g, f, c)
            },
            addFocusListener: function (b, c, a, e) {
                return this.on(b, p, c, a, e)
            },
            removeFocusListener: function (a, b) {
                return this.removeListener(a, p, b)
            },
            addBlurListener: function (b, c, a, e) {
                return this.on(b, m, c, a, e)
            },
            removeBlurListener: function (a, b) {
                return this.removeListener(a, m, b)
            },
            removeListener: function (h, j, a) {
                var g, c, v;
                j = this._getType(j);
                if (typeof h == "string") {
                    h = this.getEl(h)
                } else {
                    if (this._isValidCollection(h)) {
                        var y = true;
                        for (g = h.length - 1; g > -1; g--) {
                            y = (this.removeListener(h[g], j, a) && y)
                        }
                        return y
                    }
                } if (!a || !a.call) {
                    return this.purgeElement(h, false, j)
                }
                if ("unload" == j) {
                    for (g = k.length - 1; g > -1; g--) {
                        v = k[g];
                        if (v && v[0] == h && v[1] == j && v[2] == a) {
                            k.splice(g, 1);
                            return true
                        }
                    }
                    return false
                }
                var f = null;
                var e = arguments[3];
                if ("undefined" === typeof e) {
                    e = this._getCacheIndex(n, h, j, a)
                }
                if (e >= 0) {
                    f = n[e]
                }
                if (!h || !f) {
                    return false
                }
                var x = f[this.CAPTURE] === true ? true : false;
                try {
                    this._simpleRemove(h, j, f[this.WFN], x)
                } catch (b) {
                    this.lastError = b;
                    return false
                }
                delete n[e][this.WFN];
                delete n[e][this.FN];
                n.splice(e, 1);
                return true
            },
            getTarget: function (a, b) {
                var c = a.target || a.srcElement;
                return this.resolveTextNode(c)
            },
            resolveTextNode: function (a) {
                try {
                    if (a && 3 == a.nodeType) {
                        return a.parentNode
                    }
                } catch (b) {
                    return null
                }
                return a
            },
            getPageX: function (a) {
                var b = a.pageX;
                if (!b && 0 !== b) {
                    b = a.clientX || 0;
                    if (this.isIE) {
                        b += this._getScrollLeft()
                    }
                }
                return b
            },
            getPageY: function (b) {
                var a = b.pageY;
                if (!a && 0 !== a) {
                    a = b.clientY || 0;
                    if (this.isIE) {
                        a += this._getScrollTop()
                    }
                }
                return a
            },
            getXY: function (a) {
                return [this.getPageX(a), this.getPageY(a)]
            },
            getRelatedTarget: function (a) {
                var b = a.relatedTarget;
                if (!b) {
                    if (a.type == "mouseout") {
                        b = a.toElement
                    } else {
                        if (a.type == "mouseover") {
                            b = a.fromElement
                        }
                    }
                }
                return this.resolveTextNode(b)
            },
            getTime: function (a) {
                if (!a.time) {
                    var b = new Date().getTime();
                    try {
                        a.time = b
                    } catch (c) {
                        this.lastError = c;
                        return b
                    }
                }
                return a.time
            },
            stopEvent: function (a) {
                this.stopPropagation(a);
                this.preventDefault(a)
            },
            stopPropagation: function (a) {
                if (a.stopPropagation) {
                    a.stopPropagation()
                } else {
                    a.cancelBubble = true
                }
            },
            preventDefault: function (a) {
                if (a.preventDefault) {
                    a.preventDefault()
                } else {
                    a.returnValue = false
                }
            },
            getEvent: function (a, c) {
                var b = a || window.event;
                if (!b) {
                    var e = this.getEvent.caller;
                    while (e) {
                        b = e.arguments[0];
                        if (b && Event == b.constructor) {
                            break
                        }
                        e = e.caller
                    }
                }
                return b
            },
            getCharCode: function (a) {
                var b = a.keyCode || a.charCode || 0;
                if (YAHOO.env.ua.webkit && (b in s)) {
                    b = s[b]
                }
                return b
            },
            _getCacheIndex: function (h, e, c, f) {
                for (var g = 0, a = h.length; g < a; g = g + 1) {
                    var b = h[g];
                    if (b && b[this.FN] == f && b[this.EL] == e && b[this.TYPE] == c) {
                        return g
                    }
                }
                return -1
            },
            generateId: function (b) {
                var a = b.id;
                if (!a) {
                    a = "yuievtautoid-" + t;
                    ++t;
                    b.id = a
                }
                return a
            },
            _isValidCollection: function (a) {
                try {
                    return (a && typeof a !== "string" && a.length && !a.tagName && !a.alert && typeof a[0] !== "undefined")
                } catch (b) {
                    return false
                }
            },
            elCache: {},
            getEl: function (a) {
                return (typeof a === "string") ? document.getElementById(a) : a
            },
            clearCache: function () {},
            DOMReadyEvent: new YAHOO.util.CustomEvent("DOMReady", YAHOO, 0, 0, 1),
            _load: function (a) {
                if (!o) {
                    o = true;
                    var b = YAHOO.util.Event;
                    b._ready();
                    b._tryPreloadAttach()
                }
            },
            _ready: function (a) {
                var b = YAHOO.util.Event;
                if (!b.DOMReady) {
                    b.DOMReady = true;
                    b.DOMReadyEvent.fire();
                    b._simpleRemove(document, "DOMContentLoaded", b._ready)
                }
            },
            _tryPreloadAttach: function () {
                if (q.length === 0) {
                    u = 0;
                    if (this._interval) {
                        this._interval.cancel();
                        this._interval = null
                    }
                    return
                }
                if (this.locked) {
                    return
                }
                if (this.isIE) {
                    if (!this.DOMReady) {
                        this.startInterval();
                        return
                    }
                }
                this.locked = true;
                var f = !o;
                if (!f) {
                    f = (u > 0 && q.length > 0)
                }
                var g = [];
                var e = function (x, v) {
                    var y = x;
                    if (v.overrideContext) {
                        if (v.overrideContext === true) {
                            y = v.obj
                        } else {
                            y = v.overrideContext
                        }
                    }
                    v.fn.call(y, v.obj)
                };
                var b, c, h, j, a = [];
                for (b = 0, c = q.length; b < c; b = b + 1) {
                    h = q[b];
                    if (h) {
                        j = this.getEl(h.id);
                        if (j) {
                            if (h.checkReady) {
                                if (o || j.nextSibling || !f) {
                                    a.push(h);
                                    q[b] = null
                                }
                            } else {
                                e(j, h);
                                q[b] = null
                            }
                        } else {
                            g.push(h)
                        }
                    }
                }
                for (b = 0, c = a.length; b < c; b = b + 1) {
                    h = a[b];
                    e(this.getEl(h.id), h)
                }
                u--;
                if (f) {
                    for (b = q.length - 1; b > -1; b--) {
                        h = q[b];
                        if (!h || !h.id) {
                            q.splice(b, 1)
                        }
                    }
                    this.startInterval()
                } else {
                    if (this._interval) {
                        this._interval.cancel();
                        this._interval = null
                    }
                }
                this.locked = false
            },
            purgeElement: function (g, f, c) {
                var j = (YAHOO.lang.isString(g)) ? this.getEl(g) : g;
                var e = this.getListeners(j, c),
                    h, b;
                if (e) {
                    for (h = e.length - 1; h > -1; h--) {
                        var a = e[h];
                        this.removeListener(j, a.type, a.fn)
                    }
                }
                if (f && j && j.childNodes) {
                    for (h = 0, b = j.childNodes.length; h < b; ++h) {
                        this.purgeElement(j.childNodes[h], f, c)
                    }
                }
            },
            getListeners: function (f, h) {
                var b = [],
                    g;
                if (!h) {
                    g = [n, k]
                } else {
                    if (h === "unload") {
                        g = [k]
                    } else {
                        h = this._getType(h);
                        g = [n]
                    }
                }
                var x = (YAHOO.lang.isString(f)) ? this.getEl(f) : f;
                for (var c = 0; c < g.length; c = c + 1) {
                    var j = g[c];
                    if (j) {
                        for (var a = 0, v = j.length; a < v; ++a) {
                            var e = j[a];
                            if (e && e[this.EL] === x && (!h || h === e[this.TYPE])) {
                                b.push({
                                        type: e[this.TYPE],
                                        fn: e[this.FN],
                                        obj: e[this.OBJ],
                                        adjust: e[this.OVERRIDE],
                                        scope: e[this.ADJ_SCOPE],
                                        index: a
                                    })
                            }
                        }
                    }
                }
                return (b.length) ? b : null
            },
            _unload: function (A) {
                var g = YAHOO.util.Event,
                    c, e, f, a, b, z = k.slice(),
                    h;
                for (c = 0, a = k.length; c < a; ++c) {
                    f = z[c];
                    if (f) {
                        try {
                            h = window;
                            if (f[g.ADJ_SCOPE]) {
                                if (f[g.ADJ_SCOPE] === true) {
                                    h = f[g.UNLOAD_OBJ]
                                } else {
                                    h = f[g.ADJ_SCOPE]
                                }
                            }
                            f[g.FN].call(h, g.getEvent(A, f[g.EL]), f[g.UNLOAD_OBJ])
                        } catch (j) {}
                        z[c] = null
                    }
                }
                f = null;
                h = null;
                k = null;
                if (n) {
                    for (e = n.length - 1; e > -1; e--) {
                        f = n[e];
                        if (f) {
                            try {
                                g.removeListener(f[g.EL], f[g.TYPE], f[g.FN], e)
                            } catch (x) {}
                        }
                    }
                    f = null
                }
                try {
                    g._simpleRemove(window, "unload", g._unload);
                    g._simpleRemove(window, "load", g._load)
                } catch (y) {}
            },
            _getScrollLeft: function () {
                return this._getScroll()[1]
            },
            _getScrollTop: function () {
                return this._getScroll()[0]
            },
            _getScroll: function () {
                var b = document.documentElement,
                    a = document.body;
                if (b && (b.scrollTop || b.scrollLeft)) {
                    return [b.scrollTop, b.scrollLeft]
                } else {
                    if (a) {
                        return [a.scrollTop, a.scrollLeft]
                    } else {
                        return [0, 0]
                    }
                }
            },
            regCE: function () {},
            _simpleAdd: function () {
                if (window.addEventListener) {
                    return function (a, e, b, c) {
                        a.addEventListener(e, b, (c))
                    }
                } else {
                    if (window.attachEvent) {
                        return function (a, e, b, c) {
                            a.attachEvent("on" + e, b)
                        }
                    } else {
                        return function () {}
                    }
                }
            }(),
            _simpleRemove: function () {
                if (window.removeEventListener) {
                    return function (a, e, b, c) {
                        a.removeEventListener(e, b, (c))
                    }
                } else {
                    if (window.detachEvent) {
                        return function (b, a, c) {
                            b.detachEvent("on" + a, c)
                        }
                    } else {
                        return function () {}
                    }
                }
            }()
        }
    }();
    (function () {
        var e = YAHOO.util.Event;
        e.on = e.addListener;
        e.onFocus = e.addFocusListener;
        e.onBlur = e.addBlurListener;
        /* DOMReady: based on work by: Dean Edwards/John Resig/Matthias Miller/Diego Perini */
        if (e.isIE) {
            if (self !== self.top) {
                document.onreadystatechange = function () {
                    if (document.readyState == "complete") {
                        document.onreadystatechange = null;
                        e._ready()
                    }
                }
            } else {
                YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach, YAHOO.util.Event, true);
                var c = document.createElement("p");
                e._dri = setInterval(function () {
                    try {
                        c.doScroll("left");
                        clearInterval(e._dri);
                        e._dri = null;
                        e._ready();
                        c = null
                    } catch (a) {}
                }, e.POLL_INTERVAL)
            }
        } else {
            if (e.webkit && e.webkit < 525) {
                e._dri = setInterval(function () {
                    var a = document.readyState;
                    if ("loaded" == a || "complete" == a) {
                        clearInterval(e._dri);
                        e._dri = null;
                        e._ready()
                    }
                }, e.POLL_INTERVAL)
            } else {
                e._simpleAdd(document, "DOMContentLoaded", e._ready)
            }
        }
        e._simpleAdd(window, "load", e._load);
        e._simpleAdd(window, "unload", e._unload);
        e._tryPreloadAttach()
    })()
}
YAHOO.util.EventProvider = function () {};
YAHOO.util.EventProvider.prototype = {
    __yui_events: null,
    __yui_subscribers: null,
    subscribe: function (h, n, j, k) {
        this.__yui_events = this.__yui_events || {};
        var m = this.__yui_events[h];
        if (m) {
            m.subscribe(n, j, k)
        } else {
            this.__yui_subscribers = this.__yui_subscribers || {};
            var g = this.__yui_subscribers;
            if (!g[h]) {
                g[h] = []
            }
            g[h].push({
                    fn: n,
                    obj: j,
                    overrideContext: k
                })
        }
    },
    unsubscribe: function (p, n, k) {
        this.__yui_events = this.__yui_events || {};
        var j = this.__yui_events;
        if (p) {
            var m = j[p];
            if (m) {
                return m.unsubscribe(n, k)
            }
        } else {
            var h = true;
            for (var o in j) {
                if (YAHOO.lang.hasOwnProperty(j, o)) {
                    h = h && j[o].unsubscribe(n, k)
                }
            }
            return h
        }
        return false
    },
    unsubscribeAll: function (b) {
        return this.unsubscribe(b)
    },
    createEvent: function (h, k) {
        this.__yui_events = this.__yui_events || {};
        var n = k || {}, o = this.__yui_events,
            m;
        if (o[h]) {} else {
            m = new YAHOO.util.CustomEvent(h, n.scope || this, n.silent, YAHOO.util.CustomEvent.FLAT, n.fireOnce);
            o[h] = m;
            if (n.onSubscribeCallback) {
                m.subscribeEvent.subscribe(n.onSubscribeCallback)
            }
            this.__yui_subscribers = this.__yui_subscribers || {};
            var j = this.__yui_subscribers[h];
            if (j) {
                for (var p = 0; p < j.length; ++p) {
                    m.subscribe(j[p].fn, j[p].obj, j[p].overrideContext)
                }
            }
        }
        return o[h]
    },
    fireEvent: function (e) {
        this.__yui_events = this.__yui_events || {};
        var g = this.__yui_events[e];
        if (!g) {
            return null
        }
        var f = [];
        for (var h = 1; h < arguments.length; ++h) {
            f.push(arguments[h])
        }
        return g.fire.apply(g, f)
    },
    hasEvent: function (b) {
        if (this.__yui_events) {
            if (this.__yui_events[b]) {
                return true
            }
        }
        return false
    }
};
(function () {
    var f = YAHOO.util.Event,
        g = YAHOO.lang;
    YAHOO.util.KeyListener = function (m, a, k, j) {
        if (!m) {} else {
            if (!a) {} else {
                if (!k) {}
            }
        } if (!j) {
            j = YAHOO.util.KeyListener.KEYDOWN
        }
        var c = new YAHOO.util.CustomEvent("keyPressed");
        this.enabledEvent = new YAHOO.util.CustomEvent("enabled");
        this.disabledEvent = new YAHOO.util.CustomEvent("disabled");
        if (g.isString(m)) {
            m = document.getElementById(m)
        }
        if (g.isFunction(k)) {
            c.subscribe(k)
        } else {
            c.subscribe(k.fn, k.scope, k.correctScope)
        }

        function b(s, t) {
            if (!a.shift) {
                a.shift = false
            }
            if (!a.alt) {
                a.alt = false
            }
            if (!a.ctrl) {
                a.ctrl = false
            }
            if (s.shiftKey == a.shift && s.altKey == a.alt && s.ctrlKey == a.ctrl) {
                var r, h = a.keys,
                    p;
                if (YAHOO.lang.isArray(h)) {
                    for (var q = 0; q < h.length; q++) {
                        r = h[q];
                        p = f.getCharCode(s);
                        if (r == p) {
                            c.fire(p, s);
                            break
                        }
                    }
                } else {
                    p = f.getCharCode(s);
                    if (h == p) {
                        c.fire(p, s)
                    }
                }
            }
        }
        this.enable = function () {
            if (!this.enabled) {
                f.on(m, j, b);
                this.enabledEvent.fire(a)
            }
            this.enabled = true
        };
        this.disable = function () {
            if (this.enabled) {
                f.removeListener(m, j, b);
                this.disabledEvent.fire(a)
            }
            this.enabled = false
        };
        this.toString = function () {
            return "KeyListener [" + a.keys + "] " + m.tagName + (m.id ? "[" + m.id + "]" : "")
        }
    };
    var e = YAHOO.util.KeyListener;
    e.KEYDOWN = "keydown";
    e.KEYUP = "keyup";
    e.KEY = {
        ALT: 18,
        BACK_SPACE: 8,
        CAPS_LOCK: 20,
        CONTROL: 17,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        META: 224,
        NUM_LOCK: 144,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PAUSE: 19,
        PRINTSCREEN: 44,
        RIGHT: 39,
        SCROLL_LOCK: 145,
        SHIFT: 16,
        SPACE: 32,
        TAB: 9,
        UP: 38
    }
})();
YAHOO.register("event", YAHOO.util.Event, {
        version: "2.9.0",
        build: "2800"
    });
YAHOO.register("yahoo-dom-event", YAHOO, {
        version: "2.9.0",
        build: "2800"
    });
(function () {
    var q = document,
        y = q.createElement("p"),
        v = y.style,
        x = YAHOO.lang,
        n = {}, r = {}, u = 0,
        p = ("cssFloat" in v) ? "cssFloat" : "styleFloat",
        t, z, o;
    z = ("opacity" in v) ? function (a) {
        a.opacity = ""
    } : function (a) {
        a.filter = ""
    };
    v.border = "1px solid red";
    v.border = "";
    o = v.borderLeft ? function (b, a) {
        var c;
        if (a !== p && a.toLowerCase().indexOf("float") != -1) {
            a = p
        }
        if (typeof b[a] === "string") {
            switch (a) {
            case "opacity":
            case "filter":
                z(b);
                break;
            case "font":
                b.font = b.fontStyle = b.fontVariant = b.fontWeight = b.fontSize = b.lineHeight = b.fontFamily = "";
                break;
            default:
                for (c in b) {
                    if (c.indexOf(a) === 0) {
                        b[c] = ""
                    }
                }
            }
        }
    } : function (a, b) {
        if (b !== p && b.toLowerCase().indexOf("float") != -1) {
            b = p
        }
        if (x.isString(a[b])) {
            if (b === "opacity") {
                z(a)
            } else {
                a[b] = ""
            }
        }
    };

    function s(m, c) {
        var h, B, j, k = {}, e, g, a, A, f, b;
        if (!(this instanceof s)) {
            return new s(m, c)
        }
        B = m && (m.nodeName ? m : q.getElementById(m));
        if (m && r[m]) {
            return r[m]
        } else {
            if (B && B.yuiSSID && r[B.yuiSSID]) {
                return r[B.yuiSSID]
            }
        } if (!B || !/^(?:style|link)$/i.test(B.nodeName)) {
            B = q.createElement("style");
            B.type = "text/css"
        }
        if (x.isString(m)) {
            if (m.indexOf("{") != -1) {
                if (B.styleSheet) {
                    B.styleSheet.cssText = m
                } else {
                    B.appendChild(q.createTextNode(m))
                }
            } else {
                if (!c) {
                    c = m
                }
            }
        }
        if (!B.parentNode || B.parentNode.nodeName.toLowerCase() !== "head") {
            h = (B.ownerDocument || q).getElementsByTagName("head")[0];
            h.appendChild(B)
        }
        j = B.sheet || B.styleSheet;
        e = j && ("cssRules" in j) ? "cssRules" : "rules";
        a = ("deleteRule" in j) ? function (C) {
            j.deleteRule(C)
        } : function (C) {
            j.removeRule(C)
        };
        g = ("insertRule" in j) ? function (C, E, D) {
            j.insertRule(C + " {" + E + "}", D)
        } : function (C, E, D) {
            j.addRule(C, E, D)
        };
        for (A = j[e].length - 1; A >= 0; --A) {
            f = j[e][A];
            b = f.selectorText;
            if (k[b]) {
                k[b].style.cssText += ";" + f.style.cssText;
                a(A)
            } else {
                k[b] = f
            }
        }
        B.yuiSSID = "yui-stylesheet-" + (u++);
        s.register(B.yuiSSID, this);
        if (c) {
            s.register(c, this)
        }
        x.augmentObject(this, {
                getId: function () {
                    return B.yuiSSID
                },
                node: B,
                enable: function () {
                    j.disabled = false;
                    return this
                },
                disable: function () {
                    j.disabled = true;
                    return this
                },
                isEnabled: function () {
                    return !j.disabled
                },
                set: function (J, E) {
                    var G = k[J],
                        I = J.split(/\s*,\s*/),
                        H, F;
                    if (I.length > 1) {
                        for (H = I.length - 1; H >= 0; --H) {
                            this.set(I[H], E)
                        }
                        return this
                    }
                    if (!s.isValidSelector(J)) {
                        return this
                    }
                    if (G) {
                        G.style.cssText = s.toCssText(E, G.style.cssText)
                    } else {
                        F = j[e].length;
                        E = s.toCssText(E);
                        if (E) {
                            g(J, E, F);
                            k[J] = j[e][F]
                        }
                    }
                    return this
                },
                unset: function (L, F) {
                    var I = k[L],
                        K = L.split(/\s*,\s*/),
                        G = !F,
                        H, J;
                    if (K.length > 1) {
                        for (J = K.length - 1; J >= 0; --J) {
                            this.unset(K[J], F)
                        }
                        return this
                    }
                    if (I) {
                        if (!G) {
                            if (!x.isArray(F)) {
                                F = [F]
                            }
                            v.cssText = I.style.cssText;
                            for (J = F.length - 1; J >= 0; --J) {
                                o(v, F[J])
                            }
                            if (v.cssText) {
                                I.style.cssText = v.cssText
                            } else {
                                G = true
                            }
                        }
                        if (G) {
                            H = j[e];
                            for (J = H.length - 1; J >= 0; --J) {
                                if (H[J] === I) {
                                    delete k[L];
                                    a(J);
                                    break
                                }
                            }
                        }
                    }
                    return this
                },
                getCssText: function (C) {
                    var F, E, D;
                    if (x.isString(C)) {
                        F = k[C.split(/\s*,\s*/)[0]];
                        return F ? F.style.cssText : null
                    } else {
                        E = [];
                        for (D in k) {
                            if (k.hasOwnProperty(D)) {
                                F = k[D];
                                E.push(F.selectorText + " {" + F.style.cssText + "}")
                            }
                        }
                        return E.join("\n")
                    }
                }
            }, true)
    }
    t = function (g, c) {
        var f = g.styleFloat || g.cssFloat || g["float"],
            a;
        try {
            v.cssText = c || ""
        } catch (e) {
            y = q.createElement("p");
            v = y.style;
            v.cssText = c || ""
        }
        if (x.isString(g)) {
            v.cssText += ";" + g
        } else {
            if (f && !g[p]) {
                g = x.merge(g);
                delete g.styleFloat;
                delete g.cssFloat;
                delete g["float"];
                g[p] = f
            }
            for (a in g) {
                if (g.hasOwnProperty(a)) {
                    try {
                        v[a] = x.trim(g[a])
                    } catch (b) {}
                }
            }
        }
        return v.cssText
    };
    x.augmentObject(s, {
            toCssText: (("opacity" in v) ? t : function (a, b) {
                if (x.isObject(a) && "opacity" in a) {
                    a = x.merge(a, {
                            filter: "alpha(opacity=" + (a.opacity * 100) + ")"
                        });
                    delete a.opacity
                }
                return t(a, b)
            }),
            register: function (a, b) {
                return !!(a && b instanceof s && !r[a] && (r[a] = b))
            },
            isValidSelector: function (b) {
                var a = false;
                if (b && x.isString(b)) {
                    if (!n.hasOwnProperty(b)) {
                        n[b] = !/\S/.test(b.replace(/\s+|\s*[+~>]\s*/g, " ").replace(/([^ ])\[.*?\]/g, "$1").replace(/([^ ])::?[a-z][a-z\-]+[a-z](?:\(.*?\))?/ig, "$1").replace(/(?:^| )[a-z0-6]+/ig, " ").replace(/\\./g, "").replace(/[.#]\w[\w\-]*/g, ""))
                    }
                    a = n[b]
                }
                return a
            }
        }, true);
    YAHOO.util.StyleSheet = s
})();
YAHOO.register("stylesheet", YAHOO.util.StyleSheet, {
        version: "2.9.0",
        build: "2800"
    });
if (typeof (YAHOO.util.ImageLoader) == "undefined") {
    YAHOO.util.ImageLoader = {}
}
YAHOO.util.ImageLoader.group = function (a, c, b) {
    this.name = "unnamed";
    this._imgObjs = {};
    this.timeoutLen = b;
    this._timeout = null;
    this._triggers = [];
    this._customTriggers = [];
    this.foldConditional = false;
    this.className = null;
    this._classImageEls = null;
    if (YAHOO.util.Event.DOMReady) {
        this._onloadTasks()
    } else {
        YAHOO.util.Event.onDOMReady(this._onloadTasks, this, true)
    }
    this.addTrigger(a, c)
};
YAHOO.util.ImageLoader.group.prototype.addTrigger = function (c, b) {
    if (!c || !b) {
        return
    }
    var a = function () {
        this.fetch()
    };
    this._triggers.push([c, b, a]);
    YAHOO.util.Event.addListener(c, b, a, this, true)
};
YAHOO.util.ImageLoader.group.prototype.addCustomTrigger = function (b) {
    if (!b || !b instanceof YAHOO.util.CustomEvent) {
        return
    }
    var a = function () {
        this.fetch()
    };
    this._customTriggers.push([b, a]);
    b.subscribe(a, this, true)
};
YAHOO.util.ImageLoader.group.prototype._onloadTasks = function () {
    if (this.timeoutLen && typeof (this.timeoutLen) == "number" && this.timeoutLen > 0) {
        this._timeout = setTimeout(this._getFetchTimeout(), this.timeoutLen * 1000)
    }
    if (this.foldConditional) {
        this._foldCheck()
    }
};
YAHOO.util.ImageLoader.group.prototype._getFetchTimeout = function () {
    var a = this;
    return function () {
        a.fetch()
    }
};
YAHOO.util.ImageLoader.group.prototype.registerBgImage = function (b, a) {
    this._imgObjs[b] = new YAHOO.util.ImageLoader.bgImgObj(b, a);
    return this._imgObjs[b]
};
YAHOO.util.ImageLoader.group.prototype.registerSrcImage = function (b, e, c, a) {
    this._imgObjs[b] = new YAHOO.util.ImageLoader.srcImgObj(b, e, c, a);
    return this._imgObjs[b]
};
YAHOO.util.ImageLoader.group.prototype.registerPngBgImage = function (b, c, a) {
    this._imgObjs[b] = new YAHOO.util.ImageLoader.pngBgImgObj(b, c, a);
    return this._imgObjs[b]
};
YAHOO.util.ImageLoader.group.prototype.fetch = function () {
    var c, a, b;
    clearTimeout(this._timeout);
    for (c = 0, a = this._triggers.length; c < a; c++) {
        YAHOO.util.Event.removeListener(this._triggers[c][0], this._triggers[c][1], this._triggers[c][2])
    }
    for (c = 0, a = this._customTriggers.length; c < a; c++) {
        this._customTriggers[c][0].unsubscribe(this._customTriggers[c][1], this)
    }
    this._fetchByClass();
    for (b in this._imgObjs) {
        if (YAHOO.lang.hasOwnProperty(this._imgObjs, b)) {
            this._imgObjs[b].fetch()
        }
    }
};
YAHOO.util.ImageLoader.group.prototype._foldCheck = function () {
    var b = (document.compatMode != "CSS1Compat") ? document.body.scrollTop : document.documentElement.scrollTop,
        a = YAHOO.util.Dom.getViewportHeight(),
        e = b + a,
        m = (document.compatMode != "CSS1Compat") ? document.body.scrollLeft : document.documentElement.scrollLeft,
        j = YAHOO.util.Dom.getViewportWidth(),
        g = m + j,
        c, f, k, h;
    for (c in this._imgObjs) {
        if (YAHOO.lang.hasOwnProperty(this._imgObjs, c)) {
            f = YAHOO.util.Dom.getXY(this._imgObjs[c].domId);
            if (f[1] < e && f[0] < g) {
                this._imgObjs[c].fetch()
            }
        }
    }
    if (this.className) {
        this._classImageEls = YAHOO.util.Dom.getElementsByClassName(this.className);
        for (k = 0, h = this._classImageEls.length; k < h; k++) {
            f = YAHOO.util.Dom.getXY(this._classImageEls[k]);
            if (f[1] < e && f[0] < g) {
                YAHOO.util.Dom.removeClass(this._classImageEls[k], this.className)
            }
        }
    }
};
YAHOO.util.ImageLoader.group.prototype._fetchByClass = function () {
    if (!this.className) {
        return
    }
    if (this._classImageEls === null) {
        this._classImageEls = YAHOO.util.Dom.getElementsByClassName(this.className)
    }
    YAHOO.util.Dom.removeClass(this._classImageEls, this.className)
};
YAHOO.util.ImageLoader.imgObj = function (b, a) {
    this.domId = b;
    this.url = a;
    this.width = null;
    this.height = null;
    this.setVisible = false;
    this._fetched = false
};
YAHOO.util.ImageLoader.imgObj.prototype.fetch = function () {
    if (this._fetched) {
        return
    }
    var a = document.getElementById(this.domId);
    if (!a) {
        return
    }
    this._applyUrl(a);
    if (this.setVisible) {
        a.style.visibility = "visible"
    }
    if (this.width) {
        a.width = this.width
    }
    if (this.height) {
        a.height = this.height
    }
    this._fetched = true
};
YAHOO.util.ImageLoader.imgObj.prototype._applyUrl = function (a) {};
YAHOO.util.ImageLoader.bgImgObj = function (b, a) {
    YAHOO.util.ImageLoader.bgImgObj.superclass.constructor.call(this, b, a)
};
YAHOO.lang.extend(YAHOO.util.ImageLoader.bgImgObj, YAHOO.util.ImageLoader.imgObj);
YAHOO.util.ImageLoader.bgImgObj.prototype._applyUrl = function (a) {
    a.style.backgroundImage = "url('" + this.url + "')"
};
YAHOO.util.ImageLoader.srcImgObj = function (b, e, c, a) {
    YAHOO.util.ImageLoader.srcImgObj.superclass.constructor.call(this, b, e);
    this.width = c;
    this.height = a
};
YAHOO.lang.extend(YAHOO.util.ImageLoader.srcImgObj, YAHOO.util.ImageLoader.imgObj);
YAHOO.util.ImageLoader.srcImgObj.prototype._applyUrl = function (a) {
    a.src = this.url
};
YAHOO.util.ImageLoader.pngBgImgObj = function (b, c, a) {
    YAHOO.util.ImageLoader.pngBgImgObj.superclass.constructor.call(this, b, c);
    this.props = a || {}
};
YAHOO.lang.extend(YAHOO.util.ImageLoader.pngBgImgObj, YAHOO.util.ImageLoader.imgObj);
YAHOO.util.ImageLoader.pngBgImgObj.prototype._applyUrl = function (c) {
    if (YAHOO.env.ua.ie && YAHOO.env.ua.ie <= 6) {
        var b = (YAHOO.lang.isUndefined(this.props.sizingMethod)) ? "scale" : this.props.sizingMethod,
            a = (YAHOO.lang.isUndefined(this.props.enabled)) ? "true" : this.props.enabled;
        c.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + this.url + '", sizingMethod="' + b + '", enabled="' + a + '")'
    } else {
        c.style.backgroundImage = "url('" + this.url + "')"
    }
};
YAHOO.register("imageloader", YAHOO.util.ImageLoader, {
        version: "2.9.0",
        build: "2800"
    });
YAHOO.namespace("util");
YAHOO.util.Cookie = {
    _createCookieString: function (g, e, f, a) {
        var b = YAHOO.lang,
            c = encodeURIComponent(g) + "=" + (f ? encodeURIComponent(e) : e);
        if (b.isObject(a)) {
            if (a.expires instanceof Date) {
                c += "; expires=" + a.expires.toUTCString()
            }
            if (b.isString(a.path) && a.path !== "") {
                c += "; path=" + a.path
            }
            if (b.isString(a.domain) && a.domain !== "") {
                c += "; domain=" + a.domain
            }
            if (a.secure === true) {
                c += "; secure"
            }
        }
        return c
    },
    _createCookieHashString: function (e) {
        var b = YAHOO.lang;
        if (!b.isObject(e)) {
            throw new TypeError("Cookie._createCookieHashString(): Argument must be an object.")
        }
        var c = [];
        for (var a in e) {
            if (b.hasOwnProperty(e, a) && !b.isFunction(e[a]) && !b.isUndefined(e[a])) {
                c.push(encodeURIComponent(a) + "=" + encodeURIComponent(String(e[a])))
            }
        }
        return c.join("&")
    },
    _parseCookieHash: function (c) {
        var e = c.split("&"),
            b = null,
            f = {};
        if (c.length > 0) {
            for (var g = 0, a = e.length; g < a; g++) {
                b = e[g].split("=");
                f[decodeURIComponent(b[0])] = decodeURIComponent(b[1])
            }
        }
        return f
    },
    _parseCookieString: function (g, e) {
        var f = {};
        if (YAHOO.lang.isString(g) && g.length > 0) {
            var c = (e === false ? function (o) {
                return o
            } : decodeURIComponent);
            var j = g.split(/;\s/g),
                h = null,
                b = null,
                n = null;
            for (var a = 0, m = j.length; a < m; a++) {
                n = j[a].match(/([^=]+)=/i);
                if (n instanceof Array) {
                    try {
                        h = decodeURIComponent(n[1]);
                        b = c(j[a].substring(n[1].length + 1))
                    } catch (k) {}
                } else {
                    h = decodeURIComponent(j[a]);
                    b = ""
                }
                f[h] = b
            }
        }
        return f
    },
    exists: function (a) {
        if (!YAHOO.lang.isString(a) || a === "") {
            throw new TypeError("Cookie.exists(): Cookie name must be a non-empty string.")
        }
        var b = this._parseCookieString(document.cookie, true);
        return b.hasOwnProperty(a)
    },
    get: function (f, a) {
        var b = YAHOO.lang,
            e;
        if (b.isFunction(a)) {
            e = a;
            a = {}
        } else {
            if (b.isObject(a)) {
                e = a.converter
            } else {
                a = {}
            }
        }
        var c = this._parseCookieString(document.cookie, !a.raw);
        if (!b.isString(f) || f === "") {
            throw new TypeError("Cookie.get(): Cookie name must be a non-empty string.")
        }
        if (b.isUndefined(c[f])) {
            return null
        }
        if (!b.isFunction(e)) {
            return c[f]
        } else {
            return e(c[f])
        }
    },
    getSub: function (a, e, f) {
        var b = YAHOO.lang,
            c = this.getSubs(a);
        if (c !== null) {
            if (!b.isString(e) || e === "") {
                throw new TypeError("Cookie.getSub(): Subcookie name must be a non-empty string.")
            }
            if (b.isUndefined(c[e])) {
                return null
            }
            if (!b.isFunction(f)) {
                return c[e]
            } else {
                return f(c[e])
            }
        } else {
            return null
        }
    },
    getSubs: function (c) {
        var a = YAHOO.lang.isString;
        if (!a(c) || c === "") {
            throw new TypeError("Cookie.getSubs(): Cookie name must be a non-empty string.")
        }
        var b = this._parseCookieString(document.cookie, false);
        if (a(b[c])) {
            return this._parseCookieHash(b[c])
        }
        return null
    },
    remove: function (b, a) {
        if (!YAHOO.lang.isString(b) || b === "") {
            throw new TypeError("Cookie.remove(): Cookie name must be a non-empty string.")
        }
        a = YAHOO.lang.merge(a || {}, {
                expires: new Date(0)
            });
        return this.set(b, "", a)
    },
    removeSub: function (g, c, a) {
        var b = YAHOO.lang;
        a = a || {};
        if (!b.isString(g) || g === "") {
            throw new TypeError("Cookie.removeSub(): Cookie name must be a non-empty string.")
        }
        if (!b.isString(c) || c === "") {
            throw new TypeError("Cookie.removeSub(): Subcookie name must be a non-empty string.")
        }
        var e = this.getSubs(g);
        if (b.isObject(e) && b.hasOwnProperty(e, c)) {
            delete e[c];
            if (!a.removeIfEmpty) {
                return this.setSubs(g, e, a)
            } else {
                for (var f in e) {
                    if (b.hasOwnProperty(e, f) && !b.isFunction(e[f]) && !b.isUndefined(e[f])) {
                        return this.setSubs(g, e, a)
                    }
                }
                return this.remove(g, a)
            }
        } else {
            return ""
        }
    },
    set: function (f, e, a) {
        var b = YAHOO.lang;
        a = a || {};
        if (!b.isString(f)) {
            throw new TypeError("Cookie.set(): Cookie name must be a string.")
        }
        if (b.isUndefined(e)) {
            throw new TypeError("Cookie.set(): Value cannot be undefined.")
        }
        var c = this._createCookieString(f, e, !a.raw, a);
        document.cookie = c;
        return c
    },
    setSub: function (g, e, f, a) {
        var b = YAHOO.lang;
        if (!b.isString(g) || g === "") {
            throw new TypeError("Cookie.setSub(): Cookie name must be a non-empty string.")
        }
        if (!b.isString(e) || e === "") {
            throw new TypeError("Cookie.setSub(): Subcookie name must be a non-empty string.")
        }
        if (b.isUndefined(f)) {
            throw new TypeError("Cookie.setSub(): Subcookie value cannot be undefined.")
        }
        var c = this.getSubs(g);
        if (!b.isObject(c)) {
            c = {}
        }
        c[e] = f;
        return this.setSubs(g, c, a)
    },
    setSubs: function (f, e, a) {
        var b = YAHOO.lang;
        if (!b.isString(f)) {
            throw new TypeError("Cookie.setSubs(): Cookie name must be a string.")
        }
        if (!b.isObject(e)) {
            throw new TypeError("Cookie.setSubs(): Cookie value must be an object.")
        }
        var c = this._createCookieString(f, this._createCookieHashString(e), false, a);
        document.cookie = c;
        return c
    }
};
YAHOO.register("cookie", YAHOO.util.Cookie, {
        version: "2.8.0r4",
        build: "2446"
    });
YAHOO.util.FlashDetect = new function () {
    var a = this;
    a.installed = false;
    a.raw = "";
    a.major = -1;
    a.minor = -1;
    a.revision = -1;
    a.revisionStr = "";
    var b = [{
            name: "ShockwaveFlash.ShockwaveFlash.7",
            version: function (j) {
                return e(j)
            }
        }, {
            name: "ShockwaveFlash.ShockwaveFlash.6",
            version: function (m) {
                var j = "6,0,21";
                try {
                    m.AllowScriptAccess = "always";
                    j = e(m)
                } catch (k) {}
                return j
            }
        }, {
            name: "ShockwaveFlash.ShockwaveFlash",
            version: function (j) {
                return e(j)
            }
        }
    ];
    var e = function (m) {
        var j = -1;
        try {
            j = m.GetVariable("$version")
        } catch (k) {}
        return j
    };
    var h = function (j) {
        var m = -1;
        try {
            m = new ActiveXObject(j)
        } catch (k) {
            m = {
                activeXError: true
            }
        }
        return m
    };
    var c = function (k) {
        var j = k.split(",");
        return {
            raw: k,
            major: parseInt(j[0].split(" ")[1], 10),
            minor: parseInt(j[1], 10),
            revision: parseInt(j[2], 10),
            revisionStr: j[2]
        }
    };
    var g = function (n) {
        var k = n.split(/ +/);
        var m = k[2].split(/\./);
        var j = k[3];
        return {
            raw: n,
            major: parseInt(m[0], 10),
            minor: parseInt(m[1], 10),
            revisionStr: j,
            revision: f(j)
        }
    };
    var f = function (j) {
        return parseInt(j.replace(/[a-zA-Z]/g, ""), 10) || a.revision
    };
    a.majorAtLeast = function (j) {
        return a.major >= j
    };
    a.minorAtLeast = function (j) {
        return a.minor >= j
    };
    a.revisionAtLeast = function (j) {
        return a.revision >= j
    };
    a.versionAtLeast = function (k) {
        var m = [a.major, a.minor, a.revision];
        var j = Math.min(m.length, arguments.length);
        for (i = 0; i < j; i++) {
            if (m[i] >= arguments[i]) {
                if (i + 1 < j && m[i] == arguments[i]) {
                    continue
                } else {
                    return true
                }
            } else {
                return false
            }
        }
    };
    a.FlashDetect = function () {
        if (navigator.plugins && navigator.plugins.length > 0) {
            var n = "application/x-shockwave-flash";
            var m = navigator.mimeTypes;
            if (m && m[n] && m[n].enabledPlugin && m[n].enabledPlugin.description) {
                var j = m[n].enabledPlugin.description;
                var o = g(j);
                a.raw = o.raw;
                a.major = o.major;
                a.minor = o.minor;
                a.revisionStr = o.revisionStr;
                a.revision = o.revision;
                a.installed = true
            }
        } else {
            if (navigator.appVersion.indexOf("Mac") == -1 && window.execScript) {
                var j = -1;
                for (var k = 0; k < b.length && j == -1; k++) {
                    var p = h(b[k].name);
                    if (!p.activeXError) {
                        a.installed = true;
                        j = b[k].version(p);
                        if (j != -1) {
                            var o = c(j);
                            a.raw = o.raw;
                            a.major = o.major;
                            a.minor = o.minor;
                            a.revision = o.revision;
                            a.revisionStr = o.revisionStr
                        }
                    }
                }
            }
        }
    }()
};
YAHOO.util.FlashDetect.JS_RELEASE = "1.0.4";
var d = document;
var w = window;
if (!w.ka) {
    ka = YAHOO.util.Cookie.get("a") || ""
}
if (!w.kb) {
    kb = YAHOO.util.Cookie.get("b") || ""
}
if (!w.kc) {
    kc = YAHOO.util.Cookie.get("c") || ""
}
if (!w.kd) {
    kd = YAHOO.util.Cookie.get("d") || ""
}
if (!w.ke) {
    ke = YAHOO.util.Cookie.get("e") || ""
}
if (!w.kf) {
    kf = YAHOO.util.Cookie.get("f") || ""
}
if (!w.kg) {
    kg = YAHOO.util.Cookie.get("g") || ""
}
if (!w.kh) {
    kh = YAHOO.util.Cookie.get("h") || ""
}
if (!w.ki) {
    ki = YAHOO.util.Cookie.get("i") || ""
}
if (!w.kj) {
    kj = YAHOO.util.Cookie.get("j") || ""
}
if (!w.kk) {
    kk = YAHOO.util.Cookie.get("k") || ""
}
if (!w.kl) {
    kl = YAHOO.util.Cookie.get("l") || ""
}
if (!w.km) {
    km = YAHOO.util.Cookie.get("m") || ""
}
if (!w.kn) {
    kn = YAHOO.util.Cookie.get("n") || ""
}
if (!w.ko) {
    ko = YAHOO.util.Cookie.get("o") || ""
}
if (!w.kp) {
    kp = YAHOO.util.Cookie.get("p") || ""
}
if (!w.kq) {
    kq = YAHOO.util.Cookie.get("q") || ""
}
if (!w.kr) {
    kr = YAHOO.util.Cookie.get("r") || ""
}
if (!w.ks) {
    ks = YAHOO.util.Cookie.get("s") || ""
}
if (!w.kt) {
    kt = YAHOO.util.Cookie.get("t") || ""
}
if (!w.ku) {
    ku = YAHOO.util.Cookie.get("u") || ""
}
if (!w.kv) {
    kv = YAHOO.util.Cookie.get("v") || ""
}
if (!w.kw) {
    kw = YAHOO.util.Cookie.get("w") || ""
}
if (!w.kx) {
    kx = YAHOO.util.Cookie.get("x") || ""
}
if (!w.ky) {
    ky = YAHOO.util.Cookie.get("y") || ""
}
if (!w.kz) {
    kz = YAHOO.util.Cookie.get("z") || ""
}
if (!w.k1) {
    k1 = YAHOO.util.Cookie.get("1") || ""
}
if (!w.k2) {
    k2 = YAHOO.util.Cookie.get("2") || ""
}
if (!w.k3) {
    k3 = YAHOO.util.Cookie.get("3") || ""
}
if (!w.k4) {
    k4 = YAHOO.util.Cookie.get("4") || ""
}
if (!w.k5) {
    k5 = YAHOO.util.Cookie.get("5") || ""
}
if (!w.k6) {
    k6 = YAHOO.util.Cookie.get("6") || ""
}
if (!w.k7) {
    k7 = YAHOO.util.Cookie.get("7") || ""
}
if (!w.k8) {
    k8 = YAHOO.util.Cookie.get("8") || ""
}
if (!w.k9) {
    k9 = YAHOO.util.Cookie.get("9") || ""
}
if (!w.kaa) {
    kaa = YAHOO.util.Cookie.get("aa") || ""
}
if (!w.kab) {
    kab = YAHOO.util.Cookie.get("ab") || ""
}
if (!w.kac) {
    kac = YAHOO.util.Cookie.get("ac") || ""
}
if (!w.kad) {
    kad = YAHOO.util.Cookie.get("ad") || ""
}
if (!w.kae) {
    kae = YAHOO.util.Cookie.get("ae") || ""
}
if (!w.kaf) {
    kaf = YAHOO.util.Cookie.get("af") || ""
}
if (!w.kag) {
    kag = YAHOO.util.Cookie.get("ag") || ""
}
if (!w.kah) {
    kah = YAHOO.util.Cookie.get("ah") || ""
}
if (!w.kai) {
    kai = YAHOO.util.Cookie.get("ai") || ""
}
if (!w.kaj) {
    kaj = YAHOO.util.Cookie.get("aj") || ""
}
if (!w.kak) {
    kak = YAHOO.util.Cookie.get("ak") || ""
}
if (!w.kal) {
    kal = YAHOO.util.Cookie.get("al") || ""
}
if (!w.kam) {
    kam = YAHOO.util.Cookie.get("am") || ""
}
if (!w.kan) {
    kan = YAHOO.util.Cookie.get("an") || ""
}
if (!w.kao) {
    kao = YAHOO.util.Cookie.get("ao") || ""
}
if (!w.kap) {
    kap = YAHOO.util.Cookie.get("ap") || ""
}
if (!w.kaq) {
    kaq = YAHOO.util.Cookie.get("aq") || ""
}
if (!w.kar) {
    kar = YAHOO.util.Cookie.get("ar") || ""
}
if (!w.kas) {
    kas = YAHOO.util.Cookie.get("as") || ""
}
if (!w.kat) {
    kat = YAHOO.util.Cookie.get("at") || ""
}
if (!w.kau) {
    kau = YAHOO.util.Cookie.get("au") || ""
}
if (!w.kav) {
    kav = YAHOO.util.Cookie.get("av") || ""
}
if (!w.kaw) {
    kaw = YAHOO.util.Cookie.get("aw") || ""
}
if (!w.kax) {
    kax = YAHOO.util.Cookie.get("ax") || ""
}
if (!w.kay) {
    kay = YAHOO.util.Cookie.get("ay") || ""
}
if (!w.kaz) {
    kaz = YAHOO.util.Cookie.get("az") || ""
}
if (!window.l) {
    l = function (a) {
        return a
    }
}
if (typeof DDG == "undefined") {
    var DDG = {}
}
DDG.namespace = function () {
    var b = arguments,
        g = null,
        e, c, f;
    for (e = 0; e < b.length; e = e + 1) {
        f = b[e].split(".");
        g = window;
        for (c = 0; c < f.length; c = c + 1) {
            g[f[c]] = g[f[c]] || {};
            g = g[f[c]]
        }
    }
    return g
};
DDG.stylesheet = YAHOO.util.StyleSheet("DDG");
DDG.first_result = "r1-0";
DDG.is_deep_loaded = 0;
DDG.is_ad_blocked = false;
DDG.is_ad_called = false;
DDG.is_top_map = false;
DDG.is_side_map = false;
DDG.first_source = false;
DDG.is_results_page = false;
if (window.irp) {
    DDG.is_results_page = true
}
DDG.detect_ad_block = function (a) {
    if (!DDG.is_ad_blocked && a) {
        DDG.is_ad_blocked = true
    }
    if (!DDG.is_ad_blocked && !DDG.is_ad_called && d.getElementById("ads") && !iqa) {
        nrj("/y.js?x=1&q=" + rq + (ra ? "&a=" + ra : ""));
        DDG.is_ad_called = true
    }
};
var _abdStatusFnc = "DDG.detect_ad_block";
(function () {
    var _ab = false;
    var _af = undefined;
    var _am = undefined;

    function detect_ab() {
        if (!DDG.is_results_page) {
            return false
        }
        setTimeout(detect_ab2, 100)
    }

    function detect_ab2() {
        _af = document.createElement("IFRAME");
        _am = document.createElement("IMG");
        _af.id = "_afd";
        _af.src = "/adimages/";
        _af.style.display = "block";
        _af.style.border = "none";
        _am.id = "_amd";
        _am.src = "/adimages/textlink-ads.jpg";
        _am.style.width = _af.style.width = "1px";
        _am.style.height = _af.style.height = "1px";
        _am.style.top = _af.style.top = "-1000px";
        _am.style.left = _af.style.left = "-1000px";
        if (document && document.body) {
            document.body.appendChild(_af);
            document.body.appendChild(_am);
            setTimeout(_ss, 100)
        }
    }

    function _ss() {
        if (document.getElementById("_amd").style.display.indexOf("none") > -1) {
            _ab = true
        } else {
            if (document.getElementById("_afd").style.visibility == "hidden") {
                _ab = true
            } else {
                if (document.getElementById("_afd").clientHeight == 0) {
                    _ab = true
                }
            }
        }
        _af.parentNode.removeChild(_af);
        _am.parentNode.removeChild(_am);
        if (typeof (_abdStatusFnc) != "undefined") {
            eval(_abdStatusFnc + "(" + _ab + ");")
        } else {
            if ((_ab == true) && (typeof (_abdDetectedFnc) != "undefined")) {
                eval(_abdDetectedFnc + "();")
            }
            if ((_ab == false) && (typeof (_abdNotDetectedFnc) != "undefined")) {
                eval(_abdNotDetectedFnc + "();")
            }
        }
    }
    detect_ab()
})();
DDG.is_ad_loaded = 0;
DDG.is_default_ad_loaded = 0;
DDG.default_ad = "";
DDG.show_default_ad = function () {
    DDG.is_default_ad_loaded = 1;
    if (DDG.is_ad_loaded) {
        return false
    }
    if (DDG.default_ad) {
        nrn("a", DDG.default_ad);
        YAHOO.util.Dom.setStyle("ads", "display", "block")
    } else {
        YAHOO.util.Dom.setStyle("ads", "display", "none")
    }
};
DDG.detect_internal_link = function (a) {
    return a.getAttribute("href").indexOf("http") == -1 ? 1 : 0
};
DDG.detect_intent_link = function (a) {
    var b = 0;
    if (ip && a.hostname == "itunes.apple.com") {
        b = 1
    } else {
        if (ia && a.hostname == "play.google.com") {
            b = 1
        }
    }
    return b
};
DDG.get_http_redirect = function (b) {
    var a = b.href;
    if ((!kd || kd == 1) && b.href.indexOf("/l/?") == -1 && !DDG.detect_internal_link(b) && !DDG.detect_intent_link(b)) {
        a = "http://" + w.location.hostname + "/l/?kh=-1&uddg=" + encodeURIComponent(b.href);
        nua("nul", b, 500)
    }
    return a
};
DDG.get_query_encoded = function () {
    return rq
};
DDG.get_query = function () {
    return decodeURIComponent(rq)
};
DDG.get_asset_path = function (c, b) {
    var a = "/share/spice/" + c + "/" + spice_version + "/";
    return a + b
};
DDG.get_now = function () {
    var a = new Date();
    return a.getTime()
};
DDG.set_results_spacing = function () {
    var b = 10;
    YAHOO.util.Dom.setStyle("links", "padding-top", "0px");
    YAHOO.util.Dom.setStyle("ads", "padding-top", "0px");
    YAHOO.util.Dom.setStyle("did_you_means", "padding-top", "0px");
    var a = 0;
    if (YAHOO.util.Dom.getStyle("did_you_means", "display") == "block") {
        YAHOO.util.Dom.setStyle("did_you_means", "padding-top", b + "px");
        a = 1
    } else {
        if (YAHOO.util.Dom.getStyle("ads", "display") == "block") {
            YAHOO.util.Dom.setStyle("ads", "padding-top", b + "px");
            a = 1
        } else {
            if (YAHOO.util.Dom.getStyle("links", "display") == "block") {
                YAHOO.util.Dom.setStyle("links", "padding-top", b + "px");
                a = 1
            }
        }
    } if (a) {
        YAHOO.util.Dom.setStyle("zero_click_message", "padding-top", b + "px")
    }
};
DDG.report_bad_query = function () {
    DDG.toggle("report_bad_query_link");
    DDG.toggle("try_search_on_links");
    DDG.toggle("feedback_modal", 1);
    div = document.getElementById("feedback_modal_title");
    var a = "https://collect.duckduckgo.com/collect.js?type=relevancy&q=" + rq;
    if (rl) {
        a += "&region=" + rl
    }
    if (locale) {
        a += "&language=" + locale
    }
    a += "&safe=" + ((rp && rp != "-1") ? -1 : 1);
    if (DDG.first_source) {
        a += "&source=" + DDG.first_source
    }
    nrj(a);
    div.innerHTML = "Thanks!"
};
DDG.is_side = function () {
    var a = d.getElementById("side");
    var b = d.getElementById("side_wrapper");
    var c = 0;
    if (b && YAHOO.util.Dom.getStyle(b, "display") == "block" && (YAHOO.util.Dom.getY(b) + a.scrollHeight + 250 < viewport_height)) {
        c = 1
    }
    return c
};
DDG.bang_suggestions = new Array();
DDG.bang_suggestions_shown = new Array();
DDG.show_bang_suggestions = function () {
    if (1) {
        var a = d.getElementById("side_suggestions");
        var b = 1;
        var h = d.createElement("div");
        if (a.firstChild) {
            b = 0;
            h = a.firstChild
        }
        if (!b && !DDG.is_side()) {
            return
        }
        var c = 0;
        var q = new RegExp("^(.*?)\\t(.*?)\\t(.*?)$");
        for (var n in DDG.bang_suggestions) {
            var e = DDG.bang_suggestions[n];
            var p = "";
            var j = "";
            if (q.test(n)) {
                p = RegExp.$1;
                j = RegExp.$2;
                icon_domain = RegExp.$3
            }
            if (!p) {
                continue
            }
            if (!j) {
                continue
            }
            if (DDG.bang_suggestions_shown[p]) {
                continue
            }
            DDG.bang_suggestions_shown[p] = 1;
            var o = "Search directly on " + j + " using !" + p + ".";
            var g = d.createElement("div");
            var f = "";
            var k = ga + icon_domain + ".ico";
            if (p == "bimages") {
                k = "/assets/icon_camera.v103.png"
            }
            if (nur) {
                f = nur("", o, k, 16, 16)
            }
            if (f) {
                g.appendChild(f);
                f.bang = p
            }
            var m = d.createElement("a");
            m.innerHTML += j;
            m.bang = p;
            m.href = "/?q=" + rq + "+!" + p;
            m.onclick = function () {
                nutp("b_" + this.bang)
            };
            m.target = p;
            m.title = o;
            g.appendChild(m);
            YAHOO.util.Dom.addClass(g, "bang_suggestion");
            if (b) {
                h.innerHTML += '<div class="spacer_bottom_7"><a href="/bang/">Try this search on</a>:</div>'
            }
            h.appendChild(g);
            if (b) {
                YAHOO.util.Dom.setStyle(g, "margin-top", "2px")
            }
            b = 0;
            c++;
            if (c == 7) {
                break
            }
        }
        a.insertBefore(h, a.firstChild);
        YAHOO.util.Dom.setStyle(a, "padding-top", "30px");
        YAHOO.util.Dom.setStyle(a, "padding-bottom", "0px");
        YAHOO.util.Dom.setStyle(a, "display", "block")
    }
};
DDG.last_selection = "";
DDG.spice_force_time = {
    Tmp: 1
};
DDG.spice_force_no_header = {
    WolframAlpha: 1,
    Amazon: 1
};
DDG.spice_force_no_icon = {
    "Google+": 1,
    Quixey: 1,
    "Big Huge Thesaurus": 1
};
DDG.spice_force_favicon_domain = {
    ESPN: "espnplus.com",
    OpenStreetMap: "openstreetmap.org"
};
DDG.spice_force_favicon_url = {
    Yummly: "http://www.yummly.com/favicon.ico",
    Yelp: "https://icons.duckduckgo.com/assets/icons/favicons/yelp.ico"
};
DDG.spice_force_space_after = {
    "Big Huge Thesaurus": 1,
    "search[code]": 1,
    "Rotten Tomatoes": 1
};
DDG.spice_force_big_header = {
    Twitter: 1,
    XKCD: 1,
    "Rotten Tomatoes": 1,
    HNSearch: 1,
    "The Drink Project": 1,
    "CanIStream.It": 1,
    "Big Huge Thesaurus": 1,
    "search[code]": 1,
    LongURL: 1,
    "Google+": 1,
    Yummly: 1,
    "Wikipedia ": 1
};
DDG.spice_force_message = {
    WolframAlpha: l("Computed by %s", "Wolfram|Alpha")
};
DDG.spice_force_no_scroll = {
    PunchFork: 1,
    OpenStreetMap: 1,
    "Wikipedia ": 1
};
var page_type = new Array();
page_type[0] = "results";
page_type[1] = "homepage";
page_type[2] = "internal";
DDG.get_page_type = function () {
    var a = DDG.page_type || 0;
    return page_type[a]
};
DDG.OSM_lat_lon_search = function (a, b) {
    return "[" + a + "," + b + "]"
};
DDG.fix_browser_bugs = function () {
    nuv();
    if (is_silk) {
        YAHOO.util.Dom.setStyle("side", "display", "none")
    }
};
DDG.display_twitter_status = function () {
    if (is_twitter) {
        var c = new RegExp("^(.*)/(.*)$");
        if (c.test(is_twitter)) {
            var g = RegExp.$1;
            var a = RegExp.$2;
            if (g && a) {
                var f = d.createElement("div");
                f.id = "twitter_status";
                var e = d.createElement("a");
                e.href = "https://twitter.com/" + g + "/status/" + a;
                var b = nur("", "", "/iu/?u=https://api.twitter.com/1/users/profile_image?screen_name=" + g + "&size=mini&f=1", 24, 24);
                if (b) {
                    e.appendChild(b);
                    f.appendChild(e);
                    d.body.appendChild(f)
                }
            }
        }
    }
};
DDG.make_skimlink = function (b) {
    var a;
    a = "http://ad.ddg.gg/?";
    a += "id=40063X1035282";
    a += "&xs=1";
    a += "&url=" + encodeURIComponent(b);
    a += "&sref=" + encodeURIComponent("https://duckduckgo.com");
    return a
};
DDG.add_safe_search_message = function () {
    var b = d.getElementById("links");
    var e = d.getElementById("zero_click_message");
    if (b && !e) {
        var f = d.createElement("div");
        f.id = "zero_click_message";
        f.innerHTML = "Safe search blocked some results for " + decodeURIComponent(rqd) + ". " + l("Turn off:") + " [";
        var c = d.createElement("a");
        c.innerHTML = l("temporarily");
        c.href = "/?q=" + rq + " !safeoff" + kurl;
        f.appendChild(c);
        f.appendChild(d.createTextNode("] ["));
        var c = d.createElement("a");
        c.innerHTML = l("permanently");
        c.href = "/settings/";
        f.appendChild(c);
        f.appendChild(d.createTextNode("]."));
        var a = YAHOO.util.Dom.getY(b);
        b.insertBefore(f, b.firstChild)
    }
};
DDG.resize = function (z) {
    nuv();
    var B, u;
    var f = 600;
    var j = 239;
    var c = 320;
    var r = 453;
    var a = 871;
    var D = 600;
    var E = 767;
    var v = 55;
    var t = 150;
    var q = 50;
    var x = 0;
    var o = 62;
    var s = 87;
    var k = 1027;
    var h = 1027;
    var m = 647;
    var A = 647;
    var C = 520;
    var n = 97;
    var g = 86.5;
    var b = 86.5;
    var y = DDG.get_page_type();
    if (y == "homepage") {
        if ((!is_silk || viewport_height > r) && viewport_width > c) {
            YAHOO.util.Dom.setStyle("content_wrapper_homepage", "padding-top", parseInt(((viewport_height * 2 / 10) - 50)) + "px")
        } else {
            YAHOO.util.Dom.setStyle("content_wrapper_homepage", "padding-top", "20px")
        }
        YAHOO.util.Dom.setStyle("content_wrapper_homepage", "top", "0")
    }
    if (d.getElementById("zero_click_image") && d.getElementById("zero_click_abstract") && !is_mobile) {
        u = d.getElementById("zero_click_image").scrollWidth;
        if (u > 280) {
            YAHOO.util.Dom.addClass("zero_click_image", "zci_big")
        }
        if (u > 430) {
            YAHOO.util.Dom.addClass("zero_click_image", "nofloat")
        }
        u = u < 10 ? 130 : 30;
        B = YAHOO.util.Dom.getX("zero_click_image") - YAHOO.util.Dom.getX("zero_click_abstract") - u;
        if (isNaN && !isNaN(B)) {
            if (viewport_width > 728) {
                YAHOO.util.Dom.setStyle("zero_click_abstract", "max-width", B + "px");
                u = YAHOO.util.Dom.getElementsByClassName("hidden", "span", "zero_click_topics");
                if (!u || u.length < 1) {
                    YAHOO.util.Dom.setStyle("zero_click_topics", "max-width", B + "px")
                }
            } else {
                YAHOO.util.Dom.setStyle("zero_click_abstract", "max-width", "100%");
                YAHOO.util.Dom.setStyle("zero_click_topics", "max-width", "100%")
            }
        }
    } else {
        if (is_mobile) {
            YAHOO.util.Dom.setStyle("zero_click_abstract", "max-width", "100%");
            YAHOO.util.Dom.setStyle("zero_click_topics", "max-width", "100%")
        }
    } if (is_mobile && !ipa) {
        YAHOO.util.Dom.setStyle("logo_homepage", "margin-bottom", "0px");
        YAHOO.util.Dom.setStyle("logo_homepage", "padding-bottom", "20px");
        YAHOO.util.Dom.setStyle("logo_homepage", "width", "275px");
        YAHOO.util.Dom.setStyle("logo_homepage", "height", "62px");
        YAHOO.util.Dom.addClass("logo_homepage", "mobile");
        YAHOO.util.Dom.addClass("content_wrapper_homepage", "mobile")
    } else {
        YAHOO.util.Dom.setStyle("logo_homepage", "margin-bottom", "40px");
        YAHOO.util.Dom.setStyle("logo_homepage", "padding-bottom", "1px");
        YAHOO.util.Dom.setStyle("logo_homepage", "width", "220px");
        YAHOO.util.Dom.setStyle("logo_homepage", "height", "161px")
    } if (viewport_width > 720) {
        YAHOO.util.Dom.setStyle("search_form", "width", "554px");
        YAHOO.util.Dom.setStyle("search_form_input", "width", "446px");
        YAHOO.util.Dom.setStyle("search_form_homepage", "width", "518px");
        YAHOO.util.Dom.setStyle("search_form_input_homepage", "width", "430px");
        YAHOO.util.Dom.setStyle("header_button_wrapper", "left", "40px")
    } else {
        if (viewport_width > 620) {
            YAHOO.util.Dom.setStyle("search_form", "width", "453px");
            YAHOO.util.Dom.setStyle("search_form_input", "width", "346px");
            YAHOO.util.Dom.setStyle("search_form_homepage", "width", "418px");
            YAHOO.util.Dom.setStyle("search_form_input_homepage", "width", "330px");
            YAHOO.util.Dom.setStyle("header_button_wrapper", "left", "30px")
        } else {
            if (viewport_width > 525) {
                YAHOO.util.Dom.setStyle("search_form", "width", "360px");
                YAHOO.util.Dom.setStyle("search_form_input", "width", "253px");
                YAHOO.util.Dom.setStyle("search_form_homepage", "width", "375px");
                YAHOO.util.Dom.setStyle("search_form_input_homepage", "width", "287px");
                YAHOO.util.Dom.setStyle("header_button_wrapper", "left", "20px")
            } else {
                YAHOO.util.Dom.setStyle("search_form", "width", "260px");
                YAHOO.util.Dom.setStyle("search_form_input", "width", "153px");
                YAHOO.util.Dom.setStyle("search_form_homepage", "width", "275px");
                YAHOO.util.Dom.setStyle("search_form_input_homepage", "width", "187px");
                YAHOO.util.Dom.setStyle("header_button_wrapper", "left", "10px")
            }
        }
    } if (is_mobile || ie6 || ip || (kq && kq == -1)) {
        YAHOO.util.Dom.setStyle("search_form_input_clear", "position", "absolute");
        YAHOO.util.Dom.setStyle("search_form_input_clear", "top", "0px");
        YAHOO.util.Dom.setStyle("search_form_input_clear", "right", "42px");
        YAHOO.util.Dom.setStyle("search_form_input_clear", "background-color", "transparent");
        YAHOO.util.Dom.setStyle("search_form_input_clear", "z-index", "1");
        YAHOO.util.Dom.setStyle("search_form_input", "padding-right", "34px");
        YAHOO.util.Dom.setStyle("search_wrapper", "width", "42px");
        YAHOO.util.Dom.setStyle("search_dropdown", "display", "none");
        YAHOO.util.Dom.setStyle("search_wrapper_homepage", "width", "42px");
        YAHOO.util.Dom.setStyle("search_form_input_homepage", "right", "42px");
        YAHOO.util.Dom.setStyle("search_dropdown_homepage", "display", "none");
        if (d.getElementById("search_form")) {
            YAHOO.util.Dom.setStyle("search_form", "width", parseInt(d.getElementById("search_form").scrollWidth - 23) + "px")
        }
        if (d.getElementById("search_form_homepage")) {
            YAHOO.util.Dom.setStyle("search_form_homepage", "width", parseInt(d.getElementById("search_form_homepage").scrollWidth - 33) + "px")
        }
    }
    if (!ke || ke == "1") {
        YAHOO.util.Dom.setStyle("feedback_wrapper", "display", "block")
    } else {
        YAHOO.util.Dom.setStyle("feedback_wrapper", "display", "none")
    } if (viewport_width > a && viewport_height > D && (!k4 || k4 == 1)) {
        YAHOO.util.Dom.setStyle("side_wrapper", "display", "block")
    } else {
        YAHOO.util.Dom.setStyle("side_wrapper", "display", "none")
    } if (viewport_width > E) {
        var B = q;
        var u = 0;
        if (!k4 || k4 == 1) {
            YAHOO.util.Dom.setStyle("side_wrapper", "display", "block");
            div = d.getElementById("links");
            u = t;
            if (viewport_width > 950 && viewport_width <= 1210) {
                u = parseInt((1210 - viewport_width) / 2)
            } else {
                if (viewport_width > 1210) {
                    u = 0
                }
            }
        } else {
            B = 0;
            u = q;
            div = d.getElementById("links");
            YAHOO.util.Dom.setStyle("side_wrapper", "display", "none")
        } if (div && (!km || km != "l")) {
            diff = parseInt((viewport_width - div.scrollWidth - B - u) / 2);
            diff = diff - parseInt(YAHOO.util.Dom.getX("content"));
            if (diff > o) {
                var p = 25;
                YAHOO.util.Dom.setStyle("content", "padding-left", parseInt(diff) + "px");
                if (0 && kr && kr == "c") {} else {
                    YAHOO.util.Dom.setStyle("header_content", "padding-left", parseInt(diff + p) + "px")
                }
                YAHOO.util.Dom.setStyle("content_wrapper", "max-width", parseInt(d.getElementById("content").scrollWidth + diff) + "px");
                YAHOO.util.Dom.setStyle("header_content_wrapper", "max-width", parseInt(d.getElementById("header_content").scrollWidth + diff + p) + "px")
            } else {
                YAHOO.util.Dom.setStyle("content", "padding-left", o + "px");
                YAHOO.util.Dom.setStyle("header_content", "padding-left", s + "px");
                YAHOO.util.Dom.setStyle("header_content_wrapper", "max-width", k + "px");
                YAHOO.util.Dom.setStyle("content_wrapper", "max-width", h + "px")
            }
            diff = viewport_width - div.scrollWidth - YAHOO.util.Dom.getX(div);
            if (d.getElementById("side_map")) {
                t = d.getElementById("side_map").scrollWidth
            }
            if (diff > t + v && (!k4 || k4 == 1)) {
                YAHOO.util.Dom.setStyle("side_wrapper", "display", "block");
                diff2 = ((diff - t) / 2) + 30;
                if (kw == "s" || kw == "w") {
                    diff2 += 45
                }
                YAHOO.util.Dom.setStyle("side_wrapper2", "right", "-" + diff2 + "px")
            } else {
                YAHOO.util.Dom.setStyle("side_wrapper", "display", "none")
            }
        }
    } else {
        YAHOO.util.Dom.setStyle("content", "padding-left", o + "px");
        YAHOO.util.Dom.setStyle("header_content", "padding-left", s + "px");
        YAHOO.util.Dom.setStyle("header_content_wrapper", "max-width", k + "px");
        YAHOO.util.Dom.setStyle("content_wrapper", "max-width", h + "px")
    } if (viewport_width <= f) {
        YAHOO.util.Dom.setStyle("header_content_wrapper", "min-width", n + "%");
        YAHOO.util.Dom.setStyle("content_wrapper", "min-width", n + "%");
        YAHOO.util.Dom.setStyle("content_wrapper", "padding-right", 0 + "px");
        YAHOO.util.Dom.setStyle("content_wrapper", "margin", "0 auto");
        YAHOO.util.Dom.setStyle("content", "min-width", n + "%");
        YAHOO.util.Dom.setStyle("content", "padding-left", 0 + "px");
        YAHOO.util.Dom.setStyle("zero_click", "width", n + "%");
        YAHOO.util.Dom.setStyle("links", "width", n + "%");
        YAHOO.util.Dom.setStyle("ads", "width", n + "%");
        YAHOO.util.Dom.addClass("ads", "zero_auto");
        YAHOO.util.Dom.addClass("links", "zero_auto");
        YAHOO.util.Dom.addClass("zero_click", "zero_auto")
    } else {
        YAHOO.util.Dom.setStyle("header_content_wrapper", "min-width", m);
        YAHOO.util.Dom.setStyle("content_wrapper", "min-width", A);
        YAHOO.util.Dom.setStyle("content_wrapper", "padding-right", q);
        YAHOO.util.Dom.setStyle("content_wrapper", "margin-left", x + "px");
        YAHOO.util.Dom.setStyle("content", "min-width", C + "px");
        YAHOO.util.Dom.setStyle("content", "padding_left", o + "px");
        YAHOO.util.Dom.setStyle("zero_click", "width", b + "%");
        YAHOO.util.Dom.setStyle("links", "width", g + "%");
        YAHOO.util.Dom.setStyle("ads", "width", g + "%");
        YAHOO.util.Dom.removeClass("ads", "zero_auto");
        YAHOO.util.Dom.removeClass("links", "zero_auto");
        YAHOO.util.Dom.removeClass("zero_click", "zero_auto")
    } if (d.getElementById("ads") && d.getElementById("ra-0")) {
        YAHOO.util.Dom.setStyle("ads", "height", "auto")
    }
};
DDG.get_link_num = function (b) {
    var a = 0;
    if (!b) {
        a = 0
    } else {
        if (b == 3) {
            a = -1
        } else {
            if (kf && (kf == "fw" || kf == "b")) {
                a = 2
            } else {
                a = parseInt(b) - 1
            }
        }
    }
    return a
};
DDG.toggle = function (c, a) {
    var b = d.getElementById(c);
    if (b) {
        if ((!a || a != -1) && (YAHOO.util.Dom.getStyle(b, "display") == "none" || a)) {
            YAHOO.util.Dom.setStyle(b, "display", "block")
        } else {
            if (!a || a == -1) {
                YAHOO.util.Dom.setStyle(b, "display", "none")
            } else {
                if (a == 1) {
                    YAHOO.util.Dom.setStyle(b, "display", "block")
                }
            }
        }
    }
};
DDG.toggleall = function (f, a, g) {
    if (!f) {
        f = "grp_modal"
    }
    var c = d.getElementById(g);
    var e = YAHOO.util.Dom.getElementsByClassName(f);
    if (e) {
        if (!a || a == -1) {
            for (var b = 0; b <= e.length; b++) {
                if (!g || (c != e[b])) {
                    YAHOO.util.Dom.setStyle(e[b], "display", "none")
                }
            }
        } else {
            if (a == 1) {
                for (var b = 0; b <= e.length; b++) {
                    YAHOO.util.Dom.setStyle(e[b], "display", "block")
                }
            }
        }
    }
};
DDG.modaltrig = function (f, e, c, b, a) {
    document.write('<span class="modal_trig" id="trig_' + f + '"></span>' + c + '<a href="');
    document.write("javascript:;");
    document.write('" class="' + e + '" onclick="');
    document.write("DDG.mv_elem('" + f + "','trig_" + f + "');DDG.toggleall('grp_modal',-1,'" + f + "');DDG.toggle('" + f + "')");
    document.write('">' + a + "</a>" + b)
};
DDG.shorten = (function (a) {
    return function (f) {
        var b = '<span id="blurb' + a + '" style="display: inline;">';
        if (f.length > 200) {
            var c = '<span id="fullText' + a + '" style="display:none;">' + f + "</span>";
            var e = '<a style="display: inline; color: rgb(119, 119, 119);font-size: 11px;" id="expand' + a + '" href="javascript:;"onclick="DDG.toggle(\'fullText' + a + "', 1);DDG.toggle('blurb" + a + "', -1);DDG.toggle('expand" + a + "', -1);\">" + l("More") + "...</a>";
            b += f.slice(0, 200) + "</span>" + c + e
        } else {
            b = f
        }
        a++;
        return b
    }
})(0);
DDG.clear_button_toggle = function (a) {
    var b;
    b = d.getElementById("search_form_input");
    if (!b) {
        b = d.getElementById("search_form_input_homepage")
    }
    if (b && !ipa) {
        if (b.value == "") {
            YAHOO.util.Dom.addClass("search_form_input_clear", "empty")
        } else {
            YAHOO.util.Dom.removeClass("search_form_input_clear", "empty")
        }
    }
};
DDG.clear_button = function (a) {
    var b;
    b = d.getElementById("search_form_input");
    if (!b) {
        b = d.getElementById("search_form_input_homepage")
    }
    if (b) {
        b.value = "";
        b.focus();
        DDG.clear_button_toggle()
    }
};
DDG.mv_elem = function (e, c) {
    var a = d.getElementById(e);
    var b = d.getElementById(c);
    if ((a) && (b)) {
        b.appendChild(a.parentNode.removeChild(a))
    }
};
var cd, ci, dz, da, fk, fb, fs, fm, fe, fl, fo, fa, fn, fz, ie, ih5, issl, idom, io, il, ir, is, is5, ga, gd, rc, rd, rs, rdc, rsc, rtc, rii, rin, rir, rl, rp, reb, rebc, sx, sy, tl, tlz, tac, tr, ts, tn, tsl, tz, nir, kurl, is_mobile;
viewport_width = YAHOO.util.Dom.getViewportWidth();
viewport_height = YAHOO.util.Dom.getViewportHeight();
nuv();
ie = d.all ? true : false;
ie6 = /msie 6/.test(navigator.userAgent.toLowerCase()) ? true : false;
ie7 = /msie 7/.test(navigator.userAgent.toLowerCase()) ? true : false;
ie9 = /msie 9/.test(navigator.userAgent.toLowerCase()) ? true : false;
ie10p = /msie 1[0123456789]/.test(navigator.userAgent.toLowerCase()) ? true : false;
is = /safari/.test(navigator.userAgent.toLowerCase()) ? true : false;
iw = /webkit/.test(navigator.userAgent.toLowerCase()) ? true : false;
ir = /chrome(?!frame)/.test(navigator.userAgent.toLowerCase()) ? true : false;
ir12 = /chrome\/12/.test(navigator.userAgent.toLowerCase()) ? true : false;
is5 = (is && /version\/[56]/.test(navigator.userAgent.toLowerCase())) ? true : false;
im = (navigator.userAgent.indexOf("Firefox") != -1) ? true : false;
io = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
io11 = (navigator.userAgent.indexOf("Opera") != -1 && navigator.userAgent.indexOf("/11") != -1) ? true : false;
iom = (navigator.userAgent.indexOf("Opera Mini") != -1) ? true : false;
is_opera_mobile = (navigator.userAgent.indexOf("Opera Mobi") != -1) ? true : false;
ip = (navigator.userAgent.indexOf("iPad") != -1 || navigator.userAgent.indexOf("iPhone") != -1) ? true : false;
ipa = (navigator.userAgent.indexOf("iPad") != -1) ? true : false;
iph = (navigator.userAgent.indexOf("iPhone") != -1) ? true : false;
ia = (navigator.userAgent.indexOf("Android") != -1) ? true : false;
iam = (navigator.userAgent.indexOf("Android") != -1 && /mobile/.test(navigator.userAgent.toLowerCase())) ? true : false;
is_silk = (navigator.userAgent.indexOf("Silk") != -1) ? true : false;
is_konqueror = (navigator.userAgent.indexOf("Konqueror") != -1) ? true : false;
ida = (navigator.userAgent.indexOf("DDG-Android") != -1) ? true : false;
idi = (navigator.userAgent.indexOf("DDG-iOS") != -1) ? true : false;
ih5 = w.postMessage ? true : false;
issl = document.location.protocol == "https:" ? 1 : 0;
is_mobile = /mobile/.test(navigator.userAgent.toLowerCase()) ? true : false;
if (iom || is_opera_mobile || ip || ia || is_silk || (viewport_width < 600 && viewport_height < 400)) {
    is_mobile = 1
}
if (ip && viewport_width > 900) {
    is_mobile = 0
}
gre = new RegExp("((http://(.*yfrog..*/.*|www.flickr.com/photos/.*|flic.kr/.*|twitpic.com/.*|www.twitpic.com/.*|twitpic.com/photos/.*|www.twitpic.com/photos/.*|.*imgur.com/.*|.*.posterous.com/.*|post.ly/.*|twitgoo.com/.*|i.*.photobucket.com/albums/.*|s.*.photobucket.com/albums/.*|phodroid.com/.*/.*/.*|www.mobypicture.com/user/.*/view/.*|moby.to/.*|xkcd.com/.*|www.xkcd.com/.*|imgs.xkcd.com/.*|www.asofterworld.com/index.php?id=.*|www.asofterworld.com/.*.jpg|asofterworld.com/.*.jpg|www.qwantz.com/index.php?comic=.*|23hq.com/.*/photo/.*|www.23hq.com/.*/photo/.*|.*dribbble.com/shots/.*|drbl.in/.*|.*.smugmug.com/.*|.*.smugmug.com/.*#.*|emberapp.com/.*/images/.*|emberapp.com/.*/images/.*/sizes/.*|emberapp.com/.*/collections/.*/.*|emberapp.com/.*/categories/.*/.*/.*|embr.it/.*|picasaweb.google.com.*/.*/.*#.*|picasaweb.google.com.*/lh/photo/.*|picasaweb.google.com.*/.*/.*|dailybooth.com/.*/.*|brizzly.com/pic/.*|pics.brizzly.com/.*.jpg|img.ly/.*|www.tinypic.com/view.php.*|tinypic.com/view.php.*|www.tinypic.com/player.php.*|tinypic.com/player.php.*|www.tinypic.com/r/.*/.*|tinypic.com/r/.*/.*|.*.tinypic.com/.*.jpg|.*.tinypic.com/.*.png|meadd.com/.*/.*|meadd.com/.*|.*.deviantart.com/art/.*|.*.deviantart.com/gallery/.*|.*.deviantart.com/#/.*|fav.me/.*|.*.deviantart.com|.*.deviantart.com/gallery|.*.deviantart.com/.*/.*.jpg|.*.deviantart.com/.*/.*.gif|.*.deviantart.net/.*/.*.jpg|.*.deviantart.net/.*/.*.gif|www.fotopedia.com/.*/.*|fotopedia.com/.*/.*|photozou.jp/photo/show/.*/.*|photozou.jp/photo/photo_only/.*/.*|instagr.am/p/.*|instagram.com/p/.*|skitch.com/.*/.*/.*|img.skitch.com/.*|share.ovi.com/media/.*/.*|www.questionablecontent.net/|questionablecontent.net/|www.questionablecontent.net/view.php.*|questionablecontent.net/view.php.*|questionablecontent.net/comics/.*.png|www.questionablecontent.net/comics/.*.png|picplz.com/.*|twitrpix.com/.*|.*.twitrpix.com/.*|www.someecards.com/.*/.*|someecards.com/.*/.*|some.ly/.*|www.some.ly/.*|pikchur.com/.*|achewood.com/.*|www.achewood.com/.*|achewood.com/index.php.*|www.achewood.com/index.php.*|www.whosay.com/content/.*|www.whosay.com/photos/.*|www.whosay.com/videos/.*|say.ly/.*|ow.ly/i/.*|color.com/s/.*|bnter.com/convo/.*|mlkshk.com/p/.*|lockerz.com/s/.*|soundcloud.com/.*|soundcloud.com/.*/.*|soundcloud.com/.*/sets/.*|soundcloud.com/groups/.*|snd.sc/.*|www.last.fm/music/.*|www.last.fm/music/+videos/.*|www.last.fm/music/+images/.*|www.last.fm/music/.*/_/.*|www.last.fm/music/.*/.*|www.mixcloud.com/.*/.*/|www.radionomy.com/.*/radio/.*|radionomy.com/.*/radio/.*|www.hark.com/clips/.*|www.rdio.com/#/artist/.*/album/.*|www.rdio.com/artist/.*/album/.*|www.zero-inch.com/.*|.*.bandcamp.com/|.*.bandcamp.com/track/.*|.*.bandcamp.com/album/.*|freemusicarchive.org/music/.*|www.freemusicarchive.org/music/.*|freemusicarchive.org/curator/.*|www.freemusicarchive.org/curator/.*|www.npr.org/.*/.*/.*/.*/.*|www.npr.org/.*/.*/.*/.*/.*/.*|www.npr.org/.*/.*/.*/.*/.*/.*/.*|www.npr.org/templates/story/story.php.*|huffduffer.com/.*/.*|www.audioboo.fm/boos/.*|audioboo.fm/boos/.*|boo.fm/b.*|www.xiami.com/song/.*|xiami.com/song/.*|www.saynow.com/playMsg.html.*|www.saynow.com/playMsg.html.*|grooveshark.com/.*|radioreddit.com/songs.*|www.radioreddit.com/songs.*|radioreddit.com/?q=songs.*|www.radioreddit.com/?q=songs.*|www.gogoyoko.com/song/.*|.*amazon..*/gp/product/.*|.*amazon..*/.*/dp/.*|.*amazon..*/dp/.*|.*amazon..*/o/ASIN/.*|.*amazon..*/gp/offer-listing/.*|.*amazon..*/.*/ASIN/.*|.*amazon..*/gp/product/images/.*|.*amazon..*/gp/aw/d/.*|www.amzn.com/.*|amzn.com/.*|www.shopstyle.com/browse.*|www.shopstyle.com/action/apiVisitRetailer.*|api.shopstyle.com/action/apiVisitRetailer.*|www.shopstyle.com/action/viewLook.*|gist.github.com/.*|twitter.com/.*/status/.*|twitter.com/.*/statuses/.*|www.twitter.com/.*/status/.*|www.twitter.com/.*/statuses/.*|mobile.twitter.com/.*/status/.*|mobile.twitter.com/.*/statuses/.*|www.crunchbase.com/.*/.*|crunchbase.com/.*/.*|www.slideshare.net/.*/.*|www.slideshare.net/mobile/.*/.*|slidesha.re/.*|scribd.com/doc/.*|www.scribd.com/doc/.*|scribd.com/mobile/documents/.*|www.scribd.com/mobile/documents/.*|screenr.com/.*|polldaddy.com/community/poll/.*|polldaddy.com/poll/.*|answers.polldaddy.com/poll/.*|www.5min.com/Video/.*|www.howcast.com/videos/.*|www.screencast.com/.*/media/.*|screencast.com/.*/media/.*|www.screencast.com/t/.*|screencast.com/t/.*|issuu.com/.*/docs/.*|www.kickstarter.com/projects/.*/.*|www.scrapblog.com/viewer/viewer.aspx.*|ping.fm/p/.*|chart.ly/symbols/.*|chart.ly/.*|maps.google.com/maps?.*|maps.google.com/?.*|maps.google.com/maps/ms?.*|.*.craigslist.org/.*/.*|my.opera.com/.*/albums/show.dml?id=.*|my.opera.com/.*/albums/showpic.dml?album=.*&picture=.*|tumblr.com/.*|.*.tumblr.com/post/.*|www.polleverywhere.com/polls/.*|www.polleverywhere.com/multiple_choice_polls/.*|www.polleverywhere.com/free_text_polls/.*|www.quantcast.com/wd:.*|www.quantcast.com/.*|siteanalytics.compete.com/.*|statsheet.com/statplot/charts/.*/.*/.*/.*|statsheet.com/statplot/charts/e/.*|statsheet.com/.*/teams/.*/.*|statsheet.com/tools/chartlets?chart=.*|.*.status.net/notice/.*|identi.ca/notice/.*|brainbird.net/notice/.*|shitmydadsays.com/notice/.*|www.studivz.net/Profile/.*|www.studivz.net/l/.*|www.studivz.net/Groups/Overview/.*|www.studivz.net/Gadgets/Info/.*|www.studivz.net/Gadgets/Install/.*|www.studivz.net/.*|www.meinvz.net/Profile/.*|www.meinvz.net/l/.*|www.meinvz.net/Groups/Overview/.*|www.meinvz.net/Gadgets/Info/.*|www.meinvz.net/Gadgets/Install/.*|www.meinvz.net/.*|www.schuelervz.net/Profile/.*|www.schuelervz.net/l/.*|www.schuelervz.net/Groups/Overview/.*|www.schuelervz.net/Gadgets/Info/.*|www.schuelervz.net/Gadgets/Install/.*|www.schuelervz.net/.*|myloc.me/.*|pastebin.com/.*|pastie.org/.*|www.pastie.org/.*|redux.com/stream/item/.*/.*|redux.com/f/.*/.*|www.redux.com/stream/item/.*/.*|www.redux.com/f/.*/.*|cl.ly/.*|cl.ly/.*/content|speakerdeck.com/u/.*/p/.*|www.kiva.org/lend/.*|www.timetoast.com/timelines/.*|storify.com/.*/.*|.*meetup.com/.*|meetu.ps/.*|www.dailymile.com/people/.*/entries/.*|.*.kinomap.com/.*|www.metacdn.com/api/users/.*/content/.*|www.metacdn.com/api/users/.*/media/.*|prezi.com/.*/.*|.*.uservoice.com/.*/suggestions/.*|formspring.me/.*|www.formspring.me/.*|formspring.me/.*/q/.*|www.formspring.me/.*/q/.*|twitlonger.com/show/.*|www.twitlonger.com/show/.*|tl.gd/.*|www.qwiki.com/q/.*|crocodoc.com/.*|.*.crocodoc.com/.*|www.wikipedia.org/wiki/.*|www.wikimedia.org/wiki/File.*|.*youtube.com/watch.*|.*.youtube.com/v/.*|youtu.be/.*|.*.youtube.com/user/.*|.*.youtube.com/.*#.*/.*|m.youtube.com/watch.*|m.youtube.com/index.*|.*.youtube.com/profile.*|.*.youtube.com/view_play_list.*|.*.youtube.com/playlist.*|.*justin.tv/.*|.*justin.tv/.*/b/.*|.*justin.tv/.*/w/.*|www.ustream.tv/recorded/.*|www.ustream.tv/channel/.*|www.ustream.tv/.*|qik.com/video/.*|qik.com/.*|qik.ly/.*|.*revision3.com/.*|.*.dailymotion.com/video/.*|.*.dailymotion.com/.*/video/.*|collegehumor.com/video:.*|collegehumor.com/video/.*|www.collegehumor.com/video:.*|www.collegehumor.com/video/.*|.*twitvid.com/.*|www.break.com/.*/.*|vids.myspace.com/index.cfm?fuseaction=vids.individual&videoid.*|www.myspace.com/index.cfm?fuseaction=.*&videoid.*|www.metacafe.com/watch/.*|www.metacafe.com/w/.*|blip.tv/.*/.*|.*.blip.tv/.*/.*|video.google.com/videoplay?.*|.*revver.com/video/.*|video.yahoo.com/watch/.*/.*|video.yahoo.com/network/.*|.*viddler.com/explore/.*/videos/.*|liveleak.com/view?.*|www.liveleak.com/view?.*|animoto.com/play/.*|dotsub.com/view/.*|www.overstream.net/view.php?oid=.*|www.livestream.com/.*|www.worldstarhiphop.com/videos/video.*.php?v=.*|worldstarhiphop.com/videos/video.*.php?v=.*|teachertube.com/viewVideo.php.*|www.teachertube.com/viewVideo.php.*|www1.teachertube.com/viewVideo.php.*|www2.teachertube.com/viewVideo.php.*|bambuser.com/v/.*|bambuser.com/channel/.*|bambuser.com/channel/.*/broadcast/.*|www.schooltube.com/video/.*/.*|bigthink.com/ideas/.*|bigthink.com/series/.*|sendables.jibjab.com/view/.*|sendables.jibjab.com/originals/.*|www.xtranormal.com/watch/.*|socialcam.com/v/.*|www.socialcam.com/v/.*|dipdive.com/media/.*|dipdive.com/member/.*/media/.*|dipdive.com/v/.*|.*.dipdive.com/media/.*|.*.dipdive.com/v/.*|v.youku.com/v_show/.*.html|v.youku.com/v_playlist/.*.html|www.snotr.com/video/.*|snotr.com/video/.*|video.jardenberg.se/.*|www.clipfish.de/.*/.*/video/.*|www.myvideo.de/watch/.*|www.whitehouse.gov/photos-and-video/video/.*|www.whitehouse.gov/video/.*|wh.gov/photos-and-video/video/.*|wh.gov/video/.*|www.hulu.com/watch.*|www.hulu.com/w/.*|hulu.com/watch.*|hulu.com/w/.*|.*crackle.com/c/.*|www.fancast.com/.*/videos|www.funnyordie.com/videos/.*|www.funnyordie.com/m/.*|funnyordie.com/videos/.*|funnyordie.com/m/.*|www.vimeo.com/groups/.*/videos/.*|www.vimeo.com/.*|vimeo.com/groups/.*/videos/.*|vimeo.com/.*|vimeo.com/m/#/.*|www.ted.com/talks/.*.html.*|www.ted.com/talks/lang/.*/.*.html.*|www.ted.com/index.php/talks/.*.html.*|www.ted.com/index.php/talks/lang/.*/.*.html.*|.*nfb.ca/film/.*|www.thedailyshow.com/watch/.*|www.thedailyshow.com/full-episodes/.*|www.thedailyshow.com/collection/.*/.*/.*|movies.yahoo.com/movie/.*/video/.*|movies.yahoo.com/movie/.*/trailer|movies.yahoo.com/movie/.*/video|www.colbertnation.com/the-colbert-report-collections/.*|www.colbertnation.com/full-episodes/.*|www.colbertnation.com/the-colbert-report-videos/.*|www.comedycentral.com/videos/index.jhtml?.*|www.theonion.com/video/.*|theonion.com/video/.*|wordpress.tv/.*/.*/.*/.*/|www.traileraddict.com/trailer/.*|www.traileraddict.com/clip/.*|www.traileraddict.com/poster/.*|www.escapistmagazine.com/videos/.*|www.trailerspy.com/trailer/.*/.*|www.trailerspy.com/trailer/.*|www.trailerspy.com/view_video.php.*|www.atom.com/.*/.*/|fora.tv/.*/.*/.*/.*|www.spike.com/video/.*|www.gametrailers.com/video/.*|gametrailers.com/video/.*|www.koldcast.tv/video/.*|www.koldcast.tv/#video:.*|techcrunch.tv/watch.*|techcrunch.tv/.*/watch.*|mixergy.com/.*|video.pbs.org/video/.*|www.zapiks.com/.*|tv.digg.com/diggnation/.*|tv.digg.com/diggreel/.*|tv.digg.com/diggdialogg/.*|www.trutv.com/video/.*|www.nzonscreen.com/title/.*|nzonscreen.com/title/.*|app.wistia.com/embed/medias/.*|hungrynation.tv/.*/episode/.*|www.hungrynation.tv/.*/episode/.*|hungrynation.tv/episode/.*|www.hungrynation.tv/episode/.*|indymogul.com/.*/episode/.*|www.indymogul.com/.*/episode/.*|indymogul.com/episode/.*|www.indymogul.com/episode/.*|channelfrederator.com/.*/episode/.*|www.channelfrederator.com/.*/episode/.*|channelfrederator.com/episode/.*|www.channelfrederator.com/episode/.*|tmiweekly.com/.*/episode/.*|www.tmiweekly.com/.*/episode/.*|tmiweekly.com/episode/.*|www.tmiweekly.com/episode/.*|99dollarmusicvideos.com/.*/episode/.*|www.99dollarmusicvideos.com/.*/episode/.*|99dollarmusicvideos.com/episode/.*|www.99dollarmusicvideos.com/episode/.*|ultrakawaii.com/.*/episode/.*|www.ultrakawaii.com/.*/episode/.*|ultrakawaii.com/episode/.*|www.ultrakawaii.com/episode/.*|barelypolitical.com/.*/episode/.*|www.barelypolitical.com/.*/episode/.*|barelypolitical.com/episode/.*|www.barelypolitical.com/episode/.*|barelydigital.com/.*/episode/.*|www.barelydigital.com/.*/episode/.*|barelydigital.com/episode/.*|www.barelydigital.com/episode/.*|threadbanger.com/.*/episode/.*|www.threadbanger.com/.*/episode/.*|threadbanger.com/episode/.*|www.threadbanger.com/episode/.*|vodcars.com/.*/episode/.*|www.vodcars.com/.*/episode/.*|vodcars.com/episode/.*|www.vodcars.com/episode/.*|confreaks.net/videos/.*|www.confreaks.net/videos/.*|video.allthingsd.com/video/.*|videos.nymag.com/.*|aniboom.com/animation-video/.*|www.aniboom.com/animation-video/.*|clipshack.com/Clip.aspx?.*|www.clipshack.com/Clip.aspx?.*|grindtv.com/.*/video/.*|www.grindtv.com/.*/video/.*|ifood.tv/recipe/.*|ifood.tv/video/.*|ifood.tv/channel/user/.*|www.ifood.tv/recipe/.*|www.ifood.tv/video/.*|www.ifood.tv/channel/user/.*|logotv.com/video/.*|www.logotv.com/video/.*|lonelyplanet.com/Clip.aspx?.*|www.lonelyplanet.com/Clip.aspx?.*|streetfire.net/video/.*.htm.*|www.streetfire.net/video/.*.htm.*|trooptube.tv/videos/.*|www.trooptube.tv/videos/.*|sciencestage.com/v/.*.html|sciencestage.com/a/.*.html|www.sciencestage.com/v/.*.html|www.sciencestage.com/a/.*.html|www.godtube.com/featured/video/.*|godtube.com/featured/video/.*|www.godtube.com/watch/.*|godtube.com/watch/.*|www.tangle.com/view_video.*|mediamatters.org/mmtv/.*|www.clikthrough.com/theater/video/.*|espn.go.com/video/clip.*|espn.go.com/.*/story.*|abcnews.com/.*/video/.*|abcnews.com/video/playerIndex.*|washingtonpost.com/wp-dyn/.*/video/.*/.*/.*/.*|www.washingtonpost.com/wp-dyn/.*/video/.*/.*/.*/.*|www.boston.com/video.*|boston.com/video.*|www.facebook.com/photo.php.*|www.facebook.com/video/video.php.*|www.facebook.com/v/.*|cnbc.com/id/.*?.*video.*|www.cnbc.com/id/.*?.*video.*|cnbc.com/id/.*/play/1/video/.*|www.cnbc.com/id/.*/play/1/video/.*|cbsnews.com/video/watch/.*|www.google.com/buzz/.*/.*/.*|www.google.com/buzz/.*|www.google.com/profiles/.*|google.com/buzz/.*/.*/.*|google.com/buzz/.*|google.com/profiles/.*|www.cnn.com/video/.*|edition.cnn.com/video/.*|money.cnn.com/video/.*|today.msnbc.msn.com/id/.*/vp/.*|www.msnbc.msn.com/id/.*/vp/.*|www.msnbc.msn.com/id/.*/ns/.*|today.msnbc.msn.com/id/.*/ns/.*|multimedia.foxsports.com/m/video/.*/.*|msn.foxsports.com/video.*|www.globalpost.com/video/.*|www.globalpost.com/dispatch/.*|guardian.co.uk/.*/video/.*/.*/.*/.*|www.guardian.co.uk/.*/video/.*/.*/.*/.*|bravotv.com/.*/.*/videos/.*|www.bravotv.com/.*/.*/videos/.*|video.nationalgeographic.com/.*/.*/.*.html|dsc.discovery.com/videos/.*|animal.discovery.com/videos/.*|health.discovery.com/videos/.*|investigation.discovery.com/videos/.*|military.discovery.com/videos/.*|planetgreen.discovery.com/videos/.*|science.discovery.com/videos/.*|tlc.discovery.com/videos/.*|video.forbes.com/fvn/.*))|(https://(skitch.com/.*/.*/.*|img.skitch.com/.*|twitter.com/.*/status/.*|twitter.com/.*/statuses/.*|www.twitter.com/.*/status/.*|www.twitter.com/.*/statuses/.*|mobile.twitter.com/.*/status/.*|mobile.twitter.com/.*/statuses/.*|crocodoc.com/.*|.*.crocodoc.com/.*|.*youtube.com/watch.*|.*.youtube.com/v/.*|app.wistia.com/embed/medias/.*|www.facebook.com/photo.php.*|www.facebook.com/video/video.php.*|www.facebook.com/v/.*)))$");
grb = new RegExp("^((?=[013479./abcdefghijklmnopqrstuvwxyz])(?:s(?:p(?:r(?:ing(?:source|er)|oducts)?|a(?:rknotes|nishdict)|inoza|hp|orcle|ezify)?|e(?:r(?:ch|ebii|verfault)|a(?:rch(?:c(?:h|pan|ode)|yc|mygmail|forphp|works)|monkey|tgeek)|c(?:tube)?|sli(?:sozluk)?|lfhtml(?:wiki)?|[bqp]|znam|eks|nderbase)|q(?:uidoo|lalchemy)|w(?:agbucks|db|eetsearch)|m(?:a(?:llsafari|shwords)|og(?:on)?|[gh]|ention)?|h(?:o(?:ut(?:itou|cas)t|p(?:ping|wiki|zilla|athome)?|dan(?:hq)?|wtimes)|e(?:lfari|etmusicplus)|utterstock|areware|bd)?|c(?:i(?:ence(?:daily|blogs)|py|fi|rus)|o(?:pe(?:.d)?k|nj|op)|holar(?:pedia)?|r(?:i(?:tique|bd)|a(?:pe|bblelookup))|2ranks|ala)?|l(?:i(?:ckdeals|deshare)|a(?:ckbuilds?|te(?:fr)?|shdot|ng)|(?:oane|yric)s|wiki)|o(?:n(?:g(?:meanings?|sterr)|2teuf|icretro)|u(?:rceforge|ndcloud)|so?|m|ftware|zluk)?|t(?:a(?:ti(?:cice|onsweb)|r(?:t(?:r(?:ek|ibune)|page(?:(?:image|video)s)?)?|wars)|ck(?:exchange|overflow)|(?:ple|b)s|gevu)|e(?:x|am)|u(?:mble(?:upon)?|bhub|pi|ffnz|dydroid)|ock(?:photos)?)|d(?:[nz]|ict)?|a(?:fe(?:o(?:n|ff)|booru)?|mpled|s|lon|nakirja|vannah)|i(?:m(?:ilar(?:sitesearch)?|plyhired)|te(?:alytics|slike|duzero)|gma|errasoftworks)?|s(?:life|kj)|k(?:epticsbible|yrock)?|u(?:n(?:patch|times)|per(?:d(?:ownloads)?|user)|b(?:s(?:earch|cene)?|reddit)|se(?:bu|pk)g|(?:li|mmitpos)t)?|n(?:opes|uson|l)|y(?:nonym(?:e?s)?|mbolhound)|f(?:(?:gat)?e|s)?|xc?|b[ao]|v|rfi)?|u(?:rban(?:comfort|dictionary)?|b(?:untu(?:f(?:orums)?|users)|ottu)|n(?:i(?:prot|x|ty|code)|scatter|cyclopedia|wiki)|p(?:down|(?:ackage)?s|coming)|s(?:e(?:rs(?:tyle|cript)s)?|a(?:today)?|ps)|it(?:inv|m)|u(?:de)?|g(?:lifyjs)?|ltimateguitar|(?:k|es)p|zg|tf8|d|man)|c(?:o(?:m(?:ic(?:rocket|vine)|p(?:fight|ass|ete)|mons)|de(?:canyon|(?:ple)?x|weavers)?|oks?|l(?:lege(?:board|confidential)|dfusion|or)|n(?:j|certs)|rriere|stco|(?:algirl|upon|wboylyric)s|coa)|h(?:a(?:rity(?:navigator)?|kra(?:wiki|forum|pkg)|nnel[54]|mmy|cha)|e(?:a(?:tc(?:odes|c)|passgamer)|f(?:koch)?)|i(?:cagotribune|lango)|o(?:w|rds)|rome)|r(?:a(?:cked|te|wl|igslist|n)|eativecow(?:lib)?|unch(?:yroll|base)|i(?:ticker|cinfo)|x)|e(?:(?:ne|rcavin)o|llartracker|an)|b(?:s(?:new|sport)s|c)|s(?:theory|pan|s|db|monitor|fd|harp)|l(?:ip(?:stijl|art)|oj(?:ure(?:docs)?|ars)|u(?:sty|bic)|ker|seattle)|p(?:a(?:n(?:[m1]|deps)?|p)|pr?|lusplus)|a(?:r(?:(?:eerbuild|anddriv)er|mag|toonnetwork)?|p(?:ost|taincrawl)|n(?:oo|istream)|ke(?:2(?:book)?|book)?|ched?|mel|ld|shback|talinstefan|fepress)|cr?|fp?|i(?:teul|rcuitcity|sco)?|n(?:bc|rtl|et|n)|d[cnt]|1(?:neon|024)|(?:webstor|v)e|tan|(?:k1)?2|ultureunplugged)|l(?:i(?:b(?:r(?:i(?:vox|s)|arything)|(?:e|universita)ria)|n(?:k(?:edin|scape|up)|g(?:uee|vo)?|ux(?:hcl|fr|mint))|quid?pedia|veleak|fehacker|ke|sp)?|o(?:c(?:al(?:ch)?|ita)?|ngurl|gin|vefilm|lolyrics)|m(?:d(?:dg)?tfy|gtfy|a)|e(?:o[resifc]?|(?:wrockwel|ga)l|boncoin|novo)|u(?:cir|aforg)e|yri(?:c(?:s(?:wiki|mania)?|wiki|ful)|ki)|a(?:s(?:er(?:ship)?|t.?fm)|t(?:ex|imes)|unchpad|r|vva)|p(?:bug|archive)?|(?:wjg)?l|[cg]c|ds|nu|[hvj]|1sp|xr)|o(?:r(?:tho(?:doxwiki|net)|(?:ei|ie)lly|d|acle|kut)|p(?:e(?:ra(?:ext)?|n(?:s(?:treet(?:map)?|u(?:se(?:software)?|btitles))|p(?:orts|rocessing)|b(?:sd|ook)|cv|radar|library))|timot)|k(?:f|azii|geek)|s(?:[ime]|(?:u|vd)b|news|xdaily|alt)|n(?:elook|imoto|r|trac)|t(?:ran|hes)|e(?:is|[dr])|h(?:loh|(?:norobo|interne)t)|m(?:gu(?:buntu)?|im)|c(?:al?|(?:topar|cuprin)t|w)|v(?:erstock|i)|o(?:lone|pon)|ldcpan|x|bb)|m(?:a(?:m(?:ont|ma)|p(?:s(?:fr)?|quest)?|n(?:gafox)?|t(?:h(?:wor(?:ks|ld)|overflow|se|ematica)|lab(?:fx)?|plotlib)|r(?:k(?:et|(?:tplaat|o)s|mail)|miton|ch)|ke(?:useof)?|c(?:world|dic|update|(?:port|y|addres)s)?|sh(?:able)?|g(?:ma(?:wiki)?|iccards)|l(?:ist|pha)|(?:deinus|fi)a|jorsbooks|xthon)?|y(?:a(?:llsearch|nimelist)|s(?:ql|pace)|etym|dealz|wot|opera|fonts)|e(?:m(?:oryalpha|e)|t(?:a(?:c(?:r(?:itic|awler)|pan|afe)|l(?:storm)?|filter|so)|eo(?:fr|ciel)|rolyrics)|d(?:ia(?:dico|wiki)|nar)|r(?:c(?:adoli[vb]re|urynews)|riamwebster)|n(?:upages|eame|deley)|fi)|p(?:la?|ny|fl|bo|gde|[pc]h|sf|dc)?|o(?:n(?:go|oprice|ster)|d(?:x|ulusfe|db)|vie(?:pilot|s|web)|o(?:tools)?|(?:(?:u|zbrow)se|rningsta|g)r|bygames)|vn(?:repository)?|u(?:si(?:c(?:iansfriend|brainz|me)|pedia|km)|lticolr)|i(?:c(?:ro(?:soft|center)|haelis)|n(?:e(?:craft|forum)|iclip)|t(?:ocw|vid)|s?o|mvi|b|ll|ghtyape)|m(?:nt|ls)|c(?:wiki|anime|(?:ski|pa)n)?|b(?:ug|sdman)?|s(?:m(?:alware|vps)|nbc|dn|kb|q)?|lb?|t[vg]|d(?:[cn]|bg)|[wq])?|g(?:u(?:i(?:tartabs|ldwiki)|a(?:rdian)?|[ks]|lesider|tenberg)|o(?:o(?:gle(?:maps?|uk|images)?|kokugo|sh|dreads)|l(?:ang|em)|g|daddy|(?:ea|phe)r|rp|vtrack)|n(?:o(?:mebugs)?|[lmzu]|ews|fr|de)?|d(?:[tke]|ay|ocs)?|e(?:iz(?:hals)?|o(?:cach(?:e|ing)|names|ip)|t(?:tyimages|human)|e(?:gain)?|n(?:toowiki|esis)|phi|m?s)|t(?:r(?:anslate|ends)?|(?:ur|n)l|abs|[hw]|de)?|w(?:p(?:de)?|orkshop|eek|iki)|v(?:iew(?:er)?|[ne]|pl)?|f(?:i(?:nance)?|aqs|[rcl])?|b(?:l(?:ast|ogs)|[mrek]|(?:ug|ook)s|(?:an)?g)?|s(?:c(?:holar)?|s?l|(?:maren)?a|(?:hoppin)?g|u?k|e)?|a(?:me(?:s(?:radar|pot)|(?:trailer|ranking|cheat|faq)s|(?:pr|zeb)o|jaunt)|en?|t(?:herer)?|(?:wke)?r|(?:cces)?s|u|llica.bnf)|h(?:[ku]|acks)?|r(?:e(?:p(?:c(?:pan|ode)|lin)|lated|ader)|o(?:ov(?:y|eshark)|klaw)?|a(?:ph(?:emica|icriver)|tefuldead|ve)|i(?:dcalendar|cal)?|[uv])?|g(?:r(?:oups)?)?|i(?:t(?:-scm|l|hub)?|e(?:z(?:hals)?)?|m(?:ages)?|s(?:(?:afe)?off|t)|[rnkd]|gaom|zmodo)?|c(?:o(?:de)?|a(?:che|l)?|(?:pa)?n|[hlz])|p(?:l(?:usp?|ay)?|h(?:otos)?|a(?:ckages|t)|[tde])?|l(?:o(?:b(?:o|eandmail)|cal)|(?:ates)?t|v|yde|ink)?|m(?:a(?:ps?|il|ne)|o(?:b|nth)|[yx]|usic)?|za|jp|(?:yea|k)r|24|4tv)?|b(?:i(?:g(?:fish|words)|n(?:g(?:(?:image|map)s)?|search)|bl(?:e(?:gateway|tools)?|srv)|t(?:gamer|bucket|snoop)|mages|znar|ography)?|l(?:o(?:g(?:s(?:pot)?|talkradio)|omberg|cket)|e(?:kkoi?|nd(?:er|api))|ackbook(?:mag)?|i(?:ndsearch|ptv)|ueletterbible)|s(?:d(?:man)?|ocial)?|u(?:lba(?:pedia)?|ej|y|(?:rnbi|gmeno)t|sinessweek)|a(?:se(?:search|ballreference)|n(?:gs?|dcamp)|r(?:tlets|nesandnoble)|i(?:xaki|du)|con|y12|kabt|tlyrics)|v(?:ideos?)?|m(?:p3|aps)?|o(?:o(?:k(?:f(?:inde|lavo)r|mine|[so]|depository)|st)|ardgamegeek|l|ingboing|xoh)|c(?:p|wiki)|r(?:itannica|ew)?|e(?:s(?:ch|tbuy)|o(?:es|pt)?|hind(?:sur|the)name|atport|er)|b(?:c(?:food|w)?|apps|t)?|n(?:ews|f)?|t(?:abs|(?:mo)?n|digg)|g[gp]|kr|wc)?|w(?:3(?:c|schools)?|h(?:at(?:is)?|o(?:is)?|i(?:te(?:pages|water))?)|n(?:[nlo]|etwork)|i(?:n(?:ehq|[ck]|fu)|k(?:i(?:s(?:um|imple)|t(?:ravel)?|p(?:aintings|edia)|how|[ca]|(?:new|book|v)s|de)?|t(?:[fb]r|de|ionary)?)|[qt]|mp|ssen|(?:eowi|ggl)e|red|llh)|d[ae]?|t(?:[rf]|en|sv)?|e(?:b(?:m(?:d|enu)|s(?:ta(?:ts|gram)|itedown)|cams|(?:warp|tend)er|2py|oftrust)|ather(?:bug)?|heartit|[soun]|tter)|m(?:eta|c)?|a(?:tch(?:anime)?|l(?:l(?:base|paper)|pha|mart)|doku|yback|ffles|shingtonpost|koopa)?|o(?:s[ni]?|r(?:d(?:n(?:et|ik)|reference|press)|ld(?:cat|ofspectrum)|m)|w(?:armory(?:eu)?|head|battlenet|pedia)|t(?:if)?|lfram(?:alpha)?|g|xikon)|s(?:j(?:mw)?|[lv])|p(?:t(?:hemes)?|7(?:fr)?|l|plugins)?|r(?:e(?:s(?:fr)?|f|nit)|fe|u|iten)?|w(?:wjdic|end)?|l(?:find|n)|c[sa]?|u(?:k|nderground)|f[ri]|br|ja|ykop|g|zh)?|e(?:s(?:sef(?:n|fr)|p(?:ac(?:oliberdade|enet)|n)|en|it|g|vonline)|c(?:o(?:sia|nomist)|[ha])|d(?:gart?|e|itus)?|b(?:u(?:ilds?|k)|a(?:y(?:i[etn]|c[ha]|p[lh]|a[ut]|my|[uh]k|[bd]e|fr|es|nl|sg)?|[ut])|e(?:rt|s)?|i[net]|c[ha]|p[hl]|nl|[bd]e|fr|hk|sg|my)?|n(?:e[ols]|t(?:rez|ireweb)|cyclopedia|[sl]|dthelie|(?:i|gadge)t)|q(?:beats|uestriadaily)|i[ten]|p(?:i(?:c(?:urious|mafia)|nions)|ubbud|[lh])?|r(?:lang|owid)|v(?:e(?:r(?:y(?:click|mac)|note)|ntful)?|irt(?:a[ut]|des|tit|ed)?|ri)|u(?:rogamer|k)|x(?:p(?:loitdb|edia)|t(?:ratorrent)?|alead|if)|m(?:a(?:cs(?:wiki)?|g)|u(?:sic|(?:paradis|l)e)|edicine|y)|f[rf]|l(?:e(?:xiko)?n|reg)|e(?:gg)?s|a(?:[ut]|rth911)|h(?:k|ow)|ksi(?:sozluk)?|t(?:ym(?:ology)?|ree|sy)|[2o]|ggtimer)?|d(?:p(?:lb?|dt?|(?:t|ackage)s|[ibwvn]|kg)?|o(?:c(?:jar|s)|wn(?:load|for)|main(?:r|sbot)?|lu|i|aj|uban|gpile|ttk)|b(?:ugs|asx|(?:sn|l)p|yte)|e(?:b(?:ian(?:f(?:r|orums))?|ml|bug)|v(?:eloppez|iantart|apple)|l(?:l|icious)|(?:(?:xonl|f)in|alextrem)e|sura|ezer|(?:monoi|rstandar)d)|i(?:g(?:i(?:tal(?:comic(?:museum|s)|spy)|key)|g)?|c(?:t(?:ionary|.?cc|leode)?|cionari)?|s(?:tro(?:watch)?|c(?:o(?:very|gs)|ussion)|ney)|l(?:bert|andau)|aspora(?:tags)?|(?:ra)?e|padova|igo)?|j(?:ango(?:me)?|packages)?|20(?:(?:pf)?srd)?|f(?:m(?:an)?|w|iles)?|r(?:i(?:bbb?le|nkify)|u(?:pal(?:api|contrib)?|gbank)|a[me]|eamincode)|a(?:t(?:a(?:sheet)?|piff|e)|wanda|nbooru|ilymotion|sh|font|pi|rklyrics)?|h(?:l(?:gm|de)?|net)|m(?:oz|an)?|t(?:ag|deals|c)|d[og]|u(?:c(?:k.?co)?|den)|l(?:ang|ss|po)|[wx]|cc|ns|&d)?|p(?:o(?:rt(?:ableapps)?|w(?:iki|ells)|ll(?:in|star)|st(?:e(?:n|rs)|gresql)|n(?:d5|sde)|e(?:try|ms)|dnapisi|psike|kepedia)|y(?:thon(?:3[120]?|2[76]|dev)?|3k|lons|pi|ramid|side)?|r(?:i(?:ce(?:grabber)?|beram|sjakt)|o(?:c(?:essing)?|nounce|ofwiki|garchives)|fc|pm)|e(?:r(?:l(?:mo(?:d|nks)|doc)?|ezhilton|seus)|ppermintos)|i(?:n(?:board|g|voke)|c(?:tures)?|rate(?:nwiki|sea|bay)|x(?:iv|elp)|tchfork)|b(?:[si]|one)?|u(?:n(?:chfork|guzo)|c|rolator|ppet|bmed)|a(?:r(?:a(?:shift|bola)|lysearch|king)|l(?:eo|gn)|t(?:ft|ternry)|ndora|(?:gin|ckag)e|stebin)|s(?:ql|implified)?|c(?:g(?:w|arage)|mag|world|partpicker)|p(?:[ca]|lware)|h(?:p(?:net)?|oto(?:bucket|dune))|l(?:a(?:y(?:term|list|asia)?|n(?:etmc|3t))|ot)|d[bf]|kgs(?:rc)?|minister|[gt]p|w|4k)|1(?:23p(?:eople)?|1870|ddl)|n(?:e(?:w(?:s(?:day|(?:vin|archiv)e|max|yc|now|week|comau)?|(?:ff|yorke)r|ark|grounds|egg)|t(?:(?:fli|work)x|craft|gear|hack)|st(?:uk|de)|xt)?|f[lb]|a(?:t(?:uresp|ionalgeograph)ic|sa|ver|jdi|ruto|metoolkit)|b(?:sdman|a)|u(?:llege|get|tridata|mpy)|o(?:rsk|kiamaps|lo|aa|de)|i(?:n(?:ja|tendolife)|co(?:linux)?|h|if)|rc(?:next)?|y(?:aa|(?:pos)?t)|p[mr]|zb(?:matrix|s)?|v(?:idia|d)|c(?:[ze]|iku|heap|bi)|(?:nd|la)b|ds|hl|x|ginxwiki)?|a(?:l(?:l(?:e(?:gro|lec|xperts)|m(?:ovie|usic)|abolag|(?:(?:bibl|recip)e|poster)s|ocine)|exa(?:si)?|bum(?:art(?:c|dv)d)?|t(?:ernat(?:ive(?:to)?|e)|t?o)|jazeera|c)|o(?:ps|3)|r(?:t(?:work|ist|urogoga)|c(?:h(?:ived?|pkg|forums|linux|aur|wiki)?|gis(?:res)?)|s(?:technica)?|k|gos|duino|xiv)|z(?:font|lyric)s|c(?:ro(?:nyms?)?|ademic(?:earth)?|tive(?:den|state)|m|cuweather)|u(?:k(?:ro)?|s(?:gov|tralian)|(?:toca)?r|diojungle)|n(?:droid(?:pit)?|i(?:me(?:newsnetwork|lyrics)?|search|db)|yr|n|agram|swers)|p(?:p(?:le(?:d(?:iscuss|ev))?|brain|(?:n|shoppe)r|cel|engine|vv)|ac(?:kages|he)|i(?:dockruby)?|ertium)?|m(?:fr?|azon(?:mp3)?|c[an]|uk(?:mp3)?|jp|it|o|de|es)?|h[wk]|b(?:cn(?:ews|otation)|andonia|out|buc)|d(?:s(?:labs)?|libris(?:no|se|dk|fi)|[ac]|planner|dic7ed|(?:ob)?e)|s(?:k(?:ubuntu|sutra|news)?|[n3]|oiaf)|w(?:esomecow|img)|i(?:rbnb|on)|jc|vclub|t|gdl)?|i(?:con(?:finder|s)?|n(?:s(?:tructables|pire)|fo(?:chimps|space)|d(?:i(?:ego)?go|e(?:ed|pendent))|(?:taljazeer|vestopedi)a|ab|ci)|d(?:e(?:ntica|alode)|ioms)|m(?:age(?:net|s|ry)?|(?:f?d)?b|g|eem|slp)?|e(?:ee|c)|w(?:ant)?|k(?:ea(?:nl|fr|de)?|so)|p(?:ernity|(?:artsplane)?t|s|layer)?|s(?:o(?:hunt)?|bn(?:db|nu)|tockphoto|up|gd|itdown)|x(?:quick(?:(?:image|video)s)?)?|t(?:e[nos]|v|unes)|f(?:ixit|db)|r[cs]|op?s|bm|usethis|(?:archiv|lsole24or)e|qdb|gn)?|r(?:o(?:t(?:tentomatoes|o)|s(?:ettacode)?|ckethub|m|otsarchives|ku|adandtrack|btex|llingstone)|e(?:c(?:i(?:pes?|va)|ycle|ordclick)|d(?:f(?:lagdeals|in)|tram|z|dit)|ad(?:thedocs|writeweb)|g(?:ister|ex)|tailmenot|i|ed|(?:flet|uter)s|pubblica)|b(?:l|ugs)|t(?:news)?|p(?:m(?:find)?|ggeek|s)|f(?:c|aces)|u(?:by(?:doc|gems)?|tube)|s(?:eek|wiki)|a(?:nd(?:om|t)|p(?:idonline|genius)|ils(?:dock)?|teyourmusic|diotimes|e|cket)|i(?:pestat|cardo|ngtones)|d(?:io|ns|oc)|l(?:ib|slog)|hyme|ym|mp)?|t(?:h(?:e(?:s(?:aurus|ession|tar)|m(?:ag|oviedb|eforest)|fu(?:toncritic|llwiki)|(?:on|nat)ion|h|register|piratebay)|in(?:k(?:geek|tutorial)|giverse)|oma(?:nn|s)|wiki|alia|umbplay)|v(?:(?:trope|link)s|com|(?:rag|guid)e|db)?|r(?:a(?:de(?:m(?:arks|e)|ra)|ns(?:fermarkt|late)|c(?:eroute|k)|kt|ffic|iler)|i(?:squel|padvisor)|u(?:veo|eknowledge|lia)|e(?:ccani|llo)|l|fde)?|i(?:n(?:y(?:url|pic)|eye)|g(?:erdirect|source|db)?|cket(?:network|s|master)|mestamp|[vh]o)|p(?:bs?|roj|p)|u(?:reng|aw|nein|mblr|dou)|o(?:r(?:rent(?:freak|z)?|wiki)|f|kyotosho|nes|psy|uhou|talcmd|mshardware)|a(?:r(?:inga|get)|wlk|toeba|obao|nzil|bs|stekid)|e(?:x(?:ture)?|r(?:raria)?|ch(?:(?:iri|right)s|(?:ne|dir)t|jungle|crunch)|legraph|(?:amliqui)?d)|f(?:d|2wiki)|w(?:i(?:t(?:ch|ter)|npedia)|e(?:et(?:grid)?|akers)|n)?|k(?:nowledge)?|c(?:rf|l)?|l(?:dp?|fi)|m(?:[zt]|db)|s[ar]|(?:n|gdic)?t|yda|411|z)?|y(?:m(?:ap|ovie)s|o(?:u(?:t(?:ube|ify)|ku|dao)|pmail)|u(?:mmly|i|bnub)|a(?:n(?:dex(?:m(?:aps)?|en)?|swers)|en|hoo)?|e(?:l(?:lownz|p)|gg|ahway)|i(?:ppy|mages|i)|f(?:inance)?|tw?|go|[rc]|jp|news)?|q(?:tc?|rz?|u(?:o(?:ra|tes)|ran|ixey|(?:eryca|antcas)t)|o(?:buz|mun)|ype|wiki|ssl)|j(?:q(?:uery)?|a(?:va(?:[4567]|script)?|lop(?:nik)?|ba|r|mendo)|i(?:sho[ej]?|gsaw|nni)|s(?:tor)?|e(?:ux(?:video.com)?|t(?:wick|slide)|opardy|d)|o(?:b|hnlewi)s|[lf]|umpr|dk|pg|cpenney)|k(?:p(?:op|rojects)|a(?:p(?:i|aza)|zazz|yak|rmadecay|t)|i(?:ndle(?:uk)?|ck(?:starter|(?:new|asstorrent)s)|llerstartups)|o(?:lw?|(?:der)?s|(?:b|mputek)o|ng|tobank)|t(?:b|echbase)|e(?:epvid|rodicas|lkoo)|h(?:anacademy|ronos)|c(?:ls|ommunity)|(?:kbruc|nowyourmem)e|ym|bugs|uler)|x(?:i(?:ami|ng)|d(?:af?|cc)|ep|kcd|marks|86|anga)|h(?:e(?:ad-?fi|cf|s|ise|roku|lp)|o(?:w(?:t(?:hingswork|oforge)|stuffworks|jsay)|me(?:depot|base)|epli|tukdeals|st|ogle)|a(?:b(?:ra|botrading)|ck(?:a(?:ge|day)|ernews)|rk|lf|stane|doop|yoo)|p(?:hys|v)?|u(?:ffingtonpost|lu)|n(?:search)?|i(?:storious|tta|ghrec|5)|tf|gnc|ypem|33t|rwiki|18)|f(?:i(?:n(?:d(?:l(?:aw|unchin)|chips|jar)|alfantasy|n)|le(?:stube|xt|crop|(?:hipp|inf)o)?|refox|shpond)|r(?:e(?:e(?:dict(?:ionary)?|bsd(?:man)?|[nc]ode)|sh(?:meat|ports)|itag)|ancesurf|iendster)|o(?:r(?:kd|rst|bes|vo)|o(?:lz?|d(?:subs)?|find)|to(?:banka|log)|l(?:ktunefinder|ha)|ursquare|wiki|(?:xnew|nplu)s)|t(?:p|ube|ram)?|a(?:twallet|(?:ceboo|r)k|ncy)|u(?:r(?:affinity|et)|llwiki|zz)|l(?:i(?:ck(?:r(?:iver|c)?|peek)|pkart)|a(?:shback|ttr)|uidinfo|ex)|br?|e(?:d(?:ex|orawiki)|nopy|edbooks|fe)|sfe?|c(?:atch)?|da?|g?f|nac|ports|xr)|v(?:i(?:deo(?:hive|sift)?|m(?:scripts|doc|eo)|asona|ewpdf)|a(?:l(?:a|idate|leywag)|(?:ndal|galum)e)|g(?:g(?:uk|de)?|mdb|d)|e(?:r(?:o(?:nica|ot)|s(?:andapo|iontracker)|b(?:omatic)?|ge)|ekun|oh|mo)|o(?:gue(?:uk)?|l|ssey)|box7|ukajlija|(?:mk|nd)b|tkcd)?|/.j?|z(?:u(?:ckerzauber|mi)|a(?:p(?:(?:ik|po)s|aday)|nran|he|vvi)|i(?:pca|llow)|e(?:mljevid|rohedge)|bmath|f|yrv|(?:vo|he)n|dnet|oho)|4(?:3things|chan|shared)|.(?:net|/)|3tailer|7digital|9gag|013))$");
gra2 = new RegExp("\\b(selling|sellers?|rents?|stores?|shops?|shopping|shopper|buy|orders?|products?|pricing|prices?|reviews?|deals|dealer|isbn)\\b", "i");
gra = new RegExp("^https?://(?:www.|)(amazon|netflix|(?:rover.|)ebay|shopping.yahoo|barnesandnoble|bizrate|imdb|nextag|cnet|buy|blockbuster|powells|target|walmart|newegg|macys|overstock|khols|kmart|sears|homedepot|jcpenney|qvc|last|cdwow|cduniverse|mtv|getglue|rhapsody|pandora|tower|goodreads|teenourmous|cafepress|zazzle|spreadshirt|shelfari|oreilly|librarything|worldcat|costco|ikea|jcpenney|johnlewis|staples|etsy|allposters|circuitcity|bestbuy|toysrus|shopping|coupons.thefind|lyricsmode|metrolyrics|librarything|dpreview|gizmodo)\\.");
gram = new RegExp("^https?://(?:www.|)(cdwow|cduniverse|mtv|rhapsody|pandora|lyricsmode|metrolyrics|last)\\.");
grab = new RegExp("^https?://(?:www.|)(oreilly|shelfari|goodreads|librarything|barnesandnoble)\\.");
grad = new RegExp("^https?://(?:www.|)(netflix|imdb)\\.");
grae = new RegExp("^https?://(?:www.|)(newegg|dpreview|gizmodo)\\.");
gra3 = new RegExp("^https?://.*amazon.com.*/dp/([\\dA-Z]{10})[/?]");
grbn = new RegExp("news");
grbm = new RegExp("loca");
tr = new Array();
ts = new Array();
rd = new Array();
rsd = new Array();
reb = new Array();
dow = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
ga = "//icons.duckduckgo.com/i/";
gd = "http://duckduckgo.com/";
if (issl) {
    gd = "https://duckduckgo.com/"
}
fb = ci = iwa = irl = idom = il = dz = da = dam = daiq = daia = fz = tl = tlz = sx = sy = fl = fo = fa = fn = rdc = rtc = rsc = rii = rin = rebc = tsl = tac = tn = tz = fe = fmx = fmy = ieof = iad = iad2 = iad3 = iadt = 0;
kurl = "";
rpc = fk = fs = 1;
rl = YAHOO.util.Cookie.get("l") || "us-en";
if (w.kl) {
    rl = kl
}
rp = YAHOO.util.Cookie.get("p") || 1;
if (w.kp) {
    rp = kp
}
if (w.k1 && w.k1 == "-1") {
    DDG.is_ad_blocked = true
}
if (w.r2c) {
    rir = "r2-0"
}

function nfn(f) {
    if (!isFinite(f)) {
        return f
    }
    var e = "" + f,
        a = Math.abs(f),
        b, c;
    if (a >= 1000) {
        b = ("" + a).split(/\./);
        c = b[0].length % 3 || 3;
        b[0] = e.slice(0, c + (f < 0)) + b[0].slice(c).replace(/(\d{3})/g, ",$1");
        e = b.join(".")
    }
    return e
}

function nutr(b) {
    var a = tr.length;
    tr[a] = b;
    return a
}

function nutp(c) {
    var a, b;
    b = Math.ceil(Math.random() * 10000000);
    a = nur("", "", "/t/" + c + "?" + b)
}

function nuv() {
    viewport_width = YAHOO.util.Dom.getViewportWidth();
    if (screen.width < viewport_width && screen.width < 500) {
        viewport_width = screen.width
    }
    viewport_height = YAHOO.util.Dom.getViewportHeight();
    if (screen.height < viewport_height && screen.height < 500) {
        viewport_height = screen.height
    }
}

function ntk() {
    if (confirm(l("Hide this legend?"))) {
        YAHOO.util.Cookie.set("k", "l", {
                expires: new Date("January 12, 2025")
            });
        YAHOO.util.Dom.setStyle("keyboard_shortcuts", "display", "none")
    }
}

function nte() {
    if (confirm(l("Hide feedback icon?"))) {
        YAHOO.util.Cookie.set("e", "-1", {
                expires: new Date("January 12, 2025")
            });
        YAHOO.util.Dom.setStyle("feedback_wrapper", "display", "none")
    }
}

function nux() {
    var a = 1;
    if ((!d.getElementById("zero_click_abstract") || YAHOO.util.Dom.getStyle("zero_click_abstract", "display") == "none")) {
        a = 0
    }
    if (d.getElementById("zero_click_heading") && YAHOO.util.Dom.getStyle("zero_click_heading", "display") == "block") {
        a = 1
    }
    return a
}

function nua(j, k, h, g, b, e, c, a) {
    if (!b) {
        b = tr.length;
        tr[b] = k
    }
    if (!h) {
        h = 10
    }
    if (!g) {
        setTimeout(j + "(tr[" + b + "]," + e + "," + c + "," + a + ");", h)
    } else {
        if (!tsl) {
            tsl = ts.length;
            setTimeout(j + "(tr[" + b + "]," + e + "," + c + "," + a + ");tsl=0", 10)
        } else {
            setTimeout("nua(" + j + ",0,1," + b + "," + e + "," + c + "," + a + ")", 100)
        }
    }
}

function nkdc(a) {
    var b;
    if (a) {
        b = a.ctrlKey
    }
    return b
}

function nkdm(a) {
    var b;
    if (!ie && a) {
        b = a.metaKey
    }
    return b
}

function nkdt(a) {
    var b;
    if (a) {
        b = a.altKey
    }
    return b
}

function nkds(a) {
    var b;
    if (a) {
        b = a.shiftKey
    }
    return b
}

function nrl(b, a) {
    var c, e;
    b = b || window.event;
    fl = 1;
    c = nkdc(b) || nkdm(b) || "";
    if (!c && kn && kn == "1" && a && a.href && !DDG.detect_internal_link(a)) {
        c = 1
    }
    if (!c && (nkds(b) || fm || (b.button && (((!ie || ie9 || ie10p) && b.button == 1) || (ie && b.button == 4))))) {
        c = 1
    }
    if (c) {
        a.href = DDG.get_http_redirect(a);
        if (nkds(b) && !ie && !is) {
            nua("nug", a.href, "", "", "", c);
            return false
        } else {
            return true
        }
    } else {
        e = DDG.get_http_redirect(a);
        nua("nug", e);
        return false
    }
}

function nul(b) {
    var a, c;
    var a = b.href.indexOf("/l/?kh=-1&uddg=");
    if (a != -1) {
        c = decodeURIComponent(b.href.substring(a + 15))
    }
    if (c) {
        b.href = c
    }
    fl = 0
}

function nrg(j, b, f, g) {
    var e, a, c, h;
    if (!b) {
        b = 0
    }
    f = f || window.event;
    c = new RegExp("highlight_[a-z]*?(\\d+)");
    if (g && c.test(YAHOO.util.Dom.get(j).className)) {
        b = DDG.get_link_num(RegExp.$1)
    }
    if (b == "-1") {
        e = j.getElementsByTagName("a")[j.getElementsByTagName("a").length - 1]
    } else {
        e = j.getElementsByTagName("a")[b] || j.getElementsByTagName("a")[0]
    } if (!g) {
        g = nkdc(f) || nkdm(f) || fn
    }
    if (!g && kn && kn == "1") {
        g = 1
    }
    if (g && e && e.href && e.getAttribute("href").indexOf("http") == -1) {
        g = 0
    }
    if (e.href && e.href != "javascript:;") {
        nhr(j.id);
        if (fl) {
            fl = 0
        } else {
            fl = 1;
            a = DDG.get_http_redirect(e);
            if (g) {
                nug(a, g)
            } else {
                nua("nug", a, "", "", "", g)
            }
        }
    } else {
        if (fl) {
            fl = 0
        } else {
            if (e.href && e.href == "javascript:;") {
                e.onclick()
            }
        }
    }
}

function nug(e, g) {
    var b, c, f, a;
    fl = 0;
    fn = 0;
    a = "";
    if (window.getSelection) {
        a = window.getSelection().toString()
    } else {
        if (document.selection) {
            a = document.selection.createRange();
            a = a.text
        }
    }
    var h = a == DDG.last_selection ? 1 : 0;
    DDG.last_selection = a;
    if (!h) {
        return false
    }
    if (g) {
        window.open(e)
    } else {
        if (ih5 && !is && !ip && !is_konqueror && kg != "p" && (!kd || kd == 1)) {
            b = document.getElementById("iframe_hidden");
            b.contentWindow.postMessage("ddg:" + e, location.protocol + "//" + location.hostname)
        } else {
            if ((ie || ip || ir || is || im) && e.indexOf("http") != -1 && kg != "p" && (!kd || kd == 1)) {
                if (d.getElementById("iframe_hidden")) {
                    d.body.removeChild(d.getElementById("iframe_hidden"))
                }
                c = "<html><head><meta name='referrer' content='origin'></head><body><script language='JavaScript'>parent.window.location.href=\"" + e + '";<\/script></body></html>';
                b = d.createElement("iframe");
                b.id = "iframe_hidden";
                d.body.appendChild(b);
                f = b.document;
                if (b.contentDocument) {
                    f = b.contentDocument
                } else {
                    if (b.contentWindow) {
                        f = b.contentWindow.document
                    }
                }
                f.open();
                f.writeln(c);
                f.close()
            } else {
                w.location = e
            }
        }
    }
}

function nrt(a) {
    var b = d.getElementById("search_elements_hidden");
    if (b) {
        b.innerHTML = '<input type="hidden" name="v">';
        document.x.v.value = a;
        setTimeout("document.x.submit()", 100)
    }
}

function nrv(a, g, q, b) {
    if (!a) {
        return false
    }
    var f, n, r, o, m, k, e, h, p, c;
    f = a;
    a = a.parentNode;
    if (a && a.style) {
        while (YAHOO.util.Dom.getStyle(a, "display") == "none") {
            nsr(a.previousSibling.firstChild, a != f.parentNode ? 1 : 0, q);
            a = a.parentNode
        }
    }
    if (f.id == "r1-" + (parseInt(r1c) - 1)) {
        if (!il && nrb && (!kc || kc != "-1")) {
            nrb("", 1)
        }
    }
    if (!g) {
        if (f.className && f.className.indexOf("highlight") == -1 && f.children.length) {
            for (var e = 0; e < f.children.length; e++) {
                var j = f.children[e];
                if (j && j.className && j.className.indexOf("highlight") != -1) {
                    f = j;
                    break
                }
            }
        }
        if (!YAHOO.util.Dom.hasClass(f, "highlight")) {
            YAHOO.util.Dom.addClass(f, "highlight");
            if (YAHOO.util.Dom.hasClass(f, "highlight_sponsored")) {
                YAHOO.util.Dom.addClass(f, "highlight_sponsored_hover")
            }
            n = nun(f);
            o = YAHOO.util.Dom.getY(f);
            m = YAHOO.util.Dom.getDocumentScrollTop();
            if (b && n && !fq && o > m) {
                n.focus();
                n.onclick = function (s) {
                    return nrl(s, this)
                }
            }
            h = YAHOO.util.Dom.getElementsByClassName("hidden", "a", f);
            for (p in h) {
                c = h[p];
                if (!c) {
                    continue
                }
                YAHOO.util.Dom.removeClass(c, "hidden");
                YAHOO.util.Dom.addClass(c, "hidden2");
                break
            }
        }
    }
    if (f.childNodes[1] && f.childNodes[1].childNodes[1] && f.childNodes[1].childNodes[1].className == "hidden") {
        f.childNodes[1].childNodes[1].style.display = "inline"
    }
}

function nun(e) {
    var b, a, c;
    b = "";
    a = 0;
    re = new RegExp("highlight_?[a-z]*?(\\d+)");
    if (re.test(YAHOO.util.Dom.get(e).className)) {
        a = DDG.get_link_num(RegExp.$1)
    }
    if (a == "-1") {
        b = e.getElementsByTagName("a")[e.getElementsByTagName("a").length - 1]
    } else {
        b = e.getElementsByTagName("a")[a] || e.getElementsByTagName("a")[0]
    }
    return b
}

function nro(a, o, k) {
    var m, c, b, p, n, j, f, g, q, e;
    if (!a) {
        return false
    }
    if (!YAHOO.util.Dom.hasClass(a, "highlight") && a.className && a.children.length) {
        for (var f = 0; f < a.children.length; f++) {
            var h = a.children[f];
            if (YAHOO.util.Dom.hasClass(h, "highlight")) {
                a = h;
                break
            }
        }
    }
    if (YAHOO.util.Dom.hasClass(a, "highlight")) {
        if (o && k) {
            c = YAHOO.util.Dom.getX(a);
            b = c + a.scrollWidth;
            p = YAHOO.util.Dom.getY(a);
            n = p + a.scrollHeight;
            if (o > c && o < b && k > p && k < n) {
                return false
            }
        }
        YAHOO.util.Dom.removeClass(a, "highlight");
        if (YAHOO.util.Dom.hasClass(a, "highlight_sponsored_hover")) {
            YAHOO.util.Dom.removeClass(a, "highlight_sponsored_hover")
        }
        g = YAHOO.util.Dom.getElementsByClassName("hidden2", "a", a);
        for (q in g) {
            e = g[q];
            if (!e) {
                continue
            }
            YAHOO.util.Dom.removeClass(e, "hidden2");
            YAHOO.util.Dom.addClass(e, "hidden");
            break
        }
        m = nun(a);
        if (m && !fq) {
            m.blur()
        }
    }
}

function nrq(k) {
    var c, o, n, h, g, f, e, m, a, b, j;
    nuv();
    if (!k || !k.length) {
        return false
    }
    div = d.getElementById("side_suggestions");
    h = d.getElementById("side_wrapper");
    if (div && YAHOO.util.Dom.getStyle(h, "display") == "block" && (YAHOO.util.Dom.getY(h) + h.scrollHeight + 250 < viewport_height)) {
        g = d.createElement("div");
        g.innerHTML += '<div class="spacer_bottom_7">' + l("Search suggestions") + ":</div>";
        n = g;
        j = 0;
        for (c = 0; c < k.length; c++) {
            o = k[c];
            a = o.s || "";
            b = o.r || "";
            if (d.referrer.match(a)) {
                continue
            }
            j++;
            f = d.createElement("div");
            f.onclick = function () {
                nrqc(this.firstChild)
            };
            m = d.createElement("a");
            if (b) {
                m.innerHTML = " " + b + " -> "
            }
            m.innerHTML += a;
            m.nrqs = a;
            m.nrqr = b;
            m.href = "javascript:;";
            YAHOO.util.Dom.addClass(f, "search_suggestion");
            f.appendChild(m);
            g.appendChild(f);
            if (j == 1) {
                YAHOO.util.Dom.setStyle(f, "margin-top", "2px")
            }
            if (j == 7) {
                break
            }
            if (j == 8 && k.length > 10) {
                e = d.createElement("div");
                g.appendChild(e);
                YAHOO.util.Dom.setStyle(e, "display", "none");
                m = d.createElement("a");
                m.innerHTML = l("More") + "...";
                m.onclick = function () {
                    nsh("cpq")
                };
                m.href = "javascript:;";
                m.id = "cpq";
                e.id = "cpqh";
                div.insertBefore(m, div.firstChild);
                div.insertBefore(g, div.firstChild);
                g = e
            }
        }
        if (j >= 8 && k.length > 10) {
            div.insertBefore(e, div.firstChild.nextSibling)
        } else {
            div.insertBefore(g, div.firstChild)
        }
        YAHOO.util.Dom.setStyle(div, "padding-top", "10px");
        YAHOO.util.Dom.setStyle(div, "padding-bottom", "15px");
        YAHOO.util.Dom.setStyle(div, "display", "block")
    }
}

function nrqc(a) {
    if (a.nrqr) {
        d.x.q.value = d.x.q.value.replace(new RegExp(a.nrqr, "i"), a.nrqs)
    } else {
        if (a.nrqs.indexOf(" ") != -1) {
            d.x.q.value += ' "' + a.nrqs + '"'
        } else {
            d.x.q.value += " " + a.nrqs
        }
    }
    nutp("b1");
    setTimeout("document.x.submit()", 100)
}

function nrm(f, e) {
    var s, k, h, b, m, p, g, a, c, j, n, r, q, t, o;
    if (fq) {
        return false
    }
    if (fo) {
        setTimeout("nrm(" + f + ",'" + e + "')", 100);
        return false
    }
    fo = 1;
    nuv();
    s = new RegExp("r(\\d+)-(\\d+)");
    k = new RegExp("rl([ei])(\\d+)-(\\d+)");
    h = new RegExp("rld-(\\d+)");
    if (e) {
        if (s.test(e)) {
            b = RegExp.$1 || 0;
            m = RegExp.$2 || 0
        } else {
            if (e == "zero_click_abstract" || e == "did_you_mean") {
                b = 1;
                m = -1
            } else {
                fo = 0;
                return false
            }
        }
    } else {
        if (rc && rc.id == "zero_click_abstract") {
            b = 1;
            m = -1
        } else {
            if (rc && rc.id == "did_you_mean") {
                b = 1;
                m = -1
            } else {
                if (rc && s.test(rc.id)) {
                    b = RegExp.$1 || 0;
                    m = RegExp.$2 || 0
                } else {
                    if (rc && k.test(rc.id)) {
                        b = rs ? 1 : 2;
                        n = 1
                    } else {
                        if (rc && h.test(rc.id)) {
                            b = 1;
                            n = 1
                        } else {
                            rc = d.getElementById(DDG.first_result);
                            if (!rc) {
                                rc = d.getElementById("zero_click_abstract")
                            }
                            if (!rc) {
                                rc = d.getElementById("did_you_mean")
                            }
                            if (!rc) {
                                fo = 0;
                                return false
                            } else {
                                m = 0;
                                b = 1
                            }
                        }
                    }
                }
            }
        }
    }
    switch (f) {
    case 1:
        if (rc && rc.id && rc.id == DDG.first_result && !YAHOO.util.Dom.hasClass(rc, "highlight")) {} else {
            m++
        }
        break;
    case 2:
        m--;
        break;
    case 3:
        b++;
        m = 0;
        break;
    case 4:
        b--;
        m = 0;
        break;
    case 5:
        break;
    case 6:
        break;
    case 7:
        m++;
        break;
    default:
        m++
    }
    a = "r" + b + "-" + m;
    if (m <= -1) {
        if (d.getElementById("did_you_mean")) {
            a = "did_you_mean"
        } else {
            a = "zero_click_abstract"
        }
    }
    c = d.getElementById(a);
    j = 0;
    if (e) {
        j = d.getElementById(e)
    }
    if (f == 1 && b == 2 && !c && r1c) {
        a = DDG.first_result;
        c = d.getElementById(a)
    }
    if (f == 1) {
        o = YAHOO.util.Dom.getDocumentScrollTop();
        t = YAHOO.util.Dom.getY(a);
        if (t && (t < o || t > o + viewport_height)) {
            p = 0;
            while (p > -1) {
                g = d.getElementById("r1-" + p);
                if (!g) {
                    break
                }
                t = YAHOO.util.Dom.getY(g.id);
                if (t - 90 < o) {
                    p++
                } else {
                    c = g;
                    break
                }
            }
        }
    }
    if (f == 2) {
        o = YAHOO.util.Dom.getDocumentScrollTop();
        t = YAHOO.util.Dom.getY(a);
        if (t < o || t > o + viewport_height) {
            p = r1c - 2;
            while (p > 0) {
                g = d.getElementById("r1-" + p);
                t = YAHOO.util.Dom.getY(g.id);
                if (!g) {
                    break
                }
                if (t + 90 > o + viewport_height) {
                    p--
                } else {
                    c = g;
                    break
                }
            }
        }
    }
    if (j && !c && f == 7 && j.nextSibling && j.nextSibling.firstChild) {
        if (j.nextSibling.firstChild.onclick) {
            j.nextSibling.firstChild.onclick()
        }
        fo = 0;
        return
    } else {
        if (!j && !c && f == 7 && rc && rc.nextSibling && rc.nextSibling.firstChild) {
            if (rc.nextSibling.firstChild.onclick) {
                rc.nextSibling.firstChild.onclick()
            }
            fo = 0;
            return
        }
    } if ((a == "zero_click_abstract" || a == "did_you_mean") && YAHOO.util.Dom.getStyle(c, "display") == "none") {
        if (a == "zero_click_abstract" && r2c) {
            c = d.getElementById("r2-0")
        } else {
            fo = 0;
            return
        }
    }
    if (n) {
        switch (f) {
        case 1:
            if (b == 2) {
                c = rc.nextSibling.nextSibling;
                if (!c) {
                    a = DDG.first_result;
                    c = d.getElementById(a)
                } else {
                    if (YAHOO.util.Dom.getStyle(c, "display") == "none") {
                        c = c.nextSibling.firstChild;
                        if (!c.id && c.nextSibling) {
                            c = c.nextSibling
                        }
                    }
                }
            } else {
                if (b == 1 && rc.nextSibling.nextSibling) {
                    c = rc.nextSibling.nextSibling.nextSibling
                } else {
                    if (1) {
                        a = DDG.first_result;
                        c = d.getElementById(a)
                    } else {
                        c = rc.nextSibling.firstChild
                    }
                }
            }
            break;
        case 2:
            c = rc.previousSibling.previousSibling;
            if (YAHOO.util.Dom.getStyle(c, "display") == "none") {
                c = c.nextSibling.lastChild
            }
            break;
        case 4:
            break;
        case 7:
            if (rc.nextSibling.nextSibling) {
                c = rc.nextSibling.nextSibling.nextSibling
            } else {
                c = rc.nextSibling.firstChild
            }
            break;
        default:
            fo = 0;
            return false
        }
    }
    if (c) {
        if (b == 1 && k.test(c.id)) {
            c = c.nextSibling.firstChild
        }
        if (f != 7) {
            if (rc) {
                nua("nro", rc)
            }
        }
        if (f != 5 && (b == 2 || rs) && YAHOO.util.Dom.getStyle(c.parentNode, "display") == "none") {
            r = c;
            while (r.parentNode.id != "zero_click_topics" && r.parentNode.id != "links" && r.parentNode.id != "content") {
                r = r.parentNode;
                if (!q && YAHOO.util.Dom.getStyle(r, "display") == "block") {
                    q = r
                }
            }
            if (q && n) {
                c = r.nextSibling.nextSibling
            } else {
                if (YAHOO.util.Dom.getStyle(r, "display") == "none") {
                    c = r.previousSibling
                } else {
                    if (r.nextSibling && YAHOO.util.Dom.getStyle(r.nextSibling, "display") == "block") {
                        c = q.lastChild.previousSibling
                    } else {
                        if (f == 2 && r.previousSibling) {
                            c = r.previousSibling
                        } else {
                            if (f == 1 && r.nextSibling && YAHOO.util.Dom.getStyle(r.nextSibling, "display") == "none") {
                                c = r.nextSibling.nextSibling.firstChild.nextSibling
                            } else {
                                if (f == 1 && !r.nextSibling) {
                                    c = r.previousSibling
                                }
                            }
                        }
                    }
                }
            } if (k.test(c.id) && rs && RegExp.$1 == "e") {
                c = c.nextSibling.firstChild
            }
        }
        nua("nrv", c, 0, 1, 0, f == 7 ? 1 : 0, (f == 5 || f == 7) ? 1 : 0, 1);
        if (f != 7) {
            rc = c
        }
        if (f != 7 && rc && rc.id && rc.id != DDG.first_result) {
            if (fk && (m > 6 || f == 2)) {
                if (!io) {
                    nua("nrs", rc, 0, 1, 0, 1, f == 5 ? 0 : (f == 1 ? 1 : -1))
                } else {
                    nrs(rc, 1, f == 5 ? 0 : (f == 1 ? 1 : -1))
                }
            } else {
                if (!io) {
                    nua("nrs", rc, 0, 1)
                } else {
                    nrs(rc, 0, 0)
                }
            }
        }
    } else {
        if (b == 1 && a != "zero_click_abstract" && a != "did_you_mean" && !ieof && (!rs || !it) && ++ci < 20) {
            nrv(d.getElementById("r1-" + parseInt(r1c - 1)), 1);
            setTimeout("nrm(" + f + ",'" + e + "')", 100)
        }
    } if (io && f == 1 && nrb) {
        nrb()
    }
    fo = 0
}

function nrs(b, f, e) {
    var g, a, c, j, h;
    g = YAHOO.util.Dom.getY(b);
    c = b.scrollHeight;
    a = YAHOO.util.Dom.getDocumentScrollTop();
    nuv();
    h = viewport_height / 2;
    if (!c || g == a) {
        return
    }
    if (f || ((g + c + 10) > (viewport_height + a)) || ((g - 10) < a)) {
        j = g - h;
        if (!e || (e == 1 && (g - a) > h) || (e == -1 && (g - a) < h)) {
            w.scroll(0, j)
        }
    }
}

function nki(a) {
    if (fq) {
        return false
    }
    if (a && (nkdc(a) || nkdm(a) || nkds(a) || nkdt(a) || fa)) {
        return false
    }
    fk = 1;
    if (rii) {
        nrm(5, rii)
    }
}

function nkr(a) {
    if (fq) {
        return false
    }
    if (a && (nkdc(a) || nkdm(a) || nkds(a) || nkdt(a) || fa)) {
        return false
    }
    fk = 1;
    if (rir) {
        nrm(5, rir)
    }
}

function nkda(a) {
    if (fq) {
        return false
    }
    if (a && (nkdc(a) || nkdm(a) || nkds(a) || nkdt(a) || fa)) {
        return false
    }
    fk = 1;
    nrm(1)
}

function nkua(a) {
    if (fq) {
        return false
    }
    if (a && (nkdc(a) || nkdm(a) || nkds(a) || nkdt(a) || fa)) {
        return false
    }
    fk = 1;
    nrm(2)
}

function nke(c) {
    if (fq) {
        if (YAHOO.util.Dom.getStyle("bang", "display") == "block") {
            nbb(d.getElementById("bang"))
        }
        return false
    }
    if (c && (nkdc(c) || nkdm(c) || nkds(c) || nkdt(c) || fa)) {
        return false
    }
    fk = 1;
    if (rc && (!kn || kn != "1")) {
        var b = new RegExp("rl([ei])(\\d+)-(\\d+)");
        var a = new RegExp("^r2-(\\d+)$");
        if (rc.id && b.test(rc.id)) {
            if (a.test(rc.nextSibling.firstChild.id)) {
                rc = rc.nextSibling.firstChild
            } else {
                rc = rc.nextSibling.firstChild.nextSibling
            }
            nrv(rc)
        } else {
            rc.onclick()
        }
    }
}

function nko(a) {
    if (fq) {
        return false
    }
    if (a && (nkdc(a) || nkdm(a) || nkds(a) || nkdt(a) || fa)) {
        return false
    }
    fk = 1;
    if (rc) {
        rc.onclick()
    }
}

function nkt(a) {
    if (fq) {
        return false
    }
    if (a && (nkdc(a) || nkdm(a) || nkds(a) || nkdt(a) || fa)) {
        return false
    }
    fk = 1;
    nuo()
}

function nkd(a) {
    if (fq) {
        return false
    }
    if (a && (nkdc(a) || nkdm(a) || nkds(a) || nkdt(a) || fa)) {
        return false
    }
    fk = 1;
    nrg(rc, "-1")
}

function nkn(a) {
    if (fq) {
        return false
    }
    if (a && (nkdc(a) || nkdm(a) || nkds(a) || nkdt(a) || fa)) {
        return false
    }
    fk = 1;
    fn = 1;
    if (rc) {
        rc.onclick()
    }
}

function nkm(a) {
    if (fq) {
        return false
    }
    if (a && (nkdc(a) || nkdm(a) || nkds(a) || nkdt(a) || fa)) {
        return false
    }
    fk = 1;
    if (d.getElementById(DDG.first_result)) {
        nrm(5, DDG.first_result)
    }
}

function nkes(a) {
    if (a && (nkdc(a) || nkdm(a) || nkds(a) || nkdt(a) || fa)) {
        return false
    }
    if (fq) {
        fq = 0;
        d.x.q.blur();
        if (rc && rc.id) {
            nrm(5, rc.id)
        }
    }
    DDG.toggleall("grp_modal", "-1")
}

function nkex(a) {
    if (fq) {
        return false
    }
    if (a && (nkdc(a) || nkdm(a) || nkdt(a) || fa)) {
        return false
    }
    fk = 1;
    nbc()
}

function nksb(a) {
    if (fq) {
        return false
    }
    if (a && (nkdc(a) || nkdm(a) || nkds(a) || nkdt(a) || fa)) {
        return false
    }
    fk = 1;
    if (!il && nrb) {
        nrb()
    }
}

function nksp(a) {
    var b;
    if (fq) {
        return false
    }
    if (a && (nkdc(a) || nkdm(a) || nkds(a) || nkdt(a) || fa)) {
        return false
    }
    fk = 1;
    if (YAHOO.util.Dom.getStyle("did_you_means", "display") == "block") {
        nrm(5, "did_you_mean")
    }
}

function nks(a) {
    if (fq) {
        return false
    }
    if (a && (nkdc(a) || nkdm(a) || nkds(a) || fa)) {
        return false
    }
    fk = 1;
    setTimeout("d.x.q.focus()", 10);
    setTimeout("d.x.q.select()", 15);
    if (ko && ko == "s") {
        setTimeout("w.scrollTo(0,0)", 10)
    }
}

function nhs(a) {
    nrm(5, a)
}

function nhr(a) {
    d.getElementById("state_hidden").value = a
}

function nrp(f, g, h) {
    var a, j, e;
    if (!f) {
        return false
    }
    var c = d.getElementById("zero_click_abstract");
    var b = d.getElementById("did_you_means");
    if (!d.getElementById("special_page_header") && (!c || YAHOO.util.Dom.getStyle("zero_click_abstract", "display") == "none" || h == 1) && YAHOO.util.Dom.getStyle("did_you_means", "display") == "none") {
        e = f.replace(/%20/i, "+");
        if (d.referrer.indexOf(e) != -1 && e.indexOf("duckduck") == -1) {
            return false
        }
        var j = d.createElement("div");
        j.id = "did_you_mean";
        j.innerHTML = "<b>Did you mean </b>";
        link = d.createElement("a");
        link.innerHTML = decodeURIComponent(g);
        link.href = "/?q=" + f + (rv ? "&v=" + rv : "") + (kurl ? kurl : "");
        link.onclick = function () {
            fl = 1
        };
        j.appendChild(link);
        j.appendChild(d.createTextNode("?"));
        YAHOO.util.Dom.addClass(j, "highlight_s1");
        a = b;
        a.insertBefore(j, a.firstChild);
        YAHOO.util.Dom.setStyle(b, "display", "block");
        if (d.getElementById("zero_click_answer")) {
            YAHOO.util.Dom.setStyle(b, "padding-bottom", "20px")
        }
        if (nir) {
            nir("s")
        }
    }
}

function nra2(b, e) {
    var c, a;
    c = d.getElementById(e);
    nuv();
    if (c) {
        if (b) {
            a = d.getElementById("zero_click_header");
            if (a) {
                a.innerHTML = b;
                YAHOO.util.Dom.setStyle(a, "display", "block");
                div3 = d.getElementById("zero_click_plus_wrapper");
                a.appendChild(div3.parentNode.removeChild(div3));
                YAHOO.util.Dom.addClass(div3, "icon_zero_click_header")
            }
        }
        a = d.getElementById("zero_click_abstract");
        a.appendChild(c);
        if (a) {
            YAHOO.util.Dom.setStyle(a, "display", "block")
        }
        a = d.getElementById("zero_click_wrapper");
        if (a) {
            YAHOO.util.Dom.setStyle(a, "display", "block")
        }
        if (a) {
            YAHOO.util.Dom.setStyle(a, "visibility", "visible")
        }
        if (viewport_width > 900) {
            if (ie6) {
                YAHOO.util.Dom.setStyle(a, "padding-top", "25px")
            }
        } else {
            if (viewport_width < 900) {
                if (ie6) {
                    YAHOO.util.Dom.setStyle(a, "padding-top", "45px")
                }
            }
        }
    }
}

function nra(q, e, z) {
    var n, b, a, h, k, c, u, s, t, F, D, m, g, y, r, I, E, H, C, B, A, f, G;
    var p, o, x;
    nuv();
    if (!q) {
        return
    }
    g = q.length;
    if (!g) {
        return
    }
    G = q[0];
    p = 0;
    if ((rt === "D") || (nux() && G.is_top)) {
        p = 1
    }
    if (nux() && (rt !== "D") && !p) {
        return false
    }
    if (p && d.getElementById("zero_click_abstract_stacked") && YAHOO.util.Dom.getStyle(d.getElementById("zero_click_abstract_stacked"), "display") == "block") {
        return false
    }
    C = "";
    x = 0;
    if (DDG.spice_force_time[G.s] || G.time) {
        x = 1
    }
    o = 0;
    if (G.h && !p && !DDG.spice_force_no_header[G.s]) {
        if (!x && (DDG.spice_force_big_header[G.s] || G.force_big_header)) {
            o = 2
        } else {
            o = 1
        }
    }
    if (!e) {
        if (o == 2 || p) {
            e = 4
        }
    }
    m = 0;
    for (y in q) {
        if (!q[y]) {
            continue
        }
        if (p && y > 0) {
            break
        }
        obj = q[y];
        if (x) {
            t = d.createElement("span");
            YAHOO.util.Dom.setStyle(t, "color", "#777");
            YAHOO.util.Dom.setStyle(t, "font-size", "11px");
            B = new Date();
            if (obj.time) {
                t.innerHTML = " - " + obj.time
            } else {
                t.innerHTML = " at " + B.toString()
            }
            f = t
        }
        r = new RegExp("^.*?//([^/?:#]+)");
        if (r.test(obj.u)) {
            I = RegExp.$1
        }
        if (DDG.spice_force_favicon_domain[G.s]) {
            I = DDG.spice_force_favicon_domain[G.s]
        } else {
            if (DDG.spice_force_favicon_url[G.s]) {
                E = DDG.spice_force_favicon_url[G.s]
            }
        } if (obj.a) {
            m++;
            if (m == 1) {
                if (obj.i && !p) {
                    b = d.getElementById("zero_click_plus_wrapper");
                    n = d.getElementById("zero_click_image");
                    if (b && !n) {
                        a = d.createElement("div");
                        a.id = "zero_click_image";
                        b.parentNode.insertBefore(a, b.nextSibling);
                        n = a
                    }
                    if (n && obj.i) {
                        if (obj.i.indexOf("http") == 0) {
                            obj.i = "<img src='/iu/?u=" + encodeURIComponent(obj.i) + "'>"
                        }
                        n.innerHTML = obj.i;
                        YAHOO.util.Dom.setStyle(n, "display", "block");
                        YAHOO.util.Dom.setStyle(n, "margin-top", "2px");
                        YAHOO.util.Dom.setStyle(n, "padding-bottom", "2px");
                        if (obj.w) {
                            YAHOO.util.Dom.setStyle(n, "width", obj.w + "px");
                            if (obj.w > 100) {
                                YAHOO.util.Dom.setStyle(n, "max-width", obj.w + "px");
                                YAHOO.util.Dom.setStyle(n.first_child, "max-width", obj.w + "px")
                            }
                        } else {
                            YAHOO.util.Dom.addClass(n.firstChild, "img_zero_click")
                        }
                    }
                    if (viewport_width > 728) {
                        A = YAHOO.util.Dom.getX("zero_click_image") - YAHOO.util.Dom.getX("zero_click_wrapper") - 50;
                        if (isNaN && !isNaN(A)) {
                            YAHOO.util.Dom.setStyle("zero_click_abstract", "max-width", A + "px")
                        }
                    } else {
                        YAHOO.util.Dom.setStyle("zero_click_abstract", "max-width", "100%")
                    }
                }
                n = p ? d.getElementById("zero_click_abstract_stacked") : d.getElementById("zero_click_abstract");
                if ((I || E) && !DDG.spice_force_no_icon[G.s] && !G.force_no_icon) {
                    H = d.createElement("img");
                    if (H) {
                        if (E) {
                            H.src = "/iu/?u=" + E
                        } else {
                            H.src = ga + I + ".ico"
                        }
                        h = d.createElement("a");
                        h.href = obj.u;
                        h.onclick = function () {
                            fl = 1
                        };
                        if (kn && kn == "1") {
                            h.target = "_blank"
                        }
                        if (e == 4) {
                            YAHOO.util.Dom.addClass(H, "icon_spice_inline")
                        } else {
                            YAHOO.util.Dom.addClass(H, "icon_spice")
                        }
                        h.appendChild(H);
                        if (e) {
                            C = h
                        } else {
                            n.appendChild(h)
                        }
                        YAHOO.util.Dom.addClass(n, "zero_click_snippet");
                        YAHOO.util.Dom.setStyle(n, "margin-right", "50px");
                        if (!z) {
                            if (e) {
                                YAHOO.util.Dom.addClass(n, "highlight_zero_click3")
                            } else {
                                YAHOO.util.Dom.addClass(n, "highlight_zero_click")
                            }
                        }
                    }
                } else {
                    YAHOO.util.Dom.addClass(n, "zero_click_snippet_no_image");
                    if (!z) {
                        YAHOO.util.Dom.addClass(n, "highlight_zero_click3")
                    }
                } if (o == 2) {
                    b = d.getElementById("zero_click_header");
                    a = d.getElementById("zero_click_plus_wrapper");
                    b.innerHTML += "<h1>" + obj.h + "</h1>";
                    YAHOO.util.Dom.setStyle(b, "display", "block");
                    b.appendChild(a.parentNode.removeChild(a));
                    YAHOO.util.Dom.addClass(a, "icon_zero_click_header")
                } else {
                    if (o == 1) {
                        n.innerHTML += obj.h;
                        if (f) {
                            n.appendChild(f)
                        }
                        n.innerHTML += '<div style="margin-top:5px"></div>'
                    }
                } if (typeof (obj.a) == "object") {
                    n.appendChild(obj.a);
                    n.appendChild(d.createTextNode(" "))
                } else {
                    n.innerHTML += obj.a + " "
                }
                h = d.createElement("a");
                h.href = obj.u;
                if (DDG.spice_force_message[obj.s]) {
                    h.innerHTML = DDG.spice_force_message[obj.s]
                } else {
                    if (G.force_more_at_logo) {
                        path = DDG.get_asset_path(G.force_more_at_logo[0], G.force_more_at_logo[1]);
                        H = d.createElement("img");
                        H.src = path;
                        H.id = "zero_click_more_at_logo";
                        h.innerHTML = "More at";
                        h.appendChild(H)
                    } else {
                        h.innerHTML = l("More at %s", obj.s)
                    }
                }
                YAHOO.util.Dom.addClass(h, "zero_click_more_at_link");
                h.onclick = function () {
                    fl = 1
                };
                if (kn && kn == "1") {
                    h.target = "_blank"
                }
                if (e && C) {
                    b = d.createElement("div");
                    if (DDG.spice_force_space_after[G.s] || G.force_space_after) {
                        YAHOO.util.Dom.setStyle(b, "margin-top", "5px")
                    } else {
                        if (e == 4) {
                            YAHOO.util.Dom.setStyle(b, "display", "inline")
                        } else {
                            if (e != 2) {
                                YAHOO.util.Dom.setStyle(b, "margin-top", "10px")
                            }
                        }
                    } if (e == 3) {
                        YAHOO.util.Dom.setStyle(C, "clear", "left");
                        YAHOO.util.Dom.setStyle(b, "clear", "left")
                    }
                    b.appendChild(h);
                    if (e == 4) {
                        b.insertBefore(C, b.firstChild)
                    } else {
                        b.appendChild(C)
                    }
                    n.appendChild(b);
                    b = d.createElement("div");
                    YAHOO.util.Dom.addClass(b, "clear");
                    n.appendChild(b)
                } else {
                    if (DDG.spice_force_space_after[G.s]) {
                        b = d.createElement("div");
                        YAHOO.util.Dom.setStyle(b, "margin-top", "5px");
                        b.appendChild(h);
                        n.appendChild(b)
                    } else {
                        n.appendChild(h)
                    }
                }
                YAHOO.util.Dom.setStyle(n, "display", "block");
                if (f && !obj.h) {
                    n.appendChild(f)
                }
            } else {
                if (m == 2) {
                    n = d.getElementById("zero_click");
                    b = d.createElement("div");
                    b.id = "zero_click_topics";
                    F = d.createElement("hr");
                    YAHOO.util.Dom.addClass(F, "horizontal_line");
                    b.appendChild(F);
                    n.appendChild(b)
                }
                n = d.getElementById("zero_click_topics");
                b = d.createElement("div");
                b.id = "r2-" + (r2c++);
                YAHOO.util.Dom.addClass(b, "results_zero_click");
                YAHOO.util.Dom.setStyle(b, "margin-right", "50px");
                a = d.createElement("div");
                YAHOO.util.Dom.addClass(a, "icon_fav");
                b.appendChild(a);
                a = d.createElement("div");
                YAHOO.util.Dom.addClass(a, "links_zero_click");
                h = d.createElement("a");
                h.url = gd + "?q=" + obj.t;
                h.href = "javascript:;";
                h.innerHTML = obj.t;
                h.onclick = function () {
                    fl = 1;
                    nrv(d.getElementById(this.parentNode.parentNode.id), 1);
                    YAHOO.util.Dom.addClass(this.parentNode.parentNode, "highlight_zero_click3");
                    if (nir) {
                        nir("zero_click")
                    }
                    setTimeout("fl=0", 100)
                };
                a.appendChild(h);
                t = d.createElement("span");
                t.innerHTML = " - " + obj.a + " ";
                YAHOO.util.Dom.addClass(t, "hidden");
                YAHOO.util.Dom.setStyle(t, "display", "none");
                h = d.createElement("a");
                h.href = obj.u;
                h.innerHTML = l("More at %s", obj.s);
                h.onclick = function () {
                    fl = 1
                };
                if (kn && kn == "1") {
                    h.target = "_blank"
                }
                t.appendChild(h);
                a.appendChild(t);
                b.appendChild(a);
                n.appendChild(b)
            } if (n) {
                c = n.getElementsByTagName("a");
                for (u = 0; u < c.length; u++) {
                    h = c[u];
                    if (h.href != "javascript:;") {
                        h.onclick = function () {
                            fl = 1
                        }
                    }
                }
            }
            if (m == 3) {
                break
            }
        }
    }
    if (m) {
        if (nir) {
            nir("zero_click")
        }
        n = d.getElementById("zero_click_wrapper");
        if (n) {
            YAHOO.util.Dom.setStyle(n, "display", "block");
            YAHOO.util.Dom.setStyle(n, "visibility", "visible");
            YAHOO.util.Dom.setStyle(n, "padding-top", "15px")
        }
        if (G.s === "Quixey") {
            YAHOO.util.Dom.addClass("zero_click_wrapper2", "quixey");
            var v = DDG.get_asset_path("quixey", "quixey.css");
            nrc(v)
        }
        if (p) {
            n = d.getElementById("zero_click_abstract_stacked")
        }
        if ((rt == "D" || p) && (!ki || ki == 1) && (!kz || kz == 1)) {
            F = d.createElement("hr");
            F.id = "zero_click_separator";
            YAHOO.util.Dom.addClass(F, "horizontal_line");
            YAHOO.util.Dom.setStyle(F, "width", "100%");
            YAHOO.util.Dom.setStyle(F, "clear", "both");
            n.parentNode.insertBefore(F, n)
        }
        if (!p && !DDG.spice_force_no_scroll[G.s] && !obj.force_no_fold && obj.s != undefined && G.s.indexOf("Punchfork") == -1) {
            n = d.getElementById("zero_click_wrapper2") || d.getElementById("zero_click_wrapper");
            if (n && n.scrollHeight > 150 && g == 1) {
                YAHOO.util.Dom.setStyle("zero_click_wrapper2", "height", "125px");
                YAHOO.util.Dom.setStyle("zero_click_wrapper2", "overflow", "auto");
                YAHOO.util.Dom.setStyle("zero_click_wrapper2", "margin", "auto");
                YAHOO.util.Dom.setStyle("zero_click", "padding-right", "0px");
                YAHOO.util.Dom.setStyle("zero_click", "padding-bottom", "5px");
                YAHOO.util.Dom.setStyle("zero_click_plus_wrapper", "padding-right", "5px");
                YAHOO.util.Dom.setStyle("zero_click_abstract", "margin-right", "40px")
            } else {
                if (n && n.scrollHeight > 125 && g > 1) {
                    YAHOO.util.Dom.setStyle("zero_click_wrapper2", "height", "100px");
                    YAHOO.util.Dom.setStyle("zero_click_wrapper2", "overflow", "auto");
                    YAHOO.util.Dom.setStyle("zero_click_wrapper2", "margin", "auto");
                    YAHOO.util.Dom.setStyle("zero_click", "padding-right", "0px");
                    YAHOO.util.Dom.setStyle("zero_click", "padding-bottom", "5px");
                    YAHOO.util.Dom.setStyle("zero_click_plus_wrapper", "padding-right", "5px");
                    YAHOO.util.Dom.setStyle("zero_click_abstract", "margin-right", "40px")
                }
            }
        }
        n = d.getElementById("zero_click_wrapper2");
        b = d.getElementById("zero_click");
        if (n && n.scrollHeight && b.scrollHeight && (n.scrollHeight < 125 || b.scrollHeight >= n.scrollHeight)) {
            a = d.getElementById("zero_click_plus");
            if (a) {
                a.onclick = nra4;
                YAHOO.util.Dom.removeClass("zero_click_header", "min");
                YAHOO.util.Dom.removeClass("zero_click_plus", "plus")
            }
        } else {
            a = d.getElementById("zero_click_plus");
            if (a) {
                a.onclick = nra3;
                YAHOO.util.Dom.addClass("zero_click_plus", "plus")
            }
        }
        DDG.resize()
    }
}

function nra3() {
    var c, b;
    fl = 1;
    c = d.getElementById("zero_click_abstract");
    if (c && c.innerHTML != "") {
        YAHOO.util.Dom.setStyle(c, "display", "block")
    }
    c = d.getElementById("zero_click_abstract_stacked");
    if (c && c.innerHTML != "") {
        YAHOO.util.Dom.setStyle(c, "display", "block")
    }
    c = d.getElementById("zero_click_topics");
    if (c) {
        YAHOO.util.Dom.setStyle(c, "display", "block")
    }
    c = d.getElementById("zero_click_separator");
    if (c) {
        YAHOO.util.Dom.setStyle(c, "display", "block")
    }
    c = d.getElementById("zero_click_image");
    if (c) {
        YAHOO.util.Dom.setStyle(c, "display", "block")
    }
    c = d.getElementById("zero_click_header");
    if (c) {
        YAHOO.util.Dom.setStyle(c, "margin-bottom", "0px")
    }
    if (c && c.firstChild) {
        YAHOO.util.Dom.setStyle(c, "display", "block")
    }
    c = d.getElementById("zero_click_wrapper2");
    if (c) {
        YAHOO.util.Dom.setStyle(c, "height", "100%");
        YAHOO.util.Dom.setStyle(c, "overflow-y", "auto");
        if (!rt) {
            YAHOO.util.Dom.setStyle(c, "max-height", "800px")
        } else {
            YAHOO.util.Dom.setStyle(c, "max-height", "100%")
        }
    }
    b = d.getElementById("zero_click_plus");
    if (b) {
        b.onclick = nra4;
        YAHOO.util.Dom.removeClass("zero_click_header", "min");
        YAHOO.util.Dom.removeClass("zero_click_plus", "plus")
    }
}

function nra4() {
    var c, b;
    fl = 1;
    c = d.getElementById("zero_click_abstract");
    if (c) {
        YAHOO.util.Dom.setStyle(c, "display", "none")
    }
    c = d.getElementById("zero_click_abstract_stacked");
    if (c) {
        YAHOO.util.Dom.setStyle(c, "display", "none")
    }
    c = d.getElementById("zero_click_image");
    if (c) {
        YAHOO.util.Dom.setStyle(c, "display", "none")
    }
    c = d.getElementById("zero_click_separator");
    if (c) {
        YAHOO.util.Dom.setStyle(c, "display", "none")
    }
    c = d.getElementById("zero_click_topics");
    if (c) {
        YAHOO.util.Dom.setStyle(c, "display", "none")
    }
    c = d.getElementById("zero_click_header");
    if (c) {
        YAHOO.util.Dom.setStyle(c, "margin-bottom", "0px")
    }
    c = d.getElementById("zero_click_wrapper2");
    if (c) {
        YAHOO.util.Dom.setStyle(c, "max-height", "50px");
        YAHOO.util.Dom.setStyle(c, "overflow-y", "hidden")
    }
    b = d.getElementById("zero_click_plus");
    if (b) {
        b.onclick = nra3;
        YAHOO.util.Dom.addClass("zero_click_header", "min");
        YAHOO.util.Dom.addClass("zero_click_plus", "plus")
    }
}

function nrn(ai, v) {
    var F, ag, ac, ab, aa, B, c, r, q, p, o, f, I, U, e, T, af, Z, m, k, ah, ae, ad, K, a, n, Q, P, M, s, h, H, G, u, O, W, S, t, J, R, X, E, C, V, Y, D, A;
    var L = 0;
    var b = 0;
    m = new RegExp("^.*?//(?:ww[\\dw]+.|)([^/?:#]+)");
    var N = rq.search(/lyrics/i) != -1;
    q = p = o = R = X = E = V = C = "";
    switch (ai) {
    case "d":
        af = "1";
        Z = r1c;
        break;
    case "r":
        af = "1";
        Z = r1c;
        break;
    case "a":
        af = "a";
        Z = r3c;
        break
    }
    if (!ai || !v) {
        return false
    }
    s = v.length;
    if (ai == "a" && YAHOO.util.Dom.getStyle("ads", "height") == "0px" && DDG.is_deep_loaded && ((DDG.get_now() - DDG.is_deep_loaded) > 500)) {
        return false
    }
    if (ai == "a" && k1 && k1 == "-1") {
        return false
    }
    if (ai == "a" && DDG.is_ad_loaded) {
        return false
    }
    if (ai == "a") {
        DDG.is_ad_loaded = 1
    }
    if (rq.indexOf("site%3A") != -1) {
        iqs = 1
    }
    Y = (ai == "d" && rds == 30) ? 1 : 0;
    if (af == "a") {
        e = d.getElementById("ads")
    } else {
        if (af == "3") {
            e = d.getElementById("side")
        } else {
            if (Y && d.getElementById("rre0-1")) {
                e = d.getElementById("rre0-1");
                e.removeChild(e.lastChild);
                Z--
            } else {
                if (Z) {
                    e = d.getElementById("r1-" + parseInt(Z - 1)).parentNode
                } else {
                    e = d.getElementById("r1a") || d.getElementById("links")
                }
            }
        }
    }
    T = e;
    if (ai == "d" && (r1c || rad) && rd.length == 0) {
        rd[0] = 1;
        if (rad && (!kz || kz == 1) && rt) {
            rd[rad] = 1
        }
        nut(e);
        for (ae = 0; ae < Z; ae++) {
            if (!ie || ie9 || ie10p) {
                links = d.getElementById("r1-" + ae).getElementsByTagName("a")
            }
            for (ad = 0; ad < links.length; ad++) {
                if (YAHOO.util.Dom.hasClass(links[ad], "url")) {
                    if (links[ad].textContent == "Official site") {
                        W = 1
                    }
                    if (links[ad].textContent == "Official blog") {
                        S = 1
                    }
                    if (m.test(links[ad].href)) {
                        rd[RegExp.$1] = links[ad].href;
                        if (kf && (kf == "w" || kf == "fw" || kf == "b") && Y && !rs) {
                            X += (X ? "," : "") + RegExp.$1 + ":r1-" + ae
                        }
                    }
                }
            }
        }
        for (ae = 0; ae < r1hc; ae++) {
            links = d.getElementById("r1h-" + ae);
            if (!links) {
                continue
            }
            links = links.getElementsByTagName("a");
            if (!links) {
                continue
            }
            for (ad = 0; ad < links.length; ad++) {
                if (links[ad].textContent == "Official site") {
                    W = 1
                }
                if (links[ad].textContent == "Official blog") {
                    S = 1
                }
                if (m.test(links[ad].href)) {
                    rd[RegExp.$1] = links[ad].href;
                    if (kf && (kf == "w" || kf == "fw" || kf == "b") && Y && !rs) {
                        X += (X ? "," : "") + RegExp.$1 + ":r1h-" + ae
                    }
                }
            }
        }
    }
    if (!s && ((ai == "r" && rsc <= 0) || (ai == "d" && rv == "d"))) {
        if (ai == "d" && !r1c) {
            ag = d.getElementById("rfd");
            YAHOO.util.Dom.setStyle(ag, "display", "none")
        }
        ai = "r";
        v.x = new Array();
        v.x["t"] = "EOH"
    }
    u = 0;
    if (ai == "d" && (v[s - 1]["t"] == "EOP" || v[s - 1]["t"] == "EOF")) {
        u = 1;
        ieof = 1;
        il = 1;
        if (v[s - 1]["t"] == "EOP") {
            u = 2
        }
    }
    K = a = h = H = G = 0;
    for (F in v) {
        K++;
        t = 0;
        if (!v[F]) {
            continue
        }
        if (k1 && k1 == "-1" && v[F]["p"]) {
            continue
        }
        if (!A && v[F]["k"]) {
            A = F
        }
        if (ai == "d" && rv != "d" && K == 1) {
            nsl()
        }
        if (K == 1 && rv == "i") {
            setTimeout('top.location.replace("' + v[F]["u"] + '")', 100);
            return
        }
        if (ai == "d" && v[F]["b"]) {
            DDG.bang_suggestions[v[F]["b"]] = v[F]["i"]
        }
        n = "";
        if (m.test(v[F]["c"])) {
            n = RegExp.$1
        }
        O = 0;
        if (ai == "d" && v[F]["t"] == "EOP") {
            v[F]["t"] = l("Safe search is on. No safe search results.");
            O = 1
        } else {
            if (ai == "d" && v[F]["t"] == "EOF") {
                O = 1;
                continue
            }
        } if (ai == "d" && !O && !v[F]["p"] && (rv != "d" || (rv == "d" && Z == 0))) {
            if (!n || (rd[n] && !iqs) || rd[v[F]["c"]]) {
                if (a == 0 && K == s && !Y) {
                    nrj("/l.js?q=" + rq);
                    u = 1
                }
                if (K == s) {
                    t = 1
                } else {
                    continue
                }
            } else {
                rd[n] = v[F]["c"];
                rd[v[F]["c"]] = v[F]["c"]
            }
        }
        if (ai == "r" && v[F]["t"] == "EOH") {
            t = 1
        }
        if (ai == "r") {
            if (rsd[v[F]["a"]]) {
                t = 1
            } else {
                rsd[v[F]["a"]] = 1
            } if (n && !iqs) {
                rd[n] = v[F]["c"]
            }
            rd[v[F]["c"]] = v[F]["c"];
            rsd[0] = 1
        }
        if (rv == "d" && ai == "d") {
            rsc++;
            nrj("/r.js?u=" + encodeURIComponent(v[F]["c"]) + "&q=" + rq + (rp && rp != "-1" ? "&p=1" : ""));
            if (Z != 0) {
                continue
            }
        }
        if (!t) {
            a++;
            ag = d.createElement("div");
            ag.id = "r" + af + "-" + Z++;
            YAHOO.util.Dom.addClass(ag, "results_links" + (ai == "d" && !v[F]["h"] ? "_deep" : "") + " highlight_" + ai + ((ai == "r" || v[F]["i"]) ? "2" : ""));
            if (ai == "d") {
                var g = v[F]["t"] + " " + v[F]["a"];
                if (kf && (kf == "w" || kf == "fw" || kf == "b") && n && !O) {
                    X += (X ? "," : "") + n + ":" + ag.id
                }
                if (0 && !iqs && gre.test(v[F]["u"])) {
                    R += (R ? "," : "") + v[F]["u"];
                    reb[reb.length] = ag.id
                }
                if (!E && Y && Z > 1 && Z < 8 && rt != "A" && !rs && gra3.test(v[F]["u"])) {
                    E = RegExp.$1
                }
                if (!V && Y && (gra.test(v[F]["u"]) || (!da && (rt || gra2.test(v[F]["a"] + " " + v[F]["t"]))))) {
                    if (gram.test(v[F]["u"])) {
                        V = "m"
                    } else {
                        if (grae.test(v[F]["u"])) {
                            V = "e"
                        } else {
                            if (grad.test(v[F]["u"])) {
                                V = "d"
                            } else {
                                if (grab.test(v[F]["b"])) {
                                    V = "b"
                                } else {
                                    V = 1
                                }
                            }
                        }
                    }
                }
            }
            if (ai == "i" && !rii) {
                rii = ag.id
            } else {
                if (ai == "n" && !rin) {
                    rin = ag.id
                } else {
                    if (ai == "t" && !rir) {
                        rir = ag.id
                    }
                }
            }
        }
        if ((ai == "d" && !u && K == s && !h) || (ai == "r" && rsc <= 0)) {
            ac = d.createElement("div");
            YAHOO.util.Dom.addClass(ac, "results_links_more highlight_" + ai);
            c = d.createElement("a");
            c.href = "javascript:;";
            c.onclick = function () {
                nsr(this)
            };
            if (ai == "d" || ai == "r") {
                if (ai == "d") {
                    ac.id = "rld-" + (++rdc)
                } else {
                    if (ai == "r") {
                        ac.id = "rle0-1"
                    }
                } if (ai == "r" && !r1hc) {
                    c.appendChild(d.createTextNode(l("Get Web links") + "..."))
                } else {
                    c.appendChild(d.createTextNode(l("More Links") + "..."))
                }
                YAHOO.util.Dom.addClass(c, "large");
                YAHOO.util.Dom.addClass(ac, "links_deep")
            } else {
                if (ai == "t") {
                    ac.id = "rli1-" + (++rtc);
                    c.appendChild(d.createTextNode(l("More Related Topics") + "..."))
                }
            }
            ac.appendChild(c);
            if (ai == "r" && !t) {
                h = ac;
                G = ab
            } else {
                if (ai == "r") {
                    e.appendChild(ab)
                }
                e.appendChild(ac)
            }
            ac = d.createElement("div");
            if (ai == "d") {
                ac.id = "rrd-" + rdc
            } else {
                if (ai == "r") {
                    ac.id = "rre0-1"
                } else {
                    if (ai == "t") {
                        ac.id = "rri1-" + rtc
                    }
                }
            }
            YAHOO.util.Dom.setStyle(ac, "display", "none");
            if (ai == "r") {
                ab = d.createElement("div");
                ab.id = "r" + af + "-" + Z++;
                ac.appendChild(ab)
            }
            if (ai == "r" && !t) {
                H = ac
            } else {
                e.appendChild(ac);
                e = ac;
                h = 1;
                nut(e);
                if (ai == "r" && Z <= 6) {
                    nua("nsr", e.previousSibling.firstChild, 0, 0, 0, 1)
                }
            }
        }
        if (t) {
            continue
        }
        ac = d.createElement("div");
        YAHOO.util.Dom.addClass(ac, "icon_" + (ai == "d" && !v[F]["h"] ? "fav2" : "fav"));
        if ((ai == "d" || ai == "r") && v[F]["i"] != "" && (!kf || kf == "1" || kf == "fw" || kf == "b")) {
            I = l("Search domain %s", v[F]["i"]);
            if (nur) {
                f = nur(YAHOO.util.Dom.getStyle(e, "display") == "block" && e.event && e.event.is_fired ? "" : e.ig, I, ga + v[F]["i"] + ".ico", 16, 16)
            }
            if (f) {
                c = d.createElement("a");
                c.href = iqs ? "/?q=" + rq : "/?q=" + rq + "+site:" + v[F]["i"] + (kurl ? kurl : "");
                c.title = I;
                c.appendChild(f);
                c.onclick = function () {
                    fl = 1
                };
                ac.appendChild(c)
            }
        } else {
            if (ai == "r") {
                ac.innerHTML += "&#149;"
            }
        }
        ag.appendChild(ac);
        ac = d.createElement("div");
        YAHOO.util.Dom.addClass(ac, "links_" + ((af == 1 || af == "a") ? "main" : "zero_click"));
        if ((ai == "d" || ai == "a") && !v[F]["h"]) {
            YAHOO.util.Dom.addClass(ac, "links_deep")
        }
        if (ai != "r") {
            c = d.createElement("a");
            if (ai == "d" || ai == "a") {
                YAHOO.util.Dom.addClass(c, "large")
            }
            c.href = v[F]["c"];
            if (kn && kn == "1" && c && c.href && c.getAttribute("href").indexOf("http") != -1) {
                c.target = "_blank"
            }
            if (v[F]["t"] == "<b>" + l("Official site") + "</b>") {
                if (W || Z > 1) {
                    v[F]["t"] = v[F]["h"];
                    v[F]["h"] = 0
                } else {
                    v[F]["a"] = " - " + rqd
                }
            } else {
                if (S && v[F]["t"] == "Official blog") {
                    Z--;
                    continue
                }
            }
            c.innerHTML = v[F]["t"];
            if (ai == "i" && v[F]["h"]) {
                if (nur) {
                    f = nur("", v[F]["t"], v[F]["h"], v[F]["w"], v[F]["x"])
                }
                if (f) {
                    c.insertBefore(f, c.firstChild)
                }
            }
            r = c;
            D = d.createElement("h2");
            D.appendChild(c);
            ac.appendChild(D)
        }
        if (ai == "d" || ai == "a") {
            if (v[F]["h"] && v[F]["a"]) {
                B = d.createElement("span");
                B.innerHTML = " " + v[F]["a"];
                ac.appendChild(B)
            } else {
                if (v[F]["a"]) {
                    ab = d.createElement("div");
                    YAHOO.util.Dom.addClass(ab, "snippet");
                    if (k2 && k2 == "1") {
                        p = d.createElement("a");
                        p.href = v[F]["c"];
                        if (kn && kn == "1" && p.getAttribute("href").indexOf("http") != -1) {
                            p.target = "_blank"
                        }
                        p.innerHTML = v[F]["a"];
                        ab.appendChild(p)
                    } else {
                        ab.innerHTML = v[F]["a"]
                    }
                    ac.appendChild(ab)
                }
            }
            ab = d.createElement("div");
            q = d.createElement("a");
            q.href = v[F]["c"];
            if (kn && kn == "1" && q.getAttribute("href").indexOf("http") != -1) {
                q.target = "_blank"
            }
            q.appendChild(d.createTextNode(" " + v[F]["d"]));
            ab.appendChild(q);
            YAHOO.util.Dom.addClass(q, "url");
            if (!O) {
                if (v[F]["e"]) {
                    B = d.createElement("span");
                    YAHOO.util.Dom.addClass(B, "links_menu");
                    B.innerHTML = "&nbsp; &nbsp;" + v[F]["e"];
                    ab.appendChild(B)
                }
                if (!iqs && !v[F]["p"]) {
                    ab.appendChild(d.createTextNode("\u00a0 \u00a0"));
                    o = d.createElement("a");
                    o.href = iqs ? "/?q=" + rq : "/?q=" + rq + "+site:" + v[F]["i"] + (kurl ? kurl : "");
                    if (kurl) {
                        o.href += kurl
                    }
                    o.appendChild(d.createTextNode("More from " + n));
                    o.title = l("Search domain %s", v[F]["i"]);
                    YAHOO.util.Dom.addClass(o, "links_menu");
                    ab.appendChild(o)
                } else {
                    if (v[F]["p"]) {
                        ab.appendChild(d.createTextNode("\u00a0 \u00a0"));
                        o = d.createElement("a");
                        o.href = "http://help.duckduckgo.com/customer/portal/articles/216405-advertising";
                        o.onclick = function () {
                            fl = 1
                        };
                        o.appendChild(d.createTextNode("Sponsored link"));
                        YAHOO.util.Dom.addClass(o, "sponsored_info");
                        YAHOO.util.Dom.addClass(ag, "highlight_sponsored");
                        YAHOO.util.Dom.addClass(ag, "sponsored");
                        ab.appendChild(o);
                        if (ag.id == DDG.first_result) {
                            DDG.first_result = "r" + af + "-" + Z
                        }
                    }
                }
            }
            ac.appendChild(ab)
        } else {
            if (ai == "t" && v[F]["a"] != "") {
                B = d.createElement("span");
                B.innerHTML = " - " + v[F]["a"];
                YAHOO.util.Dom.addClass(B, "hidden");
                YAHOO.util.Dom.setStyle(B, "display", "none");
                ac.appendChild(B)
            } else {
                if (ai == "i") {} else {
                    if (ai == "r") {
                        YAHOO.util.Dom.addClass(ac, "snippet");
                        ac.innerHTML += v[F]["a"] + "<br>";
                        c = d.createElement("a");
                        c.href = v[F]["c"];
                        if (kn && kn == "1" && c.getAttribute("href").indexOf("http") != -1) {
                            c.target = "_blank"
                        }
                        c.innerHTML += "" + v[F]["d"];
                        ac.appendChild(c);
                        if (v[F]["t"]) {
                            B = d.createElement("span");
                            YAHOO.util.Dom.addClass(B, "url");
                            B.innerHTML += "&nbsp;[" + v[F]["t"] + "]";
                            ac.appendChild(B)
                        } else {
                            B = d.createElement("span");
                            B.innerHTML += "&nbsp;";
                            ac.appendChild(B)
                        }
                    }
                }
            }
        }
        ag.appendChild(ac);
        if (ai == "t") {
            e.options[e.options.length] = new Option(v[F]["t"], v[F]["u"] + (rv ? "?v=" + rv : ""))
        } else {
            if (rv == "d" && ai == "d") {
                ac = d.getElementById("zero_click_answer") || d.getElementById("rfd") || "";
                if (ac) {
                    if (ac.id == "zero_click_answer") {
                        YAHOO.util.Dom.setStyle(ac, "padding-bottom", "5px")
                    }
                    ac.parentNode.insertBefore(ag, ac.nextSibling)
                }
            } else {
                if (ai == "i") {
                    e.insertBefore(ag, e.firstChild)
                } else {
                    e.appendChild(ag);
                    if (!rc && ag.id == DDG.first_result) {
                        rc = ag
                    }
                }
            }
        } if (ai == "r" && h && H) {
            e.appendChild(G);
            e.appendChild(h);
            e.appendChild(H);
            e = h;
            nut(e);
            if (Z <= 6) {
                nua("nsr", h.firstChild, 0, 0, 0, 1)
            }
        }
        if (ai == "d" && a == 1) {
            J = 0;
            k = new RegExp("^r1-(\\d+)$");
            if (rc && k.test(rc.id)) {
                ah = RegExp.$1
            }
            J = (ah == Z) ? 1 : 0;
            if (fk && J && (!ag.previousSibling || ag.previousSibling.id.indexOf("r1-") == -1)) {
                nrm(6, ag.id)
            }
        }
        if (r) {
            r.onclick = function (j) {
                return nrl(j, this)
            }
        }
        if (q) {
            q.onclick = function (j) {
                return nrl(j, this)
            }
        }
        if (p) {
            p.onclick = function (j) {
                return nrl(j, this)
            }
        }
        if (o) {
            o.onclick = function (j) {
                return nrl(j, this)
            }
        }
        if (ai == "i") {
            break
        }
    }
    if (ai == "d" && v[0]["s"] && !d.getElementById("powered_by")) {
        DDG.first_source = v[0]["s"];
        ac = d.createElement("div");
        ac.id = "powered_by";
        for (F in v) {
            if (v[F] && v[F]["s"] && v[F]["s"].indexOf("yandex") != -1) {
                v[0]["s"] = "yandex"
            }
        }
        if (Z > 5 && v[0]["s"] && v[0]["s"] != "disco" && v[0]["s"] != "boss") {
            ac.appendChild(d.createTextNode("Built by "));
            if (nur) {
                f = nur("", "", "/assets/attribution/duckduckgo.v101.png")
            }
            c = d.createElement("a");
            c.href = "/about/";
            c.target = "_blank";
            c.appendChild(f);
            c.onclick = function () {
                fl = 1
            };
            ac.appendChild(c);
            if (v[0]["s"].indexOf("yandex") != -1) {
                v[0]["s"] = "yandex"
            }
            if (v[0]["s"].indexOf("boss") != -1) {
                v[0]["s"] = "yahoo"
            }
            if (nur) {
                f = nur("", "", "/assets/attribution/" + v[0]["s"] + ".v101.png")
            }
            var ab = d.createElement("div");
            YAHOO.util.Dom.setStyle(ab, "margin-top", "14px");
            ac.appendChild(ab);
            var ab = d.createElement("div");
            c = d.createElement("a");
            c.href = "http://help.duckduckgo.com/customer/portal/articles/216399";
            c.target = "_blank";
            c.innerHTML = "In partnership with: ";
            c.onclick = function () {
                fl = 1
            };
            ab.appendChild(c);
            YAHOO.util.Dom.setStyle(ab, "float", "left");
            YAHOO.util.Dom.setStyle(ab, "margin-top", "3px");
            if (v[0]["s"] == "blekko") {
                YAHOO.util.Dom.setStyle(ab, "margin-top", "0px")
            }
            if (v[0]["s"] == "yahoo") {
                YAHOO.util.Dom.setStyle(ab, "margin-top", "2px")
            }
            if (v[0]["s"] == "bing") {
                YAHOO.util.Dom.setStyle(ab, "margin-top", "0px")
            }
            ac.appendChild(ab);
            c = d.createElement("a");
            c.href = "/" + v[0]["s"] + "/";
            c.target = "_blank";
            c.appendChild(f);
            c.onclick = function () {
                fl = 1
            };
            ac.appendChild(c);
            var ab = d.createElement("div");
            YAHOO.util.Dom.addClass(ab, "clear");
            ac.appendChild(ab);
            ag = d.getElementById("side_powered_by_wrapper");
            if (ag) {
                ag.appendChild(ac);
                P = YAHOO.util.Dom.getY(ac);
                YAHOO.util.Dom.addClass(ag, "border");
                YAHOO.util.Dom.removeClass(ag, "hide");
                YAHOO.util.Dom.setStyle(ag, "margin-top", "35px")
            }
        }
    }
    if (af == "a") {
        r3c = Z
    } else {
        r1c = Z
    } if (!ip) {
        window.scrollBy(0, 1)
    }
    if (Y && A) {
        A = v[A];
        DDG.default_ad = [{
                a: A.a.substring(0, 100) + "...",
                d: A.d,
                m: 0,
                s: "skimlinks",
                p: 1,
                c: DDG.make_skimlink(A.c),
                u: DDG.make_skimlink(A.u),
                h: 0,
                k: 0,
                i: 1,
                t: A.t
            }
        ];
        if (DDG.is_default_ad_loaded) {
            DDG.show_default_ad()
        } else {
            setTimeout("DDG.show_default_ad()", 500)
        }
    }
    v = null;
    if (nir) {
        nir(ai)
    }
    if (ai == "d" && YAHOO.util.Dom.getStyle(T, "display") == "block" && T.event) {
        nua("nse", T, 200)
    }
    if (ai == "d") {
        DDG.show_bang_suggestions()
    }
    DDG.set_results_spacing();
    if (R && (!kb || kb != "n") && (YAHOO.util.FlashDetect.installed || ip || ia)) {
        nrj("/ie/?urls=" + R + "&maxwidth=600&format=json&wmode=window&callback=nreb&autoplay=1")
    }
    if (X) {
        nrj("/o.js?d=" + X + (kf && kf == "b" ? "&t=b" : ""))
    }
    if (Y) {
        DDG.is_deep_loaded = DDG.get_now()
    }
    if (Y && !iwa && !iqa && !iqm && (!kz || kz == 1) && (!rt || rt != "E")) {
        if (rt != "D" && !nux()) {
            if (0 && (E || V) && (!k1 || k1 != "-1") && !N) {
                nrj("/m.js?q=" + rq + (rt ? "&t=" + rt : "") + "&l=" + rl + (E ? "&i=" + E : "") + (V ? "&c=" + V : "") + (ra ? "&a=" + ra : ""));
                if (E) {
                    YAHOO.util.Dom.setStyle(d.getElementById("zero_click_wrapper"), "display", "block")
                }
                C = 1
            }
        }
    }
    if (u && u == 1) {
        nrj("/l.js?q=" + rq)
    }
    if (nrb) {
        nrb()
    }
}

function nrj(c, e) {
    var b, a;
    b = d.createElement("script");
    b.type = "text/javascript";
    if (!e) {
        b.async = true
    } else {
        b.async = false
    }
    b.src = c;
    a = document.getElementsByTagName("script")[0];
    a.parentNode.insertBefore(b, a);
    return b
}

function nrc(c) {
    var b, a;
    b = d.createElement("link");
    b.type = "text/css";
    b.rel = "stylesheet";
    b.async = true;
    b.href = c;
    b.media = "screen";
    a = document.getElementsByTagName("head")[0];
    a.parentNode.insertBefore(b, a)
}

function nue(a) {
    if (a.preventDefault) {
        a.preventDefault();
        a.stopPropagation()
    } else {
        a.cancelBubble = true;
        a.returnValue = false
    }
}

function nut(b) {
    if (b.event) {
        if (YAHOO.util.Dom.getStyle(b, "display") == "block") {
            nua("nse", b, 200)
        } else {
            return false
        }
    }
    b.event = new YAHOO.util.CustomEvent("it");
    var a = new YAHOO.util.ImageLoader.group(b, "click");
    a.addCustomTrigger(b.event);
    b.ig = a
}

function nur(b, g, f, a, e) {
    var c = d.createElement("img");
    if (g) {
        c.title = g
    }
    c.alt = "";
    c.id = "i" + (++ric);
    if (!b) {
        c.src = f;
        if (a && e) {
            c.height = a;
            c.width = e
        }
        YAHOO.util.Dom.setStyle(c, "visibility", "visible")
    } else {
        nus(b, ric, f, a, e)
    }
    return c
}

function nus(b, c, g, a, f) {
    if (!b) {
        b = new YAHOO.util.ImageLoader.group("content_wrapper", "mousemove", 0.1);
        b.addTrigger("header_wrapper", "mousemove", 0.1);
        b.addTrigger(window, "scroll", 0.1)
    }
    var e = b.registerSrcImage("i" + c, g, f, a);
    e.setVisible = true
}

function nsd() {
    cd++;
    if (cd < 50) {
        d.getElementById("o").innerHTML += "."
    }
}

function nsr(r, s, p) {
    var g, e, q, k, o, a, f, c, b, n, m, j, h;
    m = 0;
    q = new RegExp("^r[lr](.*)-(\\d+)$");
    r = r.parentNode;
    if (r.id && q.test(r.id)) {
        o = RegExp.$1 || 0;
        a = RegExp.$2 || 0
    }
    if (o && a) {
        if (tn == r.id) {
            return false
        }
        tn = r.id;
        h = g = e = 0;
        k = new RegExp("^r1-(\\d+)$");
        if (rc && k.test(rc.id)) {
            g = RegExp.$1
        }
        if (r.previousSibling && k.test(r.previousSibling.id)) {
            e = RegExp.$1
        }
        h = g && e && parseInt(g) == parseInt(e) + 1 ? 1 : 0;
        if (!fk) {
            h = 2
        }
        f = d.getElementById("rl" + o + "-" + a);
        c = d.getElementById("rr" + o + "-" + a);
        b = d.getElementById("rl" + o + "-" + (parseInt(a) + 1));
        if ((kv && (kv == "1" || kv == "n" || kv == "l")) && rds != 0 && (rds != 1 || r1hc) && o && o.indexOf("i") == -1) {
            if (kv == "n") {
                f.innerHTML = '<hr class="page_count_post" size="1" style="width: 85%;" noshade><div class="clear"></div>'
            } else {
                if (kv == "l") {
                    f.innerHTML = '<div class="page_count">&nbsp;&nbsp;page ' + (++rpc) + '&nbsp;&nbsp;</div><div class="clear"></div>'
                } else {
                    f.innerHTML = '<hr class="page_count_pre" size="1" noshade><div class="page_count">&nbsp;&nbsp;page ' + (++rpc) + '&nbsp;&nbsp;</div><hr class="page_count_post" size="1" noshade>&nbsp<div class="clear"></div>'
                }
            }
            f.onmouseover = function () {};
            f.onmouseout = function () {};
            f.onclick = function () {};
            YAHOO.util.Dom.removeClass(f, "highilghtd");
            YAHOO.util.Dom.removeClass(f, "links_deep");
            YAHOO.util.Dom.setStyle(f, "width", "99%");
            YAHOO.util.Dom.setStyle(f, "padding-top", "4px");
            YAHOO.util.Dom.setStyle(f, "padding-bottom", "1px")
        } else {
            YAHOO.util.Dom.setStyle(f, "display", "none")
        } if (c.event) {
            nua("nse", c, 200)
        }
        c.style.display = "block";
        if (b && !s) {
            YAHOO.util.Dom.setStyle(b, "display", "block")
        } else {
            if (!b && (o == "d" || (o == "e0" && !fd))) {
                j = d.createElement("img");
                j.src = "/l.gif";
                j.id = "loading";
                c.parentNode.appendChild(j);
                tl = j;
                if (rv == "d") {
                    rv = ""
                }
                n = d.createElement("script");
                n.src = "/d.js?q=" + rq + (rt ? "&t=" + rt : "") + (rv ? "&v=" + rv : "") + "&l=" + rl + (rp && rp != "-1" ? "&p=1" : "") + "&s=" + rds + (ra ? "&a=" + ra : "");
                n.type = "text/javascript";
                if (rds) {
                    rds += 50
                } else {
                    rds += 30
                }
                d.getElementsByTagName("head")[0].appendChild(n);
                m = 1
            }
        } if (!s && !p && h == 1) {
            if (r.nextSibling.firstChild) {
                nrm(6, r.nextSibling.firstChild.id)
            }
        }
    }
}

function nui(b) {
    var a = navigator.userAgent.toLowerCase();
    if (!b && w.external && ("AddSearchProvider" in w.external)) {
        w.external.AddSearchProvider(gd + "opensearch_ssl.xml");
        setTimeout("top.location.replace(gd)", 10)
    }
}
nir = function (k) {
    var a, h, c, g, f, b, e;
    if (!k) {
        k = ""
    }
    f = "highlight_" + k;
    a = d.getElementsByTagName("div");
    h = new RegExp("(?:^|\\s+)" + f + "(\\d?)(?:\\s+|$)");
    for (g = 0; g < a.length; g++) {
        if (h.test(a[g].className)) {
            if (a[g].onmouseover) {
                continue
            }
            c = DDG.get_link_num(RegExp.$1);
            a[g].onmouseover = function (j) {
                if (fk || fe) {
                    return false
                }
                if (ky && ky == -1) {
                    return false
                }
                if (rc && rc != this) {
                    nua("nro", rc)
                }
                nua("nrv", this);
                rc = this
            };
            a[g].onmouseout = function (j) {
                if (fk || fe) {
                    return false
                }
                if (ky && ky == -1) {
                    return false
                }
                if (j && j.clientX) {
                    nua("nro", this, "", "", "", j.clientX, j.clientY)
                } else {
                    nua("nro", this)
                }
            };
            if (c == -1) {
                a[g].onclick = function (j) {
                    if (!fe) {
                        nrg(this, -1, j, 0)
                    }
                }
            } else {
                if (c == 2) {
                    a[g].onclick = function (j) {
                        if (!fe) {
                            nrg(this, 2, j, 0)
                        }
                    }
                } else {
                    if (c == 1) {
                        a[g].onclick = function (j) {
                            if (!fe) {
                                nrg(this, 1, j, 0)
                            }
                        }
                    } else {
                        a[g].onclick = function (j) {
                            if (!fe) {
                                nrg(this, 0, j, 0)
                            }
                        }
                    }
                }
            } if (!k || k == "a") {
                b = a[g].getElementsByTagName("a");
                for (e = 0; e < b.length; e++) {
                    if (!b[e].onclick && !rs) {
                        b[e].onclick = function (j) {
                            this.blur();
                            return nrl(j || window.event, this)
                        }
                    } else {
                        if (!b[e].onclick) {
                            b[e].onclick = function () {
                                this.blur();
                                fl = 1
                            }
                        }
                    } if (kn && kn == "1" && b[e].href && b[e].href != "javascript:;" && b[e].getAttribute("href").indexOf("http") != -1) {
                        b[e].target = "_blank"
                    }
                }
            }
        }
    }
};

function nim(k, g, b, m) {
    var a, j, c, f, e, h;
    if (DDG.is_side_map) {
        return false
    }
    if (DDG.is_top_map) {
        return false
    }
    if (!m) {
        m = DDG.OSM_lat_lon_search(g, b)
    }
    a = d.getElementById("side");
    j = d.getElementById("links");
    nuv();
    if (a && !d.getElementById("side_map") && YAHOO.util.Dom.getStyle(a, "display") == "block" && viewport_width > 1000) {
        f = d.createElement("div");
        f.id = "side_map";
        e = d.createElement("img");
        e.id = "side_map_img";
        c = ie6 ? 130 : viewport_width - YAHOO.util.Dom.getX(j) - j.scrollWidth - 100;
        e.src = "/imq2/?size=" + c + ",200&zoom=" + k + "&center=" + g + "," + b + "&imageType=jpg&mcenter=" + g + "," + b;
        YAHOO.util.Dom.setStyle(a, "width", c + "px");
        h = d.createElement("a");
        h.href = "http://open.mapquest.com/?q=" + m;
        h.appendChild(e);
        h.onclick = function () {
            fl = 1
        };
        f.appendChild(h);
        YAHOO.util.Dom.addClass(f, "border");
        a.insertBefore(f, a.firstChild);
        nua("DDG.resize", "", 10);
        DDG.is_side_map = 1
    }
}

function nib(h, m, e, p, c, n) {
    var f, o, k, a, j, q, b, g;
    f = navigator.userAgent.toLowerCase();
    j = o = q = a = k = "";
    if (!p) {
        p = ""
    }
    if (!n) {
        n = 0
    }
    if (/ipad/.test(f)) {
        o = "iPad"
    } else {
        if (/android/.test(f)) {
            o = "Android"
        } else {
            if (/xbox/.test(f)) {
                o = "xBox"
            } else {
                if (/midori/.test(f)) {
                    o = "Midori"
                } else {
                    if (/chrome/.test(f)) {
                        o = "Chrome"
                    } else {
                        if (/fennec/.test(f)) {
                            o = "Fennec"
                        } else {
                            if (/seamonkey/.test(f)) {
                                o = "SeaMonkey"
                            } else {
                                if (/iceape/.test(f)) {
                                    o = "Iceape"
                                } else {
                                    if (/maxthon/.test(f)) {
                                        o = "Maxthon"
                                    } else {
                                        if (/epiphany/.test(f)) {
                                            o = "Epiphany"
                                        } else {
                                            if (/firefox/.test(f)) {
                                                o = "Firefox"
                                            } else {
                                                if (/uzbl/.test(f)) {
                                                    o = "Uzbl"
                                                } else {
                                                    if (/msie 6/.test(f)) {
                                                        o = "IE6"
                                                    } else {
                                                        if (/msie 10.*win64/.test(f) && window.innerWidth == screen.width && window.innerHeight == screen.height) {
                                                            o = "IEMetro"
                                                        } else {
                                                            if (/msie [78910]/.test(f)) {
                                                                o = "IE"
                                                            } else {
                                                                if (/opera/.test(f)) {
                                                                    o = "Opera"
                                                                } else {
                                                                    if (/iphone/.test(f)) {
                                                                        o = "iPhone"
                                                                    } else {
                                                                        if (/arora/.test(f)) {
                                                                            o = "Arora"
                                                                        } else {
                                                                            if (/safari/.test(f)) {
                                                                                o = "Safari"
                                                                            } else {
                                                                                o = "Browser"
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } if (is_silk) {
        o = ""
    }
    j = "duckduckgo.com";
    if (w.k3u) {
        j += "/tw/" + k3u
    } else {
        if (k3) {
            j += "/tw/" + k3
        }
    } if (o == "IE" && !n) {
        k = '<a target="_blank" href="javascript:;" onclick="nui()" class="add icon">Install IE search provider</a>'
    } else {
        if (o == "IEMetro" && !n) {
            k = '<a target="_blank" href="http://www.iegallery.com/en-US/Addons/Details/10202" class="add icon">Install IE search provider</a>'
        } else {
            if (document.all || (o == "IE" && n)) {
                k = '<a target="_blank" href="javascript:;" onclick="this.style.behavior=\'url(#default#homepage)\';this.setHomePage(\'http://duckduckgo.com/\');" class="add icon">Install IE homepage</a>'
            } else {
                if (o == "Firefox" && n) {
                    k = '<a href="http://' + j + '" class="add icon">Drag to toolbar home icon</a> <a target="_blank" href="http://help.duckduckgo.com/customer/portal/articles/216441/" class="more icon">More ways to add DDG</a>'
                } else {
                    if (o == "Firefox") {
                        k = '<a target="_blank" href="https://addons.mozilla.org/en-US/firefox/addon/duckduckgo-for-firefox/" class="add icon">Install Firefox add-on</a> <a target="_blank" href="http://help.duckduckgo.com/customer/portal/articles/216441/" class="more icon">More ways to add DDG</a>'
                    } else {
                        if (o == "Chrome" && n) {
                            k = '<a target="_blank" href="https://chrome.google.com/webstore/detail/duckduckgo-home-page/ljkalbbbffedallekgkdheknngopfhif" class="add icon">Install Chrome home icon</a> <a target="_blank" href="http://help.duckduckgo.com/customer/portal/articles/216440/" class="more icon">More ways to add DDG</a>'
                        } else {
                            if (o == "Chrome") {
                                k = '<a target="_blank" href="https://chrome.google.com/webstore/detail/duckduckgo-for-chrome/bpphkkgodbfncbcpgopijlfakfgmclao" class="add icon">Install Chrome extension</a> <a target="_blank" href="http://help.duckduckgo.com/customer/portal/articles/216440/" class="more icon">More ways to add DDG</a>'
                            } else {
                                if (o == "Arora" && !n) {
                                    k = "1. Click the magnifying glass in the search bar (upper right).<br><br>2. Click Add DuckDuckGo (bottom).<br><br>3. Click Yes.<br><br>4. Click the magnifying glass again.<br><br>5. Select DuckDuckGo from the drop down."
                                } else {
                                    if (o == "Android" && !n) {
                                        a = "market://details?id=com.duckduckgo.mobile.android";
                                        q = ";"
                                    } else {
                                        if ((o == "iPhone" || o == "iPad") && !n) {
                                            a = "http://itunes.apple.com/us/app/id479988136?mt=8";
                                            q = ";"
                                        } else {
                                            if ((o == "SeaMonkey" || o == "Iceape") && !n) {
                                                a = "https://addons.mozilla.org/seamonkey/addon/duckduckgo-ssl/";
                                                q = ";"
                                            } else {
                                                if (o == "Maxthon" && !n) {
                                                    k = "1. Go to Options.<br><br>2. Go to Search Engine.<br><br>3. Click add.<br><br>4. Name: DuckDuckGo<br>4b) URL: http://duckduckgo.com/?q=%s<br>4c) Alias: d<br><br>5. Click OK!"
                                                } else {
                                                    if (o == "Safari" && n) {
                                                        if (/mac/.test(f)) {
                                                            k = "1. Click Safari on the top left.<br><br>2. Select Preferences.<br><br>3. Under the General tab, click Set to Current Page.<br><br>4. Close Window."
                                                        } else {
                                                            k = "1. Click the gears icon in the browser toolbar (top right).<br><br>2. Select Preferences.<br><br>3. Click the General tab.<br><br>4. Where it says Home page click Set to Current Page.<br><br>5. If you want, select Home Page next to New windows and New tabs (open with).<br><br>6. Close window."
                                                        }
                                                    } else {
                                                        if (o == "Safari") {
                                                            if (ih5) {
                                                                k = '<a href="https://duckduckgo.com/extensions/duckduckgo.safariextz" target="com.duckduckgo.safari-HKE973VLUW" class="add icon">Install Safari extension</a> <a target="_blank" href="http://help.duckduckgo.com/customer/portal/articles/216447-safari" class="more icon">More ways to add DDG</a>'
                                                            } else {
                                                                k = '<a target="_blank" href="http://www.machangout.com/" class="add icon">Install Glims</a> <a target="_blank" href="http://help.duckduckgo.com/customer/portal/articles/216447-safari" class="more icon">More ways to add DDG</a>'
                                                            }
                                                        } else {
                                                            if (o == "Opera" && n) {
                                                                k = '<a href="https://addons.opera.com/en/extensions/details/duckduckgo-speed-dial/" target="_blank" class="add icon">Install Opera Speed Dial</a> <a target="_blank" href="http://help.duckduckgo.com/customer/portal/articles/216453" class="more icon">More ways to add DDG</a>'
                                                            } else {
                                                                if (o == "Opera") {
                                                                    k = '<a href="https://addons.opera.com/en/extensions/details/duckduckgo-for-opera-2/" target="_blank" class="add icon">Install our Opera add-on</a> <a target="_blank" href="http://help.duckduckgo.com/customer/portal/articles/216453" class="more icon">More ways to add DDG</a>'
                                                                } else {
                                                                    o = ""
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } if (o) {
        if (n) {
            o = l("Set as Homepage");
            b = "add_to_browser_homepage";
            id2 = "add_to_browser"
        } else {
            if (o == "Android" || o == "iPhone") {
                o = "Get App"
            } else {
                o = l("Add to Browser")
            }
            b = "add_to_browser";
            id2 = "add_to_browser_homepage"
        }
        g = "";
        clickfunc = "DDG.mv_elem('" + b + "','trig_" + b + "');DDG.toggleall('grp_modal',-1,'" + b + "');DDG.toggle('" + b + "')";
        hoverfunc = "DDG.mv_elem('" + b + "','trig_" + b + "');DDG.toggleall('grp_modal',-1);DDG.toggle('" + b + "')";
        if (!q) {
            g = ("<h4>" + o + "</h4>" + k)
        }
        if ((!w.k3u) && (!q) && (!a)) {
            document.write('<span class="modal_trig" id="trig_' + b + '"></span>' + e + '<a href="')
        } else {
            document.write(e + '<a href="')
        } if (a) {
            document.write(a)
        } else {
            document.write("javascript:;")
        }
        document.write('" class="' + m + '" onclick="');
        if (q) {
            document.write(q)
        } else {
            document.write(clickfunc)
        } if (d.getElementById("footer_homepage")) {
            document.write('" onmouseover ="' + hoverfunc)
        }
        if (w.k3u) {
            document.write(";YAHOO.util.Cookie.set('3', k3u, { path: '/', expires: new Date('January 12, 2025') });")
        }
        document.write('">' + o + "</a>" + p);
        if (d.getElementById(b)) {
            d.getElementById(b).innerHTML = g
        } else {
            document.write('<div id="' + b + '" class="cnib modal grp_modal">' + g + "</div>")
        }
    }
}

function nsl() {
    var a = d.getElementById("loading");
    if (a && a.id) {
        a.parentNode.removeChild(a)
    } else {
        if (tl && tl.id) {
            if (tl.parentNode) {
                tl.parentNode.removeChild(tl)
            }
            tl = ""
        }
    }
}

function nse(a) {
    if (!a || !a.event) {
        return
    }
    a.event.fire();
    a.event.is_fired = 1
}

function not() {
    document.y.action = "http://www.gabrielweinberg.com/";
    setTimeout("document.y.submit()")
}

function nik(p) {
    var z, y, x, v, u, t, s, r, q, m, k, j, h, g, f, e, c, b, a, o, n;
    if (!p) {
        z = new YAHOO.util.KeyListener(document, {
                keys: [40, 74]
            }, {
                fn: nkda
            });
        z.enable();
        y = new YAHOO.util.KeyListener(document, {
                keys: [38, 75]
            }, {
                fn: nkua
            });
        y.enable();
        if (!im) {
            k3 = new YAHOO.util.KeyListener(document, {
                    shift: true,
                    keys: [191]
                }, {
                    fn: nks
                });
            k3.enable();
            v = new YAHOO.util.KeyListener(document, {
                    keys: [191]
                }, {
                    fn: nks
                });
            v.enable()
        }
        a = new YAHOO.util.KeyListener(document, {
                keys: [79]
            }, {
                fn: nko
            });
        a.enable();
        t = new YAHOO.util.KeyListener(document, {
                keys: [76]
            }, {
                fn: nko
            });
        t.enable();
        s = new YAHOO.util.KeyListener(document, {
                keys: [111, 72]
            }, {
                fn: nks
            });
        s.enable();
        r = new YAHOO.util.KeyListener(document, {
                keys: [222]
            }, {
                fn: nkn
            });
        r.enable();
        q = new YAHOO.util.KeyListener(document, {
                keys: [73]
            }, {
                fn: nki
            });
        q.enable();
        m = new YAHOO.util.KeyListener(document, {
                keys: [82]
            }, {
                fn: nkr
            });
        m.enable();
        k = new YAHOO.util.KeyListener(document, {
                keys: [86]
            }, {
                fn: nkn
            });
        k.enable();
        j = new YAHOO.util.KeyListener(document, {
                keys: [32]
            }, {
                fn: nksb
            });
        j.enable();
        h = new YAHOO.util.KeyListener(document, {
                keys: [77]
            }, {
                fn: nkm
            });
        h.enable();
        g = new YAHOO.util.KeyListener(document, {
                keys: [70]
            }, {
                fn: not
            });
        g.enable();
        b = new YAHOO.util.KeyListener(document, {
                keys: [83]
            }, {
                fn: nksp
            });
        b.enable()
    }
    u = new YAHOO.util.KeyListener(document, {
            keys: [13]
        }, {
            fn: nke
        });
    u.enable();
    f = new YAHOO.util.KeyListener(document, {
            keys: [27]
        }, {
            fn: nkes
        });
    f.enable();
    o = new YAHOO.util.KeyListener(document, {
            keys: [84]
        }, {
            fn: nkt
        });
    o.enable();
    if (!io) {
        e = new YAHOO.util.KeyListener(document, {
                keys: [49]
            }, {
                fn: nkex
            });
        e.enable()
    }
    c = new YAHOO.util.KeyListener(document, {
            shift: true,
            keys: [49]
        }, {
            fn: nkex
        });
    c.enable();
    n = new YAHOO.util.KeyListener(document, {
            keys: [68]
        }, {
            fn: nkd
        });
    n.enable()
}

function ncku(a) {
    if (!ie && !a.metaKey) {
        fa = 0
    }
}

function nckd(a) {
    if (!ie && a.metaKey) {
        fa = 1
    }
    if (!fq && (!kk || kk == "1") && a.keyCode && (a.keyCode == 40 || a.keyCode == 74 || a.keyCode == 38 || a.keyCode == 75)) {
        if (a && (nkdc(a) || nkdm(a) || nkds(a) || nkdt(a) || fa)) {} else {
            nue(a)
        }
    }
}

function nckp(a) {
    if (!fq && (!kk || kk == "1") && a.keyCode && (a.keyCode == 40 || a.keyCode == 74 || a.keyCode == 38 || a.keyCode == 75)) {
        if (a && (nkdc(a) || nkdm(a) || nkds(a) || nkdt(a) || fa)) {} else {
            nue(a)
        }
    }
}

function ncf(f) {
    var c, g, a, b;
    fmx = f.clientX;
    fmy = f.clientY;
    nuv();
    if (fmx > (viewport_width - 100) && fmy > (parseInt(viewport_height) - 17)) {
        if (!il && nrb) {
            nrb()
        }
    }
    c = "";
    if (ie) {
        c = f.srcElement
    } else {
        c = f.target
    } if (c && c.id) {
        if (c.id !== "newbang") {
            DDG.toggleall()
        }
        if (c.id == "report_bad_query_link") {
            DDG.report_bad_query()
        }
    }
    if (c.nodeName == "HTML" || c.nodeName == "BODY") {
        DDG.toggleall()
    }
    a = c;
    while (a != window) {
        if (a.id) {
            b = a.id;
            break
        } else {
            if (a.parentNode) {
                a = a.parentNode
            } else {
                break
            }
        }
    }
    if (!b) {
        b = "x"
    }
    if (((f.button && (((!ie || ie9 || ie10p) && f.button == 1) || (ie && f.button == 4)))) && rc && rc.id) {
        fm = 1;
        while (c != window) {
            if (c.nodeName && c.nodeName == "A") {
                if (c.href == "javascript:;") {
                    c.onclick();
                    return false
                } else {
                    href = DDG.get_http_redirect(link)
                }
                fl = 1;
                break
            }
            g = c.id;
            if (g) {
                if (g == "links") {
                    break
                }
                if (g == rc.id) {
                    nrg(rc, 0, f, 1)
                }
            }
            if (c.parentNode) {
                c = c.parentNode
            } else {
                break
            }
        }
    } else {
        fm = 0
    }
}

function ncg(a) {
    fmx = 0;
    fmy = 0;
    nuv();
    if (a.clientX > (viewport_width - 25)) {
        if (!il && nrb) {
            nrb()
        }
    }
}

function nkf(c) {
    var b, a;
    if (ie) {
        b = c.clientX + d.body.scrollLeft;
        a = c.clientY + d.body.scrollTop
    } else {
        b = c.pageX;
        a = c.pageY
    } if (fk && sx && sy && (sx != b || sy != a)) {
        fk = 0
    }
    sx = b;
    sy = a
}
var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
if (document.attachEvent) {
    document.attachEvent("on" + mousewheelevt, nkw)
} else {
    if (document.addEventListener) {
        document.addEventListener(mousewheelevt, nkw, false)
    }
}

function nkw(a) {
    if (io && !il && nrb) {
        nrb()
    }
    fk = 0
}

function nis() {
    var c, a;
    setTimeout("idom=1;", 250);
    if (fq) {
        return false
    }
    var b = d.getElementById("state_hidden").value;
    if (b) {
        nhs(b)
    } else {
        rc = d.getElementById(DDG.first_result)
    }
    fs = 0;
    if (!il && nrb) {
        nrb()
    }
}

function nuov(r, q, b, m, k, o, s, e, a, p, n) {
    var h, j, g, f, c;
    j = d.createElement("div");
    YAHOO.util.Dom.addClass(j, "inline");
    if (m) {
        YAHOO.util.Dom.setStyle(j, "clear", "right");
        YAHOO.util.Dom.setStyle(j, "float", "right");
        YAHOO.util.Dom.setStyle(j, "margin-left", "10px")
    } else {
        YAHOO.util.Dom.setStyle(j, "clear", "left");
        YAHOO.util.Dom.setStyle(j, "float", "left");
        YAHOO.util.Dom.setStyle(j, "margin-left", "10px");
        YAHOO.util.Dom.setStyle(j, "margin-right", "10px")
    } if (k) {
        YAHOO.util.Dom.setStyle(j, "border", "1px solid #FFF")
    }
    if (nur) {
        g = nur("", "", "/iu2/?u=" + decodeURIComponent(r))
    }
    if (g) {
        YAHOO.util.Dom.addClass(g, "inline");
        YAHOO.util.Dom.setStyle(g, "max-height", o + "px");
        YAHOO.util.Dom.setStyle(g, "max-width", s + "px");
        if (ie6) {
            if (q > 65) {
                YAHOO.util.Dom.setStyle(g, "height", o + "px")
            } else {
                if (b > 100) {
                    YAHOO.util.Dom.setStyle(g, "width", s + "px")
                }
            }
        }
        j.appendChild(g);
        f = nur("", "", "/assets/icon_play.v101.png");
        if (f) {
            YAHOO.util.Dom.setStyle(f, "z-index", "100");
            YAHOO.util.Dom.setStyle(f, "margin", "auto");
            YAHOO.util.Dom.setStyle(f, "margin-top", "-" + parseInt((o / 2) + 22) + "px");
            YAHOO.util.Dom.setStyle(f, "margin-bottom", parseInt((o / 2) - 21) + "px");
            j.appendChild(f)
        }
        c = nutr(p);
        j.embedly = c;
        j.embedlyw = a;
        j.embedlyh = e;
        j.onclick = function () {
            fl = 1;
            var u = this.parentNode;
            var t = this;
            u.removeChild(this);
            t.innerHTML = tr[t.embedly];
            YAHOO.util.Dom.setStyle(t, "float", "none");
            YAHOO.util.Dom.removeClass(t, "inline");
            YAHOO.util.Dom.setStyle(t, "max-width", "600px");
            j = d.createElement("div");
            YAHOO.util.Dom.setStyle(j, "padding-top", "5px");
            t.onmouseout = function () {};
            t.onmouseover = function () {};
            YAHOO.util.Dom.setStyle(t, "border", "none");
            if (u.id && u.id == "side_map") {
                u = d.getElementById("content");
                u.insertBefore(t, u.firstChild);
                u.insertBefore(j, u.firstChild)
            } else {
                YAHOO.util.Dom.setStyle(t, "margin-left", n + "px");
                u.appendChild(j);
                u.appendChild(t)
            }
        };
        if (k) {
            j.onmouseover = function () {
                YAHOO.util.Dom.setStyle(this, "border", "1px solid #ff6666")
            };
            j.onmouseout = function () {
                YAHOO.util.Dom.setStyle(this, "border", "1px solid #FFF")
            }
        }
    }
    return j
}

function nreb(f) {
    var r, o, h, e, a, n, j, c, t, q, m, b, s, p, g, k;
    g = new RegExp("^r1-(\\d+)$");
    for (h = 0; h < f.length; h++) {
        a = d.getElementById(reb[rebc++]);
        k = 0;
        if (a.id && g.test(a.id)) {
            k = RegExp.$1
        }
        r = f[h]["provider_name"];
        if (!r) {
            continue
        }
        t = new RegExp(f[h]["provider_name"].replace(/^the/i, ""), "i");
        q = t.test(decodeURIComponent(rq)) ? true : false;
        if (a && (r == "YouTube" || (f[h]["type"] == "video" && f[h]["html"])) && (!kb || (q && kb == "d") || (kb && (kb == "e" || kb == "v")))) {
            if (!b) {
                b = 1000
            }
            if (f[h]["thumbnail_url"]) {
                if (((!ip && !ia) || r == "YouTube") && f[h]["type"] == "video" && f[h]["html"]) {
                    n = nuov(f[h]["thumbnail_url"], f[h]["thumbnail_height"], f[h]["thumbnail_width"], !b || b != -1 ? 1 : 0, 1, 65, 100, f[h]["height"], f[h]["width"], f[h]["html"], 29);
                    if (b == -1) {
                        b = n
                    } else {
                        a.insertBefore(n, a.firstChild)
                    }
                }
            }
        } else {
            if (a && f[h]["thumbnail_url"] && (!kb || kb == "d" || kb == "e" || kb == "t")) {
                n = d.createElement("div");
                YAHOO.util.Dom.addClass(n, "inline");
                YAHOO.util.Dom.setStyle(n, "clear", "right");
                if (s) {
                    YAHOO.util.Dom.setStyle(n, "float", "right");
                    YAHOO.util.Dom.setStyle(n, "margin-left", "10px")
                }
                if (nur) {
                    j = nur("", "", "/iu2/?u=" + decodeURIComponent(f[h]["thumbnail_url"]))
                }
                if (j) {
                    YAHOO.util.Dom.addClass(j, "inline");
                    YAHOO.util.Dom.setStyle(j, "max-height", "65px");
                    YAHOO.util.Dom.setStyle(j, "max-width", "100px");
                    if (ie6) {
                        if (f[h]["thumbnail_height"] > 65) {
                            YAHOO.util.Dom.setStyle(j, "height", "65px")
                        } else {
                            if (f[h]["thumbnail_width"] > 100) {
                                YAHOO.util.Dom.setStyle(j, "width", "100px")
                            }
                        }
                    }
                    n.appendChild(j);
                    if (!s) {
                        s = n;
                        h--;
                        rebc--
                    } else {
                        a.insertBefore(n, a.firstChild)
                    }
                }
            }
        }
    }
}

function nsk() {
    if (kk && kk == "-1") {
        return false
    }
    YAHOO.util.Dom.setStyle("keyboard_shortcuts", "display", "block");
    YAHOO.util.Dom.setStyle("keyboard_shortcuts", "padding-top", "10px");
    YAHOO.util.Dom.setStyle("keyboard_shortcuts", "padding-bottom", "15px")
}

function nsh(c) {
    var b, a;
    if (!c) {
        return
    }
    b = d.getElementById(c);
    a = d.getElementById(c + "h");
    if (!a) {
        a = d.getElementById(c + "_hidden")
    }
    if (b && a) {
        YAHOO.util.Dom.setStyle(b, "display", "none");
        YAHOO.util.Dom.setStyle(a, "display", "inline")
    }
}

function nrrel(q) {
    var n, b, o, a, g, f, j, m, e, c, k;
    if (d.getElementById("nrreld")) {
        return
    }
    a = d.getElementById("links");
    m = q.r && q.r.length ? 1 : 0;
    e = r1c || d.getElementById("did_you_mean") || d.getElementById("zero_click_answer") || rad || YAHOO.util.Dom.getStyle("zero_click_wrapper", "visibility") == "visible" ? 1 : 0;
    g = d.createElement("div");
    g.id = "nrreld";
    YAHOO.util.Dom.setStyle(g, "font-size", "107.1%");
    if (d.getElementById("zero_click_answer") && !r1c) {
        YAHOO.util.Dom.setStyle(g, "font-size", "95.2%")
    }
    rs ? YAHOO.util.Dom.setStyle(g, "padding-left", "64px") : YAHOO.util.Dom.setStyle(g, "padding-left", "33px");
    if (e) {
        YAHOO.util.Dom.setStyle(g, "padding-top", "20px")
    }
    if (rq.indexOf("sort%3Adate") != -1 || rq.indexOf("s%3Ad") != -1) {
        c = 1
    } else {
        c = ""
    }
    f = d.createElement("div");
    f.innerHTML = "No " + (e ? "more " : "") + (c ? "date " : "") + "results." + (m ? " Try:" : "");
    g.appendChild(f);
    if (m) {
        for (n in q.r) {
            b = q.u[n];
            n = q.r[n];
            f = d.createElement("div");
            j = d.createElement("a");
            j.href = "/?q=" + encodeURIComponent(b) + (kurl ? kurl : "");
            if (kurl) {
                j.href += kurl
            }
            j.innerHTML = n;
            f.appendChild(j);
            YAHOO.util.Dom.setStyle(f, "padding-top", "2px");
            g.appendChild(f)
        }
    }
    f = d.createElement("div");
    var p = rq;
    p = p.replace(/s(?:ort|)%3Ad(?:ate|)/, "");
    k = (p != rq) ? "!gyear " : "!g ";
    var h = '<a href="/?q=' + k + p + '">Google</a> / <a href="/?q=!b ' + p + '">Bing</a> / <a href="/bang.html" onclick=this.href=\'#\';nbc();return false;>' + l("More") + "...</a>";
    f.innerHTML = (m ? l("Or try %s", h) : l("Try %s", h));
    m ? YAHOO.util.Dom.setStyle(f, "padding-top", "15px") : YAHOO.util.Dom.setStyle(f, "padding-top", "7px");
    g.appendChild(f);
    a.appendChild(g)
}

function nrwot(b) {
    var e, j, c, f, a, g, h;
    for (e in b) {
        if (!e) {
            continue
        }
        j = b[e]["d"];
        if (!j) {
            continue
        }
        f = b[e]["r"];
        if (!f) {
            continue
        }
        g = b[e]["t"];
        if (!g) {
            continue
        }
        j = d.getElementById(j);
        if (!j) {
            continue
        }
        c = YAHOO.util.Dom.getElementsByClassName("icon_fav2", "div", j);
        if (!c.length) {
            c = YAHOO.util.Dom.getElementsByClassName("icon_fav", "div", j)
        }
        if (!c.length) {
            continue
        }
        c = c[0];
        if (!c) {
            continue
        }
        h = "";
        if (f <= 2) {
            h = l("Warning! Site could be harmful.")
        } else {
            if (f >= 4) {
                h = l("Site has good reputation.")
            }
        } if (nur) {
            a = nur("", h, "/wot/" + f + ".png", 16, 16)
        }
        if (a) {
            link = d.createElement("a");
            link.href = "http://www.mywot.com/en/scorecard/" + g;
            if (h) {
                link.title = h
            }
            link.appendChild(a);
            link.onclick = function () {
                fl = 1
            };
            if (kf == "w") {
                c.innerHTML = ""
            }
            c.appendChild(link);
            YAHOO.util.Dom.setStyle(c, "display", "block")
        }
    }
}

function nrb(b, c) {
    var e, o, g, j, m, k, n, f, a, h;
    if (fs) {
        return false
    }
    fs = 1;
    m = YAHOO.util.Dom.getDocumentHeight();
    k = YAHOO.util.Dom.getDocumentScrollTop();
    nuv();
    g = ((k + viewport_height) >= (m - 500)) ? 1 : 0;
    e = d.getElementById("r1-" + (parseInt(r1c) - 2));
    j = 0;
    if (e) {
        o = YAHOO.util.Dom.getY(e);
        if (o < (k + viewport_height + 20)) {
            j = 1
        }
    }
    if (!c && fmx && fmy && fmx > (viewport_width - 100) && fmy < (parseInt(viewport_height) - 17)) {
        fs = 0;
        return
    }
    if (g || j || c) {
        for (f = parseInt(r1c) - 1; f >= 0; f--) {
            a = d.getElementById("r1-" + f);
            h = a.parentNode;
            if (YAHOO.util.Dom.getStyle(h, "display") == "block") {
                nrm(7, "r1-" + f);
                break
            }
        }
    }
    fs = 0
}

function loadCloudSettings(c, b) {
    var a = new XMLHttpRequest();
    a.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (a.status == 200) {
                var f = JSON.parse(a.responseText);
                for (var e in f) {
                    window[e] = f[e];
                    YAHOO.util.Cookie.set(e.slice(1), f[e], {
                            expires: new Date("January 12, 2025")
                        })
                }
                YAHOO.util.Cookie.set("objectKey", c, {
                        expires: new Date("January 12, 2025")
                    })
            }
            b()
        }
    };
    a.open("GET", "/settings.js?key=" + c);
    a.send()
}
var isDarkColor = function (g) {
    if (!g) {
        return 0
    }
    var b, a, f, e;
    b = parseInt(g.slice(1, 3), 16);
    a = parseInt(g.slice(3, 5), 16);
    f = parseInt(g.slice(5, 7), 16);
    e = 0.3 * b + 0.59 * a + 0.11 * f;
    return (e < 127)
};

function nic() {
    var k, h, n, j, e, a, g, m, c, b, f;
    f = DDG.page_type;
    nuv();
    DDG.fix_browser_bugs();
    if (w.is_twitter) {
        DDG.display_twitter_status()
    }
    k = kh || YAHOO.util.Cookie.get("h");
    if (k) {
        kurl += "&kh=" + encodeURIComponent(k)
    }
    if (k && k == "1" && !issl) {
        d.x.action = "https://" + w.location.host
    }
    k = ki || YAHOO.util.Cookie.get("i");
    if (k) {
        kurl += "&ki=" + encodeURIComponent(k)
    }
    if (k && k == "-1" && typeof (rt) != "undefined" && rt == "D") {
        YAHOO.util.Dom.setStyle("zero_click_wrapper", "display", "none");
        YAHOO.util.Dom.setStyle("zero_click_wrapper", "visibility", "hidden");
        YAHOO.util.Dom.setStyle("zero_click_header", "display", "none");
        YAHOO.util.Dom.setStyle("zero_click_header", "visibility", "hidden");
        YAHOO.util.Dom.setStyle("zero_click_topics", "display", "none");
        YAHOO.util.Dom.setStyle("zero_click_topics", "visibility", "hidden")
    }
    k = ks || YAHOO.util.Cookie.get("s");
    if (k) {
        kurl += "&ks=" + encodeURIComponent(k)
    }
    b = "100";
    if (k == "s") {
        b = "85"
    } else {
        if (k == "m") {
            b = "91"
        } else {
            if (k == "l") {
                b = "108"
            } else {
                if (k == "t") {
                    b = "115"
                }
            }
        }
    } if (k == "s" || k == "m" || k == "l" || k == "t") {
        YAHOO.util.Dom.setStyle("content", "font-size", b + "%");
        YAHOO.util.Dom.setStyle("search_form_homepage", "font-size", b + "%");
        YAHOO.util.Dom.setStyle("header_button", "font-size", b + "%");
        YAHOO.util.Dom.setStyle("bang_wrapper", "font-size", b + "%");
        YAHOO.util.Dom.setStyle("spacing_hidden_wrapper", "font-size", b + "%");
        YAHOO.util.Dom.setStyle("side", "font-size", b + "%")
    }
    if (k == "s") {
        YAHOO.util.StyleSheet(DDG.stylesheet).set(".results_links, .results_links_more, .results_category_more, .results_links_deep", {
                paddingTop: "6px",
                paddingBottom: "6px"
            }).set(".results_links, .results_links_more, .results_category_more", {
                paddingTop: "6px",
                paddingBottom: "6px"
            }).set(".results_zero_click, .results_zero_click_more", {
                paddingTop: "2px",
                paddingBottom: "2px"
            }).enable()
    } else {
        if (k == "m" || k == "l" || k == "t") {
            YAHOO.util.StyleSheet(DDG.stylesheet).set(".results_links, .results_links_more, .results_category_more, .results_links_deep", {
                    paddingTop: "9px",
                    paddingBottom: "9px"
                }).set(".results_links, .results_links_more, .results_category_more", {
                    paddingTop: "9px",
                    paddingBottom: "9px"
                }).set(".results_zero_click, .results_zero_click_more", {
                    paddingTop: "2px",
                    paddingBottom: "2px"
                }).enable()
        }
    }
    k = ka || YAHOO.util.Cookie.get("a");
    if (k) {
        kurl += "&ka=" + encodeURIComponent(k)
    }
    if (k) {
        if (k == "a") {
            h = "Arial"
        } else {
            if (k == "c") {
                h = "Century Gothic"
            } else {
                if (k == "g") {
                    h = "Georgia"
                } else {
                    if (k == "t") {
                        h = "Times"
                    } else {
                        if (k == "h") {
                            h = "Helvetica"
                        } else {
                            if (k == "v") {
                                h = "Verdana"
                            } else {
                                if (k == "b") {
                                    h = "Trebuchet MS"
                                } else {
                                    if (k == "s") {
                                        h = "Serif"
                                    } else {
                                        if (k == "n") {
                                            h = "Sans-Serif"
                                        } else {
                                            if (k == "o") {
                                                h = "Tahoma"
                                            } else {
                                                if (k == "e") {
                                                    h = "Segoe UI"
                                                } else {
                                                    h = k
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        YAHOO.util.StyleSheet(DDG.stylesheet).set("a", {
                fontFamily: h
            }).enable()
    } else {
        YAHOO.util.Dom.setStyle("spacing_hidden_wrapper", "font-family", '"Segoe UI","Arial",sans-serif')
    }
    k = kt || YAHOO.util.Cookie.get("t");
    if (k) {
        kurl += "&kt=" + encodeURIComponent(k)
    }
    if (k) {
        if (k == "a") {
            h = "Arial"
        } else {
            if (k == "c") {
                h = "Century Gothic"
            } else {
                if (k == "g") {
                    h = "Georgia"
                } else {
                    if (k == "t") {
                        h = "Trebuchet MS"
                    } else {
                        if (k == "i") {
                            h = "Times"
                        } else {
                            if (k == "h") {
                                h = "Helvetica"
                            } else {
                                if (k == "v") {
                                    h = "Verdana"
                                } else {
                                    if (k == "s") {
                                        h = "Serif"
                                    } else {
                                        if (k == "n") {
                                            h = "Sans-Serif"
                                        } else {
                                            if (k == "o") {
                                                h = "Tahoma"
                                            } else {
                                                if (k == "e") {
                                                    h = "Segoe UI"
                                                } else {
                                                    h = k
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        YAHOO.util.Dom.setStyle("search_form_input", "font-family", h);
        YAHOO.util.Dom.setStyle("bang", "font-family", h);
        YAHOO.util.StyleSheet(DDG.stylesheet).set("body", {
                fontFamily: h
            }).set(".snippet, .snippet a, .url, .url a", "font-family: " + h + " !important;").enable()
    }
    k = ky || YAHOO.util.Cookie.get("y");
    if (k) {
        kurl += "&ky=" + encodeURIComponent(k)
    }
    if (k == "-1" || is_mobile) {
        ky = -1;
        YAHOO.util.StyleSheet(DDG.stylesheet).set(".highlight", {
                background: "#FCFCFC none",
                cursor: "default"
            }).enable()
    } else {
        if (k == "b") {
            YAHOO.util.StyleSheet(DDG.stylesheet).set(".highlight", {
                    background: "#eaf5fc none",
                    cursor: "default"
                }).set(".highlight", "border: 1px solid #b0d9f2 !important;").enable()
        } else {
            if (k == "y") {
                YAHOO.util.StyleSheet(DDG.stylesheet).set(".highlight", {
                        background: "#fcf5aa none",
                        cursor: "default"
                    }).set(".highlight", "border: 1px solid #d2df70 none;").enable()
            } else {
                if (k == "t") {
                    YAHOO.util.StyleSheet(DDG.stylesheet).set(".highlight", {
                            background: "#fcf5ea none",
                            cursor: "default"
                        }).set(".highlight", "border: 1px solid #f2d9b0 none;").enable()
                } else {
                    if (k == "p") {
                        YAHOO.util.StyleSheet(DDG.stylesheet).set(".highlight", {
                                background: "#fceaf5 none",
                                cursor: "default"
                            }).set(".highlight", "border: 1px solid #f2b0d9 none;").enable()
                    } else {
                        if (k == "g") {
                            YAHOO.util.StyleSheet(DDG.stylesheet).set(".highlight", {
                                    background: "#e4f6b9 none",
                                    cursor: "default"
                                }).set(".highlight", "border: 1px solid #b8e478 none;").enable()
                        } else {
                            if (k) {
                                YAHOO.util.StyleSheet(DDG.stylesheet).set(".highlight", {
                                        background: k + " none",
                                        cursor: "default"
                                    }).set(".highlight", "border: 1px solid " + k + " url('');").set(".search_suggestion:hover", {
                                        background: k
                                    }).enable()
                            }
                        }
                    }
                }
            }
        }
    }
    k = kk || YAHOO.util.Cookie.get("k");
    if (k) {
        kurl += "&kk=" + encodeURIComponent(k)
    }
    if (k != "-1" && !is_mobile) {
        if (f) {
            YAHOO.util.Event.onDOMReady(setTimeout("nik(1)", 250))
        } else {
            YAHOO.util.Event.onDOMReady(setTimeout("nik()", 250))
        }
    }
    if (k == "s" && !is_mobile) {
        nsk()
    }
    if (k == "s" && !ip) {
        nsh("keyboard_shortcuts_more")
    }
    k = kf || YAHOO.util.Cookie.get("f");
    if (k) {
        kurl += "&kf=" + encodeURIComponent(k)
    }
    if (!k || k == "1" || k == "fw" || k == "b" || rs) {
        YAHOO.util.StyleSheet(DDG.stylesheet).set(".icon_fav", {
                display: "block"
            }).set(".icon_fav2", {
                display: "block"
            }).set(".icon_category", {
                display: "block"
            }).set(".icon_disambig", {
                display: "block"
            }).enable()
    } else {
        if (k == "1") {
            nur = null
        }
    }
    k = kc || YAHOO.util.Cookie.get("c");
    if (k) {
        kurl += "&kc=" + encodeURIComponent(k)
    }
    if (k != "-1" && (!io || io11)) {
        YAHOO.util.Event.addListener(window, "scroll", nrb)
    } else {
        if (k && k == "-1") {}
    }
    k = kw || YAHOO.util.Cookie.get("w");
    if (k) {
        kurl += "&kw=" + encodeURIComponent(k)
    }
    if (k == "w") {
        YAHOO.util.Dom.setStyle("header_content_wrapper", "max-width", "1200px");
        YAHOO.util.Dom.setStyle("header_content", "max-width", "1073px");
        YAHOO.util.Dom.setStyle("content_wrapper", "max-width", "1200px");
        YAHOO.util.Dom.setStyle("content", "max-width", "1082px");
        YAHOO.util.Dom.setStyle("links", "max-width", "1000px");
        YAHOO.util.Dom.setStyle("links_wrapper", "max-width", "1000px");
        YAHOO.util.Dom.setStyle("zero_click", "max-width", "990px");
        YAHOO.util.Dom.setStyle("zero_click_wrapper", "max-width", "990px");
        YAHOO.util.Dom.setStyle("side", "max-width", "900px");
        YAHOO.util.Dom.setStyle("side_wrapper", "max-width", "900px");
        YAHOO.util.Dom.setStyle("side_wrapper2", "right", "-115px");
        YAHOO.util.Dom.setStyle("search_form_input", "width", "581px");
        YAHOO.util.Dom.setStyle("search_form", "width", "688px")
    } else {
        if (k == "s") {
            YAHOO.util.Dom.setStyle("header_content_wrapper", "max-width", "1500px");
            YAHOO.util.Dom.setStyle("header_content", "max-width", "1373px");
            YAHOO.util.Dom.setStyle("content_wrapper", "max-width", "1460px");
            YAHOO.util.Dom.setStyle("content", "max-width", "1382px");
            YAHOO.util.Dom.setStyle("links", "max-width", "1245px");
            YAHOO.util.Dom.setStyle("links_wrapper", "max-width", "1245px");
            YAHOO.util.Dom.setStyle("zero_click", "max-width", "1240px");
            YAHOO.util.Dom.setStyle("zero_click_wrapper", "max-width", "1240px");
            YAHOO.util.Dom.setStyle("side", "max-width", "1100px");
            YAHOO.util.Dom.setStyle("side_wrapper", "max-width", "1100px");
            YAHOO.util.Dom.setStyle("side_wrapper2", "right", "-130px");
            YAHOO.util.Dom.setStyle("search_form_input", "width", "781px");
            YAHOO.util.Dom.setStyle("search_form", "width", "888px")
        }
    } if (k == "w" || k == "s") {
        YAHOO.util.Dom.setStyle("content", "padding-left", "62px");
        YAHOO.util.Dom.setStyle("header_content", "padding-left", "87px");
        YAHOO.util.Dom.setStyle("links", "width", "80%");
        YAHOO.util.Dom.setStyle("zero_click", "width", "80%")
    }
    k = ku || YAHOO.util.Cookie.get("u");
    if (k) {
        kurl += "&ku=" + encodeURIComponent(k)
    }
    if (k == "1") {
        YAHOO.util.StyleSheet(DDG.stylesheet).set("a.large", {
                textDecoration: "underline"
            }).enable()
    }
    k = kq || YAHOO.util.Cookie.get("q");
    if (k) {
        kurl += "&kq=" + encodeURIComponent(k)
    }
    k = kv || YAHOO.util.Cookie.get("v");
    if (k) {
        kurl += "&kv=" + encodeURIComponent(k)
    }
    k = ke || YAHOO.util.Cookie.get("e");
    if (k) {
        kurl += "&ke=" + encodeURIComponent(k)
    }
    k = kj || YAHOO.util.Cookie.get("j");
    if (ie6) {
        k = "w"
    }
    if (k) {
        kurl += "&kj=" + encodeURIComponent(k);
        if (k != "r3") {
            YAHOO.util.Dom.setStyle("header", "height", "53px");
            YAHOO.util.Dom.setStyle("header", "border-bottom", "none");
            YAHOO.util.Dom.setStyle("search_form", "border-bottom", "0px");
            YAHOO.util.Dom.setStyle("search_form_input", "border", "#888 solid 1px");
            YAHOO.util.Dom.setStyle("search_form_input", "border-right", "0px");
            YAHOO.util.Dom.setStyle("search_form_input_clear", "border", "#888 solid 1px");
            YAHOO.util.Dom.setStyle("search_form_input_clear", "border-right", "0px");
            YAHOO.util.Dom.setStyle("search_form_input_clear", "border-left", "0px");
            YAHOO.util.Dom.setStyle("header_button", "border", "0px");
            YAHOO.util.StyleSheet(DDG.stylesheet).set("#header_button_menu_wrapper a.header_button_menu_item", "text-shadow: none !important").enable()
        }
        if (k == "r") {
            YAHOO.util.Dom.setStyle("header", "background", "url(/headerbg.v102.red.png) 0 0 repeat-x");
            YAHOO.util.Dom.setStyle("header_button", "background", "#d31920")
        } else {
            if (k == "r2") {
                YAHOO.util.Dom.setStyle("header", "background", "url(/headerbg.v102.dred.png) 0 0 repeat-x");
                YAHOO.util.Dom.setStyle("header_button", "background", "#bd232a")
            } else {
                if (k == "b") {
                    YAHOO.util.Dom.setStyle("header", "background", "url(/headerbg.v102.lblue.png) 0 0 repeat-x");
                    YAHOO.util.Dom.setStyle("header_button", "background", "#aed7f3")
                } else {
                    if (k == "d") {
                        YAHOO.util.Dom.setStyle("header", "background", "url(/headerbg.v102.lgreen.png) 0 0 repeat-x");
                        YAHOO.util.Dom.setStyle("header_button", "background", "#bae57a")
                    } else {
                        if (k == "b2") {
                            YAHOO.util.Dom.setStyle("header", "background", "url(/headerbg.v102.dblue.png) 0 0 repeat-x");
                            YAHOO.util.Dom.setStyle("header_button", "background", "#2e708e")
                        } else {
                            if (k == "p") {
                                YAHOO.util.Dom.setStyle("header", "background", "url(/headerbg.v102.purple.png) 0 0 repeat-x");
                                YAHOO.util.Dom.setStyle("header_button", "background", "#8a4391")
                            } else {
                                if (k == "g") {
                                    YAHOO.util.Dom.setStyle("header", "background", "url(/headerbg.v102.green.png) 0 0 repeat-x");
                                    YAHOO.util.Dom.setStyle("header_button", "background", "#09A940")
                                } else {
                                    if (k == "g2") {
                                        YAHOO.util.Dom.setStyle("header", "background", "url(/headerbg.v102.dgreen.png) 0 0 repeat-x");
                                        YAHOO.util.Dom.setStyle("header_button", "background", "#47a055")
                                    } else {
                                        if (k == "o") {
                                            YAHOO.util.Dom.setStyle("header", "background", "url(/headerbg.v102.orange.png) 0 0 repeat-x");
                                            YAHOO.util.Dom.setStyle("header_button", "background", "#da7e46")
                                        } else {
                                            if (k == "w") {
                                                YAHOO.util.Dom.setStyle("header", "background", "#fff");
                                                YAHOO.util.Dom.setStyle("header_logo", "background", "url(/assets/logo_header_white_2.v101.png)");
                                                YAHOO.util.Dom.setStyle("header", "border-bottom", "none");
                                                YAHOO.util.Dom.setStyle("header", "box-shadow", "none")
                                            } else {
                                                if (k == "ct") {
                                                    YAHOO.util.Dom.setStyle("header", "background", "url(/headerbg.v102.bgrey.png) 0 0 repeat-x");
                                                    YAHOO.util.Dom.setStyle("header_button", "background", "#313130")
                                                } else {
                                                    if (k == "kt") {
                                                        YAHOO.util.Dom.setStyle("header", "background", "url(/headerbg.v102.black.png) 0 0 repeat-x");
                                                        YAHOO.util.Dom.setStyle("header_button", "background", "#252525")
                                                    } else {
                                                        if (k == "t") {
                                                            YAHOO.util.Dom.setStyle("header", "background", "transparent url(/white_or_transp.png) 0 0 repeat-x");
                                                            YAHOO.util.Dom.setStyle("header_button", "background", "none")
                                                        } else {
                                                            if (k != "r3") {
                                                                YAHOO.util.Dom.setStyle("header", "background", k);
                                                                YAHOO.util.Dom.setStyle("header_button", "background", k)
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    k = kr || YAHOO.util.Cookie.get("r");
    if (k) {
        kurl += "&kr=" + encodeURIComponent(k)
    }
    if (ie6) {
        k = "-1"
    }
    if (k && (k == "-1" || k == "c")) {
        YAHOO.util.Dom.setStyle("header_button", "display", "none");
        YAHOO.util.Dom.setStyle("header_button_wrapper", "display", "none")
    }
    k = km || YAHOO.util.Cookie.get("m");
    if (k) {
        kurl += "&km=" + encodeURIComponent(k)
    }
    if (k == "l") {
        YAHOO.util.Dom.setStyle("content", "padding-left", "20px");
        YAHOO.util.Dom.setStyle("content_wrapper", "margin", "0");
        YAHOO.util.Dom.setStyle("header_wrapper", "margin", "0");
        YAHOO.util.Dom.setStyle("header_content_wrapper", "margin", "0");
        YAHOO.util.Dom.setStyle("content", "margin", "0");
        YAHOO.util.Dom.setStyle("links_wrapper", "margin", "0");
        YAHOO.util.Dom.setStyle("zero_click_wrapper", "margin", "0");
        YAHOO.util.Dom.setStyle("header_content", "margin", "0");
        YAHOO.util.Dom.setStyle("header_content", "padding-left", "95px")
    }
    k = ko || YAHOO.util.Cookie.get("o");
    if (k) {
        kurl += "&ko=" + encodeURIComponent(k)
    }
    if (ie6) {
        k = "s"
    }
    if (!k || k != "-1") {
        YAHOO.util.Dom.setStyle("header_wrapper", "display", "block")
    }
    if (k && k == "s") {
        YAHOO.util.Dom.setStyle("header_wrapper", "display", "block");
        YAHOO.util.Dom.setStyle("header", "position", "absolute");
        YAHOO.util.Dom.setStyle("header_wrapper", "position", "absolute");
        if (ie6) {
            YAHOO.util.Dom.setStyle("header", "padding-top", "0px");
            YAHOO.util.Dom.setStyle("header", "height", "70px");
            YAHOO.util.Dom.setStyle("header", "width", "700px");
            YAHOO.util.Dom.setStyle("header", "padding-left", "23px");
            YAHOO.util.Dom.setStyle("header_content_wrapper", "padding-top", "0");
            YAHOO.util.Dom.setStyle("header_content", "padding-top", "0")
        }
    } else {
        if (k && k == "-1") {
            YAHOO.util.Dom.setStyle("header_wrapper", "display", "none");
            YAHOO.util.Dom.setStyle("content", "padding-top", "0px");
            YAHOO.util.Dom.setStyle("side_wrapper2", "top", "0px");
            YAHOO.util.StyleSheet(DDG.stylesheet).set("#zero_click_wrapper", "padding-top:0px !important;").enable()
        }
    }
    k = kz || YAHOO.util.Cookie.get("z");
    if (k) {
        kurl += "&kz=" + encodeURIComponent(k)
    }
    if ((!k || k == "1") && w.rad) {
        YAHOO.util.Dom.setStyle("zero_click_wrapper", "display", "block");
        YAHOO.util.Dom.setStyle("zero_click_wrapper", "visibility", "visible")
    } else {
        if (k == "-1") {
            YAHOO.util.Dom.setStyle("zero_click_wrapper", "display", "none");
            YAHOO.util.Dom.setStyle("zero_click_wrapper", "visibility", "hidden");
            YAHOO.util.Dom.setStyle("zero_click_header", "display", "none");
            YAHOO.util.Dom.setStyle("zero_click_header", "visibility", "hidden");
            YAHOO.util.Dom.setStyle("zero_click_topics", "display", "none");
            YAHOO.util.Dom.setStyle("zero_click_topics", "visibility", "hidden");
            nra = function () {
                return false
            };
            nra2 = function () {
                return false
            }
        }
    }
    k = kx || YAHOO.util.Cookie.get("x");
    if (k) {
        kurl += "&kx=" + encodeURIComponent(k)
    }
    if (k && k != "r") {
        if (k == "g") {
            k = "#0f5c17"
        } else {
            if (k == "b") {
                k = "#10385d"
            } else {
                if (k == "o") {
                    k = "#d15d0d"
                } else {
                    if (k == "p") {
                        k = "#732883"
                    } else {
                        if (k == "l") {
                            k = "#222222"
                        } else {
                            if (k == "e") {
                                k = "#777777"
                            }
                        }
                    }
                }
            }
        }
        YAHOO.util.StyleSheet(DDG.stylesheet).set(".url, .url a", "color: " + k + " !important;").enable()
    }
    k = kg || YAHOO.util.Cookie.get("g");
    if (k) {
        kurl += "&kg=" + encodeURIComponent(k)
    }
    if (k == "p") {
        d.x.method = "POST";
        d.title = "DuckDuckGo"
    }
    k = kl || YAHOO.util.Cookie.get("l");
    if (k) {
        kurl += "&kl=" + encodeURIComponent(k)
    }
    k = kp || YAHOO.util.Cookie.get("p");
    if (k) {
        kurl += "&kp=" + encodeURIComponent(k)
    }
    k = kd || YAHOO.util.Cookie.get("d");
    if (k) {
        kurl += "&kd=" + encodeURIComponent(k)
    }
    k = kn || YAHOO.util.Cookie.get("n");
    if (k) {
        kurl += "&kn=" + encodeURIComponent(k)
    }
    k = kb || YAHOO.util.Cookie.get("b");
    if (k) {
        kurl += "&kb=" + encodeURIComponent(k)
    }
    k = k1 || YAHOO.util.Cookie.get("1");
    if (k) {
        kurl += "&k1=" + encodeURIComponent(k)
    }
    if (k && k == "-1") {
        YAHOO.util.Dom.setStyle("ads", "height", "0px")
    }
    k = k2 || YAHOO.util.Cookie.get("2");
    if (k) {
        kurl += "&k2=" + encodeURIComponent(k)
    }
    k = k3 || YAHOO.util.Cookie.get("3");
    if (k) {
        kurl += "&k3=" + encodeURIComponent(k)
    }
    k = k4 || YAHOO.util.Cookie.get("4");
    if (k) {
        kurl += "&k4=" + encodeURIComponent(k)
    }
    k = k5 || YAHOO.util.Cookie.get("5");
    if (k) {
        kurl += "&k5=" + encodeURIComponent(k)
    }
    k = k6 || YAHOO.util.Cookie.get("6");
    if (k) {
        kurl += "&k6=" + encodeURIComponent(k)
    }
    k = k7 || YAHOO.util.Cookie.get("7");
    if (k && k != "ow") {
        if (k == "w") {
            k = "#FFFFFF"
        }
        YAHOO.util.StyleSheet(DDG.stylesheet).set("html,body,#side,#zero_click,.highlight_sponsored", {
                background: "none"
            }).set("html,body,#side,#zero_click,.highlight_sponsored", {
                backgroundColor: k
            }).set("#zero_click_abstract,#did_you_mean,.results_links,.cr3,.results_links_more,.results_category_more,.results_links_deep,.results_zero_click,.results_zero_click_more,.results_disambig,.links_zero_click_disambig,.results_disambig_more", {
                borderColor: k
            }).set(".highlight_sponsored", "border-color: " + k + " !important").set(".highlight", "border-color: " + k + " !important").enable()
    }
    if (isDarkColor(k)) {
        YAHOO.util.StyleSheet(DDG.stylesheet).set(".search_suggestion", {
                background: "transparent none",
                border: "1px solid rgba(255,255,255,0.3)"
            }).enable()
    }
    if (k) {
        kurl += "&k7=" + encodeURIComponent(k)
    }
    k = k8 || YAHOO.util.Cookie.get("8");
    if (k && k != "g") {
        YAHOO.util.StyleSheet(DDG.stylesheet).set("html", {
                color: k
            }).set(".snippet, .snippet a, .search_suggestion, .search_suggestion a, .links_menu, .links_menu a, #side", "color: " + k + " !important;").enable()
    }
    if (k) {
        kurl += "&k8=" + encodeURIComponent(k)
    }
    k = k9 || YAHOO.util.Cookie.get("9");
    if (k && k != "b") {
        YAHOO.util.StyleSheet(DDG.stylesheet).set("a, #header_button_menu_wrapper:hover a", {
                color: k
            }).enable()
    }
    if (k) {
        kurl += "&k9=" + encodeURIComponent(k)
    }
    k = kaa || YAHOO.util.Cookie.get("aa");
    if (k && k != "p") {
        YAHOO.util.StyleSheet(DDG.stylesheet).set("a:visited", {
                color: k
            }).enable()
    }
    if (k) {
        kurl += "&kaa=" + encodeURIComponent(k)
    }
    k = kab || YAHOO.util.Cookie.get("ab");
    if (k && k != "e") {
        if (k == "r") {
            k = "#EE7777"
        }
        YAHOO.util.StyleSheet(DDG.stylesheet).set("#zero_click,.search_suggestion", {
                borderColor: k
            }).enable()
    }
    if (k) {
        kurl += "&kab=" + encodeURIComponent(k)
    }
    k = kac || YAHOO.util.Cookie.get("ac");
    if (k) {
        kurl += "&kac=" + encodeURIComponent(k)
    }
    k = kad || YAHOO.util.Cookie.get("ad");
    if (k) {
        kurl += "&kad=" + encodeURIComponent(k)
    }
    k = kae || YAHOO.util.Cookie.get("ae");
    if (k) {
        kurl += "&kae=" + encodeURIComponent(k)
    }
    k = kaf || YAHOO.util.Cookie.get("af");
    if (k) {
        kurl += "&kaf=" + encodeURIComponent(k)
    }
    k = kag || YAHOO.util.Cookie.get("ag");
    if (k) {
        kurl += "&kag=" + encodeURIComponent(k)
    }
    k = kah || YAHOO.util.Cookie.get("ah");
    if (k) {
        kurl += "&kah=" + encodeURIComponent(k)
    }
    k = kai || YAHOO.util.Cookie.get("ai");
    if (k) {
        kurl += "&kai=" + encodeURIComponent(k)
    }
    k = kaj || YAHOO.util.Cookie.get("aj");
    if (k) {
        kurl += "&kaj=" + encodeURIComponent(k)
    }
    k = kak || YAHOO.util.Cookie.get("ak");
    if (k) {
        kurl += "&kak=" + encodeURIComponent(k)
    }
    k = kal || YAHOO.util.Cookie.get("al");
    if (k) {
        kurl += "&kal=" + encodeURIComponent(k)
    }
    k = kam || YAHOO.util.Cookie.get("am");
    if (k) {
        kurl += "&kam=" + encodeURIComponent(k)
    }
    k = kan || YAHOO.util.Cookie.get("an");
    if (k) {
        kurl += "&kan=" + encodeURIComponent(k)
    }
    k = kao || YAHOO.util.Cookie.get("ao");
    if (k) {
        kurl += "&kao=" + encodeURIComponent(k)
    }
    k = kap || YAHOO.util.Cookie.get("ap");
    if (k) {
        kurl += "&kap=" + encodeURIComponent(k)
    }
    k = kaq || YAHOO.util.Cookie.get("aq");
    if (k) {
        kurl += "&kaq=" + encodeURIComponent(k)
    }
    k = kar || YAHOO.util.Cookie.get("ar");
    if (k) {
        kurl += "&kar=" + encodeURIComponent(k)
    }
    k = kas || YAHOO.util.Cookie.get("as");
    if (k) {
        kurl += "&kas=" + encodeURIComponent(k)
    }
    k = kat || YAHOO.util.Cookie.get("at");
    if (k) {
        kurl += "&kat=" + encodeURIComponent(k)
    }
    k = kau || YAHOO.util.Cookie.get("au");
    if (k) {
        kurl += "&kau=" + encodeURIComponent(k)
    }
    k = kav || YAHOO.util.Cookie.get("av");
    if (k) {
        kurl += "&kav=" + encodeURIComponent(k)
    }
    k = kaw || YAHOO.util.Cookie.get("aw");
    if (k) {
        kurl += "&kaw=" + encodeURIComponent(k)
    }
    k = kax || YAHOO.util.Cookie.get("ax");
    if (k) {
        kurl += "&kax=" + encodeURIComponent(k)
    }
    k = kay || YAHOO.util.Cookie.get("ay");
    if (k) {
        kurl += "&kay=" + encodeURIComponent(k)
    }
    k = kaz || YAHOO.util.Cookie.get("az");
    if (k) {
        kurl += "&kaz=" + encodeURIComponent(k)
    }
    DDG.resize();
    nua("DDG.resize", "", 250);
    nua("DDG.resize", "", 1250)
}

function nbc(b) {
    var a, e, g, c, f;
    c = d.getElementById("search_form_homepage") ? 1 : 0;
    a = d.getElementById("bang");
    if (YAHOO.util.Dom.getStyle(a, "display") == "none") {
        f = "search_dropdown";
        if (c) {
            f = "search_dropdown_homepage"
        }
        e = 0;
        if (ir || is || iw) {
            e -= 2
        }
        if (c) {
            e += 2
        }
        YAHOO.util.Dom.setStyle(a, "top", parseInt(YAHOO.util.Dom.getY(f) + 37 + e - YAHOO.util.Dom.getDocumentScrollTop()) + "px");
        g = 153;
        if (a.options.length > 100) {
            g += 125
        }
        YAHOO.util.Dom.setStyle(a, "left", parseInt(YAHOO.util.Dom.getX(f) - g) + "px");
        a.selectedIndex = 0;
        setTimeout("YAHOO.util.Dom.setStyle('bang','display','block')", 100);
        setTimeout('d.getElementById("bang").focus()', 150);
        fb = 1;
        fq = 1
    } else {
        if (!fb || b) {
            fq = 0;
            setTimeout("YAHOO.util.Dom.setStyle('bang','display','none')", 200)
        }
    }
}

function nbp() {
    var e, g, b, c, f, a;
    c = YAHOO.util.Cookie.getSubs("!") || 0;
    b = d.getElementById("bang");
    if (b) {
        a = 0;
        if (rl && rl != "us-en" && rl != "wt-wt") {
            b.options.add(new Option("From any region", "region:none"), a++)
        }
        b.options.add(new Option(l("Special"), ""), a++);
        b.options.add(new Option(l("Sort by date"), "!date"), a++);
        b.options.add(new Option(l("I'm feeling ducky"), "!"), a++);
        b.options.add(new Option(l("Try search on") + "...", ""), a++);
        b.options.add(new Option("Amazon (!a)", "!a"), a++);
        b.options.add(new Option(l("Images") + " - Bing (!bi)", "!bi"), a++);
        b.options.add(new Option(l("Images") + " - Google (!gi)", "!gi"), a++);
        b.options.add(new Option("Map (!m)", "!m"), a++);
        b.options.add(new Option("News (!n)", "!n"), a++);
        b.options.add(new Option("Wikipedia (!w)", "!w"), a++);
        b.options.add(new Option("YouTube (!yt)", "!yt"), a++);
        b.options.add(new Option(l("Show all"), ""), a++);
        b.options.add(new Option(l("By category") + " (!bang)", "!bang"), a++);
        b.options.add(new Option(l("Alphabetically"), "more"), a++);
        b.size = a;
        if (c) {
            f = new Array();
            for (g in c) {
                if (g == "date" || g == "ducky" || g == "bang") {
                    continue
                }
                if (grb.test(g)) {
                    f[f.length] = {
                        name: g,
                        count: c[g]
                    }
                }
            }
            f.sort(function (j, h) {
                return h.count - j.count
            });
            a = 0;
            for (e = 0; e < f.length; e++) {
                g = f[e];
                b.options.add(new Option("!" + g.name, "!" + g.name), 0 + a);
                a++;
                if (a == 5) {
                    break
                }
            }
            b.size += a
        }
    }
}

function nbr() {
    var c, b, e, a;
    if (d.x.q.value == "" || d.x.q.value == l("put search terms here")) {
        d.x.q.value = l("put search terms here");
        d.x.q.style.color = "#AAAAAA";
        setTimeout("d.x.q.onclick();d.x.q.focus();", 1000);
        return false
    }
    c = new RegExp(" \\!([^\\s]+)$");
    b = new RegExp("^\\!([^\\s]+)");
    if (c.test(d.x.q.value) || b.test(d.x.q.value)) {
        e = RegExp.$1 || 0;
        if (e && grb.test(e)) {
            a = YAHOO.util.Cookie.getSub("!", e) || 0;
            a++;
            if (kq == "1") {
                YAHOO.util.Cookie.setSub("!", e, a, {
                        expires: new Date("January 12, 2025")
                    })
            }
        }
    }
    return true
}

function nbb(f, b) {
    var h, g, j, a, e, c;
    h = new RegExp(" \\!([^\\s]*)\\s*$");
    g = new RegExp("^\\!([^\\s]+) ");
    a = 0;
    if (h.test(d.x.q.value)) {
        j = RegExp.$1 || "";
        a = d.x.q.value.indexOf("!" + j);
        if (a) {
            d.x.q.value = d.x.q.value.substring(0, a - 1)
        }
    } else {
        if (g.test(d.x.q.value)) {
            d.x.q.value = ""
        }
    }
    j = "";
    if (b) {
        j = b
    } else {
        j = f.options[f.selectedIndex].value
    } if (j == "more") {
        nrj("/bang.v117.js")
    } else {
        if ((d.x.q.value != "" || j == "!bang") && j) {
            d.x.q.value += " " + j;
            setTimeout("nbr();d.x.submit()", 250)
        } else {
            if (j) {
                d.x.q.value += j + " ";
                setTimeout("d.x.q.focus()", 100)
            }
        }
    }
}

function nbm(c) {
    var b, f, g, e, a;
    b = d.getElementById("bang");
    e = d.getElementById("search_form_homepage") ? 1 : 0;
    a = b.options.length;
    for (f in c) {
        if (!c[f]) {
            continue
        }
        b.options[b.length] = new Option(c[f]["s"] + " (!" + c[f]["t"] + ")", "!" + c[f]["t"])
    }
    b.size = 20;
    b.options.add(new Option("All !bangs", ""), a++)
}

function nuc(a) {
    var b = "47";
    if (a.length == 1) {
        b = "73"
    }
    if (ko && (ko == "-1" || ko == "s")) {
        b = "20"
    }
    if (d.getElementById("zero_click")) {
        b = parseInt(b) + parseInt(d.getElementById("zero_click").scrollHeight) - 40
    }
    YAHOO.util.Dom.setStyle("zero_click_abstract" + a, "padding-top", b + "px")
}

function nuo(a) {
    if (!a) {
        a = 0
    }
    window.scroll(0, a)
}

function nipo(a) {
    var c;
    try {
        c = YAHOO.util.StyleSheet("DDGT");
        YAHOO.util.StyleSheet(c).set(".icon_fav", "float: left").enable();
        nic(a)
    } catch (b) {
        setTimeout("nipo()", 150)
    } finally {}
}

function nip(a) {
    var b;
    DDG.page_type = a;
    if (!a && ih5) {
        b = d.createElement("iframe");
        b.id = "iframe_hidden";
        b.src = "/post2.html";
        d.body.appendChild(b)
    }
    if ((io || ie) && !a) {
        nipo(a)
    } else {
        if ("key" in window) {
            loadCloudSettings(key, function () {
                nic(a)
            })
        } else {
            nic(a)
        }
    } if (a) {
        YAHOO.util.Event.addListener("search_form_input_homepage", "keyup", DDG.clear_button_toggle)
    } else {
        if (nir) {
            nir()
        }
        YAHOO.util.Event.onDOMReady(setTimeout("nis()", 250));
        setTimeout("nsl()", 10000);
        YAHOO.util.Event.addListener(d, "mousemove", nkf);
        YAHOO.util.Event.addListener(d, "mouseup", ncg);
        YAHOO.util.Event.addListener(d, "keydown", nckd);
        YAHOO.util.Event.addListener(d, "keypress", nckp);
        YAHOO.util.Event.addListener(d, "keyup", ncku);
        YAHOO.util.Event.addListener("search_form_input", "keyup", DDG.clear_button_toggle);
        YAHOO.util.Event.addListener("search_form_input_clear", "click", DDG.clear_button)
    }
    YAHOO.util.Event.addListener(d, "mousedown", ncf);
    window.onresize = DDG.resize;
    nbp();
    prettybang("on")
}

function nif() {
    var c, b, m;
    c = "Arial";
    b = 1;
    if (typeof (screen.fontSmoothingEnabled) != "undefined") {
        b = screen.fontSmoothingEnabled
    } else {
        try {
            var e = document.createElement("canvas");
            e.width = "35";
            e.height = "35";
            e.style.display = "none";
            document.body.appendChild(e);
            var n = e.getContext("2d");
            n.textBaseline = "top";
            n.font = "32px Arial";
            n.fillStyle = "black";
            n.strokeStyle = "black";
            if (n.mozMeasureText && !n.measureText) {
                n.__defineSetter__("font", function (j) {
                    this.mozTextStyle = j
                });
                n.__defineGetter__("font", function () {
                    return this.mozTextStyle
                })
            }
            if (n.mozMeasureText && !n.measureText) {
                n.measureText = function (j) {
                    return {
                        width: this.mozMeasureText(j)
                    }
                }
            }
            if (n.mozPathText && !n.strokeText) {
                n.strokeText = function (p, j, q) {
                    this.translate(j, q);
                    this.mozPathText(p);
                    this.stroke();
                    this.translate(-j, -q)
                }
            }
            if (n.mozDrawText && !n.fillText) {
                n.fillText = function (p, j, q) {
                    this.translate(j, q);
                    this.mozDrawText(p);
                    this.translate(-j, -q)
                }
            }
            n.fillText("O", 0, 0);
            var o = 0;
            if (n.getImageData) {
                canvas_loop: for (var g = 8; g <= 32; g++) {
                    for (var h = 1; h <= 32; h++) {
                        var a = n.getImageData(h, g, 1, 1).data;
                        var f = a[3];
                        if (f != 255 && f != 0) {
                            o = 1;
                            break canvas_loop
                        }
                    }
                }
            }
            b = o ? 1 : 0
        } catch (k) {
            b = 0
        }
    } if (!b) {
        m = YAHOO.util.Cookie.get("t");
        if (!m) {
            YAHOO.util.Dom.setStyle("search_form_input", "font-family", c);
            YAHOO.util.Dom.setStyle("search_form_input_homepage", "font-family", c);
            YAHOO.util.Dom.setStyle("bang", "font-family", c);
            YAHOO.util.StyleSheet(DDG.stylesheet).set("body", {
                    fontFamily: c
                }).enable()
        }
        m = YAHOO.util.Cookie.get("a");
        if (!m) {
            YAHOO.util.Dom.setStyle("header_button_wrapper", "font-family", c);
            YAHOO.util.Dom.setStyle("special_page_header", "font-family", c);
            YAHOO.util.Dom.setStyle("zero_click_header", "font-family", c);
            YAHOO.util.Dom.setStyle("did_you_mean", "font-family", c);
            YAHOO.util.StyleSheet(DDG.stylesheet).set("zero_click_abstract", {
                    fontFamily: c
                }).enable()
        }
    }
}
YAHOO.util.Event.onDOMReady(nif);
if (ir) {
    window.onload = fnChromeLoad
}

function fnChromeLoad(a) {
    irl = 1
}
DDG.skipArray = {};
DDG.skipArray["sort:date"] = 1;
DDG.skipArray["s:d"] = 1;
DDG.skipArray["!safeoff"] = 1;
DDG.grammarRE = new RegExp("[\\';,\\.]", "g");
DDG.splitRE = new RegExp("[\\s\\-]+");
DDG.getRelevants = function (f) {
    if (f.num === undefined) {
        f.num = f.candidates.length
    }
    var a = [];
    var e = unescape(rq).replace("'", "");
    f.candidates = f.candidates.sort(f.comparator);
    for (var b = 0, c; c = f.candidates[b]; b++) {
        if (DDG.isRelevant(c.comparable, f.skipArray, f.minWordLength, f.strict)) {
            if (b > f.num) {
                return a
            } else {
                a.push(c)
            }
        }
    }
    return a
};
DDG.isRelevant = function (b, c, f, a) {
    var e = unescape(rq).replace("'", "");
    return DDG.stringsRelevant(b, e, c, f, a)
};
DDG.stringsRelevant = function (c, a, s, n, x) {
    if (s instanceof Array) {
        var o = {};
        for (var p = 0, m; m = s[p]; p++) {
            o[m] = 1
        }
        s = o
    }
    if (n === undefined) {
        n = 4
    }
    if (s === undefined) {
        s = DDG.skipArray
    } else {
        for (var v in DDG.skipArray) {
            if (DDG.skipArray.hasOwnProperty(v)) {
                s[v] = 1
            }
        }
    }
    c = c.replace(DDG.grammarRE, "");
    a = a.replace(DDG.grammarRE, "");
    var t = c.split(DDG.splitRE);
    var r = a.split(DDG.splitRE);
    var g, f;
    if (x) {
        if (t.length > r.length) {
            g = r;
            f = t
        } else {
            g = t;
            f = r
        }
    } else {
        if (t.length > r.length) {
            g = t;
            f = r
        } else {
            g = r;
            f = t
        }
    }
    var b = {};
    var k = {};
    var h = 0;
    var u = 0;
    for (var p = 0; p < f.length; p++) {
        var q = f[p];
        if (!q || q.length < n || s[q]) {
            continue
        }
        var j = q.substring(0, n).toLowerCase();
        b[j] = q;
        u++
    }
    b.length = u;
    for (var p = 0; p < g.length; p++) {
        var q = g[p];
        if (!q || q.length < n || s[q]) {
            continue
        }
        var e = q.substring(0, n).toLowerCase();
        if (!(e in k) && b[e]) {
            k[e] = 1;
            h++
        }
    }
    if (b.length > 0 && b.length <= 2 && h == b.length) {
        return true
    } else {
        if (b.length > 2 && h >= b.length - 1) {
            return true
        }
    }
    return false
};
DDG.caineStrip = function (b) {
    var a = document.createElement("DIV");
    a.innerHTML = b;
    return a.textContent || a.innerText
};
DDG.getOrdinal = function (c) {
    var b = ["th", "st", "nd", "rd"],
        a = c % 100;
    return c + (b[(a - 20) % 10] || b[a] || b[0])
};
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "")
};

function prettybang(r) {
    if (!document.getElementById && !document.createTextNode) {
        return
    }
    var v = "bang_wrap";
    var t = "newbang";
    var h = "bangwrap";
    var o = "hide";
    var f = "show";
    var c = document.getElementById("bang");
    if (r == "on") {
        if (document.getElementById("search_form_input_homepage")) {
            var e = document.getElementById("search_form_input_homepage")
        } else {
            var e = document.getElementById("search_form_input")
        } if (document.getElementById("search_dropdown_homepage")) {
            var n = document.getElementById("search_dropdown_homepage")
        } else {
            var n = document.getElementById("search_dropdown")
        }
        n.onclick = function () {
            DDG.toggle(t);
            return false
        };
        var m = document.createElement("ul");
        for (var s = 0; s < c.getElementsByTagName("option").length; s++) {
            var b = document.createElement("li");
            b.v = c.getElementsByTagName("option")[s].value;
            b.elm = e;
            b.istrigger = n;
            if ( !! b.v) {
                var q = document.createElement("a");
                q.href = "#";
                q.appendChild(document.createTextNode(c.getElementsByTagName("option")[s].text));
                b.appendChild(q)
            } else {
                b.appendChild(document.createTextNode(c.getElementsByTagName("option")[s].text));
                p(b, "header")
            }
            b.onclick = function () {
                if (this.v == "more") {
                    nrj("bang.v117.js");
                    prettybang("off");
                    setTimeout("prettybang('on')", 150);
                    setTimeout("DDG.toggle('newbang', 1)", 200)
                } else {
                    if (this.v == "!bang") {
                        nbb(null, this.v);
                        setTimeout("DDG.toggle('newbang', -1)", 200)
                    } else {
                        nbb(null, this.v);
                        DDG.toggle(t);
                        return false
                    }
                }
            };
            m.appendChild(b)
        }
        m.setAttribute("id", t);
        p(m, o);
        p(m, "grp_modal");
        var k = document.createElement("div");
        k.appendChild(m);
        k.setAttribute("id", v);
        p(k, h);
        c.parentNode.insertBefore(k, c)
    }
    if (r == "off") {
        if (document.getElementById("search_form_homepage")) {
            var u = document.getElementById("search_form_homepage")
        } else {
            var u = document.getElementById("search_form")
        }
        var a = document.getElementById(v);
        u.removeChild(a)
    }

    function g(j, x) {
        return new RegExp("\\b" + x + "\\b").test(j.className)
    }

    function p(j, x) {
        if (!g(j, x)) {
            j.className += j.className == "" ? x : " " + x
        }
    }
};