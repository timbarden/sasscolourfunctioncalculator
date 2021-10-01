<!DOCTYPE html>
<html lang="en">
	<head>
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-11036298-4"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());

			gtag('config', 'UA-11036298-4');
		</script>

		<meta charset="UTF-8">
		<title>Sass Colour Calculator</title>
		<meta name="description" content="Calculate saved colours and variables from one to another with this handy tool. Paste in one click!" />
		<meta name="author" content="Tim Barden" />
		<meta name="keywords" content="sass colour function calculator, scss calculator, sass color function calculator, sass calculator, scss calculator, css calculator, web, web developer, web developing, web, HTML, CSS">
		<meta name="robots" content="index, follow" />
		<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, width=device-width">
		<link rel="icon" href="favicon.ico">
		<link rel="apple-touch-icon-precomposed" sizes="144x144" href="favicon.png">
		<link rel='stylesheet' href="/css/screen.css" type='text/css'/>
		<link href="https://fonts.googleapis.com/css?family=Share+Tech+Mono" rel="stylesheet">
	</head>

	<svg style="display: none;">
		<symbol id="icon_arrow" viewBox="0 0 24 24"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/></symbol>
	</svg>

	<body>
		<div class="build">

			<main class="main">
				<h2>SASS Colour Calculator <button class="changelog__btn">v1.2</button></h2>
				<form class="main__form" action="">
					<input class="border" data-type="col" data-var="" data-calc="from" type="text" placeholder="&bull; &bull; &bull; &bull; &bull; &bull;" name="strColorFrom" tabindex=6/>
					<div>
						<input class="border" data-type="col" data-var="" data-calc="to" type="text" placeholder="&bull; &bull; &bull; &bull; &bull; &bull;" name="strColorTo" tabindex=7/>
					</div>
				</form>
				<div class="calc__output center">
					<div class="calc__output--val"></div>
					<div class="calc__output--success">
						<svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
						</svg>
						<span>Copied</span>
					</div>
				</div>
			</main>

			<div class="faves closed" id="faves">
				<button class="calc__faves--expand btn" title="Toggle colour palette">
					<svg viewBox="0 0 24 24">
					   	<path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
					</svg>
				</button>
				<div class="faves__add">
					<button class="calc__faves--add btn" title="Add new colour">
						<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
					</button>
					<button class="calc__faves--import btn" title="Add new colour">
						<svg viewBox="0 0 20 20"><path d="M19.4 9h-3.4v-3.4c0-0.6-0.4-0.6-1-0.6s-1 0-1 0.6v3.4h-3.4c-0.6 0-0.6 0.4-0.6 1s0 1 0.6 1h3.4v3.4c0 0.6 0.4 0.6 1 0.6s1 0 1-0.6v-3.4h3.4c0.6 0 0.6-0.4 0.6-1s0-1-0.6-1zM7.4 9h-6.8c-0.6 0-0.6 0.4-0.6 1s0 1 0.6 1h6.8c0.6 0 0.6-0.4 0.6-1s0-1-0.6-1zM7.4 14h-6.8c-0.6 0-0.6 0.4-0.6 1s0 1 0.6 1h6.8c0.6 0 0.6-0.4 0.6-1s0-1-0.6-1zM7.4 4h-6.8c-0.6 0-0.6 0.4-0.6 1s0 1 0.6 1h6.8c0.6 0 0.6-0.4 0.6-1s0-1-0.6-1z"/></svg>
					</button>
				</div>
				<div class="faves__clear">
					<button class="calc__faves--clear btn" title="Clear all favouries">
						<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
					</button>
					<div class="calc__faves--confirm"><button class="btn">SURE?</button></div>
				</div>
				<form class="faves__form"></form>
				<textarea class="faves__import border" placeholder="Paste your variables and press enter to import. Example $pri: #C0FFEE;"></textarea>
			</div>

			<div class="changelog border">
				<h3>v1.0 <span>18/02/17</span></h3>
				<p>Basic manual import of variables, limited to 5 variables</p>

				<hr>
				<h3>v1.1 <span>25/07/17</span></h3>
				<p>Infinite number of variables can now be saved.</p>

				<hr>
				<h3>v1.2 <span>27/11/17</span></h3>
				<p>Auto-import multiple variables via copy/paste from your SCSS file.</p>
				<button class="changelog__btn"><svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>
			</div>

		</div>
	</body>

	<!--
	// with help from:
	// https://gist.github.com/mjackson/5311256
	// http://stackoverflow.com/questions/21646738/convert-hex-to-rgba
	-->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script src="/js/min/main-min.js"></script>
	<script>
		// google analytics
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-11036298-1', 'tim-barden.co.uk');
		ga('send', 'pageview');
	</script>
	</body>
</html>