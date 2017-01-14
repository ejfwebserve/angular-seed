/* 
 * Copyright 2010 Nextmeta Inc.
 */
(function(c){$.fn.autotab=function(){var b,d,a;$(this).keyup(function(c){$(this).val().length>=$(this).attr("maxlength")&&(d=$(this).attr("id"),a="",b=!1,$("input[type=text],input[type=tel],input[type=url],input[type=email]").each(function(c){0==a.length&&(b&&0==a.length&&(a=$(this).attr("id")),$(this).attr("id")==d&&(b=!0))}),0<a.length&&$("#"+a).focus())})}})(jQuery);
/* 
 * Copyright 2010 Nextmeta Inc.
 */