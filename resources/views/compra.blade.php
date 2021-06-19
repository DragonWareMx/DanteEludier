<!DOCTYPE html>
<html>

<head>

    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Additional CSS Files -->
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet" />
    <link rel="icon" type="image/png" href="{{ asset('img/DE.png') }}" sizes="32x32">
    <script src="{{ mix('/js/app.js') }}" defer></script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;500;600;700;800;900&display=swap"
        rel="stylesheet">
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet">

    {{-- CSS COMPRA --}}
    <link rel="stylesheet" type="text/css" href="{{ asset('/css/compra.css') }}">

    <title>Checkout | Dante Eludier</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://js.stripe.com/v3/"></script>
</head>

<body>

    <form action="{{route('event.stripe.pay', $evento->id)}}" id="payment-form" method="POST">
        @csrf
        <div class="compra-header">
            <a href="{{ route('inicio') }}" class="logo">
                <img src="{{ asset('img/danteLogoBlanco.png') }}">
            </a>
        </div>

        <div class="container-fluid">
            <div class="row">
                @if(session('status'))
                <div class="alert alert-danger" role="alert" style="width: 100%">
                    <ul>
                        <li>{{session('status')}}</li>
                    </ul>
                </div>
                @endif
                @if($errors->any())
                <div class="alert alert-danger" role="alert" style="width: 100%">
                    <ul>
                        @foreach ($errors->all() as $error)
                        <li>{{$error}}</li>
                        @endforeach
                    </ul>
                </div>
                @endif
            </div>
            <div class="row">
                <div class="compra-table">
                    <div class="compra-cell cell-80">
                        <div class="formulario-container">
                            <h1 class="row-m">Información de la tarjeta</h1>
                        </div>
                        <div class="formulario-container">


                            {{-- CORREO --}}
                            <div class="row row-p">
                                <div class="field">
                                    <input type="text" autocomplete="" id="nombreTarjeta" name="nombreTarjeta" value=""
                                        onchange="this.setAttribute('value', this.value);" required>
                                    <label for="nombreTarjeta" id="titularname" title="Nombre en tarjeta"
                                        data-title="Nombre en tarjeta"></label>
                                </div>
                            </div>
                            <div class="row row-p">
                                <div class="field">
                                    <input type="text" autocomplete="" id="direccionTarjeta" name="direccionTarjeta"
                                        value="" onchange="this.setAttribute('value', this.value);" required>
                                    <label for="direccionTarjeta" id="titulardirection" title="Dirección"
                                        data-title="Dirección"></label>
                                </div>
                            </div>
                            <div class="row row-p">
                                <div class="field">
                                    <input type="text" autocomplete="" id="ciudadTarjeta" name="ciudadTarjeta" value=""
                                        onchange="this.setAttribute('value', this.value);" required>
                                    <label for="ciudadTarjeta" id="titularcity" title="Ciudad"
                                        data-title="Ciudad"></label>
                                </div>
                            </div>
                            <div class="row row-p">
                                <div class="field">
                                    <input type="text" autocomplete="" id="estadoTarjeta" name="estadoTarjeta" value=""
                                        onchange="this.setAttribute('value', this.value);" required>
                                    <label for="estadoTarjeta" id="titularstate" title="Estado"
                                        data-title="Estado"></label>
                                </div>
                            </div>
                            <div class="row row-p">
                                <div class="field">
                                    <input type="text" autocomplete="" id="cpTarjeta" name="cpTarjeta" value=""
                                        onchange="this.setAttribute('value', this.value);" required>
                                    <label for="cpTarjeta" id="titularcp" title="Código Postal"
                                        data-title="Código Postal"></label>
                                </div>
                            </div>


                            {{-- TEL --}}
                            <div class="row row-p" style="display: block">
                                <label for="card-element" class="txt-title-tarjeta">
                                    <a href="https://stripe.com/mx" target="_blank">
                                        <img src="{{ asset('img/icons/stripe-pago.png') }}" width="80px"></a> Tarjeta de crédito o débito
                                </label>
                                <div id="card-element">
                                    <!-- A Stripe Element will be inserted here. -->
                                </div>

                                <!-- Used to display form errors. -->
                                <div id="card-errors" role="alert"></div>
                            </div>
                        </div>
                    </div>
                    <input type="hidden" id="cantidad" name="cantidad" value="{{$cantidad}}">
                    <input type="hidden" id="eventoId" name="eventoId" value="{{$evento->id}}">

                    <div class="compra-cell cell-20">
                        <div class="compra-container">
                            <h1>Detalles de la compra</h1>
                            @php
                            $total = $evento->precio * $cantidad;
                            @endphp

                            {{-- HEADER TABLA --}}
                            <div class="productos-compra">
                                <div class="producto-table">
                                    <p class="nombre-evento">{{$evento->product->titulo . ' - ' . $evento->sede . ' - ' . $evento->ciudad }}</b></p>
                                    <p class="entradas-evento">{{$cantidad}} LUGARES</p>
                                    <p class="entradas-evento">${{ number_format( $evento->precio, 2 , ".", "," ) }}</p>
                                       
                                </div>

                                {{-- TOTALES --}}
                                <div class="producto-table">
                                    <div class="producto-row">
                                        <div class="totales" id="subtotalHTML" style="">
                                            <p>SUBTOTAL</p>
                                            <p id="subtotal">
                                                ${{ number_format($evento->precio * $cantidad, 2 , ".", "," ) }} </p>
                                        </div>

                                        <div class="totales" id="cuponHTML" style="">
                                            <p>DESCUENTO</p>
                                            <p id="cuponDescuento">
                                                ${{ number_format( ($evento->precio * $cantidad) * $evento->descuento , 2 , ".", "," ) }}
                                            </p>
                                        </div>
                                        @php
                                        $total=$total - (($evento->precio * $cantidad) * $evento->descuento )
                                        @endphp
                                        <div class="totales bigger">
                                            <p>TOTAL</p>
                                            <p id="total">${{ number_format($total, 2 , ".", "," ) }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {{-- <input type="submit" value="Realizar compra" class="shrink"> --}}
                            <button type="submit" id="complete-order" class="pagar-btn shrink"
                                name="action">Pagar</button>

                            <a href="#!" class="cancelar-btn">Cancelar</a>
                            <hr>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr>

        {{-- <div class="libro-regresar">
            <div class="boton">
                <button onclick="location.href='{{ route('inicio') }}'" type="button">
                    <div class="row" style="margin-right:0px; margin-left: auto;">
                        <img src="{{ asset('img/ico/blackarrow.png') }}">
                    </div>
                    <div class="row" style="margin-right:0px; margin-left: auto;">
                        Regresar
                    </div>
                </button>
            </div>
        </div> --}}
    </form>

    <script>
        function formatearNumero(numero){
                var parts = numero.toFixed(2).split(".");
                var num = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") +
                    (parts[1] ? "." + parts[1] : "");

                return num;
            }
    </script>



    <script>
        (function(){
                // Create a Stripe client.
                var stripe = Stripe('pk_test_51J1E9eKEMA0vYt5pgqg847YaMmgUFoLWwK7jcY8YmV8tDkjJKjfotT7JlBlvQcHRrB2DA4PPmNu6Hjh1wXWHHIkP00sLR9TGr1');

                // Create an instance of Elements.
                var elements = stripe.elements();

                // Custom styling can be passed to options when creating an Element.
                // (Note that this demo uses a wider set of styles than the guide below.)
                var style = {
                base: {
                    color: '#32325d',
                    fontFamily: '"Roboto", Helvetica, sans-serif',
                    fontSmoothing: 'antialiased',
                    fontSize: '16px',
                    '::placeholder': {
                    color: '#aab7c4'
                    }
                },
                invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a'
                }
                };

                // Create an instance of the card Element.
                var card = elements.create('card', {style: style,
                    hidePostalCode: true
                });

                // Add an instance of the card Element into the `card-element` <div>.
                card.mount('#card-element');

                // Handle real-time validation errors from the card Element.
                card.on('change', function(event) {
                var displayError = document.getElementById('card-errors');
                if (event.error) {
                    displayError.textContent = event.error.message;
                } else {
                    displayError.textContent = '';
                }
                });

                // Handle form submission.
                var form = document.getElementById('payment-form');
                form.addEventListener('submit', function(event) {
                event.preventDefault();

                document.getElementById('complete-order').disabled=true;

                var options = {
                    name: document.getElementById('nombreTarjeta').value,
                    address_line1: document.getElementById('direccionTarjeta').value,
                    address_city: document.getElementById('ciudadTarjeta').value,
                    address_state: document.getElementById('estadoTarjeta').value,
                    address_zip: document.getElementById('cpTarjeta').value,

                }

                stripe.createToken(card, options).then(function(result) {
                    if (result.error) {
                        // Inform the user if there was an error.
                        var errorElement = document.getElementById('card-errors');
                        errorElement.textContent = result.error.message;
                        document.getElementById('complete-order').disabled=false;
                    } else {
                    // Send the token to your server.
                    stripeTokenHandler(result.token);
                    }
                });
                });

                function stripeTokenHandler(token) {
                    // Insert the token ID into the form so it gets submitted to the server
                    var form = document.getElementById('payment-form');
                    var hiddenInput = document.createElement('input');
                    hiddenInput.setAttribute('type', 'hidden');
                    hiddenInput.setAttribute('name', 'stripeToken');
                    hiddenInput.setAttribute('value', token.id);
                    form.appendChild(hiddenInput);

                    // Submit the form
                    form.submit();
                }
                // Submit the form with the token ID.
                function stripeTokenHandler(token) {
                // Insert the token ID into the form so it gets submitted to the server
                var form = document.getElementById('payment-form');
                var hiddenInput = document.createElement('input');
                hiddenInput.setAttribute('type', 'hidden');
                hiddenInput.setAttribute('name', 'stripeToken');
                hiddenInput.setAttribute('value', token.id);
                form.appendChild(hiddenInput);

                // Submit the form
                form.submit();
                }
            })();
    </script>
</body>

</html>