$(document).ready(function() {

	var flipbook = $("#flipbook");
	
	/******* Flipbook *******/
	var pageTurn = flipbook.turn({
		display: 'single',
		width:498,
		height: 398,
		autoCenter: true,
		duration: 1000,
		pages: 10
		//turnCorners: 'br'
	});

	flipbook.bind('start', function (event, pageObject, corner) {
        if (corner == 'tl' || corner == 'tr' || corner == 'bl' || corner == 'br') {
            event.preventDefault();
        }
    });
	/**********************/

	// Turn page via button instead of tabs
	$('#refreshButton').click(function(e) {
		e.preventDefault();
		pageTurn.turn('next');
	});


	// Grab jokes from DB
	function getJokes() {
		$.get('/refresh', function(data) {
			for (var i = 0; i < data.length; i++) {
				addContent(i+1, data[i])
			}

			$('#cover').remove();
			$('.revealButton').click(function() {
				//$('#refreshButton').css('visibility','visible');
				$('#'+this.id).remove();
				console.log(this.id);
			});			
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
						value:'TELL ME!'})
					)
				.append(
					'<p>'+ans+'</p>'
					)

		// Had reveal button function here before

		return double
	}

	// Flash background on reveal button
	var backgroundInterval = setInterval(function(){
		$('.revealButton').toggleClass('buttonFlash');
	},500)
	

	
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

});
