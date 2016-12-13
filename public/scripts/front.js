console.log('howdy')

var sentiment = function(){
	var q1=$("#q1").val(),
		q2=$("#q2").val(),
		q3=$("#q3").val(),
		q4=$("#q4").val();
		console.log(q1,q2,q3,q4);
	var qArr = [q1,q2,q3,q4];
	$.post('/questionaire',function(data, stats){
		console.log(data)
	})

};
$(document).ready(function(){
	$('#btn').click(function(e){
		sentiment();
		e.preventDefault();
	});
});
