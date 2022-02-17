

		//variables to store random rolls. 1 and 2 are in evry game mode, 3 and 4 only play a role in hard and nightmare modes.
		var roll1;
		var roll2;
		var roll3;
		var roll4;
		var roll1_stored;
		var roll2_stored;
		var roll3_stored;
		var roll4_stored;

		//Play for time_limit days. Original is 10, 2-3 works for quick tests
		var time_limit;

		//Rent money to be collected for winning the game
		var rent;


		//Initial stats of the player. Originals are 0, 10, 10, used 2-3 for quick testing
		var starter_money = 0;
		var starter_time = 10;
		var original_patience = 10; //this will be left unchanged
		var starter_patience; //this can be affected by new negative patience mechanic (why Oliver why)
		starter_patience = original_patience; //to start with, set starter patience to the max value

		//changing variables for stats throughout the game
		var day;
		var money;
		var time;
		var patience;

		//Storing the 2d6 pairs rolled for manual checking
		var results;

		//Flag to indicate the game should be over. Change it to 1 to end the game.
		var go_flag = 0;

		//Flag to indicate a disaster/unfunny customer has happened
		var disaster_flag = 0;

		//Dice to be rolled in the background for a chance of floods/unfunny customers in hard and nightmare modes (currently d100, 1 has to be added to include the max value)
		var disaster_die = 101;
		
		//count how many events happened
		var event_counter = 0;
		
		//Get the status of game mode selector checkboxes 
		var day_mode = document.getElementById("day_mode_checkbox");
		var rattie_mode = document.getElementById("rattie_mode_checkbox");
		var hard_mode = document.getElementById("hard_mode_checkbox");
		var nightmare_mode = document.getElementById("nightmare_mode_checkbox");
		var extra_mode = document.getElementById("extra_mode_checkbox");

		function check_for_realism(){
			if (extra_mode.checked == true) {
				//Play for time_limit days. Default is 10, extra realism mode is 30. 
				time_limit = 30;

				//Rent money to be collected for winning the game
				rent = 30;
			}
			else {
				//Play for time_limit days. Default is 10, extra realism mode is 30. 
				time_limit = 10;

				//Rent money to be collected for winning the game
				rent = 10;
			}
		}

		//initialise the rolled d6 and d100 values to 0
		roll1 = 0;
		roll2 = 0;
		roll3 = 0;
		roll4 = 0;

		//initialise day to 1
		day = 1;

		//empty the stored 2d6 values
		results = "";

		//initialise stats to be the starting values
		money = starter_money;
		time = starter_time;
		patience = starter_patience;

		// generate random integer between min and max-1. used for rolling various dice
		function rolling(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		}

		// put a picture of a die (src: die_image) in the html element id-d by die_display
		var die_image;
		var die_display;

		function die(die_display, die_image) {
			document.getElementById(die_display).src = die_image;
		}

		//roll 4 dice
		//roll 2d6 (roll1 and roll2), and update the dice pictures appropriately using the die function
		function change() {
			roll1 = rolling(1, 7); //roll 1d6 to determine if it's a customer or a crisis
			roll2 = rolling(1, 7); //roll 1d6 determine the nature of the interaction

			//update dice pictures
			if (roll1 == 1) {
				die_display = "die_display1";
				die_image = "images/dice1.png";
				die(die_display, die_image);
			}
			else if (roll1 == 2) {
				die_display = "die_display1";
				die_image = "images/dice2.png";
				die(die_display, die_image);
			}
			else if (roll1 == 3) {
				die_display = "die_display1";
				die_image = "images/dice3.png";
				die(die_display, die_image);
			}
			else if (roll1 == 4) {
				die_display = "die_display1";
				die_image = "images/dice4.png";
				die(die_display, die_image);
			}
			else if (roll1 == 5) {
				die_display = "die_display1";
				die_image = "images/dice5.png";
				die(die_display, die_image);
			}
			else {
				die_display = "die_display1";
				die_image = "images/dice6.png";
				die(die_display, die_image);
			}


			if (roll2 == 1) {
				die_display = "die_display2";
				die_image = "images/diceb1.png";
				die(die_display, die_image);
			}
			else if (roll2 == 2) {
				die_display = "die_display2";
				die_image = "images/diceb2.png";
				die(die_display, die_image);
			}
			else if (roll2 == 3) {
				die_display = "die_display2";
				die_image = "images/diceb3.png";
				die(die_display, die_image);
			}
			else if (roll2 == 4) {
				die_display = "die_display2";
				die_image = "images/diceb4.png";
				die(die_display, die_image);
			}
			else if (roll2 == 5) {
				die_display = "die_display2";
				die_image = "images/diceb5.png";
				die(die_display, die_image);
			}
			else {
				die_display = "die_display2";
				die_image = "images/diceb6.png";
				die(die_display, die_image);
			}

			// roll 2d100 to determine if there is a disaster (will be utilised in hard and nightmare modes)		
			roll3 = rolling(1, disaster_die);
			roll4 = rolling(1, disaster_die);
		}

		//variable to store the description of the current event rolled
		var single_event = "";
		//variable to store all the event descriptions from the game
		var all_events = "";

		//variables to shorten event descriptions
		var customer = "A customer arrives. ";
		var crisis = "A crisis develops. ";
		var peculiarity = "A peculiarity occurs. ";

		//Let the player know their current stats
		var leftovers = "";
		leftovers = "So far you have " + money + " money. You have " + time + " time and " + patience + " patience left today. <br>";

		// function to determine events from the rolls generated in the change function. Takes the 4 random integers rolled as arguments
		function events(n1, n2, n3, n4) {
			if (n1 < 3) {
				if (n2 == 1) {
					event_counter += 1;
					patience = patience - 1;
					leftovers = "So far you have " + money + " money. You have " + time + " time and " + patience + " patience left today. ";
					single_event = "<br>"  + event_counter + ". " + customer + "The customer needs the toilet.<br>" + leftovers;
				}
				else if (n2 == 2) {
					event_counter += 1;
					money = money - 1;
					leftovers = "So far you have " + money + " money. You have " + time + " time and " + patience + " patience left today. ";
					single_event = "<br>"  + event_counter + ". "   + customer + "The customer turns out to be a shoplifter.<br>" + leftovers;
				}
				else if (n2 == 3) {
					event_counter += 1;
					time = time - 1;
					leftovers = "So far you have " + money + " money. You have " + time + " time and " + patience + " patience left today. ";
					single_event = "<br>"  + event_counter + ". "   + customer + "The customer wants a book that you do not have.<br>" + leftovers;
				}
				else if (n2 == 4) {
					event_counter += 1;
					time = time - 1;
					leftovers = "So far you have " + money + " money. You have " + time + " time and " + patience + " patience left today. ";
					single_event = "<br>"  + event_counter + ". "  + customer + "The customer is a literal wild animal.<br>"+ leftovers;
				}
				else if (n2 == 5) {
					event_counter += 1;
					patience = patience - 1;
					leftovers = "So far you have " + money + " money. You have " + time + " time and " + patience + " patience left today.";
					single_event = "<br>"  + event_counter + ". "  + customer + "The customer has a complaint.<br>" + leftovers;
				}
				else {
					event_counter += 1;
					money = money + 1;
					leftovers = "So far you have " + money + " money. You have " + time + " time and " + patience + " patience left today.";
					single_event = "<br>"  + event_counter + ". "  + customer + "The customer purchases a book!<br>" + leftovers;
				}
			}
			else if ((3 < n1) && (n1 < 5)) {
				if (n2 == 1) {
					event_counter += 1;
					// don't lose patience if rattie mode is enabled
					if (rattie_mode.checked == true) {
						leftovers = "So far you have " + money + " money. You have " + time + " time and " + patience + " patience left today. ";
						single_event = "<br>"   + event_counter + ". " + crisis  + "You have almost run out of tea! You have received help from Crowley's Ratties in the form of emergency teabags. You have an angel and a demon to thank for not running out of teabags today.<br>" + leftovers;
					}
					else {
						patience = patience - 1;
						leftovers = "So far you have " + money + " money. You have " + time + " time and " + patience + " patience left today. ";
						single_event = "<br>"  + event_counter + ". "  + crisis + "You have run out of tea!<br>" + leftovers;
					}
				}
				else if (n2 == 2) {
					event_counter += 1;
					time = time - 2;
					leftovers = "So far you have " + money + " money. You have " + time + " time and " + patience + " patience left today.";
					single_event = "<br>"  + event_counter + ". "  + crisis + "The printer is broken.<br>" + leftovers;
				}
				else if (n2 == 3) {
					event_counter += 1;
					time = time - 3;
					leftovers = "So far you have " + money + " money. You have " + time + " time and " + patience + " patience left today.";
					single_event = "<br>"  + event_counter + ". "  + crisis + "You can't find a book.<br>" + leftovers;
				}
				else if (n2 == 4) {
					event_counter += 1;
					patience = patience - 3;
					money = money + 1;
					leftovers = "So far you have " + money + " money. You have " + time + " time and " + patience + " patience left today.";
					single_event = "<br>"  + event_counter + ". "  + crisis + "Someone is haggling with you.<br>" + leftovers;
				}
				else if (n2 == 5) {
					event_counter += 1;
					time = time - 2;
					leftovers = "So far you have " + money + " money. You have " + time + " time and " + patience + " patience left today. ";
					single_event = "<br>"  + event_counter + ". "  + crisis + "The phone rings.<br>" + leftovers;
				}
				else {
					event_counter += 1;
					money = money - 2;
					leftovers = "So far you have " + money + " money. You have " + time + " time and " + patience + " patience left today. ";
					single_event = "<br>"  + event_counter + ". "  + crisis + "You bought more books.<br>" + leftovers;
				}
			}
			else {
				if (n2 == 1) {
					event_counter += 1;
					time = time - 2;
					leftovers = "So far you have " + money + " money. You have " + time + " time and " + patience + " patience left today. ";
					single_event = "<br>"  + event_counter + ". "  + peculiarity + "You hear mysterious noises.<br>" + leftovers;
				}
				else if (n2 == 2) {
					event_counter += 1;
					patience = patience - 1;
					leftovers = "So far you have " + money + " money. You have " + time + " time and " + patience + " patience left today.";
					single_event = "<br>"  + event_counter + ". "  + peculiarity + "A feeling of dread comes over you.<br>" + leftovers;
				}
				else if (n2 == 3) {
					event_counter += 1;
					if (patience <= starter_patience - 1) {
						patience = patience + 1;
						leftovers = "So far you have " + money + " money. You have " + time + " time and " + patience + " patience left today. ";
						single_event = "<br>"  + event_counter + ". "  + peculiarity + "There is a long, blissful silence.<br>" + leftovers;
					}
					else {
						leftovers = "So far you have " + money + " money. You have " + time + " time and " + patience + " patience left today. ";
						single_event = "<br>"  + event_counter + ". "  + peculiarity + "There is a long, blissful silence. Normally, this would have a positive influence on your remaining patience; however, even angels cannot have more patience than you currently possess.<br>" + leftovers;
					}
				}
				else if (n2 == 4) {
					event_counter += 1;
					money = money - 1;
					leftovers = "So far you have " + money + " money. You have " + time + " time and " + patience + " patience left today.";
					single_event = "<br>"  + event_counter + ". "  + peculiarity + "Some books fall of the shelf.<br>" + leftovers;
				}
				else if (n2 == 5) {
					event_counter += 1;
					money = money + 1;
					leftovers = "So far you have " + money + " money. You have " + time + " time and " + patience + " patience left today. ";
					single_event = "<br>"  + event_counter + ". "  + peculiarity + "You find a missing book!<br>" + leftovers;
				}
				else {
					event_counter += 1;
					money = money - 3;
					leftovers = "So far you have " + money + " money. You have " + time + " time and " + patience + " patience left today. ";
					single_event = "<br>"  + event_counter + ". "  + peculiarity + "Unexpected bills arrive.<br>" + leftovers;
				}
			}


			//if hard mode is enabled, use the third random number, disaster activates on a 1
			if ((nightmare_mode.checked == false) && (hard_mode.checked == true)) {
				if (n3 == 1) {
					event_counter += 1;
					single_event =  "<br>"   + event_counter + ". " + "The bookshop got flooded on day " + day + ". Game over.<br>" + single_event;
					disaster_flag = 1;
				}
			}

			//if nightmare mode is enabled, use the third and fourth random numbers, disasters activate on a 1 in both cases. Look, if you wanted unfunny customers, you get the floods too
			if (nightmare_mode.checked == true) {
				if (n3 == 1) {
					event_counter += 1;
					single_event =  "<br>"   + event_counter + ". " + "The bookshop got flooded on day " + day + ". Game over.<br>" + single_event;
					//all_events =  single_event + all_events;
					disaster_flag = 1;
				}
				if (n4 == 1) {
					event_counter += 1;
					//all_events = all_events + single_event;
					//just pick a scary big number to spare people from infinite loops 
					var loopy = 0;
					while (loopy < 100) {
						single_event =   "All work and no play makes Oliver a dull boy.<br> " + single_event;
						loopy++;
					}
					single_event =  "<br>"   + event_counter + ". " + "A customer said >>Oh there's no price on it, it must be free.<<  on day " + day + ". Game lost. Burn the link to this website. <br> Do not forget:<br>" + single_event;
					//all_events = all_events + single_event;
					disaster_flag = 1;
				}
			}
		}



		//after every event, perform time, patience an day checks
		function checks() {
			//if player is out of patience, tell them and jump to next day. reset time and patience to starter values
			if (patience <= 0) {
				single_event =  "<br><br>--------------------<br>End of day " + day + ".<br>" + "<br> Your patience has run out and will be reduced by one unit tomorrow. The day is over, whether or not the customers like it. <br> " + single_event ;
				day = day + 1;
				//patience_flag = 1;
				starter_patience = starter_patience-1;  //new patience mechanic
				patience = starter_patience;
				time = starter_time;
			}
			//if player is low on patience, give an occasional warning
			else if (patience == 3) {
				single_event =  "<br> Your patience is wearing thin!" + single_event;
			}
			else {
			}

			//if player is out of time, tell them and jump to next day. reset time and patience to starter values
			if (time <= 0) {
				single_event =  "<br><br>--------------------<br>End of day " + day + ".<br>" + "<br> You are out of time. The Sun is is setting on the colourful horizon of Soho. The day is over. <br> " + single_event ;
				day = day + 1;
				time = starter_time;
				patience = starter_patience;
			}
			//if player is low on time, give an occasional warning
			else if (time == 3) {
				single_event =   "<br> You don't have much time left!" + single_event;
			}
			else {
			}

			//if the time_limit of the game is reached, trigger game over and give a final summary to the player.
			if (day > time_limit) {
				go_flag = 1;
				if (money > rent) {
					single_event = "<br>" + time_limit + " days have passed. You managed to gather " + money + " money. <br>" +  "Congratulations! Against all odds, you have managed to earn enough money to pay the rent and you have " + money - 10 + " profit. Are you sure you didn't fudge your rolls?" + single_event;
				}
				else if (money == rent) {
					single_event =  "<br>" + time_limit + " days have passed. You managed to gather " + money + " money. <br>" + "Congratulations! Against all odds, you have managed to earn enough money to pay the rent. Just about. Ready for the next ten days?" + single_event;
				}
				else {
					single_event = "<br>" + time_limit + " days have passed. You managed to gather " + money + " money. <br>" + "Unfortunately, this is not enough to make the landlord happy. Grab your books and run!" + single_event;
				}
			}
		}

		//animate dice rolling for single event
		var id = null;
		var limit = 25; //set this to 1 for effectively no animation
		var speed = 40; //framerate in ms
		function myMove() {
			var counter = 0;
			clearInterval(id);
			id = setInterval(frame, speed);
			function frame() {
				if (counter == limit) {
					clearInterval(id);
				} else if (counter == limit - 1) {
					counter++;
					change();
					roll1_stored = roll1;
					roll2_stored = roll2;
					roll3_stored = roll3;
					roll4_stored = roll4;
					results =  roll1 + "," + roll2 + "<br>" + results;
					events(roll1_stored, roll2_stored, roll3_stored, roll4_stored);
					disaster_flag = disaster_flag;
					patience = patience;
					time = time;
					checks();
					go_flag = go_flag;
					all_events = single_event + "<br>" + all_events;
					//automatically print event descriptions to the selected div. comment this out if button press should be needed
					document.getElementById('demo2').innerHTML = all_events;

					//if disaster happened, trigger game over
					if (disaster_flag == 1) {
						go_flag = 1;
					}
				} else {
					counter++;
					change();
				}
			}
		}


		//start new game by resetting all required parameters to initial values and setting flags to 0. clear event description
		function new_game() {
			day = 1;
			results = "";
			single_event = "";
			all_events = "";

			money = starter_money;
			time = starter_time;
			starter_patience = original_patience;
			patience = starter_patience;
			event_counter = 0;

			go_flag = 0;
			disaster_flag = 0;
			document.getElementById('demo2').innerHTML = all_events;
		}

		//modified functions for rolling once per day
		var day_flag = 0;

		//patience, time and day checks for day mode. 
		//if player is out of time or patience, set day_flag to 1. myMove_day_mode will keep rolling events until day_flag becomes 1, then resets it
		function checks_day_mode() {
			if (patience <= 0) {
				single_event =  "<br><br>--------------------<br>End of day " + day + ".<br>" + "<br> Your patience has run out and will be reduced by one unit tomorrow. The day is over, whether or not the customers like it. <br> " + single_event ;
				day = day + 1;
				day_flag = 1;
				//patience_flag = 1;
				starter_patience = starter_patience-1;  //new patience mechanic
				patience = starter_patience;
				time = starter_time;
			}
			else if (patience == 3) {
				single_event =  "<br> Your patience is wearing thin!" + single_event;
			}
			else {
			}

			if (time <= 0) {
				single_event =  "<br><br>--------------------<br>End of day " + day + ".<br>" + "<br> You are out of time. The Sun is is setting on the colourful horizon of Soho. The day is over. <br> " + single_event ;
				day = day + 1;
				day_flag = 1;
				time = starter_time;
				patience = starter_patience;
			}
			else if (time == 3) {
				single_event =   "<br> You don't have much time left!" + single_event;
			}
			else {
			}

			if (day > time_limit) {
				go_flag = 1;
				if (money > rent) {
					single_event = "<br>" + time_limit + " days have passed. You managed to gather " + money + " money. <br>" +  "Congratulations! Against all odds, you have managed to earn enough money to pay the rent and you have " + money - 10 + " profit. Are you sure you didn't fudge your rolls?" + single_event;
				}
				else if (money == rent) {
					single_event =  "<br>" + time_limit + " days have passed. You managed to gather " + money + " money. <br>" + "Congratulations! Against all odds, you have managed to earn enough money to pay the rent. Just about. Ready for the next ten days?" + single_event;
				}
				else {
					single_event = "<br>" + time_limit + " days have passed. You managed to gather " + money + " money. <br>" + "Unfortunately, this is not enough to make the landlord happy. Grab your books and run!" + single_event;
				}
			}
		}

		//refilling patience
		function patience_refill() {
			if (patience < original_patience - 1) {
				all_events =   "<br>Your sins and your money have bought you more patience. Just hope that it was worth it." + all_events;
				money = money-2;
				starter_patience = original_patience;
				patience = starter_patience;
				all_events =  "<br><br>You have spent 2 money on your vices, and your patience is now " + patience + ".<br>" + all_events;
			}
			else if (patience == original_patience - 1 ) {
				all_events = "<br>Your sins and your money have bought you more patience. Just hope that it was worth it.<br>" + all_events;
				money = money-1;
				starter_patience = original_patience;
				patience = starter_patience;
				all_events =  "<br><br>You have spent 1 money on some little vices, and your patience is now " + patience + ".<br>" + all_events;
			}
			else {
				all_events =   "<br><br>Patience is a virtue, but too much of anything can become a vice. You cannot gain additional patience at this time." + all_events;
			}
			document.getElementById('demo2').innerHTML = all_events;
		}

		//don't let the player refill patience if the game is already over
		function sin_sin_sin() {
			if (go_flag == 0) {
				patience_refill();
			}
			else {
				//if go_flag has been set to 1, the game is over, a new game has to be started. This is the only message given to the player from this point
				all_events =  "<br> The game is over. Click on the new game button to try again.<br>" + all_events
				document.getElementById('demo2').innerHTML = all_events;
			}
		}

		//animate rolling events in day mode. multiple events are rolled on one click, until day_flag becomes 1.
		function myMove_day_mode() {
			var counter = 0;
			clearInterval(id);
			id = setInterval(frame, speed);
			function frame() {
				if (counter == limit) {
					clearInterval(id);
				} else if (counter == limit - 1) {
					counter++;
					while (day_flag < 1) {
						change();
						roll1_stored = roll1;
						roll2_stored = roll2;
						roll3_stored = roll3;
						roll4_stored = roll4;
						results =  roll1 + "," + roll2 + "<br>" + results;
						events(roll1_stored, roll2_stored, roll3_stored, roll4_stored);
						disaster_flag = disaster_flag;
						patience = patience;
						time = time;
						checks_day_mode();
						day_flag = day_flag;
						go_flag = go_flag;
						all_events = single_event + "<br>" + all_events;
						document.getElementById('demo2').innerHTML = all_events;
						if (disaster_flag == 1) {
							go_flag = 1;
							break;
						}
						if (go_flag == 1) {
							break;
						}
					}
					day_flag = 0;
				} else {
					counter++;
					change();
				}
			}
		}

		//main operation: run game in normal or day mode, or demand new game
		function game_enabled() {
			if (go_flag == 0) {
				if (day_mode.checked == true) {
					check_for_realism();
					myMove_day_mode(); //roll once for all the events of the day
				}
				else {
					check_for_realism();
					myMove();	//roll once for every event
				}
			}
			else {
				//if go_flag has been set to 1, the game is over, a new game has to be started. This is the only message given to the player from this point
				all_events =   "<br>The game is over. Click on the new game button to try again.<br>" + all_events
				document.getElementById('demo2').innerHTML = all_events;
			}
		}


	//display or hide stored rolls
	var roll_flag = 0;
	
	function display_rolls() {
		if (roll_flag == 0) {
			document.getElementById('demo').innerHTML = results;
			roll_flag = 1;
			}
		else {
			document.getElementById('demo').innerHTML =  "";
			roll_flag = 0;
		}
	}
