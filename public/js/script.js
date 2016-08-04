
$('#refreshButton').on('click', function(e){
	if ($(e.target).data('action') === 'refresh') {
		console.log("update me!")
		$.get('/refresh', function(){
			console.log("got it");
		});
	}
});
