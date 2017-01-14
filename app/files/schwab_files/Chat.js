// MOXIE Proactive Chat looks for this variable in global namespace
// We assign the location of the desired chat gateway to this during OnReady of MoxieChat
var talCustProp;


// Summary = Encapsulates Moxie Reactive Chat Link functionality (RCL).  This is self
//    contained and will hook up functinality to all elements matched by the
//    rclSelector parameter.  When element is hooked up a click will launch
//    the appropriate PCQ or if one is already open it will bring it into focus 
//    if possible, else do nothing.
// Param.1 = jQuery
// Param.2 = jQuery selector used to find reactive chat links to hook up
// Param.3 = Moxie chat server that the PCQ will be requested from
var MoxieChat = MoxieChat || function ($, rclSelector) {
    /*-------------
    --- PRIVATE ---
    -------------*/
    var openedWin;

    // Assemble Schwab Chat Gateway URL
    function buildChatGatewayUrl(gatewayPath) {
        var gatewayLocation = "https://" + window.location.host;
        if (typeof netHostUrl != 'undefined')
            gatewayLocation = netHostUrl; // Provides .net host for gateway, checks the sstate cookie or defaults to the related .net host if not found
        var schwabChatGateway = gatewayLocation + gatewayPath;
        return escape(schwabChatGateway);
    }

    // Assemble Moxie pre-chat-questionnaire URL
    function buildPcqUrl($rcl) {
        // defaults to prod if variable is missing
        var moxieChatHost = "chat.schwab.com";
        if (typeof reactiveChatHost != 'undefined') {
            moxieChatHost = reactiveChatHost;
        }

        var chatServer = "https://" + moxieChatHost;  // base url for chat server
        var questId = $rcl.attr("questid");  // chat questionnaire id
        var portId = $rcl.attr("portid");  // chat portal id
        var gateway = $rcl.attr("gateway");  // gateway to pass to PCQ so it knows where to post

        var queryString = "?questid=" + questId + "&portid=" + portId + "&gateway=" + buildChatGatewayUrl(gateway) + "&nareferer=" + escape(document.location);
        return chatServer + "/netagent/cimlogin.aspx" + queryString;
    }

    // Get a cookie from cookie list given its name
    function getCookie(cName) {
        var i, ckName, ckValue, arRcookies = document.cookie.split(";");
        for (i = 0; i < arRcookies.length; i++) {
            ckName = arRcookies[i].substr(0, arRcookies[i].indexOf("="));
            //Reading the value inside cookie
            ckValue = arRcookies[i].substr(arRcookies[i].indexOf("=") + 1);
            ckName = ckName.replace(/^\s+|\s+$/g, "");
            if (ckName == cName) {
                return unescape(ckValue); //return the cookie value
            }
        }
        return null;
    }

    // Launch the proper PCQ for the reactive chat link
    function handleRclClick(rclElement) {
        // Handle known open chat window
        if ((openedWin) && (!openedWin.closed)) {
            openedWin.focus(); // Bring open chat window into focus if possible
            return;
        }

        // Handle unknwown open chat window
        if (isChatOpen()) {
            trackRclLinkClickNoResponse();
            return;
        }

        trackRclLinkClick();
        openPcqWindow(rclElement);
    }

    // Check if a chat window is open
    function isChatOpen() {
        var cookie = getCookie("ChatOpen");
        return (cookie != null && cookie === "1");  // Only returning true if cookie found and value is 1
    }

    // Open window containing link appropriate pre-chat-questionnaire
    function openPcqWindow(rclElement) {
        var $rcl = $(rclElement),
			windowFeatures = $rcl.attr("windowFeatures"); // window features unique to the rcl		
        openedWin = window.open(buildPcqUrl($rcl), '_blank', windowFeatures);
    }

    // Site Catalyst tracking
    function trackRclLinkClick() {
        if (typeof (TagParameters) != "undefined") {
            scatCustomLinkTrack('o', 'Chat');
        }
    }

    // Site Catalyst tracking
    function trackRclLinkClickNoResponse() {
        if (typeof (TagParameters) != "undefined") {
            scatCustomLinkTrack('o', 'ChatUnresponsive');
        }
    }

    // Bind click handler for available Rcl links
    function bindClickHandlersToRclLinks() {
        $(rclSelector).unbind('click.MoxieChat').bind('click.MoxieChat', function () {
            MoxieChat.HandleReactiveChatLinkClick(this);
        });
    }


    /*-------------
    --- ONREADY ---
    -------------*/
    $(function () {
        // Bind click handlers to RCL links on doc ready
        bindClickHandlersToRclLinks();

        // Assign proactive chat gateway
        talCustProp = "gateway=" + buildChatGatewayUrl("/public/contactus/chatgateway");
    });


    /*------------
    --- PUBLIC ---
    ------------*/
    return {
        HandleReactiveChatLinkClick: function (rclElement) {
            handleRclClick(rclElement);
        },
        BindToRclLinks: function () {
            bindClickHandlersToRclLinks();
        }
    };
} (jQuery, ".rcl");
// This passes in the dev moxie server location and the ER2 VM location for the gateway