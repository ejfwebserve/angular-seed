$(document).ready(function(){
	// $("#wrapper").load("form/classes.html div.main *");
	
	// $("#subpage001").append("hwlo");
	
	$("#wrapper").append("<div id='sunday'></div>");
	$("#sunday").before("<h2>This Sunday:</h2>");
	$("#sunday").after().load("./weekly-news/ div.main_sans");
});
