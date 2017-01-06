
	$(window).load(function(){

		// add anchor class
		
		
			$('.feds_text_edit').addClass('feds_text_edit_toggle').addClass('feds_text_edit_style');
		
			$('.contentEditable').addClass('contentEditable_toggle').addClass('feds_text_edit_style');
		

		// if no cookie, set to true (default)
		if($.cookie('feds_show_ui') == null) {
			$.cookie('feds_show_ui', '1');
		} 

		if($.cookie('feds_show_ui') == 1) {
			// visible
			$('#fe_ui_toggle').html('Hide Inline Editor').addClass('fe_ui_hide');
			// show placeholder title text if empty
			
				$('.feds_text_edit_toggle').each(function() {
					if ($(this).text() == '') {
						$(this).text('[ optional title here ]').show().addClass('feds_optional_text');
					}
				});
				$('.feds_drag_handle').show();
				$('.fe_edit_icon').show();
			
		} else {
			// hidden
			$('#fe_ui_toggle').html('Show Inline Editor');
			// remove title from flow if empty
			
				$('.feds_text_edit_toggle').each(function() {
					if ($(this).text() == '') {
						$(this).hide();
					}
				});
				$('.feds_text_edit_toggle').removeClass('feds_text_edit').removeClass('feds_text_edit_style');
				$('.feds_drag_handle').hide();
				$('.fe_edit_icon').hide();
			
			
			//hide hidden sections
			$('.design_section_hidden').hide();
		}

		//handle simple editor click
		$('#fe_ui_toggle').on('click', function() {
		    if ($('#fe_ui_toggle').hasClass('fe_ui_hide') ) {
			    // if showing...
				$.cookie('feds_show_ui', '0');
				$('#fe_ui_toggle').removeClass('fe_ui_hide').addClass('fe_ui_show').html('Show Inline Editor');
				$('.feds_text_edit_toggle').removeClass('feds_text_edit').removeClass('feds_text_edit_style');
				$('.contentEditable_toggle').removeClass('contentEditable').removeClass('feds_text_edit_style');
				$('.feds_text_edit_toggle').each(function() {
					if ($(this).text() == '[ optional title here ]') {
						$(this).text('').hide().removeClass('feds_optional_text');
					}
				});
				$('.contentEditable_toggle').each(function() {
					if ($(this).text() == '[ optional content here ]') {
						$(this).text('').hide().removeClass('feds_optional_text');
					}
				});
				$('.feds_drag_handle').hide();
				$('.fe_edit_icon').hide();
				//hide hidden sections
				$('.design_section_hidden').hide();
				$('.feds_text_edit_cancel').click();
		    } else {
			    // if hidden...
				$.cookie('feds_show_ui', '1');
				$('#fe_ui_toggle').removeClass('fe_ui_show').addClass('fe_ui_hide').html('Hide Inline Editor');
				$('.feds_text_edit_toggle').addClass('feds_text_edit').addClass('feds_text_edit_style');
				$('.contentEditable_toggle').addClass('contentEditable').addClass('feds_text_edit_style');
				$('.feds_text_edit_toggle').each(function() {
					if ($(this).text() == '') {
						$(this).text('[ optional title here ]').show().addClass('feds_optional_text');
					}
				});
				$('.contentEditable_toggle').each(function() {
					if ($(this).text() == '' && $(this).html() == '') {
						$(this).text('[ optional content here ]').show().addClass('feds_optional_text');
					}
				});
				$('.feds_drag_handle').show();
				$('.fe_edit_icon').show();
				//show hidden sections
				$('.design_section_hidden').show();
		    }
		});

		// open panel if directed to home page from subpage
		

		$('.fe_preloader').removeClass('fe_preloader_hidden');
	});

	$(function(){
		$('.contentEditable').on('click', function(){
			if ( $(this).hasClass('contentEditable') == false ){
				return;
			}
			$(this).dblclick();
		});
	});
