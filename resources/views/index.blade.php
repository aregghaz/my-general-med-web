<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="theme-color" content="#000000"/>
    <meta name="description" content="KinoMino"/>

    <meta name="viewport" content="width=device-width, user-scalable=no">
    <meta property="og:url" content="https://www.KinoMino.ru/"/>
    <meta property="og:type" content="website"/>

    <link rel="local_logo" href="/local_logo.svg">
    <link rel="icon" href="/fav_icon.svg">

    <link rel="preload" as="font" href="/font/ArTarumianHandes.woff" type="font/woff2" crossorigin="anonymous">
    {{--<link rel="preload" as="font" href="/font/ArTarumianHandes.woff2" type="font/woff2" crossorigin="anonymous">--}}

    <link href="{{asset('css/main.css')}}" rel="stylesheet">
    <link href="{{asset('css/fontello.css')}}" rel="stylesheet">
    <link href="{{asset('css/swiper.css')}}" rel="stylesheet">
    <link href="{{asset('css/image-gallery.css')}}" rel="stylesheet">
    <!-- Yandex.Metrika counter -->
{{--    <script type="text/javascript">--}}
{{--        (function (m, e, t, r, i, k, a) {--}}
{{--            m[i] = m[i] || function () {--}}
{{--                (m[i].a = m[i].a || []).push(arguments)--}}
{{--            };--}}
{{--            m[i].l = 1 * new Date();--}}
{{--            k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)--}}
{{--        })--}}
{{--        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");--}}

{{--        ym(79813024, "init", {--}}
{{--            clickmap: true,--}}
{{--            trackLinks: true,--}}
{{--            accurateTrackBounce: true,--}}
{{--            webvisor: true--}}
{{--        });--}}
{{--    </script>--}}
{{--    <noscript>--}}
{{--        <div><img src="https://mc.yandex.ru/watch/79813024" style="position:absolute; left:-9999px;" alt=""/></div>--}}
{{--    </noscript>--}}
    <!-- /Yandex.Metrika counter -->
    <title>Kinomino</title>

</head>
<body>
<div id="kinomino"></div>
<div id="loader-portal"></div>
<script src="{{asset('js/index.js')}}"></script>
</body>
</html>
