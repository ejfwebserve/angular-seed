//Array.prototype.removeDuplicates = function () {
//    for (var a = 1; a < this.length; a++) this[a][0] == this[a - 1][0] && this.splice(a, 1)
//};
Array.prototype.empty = function () {
    for (var a = 0; a <= this.length; a++) this.shift()
};
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "")
};

function LyteBox() {
    this.theme = "grey";
    this.hideApplet = this.hideFlash = !0;
    this.outerBorder = !1;
    this.resizeSpeed = 10;
    this.maxOpacity = 90;
    this.navType = 2;
    this.doAnimations = this.autoResize = !0;
    this.borderSize = 0;
    this.slideInterval = 5E3;
    this.showDetails = this.showClose = this.showNavigation = !0;
    this.autoEnd = this.showPlayPause = !1;
    this.pauseOnPrevClick = this.pauseOnNextClick = !0;
    10 < this.resizeSpeed && (this.resizeSpeed = 10);
    1 > this.resizeSpeed && (resizeSpeed = 1);
    this.resizeDuration = 0.15 * (11 - this.resizeSpeed);
    this.resizeWTimerArray = [];
    this.resizeWTimerCount = 0;
    this.resizeHTimerArray = [];
    this.resizeHTimerCount = 0;
    this.showContentTimerArray = [];
    this.showContentTimerCount = 0;
    this.overlayTimerArray = [];
    this.overlayTimerCount = 0;
    this.imageTimerArray = [];
    this.imageTimerCount = 0;
    this.timerIDArray = [];
    this.timerIDCount = 0;
    this.slideshowIDArray = [];
    this.slideshowIDCount = 0;
    this.imageArray = [];
    this.activeImage = null;
    this.slideArray = [];
    this.activeSlide = null;
    this.frameArray = [];
    this.activeFrame = null;
    this.checkFrame();
    this.ie7 = this.ie = this.isLyteframe = this.isSlideshow = !1;
    this.initialize()
}
LyteBox.prototype.initialize = function () {
    this.updateLyteboxItems();
    var a = this.doc.getElementsByTagName("body").item(0);
    this.doc.getElementById("lbOverlay") && (a.removeChild(this.doc.getElementById("lbOverlay")), a.removeChild(this.doc.getElementById("lbMain")));
    var b = this.doc.createElement("div");
    b.setAttribute("id", "lbOverlay");
    b.setAttribute(this.ie ? "className" : "class", this.theme);
    if (this.ie && !this.ie7 || this.ie7 && "BackCompat" == this.doc.compatMode) b.style.position = "absolute";
    b.style.display = "none";
    a.appendChild(b);
    b = this.doc.createElement("div");
    b.setAttribute("id", "lbMain");
    b.style.display = "none";
    a.appendChild(b);
    var c = this.doc.createElement("span");
    c.setAttribute("id", "lbNote");
    c.style.display = "none";
    a.appendChild(c);
    c = this.doc.createElement("div");
    c.setAttribute("id", "lbOuterContainer");
    c.setAttribute(this.ie ? "className" : "class", this.theme);
    b.appendChild(c);
    a = this.doc.createElement("div");
    a.setAttribute("id", "lbIframeContainer");
    a.style.display = "none";
    c.appendChild(a);
    var d = this.doc.createElement("iframe");
    d.setAttribute("id", "lbIframe");
    d.setAttribute("name", "lbIframe");
    d.setAttribute("frameBorder", "0");
    d.style.display = "none";
    a.appendChild(d);
    a = this.doc.createElement("div");
    a.setAttribute("id", "lbImageContainer");
    c.appendChild(a);
    d = this.doc.createElement("img");
    d.setAttribute("id", "lbImage");
    a.appendChild(d);
    d = this.doc.createElement("div");
    d.setAttribute("id", "lbLoading");
    c.appendChild(d);
    c = this.doc.createElement("div");
    c.setAttribute("id", "lbDetailsContainer");
    c.setAttribute(this.ie ? "className" : "class",
    this.theme);
    b.appendChild(c);
    d = this.doc.createElement("div");
    d.setAttribute("id", "lbDetailsData");
    d.setAttribute(this.ie ? "className" : "class", this.theme);
    c.appendChild(d);
    c = this.doc.createElement("div");
    c.setAttribute("id", "lbDetails");
    d.appendChild(c);
    b = this.doc.createElement("span");
    b.setAttribute("id", "lbCaption");
    c.appendChild(b);
    var e = this.doc.createElement("div");
    e.setAttribute("id", "lbHoverNav");
    a.appendChild(e);
    b = this.doc.createElement("div");
    b.setAttribute("id", "lbBottomNav");
    d.appendChild(b);
    a = this.doc.createElement("a");
    a.setAttribute("id", "lbPrev");
    a.setAttribute(this.ie ? "className" : "class", this.theme);
    a.setAttribute("href", "#");
    e.appendChild(a);
    a = this.doc.createElement("a");
    a.setAttribute("id", "lbNext");
    a.setAttribute(this.ie ? "className" : "class", this.theme);
    a.setAttribute("href", "#");
    e.appendChild(a);
    a = this.doc.createElement("span");
    a.setAttribute("id", "lbNumberDisplay");
    c.appendChild(a);
    a = this.doc.createElement("span");
    a.setAttribute("id", "lbNavDisplay");
    a.style.display = "none";
    c.appendChild(a);
    a = this.doc.createElement("a");
    a.setAttribute("id", "lbClose");
    a.setAttribute(this.ie ? "className" : "class", this.theme);
    a.setAttribute("href", "#");
    b.appendChild(a);
    a = this.doc.createElement("a");
    a.setAttribute("id", "lbPause");
    a.setAttribute(this.ie ? "className" : "class", this.theme);
    a.setAttribute("href", "#");
    a.style.display = "none";
    b.appendChild(a);
    a = this.doc.createElement("a");
    a.setAttribute("id", "lbPlay");
    a.setAttribute(this.ie ? "className" : "class", this.theme);
    a.setAttribute("href", "#");
    a.style.display =
        "none";
    b.appendChild(a)
};
LyteBox.prototype.updateLyteboxItems = function () {
    for (var a = this.isFrame ? window.parent.frames[window.name].document.getElementsByTagName("a") : document.getElementsByTagName("a"), b = 0; b < a.length; b++) {
        var c = a[b],
            d = "" + c.getAttribute("rel");
        c.getAttribute("href") && (d.toLowerCase().match("lytebox") ? c.onclick = function () {
            myLytebox.start(this, !1, !1);
            return !1
        } : d.toLowerCase().match("lyteshow") ? c.onclick = function () {
            myLytebox.start(this, !0, !1);
            return !1
        } : d.toLowerCase().match("lyteframe") && (c.onclick = function () {
            myLytebox.start(this, !1, !0);
            return !1
        }))
    }
};
LyteBox.prototype.start = function (a, b, c) {
    this.ie && !this.ie7 && this.toggleSelects("hide");
    this.hideFlash && this.toggleFlash("hide");
    if (this.hideApplet) for (var d = this.doc.getElementsByTagName("applet"), e = 0; e < d.length; e++) d[e].style.visibility = "hidden";
    this.isLyteframe = c ? !0 : !1;
    c = this.getPageSize();
    e = this.doc.getElementById("lbOverlay");
    this.doc.getElementsByTagName("body").item(0);
    if ("number" == typeof window.innerWidth) myWidth = window.innerWidth, myHeight = window.innerHeight;
    else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) myWidth = document.documentElement.clientWidth, myHeight = document.documentElement.clientHeight;
    e.style.height = myHeight + "px";
    e.style.display = "block";
    this.appear("lbOverlay", this.doAnimations ? 0 : this.maxOpacity);
    d = this.isFrame ? window.parent.frames[window.name].document.getElementsByTagName("a") : document.getElementsByTagName("a");
    if (this.isLyteframe) if (this.frameArray = [], this.frameNum = 0, "lyteframe" == a.getAttribute("rel")) {
        var g = a.getAttribute("rev");
        this.frameArray.push([a.getAttribute("href"),
        a.getAttribute("title"), null == g || "" == g ? "width: 400px; height: 400px; scrolling: auto;" : g])
    } else {
        if (-1 != a.getAttribute("rel").indexOf("lyteframe")) {
            for (e = 0; e < d.length; e++) {
                var f = d[e];
                f.getAttribute("href") && f.getAttribute("rel") == a.getAttribute("rel") && (g = f.getAttribute("rev"), this.frameArray.push([f.getAttribute("href"), f.getAttribute("title"), null == g || "" == g ? "width: 400px; height: 400px; scrolling: auto;" : g]))
            }
            for (this.frameArray.removeDuplicates = function () {
    for (var a = 1; a < this.length; a++) this[a][0] == this[a - 1][0] && this.splice(a, 1)
}; this.frameArray[this.frameNum][0] != a.getAttribute("href");) this.frameNum++
        }
    } else if (this.imageArray = [], this.imageNum = 0, this.slideArray = [], this.slideNum = 0, "lytebox" == a.getAttribute("rel")) this.imageArray.push([a.getAttribute("href"), a.getAttribute("title")]);
    else {
        if (-1 != a.getAttribute("rel").indexOf("lytebox")) {
            for (e = 0; e < d.length; e++) f = d[e], f.getAttribute("href") && f.getAttribute("rel") == a.getAttribute("rel") && this.imageArray.push([f.getAttribute("href"), f.getAttribute("title")]);
            for (this.imageArray.removeDuplicates = function () {
    for (var a = 1; a < this.length; a++) this[a][0] == this[a - 1][0] && this.splice(a, 1)
}; this.imageArray[this.imageNum][0] != a.getAttribute("href");) this.imageNum++
        }
        if (-1 != a.getAttribute("rel").indexOf("lyteshow")) {
            for (e = 0; e < d.length; e++) f = d[e], f.getAttribute("href") && f.getAttribute("rel") == a.getAttribute("rel") && this.slideArray.push([f.getAttribute("href"), f.getAttribute("title")]);
            for (this.slideArray.removeDuplicates = function () {
    for (var a = 1; a < this.length; a++) this[a][0] == this[a - 1][0] && this.splice(a, 1)
}; this.slideArray[this.slideNum][0] != a.getAttribute("href");) this.slideNum++
        }
    }
    a = this.doc.getElementById("lbMain");
    a.style.top = c[3] / 15 + "px";
    a.style.display = "";
    this.outerBorder ? (this.doc.getElementById("lbOuterContainer").style.borderBottom = "", this.doc.getElementById("lbOuterContainer").setAttribute(this.ie ?
        "className" : "class", this.theme)) : (this.doc.getElementById("lbOuterContainer").style.border = "none", this.doc.getElementById("lbDetailsContainer").style.border = "none");
    this.doc.getElementById("lbOverlay").onclick = function () {
        myLytebox.end();
        return false
    };
    this.doc.getElementById("lbMain").onclick = function (a) {
        a || (a = window.parent.frames[window.name] && parent.document.getElementsByTagName("frameset").length <= 0 ? window.parent.window.event : window.event);
        if ((a.target ? a.target.id : a.srcElement.id) == "lbMain") {
            myLytebox.end();
            return false
        }
    };
    this.doc.getElementById("lbClose").onclick = function () {
        myLytebox.end();
        return false
    };
    this.doc.getElementById("lbPause").onclick = function () {
        myLytebox.togglePlayPause("lbPause", "lbPlay");
        return false
    };
    this.doc.getElementById("lbPlay").onclick = function () {
        myLytebox.togglePlayPause("lbPlay", "lbPause");
        return false
    };
    this.isSlideshow = b;
    this.isPaused = 0 != this.slideNum ? !0 : !1;
    this.isSlideshow && (this.showPlayPause && this.isPaused) && (this.doc.getElementById("lbPlay").style.display = "", this.doc.getElementById("lbPause").style.display =
        "none");
    this.isLyteframe ? this.changeContent(this.frameNum) : this.isSlideshow ? this.changeContent(this.slideNum) : this.changeContent(this.imageNum)
};
LyteBox.prototype.changeContent = function (a) {
    if (this.isSlideshow) for (var b = 0; b < this.slideshowIDCount; b++) window.clearTimeout(this.slideshowIDArray[b]);
    this.activeImage = this.activeSlide = this.activeFrame = a;
    this.outerBorder ? (this.doc.getElementById("lbOuterContainer").style.borderBottom = "", this.doc.getElementById("lbOuterContainer").setAttribute(this.ie ? "className" : "class", this.theme)) : (this.doc.getElementById("lbOuterContainer").style.border = "none", this.doc.getElementById("lbDetailsContainer").style.border =
        "none");
    this.doc.getElementById("lbLoading").style.display = "";
    this.doc.getElementById("lbImage").style.display = "none";
    this.doc.getElementById("lbIframe").style.display = "none";
    this.doc.getElementById("lbPrev").style.display = "none";
    this.doc.getElementById("lbNext").style.display = "none";
    this.doc.getElementById("lbIframeContainer").style.display = "none";
    this.doc.getElementById("lbDetailsContainer").style.display = "none";
    this.doc.getElementById("lbNumberDisplay").style.display = "none";
    if (2 == this.navType || this.isLyteframe) object = this.doc.getElementById("lbNavDisplay"), object.innerHTML = '&nbsp;&nbsp;&nbsp;<span id="lbPrev2_Off" style="display: none;" class="' + this.theme + '"></span><a href="#" id="lbPrev2" class="' + this.theme + '" style="display: none;"></a><span id="lbNext2_Off" style="display: none;" class="' + this.theme + '"></span><a href="#" id="lbNext2" class="' + this.theme + '" style="display: none;"></a>', object.style.display = "none";
    if (this.isLyteframe) {
        for (var a = myLytebox.doc.getElementById("lbIframe"), c = this.frameArray[this.activeFrame][2].split(";"), b = 0; b < c.length; b++) if (0 <= c[b].indexOf("width:")) {
            var d = c[b].replace("width:", "");
            a.width = d.trim()
        } else 0 <= c[b].indexOf("height:") ? (d = c[b].replace("height:", ""), a.height = d.trim()) : 0 <= c[b].indexOf("scrolling:") ? (d = c[b].replace("scrolling:", ""), a.scrolling = d.trim()) : c[b].indexOf("border:");
        this.resizeContainer(parseInt(a.width), parseInt(a.height))
    } else imgPreloader = new Image, imgPreloader.onload = function () {
        var a = imgPreloader.width,
            b = imgPreloader.height;
        if (myLytebox.autoResize) {
            var c = myLytebox.getPageSize(),
//               d = c[2] - 175,
//               c = c[3] - 175;
                d = c[2] - 20,
                c = c[3] - 20;
            if (a > d) {
                b = Math.round(b * (d / a));
                a = d;
                if (b > c) {
                    a = Math.round(a * (c / b));
                    b = c
                }
            } else if (b > c) {
                a = Math.round(a * (c / b));
                b = c;
                if (a > d) {
                    b = Math.round(b * (d / a));
                    a = d
                }
            }
        }
        d = myLytebox.doc.getElementById("lbImage");
        d.src = myLytebox.isSlideshow ? myLytebox.slideArray[myLytebox.activeSlide][0] : myLytebox.imageArray[myLytebox.activeImage][0];
        d.width = a;
        d.height = b;
        myLytebox.resizeContainer(a, b);
        imgPreloader.onload = function () {}
    },
    imgPreloader.src = this.isSlideshow ? this.slideArray[this.activeSlide][0] : this.imageArray[this.activeImage][0]
};
LyteBox.prototype.resizeContainer = function (a, b) {
    this.wCur = this.doc.getElementById("lbOuterContainer").offsetWidth;
    this.hCur = this.doc.getElementById("lbOuterContainer").offsetHeight;
    this.xScale = 100 * ((a + 2 * this.borderSize) / this.wCur);
    this.yScale = 100 * ((b + 2 * this.borderSize) / this.hCur);
    var c = this.wCur - 2 * this.borderSize - a,
        d = this.hCur - 2 * this.borderSize - b;
    this.hDone = !1;
    this.resizeH("lbOuterContainer", this.hCur, b + 2 * this.borderSize, this.getPixelRate(this.hCur, b));
    0 != c ? (this.wDone = !1, this.resizeW("lbOuterContainer",
    this.wCur, a + 2 * this.borderSize, this.getPixelRate(this.wCur, a))) : this.wDone = !0;
    0 == d && 0 == c && (this.ie ? this.pause(250) : this.pause(100));
    this.doc.getElementById("lbPrev").style.height = b + "px";
    this.doc.getElementById("lbNext").style.height = b + "px";
    this.doc.getElementById("lbDetailsContainer").style.width = a + 2 * this.borderSize + (this.ie && "BackCompat" == this.doc.compatMode && this.outerBorder ? 2 : 0) + "px";
    this.showContent()
};
LyteBox.prototype.showContent = function () {
    if (this.wDone && this.hDone) {
        for (var a = 0; a < this.showContentTimerCount; a++) window.clearTimeout(this.showContentTimerArray[a]);
        this.outerBorder && (this.doc.getElementById("lbOuterContainer").style.borderBottom = "none");
        this.doc.getElementById("lbLoading").style.display = "none";
        this.isLyteframe ? (this.doc.getElementById("lbIframe").style.display = "", this.appear("lbIframe", this.doAnimations ? 0 : 100)) : (this.doc.getElementById("lbImage").style.display = "", this.appear("lbImage",
        this.doAnimations ? 0 : 100), this.preloadNeighborImages());
        this.isSlideshow ? (this.activeSlide == this.slideArray.length - 1 ? this.autoEnd && (this.slideshowIDArray[this.slideshowIDCount++] = setTimeout("myLytebox.end('slideshow')", this.slideInterval)) : this.isPaused || (this.slideshowIDArray[this.slideshowIDCount++] = setTimeout("myLytebox.changeContent(" + (this.activeSlide + 1) + ")", this.slideInterval)), this.doc.getElementById("lbHoverNav").style.display = this.showNavigation && 1 == this.navType ? "" : "none", this.doc.getElementById("lbClose").style.display = this.showClose ? "" : "none", this.doc.getElementById("lbDetails").style.display = this.showDetails ? "" : "none", this.doc.getElementById("lbPause").style.display = this.showPlayPause && !this.isPaused ? "" : "none", this.doc.getElementById("lbPlay").style.display = this.showPlayPause && !this.isPaused ? "none" : "", this.doc.getElementById("lbNavDisplay").style.display = this.showNavigation && 2 == this.navType ? "" : "none") : (this.doc.getElementById("lbHoverNav").style.display = 1 == this.navType && !this.isLyteframe ? "" : "none", 2 == this.navType && !this.isLyteframe && 1 < this.imageArray.length || 1 < this.frameArray.length && this.isLyteframe ? this.doc.getElementById("lbNavDisplay").style.display = "" : this.doc.getElementById("lbNavDisplay").style.display = "none", this.doc.getElementById("lbClose").style.display = "", this.doc.getElementById("lbDetails").style.display = "", this.doc.getElementById("lbPause").style.display = "none", this.doc.getElementById("lbPlay").style.display = "none");
        this.doc.getElementById("lbImageContainer").style.display = this.isLyteframe ? "none" :
            "";
        this.doc.getElementById("lbIframeContainer").style.display = this.isLyteframe ? "" : "none";
        try {
            this.doc.getElementById("lbIframe").src = this.frameArray[this.activeFrame][0]
        } catch (b) {}
    } else this.showContentTimerArray[this.showContentTimerCount++] = setTimeout("myLytebox.showContent()", 200)
};
LyteBox.prototype.updateDetails = function () {
    var a = this.doc.getElementById("lbCaption"),
        b = this.isSlideshow ? this.slideArray[this.activeSlide][1] : this.isLyteframe ? this.frameArray[this.activeFrame][1] : this.imageArray[this.activeImage][1];
    a.style.display = "";
    a.innerHTML = null == b ? "" : b;
    this.updateNav();
    this.doc.getElementById("lbDetailsContainer").style.display = "";
    a = this.doc.getElementById("lbNumberDisplay");
    this.isSlideshow && 1 < this.slideArray.length ? (a.style.display = "", this.doc.getElementById("lbNavDisplay").style.display = 2 == this.navType && this.showNavigation ? "" : "none") : 1 < this.imageArray.length && !this.isLyteframe ? (a.style.display = "", a.innerHTML = "Image " + eval(this.activeImage + 1) + " of " + this.imageArray.length, this.doc.getElementById("lbNavDisplay").style.display = 2 == this.navType ? "" : "none") : 1 < this.frameArray.length && this.isLyteframe ? (a.style.display = "", a.innerHTML = "Page " + eval(this.activeFrame + 1) + " of " + this.frameArray.length, this.doc.getElementById("lbNavDisplay").style.display = "") : this.doc.getElementById("lbNavDisplay").style.display =
        "none";
    this.appear("lbDetailsContainer", this.doAnimations ? 0 : 100)
};
LyteBox.prototype.updateNav = function () {
    if (this.isSlideshow) {
        if (0 != this.activeSlide) {
            var a = 2 == this.navType ? this.doc.getElementById("lbPrev2") : this.doc.getElementById("lbPrev");
            a.style.display = "";
            a.onclick = function () {
                myLytebox.pauseOnPrevClick && myLytebox.togglePlayPause("lbPause", "lbPlay");
                myLytebox.changeContent(myLytebox.activeSlide - 1);
                return !1
            }
        } else 2 == this.navType && (this.doc.getElementById("lbPrev2_Off").style.display = "");
        this.activeSlide != this.slideArray.length - 1 ? (a = 2 == this.navType ? this.doc.getElementById("lbNext2") : this.doc.getElementById("lbNext"), a.style.display = "", a.onclick = function () {
            myLytebox.pauseOnNextClick && myLytebox.togglePlayPause("lbPause", "lbPlay");
            myLytebox.changeContent(myLytebox.activeSlide + 1);
            return !1
        }) : 2 == this.navType && (this.doc.getElementById("lbNext2_Off").style.display = "")
    } else this.isLyteframe ? (0 != this.activeFrame ? (a = this.doc.getElementById("lbPrev2"), a.style.display = "", a.onclick = function () {
        myLytebox.changeContent(myLytebox.activeFrame - 1);
        return !1
    }) : this.doc.getElementById("lbPrev2_Off").style.display =
        "", this.activeFrame != this.frameArray.length - 1) ? (a = this.doc.getElementById("lbNext2"), a.style.display = "", a.onclick = function () {
        myLytebox.changeContent(myLytebox.activeFrame + 1);
        return false
    }) : this.doc.getElementById("lbNext2_Off").style.display = "" : (0 != this.activeImage ? (a = 2 == this.navType ? this.doc.getElementById("lbPrev2") : this.doc.getElementById("lbPrev"), a.style.display = "", a.onclick = function () {
        myLytebox.changeContent(myLytebox.activeImage - 1);
        return !1
    }) : 2 == this.navType && (this.doc.getElementById("lbPrev2_Off").style.display =
        ""), this.activeImage != this.imageArray.length - 1) ? (a = 2 == this.navType ? this.doc.getElementById("lbNext2") : this.doc.getElementById("lbNext"), a.style.display = "", a.onclick = function () {
        myLytebox.changeContent(myLytebox.activeImage + 1);
        return false
    }) : 2 == this.navType && (this.doc.getElementById("lbNext2_Off").style.display = "");
    this.enableKeyboardNav()
};
LyteBox.prototype.enableKeyboardNav = function () {
    document.onkeydown = this.keyboardAction
};
LyteBox.prototype.disableKeyboardNav = function () {
    document.onkeydown = ""
};
LyteBox.prototype.keyboardAction = function (a) {
    var b = key = escape = null,
        b = null == a ? event.keyCode : a.which;
    key = String.fromCharCode(b).toLowerCase();
    escape = null == a ? 27 : a.DOM_VK_ESCAPE;
    if ("x" == key || "c" == key || 27 == b) myLytebox.end();
    else if ("p" == key || 37 == b) myLytebox.isSlideshow ? 0 != myLytebox.activeSlide && (myLytebox.disableKeyboardNav(), myLytebox.changeContent(myLytebox.activeSlide - 1)) : myLytebox.isLyteframe ? 0 != myLytebox.activeFrame && (myLytebox.disableKeyboardNav(), myLytebox.changeContent(myLytebox.activeFrame - 1)) : 0 != myLytebox.activeImage && (myLytebox.disableKeyboardNav(), myLytebox.changeContent(myLytebox.activeImage - 1));
    else if ("n" == key || 39 == b) myLytebox.isSlideshow ? myLytebox.activeSlide != myLytebox.slideArray.length - 1 && (myLytebox.disableKeyboardNav(), myLytebox.changeContent(myLytebox.activeSlide + 1)) : myLytebox.isLyteframe ? myLytebox.activeFrame != myLytebox.frameArray.length - 1 && (myLytebox.disableKeyboardNav(), myLytebox.changeContent(myLytebox.activeFrame + 1)) : myLytebox.activeImage != myLytebox.imageArray.length - 1 && (myLytebox.disableKeyboardNav(), myLytebox.changeContent(myLytebox.activeImage + 1))
};
LyteBox.prototype.preloadNeighborImages = function () {
    if (this.isSlideshow) {
        if (this.slideArray.length - 1 > this.activeSlide && (preloadNextImage = new Image, preloadNextImage.src = this.slideArray[this.activeSlide + 1][0]), 0 < this.activeSlide) preloadPrevImage = new Image, preloadPrevImage.src = this.slideArray[this.activeSlide - 1][0]
    } else if (this.imageArray.length - 1 > this.activeImage && (preloadNextImage = new Image, preloadNextImage.src = this.imageArray[this.activeImage + 1][0]), 0 < this.activeImage) preloadPrevImage = new Image, preloadPrevImage.src = this.imageArray[this.activeImage - 1][0]
};
LyteBox.prototype.togglePlayPause = function (a, b) {
    if (this.isSlideshow && "lbPause" == a) for (var c = 0; c < this.slideshowIDCount; c++) window.clearTimeout(this.slideshowIDArray[c]);
    this.doc.getElementById(a).style.display = "none";
    this.doc.getElementById(b).style.display = "";
    "lbPlay" == a ? (this.isPaused = !1, this.activeSlide == this.slideArray.length - 1 ? this.end() : this.changeContent(this.activeSlide + 1)) : this.isPaused = !0
};
LyteBox.prototype.end = function (a) {
    if (!this.isSlideshow || !this.isPaused || "slideshow" != a) {
        this.disableKeyboardNav();
        this.doc.getElementById("lbMain").style.display = "none";
        this.doc.getElementById("lbNote").style.display = "none";
        this.fade("lbOverlay", this.doAnimations ? this.maxOpacity : 0);
        this.toggleSelects("visible");
        this.hideFlash && this.toggleFlash("visible");
        if (this.hideApplet) for (var a = this.doc.getElementsByTagName("applet"), b = 0; b < a.length; b++) a[b].style.visibility = "visible";
        if (this.isSlideshow) for (b = 0; b < this.slideshowIDCount; b++) window.clearTimeout(this.slideshowIDArray[b]);
        this.isLyteframe && this.initialize()
    }
};
LyteBox.prototype.checkFrame = function () {
    window.parent.frames[window.name] && 0 >= parent.document.getElementsByTagName("frameset").length ? (this.isFrame = !0, this.lytebox = "window.parent." + window.name + ".myLytebox", this.doc = parent.document) : (this.isFrame = !1, this.lytebox = "myLytebox", this.doc = document)
};
LyteBox.prototype.getPixelRate = function (a, b) {
    var c = b > a ? b - a : a - b;
    if (0 <= c && 100 >= c) return 10;
    if (100 < c && 200 >= c) return 15;
    if (200 < c && 300 >= c) return 20;
    if (300 < c && 400 >= c) return 25;
    if (400 < c && 500 >= c) return 30;
    if (500 < c && 600 >= c) return 35;
    if (600 < c && 700 >= c) return 40;
    if (700 < c) return 45
};
LyteBox.prototype.appear = function (a, b) {
    var c = this.doc.getElementById(a).style;
    c.opacity = b / 100;
    c.MozOpacity = b / 100;
    c.KhtmlOpacity = b / 100;
    c.filter = "alpha(opacity=" + b + ")";
    if (100 == b && ("lbImage" == a || "lbIframe" == a)) {
        try {
            c.removeAttribute("filter")
        } catch (d) {}
        this.updateDetails()
    } else if (b >= this.maxOpacity && "lbOverlay" == a) for (c = 0; c < this.overlayTimerCount; c++) window.clearTimeout(this.overlayTimerArray[c]);
    else if (100 <= b && "lbDetailsContainer" == a) {
        try {
            c.removeAttribute("filter")
        } catch (e) {}
        for (c = 0; c < this.imageTimerCount; c++) window.clearTimeout(this.imageTimerArray[c]);
        this.doc.getElementById("lbOverlay").style.height = this.getPageSize()[1] + "px"
    } else "lbOverlay" == a ? this.overlayTimerArray[this.overlayTimerCount++] = setTimeout("myLytebox.appear('" + a + "', " + (b + 10) + ")", 1) : this.imageTimerArray[this.imageTimerCount++] = setTimeout("myLytebox.appear('" + a + "', " + (b + 10) + ")", 1)
};
LyteBox.prototype.fade = function (a, b) {
    var c = this.doc.getElementById(a).style;
    c.opacity = b / 100;
    c.MozOpacity = b / 100;
    c.KhtmlOpacity = b / 100;
    c.filter = "alpha(opacity=" + b + ")";
    if (0 >= b) try {
        c.display = "none"
    } catch (d) {} else "lbOverlay" == a ? this.overlayTimerArray[this.overlayTimerCount++] = setTimeout("myLytebox.fade('" + a + "', " + (b - 10) + ")", 1) : this.timerIDArray[this.timerIDCount++] = setTimeout("myLytebox.fade('" + a + "', " + (b - 10) + ")", 1)
};
LyteBox.prototype.resizeW = function (a, b, c, d, e) {
    if (this.hDone) {
        var g = this.doc.getElementById(a),
            e = e ? e : this.resizeDuration / 2,
            b = this.doAnimations ? b : c;
        g.style.width = b + "px";
        b < c ? b += b + d >= c ? c - b : d : b > c && (b -= b - d <= c ? b - c : d);
        this.resizeWTimerArray[this.resizeWTimerCount++] = setTimeout("myLytebox.resizeW('" + a + "', " + b + ", " + c + ", " + d + ", " + (e + 0.02) + ")", e + 0.02);
        if (parseInt(g.style.width) == c) {
            this.wDone = !0;
            for (a = 0; a < this.resizeWTimerCount; a++) window.clearTimeout(this.resizeWTimerArray[a])
        }
    } else this.resizeWTimerArray[this.resizeWTimerCount++] = setTimeout("myLytebox.resizeW('" + a + "', " + b + ", " + c + ", " + d + ")", 100)
};
LyteBox.prototype.resizeH = function (a, b, c, d, e) {
    var e = e ? e : this.resizeDuration / 2,
        g = this.doc.getElementById(a),
        b = this.doAnimations ? b : c;
    g.style.height = b + "px";
    if ("number" == typeof window.innerWidth) myWidth = window.innerWidth, myHeight = window.innerHeight;
    else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) myWidth = document.documentElement.clientWidth, myHeight = document.documentElement.clientHeight;
    this.doc.getElementById("lbMain").style.top = (myHeight - this.doc.getElementById("lbMain").offsetHeight - 40) / 2 + "px";
    b < c ? b += b + d >= c ? c - b : d : b > c && (b -= b - d <= c ? b - c : d);
    this.resizeHTimerArray[this.resizeHTimerCount++] = setTimeout("myLytebox.resizeH('" + a + "', " + b + ", " + c + ", " + d + ", " + (e + 0.02) + ")", e + 0.02);
    if (parseInt(g.style.height) == c) {
        this.hDone = !0;
        for (a = 0; a < this.resizeHTimerCount; a++) window.clearTimeout(this.resizeHTimerArray[a])
    }
};
LyteBox.prototype.getPageScroll = function () {
    if (self.pageYOffset) return this.isFrame ? parent.pageYOffset : self.pageYOffset;
    if (this.doc.documentElement && this.doc.documentElement.scrollTop) return this.doc.documentElement.scrollTop;
    if (document.body) return this.doc.body.scrollTop
};
LyteBox.prototype.getPageSize = function () {
    var a, b, c, d;
    window.innerHeight && window.scrollMaxY ? (a = this.doc.scrollWidth, b = (this.isFrame ? parent.innerHeight : self.innerHeight) + (this.isFrame ? parent.scrollMaxY : self.scrollMaxY)) : this.doc.body.scrollHeight > this.doc.body.offsetHeight ? (a = this.doc.body.scrollWidth, b = this.doc.body.scrollHeight) : (a = this.doc.getElementsByTagName("html").item(0).offsetWidth, b = this.doc.getElementsByTagName("html").item(0).offsetHeight, a = a < this.doc.body.offsetWidth ? this.doc.body.offsetWidth : a, b = b < this.doc.body.offsetHeight ? this.doc.body.offsetHeight : b);
    self.innerHeight ? (c = this.isFrame ? parent.innerWidth : self.innerWidth, d = this.isFrame ? parent.innerHeight : self.innerHeight) : document.documentElement && document.documentElement.clientHeight ? (c = this.doc.documentElement.clientWidth, d = this.doc.documentElement.clientHeight) : document.body && (c = this.doc.getElementsByTagName("html").item(0).clientWidth, d = this.doc.getElementsByTagName("html").item(0).clientHeight, c = 0 == c ? this.doc.body.clientWidth : c, d = 0 == d ? this.doc.body.clientHeight : d);
    return [a < c ? c : a, b < d ? d : b, c, d]
};
LyteBox.prototype.toggleFlash = function (a) {
    for (var b = this.doc.getElementsByTagName("object"), c = 0; c < b.length; c++) b[c].style.visibility = "hide" == a ? "hidden" : "visible";
    for (var d = this.doc.getElementsByTagName("embed"), c = 0; c < d.length; c++) d[c].style.visibility = "hide" == a ? "hidden" : "visible";
    if (this.isFrame) for (c = 0; c < parent.frames.length; c++) {
        try {
            for (var b = parent.frames[c].window.document.getElementsByTagName("object"), e = 0; e < b.length; e++) b[e].style.visibility = "hide" == a ? "hidden" : "visible"
        } catch (g) {}
        try {
            d = parent.frames[c].window.document.getElementsByTagName("embed");
            for (e = 0; e < d.length; e++) d[e].style.visibility = "hide" == a ? "hidden" : "visible"
        } catch (f) {}
    }
};
LyteBox.prototype.toggleSelects = function (a) {
    for (var b = this.doc.getElementsByTagName("select"), c = 0; c < b.length; c++) b[c].style.visibility = "hide" == a ? "hidden" : "visible";
    if (this.isFrame) for (c = 0; c < parent.frames.length; c++) try {
        for (var b = parent.frames[c].window.document.getElementsByTagName("select"), d = 0; d < b.length; d++) b[d].style.visibility = "hide" == a ? "hidden" : "visible"
    } catch (e) {}
};
LyteBox.prototype.pause = function (a) {
    for (var b = new Date, a = b.getTime() + a; !(b = new Date, b.getTime() > a););
};
window.addEventListener ? window.addEventListener("load", initLytebox, !1) : window.attachEvent ? window.attachEvent("onload", initLytebox) : window.onload = function () {
    initLytebox()
};

function initLytebox() {
    myLytebox = new LyteBox
};