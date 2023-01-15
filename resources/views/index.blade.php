<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="theme-color" content="#000000"/>
    <meta name="description" content="KinoMino"/>

    <meta name="viewport" content="width=device-width, user-scalable=no">
    <meta property="og:url" content="https://"/>
    <meta property="og:type" content="website"/>

    <link rel="local_logo" href="/local_logo.svg">
    <link rel="icon" href="/fav_icon.svg">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Comfortaa&display=swap" rel="stylesheet">

    <link rel="preload" as="font" href="/font/ArTarumianHandes.woff" type="font/woff2" crossorigin="anonymous">

    <link href="{{asset('css/main.css')}}" rel="stylesheet">
    <link href="{{asset('css/fontello.css')}}" rel="stylesheet">

    <link href="{{asset('css/image-gallery.css')}}" rel="stylesheet">

    <title>Application</title>

</head>
<body>
<div id="root"></div>
<div id="loader-portal"></div>
<script src="{{asset('js/index.js')}}"></script>
</body>
</html>
