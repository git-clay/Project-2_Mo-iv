console.log('howdy')

var sentiment = function(){
	var q1=$("#q1").val(),
		q2=$("#q2").val(),
		q3=$("#q3").val(),
		q4=$("#q4").val();
	var qArr = [q1,q2,q3,q4];
	qArr.forEach(function(element,index){ //elem:1 index:0 
		// console.log(element,index);
		var formData = $(this).serializeArray();
		var formObj = {
			index : index,
			element: element
		};
		console.log(formObj);

		$.post( "/questionaire", formObj)
		.done(function(data){
			console.log("data loadaed: " + data);
		});
	});
	
$('#myModal').modal('show')
};

$(document).ready(function(){
	$('#btn').click(function(e){
		sentiment();
		e.preventDefault();
	});
});
