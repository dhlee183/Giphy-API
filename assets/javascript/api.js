$(document).ready(function() {

	// Array of comic book characters displayed when the page loads
	var comicsChar = ['batman', 'spiderman', 'captain america', 'superman', 'green lantern', 'hulk', 'thor'];

	// Function to generate the ratings and gifs in the HTML
	function displayCharInfo(){

	// Variable created to give each of the characters an attribute of data-name	
	var comicSelection = $(this).attr('data-name');

	// Variable created for the Giphy API link with search parameters (q) using the comicSelection variable, 
	// rating parameter, limit parameter set to 10, and the public API key  
	var queryURL = 'http://api.giphy.com/v1/gifs/search?q='  + comicSelection + "&rating=&limit=10&api_key=dc6zaTOxFJmzC";

	// AJAX call is created for each of the characters being selected		
	$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
		console.log(response);

		// This clears out the currents gifs so that when new gifs are selected they are not stacked on top of each other
		$('#charactersView').empty()

		// for loop to cycle through the gifs
		for (i = 0; i < response.data.length; i++) {

		// Variable created to dynamically generate a div with a class of characterInfo to hold the ratings and images
		var characterDiv = $('<div class="characterInfo">');

		// Variable to get the rating from the Giphy API
		var rating = response.data[i].rating;

		// Variable that dynamically generates a p tag with the rating
		var p = $('<p>').text( "Rating: " + rating);

		// The p tag is given a class of ratings
		p.addClass('ratings')

		// The p tag is appended to the character div created earlier
		characterDiv.append(p);

		// Variable created to dynamically generate an img tag
		var img = $('<img>')

		// The img tag is given an attribute of src which is set equal to a still image of the gif
		img.attr("src", response.data[i].images.original_still.url);

		// The img tag is given an attribute of data-still which is set equal to a still image of the gif
		img.attr("data-still", response.data[i].images.original_still.url);

		// The img tag is given an attribute of data-animate which is set equal to an animated image of the gif
		img.attr("data-animate", response.data[i].images.original.url);

		// The img tag is given an attribute of data-state which is set equal to a value of still
		img.attr("data-state", "still");

		// The img tag is given a class of characterImg
		img.addClass('characterImg')

		// The img tag is appended to the character div created earlier
		characterDiv.append(img);

		// The dynamically created character div is prepended to the charactersView div in the HTML to display the gif info
		$('#charactersView').prepend(characterDiv);

		}
	});

	};

	// This event listener is used to play and pause the gif
	$(document).on('click', '.characterImg', function() {
				
		// Variable created to look for the data-state attribute on click of the gif
		var state = $(this).attr('data-state');

		// This if statement says when the state variable is equal to still, the gif gets its source link from the data-animate attribute to play the gif and data-state attribute is changed from still to animate
		if (state == "still") {
			$(this).attr("src", $(this).data("animate"));
			$(this).attr("data-state", "animate");
		}
		// Otherwise, if state is not equal to still, the gif is paused and the gif gets its source link from the data-still attribute and changes the data-state attribute from animate to still
		else {
			$(this).attr("src", $(this).data("still"));
			$(this).attr("data-state", "still");
		}

	});

	// Function to generate the character buttons in the HTML
	function renderButtons(){ 

		// This prevents repeat buttons and it removes comic book characters prior to adding new characters
		$('#buttonsView').empty();

		// for loop to cycle through the animals array
		for (var i = 0; i < comicsChar.length; i++){

		    // Variable created to dynamically generate a button tag
		    var a = $('<button>') 

		    // Class of comics is added to the button tag
		    a.addClass('comics');

		    // Attribute of data-name, which is equal to the specific character, is added to the button tag
		    a.attr('data-name', comicsChar[i]);

		    // Provides the initial button text
		    a.text(comicsChar[i]);

		    // This appends the button tag to the buttonsView div in the HTML
		    $('#buttonsView').append(a); 
		}
	}

	// Event listener for the submit buttom to add new characters to the button list
	$('#addChar').on('click', function(){

		// Variable created for the new characters entered into the input line
		var characterPick = $('#character-input').val().trim();

		// if/else statement created so that new buttons are only created when a user enters a character into the input line (this prevents empty buttons from being created on click)
		if (characterPick == "") {

			return false
		}
		else {

			comicsChar.push(characterPick);
		
			renderButtons();

		}

		// This clears out the input line after a new character is submitted
		$('#character-input').val("");

		// We have this line so that users can hit "enter" instead of clicking on the button and it won't move to the next page
		return false;
	})

	// Event listener for when a user clicks on a character button on the webpage it calls the displayCharInfo function to display the specific characters ratings and gifs
	$(document).on('click', '.comics', displayCharInfo);

	// This calls the renderButtons() function
	renderButtons();

});