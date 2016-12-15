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
		console.log(data)

			// console.log(data[0],data[1],data[2],data[3]);
			// $('#btn').click(function(data){
				console.log(data)
			 	$('.container-fluid').append(renderModal(data));
			 	$('#myModal').modal('show');
				// data
				// data.preventDefault();
			// });
		});
		

    $(this).trigger("reset");
};

$(document).ready(function(){
	$('#btn').click(function(e){
		sentiment();
		e.preventDefault();
	});

});
function renderModal(currentUser){
	var len = currentUser.qTwo.length;
	var curUser=currentUser.qTwo[len-1];

var modalHtml =
'  <div id="myModal" class="modal-dialog" role="document">'+
'    <div class="modal-content">'+
'      <div class="modal-header">'+
'        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
'        <h4 class="modal-title">Todays Results</h4>'+
'      </div>'+
'      <div class="modal-body">'+

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
   '     <p>cool picture goes here</p>'+

  '    </div>'+
   '   <div class="modal-footer">'+
 '       <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
 '       <button type="button" class="btn btn-primary">Save changes</button>'+
'      </div>'+
'    </div><!-- /.modal-content -->'+
'  </div><!-- /.modal-dialog -->';
return modalHtml;
}