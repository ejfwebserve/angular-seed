$(document).ready(function(){
	// function clipit(filename, text) {
	// , {
	//         target: function() {
	//             return document.querySelector('div').text;
	//         }
	//     });
	copyCode.on('success', function(event) {
		// event.clearSelection();
		event.trigger.textContent = 'Copied';
		window.setTimeout(function() {
			event.trigger.textContent = 'Copy';
		}, 2000);
	});
	copyCode.on('error', function(event) {
		event.trigger.textContent = 'Press "Ctrl + C" to copy';
		window.setTimeout(function() {
			event.trigger.textContent = 'Copy';
		}, 2000);
	});

	$("#wrapper").load("news.html #subpage001 > div.sub_primary_container.section_container > div > div.main_sans *");

			// $("#wrapper").load("news.html #subpage001");
// 	$("#design_section_header").remove();
// $("#header020 > div > div > div.header_right > div").remove();
// 	//*[@id="header020"]/div/div/div[2]/div
    $("button").click(function(){
		var copyCode = new Clipboard('.btn');
		// var content2 = $(document).find("#subpage001 > div.sub_primary_container.section_container > div > div.main_sans").html();
		// download('email.html', content2);
	});

});
