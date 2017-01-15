var shiftRes,
	metashiftRes;

// var date 	= new Date(),
// 	dd 		= date.getDate()-1,
// 	mm 		= date.getMonth()+1,
// 	yyyy	= date.getFullYear(),
// 	url		= 'http://hedonometer.org/data/shifts/world/',
// 	shift 	= '-shift.csv',
// 	metashift = '-metashift.csv';

// if(dd<10) {dd='0'+dd;} 
// if(mm<10) {mm='0'+mm;} 
// date =	yyyy+'-'+ mm +'-'+dd;

// var getShift = url+date+shift,
// 	getMetashift = url+date+metashift;


function getHedoData(){
var shiftArr =[];
$.get('/api/daily',function(req,res){
	console.log('get request',req[0])
	shiftArr = req[0].shiftArray;
	metashiftRes = req[0].metaShiftArray;
});
	function drawChart() {
	  var data = new google.visualization.DataTable();
	  data.addColumn('string','Word');
	  data.addColumn('number','Score');
	  data.addRows(shiftArr)

	    var options = {
	      title: "Today's Total Happiness Score: "+metashiftRes[1][2],
	      curveType: 'function'
	    };

	    var chart = new google.visualization.LineChart(document.getElementById('graph'));

	    chart.draw(data, options);
	  }
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(drawChart);
       
}
getHedoData()
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
	$.post( "/questionaire",qArr)
		// .catch(function(e){
		// 	console.log(e)
		// })
		.then(function(data){
		console.log(data)

			// console.log(data[0],data[1],data[2],data[3]);
			// $('#btn').click(function(data){
			 	$('.modal-body').append(renderModal(data));
			$('#myModal').modal('show');

				// data
				// data.preventDefault();
			// });
		});
		

    $(this).trigger("reset");
};

$(document).ready(function(){
	div = document.getElementById("graph");
	getHedoData();
	$('#btn').click(function(e){
		sentiment();
		e.preventDefault();
	});

});
function renderModal(currentUser){
	var len = currentUser.qTwo.length;
	var curUser=currentUser.qTwo[len-1];

var modalHtml =

 '       <h3>Overall</h3>'+

  '       <h3><small>' +curUser[0].key[0].word+'</small></h3>'+
 '       <h3><small>' +curUser[0].type+'</small></h3>'+
 '       <h3><small>'+curUser[0].score +'</small></h3>'+
 '       <p>cool picture goes here</p>'+

 '       <h3>'+currentUser.goals[0] +'</h3>'+
  '      <h3><small> '+curUser[1].type+'</small></h3>'+
  '      <h3><small>'+curUser[1].score +'</small></h3>'+
  '      <p>cool picture goes here</p>'+

  '      <h3>'+currentUser.goals[1]+'</h3>'+
  '      <h3><small> '+curUser[2].type+'</small></h3>'+
 '       <h3><small>'+curUser[2].score +'</small></h3>'+
  '      <p>cool picture goes here</p>'+

   '     <h3>'+currentUser.goals[2] +'</h3>'+
   '     <h3><small> '+curUser[3].type+'</small></h3>'+
 '       <h3><small>'+curUser[3].score +'</small></h3>'+
   '     <p>cool picture goes here</p>';

 
return modalHtml;
}