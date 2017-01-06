$(document).ready(function(){
	$("#wrapper").load("form/classes.html div.main *");
	
	$("h1").html("<p>hello</p>");	
	// $("#subpage001").append("hwlo");
	
	// $("#wrapper").load("./sunday-school-classes/");
	// $("#wrapper").load("./sunday-school-classes/ div.main h1,h2");
	// $("h2.inline > a").after("<p>helo</p>");
	// $("#wrapper").load("form/classes.html div.main h1,h2");
	// $("#wrapper").load("form/classes.html div.main h1.page_title");

	// $("#wrapper").load("news.html div.main_sans *");
	// $("#wrapper").load("news.html #subpage001 > div.sub_primary_container.section_container > div > div.main_sans *");

	// $("#wrapper").load("news.html #subpage001");
// 	$("#design_section_header").remove();
// $("#header020 > div > div > div.header_right > div").remove();
// 	//*[@id="header020"]/div/div/div[2]/div
    $("button").click(function(){
		// var item = $('#subpage001 > div.sub_primary_container.section_container > div > div.main_sans');
		// var content = item.find(item).html();
		// var content = $("#subpage001 > div.sub_primary_container.section_container > div > div.main_sans");
		var content2 = $(document).find("#wrapper").html();
		download('email.html', content2);
      });

	// var content = document.getElementsByClassName("target").innerHTML;
	// 	uriContent = "data:application/octet-stream," + encodeURIComponent(content);
	// newWindow = window.open(uriContent, 'newdocument');
	//
});
