<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ 'todo' }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-frame-options" content="allowall" />
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" >
    <meta name="apple-mobile-web-app-capable" content="yes" >
	
    <link href="/css/app.css" rel="stylesheet">
</head>
<body class="">
	<div id="app">
		<vue-progress-bar></vue-progress-bar>
		<div class="container">
			<accommodations></accommodations>
		</div>
	</div>

	<script src="/js/app.js"></script>
</body>
</html>