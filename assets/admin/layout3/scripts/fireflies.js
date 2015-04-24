$('.newTable td:first-child').each(function(x){
	$(this).wrapInner("<a href = '#basic' data-toggle = 'modal'> </a>");
});