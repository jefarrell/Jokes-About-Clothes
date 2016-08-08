$(document).ready(function() {
	
	getJoke();
	var jokeDest = $('#jokeContainer');
	var formDest = $("#formContainer");

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
					$('<h2>Q: </h2>' + '<p>' + quest + '</p>')
					)
				.append(
					$('<input type="button" id="revealButton" value="Reveal!" />')
					)
				);
			
		$('#revealButton').on('click', function(){
			$(jokeDest)
				.append(
					$('<h2>A: </h2>' + '<p>' + ans + '</p>')
					)
			$('#revealButton').remove();
		})
	}

	$('#submitType').change(function() {

		var item = $(this).val();
		if (item === "1") {
			submitOne();
		} else {
			submitTwo();
		}
	});


	function submitOne() {
		formDest.empty();
		$(formDest)
			.append(
				$('<input/>').attr({type: 'text', id:'joke', value:'Joke'})
			)
			.append(
				$('<input type="button" id="submitButton" value="Submit!" />')
				)
	}

	function submitTwo() {
		formDest.empty();
		$(formDest)
			.append(
				$('<input/>').attr({type: 'text', id:'joke', value:'Joke'})
				)
			.append(
				$('<input/>').attr({type: 'text', id:'jokeAns', value:'Joke Answer'})
				)
			.append(
				$('<input type="button" id="submitButton" value="Submit!" />')
				)
	}






});
