<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-15">
    <link rel="stylesheet" type="text/css" href="{{  public_path('/css/diploma.css') }}">
    <style>
        @page {
            margin: 0cm 0cm 0cm 0cm;
            font-family: Arial;
        }

        body {
            margin: 0cm 0cm 0cm 0cm;
        }

        .grid-contenido {
            background-image: url(/img/diploma/fondo.png);
        }
    </style>
    {{-- <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet"> --}}
    {{-- <link href="https://fonts.googleapis.com/css2?family=Yesteryear&display=swap" rel="stylesheet"> --}}
    {{-- <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;500;600;700;800;900&display=swap"
        rel="stylesheet"> --}}
    {{-- <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
        rel="stylesheet"> --}}
    <title>Diploma</title>
</head>

<body>
    <div style="width:100%" class="container-PDF">
        <img src="{{ public_path('img/diploma/blue.png') }}" class="grid-blue">
        <div style="width:85%" class="grid-contenido">
            <div class="div_logos">
                <img src="{{ public_path('/img/diploma/happy-money.png') }}" class="img-logo1">
                <img src="{{ public_path('/img/diploma/TallerAVATARFINANCIERO.png') }}" class="img-logo-footer">
            </div>

            <img src="{{ public_path('img/diploma/otorga.png') }}" class="txt-otorga">
            <br>
            <img src="{{ public_path('/img/diploma/diploma.png') }}" class="txt-diploma">
            <div class="txt-name">
                <p style="color:#d2d3d5">A:&nbsp;</p>
                <div class="nombre">{{$nombre}}</div>
            </div>
            <img src="{{ public_path('/img/diploma/desc.png') }}" class="txt-descripcion">

            <img src="{{ public_path('/img/diploma/nameFirma.png') }}" class="txt-name-firma">
            <img src="{{ public_path('/img/diploma/firma.png') }}" class="firma">

            <div class="div-datos d1">
                <div class="left">
                    <img src="{{ public_path('/img/diploma/lugar.png') }}">
                    <p>{{$ciudad}}</p>
                </div>
            </div>

            <div class="div-datos d2">
                <div class="right">
                    <img src="{{ public_path('/img/diploma/fecha.png') }}">
                    <p>{{$fechas}}</p>
                </div>
            </div>

        </div>
    </div>


</body>

</html>