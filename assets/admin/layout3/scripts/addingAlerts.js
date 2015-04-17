function showAlert() {
	toastr["warning"]("New Firefly was added. This is a dummy error.", "Firefly added")
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
	console.log("working")
	$(this).closest('.li').remove();
});

setInterval(addAlertToFeed, 10000);