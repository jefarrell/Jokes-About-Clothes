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
					$('<input/>').attr({
						type:'button',
						id:'revealButton',
						class:'btn',
						value:'Reveal!'})
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

	$('#submitTitle').click(function() {

		formDest.empty();
		$(formDest)
			.append(
				$('<input/>').attr({
					class: 'form-control',
					type: 'text',
					id:'joke',
					placeholder:'Your Joke'})
			)
			.append(
				$('<input/>').attr({
					class: 'form-control',
					type: 'text',
					id:'name',
					placeholder:'Your Name'})
			)
			.append(
				$('<input/>').attr({
					class: 'form-control',
					type: 'text',
					id:'email',
					placeholder:'Your Email Address'})
			)			
			.append(
				$('<input/>').attr({
					type:'button',
					id:'submitButton',
					class:'btn',
					value:'Submit!'})
				)
	});


	

});
