var shiftRes=[],
  metashiftRes=[],
  shiftArr =[],
  sevenDayHap=[];
console.log('graph')
$(document).ready(function(){
  div = document.getElementById("graph");
  getHedoData()
  drawChart();
  drawChart2();
});

function getHedoData(){
	// from db 
$.get('/api/daily',function(req,res){
	console.log('get request',req);
	var len = req.length;
	shiftArr = req[(len-1)].shift;
	metashiftRes = req[(len-1)].meta;

/******* get the last 7 days from req[].meta *********/
	for(var j = 7;j>0;j--){
		var cur =parseFloat(req[(len-j)].meta[1][1])
		var curDate = req[(len-j)].date
		sevenDayHap.push([curDate,cur]) 
	}
	console.log(sevenDayHap)
	// console.log(shiftArr,metashiftRes)
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(drawChart);
	google.charts.setOnLoadCallback(drawChart2);

})
}


    

function drawChart(x,y) {
  var data = new google.visualization.DataTable();
  var cur = [];
  data.addColumn('string','Word');
  data.addColumn('number','Score');
  	for(var i = 1;i<shiftArr.length;i++){
  		cur.push([shiftArr[i][1],parseFloat(shiftArr[i][0])])
	}
  data.addRows(cur);
      var totalHap = Math.round(((metashiftRes[1][1]) - 5.5) * 100);

    var options = {
      title: "Today's Total Happiness Score: "+ totalHap +'%',
      curveType: 'function',
      legend:{position:'none'}
    };

    var chart = new google.visualization.LineChart(document.getElementById('graph'));
    chart.draw(data, options);
   }
function drawChart2(x,y) {
  var data = new google.visualization.DataTable();
  data.addColumn('string','Date');
  data.addColumn('number','Score');

  data.addRows(sevenDayHap);

    var options = {
      title: "Past seven days",
      curveType: 'function',
      legend:{position:'none'},
      hAxis: {textPosition:'none'},
      vAxis: {textPosition:'none'}
    };

    var chart = new google.visualization.LineChart(document.getElementById('graph2'));
    chart.draw(data, options);
   }

