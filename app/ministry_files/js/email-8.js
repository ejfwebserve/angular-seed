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

	$("#wrapper").load("news.html #subpage001 > div.sub_primary_container.section_container > div > div.main_sans *");
	// $("#wrapper").load("news2.html");
	// $("#wrapper").load("news2.html").fadeIn(1000).delay(3000);
	// var items = $(document).("div.main_sans *");
	//
	// $("body").delay(2000).empty().fadeIn(2000).;
	// $("body").replace(items).delay(2000).fadeIn(1000);
	// $("#wrapper").load("news2.html #subpage001 div.main_sans *");

	// $("#wrapper").load("news.html #subpage001");
    $("button").click(function(){
		// var item = $('#subpage001 > div.sub_primary_container.section_container > div > div.main_sans');
		// var content = item.find(item).html();
		// var content = $("#subpage001 > div.sub_primary_container.section_container > div > div.main_sans");
		var content2 = $(document).delay(1000).find("#wrapper").html();
		download('email.html', content2);
      });
  });
