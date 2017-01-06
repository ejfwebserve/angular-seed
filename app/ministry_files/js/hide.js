/**
 * Hiding unused fields in the ministries contact form.
 * @alias hide.js
 *  @requires jQuery
	@example 
	$("#street_address_block").hide();
 * 	@link 
*/
/**
	*/
$(document).ready(function(){
	$("#street_address_block").hide();
	$("#other_address_block").hide();
	$("#location_block").hide();
	$("#country_block").hide();
});
function myFunction(a, b) {
    return a * b;
}
var x = myFunction(4, 3);
document.getElementById("demo").innerHTML = x;
