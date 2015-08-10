$(document).ready(function(){
	$("img.50percent").each(function(){
		var $img = $(this);
		$img.width( $img.width() * .5);
	});
	$(".pets").addClass("fa-paw");
	$(".baby").addClass("fa-child");
	$(".programming").addClass("fa-code");
	$(".work").addClass("fa-briefcase")
});
