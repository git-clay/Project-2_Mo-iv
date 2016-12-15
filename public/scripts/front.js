var sentiment = function(){
	var q1=$("#q1").val(),	//these are the question responses
		q2=$("#q2").val(),
		q3=$("#q3").val(),
		q4=$("#q4").val();
	var qArr = {q1:q1,q2:q2,q3:q3,q4:q4};
	/***** 
		MAKE LATER
		if {score is above a certain threshold "Excellent- keep it up"
		else {google img search lowest scored word + motivation and post to modal
	******/
	$.post( "/questionaire", qArr)
		.done(function(data){
			console.log(data[0],data[1],data[2],data[3]);
		});
    $(this).trigger("reset");
	$('#myModal').modal('show');
};

$(document).ready(function(){
	$('#btn').click(function(e){
		sentiment();
		e.preventDefault();
	});
	$('#myModal').modal('show');

});
