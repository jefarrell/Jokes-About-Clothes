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

	// Grab jokes from DB
	function getJokes() {
		$.get('/refresh', function(data) {
			console.log(data);
			for (var i = 0; i < data.length; i++) {
				addContent(i+1, data[i])
			}
			$("#cover").remove();
		});
	}

	// Dynamically create joke div depending on joke type
	function addContent(pos, jokeObj) {
	    var pageCount = flipbook.turn('pages')+1 ;

		if (jokeObj.jokeType === 'One-Liner'){
			var singleJoke = createSingle(jokeObj.joke);
			flipbook.turn('addPage', singleJoke);
		}
		else {
			var doubleJoke = createTwo(jokeObj.joke, jokeObj.jokeAnswer, pos);
	 		flipbook.turn('addPage', doubleJoke, pos);
	 	}

	    flipbook.turn('pages', pageCount); 
	}

	// Template for one-line joke
	function createSingle(oneLiner) {
		var single = $('<div>')
				.append(
					$('<h2>' + oneLiner + '</h2>')
					)

		return single	
	}

	// Template for call & response joke
	function createTwo(quest, ans, num) {
		num = num.toString();
		var tempID = 'revealButton'+num;
		var othertemp = 'jokeAns'+num;

		var double = $('<div>')
				.append(
					$('<h2>' + quest + '</h2>')
					)
				.append(
					$('<input/>').attr({
						type:'button',
						id: tempID,
						class:'revealButton btn btn-circle',
						value:'Reveal!'})
					)
				.append('<div>'+ans+'</div>')
				// .append(
				// 	$('<h2>').attr({
				// 		id: 'blah',
				// 		visibility: 'hidden',
				// 		value: ans })
				// 	)

		// $('#revealButton').on('click', function(){
		// 	$(double)
		// 		.append(
		// 			$('<h2>' + ans + '</h2>')
		// 			)
		// 	$('#revealButton').remove();
		// })

		$('.revealButton').click(function() {
			$('#'+this.id).remove();
		})

		return double
	}


	
	
	getJokes();

	/***************************************/

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
