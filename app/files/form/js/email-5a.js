$(document).ready(function(){
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
	$("#wrapper").append("hello");
	$("#wrapper").load("../header.html"); 
	// #subpage001 > div.sub_primary_container.section_container > div > div.main_sans *");

	// $("#wrapper").load("news.html #subpage001");
// 	$("#design_section_header").remove();
// $("#header020 > div > div > div.header_right > div").remove();
// 	//*[@id="header020"]/div/div/div[2]/div
    $("button").click(function(){
		// var item = $('#subpage001 > div.sub_primary_container.section_container > div > div.main_sans');
		// var content = item.find(item).html();
 	   $("#wrapper").load("classes.html #subpage001 > div.sub_primary_container.section_container > div > div.main_sans *");
		// var content = $("#subpage001 > div.sub_primary_container.section_container > div > div.main_sans");
		var content2 = $(document).find("#wrapper").html();
		// download('email.html', content2);
      });

	// var content = document.getElementsByClassName("target").innerHTML;
	// 	uriContent = "data:application/octet-stream," + encodeURIComponent(content);
	// newWindow = window.open(uriContent, 'newdocument');
	//
});
