$(document).ready(function(){
/**
 * @fileoverview Hiding unused fields in the ministries contact form.
 * @alias hide.js
 *  @requires jQuery
	@example 
	$("#street_address_block").hide();
 * 	@link 
*/

	var list = $.get( "./ministry-contacts", function() {
	  alert( "success" );
	})
	  .done(function() {
	    alert( "second success" );
	  })
	  .fail(function() {
	    alert( "error" );
	  })
	  .always(function() {
	    alert( "finished" );
	  });
 
	// Perform other work here ...
 
	// Set another completion function for the request above
	jqxhr.always(function() {
	  alert( "second finished" );
	});
});
