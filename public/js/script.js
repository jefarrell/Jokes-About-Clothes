$(document).ready(function() {

	var flipbook = $("#flipbook");
	
	/******* Flipbook *******/
	flipbook.turn({
		display: 'single',
		width:498,
		height: 398,
		autoCenter: true,
		duration: 800,
		turnCorners: 'br'
	});

	flipbook.bind('start', function (event, pageObject, corner) {
        if (corner == 'tl' || corner == 'tr' || corner == 'bl') {
            event.preventDefault();
        }
    });
	/**********************/

	
	getJoke();
	var jokeDest = $('#one');
	//var jokeDest = $('#jokeContainer');

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


	$('#submitButton').click(function(){
		var jokeField = $('#joke');
		var nameField = $('#name');
		var emailField = $('#email');

		var mailData = {
			joke: jokeField.val(),
			name: nameField.val(),
			email: emailField.val()
		};

		$.ajax({
			url: '/mail',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({data:mailData})
		});
	});


	/////
	$('.p-temporal').css({
		'border': '1px solid black',
		'background-color': '#F2F2F2'
	});
});
