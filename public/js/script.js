
$('#refreshButton').on('click', function(e){
	if ($(e.target).data('action') === 'refresh') {
		$.get('/refresh', function(data){
			console.log(data);
			console.log("script button click");
			var dest = document.getElementById('jokeContainer');
			var type = data[0].jokeType;
			if (type === 'One-Liner'){
				dest.innerHTML = data[0].joke;
			}
			else {
				dest.innerHTML = data[0].joke + data[0].jokeAnswer
			}
			
		});
	}
});
