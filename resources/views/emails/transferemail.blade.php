<!DOCTYPE html>
<html>

<head>

  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Recibo de compra</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    /**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   */
    @media screen {
      @font-face {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 400;
        src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
      }

      @font-face {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 700;
        src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
      }
    }

    /**
   * Avoid browser level font resizing.
   * 1. Windows Mobile
   * 2. iOS / OSX
   */
    body,
    table,
    td,
    a {
      -ms-text-size-adjust: 100%;
      /* 1 */
      -webkit-text-size-adjust: 100%;
      /* 2 */
    }

    /**
   * Remove extra space added to tables and cells in Outlook.
   */
    table,
    td {
      mso-table-rspace: 0pt;
      mso-table-lspace: 0pt;
    }

    /**
   * Better fluid images in Internet Explorer.
   */
    img {
      -ms-interpolation-mode: bicubic;
    }

    /**
   * Remove blue links for iOS devices.
   */
    a[x-apple-data-detectors] {
      font-family: inherit !important;
      font-size: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
      color: inherit !important;
      text-decoration: none !important;
    }

    /**
   * Fix centering issues in Android 4.4.
   */
    div[style*="margin: 16px 0;"] {
      margin: 0 !important;
    }

    body {
      width: 100% !important;
      height: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
    }

    /**
   * Collapse table borders to avoid space between cells.
   */
    table {
      border-collapse: collapse !important;
    }

    a {
      color: #1a82e2;
    }

    img {
      height: auto;
      line-height: 100%;
      text-decoration: none;
      border: 0;
      outline: none;
    }
  </style>

</head>

