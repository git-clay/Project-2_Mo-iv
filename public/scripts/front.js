console.log('howdy')

/*POST
// These code snippets use an open-source library. http://unirest.io/nodejs
unirest.post("https://twinword-sentiment-analysis.p.mashape.com/analyze/")
.header("X-Mashape-Key", "EiFKUp9ROymshrUthQlrkwSWWM7lp1OsBRCjsno44Cct6gKP8V")
.header("Content-Type", "application/x-www-form-urlencoded")
.header("Accept", "application/json")
.send("text=great value in its price range!")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
});
  */

var getFunc = function(){
	var q1=$("#q1").val(),
		q2=$("#q2").val(),
		q3=$("#q3").val(),
		q4=$("#q4").val();
		console.log(q1,q2,q3,q4);
		
};
$(document).ready(function(){
	$('#btn').click(function(e){
		getFunc();
		e.preventDefault();
	});
});
