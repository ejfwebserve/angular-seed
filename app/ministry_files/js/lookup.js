/**
* Lookup
*/
$(document).ready(function() {
	setupDivs();
	var first = "Julie";
	$("#sunday").before("<h2>" + first + "</h2>");
	var page = "./ministry-contacts/";
	// $("#sunday").load("./ministry-contacts/");
	// var sel1 = " #subpage001 > div.sub_primary_container.section_container > div > div.main_sans > div.member_attach_item > div.member_attach_rightcol.layout_borderbox > div.member_attach_person"; 
	var sel0 = " #subpage001 > div.sub_primary_container.section_container > div > div.main_sans > div.member_attach_item";

	var sel2 = " div.staff_list_email.member_attach_email";
	var sel2 = ":contains(" + first + ")"
		// $("#select_contact").load(page + sel0);
		// var res = loadContacts(page, data);


	var list = $.get("./ministry-contacts", function() {
			// alert( "success" );
		alert(list.html())

		})
		.done(function() {
			// alert( "second success" );
		})
		.fail(function() {
			alert("error");
		})
		.always(function() {
			// alert( "finished" );
		});

	// Perform other work here ...

	// Set another completion function for the request above
	jqxhr.always(function() {
		// alert( "second finished" );
	});
	$("#select_contact").append(list).html();
	// $("urgent").append(res)
	// var details_button = "div.member_attach_button"
	// $("#urgent").remove(details_button);
	/*                  
		$("#sunday").append().load(page);
	*/
});

function setupDivs() {
	$("#wrapper").append("<div id='sunday'></div>");
	$("#wrapper").append("<div id='select_contact'><h3>Contacts:</h3></div>");
	$("#sunday").prepend("<h2>This Sunday:</h2>");
}

function loadContacts(page, data) {
	$.get(page, function(data, textStatus, xhr) {
		//optional stuff to do after success
		$("#sunday").append("Success!")
	});
	// var list =

	return data
}
