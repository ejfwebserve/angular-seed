$(document).ready(function(){
/**
 * @fileoverview Hiding unused fields in the ministries contact form.
 * @alias build.js
 *  @requires jQuery
	@example 
	$("#street_address_block").hide();
 * 	@link 
*/
/**
	*/
	$("#street_address_block").hide();
	$("#other_address_block").hide();
	$("#location_block").hide();
	$("#country_block").hide();
});

/**
 * Build a pipeline of comment handlers.
 * @param {...Function|null} args - Pipeline elements. Each is a function that accepts
 *  a comment and can return a comment or undefined (to drop that comment).
 * @returns {Function} pipeline
 * @private
 */
function pipeline() {
  var elements = arguments;
  return function (comment) {
    for (var i = 0; comment && i < elements.length; i++) {
      if (elements[i]) {
        comment = elements[i](comment);
      }
    }
    return comment;
  };
}
