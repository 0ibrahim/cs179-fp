$('.newTable td:first-child').each(function(x){
	$(this).wrapInner("<a href = '#basic' data-toggle = 'modal'> </a>");
});



$('.newTable td:first-child a').click(function(){
	var info = []
	console.log("this is running")
	$(this).parent().parent().children('td').each(function(i){
		if (i == 0) {
			info[i] = $(this).find('a').html()
		}else{
			info[i] = $(this).html()
			console.log(info[i]);	
		}
		
	});

	var fieldIds = ["serialNo", "hospital", "batchNo", "donor", "firstUse", "timeUsed", "status", "usage"];
	console.log(info);

	$.each(fieldIds, function(i){
		$("#" + fieldIds[i]).html(info[i]);
	});

});

