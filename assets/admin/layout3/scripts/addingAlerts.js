function showAlert() {
	toastr["warning"]("This is a sample maintainance request..", "1 maintainance request")
}

var listObject = $("#myHiddenList").clone();
var visibleObject = listObject.removeClass("hidden")

function addAlertToFeed() {
	showAlert();
	visibleObject.clone().prependTo("#myFeed").show("slow");

	$(".alertButton").click(function(){
		$(this).closest('#myHiddenList').remove();
	});	
}

$(".alertButton").click(function(){
	$(this).closest('.li').remove();
});

$(".resolveButton").click(function(){
	$(this).hide();
	var tr = $(this).closest("td");
	tr.html("Resolved");
});

setInterval(addAlertToFeed, 8000);