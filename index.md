
<html>

<head>

	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="css/style.css">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Alata&family=Inknut+Antiqua:wght@700&display=swap" rel="stylesheet">
</head>

<body>

	<!-- collapsible sidebar when it opens -->
	<div id="mySidenav" class="sidenav">
		<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
		<a href="bookshop_simulator.html">Instructions</a>
		<a href="game.html">Game</a>
	</div>


	<!-- main / game-related content -->
	<div id="main">
		<div class="menu">
			<!-- sidebar icon when it's closed -->
			<span style="font-size:30px;cursor:pointer;color: white;" onclick="openNav()">&#9776; Menu</span>
			<h1 class="title">Bookstore simulator</h1>
		</div>
		<!-- row/column structure, title -->
		<div class="staticContent">
			<p>
				This simulator is based on the solo micro-RPG created by Oliver Darkshire of Sotheran's. You can click the image of the original instructions below to see the original tweet.
			</p>
		</div>
		<div class="row">
			<div class="column">
				<a href="https://twitter.com/Sotherans/status/1493279170188693506?s=20&t=2RmmSgLk4ycn0w6V3tpcTQ" target="_blank">
					<img src="images/oliver.png" alt="explanation sheet from Oliver's twitter" width="590" height="786">
				</a>
			</div>

			<!--  Second column for event description output -->
			<div class="column">
				<div class="staticContent">
					<h2 class="txtCenter subtitle">Instructions</h2>
					<p>Click <strong>Roll</strong>. The two dice will roll, determining what event will happen: a <strong>customer</strong>, a <strong>crisis</strong> or a <strong>peculiarity</strong>. Each event will allow you to gain or lose <strong>time</strong>, <strong>patience</strong>, or <strong>money</strong>. The day will end when you run out of <strong>time </strong>or <strong>patience</strong>. If your <strong>patience</strong> hits zero, your maximum <strong>patience</strong> is reduced by 1, permanently. After 10 days, the landlord will come to collect his 10 <strong>money</strong> rent. You can spend 2 money to refill your patience by clicking <strong>Sin</strong>.</p>
					<p>Select <strong>Day roll </strong>to only roll once to generate all the events for the day.</p>
					<p>Change the game mode to add optional extra events.</p>
					<p><strong>Rattie mode &ndash; </strong>Some helpful friends might pop by to deliver tea</p>
					<p><strong>Hard mode </strong>&ndash; There is a chance the bookshop might flood, ending the game</p>
					<p><strong>Nightmare mode </strong>&ndash; There is a chance of floods and a customer may appear asking &ldquo;There&rsquo;s no price on it, is it free?&rdquo;</p>
					<p><strong>Extra realism &ndash; </strong>You can play a 30 day month, but the landlord will expect 30 money at the end of it</p>
					
				</div>
				<a href="game.html" class="btn btnNew txtCenter btnStart">Start</a>
			</div>
		</div>

		<footer class="txtRight">
			<p>This website was lovingly created by three fans of the Sotheran's Twitter account. We are in no way affiliated with Sotheran's and will happily take this website down upon request. We can be contacted at <a href="mailto:crowleysratties@gmail.com">crowleysratties@gmail.com</a></a> </p>
		</footer>
	</div>


	<script>
		//script necessary to get the collapsible sidebar working (from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sidenav_push_opacity)
		function openNav() {
			document.getElementById("mySidenav").style.width = "100%";
			document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
		}

		function closeNav() {
			document.getElementById("mySidenav").style.width = "0";
			document.body.style.backgroundColor = "white";
		}



	</script>



</body>

</html>
