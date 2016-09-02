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

	var counter = 1;

	flipbook.bind('turning', function(e, page) {
		console.log(page);
		var range = $(this).turn('range', page);
		for (page = range[0]; page <= range[1]; page++) {
			addPage(page, $(this));
			counter++;
		}


	});

	function addPage(page, book) {
		console.log('runs, counter: ' + counter);
		if (!book.turn('hasPage', page)) {
			//console.log('if runs');
			var element = $('<div />');
			book.turn('addPage', element, page);
			$.get('/refresh', function(data) {
				if (data[0].jokeType === 'One-Liner'){
					var singleJoke = createSingle(data[0].joke);
					element.html(singleJoke);
				}
				else {
					var doubleJoke = createTwo(data[0].joke, data[0].jokeAnswer, counter);
			 		element.html(doubleJoke);
			 		$('.revealButton').attr('id', 'revealButton'+page.toString());
			 	}
			});	
		}
	}

	//addPage($('#cover'),flipbook);

	// Template for one-line joke
	function createSingle(oneLiner) {
		var single = $('<div>')
				.append(
					$('<h2>' + oneLiner + '</h2>')
					)

		return single	
	}
	var fuck = 1;
	// Template for call & response joke
	function createTwo(quest, ans, num) {
		num = num.toString();
		var tempID = 'revealButton' + fuck;
		var othertemp = 'jokeAns';
		console.log('create two, counter: ' + fuck);
		var double = $('<div>')
				.append(
					$('<h2>' + quest + '</h2>')
					)
				.append(
					$('<input/>').attr({
						type:'button',
						// id: tempID,
						class:'revealButton btn btn-circle',
						value:'TELL ME!'})
					)
				.append(
					'<p>'+ans+'</p>'
					)

		$('.revealButton').click(function(e){
			$(e.target).remove();
		});
		
		fuck++;
		return double
	}

	// Flash background on reveal button
	var backgroundInterval = setInterval(function(){
		$('.revealButton').toggleClass('buttonFlash');
	},500)
	

	
	//getJokes();

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
