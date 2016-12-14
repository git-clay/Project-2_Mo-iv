console.log('howdy')

var sentiment = function(){
	var q1=$("#q1").val(),
		q2=$("#q2").val(),
		q3=$("#q3").val(),
		q4=$("#q4").val();
	var qArr = [q1,q2,q3,q4];

	/***** 
		$.post qArr and move forEach over to userController


		This will allow userController to save all of the scores as an array of objects
		that will easily be stored to the db.User

		Then the ejs modal will use the most recent array for the results
		page

		if {score is above a certain threshold "Excellent- keep it up"
		else {google img search lowest scored word + motivation and post to modal
		
	******/

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
	
$('#myModal').modal('show');
};

$(document).ready(function(){
	$('#btn').click(function(e){
		sentiment();
		e.preventDefault();
	});
});
