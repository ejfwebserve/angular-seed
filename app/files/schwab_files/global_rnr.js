// Updated 8/13/15

var overlayBodyContUrl,
    modalJS_loaded = false,
    nonModalJS_loaded = false,
    standProxJS_loaded = false,
    overlayCSS_loaded = false;

function loadJquery() {
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", '/public/file/SIP-JQUERY');
    if (typeof script != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    var status = checkJqueryLoaded(0);
    return status;
}

function checkJqueryLoaded(time_elapsed) {
    if (typeof $ == "undefined") {
        if (time_elapsed <= 5000) {
            setTimeout("checkJqueryLoaded(" + (time_elapsed + 10) + ")", 10);
        } else {
            return false;
        }
    } else {
        return true;
    }
}

function hideIframeLoading(iframeSection) {
    document.getElementById('iframe1').style.display = "none";
    document.getElementById(iframeSection).style.display = "block";
}
var Browser = {
    Version: function() {
        var version = 9999;
        if (navigator.appVersion.indexOf("MSIE") != -1) {
            version = parseFloat(navigator.appVersion.split("MSIE")[1]);
        }
        return version;
    }
}


function loadOverlayJS(link, option, overlayContUrl, headerText, height, width, id) {
    if (!overlayCSS_loaded) {
        var style = $("<link/>");
        style.attr({
            type: 'text/css',
            rel: 'stylesheet',
            href: '/system/file?cmsid=P-PS-OVERLAY-CSS'
        });
        $("head").append(style);
        overlayCSS_loaded = true;
    }
    if (overlayContUrl.search("http") != -1) {
        overlayBodyContUrl = overlayContUrl;
    } else {
        overlayBodyContUrl = '' + overlayContUrl;
    }

    var pos = GetElePos(link);

    if (navigator.appVersion.indexOf("MSIE") != -1) {
        if (id == "thumpsUp") {
            pos.top = -50;
            pos.left = -40;
        } else if (id == "thumpsDown") {
            pos.top = -50;
            pos.left = 5;
        } else {
            pos.top = -50;
            pos.left = 10;

        }
    } else {
        if (id == "thumpsUp") {
            pos.top = -50;
            pos.left = 140;
        } else if (id == "thumpsDown") {
            pos.top = -50;
            pos.left = 190;
        } else {
            pos.top = -50;
            pos.left = 120;
        }

    }

    switch (option) {
        case "modal":
            if (modalJS_loaded) {
                show_modaloverlay(headerText, overlayBodyContUrl, height, width);
            } else {
                $.getScript('/secure/file?cmsid=P-MODALOVERLAY-JS10', function() {
                    show_modaloverlay(headerText, overlayBodyContUrl, height, width);
                    modalJS_loaded = true;
                });
            }
            break;
        case "nonmodal":
            if (nonModalJS_loaded) {
                show_nonmodaloverlay(headerText, overlayBodyContUrl, height, width);
            } else {
                $.getScript('/secure/file?cmsid=P-NONMODALOVERLAY-JS10', function() {
                    show_nonmodaloverlay(headerText, overlayBodyContUrl, height, width);
                    nonModalJS_loaded = true;
                });
            }
            break;
        case "standprox":
            if (standProxJS_loaded) {
                showStandProxOverlay(link, '', headerText, height, width, overlayBodyContUrl, 'standprox', pos.top, pos.left);
            } else {
                $.getScript('/public/file?cmsid=P-PSPROXJS10-CR&filename=prospect-proxim-overlay.js', function() {
                    showStandProxOverlay(link, '', headerText, height, width, overlayBodyContUrl, 'standprox', pos.top, pos.left);
                    standProxJS_loaded = true;
                });
            }
            break;
        case "help":
            if (standProxJS_loaded) {
                showStandProxOverlay(link, '', headerText, height, width, overlayBodyContUrl, 'helpprox');
            } else {
                $.getScript('/secure/file?cmsid=P-PSPROXJS10', function() {
                    showStandProxOverlay(link, '', headerText, height, width, overlayBodyContUrl, 'helpprox');
                    standProxJS_loaded = true;
                });
            }
            break;
    }


    function GetElePos(elm) {
        var x, y = 0;

        x = elm.offsetLeft;
        y = elm.offsetTop;
        elm = elm.offsetParent;
        while (elm != null) {
            x = parseInt(x) + parseInt(elm.offsetLeft);
            y = parseInt(y) + parseInt(elm.offsetTop);
            elm = elm.offsetParent;
        }
        return {
            top: y,
            left: x
        };

    }
};

jQuery.support.cors = true;

function ajaxDBRating(rating, pageId, ratingMode, userId, sitecode) {
    var data = {
        ContentId: pageId,
        Rating: rating,
        RatingMode: ratingMode,
        UserId: userId,
        sitecode: sitecode
    };
    data = JSON.stringify(data);
    if (sitecode == "secure/cc") {
        var aUrl = "/secure/asset?cmsid=CC-RATINGCAPTURE-JSON&contentid=" + pageId +
            "&userid=" + userId + "&rating=" + rating + "&ratingmode=" + ratingMode;
    } else {
        var aUrl = "/public/asset?cmsid=SIP-RATINGCAPTURE-JSON&contentid=" + pageId +
            "&userid=" + userId + "&rating=" + rating + "&ratingmode=" + ratingMode;
    }
    var obj = $.ajax({
        type: "GET",
        url: aUrl,
        processData: false,
        crossDomain: true,
        async: false,
        contentType: "application/xml; charset=utf-8",
        dataType: "text",
        success: function(data) {
            $('input[id=ajaxReturnType]').val("success"); //success
        },
        "error": function(xhr, status, error) {
            $('input[id=ajaxReturnType]').val("error"); //error
        }

    });

    return obj.responseText;
}

function setRating(rating, pageId, ratingMode, userId, link, option, overlayContUrl, headerText, height, width, id, sitecode, isSchwabEmployee) {
    if (isSchwabEmployee != 'true') {

        var data = ajaxDBRating(rating, pageId, ratingMode, userId, sitecode);
        var xmlDoc;
        var israted;
        if (window.ActiveXObject) {
            xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
            xmlDoc.async = 'false';
            xmlDoc.loadXML(data);
        } else {
            var parser = new DOMParser();
            xmlDoc = parser.parseFromString(data, 'text/xml');
        }
        if ($('#ajaxReturnType').val() == 'error') {

            $("[id=cs_rating-feedback-controls_id]").find("a").attr("title", "This feature is temporarily unavailable. Please try again in a few minutes.");
            $("[id=cs_rating-feedback-controls_id]").find("a").addClass("selected");
            $("[id=cs_rating-feedback-controls_id]").find("a").removeAttr("onclick");

            return;
        }
        $(xmlDoc).find('data').each(function() {
            var error = $(this).find('rfmodule').attr('error');
            if (error == 'true') {

                $("[id=cs_rating-feedback-controls_id]").find("a").attr("title", "This feature is temporarily unavailable. Please try again in a few minutes.");
                $("[id=cs_rating-feedback-controls_id]").find("a").addClass("selected");
                $("[id=cs_rating-feedback-controls_id]").find("a").removeAttr("onclick");
                return;
            }
            var postive = $(this).find('rfmodule').attr('positive');


            var negative = $(this).find('rfmodule').attr('negative');
            israted = $(this).find('rfmodule').attr('israted');

            if (israted == "true") {
                if (ratingMode == 'RF' || ratingMode == 'RO') {
                    $("[id=cs_rating-feedback-controls_id]").find("a").attr("title", "It looks like you’ve already voted on this.");
                    $("[id=cs_rating-feedback-controls_id]").find("a").addClass("selected");
                    $("[id=cs_rating-feedback-controls_id]").find("a").removeAttr("onclick");

                } else {
                    $("[id=cs_rating-feedback-controls_id]").find("a").attr("title", "It looks like you've already provided feedback.");
                    $("[id=cs_rating-feedback-controls_id]").find("a").addClass("selected");
                    $("[id=cs_rating-feedback-controls_id]").find("a").removeAttr("onclick");
                }
            } else {
                if (ratingMode == 'RF' || ratingMode == 'RO') {
                    $("[id=cs_rating-feedback-controls_id]").find("a").attr("title", "Thank you for your feedback.");
                    $("[id=cs_rating-feedback-controls_id]").find("a").addClass("selected");
                    $("[id=cs_rating-feedback-controls_id]").find("a").removeAttr("onclick");
                }
            }
            if (postive != '0') {
                $("[id=cs_rating-feedback-controls_id]").find("#feedback-number-pos").html(postive);
            }
            if (negative != '0') {
                $("[id=cs_rating-feedback-controls_id]").find("#feedback-number-neg").html(negative);
            }
        });
        if ((ratingMode == 'RF' || ratingMode == 'FO') && (israted == 'false')) {
            if (navigator.userAgent.toString().toLowerCase().indexOf("ipad") != -1) {
                height = 400;
                width = 300;
            }
            loadOverlayJS(link, option, overlayContUrl, headerText, height, width, id)
        }
    } else {
        $("[id=cs_rating-feedback-controls_id]").find("a").attr("title", "Rating function is working fine...Employee ratings are not added to database");
        $("[id=cs_rating-feedback-controls_id]").find("a").addClass("selected");
        $("[id=cs_rating-feedback-controls_id]").find("a").removeAttr("onclick");
    }
}
