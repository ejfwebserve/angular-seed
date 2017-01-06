$(document).ready(function(){

	// $("#wrapper") = content;
	// $("#wrapper").load("news.html").filter(".main_sans");
	$("#wrapper").load("news.html");
    $("button").click(function(){
	// download('email.html', content  );
      });

	  var content = load("news.html");
	// var content = document.getElementsByClassName("target").innerHTML;
	// 	uriContent = "data:application/octet-stream," + encodeURIComponent(content);
	// newWindow = window.open(uriContent, 'newdocument');
	//
	function download(filename, text) {
	    var pom = document.createElement('a');
	    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	    pom.setAttribute('download', filename);

	    if (document.createEvent) {
	        var event = document.createEvent('MouseEvents');
	        event.initEvent('click', true, true);
	        pom.dispatchEvent(event);
	    }
	    else {
	        pom.click();
	    }
	}
});
