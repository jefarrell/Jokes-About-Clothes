
$('#refreshButton').on('click', function(){
	$.get('/refresh', function(data) {
		var type = data[0].jokeType;
		if (type === 'One-Liner'){
			createSingle(data[0].joke);
		}
		else {
			createTwo(data[0].joke, data[0].jokeAnswer);
		}
	});
});


function createSingle(oneLiner) {
	var dest = $('#jokeContainer');
	dest.empty();
	$(dest)
		.append(
			$('<div>')
			.append(
				$('<h2>' + oneLiner + '</h2>')
				)
			);
}

function createTwo(quest, ans) {
	var dest = $('#jokeContainer');
	dest.empty();
	$(dest)
		.append(
			$('<div>')
			.append(
				$('<h2>' + quest + '</h2>')
				)
			.append(
				$('<input type="button" id="revealButton" value="Reveal" />')
				)
			);
	$('#revealButton').on('click', function(){
		$(dest)
			.append(
				$('<h2>' + ans + '</h2>')
				)
		$('revealButton').remove();
	})
}

