$(document).ready(function() {
	
	getJoke();
	var jokeDest = $('#jokeContainer');

	$('#refreshButton').on('click', function(){
		getJoke();
	});

	function getJoke() {
		$.get('/refresh', function(data) {
			var type = data[0].jokeType;
			if (type === 'One-Liner'){
				createSingle(data[0].joke);
			}
			else {
				createTwo(data[0].joke, data[0].jokeAnswer);
			}
		});
	}

	function createSingle(oneLiner) {
		jokeDest.empty();
		$(jokeDest)
			.append(
				$('<div>')
				.append(
					$('<h2>' + oneLiner + '</h2>')
					)
				);
	}

	function createTwo(quest, ans) {
		jokeDest.empty();
		$(jokeDest)
			.append(
				$('<div>')
				.append(
					$('<h2>' + quest + '</h2>')
					)
				.append(
					$('<input/>').attr({
						type:'button',
						id:'revealButton',
						class:'btn btn-circle',
						value:'Reveal!'})
					)
				);

		$('#revealButton').on('click', function(){
			$(jokeDest)
				.append(
					$('<h2>' + ans + '</h2>')
					)
			$('#revealButton').remove();
		})
	}

	$('#submitTitle').click(function() {
		$("#formContainer").toggle("slow");
	});

});