<body style="background-color: #000000;">

  <!-- start preheader -->
  <div class="preheader"
    style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
    Compra realizada con éxito.
  </div>
  <!-- end preheader -->

  <!-- start body -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%">

    <!-- start logo -->
    <tr>
      <td align="center" bgcolor="#1a1a1a">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" valign="top" style="padding: 36px 24px;">
              <a href="https://danteeludier.com/" target="_blank" style="display: inline-block;">
                <img src="{{ $message->embed(public_path('img/danteLogoBlanco.png')) }}"
                style="display: block; width: 250px; max-width: 250px; min-width: 48px; filter: opacity(1)">
              </a>
            </td>
          </tr>
        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end logo -->

    <!-- start hero -->
    <tr>
      <td align="center" bgcolor="#1a1a1a">
        <!--[if (gte mso 9)|(IE)] 83D7B5>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="left" bgcolor="#FAFAFA"
              style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #000000;">
              <h1
                style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;color: black">
                ¡GRACIAS!</h1>
            </td>
          </tr>
        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end hero -->

    <!-- start copy block -->
    <tr>
      <td align="center" bgcolor="#1a1a1a">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

          <!-- start copy -->
          <tr>
            <td align="left" bgcolor="#FAFAFA"
              style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">Hola {{$usuario->name}}. Gracias por tu compra con Dante Eludier realizada el
                {{date('d-m-Y')}}. <br><br> <strong>Este es tu pedido</strong></p>
            </td>
          </tr>
          <!-- end copy -->
          @php
          $descuentoTotal=0;
          $total=0;
          @endphp
          <!-- start receipt table -->
          <tr>
            <td align="left" bgcolor="#fafafa"
              style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="left" bgcolor="#1a1a1a" width="10%"
                    style="padding: 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                    <strong>&nbsp;</strong></td>
                  <td align="left" bgcolor="#1a1a1a" width="70%"
                    style="color:#FFFFFF; padding: 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                    <strong>Pedido</strong></td>
                  <td align="left" bgcolor="#1a1a1a" width="20%"
                    style="padding: 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                    <strong></strong></td>
                </tr>
                @for ($i = 0; $i < $cantidad; $i++) <tr>
                  <td align="left" width="10%"
                    style="padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                    1</td>

                  <td align="left" width="70%"
                    style="padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                    {{$evento->product->titulo . " - " . $evento->sede . ' - '. $evento->ciudad}}
                  </td>

                  {{-- @php
                  $precioTotal += $libroV->precio;
                  @endphp --}}
                  <td align="left" width="20%"
                    style="padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                    &nbsp;${{ number_format($evento->precio, 2)}}</td>
          </tr>
          @php
          $descuentoTotal= $descuentoTotal + ($evento->precio * ($evento->descuento));
          $total = $total + $evento->precio;
          @endphp
          @endfor

          @if ($evento->descuento>0)
          <tr>
            <td align="left" width="10%"
              style="padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
            </td>
            <td align="left" width="70%"
              style="padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">

              Descuento del {{$evento->descuento * 100 . ' %'}}
            </td>
            <td align="left" width="20%"
              style="padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              -${{ number_format($descuentoTotal, 2)}}</td>
          </tr>
          @endif

          @php
          $total = $total - $descuentoTotal;
          @endphp
          <tr>
            <td align="left" width="10%"
              style="padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              &nbsp;</td>
            <td align="left" width="70%"
              style="padding: 12px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-top: 2px dashed #D2C7BA; border-bottom: 2px dashed #D2C7BA;">
              <strong>Total</strong></td>
            <td align="left" width="20%"
              style="padding: 12px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-top: 2px dashed #D2C7BA; border-bottom: 2px dashed #D2C7BA;">
              <strong> &nbsp;${{ number_format($total, 2)}}</strong></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" bgcolor="#FAFAFA">
        <!--[if (gte mso 9)|(IE)] 83D7B5>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" bgcolor="#FAFAFA"
              style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;">
              <h4
                style="margin: 0; font-size: 18px; font-weight: 400; letter-spacing: -1px; line-height: 30px;color: black; text-align: justify;">
                Puedes transferir o depositar con los siguientes datos, luego envía tu comprobante al correo:
                actividadespublicasdanteeludier@gmail.com y nos pondremos en contacto contigo para confirmar tu
                asistencia.
              </h4>
              <br>
              <img src="{{ $message->embed(public_path('img/transfer.jpg')) }}"
                style="display: block; width: 400px; max-width: 400px; min-width: 200px; filter: opacity(1);">
            </td>
          </tr>
          <tr style='background-color: #FAFAFA'>
            <td align="left" valign="top"
              style="padding-bottom: 36px; padding-left: 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p><strong>Cuenta de déposito</strong></p>
              <p>Banco - Banorte<br>Dante Eludier Vargas Caro<br>Numero de tarjeta: 4915 6630 7419 9986 <br> CLABE:
                072470011344204290</p>
            </td>
          </tr>
        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
    <!-- end reeipt table -->

  </table>
  <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
  </td>
  </tr>
  <!-- end copy block -->

  <!-- start receipt address block -->
  <tr>
    <td align="center" bgcolor="#1a1a1a" valign="top" width="100%">
      <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
      <table align="center" bgcolor="#fafafa" border="0" cellpadding="0" cellspacing="0" width="100%"
        style="max-width: 600px;">
        <tr>
          <td align="center" valign="top" style="font-size: 0;">
            <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
              <tr>
              <td align="left" valign="top" width="300">
              <![endif]-->
            <div style="display: inline-block; width: 100%; max-width: 50%; min-width: 240px; vertical-align: top;">
              <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 300px;">
                <tr>
                  <td align="left" valign="top"
                    style="padding-bottom: 36px; padding-left: 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                    <p><strong>Tus datos</strong></p>
                    <p>{{$usuario->name}}<br>{{$usuario->phone}}<br>{{$usuario->email}}</p>
                  </td>
                </tr>
              </table>
            </div>
            <!--[if (gte mso 9)|(IE)]>
              </td>
              <td align="left" valign="top" width="300">
              <![endif]-->
            {{-- ///////////////////////////////////////////////////////////////////////////////////////ESTO ES EL DE DIRECCION DE ENVIO --}}
            <div style="display: inline-block; width: 100%; max-width: 50%; min-width: 240px; vertical-align: top;">
              <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 300px;">
                <tr>
                  <td align="left" valign="top"
                    style="padding-bottom: 36px; padding-left: 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                    <p><strong>Datos del evento</strong></p>
                    <p>
                      {{$evento->product->titulo}}
                      <br>
                      {{$evento->sede}}
                      <br>
                      {{$evento->ciudad}}
                    </p>
                  </td>
                </tr>
              </table>
            </div>
            {{-- AQUI ACABA --}}
            <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
          </td>
        </tr>
      </table>

      <table align="center" bgcolor="#fafafa" border="0" cellpadding="0" cellspacing="0" width="100%"
        style="max-width: 600px;">
        <tr>
          <td align="center" valign="top" style="font-size: 0; border-bottom: 3px solid #d4dadf">
            <div style="display: inline-block; width: 80%; min-width: 240px; vertical-align: top;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                  <td align="center" valign="top"
                    style="padding-bottom: 15px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                    <p>
                      <strong>Fechas<br></strong>
                      @foreach ($evento->dates as $date)
                        <hr>
                          @php
                              $fecha = \Carbon\Carbon::parse($date->fecha);
                              $hora = date('g:i a', strtotime($date->horaCierre));
                          @endphp
                          {{$fecha->day}} de {{$fecha->monthName}} de {{$fecha->year}} de {{$fecha->format('g:i a')}} a {{$hora}}
                      @endforeach
                    </p>
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- end receipt address block -->

  <!-- start footer -->
  <tr>
    <td align="center" bgcolor="#1a1a1a" style="padding: 24px;">
      <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

        <!-- start permission -->
        <tr>
          <td align="center" bgcolor="#1a1a1a"
            style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
            <p style="margin: 0;"></p>
          </td>
        </tr>
        <!-- end permission -->

        <!-- start unsubscribe -->
        <tr>
          <td align="center" bgcolor="#1a1a1a"
            style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
            <p style="margin: 0;">© 2020 Dante Eludier.</p>
            <p style="margin: 0;">Todos los derechos reservados.</p>
            <p style="margin: 0;">México.</p>
          </td>
        </tr>
        <!-- end unsubscribe -->

      </table>
      <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
    </td>
  </tr>
  <!-- end footer -->

  </table>
  <!-- end body -->

</body>

</html>