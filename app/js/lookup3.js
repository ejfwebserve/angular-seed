$(document).ready(function(){
	// $("#wrapper").load("form/classes.html div.main *");
	
	// $("#subpage001").append("hwlo");
	
	$("#wrapper").append("<div id='sunday'></div>").html();
	$("#sunday").prepend("<h2>This Sunday:</h2>");
$("#sunday").append().load("./ministry-contacts #subpage001 div.member_attach_person");
});
 	var first = "Julie";
	var page = "./ministry-contacts";
 	var sel1 = "./ministry-contacts #subpage001 > div.sub_primary_container.section_container > div > div.main_sans > div.member_attach_item > div.member_attach_rightcol.layout_borderbox > div.member_attach_person";
//  //
//  //
//  // 	$("#sunday").append().load(page).html();
// /*
// 	var list = $.get( "./ministry-contacts", function() {
// 	  alert( "success" );
// 	})
// 	  .done(function() {
// 	    alert( "second success" );
// 	  })
// 	  .fail(function() {
// 	    alert( "error" );
// 	  })
// 	  .always(function() {
// 	    alert( "finished" );
// 	  });
//
// 	// Perform other work here ...
//
// 	// Set another completion function for the request above
// 	jqxhr.always(function() {
// 	  alert( "second finished" );
// 	});
//
